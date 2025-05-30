import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Box } from '@mui/material';
import type { NavProps, DateFilter } from '../types';
import { dateFilterLabels } from '../types';

const drawerWidth = 240;
const dateFilters: DateFilter[] = ['all', 'today', 'week'];

const Nav = ({ open, onClose, onFilterChange }: NavProps) => {
  const handleClick = (filter: DateFilter) => {
    onFilterChange(filter);
    onClose(); // メニューを閉じる処理
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ width: drawerWidth }}>
        {/* ✅ AppBar分の余白を最初に追加 */}
        <Toolbar />
        {/* メニューリスト */}
        <List>
          {dateFilters.map((filter) => (
            <ListItem key={filter} disablePadding>
              <ListItemButton onClick={() => handleClick(filter)}>
                <ListItemText primary={dateFilterLabels[filter]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Nav;
