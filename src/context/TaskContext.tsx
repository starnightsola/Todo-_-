// Contextオブジェクト（状態の箱）を作るだけ
// タスクの情報をまとめて入れておく「共有の引き出し」
import { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import { reducer } from '../reducer';
import type { TaskState, Action } from '../types';

// このContextの中にはこういうデータが入るよ」という設計図（型）。
interface TaskContextType {
  tasks: TaskState; // タスクのリスト
  dispatch: React.Dispatch<Action>; // タスクを追加・削除・切り替える命令を出す関数
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
// 「TaskContext という 共通のデータ入れ物（Context） を作っています。中には tasks と dispatch を入れます。最初はまだ中身がない（undefined）状態です。」

// ✅ TaskProvider を export する！
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const initialState: TaskState = {}; // ✅ 空のオブジェクトで初期化
  const [tasks, dispatch] = useReducer(reducer, initialState);

  return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>;
};
