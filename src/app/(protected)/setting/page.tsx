"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavBar } from "../_conponents/NavBar";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { settingSchema } from "@/schemas";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-message/FormError";
import { FormSuccess } from "@/components/form-message/FormSucess";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/lib/useUserHook";
import { UserRole } from "@prisma/client";

const page = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof settingSchema>>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || undefined,
      password: undefined,
      isTwoFAEnable: false,
      role: user?.role || "USER",
    },
  });
  const onSubmit = (values: z.infer<typeof settingSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.success) {
            toast.success("Name updated successfully");
            setSuccess(data?.success);
            update();
          }
          if (data.error) {
            setError(data?.error);
          }
        })
        .catch((err) => {
          toast.error(err?.message || "Error");
        });
    });
  };
  return (
    <>
      <Card
        className=" max-w-xl min-w-lg bg-gradient-to-t from-white to-accent-foreground/5 backdrop-blur-2xl
      shadow-[0_5px_3px_rgba(8,_112,_184,_0.7)]
      "
      >
        <CardHeader className=" flex items-center justify-center">
          <p className="text-2xl font-semibold">Settings</p>
        </CardHeader>
        <CardContent>
          <div className=" space-y-5 px-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isPending}
                          placeholder="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isPending}
                          placeholder="*****"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className=" w-full">
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent className=" w-full cursor-pointer">
                            <SelectItem
                              className=" cursor-pointer"
                              value={UserRole.USER}
                            >
                              User
                            </SelectItem>
                            <SelectItem
                              className=" cursor-pointer"
                              value={UserRole.ADMIN}
                            >
                              Admin
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isTwoFAEnable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Enable</FormLabel>
                      <FormControl>
                        <Switch />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  className=" mt-3 w-full"
                  disabled={isPending}
                  type="submit"
                >
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default page;
