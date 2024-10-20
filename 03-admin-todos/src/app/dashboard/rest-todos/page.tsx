import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div>
      <div className="w-full px-2 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
