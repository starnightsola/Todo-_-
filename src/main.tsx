import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TaskProvider } from './context/TaskProvider'; // ← 必要！

const theme = createTheme({
  palette: {
    primary: {
      main: '#626F47',
      light: '#A4B465',
    },
    secondary: {
      main: '#F0BB78',
      light: '#F5ECD5',
    },
  },
}); // 必要に応じてカスタムテーマを定義できます
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <App />
      </TaskProvider>
    </ThemeProvider>
  </StrictMode>
);
