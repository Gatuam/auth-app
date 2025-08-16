"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./CardWrapper";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { FormError } from "../form-message/FormError";
import { FormSuccess } from "../form-message/FormSucess";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (value: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      if (!token) {
        setError("Missing Token");
        return;
      }
      newPassword(token, value).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <>
      <CardWrapper
        headerlabel="Set New Password"
        backButtonlable="back to login"
        backButtonherf="/auth/login"
        showSocial={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              className="w-full cursor-pointer"
              type="submit"
            >
              Reset password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
