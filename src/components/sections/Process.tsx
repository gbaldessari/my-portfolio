import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiCode,
  FiHeadphones,
  FiList,
  FiSearch,
  FiUploadCloud,
} from 'react-icons/fi';
import Reveal from '../ui/Reveal';
import './sections.css';

interface ProcessStep {
  title: string;
  description: string;
}

const STEP_ICONS = [FiSearch, FiList, FiCode, FiUploadCloud, FiHeadphones] as const;

const STEP_COLORS = [
  'var(--process-c1)',
  'var(--process-c2)',
  'var(--process-c3)',
  'var(--process-c4)',
  'var(--process-c5)',
] as const;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function ProcessStepRow({
  step,
  index,
  isLast,
  stepLabel,
}: {
  step: ProcessStep;
  index: number;
  isLast: boolean;
  stepLabel: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isNarrow, setIsNarrow] = useState(false);
  const side = index % 2 === 0 ? 'left' : 'right';
  const Icon = STEP_ICONS[index % STEP_ICONS.length];
  const color = STEP_COLORS[index % STEP_COLORS.length];
  const nextColor = STEP_COLORS[(index + 1) % STEP_COLORS.length];
  const indexLabel = String(index + 1).padStart(2, '0');

  useEffect(() => {
    const narrowQuery = window.matchMedia('(max-width: 768px)');
    const syncNarrow = () => setIsNarrow(narrowQuery.matches);
    syncNarrow();
    narrowQuery.addEventListener('change', syncNarrow);
    return () => narrowQuery.removeEventListener('change', syncNarrow);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = row.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.92;
      const end = viewport * 0.38;
      const next = clamp01((start - rect.top) / Math.max(start - end, 1));
      setProgress((prev) => (Math.abs(prev - next) < 0.01 ? prev : next));
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

  const slideDir = side === 'left' ? -1 : 1;
  const blur = (1 - progress) * (isNarrow ? 3 : 6);
  const iconScale = 0.52 + progress * 0.48;

  // On narrow screens animate vertically to avoid horizontal overflow.
  const copyStyle = {
    '--process-progress': String(progress),
    filter: `blur(${blur}px)`,
    transform: isNarrow
      ? `translate3d(0, ${(1 - progress) * 18}px, 0)`
      : `translate3d(${(1 - progress) * 40 * slideDir}px, 0, 0)`,
  } as CSSProperties;

  const iconStyle = {
    borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
    backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
    color,
    transform: `scale(${iconScale})`,
  } as CSSProperties;

  const lineStyle = {
    background: `linear-gradient(${color}, ${nextColor})`,
    opacity: 0.35 + progress * 0.45,
    transform: `scaleY(${0.25 + progress * 0.75})`,
  } as CSSProperties;

  return (
    <div
      ref={rowRef}
      className={`process-row process-row--${side}`}
      style={{ '--step-color': color } as CSSProperties}
    >
      <div className="process-copy" style={copyStyle}>
        <span className="process-step-label">
          {stepLabel} {indexLabel}
        </span>
        <h2>{step.title}</h2>
        <p>{step.description}</p>
      </div>

      <div className="process-spine" aria-hidden="true">
        <div className="process-icon" style={iconStyle}>
          <Icon size={22} strokeWidth={2} />
        </div>
        {isLast ? null : <div className="process-line" style={lineStyle} />}
      </div>

      <div className="process-spacer" aria-hidden="true" />
    </div>
  );
}

function Process() {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true }) as ProcessStep[];
  const stepLabel = t('process.stepLabel');

  return (
    <section id="proceso" className="section-anchor process-section">
      <div className="section">
        <Reveal>
          <span className="section-label">{t('process.label')}</span>
          <h1>{t('process.title')}</h1>
          <p className="section-intro">{t('process.intro')}</p>
        </Reveal>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <ProcessStepRow
              key={step.title}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              stepLabel={stepLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
