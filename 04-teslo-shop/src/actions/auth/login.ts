"use server";

import { signIn } from "@/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      redirect: false, // esto es porque hay un error con el redirect comun de next interno
      ...Object.fromEntries(formData),
    });

    return "Success";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // if ((error as any) === "CredentialsSignin") {
    return "Credenciales incorrectas";
    // }

    // return "Error desconocido";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesion",
    };
  }
};
