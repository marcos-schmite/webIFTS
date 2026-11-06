import { useEffect, useState } from 'react';
import { PLANILLA } from '../data/sitio.js';

// Admite comas, comillas dobles y saltos de línea dentro de celdas entrecomilladas.
export function parsearCsv(texto) {
  const filas = [];
  let fila = [];
  let celda = '';
  let enComillas = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (enComillas) {
      if (c === '"' && texto[i + 1] === '"') {
        celda += '"';
        i++;
      } else if (c === '"') {
        enComillas = false;
      } else {
        celda += c;
      }
    } else if (c === '"') {
      enComillas = true;
    } else if (c === ',') {
      fila.push(celda.trim());
      celda = '';
    } else if (c === '\n') {
      fila.push(celda.trim());
      filas.push(fila);
      fila = [];
      celda = '';
    } else if (c !== '\r') {
      celda += c;
    }
  }
  if (celda || fila.length) {
    fila.push(celda.trim());
    filas.push(fila);
  }
  return filas;
}

// Lee una pestaña de la planilla de Google y devuelve sus filas sin el encabezado.
export default function useSheetCsv(gid) {
  const [estado, setEstado] = useState({ filas: [], cargando: true, error: false });

  useEffect(() => {
    const control = new AbortController();
    const url = `https://docs.google.com/spreadsheets/d/${PLANILLA.id}/export?format=csv&gid=${gid}`;

    fetch(url, { signal: control.signal })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`Planilla: HTTP ${respuesta.status}`);
        return respuesta.text();
      })
      .then((texto) => setEstado({ filas: parsearCsv(texto).slice(1), cargando: false, error: false }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error('No se pudo leer la planilla de Google:', error);
        setEstado({ filas: [], cargando: false, error: true });
      });

    return () => control.abort();
  }, [gid]);

  return estado;
}
