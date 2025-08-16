"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./CardWrapper";
import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (value: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(value).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <>
      <CardWrapper
        headerlabel="Forget password?"
        backButtonlable="back to login"
        backButtonherf="/auth/login"
        showSocial={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="email"
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
