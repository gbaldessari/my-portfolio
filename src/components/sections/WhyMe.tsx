import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';
import './sections.css';

interface WhyItem {
  title: string;
  description: string;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function WhyMe() {
  const { t } = useTranslation();
  const items = t('whyMe.items', { returnObjects: true }) as WhyItem[];
  const gridRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = grid.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.7;
      const end = viewport * 0.28;
      const next = clamp01((start - rect.top) / Math.max(start - end, 1));
      setProgress((prev) => (Math.abs(prev - next) < 0.008 ? prev : next));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const isOpen = progress > 0.97;

  return (
    <section id="por-que" className="section-anchor section-anchor--tint">
      <div className="section">
        <Reveal>
          <span className="section-label">{t('whyMe.label')}</span>
          <h1>{t('whyMe.title')}</h1>
        </Reveal>
        <div
          ref={gridRef}
          className={`why-grid${isOpen ? ' why-grid--open' : ''}`}
          style={{ ['--why-p' as string]: String(progress) }}
        >
          {items.map((reason, index) => (
            <div
              key={reason.title}
              className="why-card-slot"
              style={{ ['--why-i' as string]: String(index) }}
            >
              <article className="why-card">
                <h2>{reason.title}</h2>
                <p>{reason.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyMe;
