import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenbyEmail } from "@/data/reset";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existToken = await getVerificationTokenByEmail(email);
  if (existToken) {
    await db.verificationToken.delete({
      where: {
        id: existToken.id,
      },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existToken = await getPasswordResetTokenbyEmail(email);
  if (existToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existToken.id,
      },
    });
  }
  const resetPasswordToken = await db.passwordResetToken.create({
    data: { email, token, expires },
  });
  return resetPasswordToken;
};
