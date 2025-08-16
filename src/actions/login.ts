"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import sendMail from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
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

  const existUser = await getUserByEmail(email);

  if (!existUser || !existUser.email || !existUser.password) {
    return { error: "Email does not exist" };
  }
  if (!existUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existUser.email);
    const emailConformationLink = `http://localhost:3000/auth/new-verification?token=${verificationToken.token}`;
    const verificationTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Confirmation</title>
  </head>
  <body style="margin:0; font-family: Arial, sans-serif; background:#f4f4f7; padding:20px;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <tr>
        <td style="padding:30px; text-align:center; background:#0d1117; border-radius:10px 10px 0 0;">
          <h1 style="margin:0; font-size:24px; color:#ffffff; font-weight:600;">Confirm Your Email</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px; text-align:center; color:#333;">
          <p style="font-size:16px; margin-bottom:20px;">Hi there,</p>
          <p style="font-size:16px; margin-bottom:20px;">Please confirm your email address to activate your account with <strong>ek.dev</strong>.</p>
          <a href="${emailConformationLink}" style="display:inline-block; padding:12px 24px; background:#2563eb; color:#ffffff; text-decoration:none; font-size:16px; border-radius:8px; font-weight:bold;">Confirm Email</a>
          <p style="font-size:14px; color:#666; margin-top:30px;">If you did not request this, you can safely ignore this email.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px; text-align:center; background:#f9fafb; border-top:1px solid #e5e7eb; font-size:12px; color:#777; border-radius:0 0 10px 10px;">
          Sent by <strong>auth@ek.dev</strong>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
    await sendMail(
      existUser.email,
      "Email confirmation Link",
      verificationTemplate
    );
    console.log(verificationToken);
    return { success: "Conformation email send!" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Account created succefully" };
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
