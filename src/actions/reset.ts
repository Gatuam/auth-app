"use server";

import { getUserByEmail } from "@/data/user";
import sendMail from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const validatedFileds = ResetSchema.safeParse(value);
  if (!validatedFileds.success) {
    return { error: "Invalid fields" };
  }
  const { email } = validatedFileds.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found" };
  }
  const ResetToken = await generateResetPasswordToken(email);
  const passwordResetLink = `http://localhost:3000/auth/new-password?token=${ResetToken.token}`;

  const resetPasswordTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="margin:0; font-family: Arial, sans-serif; background:#f4f4f7; padding:20px;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <tr>
        <td style="padding:30px; text-align:center; background:#0d1117; border-radius:10px 10px 0 0;">
          <h1 style="margin:0; font-size:24px; color:#ffffff; font-weight:600;">Reset Your Password</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px; text-align:center; color:#333;">
          <p style="font-size:16px; margin-bottom:20px;">Hi there,</p>
          <p style="font-size:16px; margin-bottom:20px;">We received a request to reset your password for your <strong>ek.dev</strong> account. Click the button below to reset it.</p>
          <a href="${passwordResetLink}" style="display:inline-block; padding:12px 24px; background:#2563eb; color:#ffffff; text-decoration:none; font-size:16px; border-radius:8px; font-weight:bold;">Reset Password</a>
          <p style="font-size:14px; color:#666; margin-top:30px;">If you did not request a password reset, you can safely ignore this email.</p>
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

  const mailSend = sendMail(
    ResetToken.email,
    "Reset your password",
    resetPasswordTemplate
  );
  if (!mailSend) {
    return { error: "Sending email failed" };
  }
  return { success: "Reset Email sent!" };
};
