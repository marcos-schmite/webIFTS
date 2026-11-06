import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CUATRIMESTRE = { 1: '1.º', 2: '2.º' };
const soloEscritorio = { display: { xs: 'none', md: 'table-cell' } };

function Correlativas({ codigos, nombres }) {
  if (codigos.length === 0) return <span aria-label="Sin correlativas">—</span>;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {codigos.map((codigo) => (
        <Tooltip key={codigo} title={nombres.get(codigo)} arrow>
          <Chip label={codigo} size="small" variant="outlined" tabIndex={0} aria-label={`${codigo}: ${nombres.get(codigo)}`} />
        </Tooltip>
      ))}
    </Box>
  );
}

function FilaMateria({ materia, nombres }) {
  const detalleMovil = [
    `${CUATRIMESTRE[materia.cuatrimestre]} cuatrimestre`,
    `${materia.semanales} hs semanales`,
    `${materia.totales} hs`,
    materia.correlativas.length > 0 && `Correlativas: ${materia.correlativas.join(', ')}`,
    materia.promocion && 'Promoción directa / libre',
  ].filter(Boolean);

  return (
    <TableRow hover>
      <TableCell sx={{ fontVariantNumeric: 'tabular-nums', color: 'text.secondary', verticalAlign: 'top', pr: 0 }}>{materia.codigo}</TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {materia.nombre}
        </Typography>
        <Typography variant="caption" sx={{ display: { xs: 'block', md: 'none' }, mt: 0.25, color: 'text.secondary' }}>
          {detalleMovil.join(' · ')}
        </Typography>
      </TableCell>
      <TableCell sx={soloEscritorio}>{CUATRIMESTRE[materia.cuatrimestre]}</TableCell>
      <TableCell align="right" sx={{ ...soloEscritorio, fontVariantNumeric: 'tabular-nums' }}>{materia.semanales}</TableCell>
      <TableCell align="right" sx={{ ...soloEscritorio, fontVariantNumeric: 'tabular-nums' }}>{materia.totales}</TableCell>
      <TableCell sx={soloEscritorio}>
        <Correlativas codigos={materia.correlativas} nombres={nombres} />
      </TableCell>
      <TableCell align="center" sx={soloEscritorio}>
        {materia.promocion ? <CheckIcon fontSize="small" color="primary" titleAccess="Sí" /> : <span aria-label="No">—</span>}
      </TableCell>
    </TableRow>
  );
}

export default function PlanEstudios({ carrera }) {
  const nombres = new Map(carrera.plan.flatMap(({ materias }) => materias.map((m) => [m.codigo, m.nombre])));

  return (
    <Box>
      {carrera.plan.map(({ anio, titulo, materias }) => {
        const horas = materias.reduce((total, m) => total + m.totales, 0);
        return (
          <Accordion key={anio} defaultExpanded={anio === 1} variant="outlined" sx={{ '&:not(:last-of-type)': { borderBottom: 0 } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
                {titulo}
              </Typography>
              <Typography variant="body2" sx={{ alignSelf: 'center', mr: 1.5, color: 'text.secondary', whiteSpace: 'nowrap' }}>
                {materias.length} materias · {horas} hs
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Table size="small" aria-label={`Plan de estudios: ${titulo}`}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 64, fontWeight: 700 }}>Código</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Espacio curricular</TableCell>
                    <TableCell sx={{ ...soloEscritorio, fontWeight: 700 }}>Cuatr.</TableCell>
                    <TableCell align="right" sx={{ ...soloEscritorio, fontWeight: 700 }}>Hs sem.</TableCell>
                    <TableCell align="right" sx={{ ...soloEscritorio, fontWeight: 700 }}>Hs tot.</TableCell>
                    <TableCell sx={{ ...soloEscritorio, fontWeight: 700 }}>Correlativas</TableCell>
                    <TableCell align="center" sx={{ ...soloEscritorio, fontWeight: 700, lineHeight: 1.2 }}>Promoción directa / libre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materias.map((materia) => (
                    <FilaMateria key={materia.codigo} materia={materia} nombres={nombres} />
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7} sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.875rem', borderBottom: 0 }}>
                      Total {titulo.toLowerCase()}: {horas} horas
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        Carga horaria total del plan: <strong>{carrera.horas} horas</strong> ({carrera.duracion}). Las materias con código «PP» son prácticas profesionalizantes.
      </Typography>
    </Box>
  );
}
