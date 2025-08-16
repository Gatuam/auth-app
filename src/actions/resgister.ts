"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import sendMail from "@/lib/mail";

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validatedFileds = RegisterSchema.safeParse(value);
  if (!validatedFileds.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, name } = validatedFileds.data;

  const hasedpassword = await bcrypt.hash(password, 10);
  const userExist = await getUserByEmail(email);

  if (userExist) {
    return { error: "Email is already taken" };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hasedpassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);
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

  const mailSend = sendMail(
    verificationToken.email,
    "email Verification code",
    verificationTemplate,
  );
  if (!mailSend) {
    return { error: "Sending email failed" };
  }

  return { success: "User create succefully .Comformation email send" };
};
