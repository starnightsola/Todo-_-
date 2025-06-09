// TaskProvider は「家族みんなにタスク用の引き出しを配るお父さん役」
// 状態とdispatchを作って、全体に渡す
import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { reducer } from '../reducer';
import { TaskContext } from './TaskContext';
import type { TaskState, Task } from '../types';

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const initialState: TaskState = {};
  const [tasks, dispatch] = useReducer(reducer, initialState);
  // TaskContextType に合わせた関数を定義
  const handleReorder = (date: string, newTasks: Task[]) => {
    dispatch({ type: 'replace', payload: { date, tasks: newTasks } });
  };

  const moveTask = (fromDate: string, toDate: string, task: Task) => {
    dispatch({ type: 'move', payload: { fromDate, toDate, task } });
  };
  return (
    <TaskContext.Provider value={{ tasks, dispatch, handleReorder, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};
