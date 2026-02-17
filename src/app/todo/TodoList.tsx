"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import TodoItem from "./TodoItem";
import AddTodoButton from "./AddTodoButton";
import { reorderTodos, Todo } from "@/todoSlice";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleReorder = (startIndex: number, endIndex: number) => {
    dispatch(reorderTodos({ startIndex, endIndex }));
  };

  return (
    <div>
      <AddTodoButton />
      <ul className="mt-4 space-y-2 w-1/2">
        {todos.map((todo: Todo, idx: number) => (
          <TodoItem key={todo.id} todo={todo} index={idx} onReorder={handleReorder} />
        ))}
      </ul>
    </div>
  );
}
