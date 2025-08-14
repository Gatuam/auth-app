import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "./generated/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   const userExist = await getUserById(user.id as string);
    //   if (!userExist || !userExist.emailVerified) {
    //     return false;
    //   }
    // },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existUser = await getUserById(token.sub);
      if (!existUser) return token;
      token.role = existUser.role;
      token.id = existUser.id;
      token.email = existUser.email;
      token.name = existUser.name;
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
