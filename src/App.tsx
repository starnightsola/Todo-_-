// 日付を選んで「カード（＝その日付のタスク一覧）」を追加する
// 追加された各カードには、個別にタスク入力・完了チェック・削除・フィルター機能がある（←これは TaskCard.tsx に実装済）

import { Box, Stack, TextField, Button, Select, MenuItem, Grid } from '@mui/material';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import Nav from './components/Nav';
import { useCards } from './hooks/useCards';
import { useFilter } from './hooks/useFilter';

export default function App() {
  const { cards, newDate, setNewDate, addCard, handleRemoveCard } = useCards();

  const {
    statusFilter,
    setStatusFilter,
    drawerOpen,
    toggleDrawer,
    closeDrawer,
    handleDateFilterChange,
    filteredCards,
  } = useFilter(cards);

  return (
    <Stack spacing={4} padding={0}>
      <>
        {/* Header を上に配置（固定表示） */}
        <Header onMenuClick={toggleDrawer} isDrawerOpen={drawerOpen} />

        {/* Drawer + メイン表示を横並びに */}
        <Box sx={{ display: 'flex' }}>
          <Nav
            open={drawerOpen}
            onClose={closeDrawer}
            onFilterChange={handleDateFilterChange} // ← Propsに追加する必要あり
          />
        </Box>
      </>
      <Box component="main" sx={{ flexGrow: 1, pt: 4 }}>
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
            mt: 4,
          }}
        >
          <Box sx={{ width: 200 }}>
            <Select
              fullWidth
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'completed')}
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
              mt: 4,
            }}
          >
            {filteredCards.map((date) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={date}>
                <TaskCard date={date} statusFilter={statusFilter} onRemoveCard={handleRemoveCard} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}
