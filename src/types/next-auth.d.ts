import { UserRole } from "@/generated/prisma";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
  interface Session {
    user: {
      role: UserRole;
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    id: string;
    email: string;
    name: string;
  }
}
