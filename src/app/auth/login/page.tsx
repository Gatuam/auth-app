'use client'
import { LoginForm } from "@/components/auth/LoginForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
     <LoginForm />
    </Suspense>
     
    </>
  );
};

export default page;
