import { LoginForm } from "@/components/auth/LoginForm";
import React from "react";

const page = () => {
  return (
    <>
      <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex justify-center items-center">
        <LoginForm />
      </div>
    </>
  );
};

export default page;
