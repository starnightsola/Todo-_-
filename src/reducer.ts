import type { Task, Action } from './types';

// この関数の戻り値の型 → タスクの配列（新しい状態）
export const reducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'add': {
      const newTask: Task = {
        id: Date.now(),
        text: action.payload.text,
        done: false,
        isEditing: false, // ✅ ← これを追加！
        date: action.payload.date, // ✅ ここも追加
      };
      return [...state, newTask];
    }

    case 'toggle': {
      return state.map(task =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
    }

    case 'remove': {
      return state.filter(task => task.id !== action.payload);
    }

    case 'startEdit':
      return state.map((task) =>
        task.id === action.payload ? { ...task, isEditing: true } : task
      );

    case 'cancelEdit':
      return state.map((task) =>
        task.id === action.payload ? { ...task, isEditing: false } : task
      );

    case 'edit':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text, isEditing: false }
          : task
      );

    case 'load':
      return action.payload;
    
    default:
      return state;
  }
};
