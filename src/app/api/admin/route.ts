import { UserRole } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { json, success } from "zod";

export async function GET() {
  const user = await currentUser();
  if (user?.role === UserRole.ADMIN) {
    return NextResponse.json({
      status: 200,
      success : true
    });
  }
  return NextResponse.json({
    status: 403,
  success : false
  });
}
