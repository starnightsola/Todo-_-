import { HStack, Checkbox, CloseButton, Stack } from '@chakra-ui/react';
import type { Task } from '../types';

type Props = {
  tasks: Task[];
  toggleDone: (index: number) => void;
  remove: (index: number) => void;
};

export default function TaskList({ tasks, toggleDone, remove }: Props) {
  return (
    <Stack spacing={3}>
      {tasks.map((task, index) => (
        <HStack key={index} justifyContent="space-between">
          <Checkbox
            isChecked={task.done}
            onChange={() => toggleDone(index)}
          >
            {task.text}
          </Checkbox>
          <CloseButton onClick={() => remove(index)} />
        </HStack>
      ))}
    </Stack>
  );
}