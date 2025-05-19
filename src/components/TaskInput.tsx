import { HStack, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

type Props = {
  date: string;
  onAdd?: (text: string) => void; // optional でテスト対応
};

const TaskInput = ({ date, onAdd }: Props) => {
  const { addTask } = useTodos();
  const [input, setInput] = useState('');
  
  const handleAdd = () => {
    if (input.trim() === '') return;
    if (onAdd) {
      onAdd(input); // テスト用：モック関数が呼ばれる
    } else {
      addTask({ text: input, date }); // 本番用：Contextからの関数が呼ばれる
    }

    setInput(''); // ← 入力欄をリセット！
  };

  return (
    <HStack mt="20px">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
        data-testid="task-input"
      />
      <Button onClick={handleAdd} colorScheme="blue" data-testid="add-button">
        追加
      </Button>
    </HStack>
  );
}
export default TaskInput;