// TaskContext という引き出しを使うための鍵
// 必要な場所から Context を安全に取り出す関数
import { useContext } from 'react';
import { TaskContext } from './TaskContext';

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  return context;
};