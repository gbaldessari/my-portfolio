/**
 * Interfaz que representa una habilidad.
 * @property {string} imgSrc - Ruta de la imagen que representa la habilidad.
 * @property {string} text - Nombre o descripción de la habilidad.
 * @property {string} alt - Texto alternativo para la imagen.
 */
export interface Skill {
  imgSrc: string;
  text: string;
  alt: string;
}

/**
 * Lista de habilidades que se mostrarán en el carrusel.
 * Cada habilidad incluye una imagen, un texto descriptivo y un texto alternativo.
 */
export const skills: Skill[] = [
  { imgSrc: 'assets/stack/java.png', text: 'Java', alt: 'Java' },
  { imgSrc: 'assets/stack/python.png', text: 'Python', alt: 'Python' },
  { imgSrc: 'assets/stack/javascript.png', text: 'JavaScript', alt: 'JavaScript' },
  { imgSrc: 'assets/stack/typescript.png', text: 'TypeScript', alt: 'TypeScript' },
  { imgSrc: 'assets/stack/c.png', text: 'C', alt: 'C' },
  { imgSrc: 'assets/stack/cpp.png', text: 'C++', alt: 'C++' },
  { imgSrc: 'assets/stack/csharp.png', text: 'C#', alt: 'C#' },
  { imgSrc: 'assets/stack/html.png', text: 'HTML', alt: 'HTML' },
  { imgSrc: 'assets/stack/css.png', text: 'CSS', alt: 'CSS' },
  { imgSrc: 'assets/stack/react.png', text: 'React', alt: 'React' },
  { imgSrc: 'assets/stack/react-native.png', text: 'React Native', alt: 'React Native' },
  { imgSrc: 'assets/stack/nestjs.png', text: 'NestJS', alt: 'NestJS' },
  { imgSrc: 'assets/stack/nodejs.png', text: 'Node.js', alt: 'Node.js' },
  { imgSrc: 'assets/stack/dotnet.png', text: 'Microsoft .NET', alt: 'Microsoft .NET' },
  { imgSrc: 'assets/stack/mongodb.png', text: 'MongoDB', alt: 'MongoDB' },
  { imgSrc: 'assets/stack/postgresql.png', text: 'PostgreSQL', alt: 'PostgreSQL' },
  { imgSrc: 'assets/stack/git.png', text: 'Git', alt: 'Git' },
  { imgSrc: 'assets/stack/github.png', text: 'GitHub', alt: 'GitHub' },
  { imgSrc: 'assets/stack/docker.png', text: 'Docker', alt: 'Docker' },
  { imgSrc: 'assets/stack/unity.png', text: 'Unity', alt: 'Unity' },
  { imgSrc: 'assets/stack/vercel.png', text: 'Vercel', alt: 'Vercel' },
  { imgSrc: 'assets/stack/railway.png', text: 'Railway', alt: 'Railway' },
];
