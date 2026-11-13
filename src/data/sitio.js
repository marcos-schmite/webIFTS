// Datos generales del sitio. Si los archivos se mudan de servidor,
// alcanza con cambiar BASE_ARCHIVOS.
const BASE_ARCHIVOS = 'https://ifts19.edu.ar/sitio/src';
const archivo = (ruta) => `${BASE_ARCHIVOS}/${encodeURI(ruta)}`;

export const INSTITUTO = {
  nombre: 'IFTS N.º 19',
  nombreCompleto: 'Instituto de Formación Técnica Superior N.º 19',
  distrito: 'D.E. 6',
  logo: archivo('images/slides/logo ifts.png'),
  video: archivo('Presenta25.mp4'),
};

export const IMAGENES = {
  sistemas: archivo('images/sistemas.jpg'),
  higiene: archivo('images/higiene-seguridad.jpg'),
  estudiantes: archivo('images/estudiantes.jpg'),
};

export const CONTACTO = {
  direccion: 'Catamarca 143, CABA',
  mapa: 'https://maps.app.goo.gl/qHbU46ruTYiLMxAP8',
  mapaEmbebido: 'https://maps.google.com/maps?q=Catamarca%20143%2C%20CABA%2C%20Argentina&z=16&output=embed',
  email: 'dfts_ifts19_de6@bue.edu.ar',
  emailInscripciones: 'inscripciones.IFTS19@gmail.com',
  emailPreingreso: 'preingreso.ifts@bue.edu.ar',
  telefono: '(011) 2085-7745',
  telefonoEnlace: 'tel:+541120857745',
  instagram: 'https://www.instagram.com/ifts_19/',
  instagramUsuario: '@ifts_19',
};

export const ENLACES = {
  siuPreinscripcion: 'https://guarani-autogestionagencia.bue.edu.ar/preinscripcion/DGAHPEF/',
  siuGuarani: 'https://guarani-autogestionagencia.bue.edu.ar/',
  aulaVirtual: 'https://aulasvirtuales.bue.edu.ar/',
  fotosColacion:
    'https://docs.google.com/forms/d/e/1FAIpQLScKxCJb1BwS1dZVfdMt0tINNJv6EUtYeBkykGnjNuGL58sVpg/viewform',
};

export const VIDEOS = {
  preinscripcion: { id: 'yElsurlbF74', titulo: 'Cómo preinscribirte a una tecnicatura superior' },
  aulaVirtual: { id: 'LJnHP_I4Vbk', titulo: 'Ingreso a las aulas virtuales (Moodle de la Ciudad)' },
  amet: { id: '3D3nWi2pYHw', titulo: 'Instituto AMET' },
};

export const ARCHIVOS = {
  horarios: archivo('calendarioaca/HORARIO20262.pdf'),
  mesasHysA: archivo('calendarioaca/MESAS DE EXÁMENES - HYSA.pdf'),
  mesasHysB: archivo('calendarioaca/MESAS DE EXÁMENES - HYSB.pdf'),
  mesasAds: archivo('calendarioaca/MESAS DE EXÁMENES - ADSA.pdf'),
  planNuevoAds: archivo('download/Plan Nuevo ADS.pdf'),
  planCierreAds: archivo('download/Plan Viejo ADS.pdf'),
  planNuevoHys: archivo('download/Plan Nuevo HYS.pdf'),
  planCierreHys: archivo('download/Plan Viejo HYS.pdf'),
  fichaIngreso: archivo('download/FICHA_DE_INSCRIPCION_2026.pdf'),
  guiaIngreso: archivo('download/Ingreso_2026.pdf'),
  solicitudTitulo: archivo('download/Solicitud_de_Título.pdf'),
};

export const CONSTANCIAS = [
  {
    id: 'regular',
    titulo: 'Constancia de alumno regular',
    higiene: archivo('Certificados/constanciash_Regular.docx'),
    sistemas: archivo('Certificados/constanciaas_Regular.docx'),
  },
  {
    id: 'parcial',
    titulo: 'Certificado de examen parcial',
    higiene: archivo('Certificados/constanciash_Parcial.docx'),
    sistemas: archivo('Certificados/constanciaas_Parcial.docx'),
  },
  {
    id: 'final',
    titulo: 'Certificado de examen final',
    higiene: archivo('Certificados/constanciash_Final.docx'),
    sistemas: archivo('Certificados/constanciaas_Final.docx'),
  },
];

export const RUTAS = {
  inicio: '/',
  oferta: '/oferta-academica',
  sistemas: '/oferta-academica/analisis-de-sistemas',
  higiene: '/oferta-academica/higiene-y-seguridad',
  preingreso: '/preingreso',
  regulares: '/alumnos/regulares',
  egresados: '/alumnos/egresados',
  calendario: '/alumnos/calendario',
  constancias: '/alumnos/constancias',
  docentes: '/docentes',
  contacto: '/contacto',
};

export const NAVEGACION = [
  { etiqueta: 'Inicio', to: RUTAS.inicio },
  {
    etiqueta: 'Oferta académica',
    items: [
      { etiqueta: 'Características de las carreras', to: RUTAS.oferta },
      { etiqueta: 'Técnico Superior en Análisis de Sistemas', to: RUTAS.sistemas },
      { etiqueta: 'Técnico Superior en Higiene y Seguridad en el Trabajo', to: RUTAS.higiene },
    ],
  },
  { etiqueta: 'Preingreso', to: RUTAS.preingreso },
  {
    etiqueta: 'Alumnos',
    items: [
      { etiqueta: 'Ingresantes', detalle: 'Fechas y pasos del preingreso', to: RUTAS.preingreso },
      { etiqueta: 'Regulares', detalle: 'Horarios de cursada', to: RUTAS.regulares },
      { etiqueta: 'Egresados', detalle: 'Trámite de título', to: RUTAS.egresados },
      { etiqueta: 'Calendario académico', detalle: 'Mesas de exámenes', to: RUTAS.calendario },
      { etiqueta: 'Constancias', detalle: 'Certificados para descargar', to: RUTAS.constancias },
    ],
  },
  {
    etiqueta: 'SIU y Aula Virtual',
    items: [
      { etiqueta: 'SIU (primer ingreso)', detalle: 'Crear usuario y preinscribirse', href: ENLACES.siuPreinscripcion },
      { etiqueta: 'SIU Guaraní', detalle: 'Autogestión de estudiantes', href: ENLACES.siuGuarani },
      { etiqueta: 'Aula Virtual', detalle: 'Campus de la Ciudad', href: ENLACES.aulaVirtual },
    ],
  },
  { etiqueta: 'Docentes', to: RUTAS.docentes },
  { etiqueta: 'Solicitudes', to: RUTAS.constancias },
  { etiqueta: 'Contacto', to: RUTAS.contacto },
];
