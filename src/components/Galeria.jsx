import { useEffect, useReducer, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CARRERAS } from '../data/carreras.js';
import { GALERIA } from '../data/galeria.js';
import Seccion, { EncabezadoSeccion } from './Seccion.jsx';

const estiloFlecha = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(15, 23, 42, 0.55)',
  color: '#ffffff',
  '&:hover': { bgcolor: 'rgba(15, 23, 42, 0.8)' },
};

// Guarda la foto actual y las que ya se montaron: siempre queda precargada la
// siguiente, para que el cambio sea un fundido sin parpadeo.
function reductor(estado, accion) {
  const total = GALERIA.length;
  const indice = ((accion.a ?? estado.indice + accion.delta) + total) % total;
  return { indice, montadas: new Set([...estado.montadas, indice, (indice + 1) % total]) };
}

export default function Galeria() {
  const [{ indice, montadas }, mover] = useReducer(reductor, { indice: 0, montadas: new Set([0, 1]) });
  const [pausado, setPausado] = useState(false);
  const foto = GALERIA[indice];

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const temporizador = setInterval(() => mover({ delta: 1 }), 6000);
    return () => clearInterval(temporizador);
  }, [pausado]);

  return (
    <Seccion id="galeria">
      <EncabezadoSeccion antetitulo="Galería" titulo="El mundo de nuestras carreras" />

      <Box
        role="group"
        aria-roledescription="carrusel"
        aria-label="Fotos de higiene y seguridad y de sistemas"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocusCapture={() => setPausado(true)}
        onBlurCapture={() => setPausado(false)}
        sx={{ maxWidth: 920, mx: 'auto' }}
      >
        <Box sx={{ position: 'relative', aspectRatio: { xs: '4 / 3', sm: '3 / 2' }, borderRadius: 2, overflow: 'hidden', bgcolor: '#0d1420' }}>
          {GALERIA.map(
            (item, i) =>
              montadas.has(i) && (
                <Box
                  component="img"
                  key={item.archivo}
                  src={item.archivo}
                  alt={i === indice ? item.alt : ''}
                  aria-hidden={i !== indice}
                  loading="lazy"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: i === indice ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                  }}
                />
              ),
          )}

          <Box sx={{ position: 'absolute', insetInline: 0, bottom: 0, px: 2, py: 1.5, bgcolor: 'rgba(13, 20, 32, 0.8)', color: '#ffffff', textAlign: 'center' }}>
            <Typography variant="overline" component="p" sx={{ lineHeight: 1.6, opacity: 0.85 }}>
              {CARRERAS[foto.carrera].nombreCorto}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {foto.descripcion}
            </Typography>
          </Box>

          <IconButton aria-label="Foto anterior" onClick={() => mover({ delta: -1 })} sx={{ ...estiloFlecha, left: 12 }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Foto siguiente" onClick={() => mover({ delta: 1 })} sx={{ ...estiloFlecha, right: 12 }}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 1 }}>
          {GALERIA.map((item, i) => (
            <Box
              key={item.archivo}
              component="button"
              type="button"
              aria-label={`Ver foto ${i + 1} de ${GALERIA.length}`}
              aria-current={i === indice}
              onClick={() => mover({ a: i })}
              sx={{ width: 24, height: 24, p: 0, border: 0, background: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
            >
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: i === indice ? 'primary.main' : 'divider' }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Seccion>
  );
}
