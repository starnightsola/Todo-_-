import { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
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
    <Box mt={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力"
          size="small"
          inputProps={{ 'data-testid': 'task-input' }}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          data-testid="add-button"
          sx={{
            backgroundColor: 'primary.light',
            color: 'white', // 必要なら文字色も調整
            '&:hover': {
              backgroundColor: 'primary.main', // ホバー時の色も調整可能
            },
          }}
        >
          追加
        </Button>
      </Stack>
    </Box>
  );
};
export default TaskInput;
