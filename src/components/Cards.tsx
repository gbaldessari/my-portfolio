import React, { useRef, useState, useEffect } from 'react';
import { Project } from './Projects';
import './cards.css';

interface CardsProps {
  items: Project[];
}

const Cards: React.FC<CardsProps> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const getScrollStep = () => {
    if (!carouselRef.current) return 0;

    const carousel = carouselRef.current;
    const style = getComputedStyle(carousel);
    const gap = parseFloat(style.columnGap || style.gap) || 0;
    const firstCard = carousel.firstElementChild as HTMLElement | null;
    const cardWidth =
      firstCard?.offsetWidth ??
      carousel.clientWidth
      - (parseFloat(style.paddingLeft) || 0)
      - (parseFloat(style.paddingRight) || 0);

    if (cardWidth <= 0) return 0;
    return cardWidth + gap;
  };

  const clampIndex = (idx: number) => Math.min(Math.max(idx, 0), items.length - 1);

  const getIndexFromScrollLeft = (scrollLeft: number) => {
    const step = getScrollStep();
    if (step <= 0) return activeIndexRef.current;
    return clampIndex(Math.round(scrollLeft / step));
  };

  const snapToIndex = (idx: number) => {
    if (!carouselRef.current) return;

    const clamped = clampIndex(idx);
    const step = getScrollStep();

    if (step <= 0) {
      setActiveIndex(clamped);
      return;
    }

    carouselRef.current.scrollTo({ left: clamped * step, behavior: 'smooth' });
    setActiveIndex(clamped);
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (!carouselRef.current) return;
      const step = getScrollStep();
      if (step <= 0) return;
      carouselRef.current.scrollTo({
        left: activeIndexRef.current * step,
        behavior: 'auto',
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    setDragging(true);
    startX.current = e.clientX;
    scrollLeft.current = carouselRef.current?.scrollLeft || 0;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !carouselRef.current) return;
      if (e.buttons !== 1) return;
      e.preventDefault();
      const x = e.clientX;
      const walk = startX.current - x;
      let newScroll = scrollLeft.current + walk;
      newScroll = Math.max(0, Math.min(newScroll, carouselRef.current.scrollWidth - carouselRef.current.offsetWidth));
      carouselRef.current.scrollLeft = newScroll;
    };

    const onMouseUp = () => {
      if (!isDragging.current || !carouselRef.current) return;
      isDragging.current = false;
      setDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      snapToIndex(getIndexFromScrollLeft(carouselRef.current.scrollLeft));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: false });
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.touches[0].clientX;
    scrollLeft.current = carouselRef.current?.scrollLeft || 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    const x = e.touches[0].clientX;
    const walk = startX.current - x;
    let newScroll = scrollLeft.current + walk;
    newScroll = Math.max(0, Math.min(newScroll, carouselRef.current.scrollWidth - carouselRef.current.offsetWidth));
    carouselRef.current.scrollLeft = newScroll;
  };

  const onTouchEnd = () => {
    if (!isDragging.current || !carouselRef.current) return;
    isDragging.current = false;
    setDragging(false);
    snapToIndex(getIndexFromScrollLeft(carouselRef.current.scrollLeft));
  };

  const onWheel = (e: React.WheelEvent) => {
    if (dragging) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  const goToCard = (idx: number) => {
    snapToIndex(idx);
  };

  const onScroll = () => {
    if (!carouselRef.current || isDragging.current) return;
    setActiveIndex(getIndexFromScrollLeft(carouselRef.current.scrollLeft));
  };

  const preventImgDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="cards-carousel-outer">
      <div
        className={`cards-carousel${dragging ? '' : ' smooth-scroll'}`}
        ref={carouselRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onWheel={onWheel}
        onScroll={onScroll}
      >
        {items.map((project, idx) => (
          <div className="project-card" key={idx}>
            <div className="project-header">
              <h2>{project.title}</h2>
              <h3>{project.subtitle}</h3>
            </div>
            <div className="project-tags">
              {project.tags.map((tag, i) => (
                <span className="project-tag" key={i}>{tag}</span>
              ))}
            </div>
            <div className="project-description">
              <p dangerouslySetInnerHTML={{ __html: project.description }} />
            </div>
            <div className="project-image">
              {project.image ? (
                <img src={project.image} alt={project.title} draggable={false} onDragStart={preventImgDrag} />
              ) : (
                <div className="project-image-placeholder" aria-hidden="true">
                  <span>Sin vista previa</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {items.map((_, idx) => (
          <span
            key={idx}
            className={`carousel-dot${activeIndex === idx ? ' active' : ''}`}
            onClick={() => goToCard(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
