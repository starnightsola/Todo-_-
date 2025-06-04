// TaskProvider は「家族みんなにタスク用の引き出しを配るお父さん役」
// 状態とdispatchを作って、全体に渡す
import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { reducer } from '../reducer';
import { TaskContext } from './TaskContext';
import type { TaskState } from '../types';

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const initialState: TaskState = {};
  const [tasks, dispatch] = useReducer(reducer, initialState);

  return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>;
};
