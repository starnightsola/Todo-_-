import { HStack, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() === '') return;
    onAdd(input);
    setInput('');
  };

  return (
    <HStack>
      <Input
        placeholder="タスクを入力"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleAdd} colorScheme="blue">
        追加
      </Button>
    </HStack>
  );
}