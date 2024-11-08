"use client";

import { QuantitySelector, SizeSelector } from "@/components";

import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      price: product.price,
      title: product.title,
      slug: product.slug,
      size,
      quantity,
      image: product.images[0],
    };
    console.log(cartProduct);

    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500">
          Debe de seleccionar una talla*
        </span>
      )}

      <SizeSelector
        availableSizes={product.sizes}
        onSizeChanged={setSize}
        selectedSize={size}
      />

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
