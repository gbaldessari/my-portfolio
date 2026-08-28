import { useLocation } from 'react-router-dom';
import { getLocaleFromPath, Locale } from '../i18n/routes';

export function useLocale(): Locale {
  const { pathname } = useLocation();
  return getLocaleFromPath(pathname);
}
