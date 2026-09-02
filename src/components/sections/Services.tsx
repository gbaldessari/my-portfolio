import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProjectBySlug } from '../../content/projects';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import Reveal from '../ui/Reveal';
import './sections.css';

interface ServiceItem {
  title: string;
  description: string;
  client: string;
  outcome: string;
  projectSlug: string;
}

interface PanelMotion {
  opacity: number;
  y: number;
  scale: number;
  blur: number;
  zIndex: number;
}

/** Portion of each scroll segment used to transition into the next case. */
const CROSSFADE = 0.4;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function getPanelMotion(index: number, segment: number, count: number): PanelMotion {
  if (count <= 1) {
    return { opacity: 1, y: 0, scale: 1, blur: 0, zIndex: 1 };
  }

  const current = Math.min(count - 1, Math.floor(segment));
  const local = segment - current;
  const fadeStart = 1 - CROSSFADE;

  if (index < current) {
    return { opacity: 0, y: -28, scale: 0.88, blur: 12, zIndex: 0 };
  }

  if (index > current + 1) {
    return { opacity: 0, y: 64, scale: 1, blur: 0, zIndex: 0 };
  }

  if (index === current) {
    if (current >= count - 1 || local <= fadeStart) {
      return { opacity: 1, y: 0, scale: 1, blur: 0, zIndex: 2 };
    }

    const t = (local - fadeStart) / CROSSFADE;
    return {
      opacity: 1 - t * 0.95,
      y: -32 * t,
      scale: 1 - 0.1 * t,
      blur: 10 * t,
      zIndex: 1,
    };
  }

  // Incoming case: rises from below while previous recedes.
  if (local <= fadeStart) {
    return { opacity: 0, y: 64, scale: 1, blur: 0, zIndex: 3 };
  }

  const t = (local - fadeStart) / CROSSFADE;
  return {
    opacity: t,
    y: 64 * (1 - t),
    scale: 1,
    blur: 0,
    zIndex: 3,
  };
}

function Services() {
  const { t } = useTranslation();
  const paths = useLocalizedPath();
  const items = t('services.items', { returnObjects: true }) as ServiceItem[];
  const trackRef = useRef<HTMLDivElement>(null);
  const [segment, setSegment] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const useStatic = reduceMotion || isCompact;
  const activeIndex = Math.min(items.length - 1, Math.floor(segment));
  const progressFill = items.length <= 1 ? 1 : clamp01(segment / items.length);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactQuery = window.matchMedia('(max-width: 980px)');

    const syncMotion = () => setReduceMotion(motionQuery.matches);
    const syncCompact = () => setIsCompact(compactQuery.matches);

    syncMotion();
    syncCompact();
    motionQuery.addEventListener('change', syncMotion);
    compactQuery.addEventListener('change', syncCompact);

    return () => {
      motionQuery.removeEventListener('change', syncMotion);
      compactQuery.removeEventListener('change', syncCompact);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || useStatic) return;

    const headerOffset = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 72;
    };

    let frame = 0;

    const updateActive = () => {
      const rect = track.getBoundingClientRect();
      const header = headerOffset();
      const viewport = Math.max(window.innerHeight - header, 1);
      const scrollable = Math.max(track.offsetHeight - viewport, 1);
      const scrolled = Math.min(Math.max(-(rect.top - header), 0), scrollable);
      const progress = scrolled / scrollable;
      const nextSegment = progress * items.length;
      setSegment((prev) => (Math.abs(prev - nextSegment) < 0.002 ? prev : nextSegment));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items.length, useStatic]);

  return (
    <section id="servicios" className="section-anchor services-section">
      <div
        ref={trackRef}
        className={`services-stack-track${useStatic ? ' services-stack-track--static' : ''}`}
        style={
          useStatic
            ? undefined
            : { height: `calc(${Math.max(items.length, 1)} * 70vh)` }
        }
      >
        <div className="services-stack-sticky">
          <div className="services-section-intro">
            <Reveal>
              <span className="section-label">{t('services.label')}</span>
              <h1>{t('services.title')}</h1>
              <p className="section-intro">{t('services.intro')}</p>
            </Reveal>
          </div>

          <div className="services-stack-stage">
            {items.map((service, index) => {
              const project = getProjectBySlug(t, service.projectSlug);
              const stackLabel = project?.tags?.slice(0, 3).join(' · ') ?? '';
              const indexLabel = String(index + 1).padStart(2, '0');
              const motion = useStatic
                ? { opacity: 1, y: 0, scale: 1, blur: 0, zIndex: index + 1 }
                : getPanelMotion(index, segment, items.length);
              const isInteractive = useStatic || motion.opacity > 0.55;

              const panelStyle = {
                opacity: motion.opacity,
                transform: `translate3d(0, ${motion.y}px, 0) scale(${motion.scale})`,
                filter: motion.blur > 0.05 ? `blur(${motion.blur}px)` : 'none',
                zIndex: motion.zIndex,
              } as CSSProperties;

              return (
                <article
                  key={service.projectSlug}
                  className={`service-stack-panel${isInteractive ? ' service-stack-panel--active' : ''}`}
                  style={panelStyle}
                  aria-hidden={useStatic ? undefined : motion.opacity < 0.2}
                  aria-labelledby={`service-title-${service.projectSlug}`}
                >
                  <div className="service-stack-copy">
                    <div className="service-showcase-meta">
                      <span className="service-showcase-index">{indexLabel}</span>
                      <span className="service-showcase-status">
                        <span className="service-showcase-status-dot" aria-hidden="true" />
                        {service.client}
                      </span>
                    </div>

                    <h2
                      id={`service-title-${service.projectSlug}`}
                      className="service-showcase-title"
                    >
                      {service.title}
                    </h2>
                    <p className="service-showcase-description">{service.description}</p>

                    <div className="service-showcase-actions">
                      <Link
                        to={paths.project(service.projectSlug)}
                        className="service-showcase-link"
                        tabIndex={isInteractive ? 0 : -1}
                      >
                        <span>{t('common.viewCaseStudy').replace(/\s*→\s*$/, '')}</span>
                        <span className="service-showcase-link-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>

                  <aside className="service-stack-aside">
                    <dl className="service-facts">
                      <div className="service-fact">
                        <dt>{t('services.facts.client')}</dt>
                        <dd>{service.client}</dd>
                      </div>
                      <div className="service-fact">
                        <dt>{t('services.facts.outcome')}</dt>
                        <dd>{service.outcome}</dd>
                      </div>
                      {stackLabel ? (
                        <div className="service-fact">
                          <dt>{t('services.facts.stack')}</dt>
                          <dd>{stackLabel}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </aside>
                </article>
              );
            })}

            {useStatic ? null : (
              <div className="services-stack-progress" aria-hidden="true">
                <div className="services-stack-progress-track">
                  <div
                    className="services-stack-progress-fill"
                    style={{ transform: `scaleY(${progressFill})` }}
                  />
                </div>
                {items.map((service, index) => (
                  <span
                    key={service.projectSlug}
                    className={`services-stack-dot${index === activeIndex ? ' services-stack-dot--active' : ''}${index < activeIndex ? ' services-stack-dot--done' : ''}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
