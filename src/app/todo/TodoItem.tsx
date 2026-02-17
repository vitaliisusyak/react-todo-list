"use client";
import { useDispatch } from "react-redux";
import {completeTodo, deleteTodo, editTodo, Todo} from "@/todoSlice";
import { useState } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

interface TodoItemProps {
  todo: Todo;
  index: number;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export default function TodoItem({ todo, index, onReorder }: TodoItemProps) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [completed, setComplete] = useState(todo.completed);
  const [dragOver, setDragOver] = useState(false);

  const handleEdit = () => {
    if (editing && text.trim() && text !== todo.text) {
      dispatch(editTodo({ id: todo.id, text: text.trim() }));
    }
    setEditing(!editing);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

    const handleComplete = (checked: boolean) => {
        dispatch(completeTodo({ id: todo.id, complete: checked }));
        setComplete(checked);
    };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDragOver(false);
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (fromIndex !== index) {
      onReorder(fromIndex, index);
    }
  };

  const handleDragEnd = () => {
    setDragOver(false);
  };

  return (
    <li
      className={`flex items-center justify-between gap-2${dragOver ? " bg-blue-100" : ""}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
        <div className="flex items-center gap-2 flex-1 bg-zinc-100 rounded-lg p-2">
            {editing ? (
                <input
                    className="flex flex-1 focus:outline-none focus:bg-white"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleEdit(); }}
                    autoFocus
                />
            ) : (
                <div className="flex items-center gap-2 flex-1">
                    <input
                        className="cursor-pointer"
                        type="checkbox"
                        checked={completed}
                        onChange={e => handleComplete(e.target.checked)}
                    />
                    <span className={`flex-1 ${completed ? 'line-through' : ''}`} onDoubleClick={() => setEditing(true)}>{todo.text}</span>
                </div>
            )}
        </div>
        <div className="flex gap-2">
            <button className="text-blue-600 cursor-pointer" onClick={handleEdit} title={editing ? "Save" : "Edit"}>
                {editing ? <FaSave /> : <FaEdit />}
            </button>
            <button className="text-red-600 cursor-pointer" onClick={handleDelete} title="Delete">
                <FaTrash />
            </button>
        </div>
    </li>
  );
}
