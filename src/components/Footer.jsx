import React from 'react';
import { Box, Container, Grid, Typography, Divider, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box 
      id="contacto" 
      sx={{ 
        // 1. Ajuste de color base para textos secundarios (más claro para mejor legibilidad)
        color: '#e2e8f0', 
        pt: 8, 
        pb: 4,
        // 2. Misma animación lenta, constante y alternada que el Header
        animation: 'cambioColorFooter 10s ease-in-out infinite alternate',
        '@keyframes cambioColorFooter': {
          '0%': {
            backgroundColor: '#148c14', // Verde
          },
          '100%': {
            backgroundColor: '#3264be', // Azul
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: '700', mb: 2 }}>
              IFTS Nº 19
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7, maxWidth: '400px', color: '#f8fafc' }}>
              Instituto Superior dependiente de la Agencia de Aprendizaje a lo Largo de la Vida (GCABA). Comprometidos con la excelencia académica en formación técnica profesional.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: '700', mb: 2 }}>
              Contacto y Ubicación
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#f8fafc' }}>📍 Catamarca 143, Cristóbal Colón, CABA</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#f8fafc' }}>📞 (011) 2085-7745</Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#f8fafc' }}>✉ dfts_ifts19_de6@bue.edu.ar</Typography>
            <IconButton 
              href="https://www.instagram.com/ifts_19/" 
              target="_blank" 
              rel="noopener" 
              sx={{ color: '#ffffff', '&:hover': { color: '#cbd5e1' }, p: 0 }}
            >
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        
        {/* Línea divisoria adaptada para que no resalte de forma brusca */}
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.15)' }} />
        
        {/* Texto de derechos reservados con contraste optimizado */}
        <Typography variant="body2" align="center" sx={{ color: '#cbd5e1' }}>
          © {new Date().getFullYear()} IFTS 19. Rediseño Institucional Sobrio. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}