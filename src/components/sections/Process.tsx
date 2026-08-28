import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import './sections.css';

interface ProcessStep {
  title: string;
  description: string;
}

function Process() {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true }) as ProcessStep[];

  return (
    <section id="proceso" className="section-anchor">
      <div className="section">
        <Reveal>
          <span className="section-label">{t('process.label')}</span>
          <h1>{t('process.title')}</h1>
          <p className="section-intro">{t('process.intro')}</p>
        </Reveal>
        <div className="process-list" role="list">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 50} className="process-step" >
              <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
