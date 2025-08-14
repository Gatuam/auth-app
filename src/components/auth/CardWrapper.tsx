"user client";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Header } from "./Header";
import { Social } from "./Social";

interface CardWarpperProps {
  children: React.ReactNode;
  headerlabel: string;
  backButtonlable: string;
  backButtonherf: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerlabel,
  backButtonlable,
  backButtonherf,
  showSocial,
}: CardWarpperProps) => {
  return (
    <Card className="w-[400px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] ">
      <CardHeader>
        <Header label="Welcome back to auth application" />
      </CardHeader>
      <CardContent>{children}</CardContent>
      { 
        showSocial && < Social />
      }
    </Card>
  );
};
