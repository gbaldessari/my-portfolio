import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import Reveal from '../ui/Reveal';
import './sections.css';

function AboutTeaser() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();

  return (
    <section id="sobre-mi" className="section-anchor">
      <div className="section">
        <Reveal>
          <span className="section-label">{t('aboutTeaser.label')}</span>
          <h1>{t('aboutTeaser.title')}</h1>
          <p>{t('aboutTeaser.p1')}</p>
          <p>{t('aboutTeaser.p2')}</p>
          <p>
            <Link to={paths.about}>{t('aboutTeaser.link')}</Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutTeaser;
