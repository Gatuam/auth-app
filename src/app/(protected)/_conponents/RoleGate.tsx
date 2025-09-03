"use client";
import { FormError } from "@/components/form-message/FormError";
import { UserRole } from "@/generated/prisma";
import { useCurrentRole } from "@/hooks/use-current-role";
import React from "react";

interface RoleGateProps {
  children: React.ReactNode;
  allowRole: UserRole;
}

export const RoleGate = ({ children, allowRole }: RoleGateProps) => {
  const user = useCurrentRole();
  if (user?.role !== allowRole) {
    return (
      <FormError message="You do'not have permitto view this content" />
    );
  }
  return <div>{children}</div>;
};
