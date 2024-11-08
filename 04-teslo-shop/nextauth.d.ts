import { Role } from "@/seed/seed";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      image?: string | null;
      emailVerified?: boolean;
      role: Role;
    } & DefaultSession["user"];
  }
}
