import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import { TaskProvider } from './context/TaskProvider'; // ← 必要！

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>
);
