"use server";

import { auth } from "@/auth.config";
import prisma from "@/source/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "No tienes permisos para realizar esta acción",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    // no olvidar revalidar el cache
    revalidatePath("/admin/users");

    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: "Error al cambiar el rol del usuario",
    };
  }
};
