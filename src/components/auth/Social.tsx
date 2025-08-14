"use client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <div className="flex  w-full gap-2  items-center justify-center ">
      <Button
        onClick={() => {}} 
        variant={"outline"}
        size={"lg"}
        className=" w-1/2 cursor-pointer"
      >
        <FaGoogle />
      </Button>
      <Button
        onClick={() => {}}
        variant={"outline"}
        size={"lg"}
        className=" w-1/2 cursor-pointer"
      >
        <FaGithub />
      </Button>
    </div>
  );
};
