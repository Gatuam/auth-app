import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "next-auth";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, Check } from "lucide-react";
import Image from "next/image";
interface UserInfoProps {
  user?: User;
  label: string;
  sublabel: string;
  info: string;
}
export const UserInfo = ({ user, label, sublabel, info }: UserInfoProps) => {
  return (
    <Card className="px-6 w-[400px] shadow-2xl flex flex-col justify-center items-center border border-accent-foreground/20 bg-transparent py-8 ">
      <p className=" text-2xl font-semibold ">{label}</p>
      <p className=" underline text-sm text-accent-foreground/60 ">
        {sublabel}
      </p>

      <Table className=" px-6 space-y-7 cursor-pointer">
        <TableCaption>{info}</TableCaption>
        <TableHeader>
          <TableRow className=" hover:bg-gray-300/60">
            <TableHead className="w-[100px]">
              {" "}
              <p className=" text-sm font-medium">ID</p>
            </TableHead>
            <TableHead className="text-right">
              <p className=" truncate text-xs">{user?.id}</p>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableHeader>
          <TableRow className=" hover:bg-gray-300/60">
            <TableHead className="w-[100px]">
              {" "}
              <p className=" text-sm font-medium">Email</p>
            </TableHead>
            <TableHead className="text-right">
              <p className=" truncate text-xs">{user?.email}</p>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableHeader>
          <TableRow className=" hover:bg-gray-300/60">
            <TableHead className="w-[100px]">
              {" "}
              <p className=" text-sm font-medium">Username</p>
            </TableHead>
            <TableHead className="text-right">
              <p className=" truncate text-xs">{user?.name}</p>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableHeader>
          <TableRow className=" hover:bg-gray-300/60">
            <TableHead className="w-[100px]">
              {" "}
              <p className=" text-sm font-medium">Role</p>
            </TableHead>
            <TableHead className="text-right">
              <p className=" truncate text-xs">{user?.role}</p>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableHeader className="">
          <TableRow className=" hover:bg-gray-300/60">
            <TableHead className="w-[100px]">
              {" "}
              <p className=" text-sm font-medium">Image</p>
            </TableHead>
            <TableHead className="text-left flex justify-end items-center">
              
              <Image
              className=" rounded-full"
                alt="pf"
                loading="lazy"
                width={30}
                height={30}
                src={user?.image || "/pf-1.png"}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableHeader>
          <TableRow className=" hover:bg-gray-300/60 bg-emerald-200/70">
            <TableHead className="w-[100px]">
              {" "}
              <p className=" text-sm font-medium">Two-Factor</p>
            </TableHead>
            <TableHead className="text-right ">
              <Badge
                className={`${
                  user?.isTwoFactorEnable
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-red-700"
                }`}
                variant={user?.isTwoFactorEnable ? "secondary" : "destructive"}
              >
                <BadgeCheckIcon />
                {user?.isTwoFactorEnable ? "Verified" : "Not Verified"}
              </Badge>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </Card>
  );
};
