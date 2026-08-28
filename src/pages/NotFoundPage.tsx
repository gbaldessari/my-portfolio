import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Reveal from '../components/ui/Reveal';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { usePageSeo } from '../hooks/usePageSeo';
import './page.css';

function NotFoundPage() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();
  usePageSeo({
    titleKey: 'meta.notFound.title',
    descriptionKey: 'meta.notFound.description',
    noindex: true,
  });

  return (
    <div className="page">
      <div className="content-container not-found">
        <Reveal>
          <span className="section-label">{t('notFound.label')}</span>
          <h1>{t('notFound.title')}</h1>
          <h2>{t('notFound.heading')}</h2>
          <p>{t('notFound.message')}</p>
          <Link to={paths.home} className="btn btn-primary">{t('notFound.back')}</Link>
        </Reveal>
      </div>
    </div>
  );
}

export default NotFoundPage;
