import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaEnvelope, FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import WhatsAppLink from '../components/WhatsAppLink';
import Reveal from '../components/ui/Reveal';
import { CV_PATH } from '../config/navigation';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { usePageSeo } from '../hooks/usePageSeo';
import './page.css';
import '../components/contact-page.css';

const CONTACT_CHANNELS = [
  {
    id: 'email',
    href: 'mailto:giacomo.baldessari.dev@gmail.com',
    icon: FaEnvelope,
    labelKey: 'contactPage.channels.email',
    value: 'giacomo.baldessari.dev@gmail.com',
    external: false,
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/giacomo-baldessari/',
    icon: FaLinkedin,
    labelKey: 'contactPage.channels.linkedin',
    value: 'linkedin.com/in/giacomo-baldessari',
    external: true,
  },
  {
    id: 'github',
    href: 'https://github.com/gbaldessari',
    icon: FaGithub,
    labelKey: 'contactPage.channels.github',
    value: 'github.com/gbaldessari',
    external: true,
  },
  {
    id: 'cv',
    href: CV_PATH,
    icon: FaFileAlt,
    labelKey: 'contactPage.channels.cv',
    valueKey: 'contactPage.channels.cvHint',
    external: false,
    download: true,
  },
] as const;

function ContactPage() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();
  usePageSeo({ titleKey: 'meta.contact.title', descriptionKey: 'meta.contact.description' });

  return (
    <div className="page">
      <div className="content-container page-stack">
        <Reveal>
          <section className="page-hero">
            <span className="section-label">{t('contactPage.label')}</span>
            <h1>{t('contactPage.title')}</h1>
            <p>{t('contactPage.intro')}</p>
          </section>
        </Reveal>

        <Reveal delay={60}>
          <section className="page-section contact-whatsapp-section">
            <h2>{t('contactPage.whatsappTitle')}</h2>
            <p className="contact-whatsapp-intro">{t('contactPage.whatsappIntro')}</p>
            <WhatsAppLink className="btn btn-whatsapp contact-whatsapp-cta" />
          </section>
        </Reveal>

        <Reveal delay={100}>
          <section className="page-section contact-channels">
            <h2>{t('contactPage.channelsTitle')}</h2>
            <p className="contact-channels-intro">{t('contactPage.channelsIntro')}</p>
            <ul className="contact-channel-list">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                const value = 'valueKey' in channel && channel.valueKey
                  ? t(channel.valueKey)
                  : channel.value;

                return (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      className="contact-channel-item"
                      {...(channel.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      {...('download' in channel && channel.download ? { download: true } : {})}
                    >
                      <span className="contact-channel-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="contact-channel-text">
                        <span className="contact-channel-label">{t(channel.labelKey)}</span>
                        <span className="contact-channel-value">{value}</span>
                      </span>
                      <FaArrowRight className="contact-channel-arrow" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </Reveal>

        <p className="page-back-link">
          <Link to={paths.home}>{t('common.backHome')}</Link>
        </p>
      </div>
    </div>
  );
}

export default ContactPage;
