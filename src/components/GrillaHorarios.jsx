import { useState } from 'react';
import { Box, Chip, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { BLOQUES, DIAS, DIVISIONES } from '../data/horarios.js';
import useEstadoGuardado from '../hooks/useEstadoGuardado.js';

const COLUMNAS_DIA = { xs: '1fr', md: '104px minmax(0, 1fr)' };
const COLUMNAS_BLOQUES = { xs: '1fr', md: 'repeat(6, minmax(0, 1fr))' };

function TarjetaClase({ clase, color }) {
  const inicio = BLOQUES[clase.desde].inicio;
  const fin = BLOQUES[clase.hasta].fin;

  return (
    <Box
      component="li"
      sx={{
        gridColumn: { md: `${clase.desde + 1} / span ${clase.hasta - clase.desde + 1}` },
        minWidth: 0,
        p: 1,
        borderRadius: 1,
        borderLeft: '3px solid',
        borderColor: `${color}.main`,
        backgroundColor: `rgba(var(--mui-palette-${color}-mainChannel) / 0.1)`,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 650, lineHeight: 1.25, hyphens: 'auto' }} lang="es">
        {clase.materia}
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 0.25, color: 'text.secondary', lineHeight: 1.3 }}>
        {clase.docente}
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 0.25, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        {inicio} a {fin}
      </Typography>
    </Box>
  );
}

function SemanaDeAnio({ anio, dias, color, indiceHoy }) {
  return (
    <Paper component="section" variant="outlined" aria-label={`${anio}.º año`} sx={{ overflow: 'hidden' }}>
      <Typography variant="h3" sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        {anio}.º año
      </Typography>

      {/* Encabezado con los bloques horarios, solo en pantallas grandes. */}
      <Box aria-hidden sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: COLUMNAS_DIA.md, px: 2, pt: 1 }}>
        <span />
        <Box sx={{ display: 'grid', gridTemplateColumns: COLUMNAS_BLOQUES.md, gap: 0.75 }}>
          {BLOQUES.map(({ inicio, fin }) => (
            <Typography key={inicio} variant="caption" sx={{ color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>
              {inicio} a {fin}
            </Typography>
          ))}
        </Box>
      </Box>

      {DIAS.map((dia, indice) => {
        const esHoy = indice === indiceHoy;
        return (
          <Box
            key={dia}
            sx={{
              display: 'grid',
              gridTemplateColumns: COLUMNAS_DIA,
              alignItems: 'start',
              gap: { xs: 0.75, md: 0 },
              px: 2,
              py: 1,
              borderTop: indice === 0 ? { xs: 0, md: 0 } : '1px solid',
              borderColor: 'divider',
              backgroundColor: esHoy ? 'action.hover' : 'transparent',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: { xs: 'center', md: 'flex-start' }, gap: 0.75 }}>
              <Typography variant="h4" component="h4">
                {dia}
              </Typography>
              {esHoy && <Chip label="Hoy" size="small" color={color} sx={{ height: 20 }} />}
            </Box>
            <Box
              component="ul"
              sx={{ display: 'grid', gridTemplateColumns: COLUMNAS_BLOQUES, gap: 0.75, listStyle: 'none', m: 0, p: 0 }}
            >
              {dias[indice].map((clase) => (
                <TarjetaClase key={clase.desde} clase={clase} color={color} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
}

export default function GrillaHorarios() {
  const [idDivision, setIdDivision] = useEstadoGuardado('ifts19-division', DIVISIONES[0].id);
  const [anioElegido, setAnioElegido] = useEstadoGuardado('ifts19-anio', 'todos');
  const [indiceHoy] = useState(() => new Date().getDay() - 1);

  const division = DIVISIONES.find((d) => d.id === idDivision) ?? DIVISIONES[0];
  const anioValido = division.anios.some(({ anio }) => anio === anioElegido);
  const anio = anioValido ? anioElegido : 'todos';
  const visibles = anio === 'todos' ? division.anios : division.anios.filter((a) => a.anio === anio);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end', mb: 3 }}>
        <Box>
          <Typography id="etiqueta-division" variant="body2" sx={{ fontWeight: 700, mb: 0.75 }}>
            División
          </Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            color="primary"
            value={division.id}
            onChange={(_, valor) => valor && setIdDivision(valor)}
            aria-labelledby="etiqueta-division"
          >
            {DIVISIONES.map((d) => (
              <ToggleButton key={d.id} value={d.id} aria-label={d.nombre} sx={{ px: 1.75 }}>
                {d.nombreCorto}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Typography id="etiqueta-anio" variant="body2" sx={{ fontWeight: 700, mb: 0.75 }}>
            Año
          </Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            color="primary"
            value={anio}
            onChange={(_, valor) => valor && setAnioElegido(valor)}
            aria-labelledby="etiqueta-anio"
          >
            <ToggleButton value="todos" sx={{ px: 1.75 }}>
              Todos
            </ToggleButton>
            {division.anios.map((a) => (
              <ToggleButton key={a.anio} value={a.anio} sx={{ px: 1.75 }}>
                {a.anio}.º
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Typography component="h3" variant="h3" sx={{ mb: 2 }}>
        {division.nombre}
      </Typography>

      <Box sx={{ display: 'grid', gap: 2.5 }}>
        {visibles.map((a) => (
          <SemanaDeAnio key={a.anio} anio={a.anio} dias={a.dias} color={division.color} indiceHoy={indiceHoy} />
        ))}
      </Box>
    </Box>
  );
}
