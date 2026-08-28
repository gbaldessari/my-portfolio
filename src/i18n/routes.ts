export type Locale = 'es' | 'en';

export type RouteName = 'home' | 'projects' | 'project' | 'about' | 'contact' | 'notFound';

export interface RouteMatch {
  name: RouteName;
  locale: Locale;
  slug?: string;
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname || '/';
}

export function matchRoute(pathname: string): RouteMatch {
  const path = normalizePath(pathname);

  if (path === '/en') return { name: 'home', locale: 'en' };
  if (path === '/en/projects') return { name: 'projects', locale: 'en' };
  if (path === '/en/about') return { name: 'about', locale: 'en' };
  if (path === '/en/contact') return { name: 'contact', locale: 'en' };
  if (path === '/en/404') return { name: 'notFound', locale: 'en' };

  const enProject = path.match(/^\/en\/projects\/([^/]+)$/);
  if (enProject) return { name: 'project', locale: 'en', slug: enProject[1] };

  if (path === '/') return { name: 'home', locale: 'es' };
  if (path === '/proyectos') return { name: 'projects', locale: 'es' };
  if (path === '/sobre-mi') return { name: 'about', locale: 'es' };
  if (path === '/contacto') return { name: 'contact', locale: 'es' };
  if (path === '/404') return { name: 'notFound', locale: 'es' };

  const esProject = path.match(/^\/proyectos\/([^/]+)$/);
  if (esProject) return { name: 'project', locale: 'es', slug: esProject[1] };

  return { name: 'notFound', locale: getLocaleFromPath(path) };
}

export function buildPath(locale: Locale, route: RouteName, slug?: string): string {
  switch (route) {
    case 'home':
      return locale === 'en' ? '/en' : '/';
    case 'projects':
      return locale === 'en' ? '/en/projects' : '/proyectos';
    case 'project':
      return locale === 'en' ? `/en/projects/${slug}` : `/proyectos/${slug}`;
    case 'about':
      return locale === 'en' ? '/en/about' : '/sobre-mi';
    case 'contact':
      return locale === 'en' ? '/en/contact' : '/contacto';
    case 'notFound':
      return locale === 'en' ? '/en/404' : '/404';
  }
}

export function translatePath(pathname: string, targetLocale: Locale): string {
  const match = matchRoute(pathname);
  if (match.name === 'project' && match.slug) {
    return buildPath(targetLocale, 'project', match.slug);
  }
  return buildPath(targetLocale, match.name);
}

export type LocalizedPaths = {
  home: string;
  projects: string;
  project: (slug: string) => string;
  about: string;
  contact: string;
  notFound: string;
};

export function getLocalizedPaths(locale: Locale): LocalizedPaths {
  return {
    home: buildPath(locale, 'home'),
    projects: buildPath(locale, 'projects'),
    project: (slug: string) => buildPath(locale, 'project', slug),
    about: buildPath(locale, 'about'),
    contact: buildPath(locale, 'contact'),
    notFound: buildPath(locale, 'notFound'),
  };
}
