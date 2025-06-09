import { useState } from 'react';
import { Box, Checkbox, TextField, Button, IconButton, Typography, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTodos } from '../hooks/useTodos';
import type { TaskListProps } from '../types';
// import { AnimatePresence, motion } from 'framer-motion';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import SortableTaskItem from './SortableTaskItem';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useTaskContext } from '../context/useTaskContext';

const TaskList = ({ tasks, statusFilter, date, allTasks, onReorder }: TaskListProps) => {
  const { moveTask } = useTaskContext();
  const { toggleTask, deleteTask, editTask, startEdit, cancelEdit } = useTodos();
  const [editedTexts, setEditedTexts] = useState<Record<number, string>>({});
  // タスク編集時に「一時f的に入力中のテキスト」を保持するためです。

  const filteredTasks = tasks.filter((task) =>
    statusFilter === 'all' ? true : statusFilter === 'active' ? !task.done : task.done
  );
  // ⭐ useDragAndDropの型は破棄、handlersだけ実行させる
  useDragAndDrop(
    allTasks,
    (d, newTasks) => {
      if (d === date) {
        onReorder(newTasks); // 同一日付内の並び替えのみを担当
      }
    },
    moveTask // 実際の移動処理はApp.tsxで処理される
  );
  console.log(`✅ TaskList(${date}) tasks:`, tasks);
  console.log(`🎯 Filter: ${statusFilter}, Filtered Tasks(${date}):`, filteredTasks);
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SortableContext
        id={`card-${date}`}
        // ドラッグ可能なアイテムの一覧を SortableContext に教えるための指定
        items={filteredTasks.map((task) => task.id.toString())}
        // 並び替えのアルゴリズム（表示上の並び）を指定
        strategy={verticalListSortingStrategy}
      >
        {/* <AnimatePresence> */}
        {filteredTasks.map((task) => (
          <SortableTaskItem key={`${task.id}-${date}`} task={task} date={date}>
            {({ attributes, listeners }) => (
              // <motion.div
              //   initial={false}
              //   animate={{ y: 0 }}
              //   exit={{ x: -20 }}
              //   transition={{ duration: 0.3 }}
              // >
              <div>
                <Box display="flex" alignItems="center" gap={1} width="100%">
                  {/* <AnimatePresence mode="wait" initial={false}> */}
                  {task.isEditing ? (
                    <div
                      key="edit"
                      // initial={false}
                      // animate={{ opacity: 1 }}
                      // exit={{ opacity: 0 }}
                      // transition={{ duration: 0.3 }}
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
                    </div>
                  ) : (
                    <div
                      key="view"
                      // initial={{ opacity: 0 }}
                      // animate={{ opacity: 1 }}
                      // exit={{ opacity: 0 }}
                      // transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                      }}
                    >
                      <Box
                        {...attributes}
                        {...listeners}
                        sx={{ cursor: 'grab', display: 'flex', alignItems: 'center' }}
                      >
                        <DragIndicatorIcon />
                      </Box>
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
                        onClick={() => deleteTask(task.id)}
                        aria-label="delete"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                  {/* </AnimatePresence> */}
                </Box>
                {/* </motion.div> */}
              </div>
            )}
          </SortableTaskItem>
        ))}
        {/* </AnimatePresence> */}
      </SortableContext>
    </Box>
  );
};
export default TaskList;
