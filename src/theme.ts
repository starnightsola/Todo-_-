import { createTheme } from '@mui/material/styles';

// ライトモードテーマ
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#626F47', // Header
      light: '#A4B465', // 追加ボタン
    },
    secondary: {
      main: '#F0BB78', // カード追加ボタン
      light: '#F5ECD5', // 背景色
    },
    background: {
      default: '#F5ECD5', // 背景色
    },
  },
});

// ダークモードテーマ
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#48704D', // Header
      light: '#838B65', // 追加ボタン
    },
    secondary: {
      main: '#D6BD98', // カード追加ボタン
    },
    background: {
      default: '#3C3D37', // 背景色
      paper: '#2B2C28', // 必要に応じてカードなど
    },
  },
});
