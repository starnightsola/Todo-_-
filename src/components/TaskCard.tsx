import React from 'react';
import { useEffect } from 'react'; // ✅ useState を追加
import { Card, CardHeader, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { useTaskContext } from '../context/useTaskContext';
import type { TaskCardProps } from '../types';

const TaskCard = ({ date, statusFilter, onRemoveCard }: TaskCardProps) => {
  // console.log(`${date} カードが再レンダリングされました！`);
  console.count(`TaskCard ${date}`);
  const { tasks, dispatch } = useTaskContext();

  const storageKey = `tasks-${date}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      dispatch({ type: 'load', payload: JSON.parse(stored) });
    }
  }, [storageKey, dispatch]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);
  // useEffect(() => {
  //   console.log(`${date} useEffectでレンダリングされた`);
  // }, [date]);
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
        <TaskList statusFilter={statusFilter} date={date} />
        <TaskInput date={date} />
      </CardContent>
    </Card>
  );
};
// ✅ メモ化することで、dateやonRemoveCardが変わらない限り、再レンダリングされない！
export default React.memo(TaskCard, (prevProps, nextProps) => {
  return prevProps.date === nextProps.date && prevProps.statusFilter === nextProps.statusFilter;
});
