import { useState } from 'react';
import { Box, Checkbox, TextField, Button, IconButton, Typography, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTodos } from '../hooks/useTodos';
import type { TaskListProps } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import SortableTaskItem from './SortableTaskItem';

const TaskList = ({ tasks, statusFilter, onReorder }: TaskListProps) => {
  const { toggleTask, removeTask, editTask, startEdit, cancelEdit } = useTodos();
  const [editedTexts, setEditedTexts] = useState<Record<number, string>>({});
  // タスク編集時に「一時的に入力中のテキスト」を保持するためです。

  const filteredTasks = tasks.filter((task) =>
    statusFilter === 'all' ? true : statusFilter === 'active' ? !task.done : task.done
  );

  const { sensors, handleDragStart, handleDragEnd, activeTask } = useDragAndDrop(tasks, onReorder);
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext
          // ドラッグ可能なアイテムの一覧を SortableContext に教えるための指定
          items={filteredTasks.map((task) => task.id.toString())}
          // 並び替えのアルゴリズム（表示上の並び）を指定
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <SortableTaskItem key={task.id} task={task}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box display="flex" alignItems="center" gap={1} width="100%">
                    <AnimatePresence mode="wait" initial={false}>
                      {task.isEditing ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '100%',
                          }}
                        >
                          <TextField
                            fullWidth
                            value={editedTexts[task.id] || ''}
                            onChange={(e) =>
                              setEditedTexts((prev) => ({ ...prev, [task.id]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (editedTexts[task.id].trim() === '') return; // ← 追加！
                                editTask({ id: task.id, text: editedTexts[task.id] });
                              }
                              if (e.key === 'Escape') {
                                cancelEdit(task.id);
                              }
                            }}
                          />
                          <Button
                            onClick={() => {
                              if (editedTexts[task.id].trim() === '') return; // ← 追加！
                              editTask({ id: task.id, text: editedTexts[task.id] });
                            }}
                            size="small"
                            variant="contained"
                          >
                            保存
                          </Button>
                          <Tooltip title="キャンセル">
                            <IconButton onClick={() => cancelEdit(task.id)} size="small">
                              <CloseIcon />
                            </IconButton>
                          </Tooltip>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="view"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '100%',
                          }}
                        >
                          <Checkbox
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                            size="small"
                          />
                          <Typography
                            sx={{
                              flexGrow: 1,
                              textDecoration: task.done ? 'line-through' : 'none',
                              transition: 'all 0.3s ease',
                              color: task.done ? 'gray' : 'inherit',
                            }}
                          >
                            {task.text}
                          </Typography>
                          <Button
                            onClick={() => {
                              startEdit(task.id);
                              setEditedTexts((prev) => ({ ...prev, [task.id]: task.text }));
                            }}
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            編集
                          </Button>

                          <IconButton
                            onClick={() => removeTask(task.id)}
                            aria-label="delete"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </motion.div>
              </SortableTaskItem>
            ))}
          </AnimatePresence>
        </SortableContext>
        {/* ✅ ドラッグ中のUIを表示 */}
        <DragOverlay>
          {activeTask ? (
            <Box
              sx={{
                p: 1,
                px: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 3,
              }}
            >
              <Typography>{activeTask.text}</Typography>
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};
export default TaskList;
