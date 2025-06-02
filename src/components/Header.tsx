import { Box, Typography, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import type { HeaderProps } from '../types';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Header = ({ onMenuClick, isDrawerOpen, mode, onToggleTheme }: HeaderProps) => {
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
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 左：ハンバーガーメニュー + タイトル */}
        <Box display="flex" alignItems="center">
          <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
            {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" component="div">
            Todoリスト
          </Typography>
        </Box>

        {/* 右：ライト／ダークモード切り替え */}
        <IconButton onClick={onToggleTheme} sx={{ color: 'white' }}>
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </Box>
  );
};
export default Header;
