import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, CircularProgress } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';

export default function Docentes() {
    const [docentes, setDocentes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const SHEET_ID = "12ITJUMpBEGZ5Dj8u4abeG9Hf_EgmRDVhD7RZ75LZeVA";
    // Usamos el formato /export con el gid real que nos pasaste para la pestaña de Docentes
    const URL_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1614885860`;

    useEffect(() => {
        // Listado de respaldo con los datos oficiales del IFTS 19
        const docentesDeRespaldo = [
            { nombre: "Lic. Sandra Massigoge", rol: "Coordinación y Gestión Institucional", area: "Directiva" },

        ];

        fetch(URL_CSV)
            .then(res => {
                if (!res.ok) throw new Error("Error al conectar con Google Sheets");
                return res.text();
            })
            .then(csvText => {
                // Separador de líneas robusto que contempla retornos de carro
                const lineas = csvText.split(/\r?\n/);

                // Parseamos usando la misma lógica por Regex que procesa comas dentro de comillas
                const listaParseada = lineas.slice(1).map(linea => {
                    const columnas = linea.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.replace(/^"|"\r?$/g, '').trim());

                    return {
                        nombre: columnas[0], // Columna A (Nombre)
                        rol: columnas[1],    // Columna B (Rol/Materia)
                        area: columnas[2]    // Columna C (Área)
                    };
                }).filter(docente => docente.nombre && docente.rol); // Validamos que existan datos esenciales

                if (listaParseada.length > 0) {
                    setDocentes(listaParseada);
                } else {
                    setDocentes(docentesDeRespaldo);
                }
                setCargando(false);
            })
            .catch((error) => {
                console.error("Hubo un problema al traer los docentes del Sheet:", error);
                setDocentes(docentesDeRespaldo); // Fallback automático para que la interfaz nunca quede en blanco
                setCargando(false);
            });
    }, [URL_CSV]);

    return (
        <Box id="docentes" sx={{ py: { xs: 8, md: 10 }, backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="overline" sx={{ color: '#3264be', fontWeight: '800', letterSpacing: 1.5 }}>
                        Excelencia Académica
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ color: '#1e293b', fontWeight: '900', mt: 1 }}>
                        Nuestro Cuerpo Docente y Autoridades
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', maxWidth: '650px', mx: 'auto', mt: 1.5 }}>
                        Profesionales en actividad dedicados a la formación técnica superior, coordinando teoría moderna con prácticas profesionalizantes reales.
                    </Typography>
                </Box>

                {/* Feedback visual mientras descarga los datos */}
                {cargando ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                        <CircularProgress sx={{ color: '#3264be' }} />
                    </Box>
                ) : (
                    // Corregido: Removidas las propiedades antiguas de Grid para evitar advertencias de React
                    <Grid container spacing={3}>
                        {docentes.map((docente, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 20px -8px rgba(0,0,0,0.08)'
                                        }
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            backgroundColor: docente.area === 'Directiva' ? '#3264be' : (docente.area === 'Análisis de Sistemas' ? '#0f172a' : '#148c14'),
                                            width: 48,
                                            height: 48
                                        }}
                                    >
                                        {docente.area === 'Directiva' ? <SchoolIcon /> : <PersonIcon />}
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: '700', color: '#1e293b', lineHeight: 1.2 }}>
                                            {docente.nombre}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: '600', mt: 0.5, fontSize: '0.85rem' }}>
                                            {docente.rol}
                                        </Typography>

                                        {docente.area && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    display: 'inline-block',
                                                    mt: 1,
                                                    px: 1,
                                                    py: 0.2,
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '700',
                                                    backgroundColor: docente.area === 'Directiva' ? '#eff6ff' : (docente.area === 'Análisis de Sistemas' ? '#f1f5f9' : '#f0fdf4'),
                                                    color: docente.area === 'Directiva' ? '#2563eb' : (docente.area === 'Análisis de Sistemas' ? '#475569' : '#16a34a')
                                                }}
                                            >
                                                {docente.area}
                                            </Typography>
                                        )}
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}