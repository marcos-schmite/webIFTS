import { useCallback, useState } from 'react';

// Como useState, pero recuerda el valor entre visitas.
export default function useEstadoGuardado(clave, inicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave);
      return guardado === null ? inicial : JSON.parse(guardado);
    } catch {
      return inicial;
    }
  });

  const guardar = useCallback(
    (nuevo) => {
      setValor(nuevo);
      try {
        localStorage.setItem(clave, JSON.stringify(nuevo));
      } catch {
        // Sin acceso a localStorage el valor dura solo esta visita.
      }
    },
    [clave],
  );

  return [valor, guardar];
}
