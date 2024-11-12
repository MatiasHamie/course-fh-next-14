import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    totalItems: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();

        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

        return totalItems;
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subtotal, product) => subtotal + product.price * product.quantity,
          0
        );

        const tax = subTotal * 0.15;

        const total = subTotal + tax;

        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

        return {
          subTotal,
          tax,
          total,
          totalItems,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // 1. Check if the product is already in the cart
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. If the product is already in the cart, update the quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const isInCart = cart.some(
          (product) =>
            product.id === product.id && product.size === product.size
        );

        if (!isInCart) return;

        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: updatedCart });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCart = cart.filter(
          (productInCart) =>
            productInCart.id !== product.id ||
            productInCart.size !== product.size
        );

        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),
    }),

    { name: "shopping-cart" }
  )
);
