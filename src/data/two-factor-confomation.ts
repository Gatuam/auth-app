import { db } from "@/lib/db";

export const getTwoFactorConfrimationByUserId = async (userId: string) => {
  try {
    const twoFactorConfrimation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFactorConfrimation;
  } catch {
    return null;
  }
};
