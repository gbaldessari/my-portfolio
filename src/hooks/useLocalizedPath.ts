import { getLocalizedPaths } from '../i18n/routes';
import { useLocale } from './useLocale';

export function useLocalizedPath() {
  const locale = useLocale();
  return getLocalizedPaths(locale);
}
