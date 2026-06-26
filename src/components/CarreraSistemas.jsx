import React, { useState, useEffect } from 'react';
import {
    Box, Container, Typography, Paper, Grid, Divider, List, ListItem,
    ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, CircularProgress, Button, Tooltip
} from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import AssignmentRegIcon from '@mui/icons-material/AssignmentTurnedIn';
import HubIcon from '@mui/icons-material/Hub';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function CarreraSistemas() {
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
                            docente: fila[4],
                            horario: fila[5]
                        };
                    })
                    .filter(item => item && item.carrera.toLowerCase().includes('sistemas'));

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
        <Box id="sistemas" sx={{ backgroundColor: '#f8fafc', py: { xs: 8, md: 10 }, borderTop: '1px solid #e2e8f0' }}>
            <Container maxWidth="lg">
                <Paper variant="outlined" sx={{ p: { xs: 4, md: 6 }, borderColor: '#e2e8f0', borderRadius: '16px', backgroundColor: '#ffffff' }}>

                    {/* Encabezado Principal de la Carrera */}
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
                                {/* Modificación: Logo institucional en reemplazo del CodeIcon */}
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
                                    Análisis de Sistemas
                                </Typography>
                            </Box>
                            
                            <Typography variant="subtitle1" sx={{ color: '#64748b', fontWeight: '600' }}>
                                Título Oficial • Resolución Ministerial: <strong>RS-2023-6336-GCABA-MEDGC</strong> (Plan Nuevo)
                            </Typography>
                            
                            <Typography variant="body2" sx={{ mt: 1.5, color: '#3264be', fontWeight: '700', backgroundColor: '#e0f2fe', display: 'inline-block', px: 2, py: 0.5, borderRadius: '20px' }}>
                                Carga Horaria Total del Plan: {loading ? '...' : `${horasTotales} horas reloj`}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ mb: 4, borderColor: '#e2e8f0' }} />

                    {/* Bloque: Finalidad de la Carrera */}
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h6" sx={{ color: '#148c14', fontWeight: '700', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TerminalIcon sx={{ fontSize: 20, color: '#3264be' }} /> Finalidad General
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.8 }}>
                            Se plantea una formación integral que promueve en los estudiantes la construcción de herramientas intelectuales y prácticas necesarias para la operación, programación y análisis de sistemas informáticos. Se busca fortalecer la identidad profesional de los analistas y fomentar una perspectiva ética en el ejercicio de la tarea mediante una fuerte confluencia de saberes técnicos con el campo laboral real.
                        </Typography>
                    </Box>

                    {/* Bloque: Perfil del Egresado y Competencias */}
                    <Grid container spacing={4} sx={{ mb: 5 }}>
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 3, backgroundColor: '#f8fafc', borderRadius: '12px', height: '100%', borderColor: '#e2e8f0' }}>
                                <Typography variant="h6" sx={{ color: '#148c14', fontWeight: '700', mb: 2 }}>
                                    Ámbito de Desempeño
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                                    El egresado estará plenamente capacitado para desarrollar sus actividades en áreas de sistemas dentro de organizaciones de cualquier sector económico, así como en empresas dedicadas específicamente al desarrollo tecnológico y de software factory, pudiendo proveer consultoría, auditoría y diseño arquitectónico.
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 3, backgroundColor: '#f8fafc', borderRadius: '12px', height: '100%', borderColor: '#e2e8f0' }}>
                                <Typography variant="h6" sx={{ color: '#148c14', fontWeight: '700', mb: 2 }}>
                                    Rasgos Profesionales Destacados
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                                    • Capacidad de coordinación y trabajo colaborativo en equipos ágiles.<br />
                                    • Autonomía y fuerte compromiso ético con la confidencialidad de datos.<br />
                                    • Actitud de actualización permanente frente a la evolución de frameworks y lenguajes.
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
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><AssignmentRegIcon sx={{ color: '#3264be', fontSize: 18 }} /></ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body2" sx={{ fontWeight: '600', color: '#148c14' }}>Análisis de Requerimientos</Typography>}
                                    secondary="Interpretar las necesidades operativas, de información o de servicios informáticos en relación a los objetivos de una organización."
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0, alignItems: 'flex-start', mt: 1.5 }}>
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><HubIcon sx={{ color: '#3264be', fontSize: 18 }} /></ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body2" sx={{ fontWeight: '600', color: '#148c14' }}>Diseño y Desarrollo</Typography>}
                                    secondary="Diseñar, codificar, estructurar y desplegar sistemas informáticos complejos adaptados a procesos organizacionales vigentes."
                                />
                            </ListItem>
                        </List>
                    </Box>

                    {/* --- TABLA DINÁMICA CON DATA DEL GOOGLE SHEET --- */}
                    <Box sx={{ mt: 4 }}>
                        {/* Modificación: Título de la tabla con los botones de descarga integrados a la derecha */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                            <Typography variant="h5" sx={{ fontWeight: '700', color: '#148c14', flexGrow: 1 }}>
                                Plan de Estudios Actualizado
                            </Typography>
                            
                            {/* Botón Descargar Plan Nuevo */}
                            <Tooltip title="Descargar Plan Nuevo (ADS)" arrow>
                                <Button
                                    component="a"
                                    href="https://ifts19.edu.ar/sitio/src/download/Plan%20Nuevo%20ADS.pdf"
                                    download="Plan_Nuevo_ADS.pdf"
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

                            {/* Botón Descargar Plan Viejo */}
                            <Tooltip title="Descargar Plan Viejo (ADS)" arrow>
                                <Button
                                    component="a"
                                    href="https://ifts19.edu.ar/sitio/src/download/Plan%20Viejo%20ADS.pdf"
                                    download="Plan_Viejo_ADS.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outlined"
                                    color="error"
                                    startIcon={<PictureAsPdfIcon />}
                                    size="small"
                                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: '600' }}
                                >
                                    Plan Viejo
                                </Button>
                            </Tooltip>
                        </Box>

                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, gap: 2, alignItems: 'center' }}>
                                <CircularProgress size={24} sx={{ color: '#3264be' }} />
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
                                            <TableCell sx={{ color: '#ffffff', fontWeight: '700' }}>Docente</TableCell>
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
                                                <TableCell sx={{ color: '#475569', fontWeight: '500' }}>{item.docente}</TableCell>
                                                <TableCell sx={{ color: '#3264be', fontWeight: '600', fontSize: '0.85rem' }}>{item.horario}</TableCell>
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