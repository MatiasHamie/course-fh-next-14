import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.todo.deleteMany({}); // delete * from todo

  await prisma.todo.createMany({
    data: [
      {
        description: "Piedra del alma",
        complete: true,
      },
      {
        description: "Piedra del tiempo",
        complete: false,
      },
      {
        description: "Piedra de la mente",
        complete: false,
      },
      {
        description: "Piedra de la realidad",
        complete: false,
      },
      {
        description: "Piedra del poder",
        complete: false,
      },
      {
        description: "Piedra del espacio",
        complete: false,
      },
    ],
  });

  // const todo = await prisma.todo.create({
  //   data: {
  //     description: "Piedra del alma",
  //     complete: true,
  //   },
  // });

  // console.log(todo);

  return NextResponse.json({ message: "Seed Executed" });
}
