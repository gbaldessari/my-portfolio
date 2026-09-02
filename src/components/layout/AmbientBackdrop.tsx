import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ambient-backdrop.css';

function AmbientBackdrop() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || theme !== 'dark') {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    let particles: Array<{ x: number; y: number; r: number; a: number; s: number }> = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.45 + 0.15,
        s: Math.random() * 0.18 + 0.04,
      }));
    };

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.s;
        if (p.y < -4) {
          p.y = height + 4;
          p.x = Math.random() * width;
        }

        const twinkle = 0.55 + Math.sin((frame + p.x) * 0.02) * 0.45;
        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 146, 99, ${p.a * twinkle})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <div className="ambient-backdrop" aria-hidden="true">
      <div className="ambient-blob ambient-blob--1" />
      <div className="ambient-blob ambient-blob--2" />
      <div className="ambient-blob ambient-blob--3" />
      <div className="ambient-blob ambient-blob--4" />
      <canvas ref={canvasRef} className="ambient-particles" />
    </div>
  );
}

export default AmbientBackdrop;
