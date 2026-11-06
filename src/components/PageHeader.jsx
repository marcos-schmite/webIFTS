import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import useTituloPagina from '../hooks/useTituloPagina.js';
import { RUTAS } from '../data/sitio.js';
import { Antetitulo } from './Seccion.jsx';

export default function PageHeader({ titulo, antetitulo, descripcion, miga, children }) {
  useTituloPagina(titulo);

  return (
    <Box
      component="header"
      sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: { xs: 4, md: 6 } }}
    >
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="Ubicación en el sitio" sx={{ mb: 2, fontSize: '0.875rem' }}>
          <Link component={LinkRouter} to={RUTAS.inicio} color="inherit">
            Inicio
          </Link>
          {miga && (
            <Link component={LinkRouter} to={miga.to} color="inherit">
              {miga.etiqueta}
            </Link>
          )}
          <Typography component="span" sx={{ fontSize: 'inherit', color: 'text.primary' }} aria-current="page">
            {titulo}
          </Typography>
        </Breadcrumbs>
        {antetitulo && <Antetitulo>{antetitulo}</Antetitulo>}
        <Typography variant="h1" sx={{ maxWidth: 900 }}>
          {titulo}
        </Typography>
        {descripcion && (
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.6, maxWidth: 760 }}>
            {descripcion}
          </Typography>
        )}
        {children && <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>{children}</Box>}
      </Container>
    </Box>
  );
}
