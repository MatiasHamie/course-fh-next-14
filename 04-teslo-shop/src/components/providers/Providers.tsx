"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

/*
  Hay que considerar que para usar el sessionProvider, va a tirar un error
  como ClientFetchError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON. Read more at 

  GET http://localhost:3000/api/auth/session 404 (Not Found)

  Para solucionar esto, hay que crear la ruta api/auth/session.ts

*/

export const Providers = ({ children }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "USD",
      }}
    >
      <SessionProvider>{children}</SessionProvider>;
    </PayPalScriptProvider>
  );
};
