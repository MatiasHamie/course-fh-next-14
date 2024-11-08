import NextAuth, { type NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./source/lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  // https://next-auth.js.org/configuration/
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth });
      return true;
    },
    jwt({ token, user }) {
      // el user de aca es el ...rest que retorno del método authorize
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password)) return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};
// handlers son para el client side, ver app/api/auth/[...nextauth].ts
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
