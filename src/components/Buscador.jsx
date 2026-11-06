import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Chip,
  Dialog,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { buscar } from '../data/busqueda.js';

function PanelBusqueda({ onCerrar }) {
  const [consulta, setConsulta] = useState('');
  const [activo, setActivo] = useState(0);
  const lista = useRef(null);
  const entrada = useRef(null);
  const navigate = useNavigate();
  const resultados = useMemo(() => buscar(consulta), [consulta]);

  // El modal toma el foco al abrirse; se lo pasamos al campo en el cuadro siguiente.
  useEffect(() => {
    const cuadro = requestAnimationFrame(() => entrada.current?.focus());
    return () => cancelAnimationFrame(cuadro);
  }, []);

  useEffect(() => {
    lista.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [activo]);

  const abrir = (item) => {
    onCerrar();
    if (item.to) navigate(item.to);
    else window.open(item.href, '_blank', 'noopener,noreferrer');
  };

  const alPresionar = (evento) => {
    if (evento.key === 'ArrowDown') {
      evento.preventDefault();
      setActivo((i) => Math.min(i + 1, resultados.length - 1));
    } else if (evento.key === 'ArrowUp') {
      evento.preventDefault();
      setActivo((i) => Math.max(i - 1, 0));
    } else if (evento.key === 'Enter' && resultados[activo]) {
      evento.preventDefault();
      abrir(resultados[activo]);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <SearchIcon sx={{ color: 'text.secondary' }} />
        <InputBase
          inputRef={entrada}
          fullWidth
          value={consulta}
          onChange={(evento) => {
            setConsulta(evento.target.value);
            setActivo(0);
          }}
          onKeyDown={alPresionar}
          placeholder="Buscar materias, docentes, trámites, PDF…"
          slotProps={{
            input: {
              'aria-label': 'Buscar en el sitio',
              role: 'combobox',
              'aria-expanded': true,
              'aria-controls': 'resultados-busqueda',
              'aria-activedescendant': resultados[activo] ? `resultado-${activo}` : undefined,
            },
          }}
        />
      </Box>

      {!consulta && (
        <Typography variant="overline" component="p" sx={{ px: 2, pt: 1.5, color: 'text.secondary' }}>
          Lo más consultado
        </Typography>
      )}

      {resultados.length === 0 ? (
        <Typography sx={{ p: 3, color: 'text.secondary' }}>
          No encontramos resultados para «{consulta}». Probá con otra palabra.
        </Typography>
      ) : (
        <List id="resultados-busqueda" ref={lista} role="listbox" aria-label="Resultados" sx={{ maxHeight: { xs: '65dvh', sm: 420 }, overflowY: 'auto', p: 1 }}>
          {resultados.map((item, indice) => (
            <ListItemButton
              key={`${item.tipo}-${item.titulo}-${item.clave}`}
              id={`resultado-${indice}`}
              role="option"
              aria-selected={indice === activo}
              selected={indice === activo}
              onMouseEnter={() => setActivo(indice)}
              onClick={() => abrir(item)}
              sx={{ borderRadius: 1, gap: 1 }}
            >
              <ListItemText
                primary={item.titulo}
                secondary={item.detalle}
                slotProps={{ primary: { sx: { fontWeight: 600 } }, secondary: { noWrap: true } }}
                sx={{ minWidth: 0 }}
              />
              <Chip label={item.tipo} size="small" variant="outlined" sx={{ flexShrink: 0 }} />
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
}

export default function Buscador() {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const atajo = (evento) => {
      if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === 'k') {
        evento.preventDefault();
        setAbierto(true);
      }
    };
    window.addEventListener('keydown', atajo);
    return () => window.removeEventListener('keydown', atajo);
  }, []);

  return (
    <>
      <Tooltip title="Buscar en el sitio (Ctrl + K)">
        <IconButton color="inherit" aria-label="Buscar en el sitio" onClick={() => setAbierto(true)}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={abierto}
        onClose={() => setAbierto(false)}
        fullWidth
        maxWidth="sm"
        aria-label="Buscador del sitio"
        sx={{ '& .MuiDialog-container': { alignItems: 'flex-start' } }}
        slotProps={{ paper: { sx: { mt: { xs: 2, sm: 10 }, mx: { xs: 1.5, sm: 4 }, width: '100%', backgroundImage: 'none' } } }}
      >
        {abierto && <PanelBusqueda onCerrar={() => setAbierto(false)} />}
      </Dialog>
    </>
  );
}
