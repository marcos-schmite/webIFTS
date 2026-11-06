import { useState } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

// El reproductor de YouTube se carga recién al hacer clic, para no pesar en cada visita.
export default function VideoYoutube({ id, titulo }) {
  const [activo, setActivo] = useState(false);

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box sx={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 1, overflow: 'hidden', bgcolor: '#000000' }}>
        {activo ? (
          <Box
            component="iframe"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={titulo}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <ButtonBase
            onClick={() => setActivo(true)}
            aria-label={`Reproducir video: ${titulo}`}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', '&:hover svg': { transform: 'scale(1.08)' } }}
          >
            <Box
              component="img"
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
            <PlayCircleFilledIcon sx={{ position: 'relative', fontSize: 68, color: '#ffffff', transition: 'transform 0.15s ease' }} />
          </ButtonBase>
        )}
      </Box>
      <Typography component="figcaption" variant="body2" sx={{ mt: 1, color: 'text.secondary', fontWeight: 600 }}>
        {titulo}
      </Typography>
    </Box>
  );
}
