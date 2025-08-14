import React from "react";

interface HeaderProps {
  header : string;
  label: string;
}

export const Header = ({ header ,label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center">
     <h1 className="text-2xl font-semibold">
       {header}
     </h1>
     <p className="text-muted-foreground text-sm tracking-tight">
    {label}
     </p>
    </div>
  );
};
