import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import './sections.css';

function SocialProof() {
  const { t } = useTranslation();
  const stats = ['platforms', 'stack', 'integrations'] as const;

  return (
    <aside className="social-proof">
      <div className="social-proof-grid">
        {stats.map((key, index) => (
          <Reveal key={key} delay={index * 80}>
            <div className="social-proof-item">
              <strong>{t(`socialProof.${key}.value`)}</strong>
              <span>{t(`socialProof.${key}.label`)}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </aside>
  );
}

export default SocialProof;
