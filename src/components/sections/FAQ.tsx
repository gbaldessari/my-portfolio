import { useTranslation } from 'react-i18next';
import FAQAccordion from '../ui/FAQAccordion';
import Reveal from '../ui/Reveal';
import './sections.css';

interface FAQItem {
  question: string;
  answer: string;
}

function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as FAQItem[];

  return (
    <section id="faq" className="section-anchor faq-section">
      <div className="section">
        <Reveal>
          <span className="section-label">{t('faq.label')}</span>
          <h1>{t('faq.title')}</h1>
        </Reveal>
        <Reveal delay={80}>
          <FAQAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}

export default FAQ;
