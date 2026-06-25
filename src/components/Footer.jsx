import React from 'react';
import { Box, Container, Grid, Typography, Divider, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box id="contacto" sx={{ backgroundColor: '#0f172a', color: '#94a3b8', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: '700', mb: 2 }}>
              IFTS Nº 19
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7, maxWidth: '400px' }}>
              Instituto Superior dependiente de la Agencia de Aprendizaje a lo Largo de la Vida (GCABA). Comprometidos con la excelencia académica en formación técnica profesional.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: '700', mb: 2 }}>
              Contacto y Ubicación
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>📍 Catamarca 143, Cristóbal Colón, CABA</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>📞 (011) 2085-7745</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>✉ dfts_ifts19_de6@bue.edu.ar</Typography>
            <IconButton href="https://www.instagram.com/ifts_19/" target="_blank" rel="noopener" sx={{ color: '#cbd5e1', '&:hover': { color: '#ffffff' }, p: 0 }}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, backgroundColor: '#1e293b' }} />
        <Typography variant="body2" align="center" sx={{ color: '#64748b' }}>
          © {new Date().getFullYear()} IFTS 19. Rediseño Institucional Sobrio. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}