"use server";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerfication = async (token: string) => {
  const exitingToken = await getVerificationTokenByToken(token);
  if (!exitingToken) {
    return { error: "Token does not exist" };
  }
  const hasExpired = new Date(exitingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existingUser = await getUserByEmail(exitingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: exitingToken.email,
    },
  });
  await db.verificationToken.deleteMany({
    where: { token: exitingToken.token },
  });

  return { success: "Email verified succesfully" };
};
