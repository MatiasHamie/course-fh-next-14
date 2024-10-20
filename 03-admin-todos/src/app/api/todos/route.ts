import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

// Prisma Pagination - Docs: https://www.prisma.io/docs/concepts/components/prisma-client/pagination

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take")) || 10;
  const skip = Number(searchParams.get("skip")) || 0;

  if (isNaN(take))
    throw NextResponse.json({ message: "Invalid take parameter" });

  if (isNaN(skip))
    throw NextResponse.json({ message: "Invalid skip parameter" });

  const todos = await prisma.todo.findMany({
    take,
    skip,
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.bool().default(false),
});

export async function POST(request: Request) {
  try {
    // const { description, complete } = await request.json();
    const { description, complete } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: {
        description,
        complete,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  try {
    const { count } = await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });

    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
