import { HStack, Checkbox, CloseButton, Stack, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

export type Filter = 'all' | 'active' | 'completed';

type Props = {
  filter: Filter;
  date: string;
};

const TaskList = ({ filter, date }: Props) => {
  const { tasks, toggleTask, removeTask, editTask, startEdit, cancelEdit } = useTodos();
  const [editedTexts, setEditedTexts] = useState<Record<number, string>>({});
  // タスク編集時に「一時的に入力中のテキスト」を保持するためです。

  const filteredTasks = tasks
    .filter((task) => task.date === date)
    .filter((task) =>
      filter === 'all' ? true : filter === 'active' ? !task.done : task.done
    );


  return (
    <Stack spacing={3}>
      {filteredTasks.map((task) => (
        <HStack key={task.id} justifyContent="space-between">
          {task.isEditing ? (
            <HStack w="100%">
              <Input
                value={editedTexts[task.id] || ''}
                onChange={(e) =>
                  setEditedTexts((prev) => ({ ...prev, [task.id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    editTask({ id: task.id, text: editedTexts[task.id] });
                  }
                  if (e.key === 'Escape') {
                    cancelEdit(task.id);
                  }
                }}
              />
              <HStack spacing={2}>
                <Button onClick={() => editTask({ id: task.id, text: editedTexts[task.id] })} size="sm">
                  保存
                </Button>
                <Button onClick={() => cancelEdit(task.id)} size="sm" colorScheme="gray">
                  キャンセル
                </Button>
              </HStack>
            </HStack>
          ) : (
            <HStack w="100%" justifyContent="space-between">
              <Checkbox isChecked={task.done} onChange={() => toggleTask(task.id)}>
                {task.text}
              </Checkbox>
              <HStack>
                <Button
                  onClick={() => {
                    startEdit(task.id);
                    setEditedTexts((prev) => ({ ...prev, [task.id]: task.text }));
                  }}
                  size="sm"
                >
                  編集
                </Button>
                <CloseButton onClick={() => removeTask(task.id)} />
              </HStack>
            </HStack>
          )}
        </HStack>
      ))}
    </Stack>
  );
}
export default TaskList;