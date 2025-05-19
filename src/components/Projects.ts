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
      'Desarrollé una aplicación web para <b>La Alpina Park</b>, una pista de motocross ubicada en La Serena, Chile, orientada a la gestión eficiente de pagos y asistencia de pilotos. El frontend fue implementado con <b>React</b> y el backend con <b>NestJS</b>, utilizando <b>MongoDB</b> como base de datos. El despliegue se realizó en <b>Vercel</b> (frontend) y <b>Railway</b> (backend y base de datos). Este proyecto representa mi primera experiencia profesional como freelancer.',
    image: 'assets/projects/LaAlpinaPark.png',
  },
];