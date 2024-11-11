"use server";

import { Address } from "@/interfaces";
import prisma from "@/source/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: "No se pudo grabar la dirección del usuario",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findFirst({
      where: { userId },
    });

    const addressToSave = {
      userId,
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (storedAddress) {
      const updatedAddress = await prisma.userAddress.update({
        where: { userId },
        data: addressToSave,
      });

      return updatedAddress;
    } else {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo grabar la dirección del usuario");
  }
};
