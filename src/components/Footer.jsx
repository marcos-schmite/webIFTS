import { Box, Container, Divider, Link, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Link as LinkRouter } from 'react-router-dom';
import { CONTACTO, ENLACES, INSTITUTO, RUTAS } from '../data/sitio.js';
import { fondoInstitucional } from '../theme.js';

const COLUMNAS = [
  {
    titulo: 'Oferta académica',
    enlaces: [
      { etiqueta: 'Características de las carreras', to: RUTAS.oferta },
      { etiqueta: 'Análisis de Sistemas', to: RUTAS.sistemas },
      { etiqueta: 'Higiene y Seguridad en el Trabajo', to: RUTAS.higiene },
      { etiqueta: 'Preingreso', to: RUTAS.preingreso },
    ],
  },
  {
    titulo: 'Estudiantes',
    enlaces: [
      { etiqueta: 'Horarios', to: RUTAS.regulares },
      { etiqueta: 'Mesas de exámenes', to: RUTAS.calendario },
      { etiqueta: 'Constancias', to: RUTAS.constancias },
      { etiqueta: 'Egresados', to: RUTAS.egresados },
      { etiqueta: 'Actividades', to: RUTAS.actividades },
      { etiqueta: 'SIU Guaraní', href: ENLACES.siuGuarani },
      { etiqueta: 'Aula Virtual', href: ENLACES.aulaVirtual },
    ],
  },
];

const estiloEnlace = { color: 'inherit', display: 'inline-block', py: 0.35, fontSize: '0.92rem', textDecorationColor: 'rgba(255,255,255,0.6)' };

function FilaContacto({ icono: Icono, href, externo, children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
      <Icono fontSize="small" sx={{ mt: '2px', flexShrink: 0 }} aria-hidden />
      <Link
        href={href}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        sx={{ ...estiloEnlace, py: 0, overflowWrap: 'anywhere' }}
      >
        {children}
      </Link>
    </Box>
  );
}

export default function Footer() {
  return (
    <Box component="footer" sx={fondoInstitucional}>
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 7 }, pb: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 5 },
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.4fr 1fr 1fr 1.25fr' },
          }}
        >
          <Box>
            <Typography component="p" sx={{ fontWeight: 800, fontSize: '1.2rem', mb: 1 }}>
              {INSTITUTO.nombre}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.65, maxWidth: 320 }}>
              {INSTITUTO.nombreCompleto} ({INSTITUTO.distrito}). Educación superior pública y gratuita de la Ciudad de Buenos Aires.
            </Typography>
          </Box>

          {COLUMNAS.map((columna) => (
            <Box component="nav" aria-label={columna.titulo} key={columna.titulo}>
              <Typography component="p" sx={{ fontWeight: 700, mb: 1 }}>
                {columna.titulo}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.etiqueta}>
                    {enlace.to ? (
                      <Link component={LinkRouter} to={enlace.to} sx={estiloEnlace}>
                        {enlace.etiqueta}
                      </Link>
                    ) : (
                      <Link href={enlace.href} target="_blank" rel="noopener noreferrer" sx={estiloEnlace}>
                        {enlace.etiqueta}
                      </Link>
                    )}
                  </li>
                ))}
              </Box>
            </Box>
          ))}

          <Box>
            <Typography component="p" sx={{ fontWeight: 700, mb: 1 }}>
              Contacto
            </Typography>
            <FilaContacto icono={PlaceOutlinedIcon} href={CONTACTO.mapa} externo>
              {CONTACTO.direccion}
            </FilaContacto>
            <FilaContacto icono={EmailOutlinedIcon} href={`mailto:${CONTACTO.email}`}>
              {CONTACTO.email}
            </FilaContacto>
            <FilaContacto icono={PhoneOutlinedIcon} href={CONTACTO.telefonoEnlace}>
              {CONTACTO.telefono}
            </FilaContacto>
            <FilaContacto icono={InstagramIcon} href={CONTACTO.instagram} externo>
              {CONTACTO.instagramUsuario}
            </FilaContacto>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.25)' }} />
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} {INSTITUTO.nombreCompleto}.
        </Typography>
      </Container>
    </Box>
  );
}
