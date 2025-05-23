// src/types.ts

// タスク1件のデータ型
export type Task = {
  id: number;
  text: string;     // タスクの内容
  done: boolean;    // 完了状態（true: 完了 / false: 未完了）
  isEditing: boolean; // ← 追加
  date: string;;
};

export type Action =
  | { type: 'add'; payload: { text: string; date: string } }
  | { type: 'toggle'; payload: number }
  | { type: 'remove'; payload: number }
  | { type: 'load'; payload: Task[] } // ← OK！
  | { type: 'edit'; payload: { id: number; text: string } }
  | { type: 'startEdit'; payload: number }
  | { type: 'cancelEdit'; payload: number }
  | { type: 'patch'; payload: TaskPatchInput }; // ✅ 追加！

// 編集時に必要な最小情報
export type TaskEditInput = {
  id: number;
  text: string;
};

// パッチ処理：idは必須、他は任意
export type TaskPatchInput = Partial<Omit<Task, 'id'>> & { id: number };

export type NewTaskInput = {
  text: string;
  date: string;
};