import { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IMAGENES, PLANILLA } from '../data/sitio.js';
import useSheetCsv from '../hooks/useSheetCsv.js';
import Seccion, { EncabezadoSeccion } from './Seccion.jsx';

const FOTOS_DE_RESPALDO = [
  { url: IMAGENES.estudiantes, titulo: 'Estudiantes de nuestras dos tecnicaturas' },
  { url: IMAGENES.sistemas, titulo: 'Análisis de Sistemas' },
  { url: IMAGENES.higiene, titulo: 'Higiene y Seguridad en el Trabajo' },
];

// Convierte los enlaces de Google Drive en direcciones directas a la imagen.
const convertirLinkDrive = (url) => {
  const coincidencia = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([^/?#&]+)/);
  return coincidencia ? `https://lh3.googleusercontent.com/d/${coincidencia[1]}` : url;
};

const estiloFlecha = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(15, 23, 42, 0.55)',
  color: '#ffffff',
  '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.8)' },
};

export default function CarruselActividades() {
  const { filas, cargando } = useSheetCsv(PLANILLA.gidActividades);
  const [rotas, setRotas] = useState([]);
  const [posicion, setPosicion] = useState(0);
  const [pausado, setPausado] = useState(false);

  const fotos = useMemo(() => {
    const desdePlanilla = filas
      .filter(([enlace]) => enlace?.startsWith('http'))
      .map(([enlace, titulo]) => ({ url: convertirLinkDrive(enlace), titulo }));
    const disponibles = desdePlanilla.filter((foto) => !rotas.includes(foto.url));
    return disponibles.length > 0 ? disponibles : FOTOS_DE_RESPALDO;
  }, [filas, rotas]);

  const indice = posicion % fotos.length;
  const foto = fotos[indice];
  const mover = (delta) => setPosicion((indice + delta + fotos.length) % fotos.length);

  useEffect(() => {
    if (pausado || cargando || fotos.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const temporizador = setInterval(() => setPosicion((p) => p + 1), 6000);
    return () => clearInterval(temporizador);
  }, [pausado, cargando, fotos.length]);

  return (
    <Seccion alterna id="actividades">
      <EncabezadoSeccion antetitulo="Comunidad" titulo="Actividades del instituto" />

      {cargando ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}>
          <CircularProgress aria-label="Cargando actividades" />
        </Box>
      ) : (
        <Box
          role="group"
          aria-roledescription="carrusel"
          aria-label="Fotos de actividades"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onFocusCapture={() => setPausado(true)}
          onBlurCapture={() => setPausado(false)}
          sx={{ maxWidth: 920, mx: 'auto' }}
        >
          <Box sx={{ position: 'relative', aspectRatio: { xs: '4 / 3', sm: '16 / 9' }, borderRadius: 2, overflow: 'hidden', bgcolor: '#0d1420' }}>
            <Box
              component="img"
              key={foto.url}
              src={foto.url}
              alt={foto.titulo || 'Actividad del instituto'}
              referrerPolicy="no-referrer"
              onError={() => setRotas((actuales) => [...actuales, foto.url])}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {foto.titulo && (
              <Box sx={{ position: 'absolute', insetInline: 0, bottom: 0, p: 1.5, bgcolor: 'rgba(13, 20, 32, 0.78)', color: '#ffffff', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {foto.titulo}
                </Typography>
              </Box>
            )}

            {fotos.length > 1 && (
              <>
                <IconButton aria-label="Foto anterior" onClick={() => mover(-1)} sx={{ ...estiloFlecha, left: 12 }}>
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="Foto siguiente" onClick={() => mover(1)} sx={{ ...estiloFlecha, right: 12 }}>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>

          {fotos.length > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 1 }}>
              {fotos.map((item, i) => (
                <Box
                  key={item.url}
                  component="button"
                  type="button"
                  aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
                  aria-current={i === indice}
                  onClick={() => setPosicion(i)}
                  sx={{ width: 24, height: 24, p: 0, border: 0, background: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                >
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: i === indice ? 'primary.main' : 'divider' }} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Seccion>
  );
}
