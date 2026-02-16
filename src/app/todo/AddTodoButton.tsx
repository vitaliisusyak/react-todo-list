"use client";
import { useDispatch } from "react-redux";
import { addTodo } from "../../todoSlice";
import { useState } from "react";

export default function AddTodoButton() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText("");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="border rounded px-2 py-1 flex-1"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new todo..."
        onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
      />
      <button
        className="bg-blue-600 text-white px-4 py-1 rounded"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}
