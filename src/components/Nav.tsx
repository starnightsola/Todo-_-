import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Box } from '@mui/material';
import type { NavProps } from '../types';

const drawerWidth = 240;

const Nav = ({ open, onClose }: NavProps) => {
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
          {['今日', '一週間予定'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={onClose}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Nav;
