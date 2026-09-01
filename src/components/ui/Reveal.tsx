import { ReactNode, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import './reveal.css';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.05, rootMargin: '0px 0px -24px 0px', once: true });

  return (
    <div
      ref={ref}
      className={`reveal${isInView ? ' reveal--visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
