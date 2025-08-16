"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { newVerfication } from "@/actions/new-verification";
import { FormError } from "../form-message/FormError";
import { FormSuccess } from "../form-message/FormSucess";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerfication(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  onSubmit();
  return (
    <CardWrapper
      headerlabel="Confirming your verification"
      backButtonherf="/auth/login"
      backButtonlable="Back to login page"
      showSocial={false}
    >
      <div className="flex flex-col justify-center items-center gap-3">
        {!success && !error && <Loader className=" animate-spin" />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
