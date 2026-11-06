import { ARCHIVOS, IMAGENES, RUTAS } from './sitio.js';

// Crea una materia del plan: código, nombre, cuatrimestre, horas semanales,
// horas totales y, opcionalmente, correlativas y promoción directa / libre.
const m = (codigo, nombre, cuatrimestre, semanales, totales, extras = {}) => ({
  codigo,
  nombre,
  cuatrimestre,
  semanales,
  totales,
  correlativas: extras.correlativas ?? [],
  promocion: extras.promocion ?? false,
});
const PROMOCION = { promocion: true };

export const CARRERAS = {
  sistemas: {
    id: 'sistemas',
    ruta: RUTAS.sistemas,
    nombreCorto: 'Análisis de Sistemas',
    titulo: 'Técnico Superior en Análisis de Sistemas',
    color: 'secondary',
    imagen: IMAGENES.sistemas,
    imagenAlt: 'Escritorio con dos monitores que muestran código fuente',
    duracion: '2 años y medio',
    horas: 2400,
    resumen:
      'Operación, programación y análisis de sistemas informáticos, con base técnica y una mirada ética sobre el trabajo.',
    resolucion: 'RS-2023-6336-GCABA-MEDGC',
    planNuevo: ARCHIVOS.planNuevoAds,
    resolucionCierre: 'RM N.º 1148-MEGC/2007',
    planCierre: ARCHIVOS.planCierreAds,
    finalidad:
      'Busca que cada estudiante construya las herramientas teóricas y prácticas para operar, programar y analizar sistemas informáticos. A la par del saber técnico, trabaja la identidad profesional del analista, la ética en la tarea y el conocimiento del campo laboral.',
    perfil:
      'Quien egresa puede trabajar en el área de sistemas de organizaciones de cualquier sector o en empresas de desarrollo tecnológico, y aporta soluciones informáticas a través del asesoramiento, el diseño y la investigación.',
    funciones: [
      { texto: 'Relevar e interpretar qué necesita una organización en materia de operación, información y servicios informáticos.' },
      { texto: 'Recomendar, a partir de ese relevamiento, qué software conviene adquirir, de acuerdo con la normativa vigente.' },
      { texto: 'Diseñar y desarrollar sistemas informáticos.' },
      { texto: 'Poner los sistemas en marcha y adaptarlos a los procesos administrativos de la organización.' },
      { texto: 'Acompañar al personal en el uso del sistema implementado.' },
    ],
    rasgos: [
      'Equilibrar las necesidades de usuarios, organizaciones y comunidad al desarrollar y gestionar sistemas.',
      'Manejarse en distintos entornos informáticos y paquetes de software.',
      'Coordinar y trabajar en equipo.',
      'Mantenerse en actualización permanente.',
      'Actuar con autonomía y compromiso ético.',
    ],
    plan: [
      {
        anio: 1,
        titulo: 'Primer año',
        materias: [
          m('111', 'Técnicas de programación', 1, 9, 144),
          m('112', 'Elementos de análisis matemáticos', 1, 6, 96),
          m('113', 'Administración y gestión de base de datos', 1, 9, 144),
          m('114', 'Lógica computacional', 1, 6, 96, PROMOCION),
          m('121', 'Desarrollo de sistemas orientado a objetos', 2, 6, 96, { correlativas: ['111', '113', '114'] }),
          m('122', 'Estadística y probabilidades para el análisis de sistemas', 2, 5, 80, PROMOCION),
          m('123', 'Modelado y diseño de software', 2, 6, 96, { correlativas: ['111'] }),
          m('124', 'Inglés', 2, 6, 96, PROMOCION),
          m('125', 'PP1: Aproximación al campo laboral', 2, 7, 112),
        ],
      },
      {
        anio: 2,
        titulo: 'Segundo año',
        materias: [
          m('211', 'Análisis de sistemas', 1, 6, 96),
          m('212', 'Ingeniería de software', 1, 6, 96),
          m('213', 'Taller de comunicación', 1, 6, 96, PROMOCION),
          m('214', 'Diseño e implementación de pruebas de software', 1, 5, 80, { correlativas: ['121'] }),
          m('215', 'PP2: Relevamiento de requerimientos de usuario', 1, 7, 112, { correlativas: ['125'] }),
          m('221', 'Trabajo, tecnología y sociedad', 2, 3, 48, PROMOCION),
          m('222', 'Redes y ciberseguridad', 2, 9, 144),
          m('223', 'Gestión de proyectos', 2, 5, 80),
          m('224', 'Seminario de actualización en tecnología web', 2, 6, 96, { correlativas: ['121'] }),
          m('225', 'PP3: Diseño y arquitectura de sistemas', 2, 7, 112, { correlativas: ['215'] }),
        ],
      },
      {
        anio: 3,
        titulo: 'Tercer año',
        materias: [
          m('311', 'Sistemas de gestión', 1, 6, 96, { correlativas: ['113'] }),
          m('312', 'Liderazgo y gestión de equipos', 1, 6, 96, { correlativas: ['211', '212'] }),
          m('313', 'Aseguramiento de calidad de los sistemas', 1, 3, 48, { correlativas: ['214'] }),
          m('314', 'Arquitectura de sistemas en la nube', 1, 6, 96, { correlativas: ['222'] }),
          m('315', 'PP4: Proyecto integrador', 1, 9, 144, { correlativas: ['225'] }),
        ],
      },
    ],
  },

  higiene: {
    id: 'higiene',
    ruta: RUTAS.higiene,
    nombreCorto: 'Higiene y Seguridad',
    titulo: 'Técnico Superior en Higiene y Seguridad en el Trabajo',
    color: 'primary',
    imagen: IMAGENES.higiene,
    imagenAlt: 'Casco, protectores auditivos, anteojos, guantes y botas de seguridad',
    duracion: '3 años',
    horas: 2400,
    resumen:
      'Prevención de accidentes y enfermedades laborales, con herramientas para asesorar, supervisar y conducir equipos.',
    resolucion: 'RS-2023-6333-GCABA-MEDGC',
    planNuevo: ARCHIVOS.planNuevoHys,
    resolucionCierre: 'RM N.º 359/SED/2006',
    planCierre: ARCHIVOS.planCierreHys,
    finalidad:
      'Prepara para asistir en la supervisión, el asesoramiento y la conducción de equipos de trabajo, con foco en la seguridad y en la prevención de accidentes y enfermedades laborales. Combina saberes técnicos de gestión, conocimiento de los ámbitos laborales, conciencia del valor social de la seguridad y herramientas para asumir responsabilidades.',
    perfil:
      'Quien egresa acompaña a las organizaciones en la prevención: detecta riesgos, capacita a las personas y colabora con el responsable del área en el diseño de planes y en la documentación técnica.',
    funciones: [
      { texto: 'Impulsar la prevención de accidentes y enfermedades profesionales con medidas adecuadas a cada actividad.' },
      { texto: 'Detectar necesidades de capacitación y conducir capacitaciones y asistencia técnica.' },
      {
        texto: 'Asistir y asesorar a quien está a cargo del área para:',
        detalle: [
          'Diagnosticar e identificar riesgos ambientales.',
          'Analizar accidentes y enfermedades profesionales.',
          'Relevar instalaciones, equipos y herramientas.',
          'Diseñar planes de higiene y seguridad, con costos, factibilidad y presupuesto.',
          'Elaborar manuales, programas, campañas y cursos de prevención y emergencias.',
        ],
      },
      { texto: 'Producir e interpretar documentación técnica.' },
    ],
    rasgos: [
      'Conocimiento integral del campo laboral.',
      'Coordinación y trabajo en equipo.',
      'Dominio de herramientas preventivas.',
      'Autonomía, criterio propio y ética profesional.',
      'Actualización continua.',
      'Comunicación efectiva.',
      'Análisis, interpretación y producción de información.',
    ],
    plan: [
      {
        anio: 1,
        titulo: 'Primer año',
        materias: [
          m('111', 'Introducción a la higiene y seguridad en el trabajo', 1, 4, 64),
          m('112', 'Organización laboral', 1, 4, 64),
          m('113', 'Conocimiento y estudio de materiales', 1, 7, 112),
          m('114', 'Inglés técnico', 1, 5, 80, PROMOCION),
          m('115', 'Factores psicosociales y de organización', 1, 5, 80),
          m('121', 'Principios de economía y costos para la higiene y seguridad', 2, 4, 64),
          m('122', 'Equipos y elementos de protección personal y colectiva', 2, 4, 64),
          m('123', 'Almacenamiento, manipulación y transporte de equipos, materiales e insumos', 2, 6, 96, { correlativas: ['113'] }),
          m('124', 'Principios de prevención de incendios', 2, 5, 80),
          m('125', 'PP 1: Problemáticas del mundo laboral', 2, 6, 96, PROMOCION),
        ],
      },
      {
        anio: 2,
        titulo: 'Segundo año',
        materias: [
          m('211', 'Marco jurídico civil y laboral', 1, 4, 64),
          m('212', 'Estadística aplicada', 1, 4, 64),
          m('213', 'Edificación industrial e instalaciones complementarias', 1, 6, 96, { correlativas: ['123'] }),
          m('214', 'Enfermedades profesionales', 1, 6, 96, { correlativas: ['111', '115'] }),
          m('215', 'Prevención, control e investigación de incendios', 1, 5, 80, { correlativas: ['111', '124'] }),
          m('221', 'Ergonomía', 2, 4, 64, { correlativas: ['214'] }),
          m('222', 'Análisis de riesgos y prevención de accidentes', 2, 5, 80, PROMOCION),
          m('223', 'Comunicación e informes institucionales', 2, 4, 64, PROMOCION),
          m('224', 'Diseño y conducción de procesos de capacitación', 2, 4, 64, PROMOCION),
          m('225', 'PP 2: Factores de riesgos', 2, 8, 128, { correlativas: ['125'] }),
        ],
      },
      {
        anio: 3,
        titulo: 'Tercer año',
        materias: [
          m('311', 'Legislación sobre higiene y seguridad', 1, 5, 80, { correlativas: ['211'] }),
          m('312', 'Sustentabilidad y medio ambiente', 1, 6, 96),
          m('313', 'Diseño de planes de higiene y seguridad', 1, 3, 48, PROMOCION),
          m('314', 'Seminario de higiene y seguridad en el trabajo', 1, 3, 48, PROMOCION),
          m('315', 'PP 3: Plan de prevención', 1, 8, 128, { correlativas: ['225'] }),
          m('321', 'Ambiente de trabajo', 2, 6, 96, { correlativas: ['213', '222'] }),
          m('322', 'Tecnología de representación', 2, 4, 64, PROMOCION),
          m('323', 'Coordinación y supervisión de equipos', 2, 4, 64, PROMOCION),
          m('324', 'Seminario de profundización técnica de higiene y seguridad', 2, 3, 48, PROMOCION),
          m('325', 'PP 4: Proyecto integrador', 2, 8, 128, { correlativas: ['315'] }),
        ],
      },
    ],
  },
};

export const LISTA_CARRERAS = [CARRERAS.sistemas, CARRERAS.higiene];

export const CURSADA = {
  modalidad: 'Mixta: clases presenciales y virtuales',
  dias: 'Lunes a viernes',
  horario: '17:50 a 22:10 hs',
  requisito: 'Nivel medio (secundario) aprobado',
};
