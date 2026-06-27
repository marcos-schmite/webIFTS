import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import Hero from './components/Hero';
import Beneficios from './components/Beneficios';
import CarreraSistemas from './components/CarreraSistemas';
import CarreraHigiene from './components/CarreraHigiene';
import Docentes from './components/Docentes'; // Nuevo
import CarruselActividades from './components/CarruselActividades'; // Nuevo
import Inscripciones from './components/Inscripciones';
import Footer from './components/Footer';

export default function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header />
      <Hero />
      <Beneficios />
      <CarreraSistemas />
      <CarreraHigiene />
      <Docentes /> {/* Insertado estratégicamente antes de inscripciones */}
      <CarruselActividades /> {/* Galería institucional dinámico */}
      <Inscripciones />
      <Footer />
    </Box>
  );
}