// Horarios de cursada, transcriptos del PDF oficial del cuatrimestre.
// Cada cuatrimestre hay que actualizar PERIODO_HORARIOS y DIVISIONES.
export const PERIODO_HORARIOS = '2.º cuatrimestre 2026';

export const BLOQUES = [
  { inicio: '17:50', fin: '18:30' },
  { inicio: '18:30', fin: '19:10' },
  { inicio: '19:10', fin: '19:50' },
  { inicio: '20:00', fin: '20:40' },
  { inicio: '20:40', fin: '21:20' },
  { inicio: '21:30', fin: '22:10' },
];

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// desde y hasta son posiciones dentro de BLOQUES (0 a 5), ambas inclusive.
const clase = (materia, docente, desde, hasta) => ({ materia, docente, desde, hasta });

const PP1_HYS = 'PP 1: Problemáticas del mundo laboral';
const ALMACENAMIENTO = 'Almacenamiento, manipulación y transporte de equipos, materiales e insumos';
const INCENDIOS = 'Principios de prevención de incendios';
const ECONOMIA = 'Principios de economía y costos para la higiene y seguridad';
const EPP = 'Equipos y elementos de protección personal y colectiva';
const RIESGOS = 'Análisis de riesgos y prevención de accidentes';
const ERGONOMIA = 'Ergonomía';
const PP2_HYS = 'PP 2: Factores de riesgos';
const CAPACITACION = 'Diseño y conducción de procesos de capacitación';
const COMUNICACION = 'Comunicación e informes institucionales';
const AMBIENTE = 'Ambiente de trabajo';
const COORDINACION = 'Coordinación y supervisión de equipos';
const PP4_HYS = 'PP 4: Proyecto integrador';
const REPRESENTACION = 'Tecnología de representación';
const SEMINARIO_HYS = 'Seminario de profundización técnica de higiene y seguridad';

const ALFONSO = 'Alfonso, Luciana Antonela';
const GRAY = 'Gray, Paul Marcelo';
const RAMIREZ = 'Ramirez, Cesar Marcelo';
const FERNANDEZ = 'Fernández, Leonardo Gabriel';
const MARTINEZ = 'Martinez, Jorge Gabriel';
const GALVAN = 'Galván, Dario Amador';
const IRUSTA = 'Irusta, Alejandro José';
const FRANCO = 'Franco, Victor Osvaldo';
const BARBEITO = 'Barbeito, Gustavo Ruben';
const BREZOVEC = 'Brezovec, Patricia Josefa';
const RONCORONI = 'Roncoroni, Gustavo';

export const DIVISIONES = [
  {
    id: 'hys-a',
    nombre: 'Higiene y Seguridad · División A',
    nombreCorto: 'HyS · A',
    color: 'primary',
    anios: [
      {
        anio: 1,
        dias: [
          [clase(PP1_HYS, ALFONSO, 0, 5)],
          [clase(ALMACENAMIENTO, RAMIREZ, 0, 5)],
          [clase(INCENDIOS, GRAY, 0, 4)],
          [clase(ECONOMIA, FERNANDEZ, 0, 3)],
          [clase(EPP, 'Escobar, Jorge Antonio', 0, 3)],
        ],
      },
      {
        anio: 2,
        dias: [
          [clase(RIESGOS, GRAY, 0, 4)],
          [clase(ERGONOMIA, MARTINEZ, 0, 3)],
          [clase(PP2_HYS, GALVAN, 0, 4), clase(CAPACITACION, IRUSTA, 5, 5)],
          [clase(PP2_HYS, GALVAN, 0, 2), clase(CAPACITACION, IRUSTA, 3, 5)],
          [clase(COMUNICACION, 'Caneda Sanín, Adriana', 0, 3)],
        ],
      },
      {
        anio: 3,
        dias: [
          [clase(AMBIENTE, 'Buyo, Fernando Sebastian', 0, 5)],
          [clase(COORDINACION, 'Fontan, Leandro', 0, 3)],
          [clase(PP4_HYS, FRANCO, 0, 5)],
          [clase(REPRESENTACION, 'Ricci, Hernán Pablo', 0, 3)],
          [clase(SEMINARIO_HYS, FRANCO, 0, 2), clase(PP4_HYS, FRANCO, 3, 4)],
        ],
      },
    ],
  },
  {
    id: 'hys-b',
    nombre: 'Higiene y Seguridad · División B',
    nombreCorto: 'HyS · B',
    color: 'primary',
    anios: [
      {
        anio: 1,
        dias: [
          [clase(PP1_HYS, 'Quereilhac, Gonzalo Pablo', 0, 5)],
          [clase(EPP, 'Ferraiolo, Gabriel Leandro', 0, 3)],
          [clase(ECONOMIA, FERNANDEZ, 0, 3)],
          [clase(INCENDIOS, GRAY, 0, 4)],
          [clase(ALMACENAMIENTO, RAMIREZ, 0, 5)],
        ],
      },
      {
        anio: 2,
        dias: [
          [clase(COMUNICACION, 'Del Rosal, David Juan', 0, 3)],
          [clase(RIESGOS, GRAY, 0, 4)],
          [clase(ERGONOMIA, MARTINEZ, 0, 3), clase(CAPACITACION, IRUSTA, 4, 4)],
          [clase(CAPACITACION, IRUSTA, 0, 2), clase(PP2_HYS, GALVAN, 3, 5)],
          [clase(PP2_HYS, GALVAN, 0, 4)],
        ],
      },
      {
        anio: 3,
        dias: [
          [clase(REPRESENTACION, 'Rivera Alache, Luis Alberto Vicente', 0, 3)],
          [clase(PP4_HYS, FRANCO, 0, 5)],
          [clase(COORDINACION, ALFONSO, 0, 3)],
          [clase(SEMINARIO_HYS, FRANCO, 0, 2), clase(PP4_HYS, FRANCO, 3, 4)],
          [clase(AMBIENTE, MARTINEZ, 0, 5)],
        ],
      },
    ],
  },
  {
    id: 'ads-a',
    nombre: 'Análisis de Sistemas · División A',
    nombreCorto: 'AdS · A',
    color: 'secondary',
    anios: [
      {
        anio: 1,
        dias: [
          [
            clase('Estadística y probabilidades para el análisis de sistemas', 'Hernandez Chong, Luis Rafael', 0, 4),
            clase('PP1: Aproximación al campo laboral', BREZOVEC, 5, 5),
          ],
          [clase('Modelado y diseño de software', BARBEITO, 0, 5)],
          [clase('Desarrollo de sistemas orientado a objetos', 'Fortunato, Hugo Oscar', 0, 5)],
          [clase('PP1: Aproximación al campo laboral', BREZOVEC, 0, 5)],
          [clase('Inglés', 'De Gennaro, Florencia Luciana', 0, 5)],
        ],
      },
      {
        anio: 2,
        dias: [
          [clase('Seminario de actualización en tecnología web', BARBEITO, 0, 5)],
          [
            clase('Gestión de proyectos', BREZOVEC, 0, 4),
            clase('PP3: Diseño y arquitectura de sistemas', 'Cunill, María Victoria', 5, 5),
          ],
          [
            clase('Redes y ciberseguridad', RONCORONI, 0, 2),
            clase('Trabajo, tecnología y sociedad', 'Diaz Menendez, Daniela', 3, 5),
          ],
          [clase('Redes y ciberseguridad', RONCORONI, 0, 5)],
          [clase('PP3: Diseño y arquitectura de sistemas', 'Cunill, María Victoria', 0, 5)],
        ],
      },
    ],
  },
];

// Materias que dicta una persona en el cuatrimestre publicado.
export function materiasDeDocente(nombre) {
  const materias = new Set();
  for (const division of DIVISIONES) {
    for (const { dias } of division.anios) {
      for (const clases of dias) {
        for (const c of clases) {
          if (c.docente === nombre) materias.add(c.materia);
        }
      }
    }
  }
  return [...materias];
}
