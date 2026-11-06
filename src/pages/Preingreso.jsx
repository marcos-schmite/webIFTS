import { Alert, Box, Button, Chip, Link, Paper, Typography } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PageHeader from '../components/PageHeader.jsx';
import Seccion, { EncabezadoSeccion } from '../components/Seccion.jsx';
import VideoYoutube from '../components/VideoYoutube.jsx';
import { CICLO_INGRESO, CRONOGRAMA_INGRESO, estadoDeEtapa, fechaDeHoy, formatearFecha } from '../data/ingreso.js';
import { ARCHIVOS, CONTACTO, ENLACES, VIDEOS } from '../data/sitio.js';

const ESTADOS = {
  abierta: { etiqueta: 'Abierta ahora', color: 'primary', variante: 'filled' },
  proxima: { etiqueta: 'Próximamente', color: 'secondary', variante: 'outlined' },
  finalizada: { etiqueta: 'Finalizada', color: 'default', variante: 'outlined' },
};

const PASOS = [
  {
    titulo: 'Completá la ficha de ingreso',
    puntos: ['Imprimila y completala con letra clara.'],
    acciones: [{ etiqueta: 'Descargar ficha', href: ARCHIVOS.fichaIngreso, icono: DownloadOutlinedIcon }],
  },
  {
    titulo: 'Preinscribite en el SIU Guaraní',
    puntos: [
      'Cargá todos tus datos: solo se tienen en cuenta las preinscripciones completas y con documentación.',
      'Elegí la tecnicatura y el instituto (una sola carrera), el horario y la modalidad.',
      'Subí tu DNI y el título que certifica el secundario completo.',
      'Descargá el comprobante. En unos 2 días hábiles te llega un correo con más información.',
    ],
    acciones: [
      { etiqueta: 'Primera vez: crear usuario', href: ENLACES.siuPreinscripcion, icono: OpenInNewIcon, destacada: true },
      { etiqueta: 'Ya tengo usuario', href: ENLACES.siuGuarani, icono: OpenInNewIcon },
    ],
  },
  {
    titulo: 'Hacé el curso de preingreso (optativo)',
    puntos: [
      'Con la preinscripción terminada tenés acceso al Aula Virtual; la matriculación se hace cada lunes.',
      'Para entrar por primera vez, tu usuario es el DNI sin puntos.',
    ],
    acciones: [{ etiqueta: 'Ir al Aula Virtual', href: ENLACES.aulaVirtual, icono: OpenInNewIcon }],
  },
  {
    titulo: 'Rendí el examen obligatorio',
    puntos: [
      'Es en el Aula Virtual, tenés un solo intento y 90 minutos.',
      'Se realiza en el instituto donde te preinscribiste: acercate para recibir más información.',
    ],
  },
  {
    titulo: 'Confirmá tu vacante',
    puntos: [
      'Las vacantes son limitadas y se asignan por orden de mérito, según el puntaje obtenido.',
      'El instituto te avisa cuándo presentar la documentación que cargaste en el SIU para validar la vacante.',
    ],
  },
];

function FilaCronograma({ etapa, hoy }) {
  const estado = ESTADOS[estadoDeEtapa(etapa, hoy)];
  const fechas = etapa.etiqueta ?? `Del ${formatearFecha(etapa.desde)} al ${formatearFecha(etapa.hasta)}, inclusive`;

  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1.5,
        py: 1.75,
        px: 2.5,
        '&:not(:last-of-type)': { borderBottom: '1px solid', borderColor: 'divider' },
      }}
    >
      <Box sx={{ flexGrow: 1, minWidth: 220, flexBasis: 0 }}>
        <Typography variant="h3" component="p" sx={{ fontSize: '1.02rem' }}>
          {etapa.titulo}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fechas}
        </Typography>
      </Box>
      <Chip size="small" label={estado.etiqueta} color={estado.color} variant={estado.variante} />
    </Box>
  );
}

export default function Preingreso() {
  const hoy = fechaDeHoy();
  const cicloTerminado = CRONOGRAMA_INGRESO.every((etapa) => estadoDeEtapa(etapa, hoy) === 'finalizada');

  return (
    <>
      <PageHeader
        titulo="Preingreso"
        antetitulo="Ingresantes"
        descripcion="Fechas, pasos y documentación para empezar a estudiar en el IFTS N.º 19."
      >
        <Button variant="contained" startIcon={<DownloadOutlinedIcon />} href={ARCHIVOS.fichaIngreso} target="_blank" rel="noopener noreferrer">
          Ficha de ingreso
        </Button>
        <Button variant="outlined" startIcon={<DownloadOutlinedIcon />} href={ARCHIVOS.guiaIngreso} target="_blank" rel="noopener noreferrer">
          Guía para ingresantes (PDF)
        </Button>
      </PageHeader>

      <Seccion>
        <EncabezadoSeccion antetitulo="Lo que tenés que saber" titulo={`Cronograma del ingreso ${CICLO_INGRESO}`} />
        {cicloTerminado && (
          <Alert severity="info" sx={{ mb: 2.5, maxWidth: 820 }}>
            Las etapas del ingreso {CICLO_INGRESO} ya finalizaron y este sitio todavía no tiene publicadas las fechas del próximo ciclo. Para consultas, escribí a{' '}
            <Link href={`mailto:${CONTACTO.emailInscripciones}`}>{CONTACTO.emailInscripciones}</Link>.
          </Alert>
        )}
        <Paper variant="outlined" component="ol" sx={{ listStyle: 'none', m: 0, p: 0, maxWidth: 820, backgroundImage: 'none' }}>
          {CRONOGRAMA_INGRESO.map((etapa) => (
            <FilaCronograma key={etapa.id} etapa={etapa} hoy={hoy} />
          ))}
        </Paper>
      </Seccion>

      <Seccion alterna>
        <EncabezadoSeccion antetitulo="Paso a paso" titulo="Cómo inscribirte" />
        <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 2, maxWidth: 820 }}>
          {PASOS.map((paso, i) => (
            <Paper component="li" variant="outlined" key={paso.titulo} sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', gap: 2, backgroundImage: 'none' }}>
              <Box
                aria-hidden
                sx={{
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 1,
                  fontWeight: 800,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              >
                {i + 1}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {paso.titulo}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.25, color: 'text.secondary' }}>
                  {paso.puntos.map((punto) => (
                    <li key={punto}>
                      <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
                        {punto}
                      </Typography>
                    </li>
                  ))}
                </Box>
                {paso.acciones && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.75 }}>
                    {paso.acciones.map(({ etiqueta, href, icono: Icono, destacada }) => (
                      <Button key={etiqueta} size="small" variant={destacada ? 'contained' : 'outlined'} endIcon={<Icono />} href={href} target="_blank" rel="noopener noreferrer">
                        {etiqueta}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
        <Alert severity="info" variant="outlined" sx={{ mt: 2.5, maxWidth: 820 }}>
          Si tenés más de 25 años y no terminaste el secundario, escribí a{' '}
          <Link href={`mailto:${CONTACTO.emailPreingreso}`}>{CONTACTO.emailPreingreso}</Link>.
        </Alert>
      </Seccion>

      <Seccion>
        <EncabezadoSeccion antetitulo="Videotutoriales" titulo="Mirá cómo se hace" />
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <VideoYoutube {...VIDEOS.preinscripcion} />
          <VideoYoutube {...VIDEOS.aulaVirtual} />
        </Box>
      </Seccion>

      <Seccion alterna>
        <EncabezadoSeccion antetitulo="Consultas" titulo="¿Tenés dudas?" />
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, maxWidth: 820 }}>
          {[
            { titulo: 'Inscripciones del IFTS N.º 19', email: CONTACTO.emailInscripciones },
            { titulo: 'Preingreso a tecnicaturas (Ciudad)', email: CONTACTO.emailPreingreso },
          ].map(({ titulo, email }) => (
            <Paper key={email} variant="outlined" sx={{ p: 2.5, display: 'flex', gap: 1.5, backgroundImage: 'none' }}>
              <EmailOutlinedIcon color="secondary" aria-hidden />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h4" component="p">
                  {titulo}
                </Typography>
                <Link href={`mailto:${email}`} sx={{ overflowWrap: 'anywhere' }}>
                  {email}
                </Link>
              </Box>
            </Paper>
          ))}
        </Box>
      </Seccion>
    </>
  );
}
