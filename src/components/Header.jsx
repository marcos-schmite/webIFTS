import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

export default function Header() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        borderBottom: '2px solid #3264be',
        animation: 'cambioColor 10s ease-in-out infinite alternate',
        '@keyframes cambioColor': {
          '0%': { backgroundColor: '#148c14' },
          '100%': { backgroundColor: '#3264be' },
        },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="https://ifts19.edu.ar/sitio/src/images/slides/logo%20ifts.png"
              alt="Logo IFTS 19"
              sx={{ height: 28, width: 'auto', objectFit: 'contain' }}
            />
            <Typography variant="h6" sx={{ fontWeight: '700', letterSpacing: '.5px' }}>
              IFTS Nº 19
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button color="inherit" href="#inicio">Inicio</Button>
            <Button color="inherit" href="#sistemas">Sistemas</Button>
            <Button color="inherit" href="#higiene">Higiene y Seguridad</Button>
            {/* NUEVOS BOTONES AGREGADOS */}
            <Button color="inherit" href="#docentes">Docentes</Button>
            <Button color="inherit" href="#actividades">Actividades</Button>
            
            <Button color="inherit" href="#inscripciones">Inscripción</Button>
            <Button color="inherit" href="#contacto">Contacto</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}