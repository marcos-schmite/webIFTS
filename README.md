# Sitio del IFTS N.º 19

Sitio web del Instituto de Formación Técnica Superior N.º 19 (CABA), hecho con React, Vite y Material UI.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera dist/
npm run lint
```

El sitio se publica en Netlify. La configuración de build está en `netlify.toml`. `public/_redirects` envía todas las rutas a `index.html`, para que las direcciones internas (como `/preingreso`) funcionen al recargar. En otro hosting habría que configurar una regla equivalente.

## Dónde actualizar el contenido

Todo el contenido está en `src/data/`:

| Qué cambia | Archivo |
| --- | --- |
| Horarios de cada cuatrimestre (`PERIODO_HORARIOS` y `DIVISIONES`) | `horarios.js` |
| Fechas del preingreso (los estados se calculan solos) | `ingreso.js` |
| Autoridades y docentes | `docentes.js` |
| Plan de estudios y textos de las carreras | `carreras.js` |
| Contacto, enlaces, PDF, constancias y menú | `sitio.js` |

Las mesas de exámenes y los horarios en PDF se leen del servidor actual (`BASE_ARCHIVOS` en `sitio.js`). Si se reemplaza un PDF manteniendo el nombre, el sitio lo muestra sin cambios; si cambia el nombre, hay que actualizar `ARCHIVOS`. Si el servidor se da de baja, hay que mover los archivos y cambiar `BASE_ARCHIVOS`.

Las fotos de la **Galería** del inicio están en `public/galeria/` y sus descripciones en `src/data/galeria.js`. Son fotos de stock con licencia CC0 o de dominio público.

## Cómo sumar fotos de actividades

La página **Actividades** (`/actividades`) muestra las salidas, talleres y proyectos de los estudiantes.

1. Copiá las fotos en `public/actividades/<nombre-de-la-actividad>/`. Conviene que sean JPG de unos 1280 px de ancho, para que carguen rápido.
2. En `src/data/actividades.js`, agregá un bloque al principio de la lista con el título, la fecha, la carrera, una descripción breve y la lista de fotos.
3. Subí los cambios a `main`: Netlify publica solo.

Las fotos y descripciones actuales son de ejemplo y hay que reemplazarlas.

Para mostrar el logo de AMET en el inicio, copiá el archivo en `public/` y poné su ruta en `AMET.logo`, en `src/data/sitio.js`.

## Modo claro y oscuro

Por defecto sigue la preferencia del sistema; el botón del encabezado la cambia y queda guardada. Los colores están en `src/theme.js`.
