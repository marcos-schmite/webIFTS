import { ACTIVIDADES } from './actividades.js';
import { LISTA_CARRERAS } from './carreras.js';
import { AUTORIDADES, CUERPO_DOCENTE } from './docentes.js';
import { ARCHIVOS, CONSTANCIAS, ENLACES, RUTAS } from './sitio.js';

export const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

const PAGINAS = [
  { titulo: 'Inicio', to: RUTAS.inicio },
  { titulo: 'Características de las carreras', detalle: 'Modalidad, días, horario y requisitos', to: RUTAS.oferta },
  { titulo: 'Preingreso e ingresantes', detalle: 'Fechas, pasos, ficha y examen', to: RUTAS.preingreso },
  { titulo: 'Horarios de cursada', detalle: 'Alumnos regulares, por división y año', to: RUTAS.regulares },
  { titulo: 'Egresados', detalle: 'Trámite de título y acto de colación', to: RUTAS.egresados },
  { titulo: 'Calendario académico', detalle: 'Mesas de exámenes, finales', to: RUTAS.calendario },
  { titulo: 'Constancias y solicitudes', detalle: 'Certificados para descargar', to: RUTAS.constancias },
  { titulo: 'Docentes y autoridades', detalle: 'Cuerpo docente, rectoría, bedelía', to: RUTAS.docentes },
  { titulo: 'Actividades', detalle: 'Fotos de salidas, talleres y proyectos de los estudiantes', to: RUTAS.actividades },
  { titulo: 'Contacto', detalle: 'Dirección, correo, teléfono e Instagram', to: RUTAS.contacto },
];

const ENLACES_EXTERNOS = [
  { titulo: 'SIU (primer ingreso)', detalle: 'Crear usuario y preinscribirse', href: ENLACES.siuPreinscripcion },
  { titulo: 'SIU Guaraní', detalle: 'Autogestión de estudiantes', href: ENLACES.siuGuarani },
  { titulo: 'Aula Virtual', detalle: 'Campus de la Ciudad', href: ENLACES.aulaVirtual },
];

const DOCUMENTOS = [
  { titulo: 'Horarios del cuatrimestre (PDF)', href: ARCHIVOS.horarios },
  { titulo: 'Mesas de exámenes: Higiene y Seguridad, División A (PDF)', href: ARCHIVOS.mesasHysA },
  { titulo: 'Mesas de exámenes: Higiene y Seguridad, División B (PDF)', href: ARCHIVOS.mesasHysB },
  { titulo: 'Mesas de exámenes: Análisis de Sistemas (PDF)', href: ARCHIVOS.mesasAds },
  { titulo: 'Ficha de ingreso (PDF)', href: ARCHIVOS.fichaIngreso },
  { titulo: 'Guía para ingresantes (PDF)', href: ARCHIVOS.guiaIngreso },
  { titulo: 'Solicitud de título (PDF)', href: ARCHIVOS.solicitudTitulo },
  ...LISTA_CARRERAS.flatMap((c) => [
    { titulo: `Plan de estudios nuevo: ${c.nombreCorto} (PDF)`, href: c.planNuevo },
    { titulo: `Plan de estudios de cierre: ${c.nombreCorto} (PDF)`, href: c.planCierre },
  ]),
  ...CONSTANCIAS.flatMap((c) =>
    LISTA_CARRERAS.map((carrera) => ({
      titulo: `${c.titulo}: ${carrera.nombreCorto} (Word)`,
      href: c[carrera.id],
    })),
  ),
];

const CARRERAS = LISTA_CARRERAS.map((c) => ({ titulo: c.titulo, detalle: c.resumen, to: c.ruta }));

const MATERIAS = LISTA_CARRERAS.flatMap((c) =>
  c.plan.flatMap(({ titulo, materias }) =>
    materias.map((materia) => ({
      titulo: materia.nombre,
      detalle: `${c.nombreCorto} · ${titulo} · código ${materia.codigo}`,
      to: c.ruta,
    })),
  ),
);

const PERSONAS = [
  ...AUTORIDADES.flatMap(({ cargo, personas }) =>
    personas.map((nombre) => ({ titulo: nombre, detalle: cargo, to: RUTAS.docentes })),
  ),
  ...CUERPO_DOCENTE.map(({ nombre }) => ({
    titulo: nombre,
    detalle: 'Cuerpo docente',
    to: `${RUTAS.docentes}?buscar=${encodeURIComponent(nombre)}`,
  })),
];

const SALIDAS_Y_TALLERES = ACTIVIDADES.map((a) => ({ titulo: a.titulo, detalle: a.descripcion, to: RUTAS.actividades }));

const conTipo = (tipo, lista) => lista.map((item) => ({ ...item, tipo }));

export const INDICE_BUSQUEDA = [
  ...conTipo('Página', PAGINAS),
  ...conTipo('Carrera', CARRERAS),
  ...conTipo('Enlace', ENLACES_EXTERNOS),
  ...conTipo('Documento', DOCUMENTOS),
  ...conTipo('Materia', MATERIAS),
  ...conTipo('Persona', PERSONAS),
  ...conTipo('Actividad', SALIDAS_Y_TALLERES),
].map((item) => ({
  ...item,
  clave: item.to ?? item.href,
  texto: normalizar(`${item.titulo} ${item.detalle ?? ''} ${item.tipo}`),
}));

export const SUGERENCIAS = INDICE_BUSQUEDA.filter((item) =>
  [RUTAS.regulares, RUTAS.calendario, RUTAS.preingreso, RUTAS.constancias, ENLACES.siuGuarani, ENLACES.aulaVirtual].includes(item.clave),
);

export function buscar(consulta) {
  const terminos = normalizar(consulta).split(/\s+/).filter(Boolean);
  if (terminos.length === 0) return SUGERENCIAS;
  return INDICE_BUSQUEDA.filter((item) => terminos.every((t) => item.texto.includes(t))).slice(0, 30);
}
