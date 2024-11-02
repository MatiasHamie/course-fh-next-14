"use server";

import prisma from "@/source/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findUnique({
      select: {
        inStock: true,
      },
      where: {
        slug,
      },
    });

    return stock?.inStock ?? 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
