"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";
import { CartProduct } from "@/interfaces";

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProductFromCart = useCartStore((state) => state.removeProduct);

  const [isLoaded, setIsLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const onQuantityChanged = (product: CartProduct, quantity: number) => {
    updateProductQuantity(product, quantity);
  };

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{ width: "100px", height: "100px" }}
            alt={product.title}
            className="mr-5"
          />

          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.title}
            </Link>

            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(value) => onQuantityChanged(product, value)}
            />
            <button
              className="underline mt-3"
              onClick={() => removeProductFromCart(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
