import { Alert, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link as LinkRouter } from 'react-router-dom';
import GrillaHorarios from '../components/GrillaHorarios.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Seccion, { EncabezadoSeccion } from '../components/Seccion.jsx';
import VisorPdf from '../components/VisorPdf.jsx';
import { PERIODO_HORARIOS } from '../data/horarios.js';
import { ARCHIVOS, ENLACES, RUTAS } from '../data/sitio.js';

export default function Regulares() {
  return (
    <>
      <PageHeader
        titulo="Horarios de cursada"
        antetitulo="Alumnos regulares"
        descripcion={`Grilla del ${PERIODO_HORARIOS}. Elegí tu división y tu año: la próxima vez que entres, tu elección va a seguir guardada.`}
      >
        <Button variant="contained" endIcon={<OpenInNewIcon />} href={ENLACES.siuGuarani} target="_blank" rel="noopener noreferrer">
          SIU Guaraní
        </Button>
        <Button variant="outlined" endIcon={<OpenInNewIcon />} href={ENLACES.aulaVirtual} target="_blank" rel="noopener noreferrer">
          Aula Virtual
        </Button>
        <Button variant="outlined" component={LinkRouter} to={RUTAS.calendario}>
          Mesas de exámenes
        </Button>
      </PageHeader>

      <Seccion>
        <GrillaHorarios />
        <Alert severity="info" variant="outlined" sx={{ mt: 3 }}>
          Esta grilla se transcribió del PDF oficial. Ante cualquier diferencia, vale lo que indique el PDF.
        </Alert>
      </Seccion>

      <Seccion alterna>
        <EncabezadoSeccion antetitulo="Documento oficial" titulo={`Horarios ${PERIODO_HORARIOS}`} />
        <VisorPdf src={ARCHIVOS.horarios} titulo={`Horarios del ${PERIODO_HORARIOS} (PDF)`} alto={640} />
      </Seccion>
    </>
  );
}
