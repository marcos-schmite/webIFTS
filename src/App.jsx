import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { RUTAS } from './data/sitio.js';
import Inicio from './pages/Inicio.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';

// El inicio viene en el paquete principal; el resto se descarga al entrar a cada página.
const Calendario = lazy(() => import('./pages/Calendario.jsx'));
const Caracteristicas = lazy(() => import('./pages/Caracteristicas.jsx'));
const Carrera = lazy(() => import('./pages/Carrera.jsx'));
const Constancias = lazy(() => import('./pages/Constancias.jsx'));
const Contacto = lazy(() => import('./pages/Contacto.jsx'));
const Actividades = lazy(() => import('./pages/Actividades.jsx'));
const Docentes = lazy(() => import('./pages/Docentes.jsx'));
const Egresados = lazy(() => import('./pages/Egresados.jsx'));
const Preingreso = lazy(() => import('./pages/Preingreso.jsx'));
const Regulares = lazy(() => import('./pages/Regulares.jsx'));

// Las direcciones limpias necesitan la redirección a index.html de public/_redirects.
const router = createBrowserRouter([
  {
    path: RUTAS.inicio,
    element: <Layout />,
    children: [
      { index: true, element: <Inicio /> },
      { path: RUTAS.oferta, element: <Caracteristicas /> },
      { path: RUTAS.sistemas, element: <Carrera key="sistemas" id="sistemas" /> },
      { path: RUTAS.higiene, element: <Carrera key="higiene" id="higiene" /> },
      { path: RUTAS.preingreso, element: <Preingreso /> },
      { path: RUTAS.regulares, element: <Regulares /> },
      { path: RUTAS.egresados, element: <Egresados /> },
      { path: RUTAS.calendario, element: <Calendario /> },
      { path: RUTAS.constancias, element: <Constancias /> },
      { path: RUTAS.docentes, element: <Docentes /> },
      { path: RUTAS.actividades, element: <Actividades /> },
      { path: RUTAS.contacto, element: <Contacto /> },
      { path: '*', element: <NoEncontrada /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
