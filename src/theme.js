import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#0f7f0f', dark: '#0b5f0b', light: '#148c14', contrastText: '#ffffff' },
        secondary: { main: '#3264be', dark: '#264d96', light: '#5b84d2', contrastText: '#ffffff' },
        background: { default: '#f4f6f5', paper: '#ffffff' },
        text: { primary: '#17221c', secondary: '#4d5b54' },
        divider: '#dce2de',
      },
    },
    dark: {
      palette: {
        primary: { main: '#66d166', dark: '#4cb84c', light: '#8be08b', contrastText: '#07210a' },
        secondary: { main: '#92b4f5', dark: '#7299e8', light: '#b4cbf8', contrastText: '#0b1b3a' },
        background: { default: '#0d1420', paper: '#151e2d' },
        text: { primary: '#e7ecf3', secondary: '#a6b1c2' },
        divider: 'rgba(255, 255, 255, 0.13)',
      },
    },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Public Sans Variable", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    h1: { fontSize: 'clamp(2rem, 1.4rem + 2.6vw, 3.25rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' },
    h2: { fontSize: 'clamp(1.55rem, 1.3rem + 1.3vw, 2.25rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.015em' },
    h3: { fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 },
    h4: { fontSize: '1.02rem', fontWeight: 700, lineHeight: 1.35 },
    overline: { fontWeight: 800, letterSpacing: '0.09em', lineHeight: 1.4 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiLink: { defaultProps: { underline: 'hover' } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiAccordion: { defaultProps: { disableGutters: true, elevation: 0 } },
  },
});

export default theme;

// Fondo animado verde-azul de la marca, compartido por el encabezado y el pie.
export const fondoInstitucional = (t) => ({
  color: '#ffffff',
  backgroundImage: 'none',
  backgroundColor: '#0f7f0f',
  animation: 'cambioColor 10s ease-in-out infinite alternate',
  '@keyframes cambioColor': {
    '0%': { backgroundColor: '#0f7f0f' },
    '100%': { backgroundColor: '#3264be' },
  },
  '@keyframes cambioColorOscuro': {
    '0%': { backgroundColor: '#0f4a1c' },
    '100%': { backgroundColor: '#1d3a78' },
  },
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  ...t.applyStyles('dark', { backgroundColor: '#0f4a1c', animationName: 'cambioColorOscuro' }),
});
