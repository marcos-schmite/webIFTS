import { IconButton, Tooltip } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const esOscuro = (mode === 'system' ? systemMode : mode) === 'dark';
  const etiqueta = esOscuro ? 'Activar modo claro' : 'Activar modo oscuro';

  return (
    <Tooltip title={etiqueta}>
      <IconButton color="inherit" aria-label={etiqueta} onClick={() => setMode(esOscuro ? 'light' : 'dark')}>
        {esOscuro ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}
