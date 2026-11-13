import { Box, Container, Typography } from '@mui/material';

// Mosaico de cuatro cuadros, tomado del logo del instituto.
export function Marca({ tamano = 14 }) {
  return (
    <Box
      aria-hidden
      sx={{
        display: 'inline-grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2px',
        width: tamano,
        height: tamano,
        flexShrink: 0,
      }}
    >
      <Box sx={{ bgcolor: 'secondary.main' }} />
      <Box sx={{ bgcolor: 'primary.main' }} />
      <Box sx={{ bgcolor: 'primary.main' }} />
      <Box sx={{ bgcolor: 'primary.main' }} />
    </Box>
  );
}

export function Antetitulo({ children, sx }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25, ...sx }}>
      <Marca />
      <Typography variant="overline" component="p" sx={{ color: 'text.secondary' }}>
        {children}
      </Typography>
    </Box>
  );
}

// nivel={1} convierte el título en el encabezado principal de la página.
export function EncabezadoSeccion({ antetitulo, titulo, descripcion, nivel = 2, sx }) {
  return (
    <Box sx={{ mb: { xs: 3.5, md: 5 }, maxWidth: 720, ...sx }}>
      {antetitulo && <Antetitulo>{antetitulo}</Antetitulo>}
      <Typography variant={nivel === 1 ? 'h1' : 'h2'} component={`h${nivel}`}>
        {titulo}
      </Typography>
      {descripcion && (
        <Typography sx={{ mt: 1.5, color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.6 }}>
          {descripcion}
        </Typography>
      )}
    </Box>
  );
}

export default function Seccion({ children, alterna = false, id, sx }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: 6, md: 9 },
        bgcolor: alterna ? 'background.paper' : 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}
