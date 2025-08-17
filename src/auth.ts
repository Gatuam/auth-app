import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "./generated/prisma";
import { getTwoFactorConfrimationByUserId } from "./data/two-factor-confomation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   const userExist = await getUserById(user.id as string);
    //   if (!userExist || !userExist.emailVerified) {
    //     return false;
    //   }
    // },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
      if (existingUser.isTwoFactorEnable) {
        const twoFactorConfirmation = await getTwoFactorConfrimationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }
      return true;
    },
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
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
});
