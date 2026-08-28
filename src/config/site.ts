const configuredUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '');

export const SITE_NAME = 'Giacomo Baldessari';
export const DEFAULT_OG_IMAGE = '/assets/projects/LaAlpinaPark.png';

export function getSiteOrigin(): string {
  if (configuredUrl) return configuredUrl;
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

export function toAbsoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  if (!origin) return path;
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}
