import { Link as LinkRouter } from 'react-router-dom';

// Props para que un componente de MUI funcione como enlace interno o externo.
export function propsEnlace({ to, href }) {
  if (to) return { component: LinkRouter, to };
  return { component: 'a', href, target: '_blank', rel: 'noopener noreferrer' };
}
