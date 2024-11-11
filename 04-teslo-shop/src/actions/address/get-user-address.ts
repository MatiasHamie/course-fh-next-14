import prisma from "@/source/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findFirst({
      where: { userId },
    });

    if (!address) return null;

    const { countryId, ...rest } = address;

    return {
      ...rest,
      country: countryId,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
};
