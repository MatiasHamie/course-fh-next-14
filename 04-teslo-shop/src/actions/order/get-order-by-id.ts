"use server";
import { auth } from "@/auth.config";
import prisma from "@/source/lib/prisma";

export const getOrderByID = async (orderId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "No hay una sesión activa",
    };
  }
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new Error("No se encontró la orden");
    }

    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw new Error("Id de usuario no coincide");
      }
    }

    return { ok: true, order };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: true, message: "Hable con el administrador" };
  }
};
