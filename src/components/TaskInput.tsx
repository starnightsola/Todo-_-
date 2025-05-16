import { HStack, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

type Props = {
  date: string;
};

const TaskInput = ({ date }: Props) => {
  const { addTask } = useTodos();
  const [input, setInput] = useState('');
  
  const handleAdd = () => {
    if (input.trim() === '') return;
    addTask({ text: input, date }); // ✅ ここで date を渡す
    setInput('');
  };

  return (
    <HStack mt="20px">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
      />
      <Button onClick={handleAdd} colorScheme="blue">
        追加
      </Button>
    </HStack>
  );
}
export default TaskInput;