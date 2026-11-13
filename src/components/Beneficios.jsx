import { Box, Paper, Typography } from '@mui/material';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { AMET, INSTITUTO } from '../data/sitio.js';
import Seccion, { Antetitulo, EncabezadoSeccion } from './Seccion.jsx';

const BENEFICIOS = [
  {
    icono: AccessTimeIcon,
    titulo: 'Carreras de corta duración',
    texto: '2 años y medio en Análisis de Sistemas y 3 años en Higiene y Seguridad en el Trabajo.',
  },
  {
    icono: BusinessCenterOutlinedIcon,
    titulo: 'Rápida inserción laboral',
    texto: 'Formación práctica enfocada en los saberes que piden las organizaciones.',
  },
  {
    icono: AccountBalanceOutlinedIcon,
    titulo: 'Convenios universitarios',
    texto: 'Acuerdos con universidades públicas y privadas para continuar tus estudios.',
  },
  {
    icono: VerifiedOutlinedIcon,
    titulo: 'Título oficial',
    texto: 'Estudios gratuitos, no arancelados, con título técnico superior oficial.',
  },
];

const FUNCIONES = [
  {
    icono: GroupsOutlinedIcon,
    titulo: 'Responsabilidad social',
    texto: 'Formamos técnicos superiores que actúan con profesionalismo y aportan a una sociedad más justa y solidaria.',
  },
  {
    icono: HandshakeOutlinedIcon,
    titulo: 'Articulación',
    texto: 'Cooperamos e intercambiamos con otras instituciones de educación superior a través de convenios universitarios.',
  },
  {
    icono: ScienceOutlinedIcon,
    titulo: 'Extensión',
    texto: 'Compartimos lo que construimos con acciones que llevan innovación a espacios educativos, sociales y productivos.',
  },
];

function Item({ icono: Icono, titulo, texto, color }) {
  return (
    <Paper variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.25, height: '100%', backgroundImage: 'none' }}>
      <Icono sx={{ color: `${color}.main`, fontSize: 30 }} aria-hidden />
      <Typography variant="h3">{titulo}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
        {texto}
      </Typography>
    </Paper>
  );
}

// Muestra el logo oficial si está cargado en AMET.logo; si no, la sigla.
function LogoAmet() {
  const caja = { width: { xs: 96, sm: 120 }, height: { xs: 96, sm: 120 }, borderRadius: 2, display: 'grid', placeItems: 'center', flexShrink: 0 };

  if (AMET.logo) {
    return (
      <Box sx={{ ...caja, p: 1.5, bgcolor: '#ffffff', border: '1px solid', borderColor: 'divider' }}>
        <Box component="img" src={AMET.logo} alt={`Logo de ${AMET.sigla}`} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>
    );
  }

  return (
    <Box aria-hidden sx={{ ...caja, color: '#ffffff', background: 'linear-gradient(135deg, #3264be 0%, #0f7f0f 100%)', boxShadow: '0 10px 24px -12px rgba(15, 23, 42, 0.55)' }}>
      <Typography component="span" sx={{ fontWeight: 900, fontSize: { xs: '1.55rem', sm: '1.9rem' }, letterSpacing: '0.05em', lineHeight: 1 }}>
        {AMET.sigla}
      </Typography>
    </Box>
  );
}

function ConvenioAmet() {
  return (
    <Paper
      variant="outlined"
      sx={{
        mt: 2.5,
        p: { xs: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'none',
        display: 'grid',
        gap: { xs: 2.5, sm: 4 },
        alignItems: 'center',
        gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #3264be 0%, #0f7f0f 100%)',
        },
      }}
    >
      <LogoAmet />
      <Box>
        <Antetitulo sx={{ mb: 0.75 }}>Convenio institucional</Antetitulo>
        <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
          Instituto conveniado con {AMET.sigla}
        </Typography>
        <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.65, maxWidth: 680 }}>
          El {INSTITUTO.nombre} trabaja en convenio con la {AMET.nombre} ({AMET.sigla}), que impulsó la creación del instituto en 2010.
        </Typography>
      </Box>
    </Paper>
  );
}

export default function Beneficios() {
  return (
    <Seccion>
      <EncabezadoSeccion antetitulo="Beneficios" titulo="¿Por qué estudiar en el IFTS 19?" nivel={1} />
      <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' } }}>
        {BENEFICIOS.map((b) => (
          <Item key={b.titulo} {...b} color="primary" />
        ))}
      </Box>

      <EncabezadoSeccion antetitulo="Funciones" titulo="Nuestro propósito institucional" sx={{ mt: { xs: 6, md: 8 } }} />
      <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        {FUNCIONES.map((f) => (
          <Item key={f.titulo} {...f} color="secondary" />
        ))}
      </Box>
      <ConvenioAmet />
    </Seccion>
  );
}
