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
    <nav className="fixed top-10 inset-x-0 mx-auto bg-neutral-100 rounded-md  py-3 max-w-5xl flex justify-between items-center gap-10 w-fit px-7 border border-[#b0b0b01e] ">
      <div className="w-full flex items-center gap-8">
        {navLinks.map((nav, i) => (
          <Tooltip key={i}>
            <div
              className={`
                ${
                  pathname === nav.href
                    ? "bg-white border-neutral-300 scale-103 text-sm"
                    : ""
                }
                flex items-center justify-center text-neutral-600 bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-md shadow-xl  hover:scale-102 hover:bg-white transition-all ease-in gap-3
             `}
            >
              <TooltipTrigger className="flex items-center gap-2" asChild>
                <Link href={nav.href}>
                  <nav.icon className="w-5 h-5" />
                  <p className="text-sm">{nav.label}</p>
                </Link>
              </TooltipTrigger>
              <TooltipContent>{nav.label}</TooltipContent>
            </div>
          </Tooltip>
        ))}
      </div>
      <UserButton />
    </nav>
  );
};
