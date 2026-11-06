import { useEffect, useRef, useState } from 'react';
import { Box, Button, ButtonBase, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Link as LinkRouter } from 'react-router-dom';
import { ENLACES, INSTITUTO, RUTAS } from '../data/sitio.js';
import { propsEnlace } from '../utils/enlaces.js';
import { Antetitulo } from './Seccion.jsx';

const prefiereMenosMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// El video pesa más de 100 MB: de fondo solo se reproduce en pantallas grandes
// y sin ahorro de datos. En los demás casos se carga cuando la persona lo pide.
const permiteVideoDeFondo = () =>
  window.matchMedia('(min-width: 900px)').matches && !prefiereMenosMovimiento() && !navigator.connection?.saveData;

const CARRERAS_HERO = [
  {
    pestana: 'Análisis de Sistemas',
    titulo: 'Análisis de Sistemas',
    descripcion:
      'Tecnicatura superior con plan actualizado, prácticas profesionalizantes y título oficial, orientada al desarrollo de software y la tecnología.',
    ruta: RUTAS.sistemas,
  },
  {
    pestana: 'Higiene y Seguridad',
    titulo: 'Higiene y Seguridad en el Trabajo',
    descripcion:
      'Tecnicatura superior para prevenir riesgos laborales, capacitar equipos y diseñar planes de seguridad en todo tipo de organizaciones.',
    ruta: RUTAS.higiene,
  },
];

const ACCESOS = [
  { etiqueta: 'Horarios de cursada', icono: EventNoteOutlinedIcon, to: RUTAS.regulares },
  { etiqueta: 'Mesas de exámenes', icono: CalendarMonthOutlinedIcon, to: RUTAS.calendario },
  { etiqueta: 'Constancias', icono: DescriptionOutlinedIcon, to: RUTAS.constancias },
  { etiqueta: 'Preingreso', icono: ChecklistOutlinedIcon, to: RUTAS.preingreso },
  { etiqueta: 'SIU Guaraní', icono: SchoolOutlinedIcon, href: ENLACES.siuGuarani },
  { etiqueta: 'Aula Virtual', icono: ComputerOutlinedIcon, href: ENLACES.aulaVirtual },
];

function TextoTipeado({ texto, velocidad }) {
  const [visibles, setVisibles] = useState(() => (prefiereMenosMovimiento() ? texto.length : 0));

  useEffect(() => {
    if (visibles >= texto.length) return undefined;
    const temporizador = setTimeout(() => setVisibles((n) => n + 1), velocidad);
    return () => clearTimeout(temporizador);
  }, [visibles, texto, velocidad]);

  // El texto completo e invisible reserva el espacio para que la página no salte.
  return (
    <Box component="span" sx={{ display: 'grid' }}>
      <Box component="span" sx={{ gridArea: '1 / 1', visibility: 'hidden' }} aria-hidden>
        {texto}
      </Box>
      <Box component="span" sx={{ gridArea: '1 / 1' }} aria-hidden>
        {texto.slice(0, visibles)}
      </Box>
      <span className="solo-lectores">{texto}</span>
    </Box>
  );
}

export default function Hero() {
  const [indiceCarrera, setIndiceCarrera] = useState(0);
  const [modoCine, setModoCine] = useState(false);
  const [videoDeFondo] = useState(permiteVideoDeFondo);
  const video = useRef(null);
  const carrera = CARRERAS_HERO[indiceCarrera];

  useEffect(() => {
    const elemento = video.current;
    if (!elemento) return;
    if (modoCine) {
      elemento.muted = false;
      elemento.volume = 0.7;
      elemento.play().catch(() => {});
    } else {
      elemento.muted = true;
      if (!videoDeFondo) elemento.pause();
    }
  }, [modoCine, videoDeFondo]);

  useEffect(() => {
    if (!modoCine) return undefined;
    const alPresionar = (evento) => {
      if (evento.key === 'Escape') setModoCine(false);
    };
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [modoCine]);

  return (
    <Box
      component="section"
      aria-label="Presentación del instituto"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        minHeight: { md: 'min(82vh, 760px)' },
        py: { xs: 5, md: 8 },
        bgcolor: 'background.paper',
      }}
    >
      {(videoDeFondo || modoCine) && (
        <Box
          component="video"
          ref={video}
          src={INSTITUTO.video}
          autoPlay={videoDeFondo}
          loop
          muted
          playsInline
          preload="metadata"
          controls={modoCine}
          aria-label="Video de presentación del instituto"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: modoCine ? 'contain' : 'cover',
            bgcolor: modoCine ? '#000000' : 'transparent',
            zIndex: modoCine ? 3 : 0,
          }}
        />
      )}

      {/* Velo que adapta el video al modo claro u oscuro y garantiza el contraste del texto. */}
      <Box
        aria-hidden
        sx={(t) => ({
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backdropFilter: 'blur(6px)',
          background:
            'linear-gradient(100deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 55%, rgba(255,255,255,0.84) 100%)',
          ...t.applyStyles('dark', {
            background:
              'linear-gradient(100deg, rgba(13,20,32,0.95) 0%, rgba(13,20,32,0.9) 55%, rgba(13,20,32,0.8) 100%)',
          }),
        })}
      />

      {modoCine && (
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={() => setModoCine(false)}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 4,
            bgcolor: 'rgba(15, 23, 42, 0.85)',
            color: '#ffffff',
            '&:hover': { bgcolor: '#1e293b' },
          }}
        >
          Cerrar video
        </Button>
      )}

      <Container maxWidth="lg" inert={modoCine} sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'grid', gap: { xs: 4, md: 6 }, alignItems: 'center', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.5fr) minmax(0, 1fr)' } }}>
          <Box>
            <Antetitulo>Educación superior pública y gratuita</Antetitulo>

            <Tabs
              value={indiceCarrera}
              onChange={(_, valor) => setIndiceCarrera(valor)}
              aria-label="Elegí una carrera"
              variant="scrollable"
              scrollButtons={false}
              sx={{ mb: 2.5, minHeight: 40, borderBottom: '1px solid', borderColor: 'divider', '& .MuiTab-root': { minHeight: 40, textTransform: 'none', fontWeight: 700, px: 1.5 } }}
            >
              {CARRERAS_HERO.map((c) => (
                <Tab key={c.pestana} label={c.pestana} />
              ))}
            </Tabs>

            <Typography variant="h1" sx={{ minHeight: { sm: '2.2em' } }}>
              <TextoTipeado key={carrera.titulo} texto={carrera.titulo} velocidad={38} />
            </Typography>

            <Typography component="div" sx={{ mt: 2, mb: 3.5, maxWidth: 620, color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.6 }}>
              <TextoTipeado key={carrera.descripcion} texto={carrera.descripcion} velocidad={10} />
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Button variant="contained" size="large" component={LinkRouter} to={carrera.ruta} endIcon={<ArrowForwardIcon />}>
                Conocé la carrera
              </Button>
              <Button variant="outlined" size="large" component={LinkRouter} to={RUTAS.preingreso}>
                Cómo ingresar
              </Button>
              <Button variant="text" size="large" color="secondary" startIcon={<PlayArrowIcon />} onClick={() => setModoCine(true)}>
                Ver video de presentación
              </Button>
            </Box>
          </Box>

          <Paper variant="outlined" component="nav" aria-label="Accesos rápidos" sx={{ p: 1, backgroundImage: 'none' }}>
            <Typography variant="overline" component="p" sx={{ px: 1.5, pt: 1, pb: 0.5, color: 'text.secondary' }}>
              Accesos rápidos
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr' } }}>
              {ACCESOS.map(({ etiqueta, icono: Icono, ...destino }) => (
                <ButtonBase
                  key={etiqueta}
                  {...propsEnlace(destino)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    gap: 1.25,
                    px: 1.5,
                    py: 1.1,
                    borderRadius: 1,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Icono fontSize="small" sx={{ color: 'secondary.main' }} aria-hidden />
                  {etiqueta}
                </ButtonBase>
              ))}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
