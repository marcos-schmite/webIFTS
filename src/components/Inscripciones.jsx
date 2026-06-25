import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ComputerIcon from '@mui/icons-material/Computer';

export default function Inscripciones() {
  return (
    <Box id="inscripciones" sx={{ backgroundColor: '#f8fafc', py: 8, borderTop: '1px solid #e2e8f0' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ fontWeight: '800', color: '#0f172a', mb: 1 }}>
          ¿Cómo Inscribirte?
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: '#64748b', mb: 6 }}>
          Seguí los pasos obligatorios establecidos para asegurar tu vacante en el ciclo lectivo.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%', borderRadius: '8px' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AssignmentIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: '700' }}>1. Preingreso Online</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6, mb: 3 }}>
                  Completá el formulario oficial de inscripción del Gobierno de la Ciudad de Buenos Aires a través del sistema de preinscripción habilitado.
                </Typography>
                <Button variant="outlined" href="https://guarani-autogestionagencia.bue.edu.ar/preinscripcion/DGAHPEF/" target="_blank" rel="noopener" sx={{ textTransform: 'none' }}>
                  Ir a Preinscripción CABA
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%', borderRadius: '8px' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ComputerIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: '700' }}>2. Gestión Alumnos (SIU Guaraní)</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6, mb: 3 }}>
                  Una vez admitido, toda tu regularidad, inscripciones a exámenes finales y actas de materias se gestionarán mediante la plataforma oficial SIU Guaraní.
                </Typography>
                <Button variant="outlined" href="https://guarani-autogestionagencia.bue.edu.ar/" target="_blank" rel="noopener" sx={{ textTransform: 'none' }}>
                  Acceder a SIU Guaraní
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}