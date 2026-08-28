import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import Reveal from '../ui/Reveal';
import './sections.css';

function Hero() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();

  return (
    <section className="hero">
      <Reveal>
        <span className="hero-greeting">{t('hero.label')}</span>
        <h1 className="hero-name">{t('hero.title')}</h1>
        <p className="hero-title">{t('hero.subtitle')}</p>
        <p className="hero-description">{t('hero.description')}</p>
        <div className="hero-actions">
          <Link to={paths.projects} className="btn btn-primary">{t('common.viewProjects')}</Link>
          <Link to={paths.contact} className="btn btn-secondary">{t('common.contact')}</Link>
        </div>
      </Reveal>
    </section>
  );
}
export default Hero;
