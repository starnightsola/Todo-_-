import { useEffect } from 'react';
import { Card, CardHeader, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import type { TaskCardProps } from '../types';
import { useDroppable } from '@dnd-kit/core';
import { useCards } from '../hooks/useCards';

const TaskCard = ({ date, statusFilter, allTasks, onReorder, deleteCardByDate }: TaskCardProps) => {
  const tasks = allTasks[date] || [];
  const storageKey = `tasks-${date}`;

  // ⬇︎ 追加（useCards から cards を取得）
  const { cards } = useCards();

  const { setNodeRef } = useDroppable({
    id: `card-${date}`,
    data: { date, type: 'card' },
  });

  // 保存（この日付の tasks が更新されるたび）
  useEffect(() => {
    if (tasks.length > 0 && cards.includes(date)) {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      console.log(`💾 Saved tasks for ${date}:`, tasks);
    }
  }, [tasks, storageKey, cards, date]);

  return (
    <Card sx={{ width: '100%' }} ref={setNodeRef}>
      <CardHeader
        title={<Typography variant="h6">{date}</Typography>}
        action={
          <IconButton onClick={() => deleteCardByDate(date)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
        sx={{ paddingBottom: 2 }}
      />

      <CardContent sx={{ paddingTop: 0 }}>
        <TaskList
          key={date}
          date={date}
          statusFilter={statusFilter}
          tasks={tasks}
          allTasks={allTasks}
          onReorder={onReorder}
        />
        <TaskInput date={date} />
      </CardContent>
    </Card>
  );
};

export default TaskCard;
