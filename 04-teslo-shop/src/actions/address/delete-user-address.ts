"use server";
import prisma from "@/source/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: { userId },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: "No se pudo eliminar la dirección del usuario",
    };
  }
};
