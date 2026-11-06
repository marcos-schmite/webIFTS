import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { Link as LinkRouter } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import PlanEstudios from '../components/PlanEstudios.jsx';
import Seccion, { EncabezadoSeccion } from '../components/Seccion.jsx';
import { CARRERAS, CURSADA } from '../data/carreras.js';
import { RUTAS } from '../data/sitio.js';

function ListaConIcono({ items, color }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 1.25 }}>
      {items.map((item) => (
        <Box component="li" key={item.texto ?? item} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
          <CheckCircleOutlineIcon fontSize="small" color={color} sx={{ mt: '3px' }} aria-hidden />
          <Box>
            <Typography sx={{ lineHeight: 1.55 }}>{item.texto ?? item}</Typography>
            {item.detalle && (
              <Box component="ul" sx={{ mt: 0.75, mb: 0, pl: 2.5, color: 'text.secondary' }}>
                {item.detalle.map((sub) => (
                  <li key={sub}>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {sub}
                    </Typography>
                  </li>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function Dato({ titulo, children }) {
  return (
    <Box>
      <Typography variant="caption" component="dt" sx={{ color: 'text.secondary', fontWeight: 600 }}>
        {titulo}
      </Typography>
      <Typography component="dd" sx={{ m: 0, fontWeight: 600, overflowWrap: 'anywhere' }}>
        {children}
      </Typography>
    </Box>
  );
}

export default function Carrera({ id }) {
  const carrera = CARRERAS[id];

  return (
    <>
      <PageHeader titulo={carrera.titulo} antetitulo="Tecnicatura superior" descripcion={carrera.resumen} miga={{ etiqueta: 'Oferta académica', to: RUTAS.oferta }}>
        <Button component={LinkRouter} to={RUTAS.preingreso} variant="contained" color={carrera.color} endIcon={<ArrowForwardIcon />}>
          Cómo ingresar
        </Button>
        <Button component={LinkRouter} to={RUTAS.regulares} variant="outlined" color={carrera.color}>
          Ver horarios
        </Button>
      </PageHeader>

      <Seccion>
        <Box sx={{ display: 'grid', gap: { xs: 4, md: 6 }, alignItems: 'start', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.7fr) minmax(0, 1fr)' } }}>
          <Box sx={{ display: 'grid', gap: 4.5 }}>
            <Box component="section">
              <Typography variant="h2" sx={{ fontSize: { md: '1.7rem' }, mb: 1.5 }}>
                Finalidad de la carrera
              </Typography>
              <Typography sx={{ lineHeight: 1.7 }}>{carrera.finalidad}</Typography>
            </Box>
            <Box component="section">
              <Typography variant="h2" sx={{ fontSize: { md: '1.7rem' }, mb: 1.5 }}>
                Perfil del egresado
              </Typography>
              <Typography sx={{ lineHeight: 1.7, mb: 2 }}>{carrera.perfil}</Typography>
              <ListaConIcono items={carrera.funciones} color={carrera.color} />
            </Box>
            <Box component="section">
              <Typography variant="h2" sx={{ fontSize: { md: '1.7rem' }, mb: 1.5 }}>
                Rasgos profesionales
              </Typography>
              <ListaConIcono items={carrera.rasgos} color={carrera.color} />
            </Box>
          </Box>

          <Box sx={{ position: { md: 'sticky' }, top: { md: 92 }, display: 'grid', gap: 2 }}>
            <Box component="img" src={carrera.imagen} alt={carrera.imagenAlt} sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 2, display: 'block' }} />
            <Paper variant="outlined" sx={{ p: 2.5, backgroundImage: 'none' }}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Datos de la carrera
              </Typography>
              <Box component="dl" sx={{ display: 'grid', gap: 1.5, m: 0 }}>
                <Dato titulo="Duración">{carrera.duracion}</Dato>
                <Dato titulo="Carga horaria">{carrera.horas} horas</Dato>
                <Dato titulo="Modalidad">{CURSADA.modalidad}</Dato>
                <Dato titulo="Cursada">{CURSADA.dias}, {CURSADA.horario}</Dato>
                <Dato titulo="Requisito de ingreso">{CURSADA.requisito}</Dato>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'grid', gap: 2 }}>
                <Box>
                  <Dato titulo="Plan nuevo (desde 2024)">{carrera.resolucion}</Dato>
                  <Button href={carrera.planNuevo} target="_blank" rel="noopener noreferrer" startIcon={<PictureAsPdfOutlinedIcon />} variant="contained" color={carrera.color} size="small" sx={{ mt: 1 }}>
                    Descargar plan nuevo
                  </Button>
                </Box>
                <Box>
                  <Dato titulo="Plan de cierre">{carrera.resolucionCierre}</Dato>
                  <Button href={carrera.planCierre} target="_blank" rel="noopener noreferrer" startIcon={<PictureAsPdfOutlinedIcon />} variant="outlined" color={carrera.color} size="small" sx={{ mt: 1 }}>
                    Descargar plan de cierre
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Seccion>

      <Seccion alterna>
        <EncabezadoSeccion
          antetitulo="Plan nuevo"
          titulo="Plan de estudios"
          descripcion={`Materias por año según la resolución ${carrera.resolucion}. Pasá el cursor por una correlativa para ver a qué materia corresponde.`}
        />
        <PlanEstudios carrera={carrera} />
      </Seccion>
    </>
  );
}
