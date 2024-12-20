"use server";

import prisma from "@/source/lib/prisma";

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
};
