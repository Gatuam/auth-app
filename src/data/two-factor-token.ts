import { db } from "@/lib/db";

const twoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};
const twoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};
