"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LoginForm } from "./LoginForm";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Login Form</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <DialogContent className=" p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span className=" cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
