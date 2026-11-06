import { Box, Button, Paper, Typography } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PageHeader from '../components/PageHeader.jsx';
import Seccion, { EncabezadoSeccion } from '../components/Seccion.jsx';
import { LISTA_CARRERAS } from '../data/carreras.js';
import { CONSTANCIAS } from '../data/sitio.js';

const PASOS = ['Descargá el documento de tu carrera.', 'Completalo con tus datos.', 'Presentalo en Rectoría para la firma y el sello institucional.'];

export default function Constancias() {
  return (
    <>
      <PageHeader
        titulo="Constancias y solicitudes"
        antetitulo="Alumnos"
        descripcion="Certificados en formato Word, listos para descargar y completar."
      />

      <Seccion>
        <EncabezadoSeccion antetitulo="Descargas" titulo="Elegí el certificado" />
        <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {CONSTANCIAS.map((constancia) => (
            <Paper key={constancia.id} variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, backgroundImage: 'none' }}>
              <Typography variant="h3">{constancia.titulo}</Typography>
              <Box sx={{ display: 'grid', gap: 1, mt: 'auto' }}>
                {LISTA_CARRERAS.map((carrera) => (
                  <Button
                    key={carrera.id}
                    variant="outlined"
                    color={carrera.color}
                    startIcon={<DownloadOutlinedIcon />}
                    href={constancia[carrera.id]}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                    aria-label={`${constancia.titulo}: descargar para ${carrera.nombreCorto}`}
                  >
                    {carrera.nombreCorto}
                  </Button>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Seccion>

      <Seccion alterna>
        <EncabezadoSeccion antetitulo="Trámite" titulo="Qué hacer después de descargarlo" />
        <Box component="ol" sx={{ m: 0, pl: 3, display: 'grid', gap: 1 }}>
          {PASOS.map((paso) => (
            <li key={paso}>
              <Typography sx={{ lineHeight: 1.55 }}>{paso}</Typography>
            </li>
          ))}
        </Box>
      </Seccion>
    </>
  );
}
