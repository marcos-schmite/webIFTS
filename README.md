# Sitio del IFTS N.º 19

Sitio web del Instituto de Formación Técnica Superior N.º 19 (CABA), hecho con React, Vite y Material UI.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera dist/
npm run lint
```

El sitio se publica en Netlify. La configuración está en `netlify.toml`, que incluye la redirección a `index.html` necesaria para que las direcciones internas (como `/preingreso`) funcionen al recargar. En otro hosting habría que configurar una regla equivalente.

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

Las fotos de **Actividades** se leen de la pestaña correspondiente de la planilla de Google (columna A: enlace, columna B: descripción). Si no hay filas o la planilla no responde, se muestran fotos de respaldo.

## Modo claro y oscuro

Por defecto sigue la preferencia del sistema; el botón del encabezado la cambia y queda guardada. Los colores están en `src/theme.js`.
