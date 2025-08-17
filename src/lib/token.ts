import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenbyEmail } from "@/data/reset";
import cryoto from "crypto";
import { getTwoFactorConfrimationByUserId } from "@/data/two-factor-confomation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

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

export const generateTwoFactoToken = async (email: string) => {
  const token = cryoto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};
