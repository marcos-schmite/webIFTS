// Cronograma del preingreso. Al abrirse un nuevo ciclo, alcanza con actualizar
// estas fechas (AAAA-MM-DD): los estados se calculan solos con la fecha del día.
export const CICLO_INGRESO = 2026;

export const CRONOGRAMA_INGRESO = [
  { id: 'pre-1', titulo: 'Preinscripción: primer período', desde: '2025-11-01', hasta: '2025-12-15' },
  {
    id: 'curso',
    titulo: 'Curso de preingreso (optativo)',
    desde: '2025-11-24',
    hasta: '2026-03-06',
    etiqueta: 'A partir del 24 de noviembre de 2025',
  },
  { id: 'pre-2', titulo: 'Preinscripción: segundo período', desde: '2026-02-01', hasta: '2026-03-04' },
  { id: 'examen', titulo: 'Examen de ingreso (obligatorio)', desde: '2026-02-18', hasta: '2026-03-06' },
  { id: 'vacantes', titulo: 'Confirmación de vacantes', desde: '2026-03-09', hasta: '2026-03-13' },
];

export function fechaDeHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

export function estadoDeEtapa({ desde, hasta }, hoy = fechaDeHoy()) {
  if (hoy < desde) return 'proxima';
  if (hoy > hasta) return 'finalizada';
  return 'abierta';
}

export function formatearFecha(iso) {
  const [anio, mes, dia] = iso.split('-').map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
