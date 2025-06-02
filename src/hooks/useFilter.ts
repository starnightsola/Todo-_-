import { useState } from 'react';
import { isToday, isThisWeek } from '../utils/dateUtils';
import type { StatusFilter, DateFilter } from '../types';
import { lightTheme, darkTheme } from '../theme';

export const useFilter = (cards: string[]) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  const handleDateFilterChange = (filter: DateFilter) => {
    setDateFilter(filter);
    closeDrawer(); // メニュー閉じるなど
  };

  const filteredCards = cards.filter((date) => {
    if (dateFilter === 'all') return true;
    if (dateFilter === 'today') return isToday(date);
    if (dateFilter === 'week') return isThisWeek(date);
    return true;
  });

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = mode === 'light' ? lightTheme : darkTheme;
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  return {
    statusFilter,
    setStatusFilter,
    dateFilter,
    drawerOpen,
    toggleDrawer,
    closeDrawer,
    handleDateFilterChange,
    filteredCards,
    mode,
    setMode,
    theme,
    toggleColorMode,
    currentTheme,
  };
};
