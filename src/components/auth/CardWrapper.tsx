"user client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./Header";
import { Social } from "./Social";
import { BackButton } from "./BackButton";

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
  showSocial = true,
}: CardWarpperProps) => {
  return (
    <Card className="w-[400px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] flex flex-col py-9 ">
      <CardHeader>
        <Header header="Auth App" label={headerlabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{showSocial && <Social />}</CardFooter>
      <CardFooter>
        <BackButton herf={backButtonherf} label={backButtonlable} />
      </CardFooter>
    </Card>
  );
};
