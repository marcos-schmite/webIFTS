import { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, Chip, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import PageHeader from '../components/PageHeader.jsx';
import Seccion from '../components/Seccion.jsx';
import VisorFotos from '../components/VisorFotos.jsx';
import { ACTIVIDADES } from '../data/actividades.js';
import { CARRERAS } from '../data/carreras.js';

function TarjetaActividad({ actividad, onAbrir }) {
  const portada = actividad.fotos[0];
  const cantidad = actividad.fotos.length;

  return (
    <Card variant="outlined" component="li" sx={{ backgroundImage: 'none', listStyle: 'none' }}>
      <CardActionArea
        onClick={onAbrir}
        aria-label={`${actividad.titulo}: ver ${cantidad === 1 ? 'la foto' : `las ${cantidad} fotos`}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative', aspectRatio: '4 / 3', bgcolor: '#0d1420' }}>
          <Box component="img" src={portada.archivo} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <Box
            sx={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              bgcolor: 'rgba(13, 20, 32, 0.78)',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            <PhotoLibraryOutlinedIcon sx={{ fontSize: 16 }} aria-hidden />
            {cantidad}
          </Box>
        </Box>
        <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.75, mb: 1.25 }}>
            {actividad.carreras.map((id) => (
              <Chip key={id} size="small" variant="outlined" color={CARRERAS[id].color} label={CARRERAS[id].nombreCorto} />
            ))}
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, ml: 'auto' }}>
              {actividad.fecha}
            </Typography>
          </Box>
          <Typography variant="h3" component="h2" sx={{ mb: 0.75 }}>
            {actividad.titulo}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            {actividad.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Actividades() {
  const [filtro, setFiltro] = useState('todas');
  const [abierta, setAbierta] = useState(null);
  const visibles = filtro === 'todas' ? ACTIVIDADES : ACTIVIDADES.filter((a) => a.carreras.includes(filtro));

  return (
    <>
      <PageHeader
        titulo="Actividades"
        antetitulo="Comunidad"
        descripcion="Salidas, talleres y proyectos de nuestros estudiantes, en fotos. Tocá una actividad para ver todas sus imágenes."
      />

      <Seccion>
        <ToggleButtonGroup
          exclusive
          size="small"
          color="primary"
          value={filtro}
          onChange={(_, valor) => valor && setFiltro(valor)}
          aria-label="Filtrar por carrera"
          sx={{ mb: 3, flexWrap: 'wrap' }}
        >
          <ToggleButton value="todas">Todas</ToggleButton>
          <ToggleButton value="sistemas">{CARRERAS.sistemas.nombreCorto}</ToggleButton>
          <ToggleButton value="higiene">{CARRERAS.higiene.nombreCorto}</ToggleButton>
        </ToggleButtonGroup>

        <Box component="ul" sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, m: 0, p: 0 }}>
          {visibles.map((actividad) => (
            <TarjetaActividad key={actividad.id} actividad={actividad} onAbrir={() => setAbierta(actividad)} />
          ))}
        </Box>
      </Seccion>

      {abierta && <VisorFotos key={abierta.id} actividad={abierta} onCerrar={() => setAbierta(null)} />}
    </>
  );
}
