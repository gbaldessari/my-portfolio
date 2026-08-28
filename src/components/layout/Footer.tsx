import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTE_IDS } from '../../config/navigation';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import './layout.css';

function Footer() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>{t('footer.copyright', { year })}</p>
        <nav className="footer-links" aria-label={t('a11y.footerNav')}>
          {NAV_ROUTE_IDS.map((link) => (
            <Link key={link.id} to={paths[link.id]}>
              {t(link.key)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
