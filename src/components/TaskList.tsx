import { useState } from 'react';
import { Box, Checkbox, TextField, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTodos } from '../hooks/useTodos';
import type { TaskListProps } from '../types';

const TaskList = ({ statusFilter, date }: TaskListProps) => {
  const { tasks, toggleTask, removeTask, editTask, startEdit, cancelEdit } = useTodos();
  const [editedTexts, setEditedTexts] = useState<Record<number, string>>({});
  // タスク編集時に「一時的に入力中のテキスト」を保持するためです。

  const filteredTasks = tasks
    .filter((task) => task.date === date)
    .filter((task) =>
      statusFilter === 'all' ? true : statusFilter === 'active' ? !task.done : task.done
    );

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {filteredTasks.map((task) => (
        <Box key={task.id} display="flex" alignItems="center" gap={1}>
          {task.isEditing ? (
            <>
              <TextField
                fullWidth
                value={editedTexts[task.id] || ''}
                onChange={(e) => setEditedTexts((prev) => ({ ...prev, [task.id]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    editTask({ id: task.id, text: editedTexts[task.id] });
                  }
                  if (e.key === 'Escape') {
                    cancelEdit(task.id);
                  }
                }}
              />
              <Button
                onClick={() => editTask({ id: task.id, text: editedTexts[task.id] })}
                size="small"
                variant="contained"
              >
                保存
              </Button>
              <IconButton onClick={() => cancelEdit(task.id)} size="small">
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Checkbox checked={task.done} onChange={() => toggleTask(task.id)} size="small" />
              <Typography sx={{ flexGrow: 1 }}>{task.text}</Typography>
              <Button
                onClick={() => {
                  startEdit(task.id);
                  setEditedTexts((prev) => ({ ...prev, [task.id]: task.text }));
                }}
                size="small"
                variant="outlined"
              >
                編集
              </Button>
              <IconButton onClick={() => removeTask(task.id)} aria-label="delete" size="small">
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};
export default TaskList;
