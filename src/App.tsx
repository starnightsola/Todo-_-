// 日付を選んで「カード（＝その日付のタスク一覧）」を追加する
// 追加された各カードには、個別にタスク入力・完了チェック・削除・フィルター機能がある（←これは TaskCard.tsx に実装済）

import {
  Box,
  Stack,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Checkbox,
  Typography,
} from '@mui/material';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import Nav from './components/Nav';
import { useCards } from './hooks/useCards';
import { useFilter } from './hooks/useFilter';
import { useTaskContext } from './context/useTaskContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
// import { AnimatePresence } from 'framer-motion';
import { DndContext, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { useDragAndDrop } from './hooks/useDragAndDrop'; //
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function App() {
  const { cards, setCards, newDate, setNewDate, addCard, deleteCardByDate } = useCards();
  const {
    tasks, // ✅ タスク状態を取得
    handleReorder, // ✅ タスク並び替え
    moveTask, // ✅ タスク移動
  } = useTaskContext();
  const {
    statusFilter,
    setStatusFilter,
    drawerOpen,
    toggleDrawer,
    closeDrawer,
    handleDateFilterChange,
    filteredCards,
    mode,
    toggleColorMode,
    currentTheme,
  } = useFilter(cards);

  const { sensors, handleDragStart, handleDragEnd, handleDragOver, activeTask } = useDragAndDrop(
    tasks,
    handleReorder,
    (fromDate, toDate, task) => {
      // ✅ もし表示されてないカードなら追加
      if (!cards.includes(toDate)) {
        setCards((prev) => [...prev, toDate]);
      }
      moveTask(fromDate, toDate, task); // TaskProvider から提供される moveTask を使う
    }
  );
  console.log('📅 filteredCards', filteredCards);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Stack spacing={4} padding={0}>
          <>
            {/* Header を上に配置（固定表示） */}
            <Header
              onMenuClick={toggleDrawer}
              isDrawerOpen={drawerOpen}
              mode={mode}
              onToggleTheme={toggleColorMode}
            />

            {/* Drawer + メイン表示を横並びに */}
            <Box sx={{ display: 'flex' }}>
              <Nav
                open={drawerOpen}
                onClose={closeDrawer}
                onFilterChange={handleDateFilterChange} // ← Propsに追加する必要あり
              />
            </Box>
          </>
          <Box component="main" sx={{ flexGrow: 1, pt: 4, minHeight: '100vh' }}>
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
                  onChange={(e) =>
                    setStatusFilter(e.target.value as 'all' | 'active' | 'completed')
                  }
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
                  maxWidth: '1200px',
                  px: 2,
                  mx: 'auto',
                  mb: 4,
                  mt: 4,
                }}
              >
                {/* <AnimatePresence> */}
                {filteredCards.map((date) => {
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={date}>
                      <div key={date}>
                        {/* <motion.div
                          key={date}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        > */}
                        <TaskCard
                          key={date}
                          date={date}
                          statusFilter={statusFilter}
                          deleteCardByDate={deleteCardByDate}
                          tasks={tasks[date] || []}
                          allTasks={tasks}
                          onReorder={(newTasks) => handleReorder(date, newTasks)}
                        />
                        {/* </motion.div> */}
                      </div>
                    </Grid>
                  );
                })}
                {/* </AnimatePresence> */}
              </Grid>
            </Box>
          </Box>
        </Stack>
        {/* ✅ ドラッグ中のUIを一番下に表示 */}
        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: '1',
                },
              },
            }),
          }}
        >
          {activeTask ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                px: 2,
                bgcolor: 'white',
                borderRadius: 1,
                boxShadow: 3,
              }}
            >
              <DragIndicatorIcon />
              <Checkbox checked={activeTask.done} size="small" />
              <Typography
                sx={{
                  textDecoration: activeTask.done ? 'line-through' : 'none',
                  color: activeTask.done ? 'gray' : 'inherit',
                }}
              >
                {activeTask.text}
              </Typography>
            </Box>
          ) : null}
        </DragOverlay>
      </ThemeProvider>
    </DndContext>
  );
}
