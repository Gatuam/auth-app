"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

import React from "react";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";

export const UserButton = () => {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={` flex items-center justify-center gap-2 text-neutral-600 bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-md shadow-xl  hover:scale-102 hover:bg-white transition-all ease-in
            ${
              pathname === "/user"
                ? "bg-white border-neutral-300 scale-110"
                : ""
            }
            `}
        >
          <User className="w-5 h-5" />
          User
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" cursor-pointer">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        className=" cursor-pointer"
        >Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
        className=" cursor-pointer"
        onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
