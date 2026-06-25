import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#0f172a', borderBottom: '2px solid #0284c7' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon sx={{ color: '#0284c7', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: '700', letterSpacing: '.5px' }}>
              IFTS Nº 19
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button color="inherit" href="#inicio">Inicio</Button>
            <Button color="inherit" href="#sistemas">Sistemas</Button>
            <Button color="inherit" href="#higiene">Higiene y Seguridad</Button>
            <Button color="inherit" href="#inscripciones">Inscripción</Button>
            <Button color="inherit" href="#contacto">Contacto</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}