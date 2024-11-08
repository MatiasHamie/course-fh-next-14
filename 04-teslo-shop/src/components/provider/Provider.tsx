"use client";

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

export const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
