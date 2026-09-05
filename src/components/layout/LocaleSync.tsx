import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocaleFromPath } from '../../i18n/routes';
import { languageMatches, shouldRedirectHomeToEnglish } from '../../i18n/localePreference';

function LocaleSync() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const language = i18n.language;

  useLayoutEffect(() => {
    if (shouldRedirectHomeToEnglish(pathname)) {
      if (!languageMatches(language, 'en')) {
        void i18n.changeLanguage('en');
      }
      navigate(`/en${search}${hash}`, { replace: true });
      return;
    }

    const locale = getLocaleFromPath(pathname);
    if (!languageMatches(language, locale)) {
      void i18n.changeLanguage(locale);
    }
  }, [pathname, search, hash, language, i18n, navigate]);

  return null;
}

export default LocaleSync;
