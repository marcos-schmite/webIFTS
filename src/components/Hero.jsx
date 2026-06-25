import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ScienceIcon from '@mui/icons-material/Science';

export default function Hero() {
  return (
    <Box 
      id="inicio" 
      sx={{ 
        position: 'relative',
        // Imagen de fondo de alta calidad (tecnología/estudio)
        backgroundImage: 'url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Efecto sutil de parallax al scrollear
        pt: { xs: 10, md: 14 }, 
        pb: { xs: 8, md: 12 }, 
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden',
        // Capa de Blur integrada encima de la imagen
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(248, 250, 252, 0.85)', // Tono claro semi-transparente
          backdropFilter: 'blur(8px)', // El efecto mágico de desenfoque
          zIndex: 1
        }
      }}
    >
      {/* Container posicionado sobre la capa de blur con zIndex: 2 */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        
        {/* --- Bloque Principal --- */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 }, maxWidth: '850px', mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: '#0284c7', fontWeight: '800', letterSpacing: 2, display: 'block', mb: 1 }}>
            Educación Superior Pública y Gratuita
          </Typography>
          <Typography variant="h3" component="h1" sx={{ color: '#0f172a', fontWeight: '900', mb: 3, fontSize: { xs: '36px', md: '52px' }, lineHeight: 1.15 }}>
            Formación Técnica para los Desafíos de Hoy
          </Typography>
          <Typography variant="h6" sx={{ color: '#334155', fontWeight: '500', mb: 4, lineHeight: 1.8, fontSize: { xs: '16px', md: '20px' } }}>
            El Instituto de Formación Técnica Superior Nº 19 del GCABA dicta tecnicaturas con planes de estudio modernos y títulos oficiales orientados a una rápida inserción laboral.
          </Typography>
          
          {/* Botones de acción */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              href="#inscripciones" 
              sx={{ backgroundColor: '#0f172a', '&:hover': { backgroundColor: '#1e293b' }, px: 4, py: 1.8, textTransform: 'none', fontWeight: '700', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.2)' }}
            >
              Comenzar Preingreso 2026
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              startIcon={<CalendarMonthIcon />}
              href="https://aulasvirtuales.bue.edu.ar/" 
              target="_blank"
              rel="noopener"
              sx={{ color: '#0f172a', borderColor: '#0f172a', backgroundColor: 'rgba(255,255,255,0.6)', '&:hover': { borderColor: '#0f172a', backgroundColor: '#ffffff' }, px: 3, textTransform: 'none', fontWeight: '700', borderRadius: '8px' }}
            >
              Agenda Académica 2026
            </Button>
          </Box>
        </Box>

        {/* --- Bloque de Funciones Originales del IFTS 19 --- */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" align="center" sx={{ color: '#475569', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5, mb: 4, fontSize: '13px' }}>
            Propósito Institucional
          </Typography>
          
          <Grid container spacing={4}>
            {/* Función 1 */}
            <Grid item xs={12} md={4}>
              <Paper variant="transparent" sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(4px)', border: '1px solid rgba(226, 232, 240, 0)', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <GroupsIcon sx={{ color: '#0284c7', fontSize: 26 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: '800', color: '#0f172a' }}>
                    Responsabilidad Social
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.7, fontWeight: '500' }}>
                  Formar técnicos superiores capacitados para actuar profesionalmente y contribuir a la construcción de una sociedad más justa y solidaria.
                </Typography>
              </Paper>
            </Grid>

            {/* Función 2 */}
            <Grid item xs={12} md={4}>
              <Paper variant="transparent" sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(4px)', border: '1px solid rgba(226, 232, 240, 0)', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <AccountBalanceIcon sx={{ color: '#0284c7', fontSize: 26 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: '800', color: '#0f172a' }}>
                    Articulación Universitaria
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.7, fontWeight: '500' }}>
                  Impulsar acciones de cooperación e intercambio con otras instituciones de educación superior mediante convenios universitarios.
                </Typography>
              </Paper>
            </Grid>

            {/* Función 3 */}
            <Grid item xs={12} md={4}>
              <Paper variant="transparent" sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(4px)', border: '1px solid rgba(226, 232, 240, 0)', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <ScienceIcon sx={{ color: '#0284c7', fontSize: 26 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: '800', color: '#0f172a' }}>
                    Acciones de Extensión
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.7, fontWeight: '500' }}>
                  Difundir saberes a través del desarrollo de acciones orientadas a la aplicación de innovaciones en espacios educativos, sociales y productivos.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}