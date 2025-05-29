// 日付を選んで「カード（＝その日付のタスク一覧）」を追加する
// 追加された各カードには、個別にタスク入力・完了チェック・削除・フィルター機能がある（←これは TaskCard.tsx に実装済）

import { useState, useEffect, useCallback } from 'react';
import { Box, Stack, TextField, Button, Select, MenuItem, Grid, Toolbar } from '@mui/material';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import Nav from './components/Nav';

type Filter = 'all' | 'active' | 'completed';

export default function App() {
  const [cards, setCards] = useState<string[]>([]);
  // 追加されたカード（日付文字列）の配列

  const [newDate, setNewDate] = useState('');
  // ユーザーが <Input type="date" /> で選んだ日付（1枚追加する用）
  // 初期値は空文字列 '' です。

  const [filter, setFilter] = useState<Filter>('all');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  // localStorage から cards を読み込み
  useEffect(() => {
    const stored = localStorage.getItem('cards');
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  // cards が変わるたびに保存
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!newDate || cards.includes(newDate)) return;
    // 入力が空、またはすでに同じ日付が追加済みなら何もしない（return）
    // newDate === ''（空）→ !'' → true
    // Array.prototype.includes() は、配列の中に特定の値が含まれているかどうかをチェックするためのメソッド

    // カード追加＋ソート（昇順）
    const updated = [...cards, newDate].sort();
    setCards(updated);
    setNewDate('');
  };

  // 関数をメモ化
  const handleRemoveCard = useCallback(
    (target: string) => {
      setCards((prev) => prev.filter((d) => d !== target));
    },
    [] // または [cards]、依存に応じて
  );

  return (
    <Stack spacing={4} padding={0}>
      <>
        {/* Header を上に配置（固定表示） */}
        <Header onMenuClick={toggleDrawer} isDrawerOpen={drawerOpen} />

        {/* Drawer + メイン表示を横並びに */}
        <Box sx={{ display: 'flex' }}>
          <Nav open={drawerOpen} onClose={closeDrawer} />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {/* AppBar の高さ分のスペースを空ける */}
            <Toolbar />
          </Box>
        </Box>
      </>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          sx={{ width: 200 }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={addCard}
          sx={{ bgcolor: 'secondary.main' }}
        >
          カード追加
        </Button>
      </Stack>

      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: 200 }}>
          <Select
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
          >
            <MenuItem value="all">すべて</MenuItem>
            <MenuItem value="active">未完了</MenuItem>
            <MenuItem value="completed">完了済み</MenuItem>
          </Select>
        </Box>
      </Stack>

      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: '1000px',
            px: 2,
            mx: 'auto',
            mb: 4,
          }}
        >
          {cards.map((date) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TaskCard
                key={date}
                date={date}
                filter={filter}
                // ✅ カード削除関数を内部にまとめた形式
                onRemoveCard={handleRemoveCard}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
