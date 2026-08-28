import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocaleFromPath, translatePath } from '../../i18n/routes';
import './language-switcher.css';

function LanguageSwitcher() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = getLocaleFromPath(pathname);

  const setLanguage = (language: 'es' | 'en') => {
    if (current === language) return;
    navigate(translatePath(pathname, language));
  };

  return (
    <div className="lang-switcher" role="group" aria-label={t('a11y.language')}>
      <button
        type="button"
        className={`lang-switcher-btn${current === 'es' ? ' active' : ''}`}
        onClick={() => setLanguage('es')}
        aria-pressed={current === 'es'}
      >
        ES
      </button>
      <button
        type="button"
        className={`lang-switcher-btn${current === 'en' ? ' active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={current === 'en'}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
