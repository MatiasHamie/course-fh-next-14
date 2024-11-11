import prisma from "../source/lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  // Borrar registros previos
  await prisma.userAddress.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, users, products } = initialData;

  // Crear categorías
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.user.createMany({
    data: users,
  });

  await prisma.country.createMany({
    data: countries,
  });

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    const key = category.name.toLocaleLowerCase();
    const value = category.id;
    map[key] = value;

    return map;
  }, {} as Record<string, string>); // <string=shirt, string=categoryID>

  // Productos

  products.forEach(async (product) => {
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("seed executed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
