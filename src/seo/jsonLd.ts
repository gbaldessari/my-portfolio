import { DEFAULT_OG_IMAGE, getSiteOrigin, toAbsoluteUrl } from '../config/site';

export function createPersonSchema() {
  const origin = getSiteOrigin();

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Giacomo Baldessari',
    jobTitle: 'Full Stack Developer',
    url: origin || undefined,
    email: 'mailto:giacomo.baldessari11@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'La Serena',
      addressCountry: 'CL',
    },
    sameAs: [
      'https://www.linkedin.com/in/giacomo-baldessari/',
      'https://github.com/gbaldessari',
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'NestJS',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'Docker',
    ],
  };
}

export function createWebSiteSchema() {
  const origin = getSiteOrigin();
  if (!origin) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Giacomo Baldessari',
    url: origin,
    inLanguage: ['es-CL', 'en'],
    author: {
      '@type': 'Person',
      name: 'Giacomo Baldessari',
    },
  };
}

export function createProjectSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  technologies?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image ? toAbsoluteUrl(input.image) : toAbsoluteUrl(DEFAULT_OG_IMAGE),
    author: {
      '@type': 'Person',
      name: 'Giacomo Baldessari',
    },
    ...(input.technologies?.length
      ? { keywords: input.technologies.join(', ') }
      : {}),
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
