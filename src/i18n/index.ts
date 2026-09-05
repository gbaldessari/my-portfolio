import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import {
  getInitialLanguage,
  languageMatches,
  LOCALE_STORAGE_KEY,
  shouldRedirectHomeToEnglish,
} from './localePreference';

const initialLanguage = getInitialLanguage();
document.documentElement.lang = initialLanguage;
localStorage.setItem(LOCALE_STORAGE_KEY, initialLanguage);

i18n.on('languageChanged', (language) => {
  const next = languageMatches(language, 'en') ? 'en' : 'es';
  if (next === 'es' && shouldRedirectHomeToEnglish(window.location.pathname)) {
    return;
  }

  localStorage.setItem(LOCALE_STORAGE_KEY, next);
  document.documentElement.lang = next;
});

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
