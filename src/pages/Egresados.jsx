import { useState } from 'react';
import { Alert, Box, Button, Chip, Paper, Typography } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import PageHeader from '../components/PageHeader.jsx';
import Seccion, { EncabezadoSeccion } from '../components/Seccion.jsx';
import { ARCHIVOS, ENLACES } from '../data/sitio.js';

const MARZO = 2;
const AGOSTO = 7;

const DOCUMENTACION = [
  'Fotocopia actualizada del DNI, de ambos lados (último ejemplar emitido por el Ministerio del Interior).',
  'Libreta de estudiante.',
  'Solicitud de título completa.',
];

function textoRecepcion(mes) {
  if (mes === MARZO || mes === AGOSTO) return { etiqueta: 'Recepción abierta este mes', color: 'primary' };
  const proximo = mes > MARZO && mes < AGOSTO ? 'agosto' : 'marzo';
  return { etiqueta: `Próxima recepción: ${proximo}`, color: 'default' };
}

export default function Egresados() {
  const [mes] = useState(() => new Date().getMonth());
  const recepcion = textoRecepcion(mes);

  return (
    <>
      <PageHeader
        titulo="Egresados"
        antetitulo="Alumnos"
        descripcion="Cómo solicitar tu título y compartir las fotos del acto de colación."
      >
        <Button variant="contained" startIcon={<DownloadOutlinedIcon />} href={ARCHIVOS.solicitudTitulo} target="_blank" rel="noopener noreferrer">
          Descargar solicitud de título
        </Button>
      </PageHeader>

      <Seccion>
        <Box sx={{ display: 'grid', gap: { xs: 4, md: 6 }, alignItems: 'start', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.5fr) minmax(0, 1fr)' } }}>
          <Box>
            <EncabezadoSeccion antetitulo="Trámite de título" titulo="Qué presentar en Bedelía" sx={{ mb: 2.5 }} />
            <Box component="ol" sx={{ m: 0, pl: 3, display: 'grid', gap: 1 }}>
              {DOCUMENTACION.map((documento) => (
                <li key={documento}>
                  <Typography sx={{ lineHeight: 1.55 }}>{documento}</Typography>
                </li>
              ))}
            </Box>
            <Alert severity="warning" variant="outlined" sx={{ mt: 2.5 }}>
              El trámite se inicia solo con toda la documentación completa.
            </Alert>
          </Box>

          <Paper variant="outlined" sx={{ p: 3, backgroundImage: 'none' }}>
            <Typography variant="h3" sx={{ mb: 1 }}>
              Cuándo presentarla
            </Typography>
            <Typography sx={{ mb: 1.5, lineHeight: 1.55 }}>
              Las solicitudes se reciben únicamente en <strong>marzo</strong> y <strong>agosto</strong>.
            </Typography>
            <Chip label={recepcion.etiqueta} color={recepcion.color} size="small" />
            <Typography variant="h3" sx={{ mt: 3, mb: 1 }}>
              Cuánto tarda
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              Desde el inicio hasta la entrega pasan como mínimo <strong>10 meses</strong>: la GOTYL envía los títulos en blanco y el número de resolución de validez nacional, el instituto los confecciona y luego se elevan al Ministerio de Educación para su legalización.
            </Typography>
          </Paper>
        </Box>
      </Seccion>

      <Seccion alterna>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3 }}>
          <PhotoCameraOutlinedIcon sx={{ fontSize: 44, color: 'secondary.main' }} aria-hidden />
          <Box sx={{ flexGrow: 1, flexBasis: 320 }}>
            <Typography variant="h2" sx={{ fontSize: { md: '1.7rem' } }}>
              Fotos del acto de colación
            </Typography>
            <Typography sx={{ mt: 0.75, color: 'text.secondary' }}>
              ¿Tenés fotos del acto? Compartilas con la comunidad a través del formulario.
            </Typography>
          </Box>
          <Button variant="contained" color="secondary" endIcon={<OpenInNewIcon />} href={ENLACES.fotosColacion} target="_blank" rel="noopener noreferrer">
            Subir fotos
          </Button>
        </Box>
      </Seccion>
    </>
  );
}
