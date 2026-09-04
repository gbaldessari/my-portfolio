export type NavRouteId = 'home' | 'projects' | 'about' | 'contact';

export const NAV_ROUTE_IDS: { id: NavRouteId; key: string; end?: boolean }[] = [
  { id: 'home', key: 'nav.home', end: true },
  { id: 'projects', key: 'nav.projects' },
  { id: 'about', key: 'nav.about' },
  { id: 'contact', key: 'nav.contact' },
];

export const CV_PATH = '/documents/Giacomo_Baldessari_CV.pdf';
