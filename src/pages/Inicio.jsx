import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link as LinkRouter } from 'react-router-dom';
import Beneficios from '../components/Beneficios.jsx';
import Galeria from '../components/Galeria.jsx';
import Hero from '../components/Hero.jsx';
import Seccion, { EncabezadoSeccion } from '../components/Seccion.jsx';
import { LISTA_CARRERAS } from '../data/carreras.js';
import { PERIODO_HORARIOS } from '../data/horarios.js';
import { ARCHIVOS, RUTAS } from '../data/sitio.js';
import useTituloPagina from '../hooks/useTituloPagina.js';

const PASOS_INGRESO = [
  { titulo: 'Preinscribite', texto: 'Completá la ficha de ingreso y anotate en el SIU Guaraní dentro de las fechas publicadas.' },
  { titulo: 'Prepará el examen', texto: 'Si querés, hacé el curso de preingreso optativo en el Aula Virtual.' },
  { titulo: 'Rendí el examen', texto: 'Es obligatorio: las vacantes se asignan por orden de mérito.' },
  { titulo: 'Confirmá tu vacante', texto: 'Revisá la asignación en las fechas indicadas y presentá tu documentación.' },
];

function AvisoHorarios() {
  return (
    <Box component="section" aria-label="Horarios del cuatrimestre" sx={{ bgcolor: 'background.default', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ py: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
        <EventNoteOutlinedIcon sx={{ color: 'secondary.main', fontSize: 32 }} aria-hidden />
        <Box sx={{ flexGrow: 1, minWidth: 240 }}>
          <Typography variant="h3" component="h2">
            Horarios {PERIODO_HORARIOS}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Consultá la grilla por división y año, o descargá el PDF oficial.
          </Typography>
        </Box>
        <Button variant="contained" color="secondary" component={LinkRouter} to={RUTAS.regulares}>
          Ver horarios
        </Button>
        <Button variant="outlined" color="secondary" endIcon={<OpenInNewIcon />} href={ARCHIVOS.horarios} target="_blank" rel="noopener noreferrer">
          PDF oficial
        </Button>
      </Container>
    </Box>
  );
}

function Carreras() {
  return (
    <Seccion alterna>
      <EncabezadoSeccion
        antetitulo="Oferta académica"
        titulo="Dos tecnicaturas superiores con título oficial"
        descripcion="Cursada de lunes a viernes, de 17:50 a 22:10, en modalidad mixta con clases presenciales y virtuales."
      />
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        {LISTA_CARRERAS.map((carrera) => (
          <Card key={carrera.id} variant="outlined" sx={{ backgroundImage: 'none' }}>
            <CardActionArea component={LinkRouter} to={carrera.ruta} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <CardMedia component="img" image={carrera.imagen} alt={carrera.imagenAlt} loading="lazy" sx={{ height: { xs: 190, md: 240 } }} />
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Typography variant="h3" sx={{ fontSize: '1.3rem', mb: 1 }}>
                  {carrera.titulo}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
                  {carrera.resumen}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                  <Chip size="small" label={carrera.duracion} />
                  <Chip size="small" label={`${carrera.horas} horas`} />
                  <Box sx={{ ml: 'auto', display: 'inline-flex', alignItems: 'center', gap: 0.5, fontWeight: 700, color: `${carrera.color}.main` }}>
                    Ver carrera <ArrowForwardIcon fontSize="small" aria-hidden />
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Seccion>
  );
}

function ComoIngresar() {
  return (
    <Seccion alterna>
      <EncabezadoSeccion antetitulo="Preingreso" titulo="¿Cómo ingresar?" descripcion="El requisito es tener el nivel medio aprobado. Estos son los pasos." />
      <Box component="ol" sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, listStyle: 'none', m: 0, p: 0 }}>
        {PASOS_INGRESO.map((paso, i) => (
          <Box component="li" key={paso.titulo} sx={{ borderTop: '3px solid', borderColor: i === 0 ? 'secondary.main' : 'primary.main', pt: 1.5 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: 'text.secondary', lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>
              {i + 1}
            </Typography>
            <Typography variant="h3" sx={{ mt: 0.5, mb: 0.75 }}>
              {paso.titulo}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {paso.texto}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button variant="contained" size="large" component={LinkRouter} to={RUTAS.preingreso} endIcon={<ArrowForwardIcon />} sx={{ mt: 4 }}>
        Ver fechas y requisitos
      </Button>
    </Seccion>
  );
}

export default function Inicio() {
  useTituloPagina();

  return (
    <>
      <Beneficios />
      <Hero />
      <Galeria />
      <Carreras />
      <AvisoHorarios />
      <ComoIngresar />
    </>
  );
}
