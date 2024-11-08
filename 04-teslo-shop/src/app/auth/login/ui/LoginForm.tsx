"use client";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { authenticate } from "@/actions";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
import { useEffect } from "react";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/"); // esto es para refrescar el navegador en cache
    }
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div className="flex h-8 items-end space-x-1">
        {state === "Credenciales incorrectas" && (
          <div className="mb-2 flex">
            <IoInformationOutline className="text-red-500 text-2xl" />
            <p className="text-red-500 text-center">Credenciales incorrectas</p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({ "btn-primary": !pending }, { "btn-disabled": pending })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
