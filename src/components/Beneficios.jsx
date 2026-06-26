import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const items = [
  { 
    icon: <VerifiedIcon sx={{ color: '#3264be', fontSize: 32 }} />, 
    title: "Título Oficial", 
    desc: "Títulos técnicos superiores con validez nacional, emitidos formalmente por el Ministerio de Educación del GCABA." 
  },
  { 
    icon: <AccessTimeIcon sx={{ color: '#3264be', fontSize: 32 }} />, 
    title: "Carreras Cortas", 
    desc: "Planes de estudio ágiles de solo 3 años de duración, diseñados para optimizar tus tiempos de cursada." 
  },
  { 
    icon: <BusinessCenterIcon sx={{ color: '#3264be', fontSize: 32 }} />, 
    title: "Rápida Inserción Laboral", 
    desc: "Formación de perfil eminentemente práctico, enfocada de forma directa en las competencias más demandadas por el mercado laboral." 
  },
  { 
    icon: <AccountBalanceIcon sx={{ color: '#3264be', fontSize: 32 }} />, 
    title: "Convenios Universitarios", 
    desc: "Articulación y acuerdos institucionales con universidades públicas y privadas para continuar tus estudios de grado." 
  }
];

export default function Beneficios() {
  return (
    <Box sx={{ backgroundColor: '#ffffff', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        
        {/* Encabezado de la Sección */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: '#3264be', fontWeight: 'bold', letterSpacing: 1.2 }}>
            Ventajas Institucionales
          </Typography>
          <Typography variant="h4" component="h2" sx={{ color: '#148c14', fontWeight: '800', mt: 1 }}>
            ¿Por qué estudiar en el IFTS 19?
          </Typography>
        </Box>

        {/* --- CUADRÍCULA DIRECTA CON DISPLAY GRID --- */}
        <Box 
          sx={{ 
            display: 'grid', 
            // Esto define de manera estricta: 1 columna en celular, 2 columnas desde tablets/notebooks en adelante
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
            gap: 4, // El espacio entre tarjetas
            alignItems: 'stretch'
          }}
        >
          {items.map((item, i) => (
            <Paper 
              key={i}
              variant="outlined" 
              sx={{ 
                p: 4, 
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                borderColor: '#e2e8f0', 
                backgroundColor: '#ffffff', 
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#3264be',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: '700', color: '#148c14' }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                {item.desc}
              </Typography>
            </Paper>
          ))}
        </Box>

      </Container>
    </Box>
  );
}