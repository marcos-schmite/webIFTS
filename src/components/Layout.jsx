import { Suspense, useEffect, useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function Layout() {
  const { pathname } = useLocation();
  const principal = useRef(null);
  const primeraCarga = useRef(true);

  // Al cambiar de página: volver arriba y llevar el foco al contenido nuevo.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    principal.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Box
        component="button"
        type="button"
        onClick={() => principal.current?.focus()}
        sx={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 2000,
          px: 2,
          py: 1,
          border: 0,
          borderRadius: 1,
          font: 'inherit',
          fontWeight: 700,
          cursor: 'pointer',
          bgcolor: 'background.paper',
          color: 'text.primary',
          transform: 'translateY(-200%)',
          '&:focus-visible': { transform: 'none' },
        }}
      >
        Saltar al contenido
      </Box>
      <Header />
      <Box component="main" ref={principal} tabIndex={-1} sx={{ flexGrow: 1, outline: 'none' }}>
        <Suspense
          fallback={
            <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
              <CircularProgress aria-label="Cargando página" />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
}
