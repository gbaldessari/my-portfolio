export type ProjectStatusKey = 'completed' | 'in_progress';
export type ProjectCategoryKey = 'operations' | 'commercial' | 'leads' | 'geo';

export interface ProjectMeta {
  slug: string;
  tags: string[];
  cover: string;
  status: ProjectStatusKey;
  category: ProjectCategoryKey[];
}

export const projectMeta: ProjectMeta[] = [
  {
    slug: 'la-alpina-park',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Vercel', 'Railway'],
    cover: '/assets/projects/LaAlpinaPark.png',
    status: 'completed',
    category: ['operations'],
  },
  {
    slug: 'ventas-fama',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'OpenStreetMap', 'WhatsApp API', 'Resend'],
    cover: '/assets/projects/VentasFama.png',
    status: 'completed',
    category: ['commercial', 'geo'],
  },
  {
    slug: 'laguna-roja',
    tags: ['NestJS', 'TypeScript', 'Make', 'Kommo', 'Odoo', 'N8N', 'Evolution API', 'OpenAI', 'Google Calendar', 'Hostinger', 'Railway'],
    cover: '/assets/projects/LagunaRoja.png',
    status: 'in_progress',
    category: ['leads'],
  },
  {
    slug: 'acamu',
    tags: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Vercel', 'Railway'],
    cover: '/assets/projects/ACAMU.png',
    status: 'completed',
    category: ['commercial'],
  },
  {
    slug: 'gp-performance',
    tags: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Vercel', 'Railway'],
    cover: '/assets/projects/GPPerformance.png',
    status: 'completed',
    category: ['operations'],
  },
  {
    slug: 'uoct',
    tags: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'PostGIS', 'OpenStreetMap', 'WebSockets', 'Waze', 'Docker', 'Jenkins'],
    cover: '/assets/projects/UOCT.png',
    status: 'completed',
    category: ['geo'],
  },
];
