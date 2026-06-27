import React, { useState, useEffect } from 'react';
import {
    Box, Container, Typography, Paper, Grid, Divider, List, ListItem,
    ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, CircularProgress, Button, Tooltip
} from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function CarreraHigiene() {
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [horasTotales, setHorasTotales] = useState(0);

    const SHEET_ID = '12ITJUMpBEGZ5Dj8u4abeG9Hf_EgmRDVhD7RZ75LZeVA';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

    useEffect(() => {
        fetch(csvUrl)
            .then((response) => response.text())
            .then((text) => {
                const filas = text.split('\n').map((fila) => {
                    return fila.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(celda => celda.replace(/^"|"\r?$/g, '').trim());
                });

                const encabezados = filas[0];

                const datosTransformados = filas.slice(1)
                    .map((fila) => {
                        if (fila.length < encabezados.length) return null;
                        return {
                            carrera: fila[0],
                            anio: fila[1],
                            materia: fila[2],
                            horas: fila[3],
                            horario: fila[5]
                        };
                    })
                    .filter(item => item && item.carrera.toLowerCase().includes('higiene'));

                const total = datosTransformados.reduce((acc, item) => acc + (parseInt(item.horas) || 0), 0);

                setHorasTotales(total);
                setMaterias(datosTransformados);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error cargando las materias desde Google Sheets:", error);
                setLoading(false);
            });
    }, [csvUrl]);

    return (
        <Box id="higiene" sx={{ backgroundColor: '#ffffff', py: { xs: 8, md: 10 }, borderTop: '1px solid #e2e8f0' }}>
            <Container maxWidth="lg">
                <Paper variant="outlined" sx={{ p: { xs: 4, md: 6 }, borderColor: '#e2e8f0', borderRadius: '16px', backgroundColor: '#ffffff' }}>

                    {/* Encabezado Principal de la Carrera */}
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
                                {/* Modificación: Logo en reemplazo del ícono */}
                                <Box
                                    component="img"
                                    src="https://ifts19.edu.ar/sitio/src/images/slides/logo%20ifts.png"
                                    alt="Logo IFTS 19"
                                    sx={{ 
                                        height: { xs: 32, md: 40 }, 
                                        width: 'auto', 
                                        objectFit: 'contain' 
                                    }}
                                />
                                <Typography variant="h4" sx={{ fontWeight: '800', color: '#148c14', fontSize: { xs: '24px', md: '36px' } }}>
                                    Higiene y Seguridad en el Trabajo
                                </Typography>
                            </Box>
                            
                            <Typography variant="subtitle1" sx={{ color: '#64748b', fontWeight: '600' }}>
                                Título Oficial con Validez Nacional • Plan de Cursada Optimizado
                            </Typography>
                            
                            <Typography variant="body2" sx={{ mt: 1.5, color: '#065f46', fontWeight: '700', backgroundColor: '#d1fae5', display: 'inline-block', px: 2, py: 0.5, borderRadius: '20px' }}>
                                Carga Horaria Total del Plan: {loading ? '...' : `${horasTotales} horas reloj`}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ mb: 4, borderColor: '#e2e8f0' }} />

                    {/* Bloque: Finalidad de la Carrera */}
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h6" sx={{ color: '#148c14', fontWeight: '700', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShieldIcon sx={{ fontSize: 20, color: '#10b981' }} /> Finalidad General
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.8 }}>
                            Esta tecnicatura capacita profesionales idóneos para la planificación, auditoría y control de entornos laborales seguros. Los alumnos aprenden a identificar riesgos ambientales, aplicar legislaciones laborales vigentes, diseñar planes de contingencia, evaluar la ergonomía de los puestos y mitigar riesgos e incidentes industriales de forma eficaz en organizaciones públicas o privadas.
                        </Typography>
                    </Box>

                    {/* Bloque: Perfil del Egresado y Competencias */}
                    <Grid container spacing={4} sx={{ mb: 5 }}>
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 3, backgroundColor: '#f8fafc', borderRadius: '12px', height: '100%', borderColor: '#e2e8f0' }}>
                                <Typography variant="h6" sx={{ color: '#148c14', fontWeight: '700', mb: 2 }}>
                                    Ámbito de Desempeño Profesional
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                                    El egresado podrá desempeñarse en servicios de Medicina, Higiene y Seguridad internos o externos de empresas industriales, constructoras, sector salud, hotelería y de servicios, así como realizar consultorías independientes y peritajes técnicos según el marco legal normativo.
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 3, backgroundColor: '#f8fafc', borderRadius: '12px', height: '100%', borderColor: '#e2e8f0' }}>
                                <Typography variant="h6" sx={{ color: '#148c14', fontWeight: '700', mb: 2 }}>
                                    Competencias Clave del Egresado
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                                    • Planificar y dirigir programas de prevención de riesgos laborales.<br />
                                    • Desarrollar metodologías de capacitación y concientización del personal.<br />
                                    • Controlar contaminantes ambientales, niveles de ergonomía e índices de siniestralidad.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Funciones del Técnico */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ color: '#148c14', fontWeight: '700', mb: 2 }}>
                            Funciones Principales del Técnico Superior
                        </Typography>
                        <List disablePadding>
                            <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><AssignmentTurnedInIcon sx={{ color: '#10b981', fontSize: 18 }} /></ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body2" sx={{ fontWeight: '600', color: '#148c14' }}>Auditoría e Inspección</Typography>}
                                    secondary="Supervisar las condiciones de seguridad en maquinarias, herramientas, installations e indumentaria de protección personal en ambientes de trabajo."
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0, alignItems: 'flex-start', mt: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><EngineeringIcon sx={{ color: '#10b981', fontSize: 18 }} /></ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body2" sx={{ fontWeight: '600', color: '#148c14' }}>Capacitación y Ergonomía</Typography>}
                                    secondary="Diseñar simulacros, planes de evacuación ante emergencias y dictar capacitaciones obligatorias según leyes nacionales y de la Ciudad."
                                />
                            </ListItem>
                        </List>
                    </Box>

                    {/* --- TABLA DINÁMICA CON DATA DEL GOOGLE SHEET --- */}
                    <Box sx={{ mt: 4 }}>
                        {/* Modificación: Título agrupado responsivamente junto a los botones de descarga */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                            <Typography variant="h5" sx={{ fontWeight: '700', color: '#148c14', flexGrow: 1 }}>
                                Plan de Estudios Actualizado
                            </Typography>
                            
                            {/* Botón Descargar Plan Nuevo */}
                            <Tooltip title="Descargar Plan Nuevo (HYS)" arrow>
                                <Button
                                    component="a"
                                    href="https://ifts19.edu.ar/sitio/src/download/Plan%20Nuevo%20HYS.pdf"
                                    download="Plan_Nuevo_HYS.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outlined"
                                    color="success"
                                    startIcon={<PictureAsPdfIcon />}
                                    size="small"
                                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: '600' }}
                                >
                                    Plan Nuevo
                                </Button>
                            </Tooltip>
                        </Box>

                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, gap: 2, alignItems: 'center' }}>
                                <CircularProgress size={24} sx={{ color: '#10b981' }} />
                                <Typography variant="body2" sx={{ color: '#64748b' }}>Cargando grilla desde el servidor institucional...</Typography>
                            </Box>
                        ) : (
                            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '12px', overflow: 'hidden', borderColor: '#e2e8f0' }}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#148c14' }}>
                                        <TableRow>
                                            <TableCell sx={{ color: '#ffffff', fontWeight: '700' }}>Año</TableCell>
                                            <TableCell sx={{ color: '#ffffff', fontWeight: '700' }}>Materia</TableCell>
                                            <TableCell sx={{ color: '#ffffff', fontWeight: '700' }}>Carga Horaria</TableCell>
                                            <TableCell sx={{ color: '#ffffff', fontWeight: '700' }}>Horarios Cursada</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {materias.map((item, idx) => (
                                            <TableRow
                                                key={idx}
                                                sx={{
                                                    '&:nth-of-type(odd)': { backgroundColor: '#f8fafc' },
                                                    '&:hover': { backgroundColor: '#f1f5f9' },
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                            >
                                                <TableCell sx={{ fontWeight: '600', color: '#334155', whiteSpace: 'nowrap' }}>{item.anio}</TableCell>
                                                <TableCell sx={{ fontWeight: '700', color: '#148c14' }}>{item.materia}</TableCell>
                                                <TableCell sx={{ color: '#475569' }}>{item.horas} hs</TableCell>
                                                <TableCell sx={{ color: '#10b981', fontWeight: '600', fontSize: '0.85rem' }}>{item.horario}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>

                </Paper>
            </Container>
        </Box>
    );
}