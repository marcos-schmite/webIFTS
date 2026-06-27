import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Tabs, Tab } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ScienceIcon from '@mui/icons-material/Science';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

// --- SUB-COMPONENTE PARA EL EFECTO MÁQUINA DE ESCRIBIR ---
function TextoTipeado({ texto, velocidad = 100 }) {
  const [textoVisible, setTextoVisible] = useState('');

  useEffect(() => {
    setTextoVisible('');
    let acumulador = '';

    for (let i = 0; i < texto.length; i++) {
      setTimeout(() => {
        acumulador += texto[i];
        setTextoVisible(acumulador);
      }, i * velocidad);
    }
  }, [texto, velocidad]);

  return <>{textoVisible}</>;
}

export default function Hero() {
  const [carreraActiva, setCarreraActiva] = useState(0);
  const [viendoVideo, setViendoVideo] = useState(false);
  const videoRef = useRef(null);

  const infoCarreras = [
    {
      titulo: "Análisis de Sistemas",
      descripcion: "El Instituto de Formación Técnica Superior Nº 19 del GCABA dicta la Tecnicatura Superior en Análisis de Sistemas con planes de estudio modernos, prácticas profesionalizantes y títulos oficiales orientados al desarrollo de software y tecnología."
    },
    {
      titulo: "Higiene y Seguridad en el Trabajo",
      descripcion: "Nuestra Tecnicatura Superior en Higiene y Seguridad prepara profesionales capacitados para la prevención de riesgos laborales, diseño de planes de evacuación y gestión ambiental en todo tipo de organizaciones e industrias."
    }
  ];

  const carreraActual = infoCarreras[carreraActiva];

  const handleVerVideo = () => {
    setViendoVideo(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.7;
    }
  };

  const handleCerrarVideo = () => {
    setViendoVideo(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <Box
      id="inicio"
      sx={{
        position: 'relative',
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden',
        minHeight: { md: '80vh' },
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0f172a',
      }}
    >
      {/* --- VIDEO MP4 DE FONDO NATIVO --- */}
      <Box
        component="video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        src="https://ifts19.edu.ar/sitio/src/Presenta25.mp4"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: viendoVideo ? 'auto' : 'none',
          opacity: viendoVideo ? 1 : 0.6,
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* --- Capa de Blur y Tinte --- */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(248, 250, 252, 0.85)',
          backdropFilter: 'blur(6px)',
          zIndex: 1,
          opacity: viendoVideo ? 0 : 1,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease-in-out, backdrop-filter 0.6s ease-in-out',
        }}
      />

      {/* --- BOTÓN FLOTANTE MODO CINE --- */}
      {viendoVideo && (
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={handleCerrarVideo}
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            zIndex: 10,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(4px)',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#1e293b' },
            textTransform: 'none',
            fontWeight: '700',
            borderRadius: '20px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
          }}
        >
          Cerrar Video
        </Button>
      )}

      {/* --- CONTENIDO PRINCIPAL --- */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          opacity: viendoVideo ? 0 : 1,
          transform: viendoVideo ? 'scale(0.93) translateY(20px)' : 'scale(1) translateY(0px)',
          pointerEvents: viendoVideo ? 'none' : 'auto',
          transition: 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >

        {/* Selector de Carreras */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Tabs
            value={carreraActiva}
            onChange={(e, nuevoValor) => setCarreraActiva(nuevoValor)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              p: 0.5,
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
              '& .MuiTabs-indicator': {
                backgroundColor: '#148c14',
                height: '100%',
                borderRadius: '25px',
                zIndex: -1
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: '700',
                borderRadius: '25px',
                px: { xs: 3, md: 5 },
                transition: 'color 0.3s ease',
                minHeight: '40px',
                fontSize: { xs: '0.85rem', md: '1rem' },
                '&.Mui-selected': {
                  color: '#ffffff',
                }
              }
            }}
          >
            <Tab label="Análisis de Sistemas" />
            <Tab label="Higiene y Seguridad" />
          </Tabs>
        </Box>

        {/* Bloque central de textos */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, maxWidth: '850px', mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: '#3264be', fontWeight: '800', letterSpacing: 2, display: 'block', mb: 1 }}>
            Educación Superior Pública y Gratuita
          </Typography>

          {/* Título Tipeado (Se usa 'key' para forzar el reinicio de la animación al cambiar de pestaña) */}
          <Typography variant="h3" component="h1" sx={{ color: '#148c14', fontWeight: '900', mb: 3, fontSize: { xs: '36px', md: '52px' }, lineHeight: 1.15, minHeight: { xs: '84px', md: '120px' } }}>
            <TextoTipeado key={`titulo-${carreraActiva}`} texto={carreraActual.titulo} velocidad={40} />
          </Typography>

          {/* Descripción Tipeada */}
          <Typography variant="h6" sx={{ color: '#334155', fontWeight: '500', mb: 4, lineHeight: 1.8, fontSize: { xs: '16px', md: '20px' }, minHeight: { xs: '140px', md: '110px' } }}>
            <TextoTipeado key={`desc-${carreraActiva}`} texto={carreraActual.descripcion} velocidad={12} />
          </Typography>

          {/* Botones de acción (Fijos, no se tipean para mantener usabilidad) */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              href="#inscripciones"
              sx={{ backgroundColor: '#148c14', '&:hover': { backgroundColor: '#1e293b' }, px: 4, py: 1.8, textTransform: 'none', fontWeight: '700', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.2)' }}
            >
              Comenzar Preingreso 2026
            </Button>

            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={handleVerVideo}
              sx={{ backgroundColor: '#3264be', '&:hover': { backgroundColor: '#1e293b' }, px: 4, py: 1.8, textTransform: 'none', fontWeight: '700', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.2)' }}
            >
              Ver Video Presentación
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<CalendarMonthIcon />}
              href="https://aulasvirtuales.bue.edu.ar/"
              target="_blank"
              rel="noopener"
              sx={{ color: '#148c14', borderColor: '#148c14', backgroundColor: 'rgba(255,255,255,0.7)', '&:hover': { borderColor: '#148c14', backgroundColor: '#ffffff' }, px: 3, textTransform: 'none', fontWeight: '700', borderRadius: '8px' }}
            >
              Agenda Académica 2026
            </Button>
          </Box>
        </Box>

        {/* --- Bloque de Funciones Inferiores (Tarjetas fijas) --- */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" align="center" sx={{ color: '#475569', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5, mb: 4, fontSize: '13px' }}>
            Propósito Institucional
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper variant="transparent" sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(8px)', border: '1px solid rgba(226, 232, 240, 0)', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <GroupsIcon sx={{ color: '#3264be', fontSize: 26 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: '800', color: '#148c14' }}>
                    Responsabilidad Social
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.7, fontWeight: '500' }}>
                  Formar técnicos superiores capacitados para actuar profesionalmente y contribuir a la construcción de una sociedad más justa y solidaria.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="transparent" sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(8px)', border: '1px solid rgba(226, 232, 240, 0)', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <AccountBalanceIcon sx={{ color: '#3264be', fontSize: 26 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: '800', color: '#148c14' }}>
                    Articulación Universitaria
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.7, fontWeight: '500' }}>
                  Impulsar acciones de cooperación e intercambio con otras instituciones de educación superior mediante convenios universitarios.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="transparent" sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255,0)', backdropFilter: 'blur(8px)', border: '1px solid rgba(226, 232, 240, 0)', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <ScienceIcon sx={{ color: '#3264be', fontSize: 26 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: '800', color: '#148c14' }}>
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