// Contextオブジェクト（状態の箱）を作るだけ
// タスクの情報をまとめて入れておく「共有の引き出し」
import { createContext } from 'react';
import type { TaskContextType } from '../types';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
// 「TaskContext という 共通のデータ入れ物（Context） を作っています。中には tasks と dispatch を入れます。最初はまだ中身がない（undefined）状態です。」
