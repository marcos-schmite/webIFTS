import { useMemo } from 'react';
import { Avatar, Box, Chip, InputAdornment, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Seccion, { EncabezadoSeccion } from '../components/Seccion.jsx';
import VideoYoutube from '../components/VideoYoutube.jsx';
import { normalizar } from '../data/busqueda.js';
import { CARRERAS } from '../data/carreras.js';
import { AUTORIDADES, CUERPO_DOCENTE } from '../data/docentes.js';
import { materiasDeDocente, PERIODO_HORARIOS } from '../data/horarios.js';
import { VIDEOS } from '../data/sitio.js';

const iniciales = (nombre) => {
  const [apellido, nombres = ''] = nombre.split(',');
  return `${nombres.trim()[0] ?? ''}${apellido.trim()[0] ?? ''}`;
};

function TarjetaDocente({ docente }) {
  const materias = materiasDeDocente(docente.nombre);

  return (
    <Paper component="li" variant="outlined" sx={{ p: 2.25, display: 'flex', gap: 1.75, backgroundImage: 'none' }}>
      <Avatar aria-hidden sx={{ width: 44, height: 44, fontSize: '0.95rem', fontWeight: 700, bgcolor: `${CARRERAS[docente.carreras[0]].color}.main`, color: `${CARRERAS[docente.carreras[0]].color}.contrastText` }}>
        {iniciales(docente.nombre)}
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="h4" component="h3">
          {docente.nombre}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.75 }}>
          {docente.carreras.map((id) => (
            <Chip key={id} size="small" variant="outlined" color={CARRERAS[id].color} label={CARRERAS[id].nombreCorto} />
          ))}
        </Box>
        {materias.length > 0 && (
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.45 }}>
            {materias.join(' · ')}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default function Docentes() {
  const [parametros, setParametros] = useSearchParams();
  const busqueda = parametros.get('buscar') ?? '';
  const carrera = parametros.get('carrera') ?? 'todas';

  const actualizar = (clave, valor, vacio) => {
    setParametros(
      (actuales) => {
        const nuevos = new URLSearchParams(actuales);
        if (valor && valor !== vacio) nuevos.set(clave, valor);
        else nuevos.delete(clave);
        return nuevos;
      },
      { replace: true },
    );
  };

  const visibles = useMemo(() => {
    const terminos = normalizar(busqueda).split(/\s+/).filter(Boolean);
    return CUERPO_DOCENTE.filter((docente) => {
      if (carrera !== 'todas' && !docente.carreras.includes(carrera)) return false;
      const texto = normalizar(`${docente.nombre} ${materiasDeDocente(docente.nombre).join(' ')}`);
      return terminos.every((t) => texto.includes(t.replace(/,/g, '')));
    });
  }, [busqueda, carrera]);

  return (
    <>
      <PageHeader
        titulo="Docentes y autoridades"
        antetitulo="Comunidad educativa"
        descripcion="Quiénes conducen el instituto y quiénes dictan clases en cada carrera."
      />

      <Seccion>
        <EncabezadoSeccion antetitulo="Institución" titulo="Autoridades y equipo" />
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' } }}>
          {AUTORIDADES.map(({ cargo, personas }) => (
            <Paper key={cargo} variant="outlined" sx={{ p: 2.25, backgroundImage: 'none' }}>
              <Typography variant="overline" component="h3" sx={{ color: 'secondary.main', display: 'block', mb: 0.5 }}>
                {cargo}
              </Typography>
              {personas.map((persona) => (
                <Typography key={persona} sx={{ fontWeight: 600, lineHeight: 1.45 }}>
                  {persona}
                </Typography>
              ))}
            </Paper>
          ))}
        </Box>
      </Seccion>

      <Seccion alterna>
        <EncabezadoSeccion
          antetitulo="Cuerpo docente"
          titulo="Docentes por carrera"
          descripcion={`Buscá por nombre o materia. Las materias listadas corresponden al ${PERIODO_HORARIOS}.`}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <TextField
            label="Buscar docente o materia"
            size="small"
            value={busqueda}
            onChange={(evento) => actualizar('buscar', evento.target.value, '')}
            sx={{ flexGrow: 1, flexBasis: 280, maxWidth: 460 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <ToggleButtonGroup
            exclusive
            size="small"
            color="primary"
            value={carrera}
            onChange={(_, valor) => valor && actualizar('carrera', valor, 'todas')}
            aria-label="Filtrar por carrera"
            sx={{ flexWrap: 'wrap' }}
          >
            <ToggleButton value="todas">Todas</ToggleButton>
            <ToggleButton value="sistemas">{CARRERAS.sistemas.nombreCorto}</ToggleButton>
            <ToggleButton value="higiene">{CARRERAS.higiene.nombreCorto}</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Typography variant="body2" role="status" sx={{ mb: 2, color: 'text.secondary' }}>
          {visibles.length === 1 ? '1 docente' : `${visibles.length} docentes`}
        </Typography>

        {visibles.length > 0 ? (
          <Box component="ul" sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, listStyle: 'none', m: 0, p: 0 }}>
            {visibles.map((docente) => (
              <TarjetaDocente key={docente.nombre} docente={docente} />
            ))}
          </Box>
        ) : (
          <Typography sx={{ py: 4, color: 'text.secondary' }}>No encontramos docentes con esa búsqueda.</Typography>
        )}
      </Seccion>

      <Seccion>
        <Box sx={{ maxWidth: 720 }}>
          <VideoYoutube {...VIDEOS.amet} />
        </Box>
      </Seccion>
    </>
  );
}
