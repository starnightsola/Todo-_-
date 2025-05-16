// TaskProvider は「家族みんなにタスク用の引き出しを配るお父さん役」
// 状態とdispatchを作って、全体に渡す
import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { reducer } from '../reducer';
import { TaskContext } from './TaskContext';

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(reducer, []);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};