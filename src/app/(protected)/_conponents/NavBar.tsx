"use client";
import React, { useRef } from "react";
import { Server, Users, Shield, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/UserButton";

export const NavBar = () => {
  const pathname = usePathname();
  const navLinks = [
    {
      label: "Server",
      href: "/server",
      icon: Server,
    },
    {
      label: "Client",
      href: "/client",
      icon: Users,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: Shield,
    },
    {
      label: "Settings",
      href: "/setting",
      icon: Settings,
    },
  ];
  return (
    <nav className="fixed top-10 bg-neutral-100  rounded-md  py-3 md:max-w-5xl max-w-[410px]  flex justify-center items-center md:gap-10 gap-2  md:px-7 px-2 border border-muted-foreground/30 shadow-lg md:justify-between flex-wrap md:flex-nowrap  ">
      <div className="w-full flex items-center gap-1 md:gap-8">
        {navLinks.map((nav, i) => (
          <Tooltip key={i}>
            <Link href={nav.href}>
              <div
                className={`
                ${
                  pathname === nav.href
                    ? "bg-zinc-900 border-neutral-300 scale-103 text-sm text-white"
                    : ""
                }
                flex items-center justify-center text-neutral-600 bg-neutral-100 border border-neutral-200 md:px-4 px-2 py-2 rounded-md shadow-xl  hover:scale-102 hover:bg-zinc-900 hover:text-white transition-all ease-in gap-3 cursor-pointer
             `}
              >
                <TooltipTrigger className="flex items-center gap-2 cursor-pointer">
                  <nav.icon className="w-5 h-5 cursor-pointer" />
                  <p className="text-sm">{nav.label}</p>
                </TooltipTrigger>
                <TooltipContent className=" cursor-pointer">
                  {nav.label}
                </TooltipContent>
              </div>
            </Link>
          </Tooltip>
        ))}
      </div>
      <UserButton />
    </nav>
  );
};
