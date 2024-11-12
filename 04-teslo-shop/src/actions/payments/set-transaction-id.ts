"use server";
import prisma from "@/source/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!updatedOrder) {
      return {
        ok: false,
        message: `No se pudo encontrar la orden con el ID ${orderId}`,
      };
    }
    console.log(updatedOrder);
    return { ok: true, order: updatedOrder };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo actualizar el ID de la transaction",
    };
  }
};
