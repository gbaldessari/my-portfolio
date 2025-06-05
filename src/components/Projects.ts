export interface Project {
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: 'La Alpina Park App',
    subtitle: 'Sistema de gestion de pagos y asistencia.',
    tags: ['React', 'NestJS', 'MongoDB', 'TypeScript', 'Vercel', 'Railway'],
    description:
      'Desarrollé una aplicación web para <b>La Alpina Park</b>, una pista de motocross ubicada en La Serena, Chile, orientada a la gestión eficiente de pagos y asistencia de pilotos. El sistema permite a los usuarios autenticarse, registrar la asistencia de los pilotos y llevar un control detallado de la participación y pagos en las actividades de la pista, todo a través de una interfaz web moderna y responsiva, especialmente adaptada para su utilización en dispositivos móviles. El frontend fue implementado con <b>React</b> y el backend con <b>NestJS</b>, utilizando <b>MongoDB</b> como base de datos. El despliegue se realizó en <b>Vercel</b> (frontend) y <b>Railway</b> (backend y base de datos). Este proyecto representa mi primera experiencia profesional como desarrollador freelance y contribuyó a optimizar la administración y contabilidad del recinto.',
    image: 'assets/projects/LaAlpinaPark.png',
  },
  {
    title: 'Catalogo Ventas Fama',
    subtitle: 'Sistema de generacion de catálogos.',
    tags: ['React', 'NestJS', 'MongoDB', 'TypeScript', 'Vercel', 'Railway'],
    description:
      'Desarrollé una aplicación web para <b>Ventas Fama</b>, una empresa distribuidora de productos localizada en Coquimbo, Chile, orientada a la gestión eficiente de productos, ofertas, categorías y generación de catálogos en PDF. El sistema permite a los usuarios autenticarse, administrar productos y categorías, gestionar ofertas, subir imágenes y generar catálogos personalizados, todo a través de una interfaz web moderna y responsiva. El frontend fue implementado con <b>React</b>, y el backend con <b>NestJS</b>, utilizando <b>MongoDB</b> como base de datos. El despliegue se realizó en <b>Vercel</b> (frontend) y <b>Railway</b> (backend y base de datos). Este proyecto contribuyó enormemente a la optimización y automatización en la generación de catálogos para la empresa.',
    image: 'assets/projects/VentasFama.png',
  }
];