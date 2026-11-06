import { Box, Link, Paper, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PageHeader from '../components/PageHeader.jsx';
import Seccion from '../components/Seccion.jsx';
import { CONTACTO } from '../data/sitio.js';

const CANALES = [
  { icono: PlaceOutlinedIcon, titulo: 'Dirección', texto: CONTACTO.direccion, href: CONTACTO.mapa, externo: true },
  { icono: EmailOutlinedIcon, titulo: 'Correo institucional', texto: CONTACTO.email, href: `mailto:${CONTACTO.email}` },
  { icono: EmailOutlinedIcon, titulo: 'Consultas de inscripción', texto: CONTACTO.emailInscripciones, href: `mailto:${CONTACTO.emailInscripciones}` },
  { icono: PhoneOutlinedIcon, titulo: 'Teléfono', texto: CONTACTO.telefono, href: CONTACTO.telefonoEnlace },
  { icono: InstagramIcon, titulo: 'Instagram', texto: CONTACTO.instagramUsuario, href: CONTACTO.instagram, externo: true },
];

export default function Contacto() {
  return (
    <>
      <PageHeader titulo="Contacto" antetitulo="Estamos para ayudarte" descripcion="Acercate al instituto o escribinos por cualquiera de estos canales." />
      <Seccion>
        <Box sx={{ display: 'grid', gap: 3, alignItems: 'stretch', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1.4fr)' } }}>
          <Box sx={{ display: 'grid', gap: 1.5 }}>
            {CANALES.map(({ icono: Icono, titulo, texto, href, externo }) => (
              <Paper key={titulo} variant="outlined" sx={{ p: 2, display: 'flex', gap: 1.5, alignItems: 'flex-start', backgroundImage: 'none' }}>
                <Icono color="secondary" aria-hidden />
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    {titulo}
                  </Typography>
                  <Link href={href} {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})} sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>
                    {texto}
                  </Link>
                </Box>
              </Paper>
            ))}
          </Box>
          <Box
            component="iframe"
            src={CONTACTO.mapaEmbebido}
            title={`Mapa: ${CONTACTO.direccion}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sx={{ width: '100%', height: '100%', minHeight: 380, border: '1px solid', borderColor: 'divider', borderRadius: 2, display: 'block' }}
          />
        </Box>
      </Seccion>
    </>
  );
}
