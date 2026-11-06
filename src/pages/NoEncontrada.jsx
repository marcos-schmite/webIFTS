import { Button, Container, Typography } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import { Antetitulo } from '../components/Seccion.jsx';
import { RUTAS } from '../data/sitio.js';
import useTituloPagina from '../hooks/useTituloPagina.js';

export default function NoEncontrada() {
  useTituloPagina('Página no encontrada');

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 14 } }}>
      <Antetitulo>Error 404</Antetitulo>
      <Typography variant="h1" sx={{ mb: 2 }}>
        No encontramos esta página
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3 }}>
        Puede que el enlace haya cambiado. Volvé al inicio o buscá lo que necesitás con el buscador de arriba.
      </Typography>
      <Button variant="contained" size="large" component={LinkRouter} to={RUTAS.inicio}>
        Ir al inicio
      </Button>
    </Container>
  );
}
