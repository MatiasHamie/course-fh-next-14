"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation"; // prestar atencion a importarlo de next/navigation y no next/router

interface Props {
  todos: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();

  const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await todosApi.updateTodo(id, complete);

    router.refresh(); // esto hace que no haga falta usar redux para este caso

    return updatedTodo;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
