import React, { useRef, useEffect } from 'react';
import { Skill } from './Skills';

interface CarouselProps {
  items: Skill[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const track = carouselRef.current;
      const totalItems = items.length;
      const animationDuration = totalItems * 2.5;

      for (let i = 0; i < totalItems; i++) {
        const clone = track.children[i].cloneNode(true);
        track.appendChild(clone);
      }

      track.style.animation = `scroll ${animationDuration}s linear infinite`;
      track.style.setProperty('--total-items', totalItems.toString());
    }
  }, [items]);

  return (
    <div className="carousel-container">
      <div className="carousel-track" ref={carouselRef}>
        {items.map((item, index) => (
          <div className="carousel-item" key={index}>
            <div className="carousel-image-container">
              <img src={item.imgSrc} alt={item.alt} />
            </div>
            <div>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
