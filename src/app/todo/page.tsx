import ReduxProvider from "../ReduxProvider";
import TodoList from "./TodoList";

export default function TodoPage() {
  return (
    <ReduxProvider>
      <div className="p-8 mx-auto w-1/2">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <TodoList />
      </div>
    </ReduxProvider>
  );
}
