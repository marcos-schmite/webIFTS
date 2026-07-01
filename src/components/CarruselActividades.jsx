import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Función auxiliar para transformar enlaces de Drive a enlaces web directos
const convertirLinkDrive = (url) => {
    if (!url) return '';
    
    if (url.includes('drive.google.com')) {
        const regex = /(?:https?:\/\/)?(?:drive\.google\.com\/)(?:file\/d\/|open\?id=)([^/\?#&]+)/;
        const match = url.match(regex);
        
        if (match && match[1]) {
            const id = match[1];
            // Este endpoint suele saltarse el 403 Forbidden de manera excelente en webs
            return `https://lh3.googleusercontent.com/d/${id}`;
        }
    }
    return url;
};
export default function CarruselActividades() {
    const [imagenes, setImagenes] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [cargando, setCargando] = useState(true);

    const SHEET_ID = '12ITJUMpBEGZ5Dj8u4abeG9Hf_EgmRDVhD7RZ75LZeVA';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1126888506`;

    useEffect(() => {
        const fotosPorDefecto = [
            { url: "https://ifts19.edu.ar/sitio/src/images/slides/slide1.jpg", titulo: "Prácticas de Redes" },
            { url: "https://ifts19.edu.ar/sitio/src/images/slides/slide2.jpg", titulo: "Simulacros de Evacuación e Higiene" },
            { url: "https://ifts19.edu.ar/sitio/src/images/slides/slide3.jpg", titulo: "Clases de Programación" }
        ];

        fetch(csvUrl)
            .then((response) => {
                if (!response.ok) throw new Error("Error en la descarga");
                return response.text();
            })
            .then((text) => {
                const filas = text.split('\n').map((fila) => {
                    return fila.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(celda => celda.replace(/^"|"\r?$/g, '').trim());
                });

                const datosTransformados = filas.slice(1)
                    .map((fila) => {
                        if (!fila[0]) return null;

                        // IMPORTANTE: Convertimos la URL aquí mismo antes de guardarla en el estado
                        const urlConvertida = convertirLinkDrive(fila[0]);

                        return {
                            url: urlConvertida, // Columna A (ya procesada)
                            titulo: fila[1]     // Columna B
                        };
                    })
                    .filter(item => item && item.url.startsWith('http'));

                if (datosTransformados.length > 0) {
                    setImagenes(datosTransformados);
                } else {
                    setImagenes(fotosPorDefecto);
                }
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error cargando las imágenes desde Google Sheets:", error);
                setImagenes(fotosPorDefecto);
                setCargando(false);
            });
    }, [csvUrl]);

    const anteriorFoto = () => {
        setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
    };

    const siguienteFoto = () => {
        setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
    };

    if (imagenes.length === 0 && !cargando) return null;

    return (
        <Box id="actividades" sx={{ py: { xs: 8, md: 10 }, backgroundColor: '#ffffff' }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="overline" sx={{ color: '#148c14', fontWeight: '800', letterSpacing: 1.5 }}>
                        Comunidad y Eventos
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ color: '#1e293b', fontWeight: '900', mt: 1 }}>
                        Actividades de Nuestro Instituto
                    </Typography>
                </Box>

                {cargando ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <CircularProgress sx={{ color: '#148c14' }} />
                    </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: { xs: '260px', sm: '420px', md: '480px' },
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                                backgroundColor: '#0f172a'
                            }}
                        >
                            <Box
                                component="img"
                                src={imagenes[indiceActual].url}
                                alt={imagenes[indiceActual].titulo || "Actividad Escolar"}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'all 0.5s ease-in-out'
                                }}
                            />

                            {imagenes[indiceActual].titulo && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0, left: 0, right: 0,
                                        backgroundColor: 'rgba(15, 23, 42, 0.75)',
                                        backdropFilter: 'blur(4px)',
                                        color: '#ffffff',
                                        p: 2,
                                        textAlign: 'center'
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                                        {imagenes[indiceActual].titulo}
                                    </Typography>
                                </Box>
                            )}

                            <IconButton
                                onClick={anteriorFoto}
                                sx={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255,255,255,0.4)' } }}
                            >
                                <ArrowBackIosNewIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                onClick={siguienteFoto}
                                sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255,255,255,0.4)' } }}
                            >
                                <ArrowForwardIosIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                            {imagenes.map((_, idx) => (
                                <Box
                                    key={idx}
                                    onClick={() => setIndiceActual(idx)}
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: idx === indiceActual ? '#148c14' : '#cbd5e1',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s'
                                    }}
                                />
                            ))}
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
}