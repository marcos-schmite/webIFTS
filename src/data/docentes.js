export const AUTORIDADES = [
  { cargo: 'Rectora', personas: ['Prof. Lic. Fernández, Claudia Carina'] },
  { cargo: 'Secretaria académica', personas: ['Prof. Cdora. García, Eliana Karina'] },
  { cargo: 'Secretaria administrativa', personas: ['Poncino, Noelia Gabriela'] },
  { cargo: 'Asesor pedagógico', personas: ['Nehmi, Karim'] },
  { cargo: 'Tutor', personas: ['Irusta, Alejandro'] },
  {
    cargo: 'Ayudantes de trabajos prácticos',
    personas: ['Costa Schmite, Marcos Roberto', 'Manterola, Francisco', 'Varela, Federico'],
  },
  { cargo: 'Bedeles', personas: ['Falcón, Silvia', 'García, María Paz', 'Ricci, Mariana'] },
];

const HIGIENE = [
  'Alfonso, Luciana Antonela',
  'Buyo, Fernando Sebastian',
  'Caneda Sanín, Adriana',
  'De Gennaro, Florencia Luciana',
  'Del Rosal, David Juan',
  'Escobar, Jorge Antonio',
  'Fernández, Leonardo Gabriel',
  'Ferraiolo, Gabriel Leandro',
  'Fontan, Leandro',
  'Franco, Victor Osvaldo',
  'Galván, Dario Amador',
  'Gray, Paul Marcelo',
  'Irusta, Alejandro José',
  'Martinez, Jorge Gabriel',
  'Ocampo, Monica Graciela',
  'Opazo, Magdalena',
  'Puca, Cesar Daniel',
  'Quereilhac, Gonzalo Pablo',
  'Ramirez, Cesar Marcelo',
  'Ricci, Hernán Pablo',
  'Rivera Alache, Luis Alberto Vicente',
];

const SISTEMAS = [
  'Acri, Maria Del Carmen',
  'Barbeito, Gustavo Ruben',
  'Brezovec, Patricia Josefa',
  'Cunill, María Victoria',
  'De Gennaro, Florencia Luciana',
  'Diaz Menendez, Daniela',
  'Fernández, Leonardo Gabriel',
  'Fortunato, Hugo Oscar',
  'Hernandez Chong, Luis Rafael',
  'Roncoroni, Gustavo',
  'Torres, Matías Alejo',
];

// Lista única en orden alfabético; quien da clases en ambas carreras aparece una sola vez.
export const CUERPO_DOCENTE = [...new Set([...HIGIENE, ...SISTEMAS])]
  .sort((a, b) => a.localeCompare(b, 'es'))
  .map((nombre) => ({
    nombre,
    carreras: [SISTEMAS.includes(nombre) && 'sistemas', HIGIENE.includes(nombre) && 'higiene'].filter(Boolean),
  }));
