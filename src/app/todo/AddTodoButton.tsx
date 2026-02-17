"use client";
import { useDispatch } from "react-redux";
import { addTodo } from "../../todoSlice";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

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
        className="border-0 border-b-2 border-blue-400 focus:border-blue-600 bg-transparent px-2 py-1 flex-1 outline-none transition-colors duration-200"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task..."
        onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
      />
      <button className="cursor-pointer" onClick={handleAdd} title="Add">
        <FaPlus />
      </button>
    </div>
  );
}
