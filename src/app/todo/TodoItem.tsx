"use client";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "@/todoSlice";
import { useState } from "react";

interface TodoItemProps {
  todo: { id: string; text: string; completed: boolean };
  index: number;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = () => {
    if (editing && text.trim() && text !== todo.text) {
      dispatch(editTodo({ id: todo.id, text: text.trim() }));
    }
    setEditing(!editing);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  // todo: add drag-and-drop handlers for reordering
  return (
    <li className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded px-2 py-1">
      {editing ? (
        <input
          className="flex-1 border rounded px-2 py-1"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleEdit(); }}
          autoFocus
        />
      ) : (
        <span className="flex-1" onDoubleClick={() => setEditing(true)}>{todo.text}</span>
      )}
      <button className="text-blue-600" onClick={handleEdit}>
        {editing ? "Save" : "Edit"}
      </button>
      <button className="text-red-600" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}
