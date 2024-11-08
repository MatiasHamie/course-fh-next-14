"use client";
import { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { currencyFormat } from "@/utils";

export const OrderSummary = () => {
  // Importante, el useShallow se usa porque en las nuevas versiones de zustand se rompe
  // con un infinite loop
  //https://zustand.docs.pmnd.rs/migrations/migrating-to-v5#requiring-stable-selector-outputs

  const { subTotal, tax, total, totalItems } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {totalItems === 1 ? `1 artículo` : `${totalItems} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
