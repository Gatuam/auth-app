"use server";
import { getPasswordResetTokenByToken } from "@/data/reset";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
  token: string,
  value: z.infer<typeof NewPasswordSchema>
) => {
  if (!token) {
    return { error: "Missing token" };
  }
  const validatedFileds = NewPasswordSchema.safeParse(value);
  if (!validatedFileds.success) {
    return { error: "Invalid password" };
  }
  const { password } = validatedFileds.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
      email: existingToken.email,
    },
  });
  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated" };
};
