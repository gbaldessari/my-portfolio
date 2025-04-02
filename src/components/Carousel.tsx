import React, { useRef, useEffect, JSX } from 'react';
import { Skill } from './Skills';

/**
 * Props para el componente Carousel.
 * @property {Skill[]} items - Lista de elementos que se mostrarán en el carrusel.
 */
interface CarouselProps {
  items: Skill[];
}

/**
 * Componente Carousel.
 * Renderiza un carrusel animado con los elementos proporcionados.
 * 
 * @param {CarouselProps} props - Props del componente.
 * @returns {JSX.Element} Carrusel animado.
 */
const Carousel: React.FC<CarouselProps> = ({ items }: CarouselProps): JSX.Element => {
  const carouselRef = useRef<HTMLDivElement>(null);

  /**
   * Efecto para inicializar el carrusel.
   * Duplica los elementos para crear un efecto de desplazamiento infinito.
   */
  useEffect(() => {
    if (carouselRef.current) {
      const track = carouselRef.current;
      const totalItems = items.length;
      const animationDuration = totalItems * 2.5; // Duración de la animación basada en la cantidad de elementos

      // Duplica los elementos del carrusel
      for (let i = 0; i < totalItems; i++) {
        const clone = track.children[i].cloneNode(true);
        track.appendChild(clone);
      }

      // Configura la animación
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
