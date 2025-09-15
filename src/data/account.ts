import { db } from "@/lib/db";

export const getAccountByUserid = async (userId: string) => {
  const account = await db.account.findFirst({
    where: {
      userId,
    },
  });
  return account;
};
