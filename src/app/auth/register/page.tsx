
import { RegisterForm } from "@/components/auth/RegisterForm";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative h-screen w-full bg-neutral-100 flex justify-center items-center ">
        <RegisterForm />
      </div>
    </>
  );
};

export default page;
