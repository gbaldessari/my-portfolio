import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import WhatsAppLink from '../WhatsAppLink';
import Reveal from '../ui/Reveal';
import './sections.css';

function CTABanner() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();

  return (
    <section id="contacto" className="section-anchor section-anchor--cta">
      <Reveal>
        <div className="cta-banner">
          <span className="section-label">{t('cta.label')}</span>
          <h1>{t('cta.title')}</h1>
          <p className="contact-subtitle">{t('cta.subtitle')}</p>
          <div className="hero-actions">
            <WhatsAppLink className="btn btn-whatsapp">
              <FaWhatsapp aria-hidden="true" />
              {t('common.contactWhatsApp')}
            </WhatsAppLink>
            <Link to={paths.projects} className="btn btn-secondary">{t('common.viewProjects')}</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default CTABanner;
