import { signOut } from "next-auth/react";
import React from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = ()=>{
    signOut();
  }
    return(
        <div 
        className=" cursor-pointer"
        onClick={onClick}>
            {children}
        </div>
    )


};
