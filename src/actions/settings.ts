"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import sendMail from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { settingSchema } from "@/schemas";
import * as z from "zod";

export const settings = async (value: z.infer<typeof settingSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    value.email = undefined;
    value.password = undefined;
    value.isTwoFAEnable = undefined;
    value.newPassword = undefined;
  }

  if (value.email && value.email !== user.email) {
    const existingUser = await getUserByEmail(value.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }
    const verificationToken = await generateVerificationToken(value.email);

    const emailConformationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${verificationToken.token}`;
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
      verificationToken?.email,
      "Email confirmation Link",
      verificationTemplate
    );

    return {success : 'Verifiation email send'}
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...value,
    },
  });
  return { success: "Setting updated" };
};
