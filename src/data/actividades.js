// Actividades de los estudiantes que se muestran en /actividades.
//
// Para sumar una actividad:
// 1. Copiá las fotos en public/actividades/<nombre-de-la-actividad>/ (JPG de unos 1280 px de ancho).
// 2. Agregá un bloque al principio de esta lista: la primera actividad es la que se ve primero.
// 3. En "carreras" poné 'sistemas', 'higiene' o las dos.
//
// IMPORTANTE: las fotos de ahora son de stock (Wikimedia Commons, CC0 o dominio público)
// y las descripciones son de ejemplo. Hay que reemplazarlas por fotos y textos reales.
export const ACTIVIDADES = [
  {
    id: 'intersec',
    titulo: 'Visitamos Intersec Buenos Aires',
    fecha: '2026',
    carreras: ['higiene'],
    descripcion:
      'Este año fuimos a Intersec, la exposición internacional de seguridad, protección contra incendios y protección personal. Recorrimos los stands y conocimos equipos y tecnologías del sector.',
    fotos: [
      { archivo: '/actividades/intersec/1.jpg', descripcion: 'Recorrida por los stands de la exposición' },
      { archivo: '/actividades/intersec/2.jpg', descripcion: 'Visitantes en los pabellones de la muestra' },
    ],
  },
  {
    id: 'hackaton',
    titulo: 'Hackatón de Análisis de Sistemas',
    fecha: '2026',
    carreras: ['sistemas'],
    descripcion:
      'Equipos de distintos años trabajaron durante toda una jornada para resolver problemas reales con software y presentaron sus prototipos.',
    fotos: [
      { archivo: '/actividades/hackaton/1.jpg', descripcion: 'Presentación de los proyectos al cierre de la jornada' },
      { archivo: '/actividades/hackaton/2.jpg', descripcion: 'Equipos trabajando en sus prototipos' },
    ],
  },
  {
    id: 'taller-rcp',
    titulo: 'Taller de RCP y primeros auxilios',
    fecha: '2026',
    carreras: ['higiene', 'sistemas'],
    descripcion:
      'Practicamos reanimación cardiopulmonar con maniquíes y repasamos cómo actuar ante una emergencia hasta que llega la ayuda profesional.',
    fotos: [
      { archivo: '/actividades/taller-rcp/1.jpg', descripcion: 'Explicación inicial con los maniquíes de práctica' },
      { archivo: '/actividades/taller-rcp/2.jpg', descripcion: 'Práctica de compresiones' },
      { archivo: '/actividades/taller-rcp/3.jpg', descripcion: 'Repaso del uso del equipo de primeros auxilios' },
    ],
  },
  {
    id: 'centro-de-datos',
    titulo: 'Visita a un centro de datos',
    fecha: '2026',
    carreras: ['sistemas'],
    descripcion:
      'Recorrimos un centro de datos para ver de cerca cómo funcionan los servidores, las redes y los sistemas de respaldo.',
    fotos: [
      { archivo: '/galeria/servidores.jpg', descripcion: 'Trabajo sobre un rack de servidores' },
      { archivo: '/galeria/redes.jpg', descripcion: 'Equipos de red y cableado' },
    ],
  },
  {
    id: 'simulacro',
    titulo: 'Simulacro de evacuación',
    fecha: '2026',
    carreras: ['higiene'],
    descripcion:
      'Estudiantes de Higiene y Seguridad planificaron y coordinaron un simulacro de evacuación, y después analizaron los tiempos y los puntos a mejorar.',
    fotos: [{ archivo: '/actividades/simulacro/1.jpg', descripcion: 'Punto de reunión después de la evacuación' }],
  },
  {
    id: 'visita-obra',
    titulo: 'Visita técnica a una obra',
    fecha: '2026',
    carreras: ['higiene'],
    descripcion:
      'Observamos en una obra en construcción cómo se aplican las normas de seguridad y cómo se usan los elementos de protección personal.',
    fotos: [{ archivo: '/actividades/visita-obra/1.jpg', descripcion: 'Trabajo con hierros y elementos de protección personal' }],
  },
];
