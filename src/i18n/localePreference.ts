export const LOCALE_STORAGE_KEY = 'portfolio-lang';

const CRAWLER_UA =
  /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot|embedly|pinterest|slackbot|discordbot|whatsapp|telegrambot/i;

export function isCrawler(): boolean {
  return CRAWLER_UA.test(navigator.userAgent);
}

export function getPreferredLanguage(): 'es' | 'en' {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'es' || stored === 'en') return stored;
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function getInitialLanguage(): 'es' | 'en' {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  if (path !== '/') return 'es';
  if (isCrawler()) return 'es';
  return getPreferredLanguage();
}

export function shouldRedirectHomeToEnglish(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path !== '/') return false;
  if (isCrawler()) return false;
  return getPreferredLanguage() === 'en';
}

export function languageMatches(current: string, locale: 'es' | 'en'): boolean {
  return current === locale || current.startsWith(`${locale}-`);
}

export function redirectHomeToEnglishIfNeeded(): boolean {
  if (!shouldRedirectHomeToEnglish(window.location.pathname)) return false;
  const target = `/en${window.location.search}${window.location.hash}`;
  window.location.replace(target);
  return true;
}
