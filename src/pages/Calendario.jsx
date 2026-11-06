import { useState } from 'react';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Seccion from '../components/Seccion.jsx';
import VisorPdf from '../components/VisorPdf.jsx';
import { ARCHIVOS, RUTAS } from '../data/sitio.js';

const MESAS = [
  { id: 'hys-a', pestana: 'Higiene y Seguridad · A', titulo: 'Higiene y Seguridad en el Trabajo, División A', src: ARCHIVOS.mesasHysA },
  { id: 'hys-b', pestana: 'Higiene y Seguridad · B', titulo: 'Higiene y Seguridad en el Trabajo, División B', src: ARCHIVOS.mesasHysB },
  { id: 'ads', pestana: 'Análisis de Sistemas', titulo: 'Análisis de Sistemas', src: ARCHIVOS.mesasAds },
];

export default function Calendario() {
  const [activa, setActiva] = useState(0);
  const mesa = MESAS[activa];

  return (
    <>
      <PageHeader
        titulo="Mesas de exámenes"
        antetitulo="Calendario académico"
        descripcion="Elegí tu carrera y división para ver los llamados, con fecha, horario y docente de cada materia."
      >
        <Button variant="outlined" component={LinkRouter} to={RUTAS.regulares}>
          Ver horarios de cursada
        </Button>
      </PageHeader>

      <Seccion>
        <Tabs
          value={activa}
          onChange={(_, valor) => setActiva(valor)}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="Mesas por carrera y división"
          sx={{ mb: 3, borderBottom: '1px solid', borderColor: 'divider', '& .MuiTab-root': { textTransform: 'none', fontWeight: 700 } }}
        >
          {MESAS.map((m) => (
            <Tab key={m.id} label={m.pestana} />
          ))}
        </Tabs>
        <Box role="tabpanel" aria-label={mesa.titulo}>
          <VisorPdf src={mesa.src} titulo={`Mesas de exámenes: ${mesa.titulo}`} alto={700} />
        </Box>
      </Seccion>
    </>
  );
}
