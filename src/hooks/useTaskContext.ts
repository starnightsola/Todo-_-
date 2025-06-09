import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import type { Task } from '../types';

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  const { tasks, dispatch } = context;

  // タスク並び替え
  const handleReorder = (date: string, newTasks: Task[]) => {
    dispatch({ type: 'replace', payload: { date, tasks: newTasks } });
  };

  // タスク移動（カードをまたぐ）
  const moveTask = (fromDate: string, toDate: string, task: Task) => {
    dispatch({ type: 'move', payload: { fromDate, toDate, task } });
  };

  return {
    tasks,
    dispatch,
    handleReorder,
    moveTask,
  };
};
