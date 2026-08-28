import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Carousel from '../components/Carousel';
import { skills } from '../components/Skills';
import Reveal from '../components/ui/Reveal';
import { usePageSeo } from '../hooks/usePageSeo';
import './page.css';
import './mainPage.css';

interface LanguageItem {
  name: string;
  level: string;
}

function AboutPage() {
  const { t } = useTranslation();
  usePageSeo({ titleKey: 'meta.about.title', descriptionKey: 'meta.about.description' });
  const languages = t('aboutPage.languages', { returnObjects: true }) as LanguageItem[];

  return (
    <div className="page">
      <div className="content-container page-stack">
        <Reveal>
          <section className="page-hero">
            <span className="section-label">{t('aboutPage.label')}</span>
            <h1>{t('aboutPage.title')}</h1>
            <p>{t('aboutPage.intro')}</p>
          </section>
        </Reveal>

        <Reveal delay={60}>
          <section className="section">
            <h2>{t('aboutPage.approachTitle')}</h2>
            <p>{t('aboutPage.approachP1')}</p>
            <p>{t('aboutPage.approachP2')}</p>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="section">
            <span className="section-label">{t('aboutPage.experienceLabel')}</span>
            <h2>{t('aboutPage.experienceTitle')}</h2>
            <div className="education-card">
              <div className="education-icon">
                <FaBriefcase />
              </div>
              <div className="education-details">
                <h2>{t('aboutPage.experienceRole')}</h2>
                <p className="education-degree">{t('aboutPage.experienceStack')}</p>
                <p className="education-period">{t('aboutPage.experiencePeriod')}</p>
                <p>{t('aboutPage.experienceDesc')}</p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={100}>
          <section className="section">
            <span className="section-label">{t('aboutPage.educationLabel')}</span>
            <h2>{t('aboutPage.educationTitle')}</h2>
            <div className="education-card">
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-details">
                <h2>{t('aboutPage.educationSchool')}</h2>
                <p className="education-degree">{t('aboutPage.educationDegree')}</p>
                <p className="education-period">{t('aboutPage.educationPeriod')}</p>
                <p>{t('aboutPage.educationDesc')}</p>
              </div>
            </div>

            <div className="languages-block">
              <h2>{t('aboutPage.languagesTitle')}</h2>
              <ul className="languages-list">
                {languages.map((lang) => (
                  <li key={lang.name}>
                    <strong>{lang.name}</strong> — {lang.level}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal delay={120}>
          <section className="section">
            <span className="section-label">{t('aboutPage.stackLabel')}</span>
            <h2>{t('aboutPage.stackTitle')}</h2>
            <p>{t('aboutPage.stackDesc')}</p>
            <div className="stack-section">
              <Carousel items={skills} />
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}

export default AboutPage;
