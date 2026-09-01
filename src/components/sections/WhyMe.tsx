import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import './sections.css';

interface WhyItem {
  title: string;
  description: string;
}

function WhyMe() {
  const { t } = useTranslation();
  const items = t('whyMe.items', { returnObjects: true }) as WhyItem[];

  return (
    <section id="por-que" className="section-anchor section-anchor--tint">
      <div className="section">
        <Reveal>
          <span className="section-label">{t('whyMe.label')}</span>
          <h1>{t('whyMe.title')}</h1>
        </Reveal>
        <div className="why-grid">
          {items.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 60}>
              <article className="why-card">
                <h2>{reason.title}</h2>
                <p>{reason.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyMe;
