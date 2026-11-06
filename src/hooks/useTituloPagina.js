import { useEffect } from 'react';

export default function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · IFTS N.º 19` : 'IFTS N.º 19 · Educación técnica superior pública y gratuita';
  }, [titulo]);
}
