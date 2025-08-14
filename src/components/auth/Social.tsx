"use client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export const Social = () => {
  const onClick = (provider: "google" | "github")=>{
    signIn(provider, {
      callbackUrl : DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <div className="flex  w-full gap-2  items-center justify-center ">
      <Button
        onClick={() => onClick('google')} 
        variant={"outline"}
        size={"lg"}
        className=" w-1/2 cursor-pointer"
      >
        <FaGoogle />
      </Button>
      <Button
        onClick={() =>onClick('github')}
        variant={"outline"}
        size={"lg"}
        className=" w-1/2 cursor-pointer"
      >
        <FaGithub />
      </Button>
    </div>
  );
};
