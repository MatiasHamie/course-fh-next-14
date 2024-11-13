"use server";
import prisma from "@/source/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password, 10),
      },
      // para no retornar el password
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      message: "usuario creado correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "no se pudo crear el usuario",
    };
  }
};
