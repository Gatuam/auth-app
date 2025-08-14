import { LoginForm } from "@/components/auth/LoginForm";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative h-screen w-full bg-neutral-100 flex justify-center items-center ">
        <LoginForm />
      </div>
    </>
  );
};

export default page;
