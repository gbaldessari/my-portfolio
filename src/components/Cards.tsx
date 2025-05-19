import React, { useRef, useState, useEffect } from 'react';
import { Project } from './Projects';
import './cards.css';

const GAP = 32;

interface CardsProps {
  items: Project[];
}

const Cards: React.FC<CardsProps> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const getCardFullWidth = () => {
    if (!cardRef.current) return 0;
    return cardRef.current.offsetWidth + GAP;
  };

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
      const cardFullWidth = getCardFullWidth() || carouselRef.current.offsetWidth;
      const idx = Math.round(carouselRef.current.scrollLeft / cardFullWidth);
      setActiveIndex(idx);
      carouselRef.current.scrollTo({ left: idx * cardFullWidth, behavior: 'smooth' });
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
    const cardFullWidth = getCardFullWidth() || carouselRef.current.offsetWidth;
    const idx = Math.round(carouselRef.current.scrollLeft / cardFullWidth);
    setActiveIndex(idx);
    carouselRef.current.scrollTo({ left: idx * cardFullWidth, behavior: 'smooth' });
  };

  const onWheel = (e: React.WheelEvent) => {
    if (dragging) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  const goToCard = (idx: number) => {
    setActiveIndex(idx);
    if (carouselRef.current) {
      const cardFullWidth = getCardFullWidth() || carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({ left: idx * cardFullWidth, behavior: 'smooth' });
    }
  };

  const onScroll = () => {
    if (carouselRef.current) {
      const cardFullWidth = getCardFullWidth() || carouselRef.current.offsetWidth;
      const idx = Math.round(carouselRef.current.scrollLeft / cardFullWidth);
      setActiveIndex(idx);
    }
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
          <div
            className={`project-card`}
            key={idx}
            ref={idx === 0 ? cardRef : undefined}
          >

            <div className="project-content">
              <h2>{project.title}</h2>
              <h3>{project.subtitle}</h3>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span className="project-tag" key={i}>{tag}</span>
                ))}
              </div>
              <p dangerouslySetInnerHTML={{ __html: project.description }} />
              <div className="project-image">
                <img src={project.image} alt={project.title} draggable={false} onDragStart={preventImgDrag} />
              </div>
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
