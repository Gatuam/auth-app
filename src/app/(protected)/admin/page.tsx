"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import React from "react";

const Page = () => {
  const data = useCurrentRole();
  return (
    <Card className=" w-[400px] flex flex-col justify-center items-center shadow-2xl ">
      <p className=" text-2xl font-semibold">Admin</p>
      <CardContent></CardContent>
    </Card>
  );
};

export default Page;
