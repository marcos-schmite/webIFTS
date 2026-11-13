import { useEffect, useState } from 'react';

// Indica si un elemento está en pantalla y si ya apareció alguna vez.
export default function useEnVista(ref, margen = '0px') {
  const [estado, setEstado] = useState({ enVista: false, visto: false });

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return undefined;
    const observador = new IntersectionObserver(
      ([entrada]) =>
        setEstado((previo) => ({
          enVista: entrada.isIntersecting,
          visto: previo.visto || entrada.isIntersecting,
        })),
      { rootMargin: margen },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [ref, margen]);

  return estado;
}
