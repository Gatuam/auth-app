import React from "react";
import { CardWrapper } from "./CardWrapper";

export const LoginForm = () => {
  return (
    <>
      <CardWrapper
        headerlabel="Welcom back"
        backButtonlable='Don"t have an acoount yet?'
        backButtonherf="/auth/register"
        showSocial
      >
        Error Lens
      </CardWrapper>
    </>
  );
};
