import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  await prisma.todo.deleteMany({}); // delete * from todo
  await prisma.user.deleteMany({}); // delete * from user

  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client"],
      todos: {
        create: [
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
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     {
  //       description: "Piedra del alma",
  //       complete: true,
  //     },
  //     {
  //       description: "Piedra del tiempo",
  //       complete: false,
  //     },
  //     {
  //       description: "Piedra de la mente",
  //       complete: false,
  //     },
  //     {
  //       description: "Piedra de la realidad",
  //       complete: false,
  //     },
  //     {
  //       description: "Piedra del poder",
  //       complete: false,
  //     },
  //     {
  //       description: "Piedra del espacio",
  //       complete: false,
  //     },
  //   ],
  // });

  // const todo = await prisma.todo.create({
  //   data: {
  //     description: "Piedra del alma",
  //     complete: true,
  //   },
  // });

  // console.log(todo);

  return NextResponse.json({ message: "Seed Executed" });
}
