// src/types.ts

// タスク1件のデータ型
export type Task = {
    text: string;     // タスクの内容
    done: boolean;    // 完了状態（true: 完了 / false: 未完了）
  };