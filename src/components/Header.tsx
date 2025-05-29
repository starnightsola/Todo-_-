import { Box, Typography, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import type { HeaderProps } from '../types';

const Header = ({ onMenuClick, isDrawerOpen }: HeaderProps) => {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'primary.main',
        color: 'white',
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
          {/* ✅ 状態に応じてアイコンを切り替える */}
          {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" component="div">
          Todoリスト
        </Typography>
      </Toolbar>
    </Box>
  );
};
export default Header;
