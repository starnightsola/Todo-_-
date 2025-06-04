import React from 'react';
import { useEffect } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { useTaskContext } from '../context/useTaskContext';
import type { Task, TaskCardProps } from '../types';

const TaskCard = ({ date, statusFilter, tasks, onRemoveCard }: TaskCardProps) => {
  const { dispatch } = useTaskContext(); // ✅ tasks は props 経由でもらう

  const storageKey = `tasks-${date}`;

  // 読み込み（初回のみ）
  // 初回レンダリング時、localStorage に保存されているその日付のタスクリストを読み込む
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      dispatch({ type: 'load', payload: JSON.parse(stored) });
    }
  }, [storageKey, dispatch]);

  // 保存（この日付の tasks が更新されるたび）
  // tasks（全体の状態）が変化するたびに、この date に対応する部分だけ保存
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  // ✅ タスク並び替え時のコールバックを定義
  const onReorder = (newTasks: Task[]) => {
    dispatch({ type: 'replace', payload: { date, tasks: newTasks } });
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        title={<Typography variant="h6">{date}</Typography>}
        action={
          <IconButton onClick={() => onRemoveCard(date)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
        sx={{ paddingBottom: 2 }}
      />

      <CardContent sx={{ paddingTop: 0 }}>
        <TaskList tasks={tasks} statusFilter={statusFilter} date={date} onReorder={onReorder} />
        <TaskInput date={date} />
      </CardContent>
    </Card>
  );
};
// ✅ 再レンダリングを最小限に
export default React.memo(TaskCard, (prevProps, nextProps) => {
  return (
    prevProps.date === nextProps.date &&
    prevProps.statusFilter === nextProps.statusFilter &&
    prevProps.tasks === nextProps.tasks
  );
});
