"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/source/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // recordar q se pueden tener 2 productos con el mismo productId
  // pero diferentes talles

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((product) => product.productId),
      },
    },
  });

  // calcular los montos

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // totales de tax, subtotal y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        throw new Error(`${item.productId} no existe - 500`);
      }

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal + totals.tax;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    // transaction (tx)
    const prismaTx = await prisma.$transaction(async (tx) => {
      // actualizar el stock de los productos
      const updatedProductsPromises = products.map(async (product) => {
        // acumular los valores de cantidad de productos
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((count, p) => count + p.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.title} no tiene Stock`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            // decrementar el stock
            // OJO NO usar inStock: { product.inStock - productQuantity }
            // porque el inStock que estas usando es viejo
            // ya que fue lo q usaste cuando leiste la ddbb
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // verificar stocks negativos, eso seria q no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene Stock`);
        }
      });

      // crear la orden
      const order = await tx.order.create({
        data: {
          userId: userId,
          total,
          tax,
          subTotal,
          itemsInOrder,
          OrderItem: {
            createMany: {
              data: productIds.map((product) => {
                return {
                  productId: product.productId,
                  quantity: product.quantity,
                  size: product.size,
                  price:
                    products.find((p) => p.id === product.productId)?.price ??
                    0, // ojo con esto, desp chequear si hay precio cero y tirar error
                };
              }),
            },
          },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { country, ...restAddress } = address;
      // crear la dirección de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order,
        orderAddress,
        updatedProducts,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
