"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import React from "react";
import { RoleGate } from "../_conponents/RoleGate";
import { UserRole } from "@/generated/prisma";
import { FormSuccess } from "@/components/form-message/FormSucess";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { admin } from "@/actions/admin";

const Page = () => {
  const onServerAction = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error("bad request");
      }
      if (data?.success) {
        toast.success("Success");
      }
    });
  };
  const handleAdmin = async () => {
    const res = await axios.get("/api/admin");
    if (res.data?.success) {
      toast.success("Success");
    } else {
      toast.error("bad request");
    }
  };
  return (
    <Card className=" w-[400px] md:w-[450px] border border-accent-foreground/20 flex flex-col justify-center items-center shadow-2xl  ">
      <p className=" text-2xl font-semibold">Admin</p>
      <CardContent className=" space-y-6 w-full">
        <RoleGate allowRole={UserRole.ADMIN}>
          <FormSuccess message="You are an admin" />
        </RoleGate>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-2 shadow-2xl">
          <p className=" text-sm font-medium">Admin API ROUTE</p>
          <Button onClick={() => handleAdmin()}>Click to be an admin</Button>
        </div>

        <div className=" flex flex-row items-center justify-between rounded-lg border p-2 shadow-2xl">
          <p className=" text-sm font-medium">Admin Server Action</p>
          <Button onClick={() => onServerAction()}>Click to be an admin</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
