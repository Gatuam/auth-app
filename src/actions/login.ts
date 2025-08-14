"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (value: z.infer<typeof LoginSchema>) => {
  const validatedFileds = LoginSchema.safeParse(value);
  if (!validatedFileds.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFileds.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid creditials" };
        default:
          return { error: "Something went wrong while login" };
      }
    }
    throw error;
  }
};
