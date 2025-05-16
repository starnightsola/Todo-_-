import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { TaskProvider } from './context/TaskProvider'; // ← 必要！

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ChakraProvider>
    
  </StrictMode>,
)
