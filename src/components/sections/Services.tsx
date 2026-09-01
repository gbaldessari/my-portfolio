import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import Reveal from '../ui/Reveal';
import './sections.css';

interface ServiceItem {
  title: string;
  description: string;
  client: string;
  outcome: string;
  projectSlug: string;
}

function Services() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();
  const items = t('services.items', { returnObjects: true }) as ServiceItem[];

  return (
    <section id="servicios" className="section-anchor section-anchor--tint">
      <div className="section">
        <Reveal>
          <span className="section-label">{t('services.label')}</span>
          <h1>{t('services.title')}</h1>
          <p className="section-intro">{t('services.intro')}</p>
        </Reveal>
        <div className="services-grid">
          {items.map((service, index) => (
            <Reveal key={service.title} delay={index * 60}>
              <article className="service-card">
                <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <div className="service-case">
                  <span className="service-client">{service.client}</span>
                  <span className="service-outcome">{service.outcome}</span>
                </div>
                <Link to={paths.project(service.projectSlug)} className="service-link">
                  {t('common.viewCaseStudy')}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
