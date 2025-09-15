import { UserRole } from "@prisma/client";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: UserRole;
    isTwoFactorEnable: boolean;
    isOAuth?: boolean;
  }
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role: UserRole;
      isTwoFactorEnable: boolean;
      isOAuth: boolean;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: UserRole;
    isTwoFactorEnable: boolean;
    isOAuth: boolean;
  }
}
