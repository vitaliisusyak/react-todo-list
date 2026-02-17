import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) todo.text = action.payload.text;
    },
    completeTodo: (state, action: PayloadAction<{ id: string; complete: boolean }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) todo.completed = action.payload.complete;
    },
    reorderTodos: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const [removed] = state.todos.splice(action.payload.startIndex, 1);
      state.todos.splice(action.payload.endIndex, 0, removed);
    },
  },
});

export const { addTodo, deleteTodo, editTodo, completeTodo, reorderTodos } = todoSlice.actions;
export default todoSlice.reducer;
