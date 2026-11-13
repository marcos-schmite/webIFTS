import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link as LinkRouter, useLocation } from 'react-router-dom';
import { INSTITUTO, NAVEGACION, RUTAS } from '../data/sitio.js';
import { fondoInstitucional } from '../theme.js';
import { propsEnlace } from '../utils/enlaces.js';
import Buscador from './Buscador.jsx';
import ThemeToggle from './ThemeToggle.jsx';

// Si la ruta tiene su propio botón en la barra (Preingreso, Solicitudes),
// se marca solo ese y no también el menú que la contiene.
const estaActivo = (item, pathname) => {
  if (!item.items) return item.to === pathname;
  const tieneBotonPropio = NAVEGACION.some((otro) => otro.to === pathname);
  return !tieneBotonPropio && item.items.some((sub) => sub.to === pathname);
};

// Espaciado compacto: el contenedor mide como máximo 1200 px y tienen que entrar todos los botones.
const estiloBotonNav = (activo) => ({
  px: 0.75,
  minWidth: 0,
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  '& .MuiButton-endIcon': { ml: 0.25 },
  borderRadius: 1,
  boxShadow: activo ? 'inset 0 -2px 0 0 #ffffff' : 'none',
  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.14)' },
});

function MenuDesplegable({ item, activo }) {
  const [ancla, setAncla] = useState(null);
  const cerrar = () => setAncla(null);

  return (
    <>
      <Button
        color="inherit"
        endIcon={<ExpandMoreIcon />}
        aria-haspopup="menu"
        aria-expanded={Boolean(ancla)}
        onClick={(evento) => setAncla(evento.currentTarget)}
        sx={estiloBotonNav(activo)}
      >
        {item.etiqueta}
      </Button>
      <Menu anchorEl={ancla} open={Boolean(ancla)} onClose={cerrar} slotProps={{ paper: { sx: { mt: 0.5, maxWidth: 380 } } }}>
        {item.items.map((sub) => (
          <MenuItem key={sub.etiqueta} {...propsEnlace(sub)} onClick={cerrar} sx={{ whiteSpace: 'normal', py: 1 }}>
            <ListItemText
              primary={sub.etiqueta}
              secondary={sub.detalle}
              slotProps={{ primary: { sx: { fontWeight: 600, fontSize: '0.94rem' } } }}
            />
            {sub.href && <OpenInNewIcon fontSize="small" sx={{ ml: 1.5, color: 'text.secondary' }} aria-label="Se abre en otra pestaña" />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function GrupoMovil({ item, activo, onNavegar }) {
  const [abierto, setAbierto] = useState(activo);

  return (
    <>
      <ListItemButton onClick={() => setAbierto(!abierto)} aria-expanded={abierto}>
        <ListItemText primary={item.etiqueta} slotProps={{ primary: { sx: { fontWeight: 700 } } }} />
        {abierto ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={abierto} unmountOnExit>
        <List disablePadding>
          {item.items.map((sub) => (
            <ListItemButton key={sub.etiqueta} {...propsEnlace(sub)} onClick={onNavegar} sx={{ pl: 4 }}>
              <ListItemText primary={sub.etiqueta} secondary={sub.detalle} />
              {sub.href && (
                <ListItemIcon sx={{ minWidth: 0, ml: 1 }}>
                  <OpenInNewIcon fontSize="small" aria-label="Se abre en otra pestaña" />
                </ListItemIcon>
              )}
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function MenuMovil({ abierto, onCerrar, pathname }) {
  return (
    <Drawer anchor="right" open={abierto} onClose={onCerrar} slotProps={{ paper: { sx: { width: 'min(88vw, 360px)', backgroundImage: 'none' } } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1 }}>
        <Typography sx={{ fontWeight: 800 }}>Menú</Typography>
        <IconButton aria-label="Cerrar menú" onClick={onCerrar}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List component="nav" aria-label="Navegación principal">
        {NAVEGACION.map((item) =>
          item.items ? (
            <GrupoMovil key={item.etiqueta} item={item} activo={estaActivo(item, pathname)} onNavegar={onCerrar} />
          ) : (
            <ListItemButton
              key={item.etiqueta}
              {...propsEnlace(item)}
              onClick={onCerrar}
              selected={estaActivo(item, pathname)}
              aria-current={estaActivo(item, pathname) ? 'page' : undefined}
            >
              <ListItemText primary={item.etiqueta} slotProps={{ primary: { sx: { fontWeight: 700 } } }} />
            </ListItemButton>
          ),
        )}
      </List>
    </Drawer>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <AppBar position="sticky" elevation={0} color="default" sx={fondoInstitucional}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1, minHeight: { xs: 60, md: 68 } }}>
          <Box
            component={LinkRouter}
            to={RUTAS.inicio}
            aria-label={`${INSTITUTO.nombre}, ir al inicio`}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.25, color: 'inherit', textDecoration: 'none', mr: 'auto', flexShrink: 0 }}
          >
            <Box
              component="img"
              src={INSTITUTO.logo}
              alt=""
              width={38}
              height={38}
              sx={{ width: 38, height: 38, borderRadius: '4px', display: 'block' }}
            />
            <Typography component="span" sx={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              {INSTITUTO.nombre}
            </Typography>
          </Box>

          <Box component="nav" aria-label="Navegación principal" sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.25 }}>
            {NAVEGACION.map((item) => {
              const activo = estaActivo(item, pathname);
              return item.items ? (
                <MenuDesplegable key={item.etiqueta} item={item} activo={activo} />
              ) : (
                <Button
                  key={item.etiqueta}
                  color="inherit"
                  {...propsEnlace(item)}
                  aria-current={activo ? 'page' : undefined}
                  sx={estiloBotonNav(activo)}
                >
                  {item.etiqueta}
                </Button>
              );
            })}
          </Box>

          <Buscador />
          <ThemeToggle />
          <IconButton
            color="inherit"
            edge="end"
            aria-label="Abrir menú"
            onClick={() => setMenuAbierto(true)}
            sx={{ display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <MenuMovil abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} pathname={pathname} />
    </AppBar>
  );
}
