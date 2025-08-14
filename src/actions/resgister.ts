"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

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
  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hasedpassword,
    },
  });

  //verification token need to be send
  return { success: "User create succefully" };
};
