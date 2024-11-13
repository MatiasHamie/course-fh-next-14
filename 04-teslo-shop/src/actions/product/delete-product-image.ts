"use server";
import prisma from "@/source/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "Invalid image URL",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
  console.log(imageName);

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`products/${deletedImage.product.slug}`);
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
};
