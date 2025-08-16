"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./CardWrapper";
import { LoginSchema } from "@/schemas";
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
import { login } from "../../actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const serachParams = useSearchParams();
  const urlError =
    serachParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provder!"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (value: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(value).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <>
      <CardWrapper
        headerlabel="Welcom back"
        backButtonlable='Don"t have an acoount yet?'
        backButtonherf="/auth/register"
        showSocial
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
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <Button
                    asChild
                    size={"sm"}
                    className="text-blue-500 px-0 text-sm font-normal cursor-pointer"
                    variant={"link"}
                  >
                    <Link href="/auth/reset">forget password ?</Link>
                  </Button>
                </FormItem>
              )}
            />
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              className="w-full cursor-pointer"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
