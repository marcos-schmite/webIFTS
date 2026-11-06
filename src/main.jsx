import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource-variable/public-sans';
import './index.css';
import App from './App.jsx';
import theme from './theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="system" modeStorageKey="ifts19-modo" disableTransitionOnChange>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
