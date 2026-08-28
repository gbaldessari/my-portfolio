import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaGithub, FaLinkedin, FaFileAlt, FaArrowRight } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import Reveal from '../components/ui/Reveal';
import { CV_PATH } from '../config/navigation';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { usePageSeo } from '../hooks/usePageSeo';
import './page.css';
import '../components/contact-form.css';

const CONTACT_CHANNELS = [
  {
    id: 'email',
    href: 'mailto:giacomo.baldessari11@gmail.com',
    icon: FaEnvelope,
    labelKey: 'contactPage.channels.email',
    value: 'giacomo.baldessari11@gmail.com',
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

        <div className="contact-layout">
          <Reveal delay={60}>
            <section className="page-section contact-form-section">
              <h2>{t('contactPage.formTitle')}</h2>
              <ContactForm />
            </section>
          </Reveal>

          <Reveal delay={100}>
            <aside className="page-section contact-channels">
              <h2>{t('contactPage.otherTitle')}</h2>
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
            </aside>
          </Reveal>
        </div>

        <p className="page-back-link">
          <Link to={paths.home}>{t('common.backHome')}</Link>
        </p>
      </div>
    </div>
  );
}

export default ContactPage;
