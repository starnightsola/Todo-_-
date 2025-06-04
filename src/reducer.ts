import type { Task, Action, TaskState } from './types';

// この関数の戻り値の型 → タスクの配列（新しい状態）
export const reducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    // 各アクションに応じて state（TaskState）を更新

    // タスクを日付ごとに追加
    case 'add': {
      const { text, date } = action.payload;
      const newTask: Task = {
        id: Date.now(),
        text,
        done: false,
        isEditing: false,
        date,
      };
      return {
        ...state,
        [date]: [...(state[date] || []), newTask],
      };
    }

    // 完了状態（done）」を true ⇄ false に切り替え
    case 'toggle': {
      const id = action.payload;
      const newState: TaskState = {};
      // 更新後の状態をここに入れる。

      // 全ての日付 (date) を for...in でループ
      for (const date in state) {
        newState[date] = state[date].map((task) =>
          task.id === id ? { ...task, done: !task.done } : task
        );
      }
      return newState;
    }

    // 指定されたIDのタスクを削除する
    case 'remove': {
      const id = action.payload;
      const newState: TaskState = {};
      for (const date in state) {
        newState[date] = state[date].filter((task) => task.id !== id);
      }
      return newState;
    }

    // 特定のタスクを「編集中」に切り替える
    case 'startEdit': {
      const id = action.payload;
      const newState: TaskState = {};
      for (const date in state) {
        newState[date] = state[date].map((task) =>
          task.id === id ? { ...task, isEditing: true } : task
        );
      }
      return newState;
    }

    // タスクの編集をキャンセル
    case 'cancelEdit': {
      const id = action.payload;
      const newState: TaskState = {};
      for (const date in state) {
        newState[date] = state[date].map((task) =>
          task.id === id ? { ...task, isEditing: false } : task
        );
      }
      return newState;
    }

    // タスクの編集を確定して保存する処理
    case 'edit': {
      const { id, text } = action.payload;
      const newState: TaskState = {};
      for (const date in state) {
        newState[date] = state[date].map((task) =>
          task.id === id ? { ...task, text, isEditing: false } : task
        );
      }
      return newState;
    }

    // ローカルストレージから取得した日付ごとのタスク一覧
    case 'load': {
      // すでに日付ごとの形式になっている TaskState をそのまま使う
      return action.payload;
    }

    case 'replace': {
      const { date, tasks } = action.payload;
      return {
        ...state,
        [date]: tasks,
      };
    }

    default:
      return state;
  }
};
