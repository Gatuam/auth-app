import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: { token },
    });
  } catch {
    return null;
  }
};
