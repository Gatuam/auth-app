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
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/lib/useUserHook";

export const UserButton = () => {
  const user = useCurrentUser();
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user?.image || "/pf-1.png"}
          width={35}
          height={40}
          className=" rounded-full"
          alt="pf"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" cursor-pointer">
        <DropdownMenuItem className=" cursor-pointer" onClick={() => signOut()}>
          Logout <ArrowRight className=" size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
