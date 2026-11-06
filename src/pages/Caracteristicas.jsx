import { Box, Button, Paper, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { Link as LinkRouter } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Seccion, { EncabezadoSeccion } from '../components/Seccion.jsx';
import { CURSADA, LISTA_CARRERAS } from '../data/carreras.js';
import { IMAGENES, RUTAS } from '../data/sitio.js';

const BLOQUES = [
  {
    titulo: 'Una propuesta accesible',
    imagen: IMAGENES.sistemas,
    alt: 'Escritorio con dos monitores que muestran código fuente',
    items: ['Carreras de corta duración.', 'Gratuitas, no aranceladas.', 'Títulos oficiales.', 'Rápida inserción laboral.'],
  },
  {
    titulo: 'Cómo es la cursada',
    imagen: IMAGENES.higiene,
    alt: 'Casco, protectores auditivos, anteojos, guantes y botas de seguridad',
    items: [
      `Modalidad: ${CURSADA.modalidad.toLowerCase()}.`,
      `Días: ${CURSADA.dias.toLowerCase()}.`,
      `Horario: ${CURSADA.horario}.`,
      `Requisito de ingreso: ${CURSADA.requisito.toLowerCase()}.`,
    ],
  },
  {
    titulo: 'Cómo se ingresa',
    imagen: IMAGENES.estudiantes,
    alt: 'Estudiantes de Higiene y Seguridad y de Análisis de Sistemas trabajando en sus aulas',
    items: [
      'El ingreso se define por orden de mérito, según el puntaje total del examen obligatorio.',
      'La confirmación de la vacante se comunica con la información que brinda el Ministerio de Educación de la Ciudad de Buenos Aires.',
    ],
  },
];

export default function Caracteristicas() {
  return (
    <>
      <PageHeader
        titulo="Características de nuestra oferta académica"
        antetitulo="Oferta académica"
        descripcion="Dos tecnicaturas superiores, públicas y gratuitas, con cursada vespertina de lunes a viernes."
      />

      <Seccion>
        <Box sx={{ display: 'grid', gap: { xs: 5, md: 7 } }}>
          {BLOQUES.map((bloque, i) => (
            <Box
              key={bloque.titulo}
              sx={{ display: 'grid', gap: { xs: 2.5, md: 5 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}
            >
              <Box
                component="img"
                src={bloque.imagen}
                alt={bloque.alt}
                loading="lazy"
                sx={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: 2, display: 'block', order: { md: i % 2 === 0 ? 0 : 1 } }}
              />
              <Box>
                <Typography variant="h2" sx={{ mb: 2, fontSize: { md: '1.8rem' } }}>
                  {bloque.titulo}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 1.25 }}>
                  {bloque.items.map((item) => (
                    <Box component="li" key={item} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                      <CheckCircleOutlineIcon fontSize="small" color="primary" sx={{ mt: '3px' }} aria-hidden />
                      <Typography sx={{ lineHeight: 1.55 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Seccion>

      <Seccion alterna>
        <EncabezadoSeccion antetitulo="Carreras" titulo="Elegí tu tecnicatura" />
        <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          {LISTA_CARRERAS.map((carrera) => (
            <Paper key={carrera.id} variant="outlined" sx={{ p: 3, backgroundImage: 'none' }}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {carrera.titulo}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
                {carrera.resumen}
              </Typography>
              <Button component={LinkRouter} to={carrera.ruta} variant="outlined" color={carrera.color} endIcon={<ArrowForwardIcon />}>
                Ver plan de estudios
              </Button>
            </Paper>
          ))}
        </Box>
        <Button component={LinkRouter} to={RUTAS.preingreso} variant="contained" size="large" sx={{ mt: 4 }}>
          Ver cómo ingresar
        </Button>
      </Seccion>
    </>
  );
}
