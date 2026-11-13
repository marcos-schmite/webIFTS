import { Box, Paper, Typography } from '@mui/material';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Seccion, { EncabezadoSeccion } from './Seccion.jsx';

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
    </Seccion>
  );
}
