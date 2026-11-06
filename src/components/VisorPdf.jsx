import { Box, Button, Paper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

// Muestra el PDF dentro de la página solo en pantallas grandes: en los celulares
// un PDF embebido suele descargarse solo o verse demasiado chico.
export default function VisorPdf({ src, titulo, alto = 720 }) {
  const theme = useTheme();
  const pantallaGrande = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, p: 2 }}>
        <PictureAsPdfOutlinedIcon sx={{ color: 'text.secondary' }} aria-hidden />
        <Typography variant="h3" component="p" sx={{ flexGrow: 1, fontSize: '1rem' }}>
          {titulo}
        </Typography>
        <Button
          variant="contained"
          size="small"
          endIcon={<OpenInNewIcon />}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir o descargar PDF
        </Button>
      </Box>
      {pantallaGrande && (
        <Box
          component="iframe"
          key={src}
          src={src}
          title={titulo}
          loading="lazy"
          sx={{ display: 'block', width: '100%', height: alto, border: 0, borderTop: '1px solid', borderColor: 'divider', bgcolor: '#ffffff' }}
        />
      )}
    </Paper>
  );
}
