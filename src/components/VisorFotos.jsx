import { useEffect, useState } from 'react';
import { Box, ButtonBase, Dialog, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const estiloFlecha = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(255, 255, 255, 0.14)',
  color: '#ffffff',
  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.28)' },
};

// Muestra las fotos de una actividad en pantalla completa; se recorre con flechas o con el teclado.
export default function VisorFotos({ actividad, inicial = 0, onCerrar }) {
  const theme = useTheme();
  const pantallaChica = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const [indice, setIndice] = useState(inicial);
  const total = actividad.fotos.length;
  const foto = actividad.fotos[indice];
  const mover = (delta) => setIndice((i) => (i + delta + total) % total);

  useEffect(() => {
    if (total < 2) return undefined;
    const alPresionar = (evento) => {
      if (evento.key === 'ArrowRight') setIndice((i) => (i + 1) % total);
      if (evento.key === 'ArrowLeft') setIndice((i) => (i - 1 + total) % total);
    };
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [total]);

  return (
    <Dialog
      open
      onClose={onCerrar}
      fullScreen={pantallaChica}
      fullWidth
      maxWidth="lg"
      aria-labelledby="titulo-visor"
      slotProps={{ paper: { sx: { bgcolor: '#0b0f17', color: '#ffffff', backgroundImage: 'none' } } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.25 }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography id="titulo-visor" sx={{ fontWeight: 700 }} noWrap>
            {actividad.titulo}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            Foto {indice + 1} de {total}
          </Typography>
        </Box>
        <IconButton aria-label="Cerrar" onClick={onCerrar} sx={{ color: '#ffffff' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ position: 'relative', height: { xs: 'calc(100dvh - 210px)', sm: '68vh' }, bgcolor: '#000000' }}>
        <Box
          component="img"
          key={foto.archivo}
          src={foto.archivo}
          alt={foto.descripcion}
          sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
        {total > 1 && (
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

      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {foto.descripcion}
        </Typography>
        {total > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1.5, overflowX: 'auto' }}>
            {actividad.fotos.map((item, i) => (
              <ButtonBase
                key={item.archivo}
                onClick={() => setIndice(i)}
                aria-label={`Ver foto ${i + 1}: ${item.descripcion}`}
                aria-current={i === indice}
                sx={{
                  flexShrink: 0,
                  width: 64,
                  height: 44,
                  borderRadius: 1,
                  overflow: 'hidden',
                  outline: i === indice ? '2px solid #ffffff' : 'none',
                  outlineOffset: 2,
                  opacity: i === indice ? 1 : 0.55,
                }}
              >
                <Box component="img" src={item.archivo} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </ButtonBase>
            ))}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
