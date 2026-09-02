import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import WhatsAppLink from '../WhatsAppLink';
import Reveal from '../ui/Reveal';
import './sections.css';

function HeroTitle() {
  const { t } = useTranslation();

  const segments = [
    { text: t('hero.titleBefore').trim(), accent: false },
    { text: t('hero.titleAccent1').trim(), accent: true },
    { text: t('hero.titleMiddle').trim(), accent: false },
    { text: t('hero.titleAccent2').trim(), accent: true },
  ];

  const words = segments.flatMap((segment) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, accent: segment.accent })),
  );

  const label = segments.map((segment) => segment.text).join(' ');

  return (
    <h1 className="hero-name" aria-label={label}>
      {words.map((word, index) => (
        <span key={`${word.text}-${index}`}>
          <span
            className={`hero-word${word.accent ? ' hero-word--accent' : ''}`}
            style={{ ['--word-delay' as string]: `${140 + index * 68}ms` }}
          >
            {word.text}
          </span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h1>
  );
}

function Hero() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();

  return (
    <section className="hero">
      <Reveal>
        <span className="hero-greeting">{t('hero.label')}</span>
        <HeroTitle />
        <p className="hero-title">{t('hero.subtitle')}</p>
        <p className="hero-description">{t('hero.description')}</p>
        <div className="hero-actions">
          <WhatsAppLink className="btn btn-whatsapp">
            <FaWhatsapp aria-hidden="true" />
            {t('common.contactWhatsApp')}
          </WhatsAppLink>
          <Link to={paths.projects} className="btn btn-secondary">{t('common.viewProjects')}</Link>
        </div>
      </Reveal>
    </section>
  );
}

export default Hero;
