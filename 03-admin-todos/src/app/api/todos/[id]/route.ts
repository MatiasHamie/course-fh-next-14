import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";

import * as yup from "yup";

interface Args {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();

  if (!user) return null;

  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  });

  if (todo?.userId !== user.id) return null;

  return todo;
};

export async function GET(request: Request, args: Args) {
  const { id } = args.params;

  const todo = await getTodo(id);

  if (!todo) throw NextResponse.json({ message: "Todo not found" });

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.bool().optional(),
});

export async function PUT(request: Request, args: Args) {
  const { id } = args.params;

  const todo = await getTodo(id);

  if (!todo) throw NextResponse.json({ message: "Todo not found" });

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
