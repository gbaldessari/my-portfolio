import { useState, useEffect, useRef } from 'react';
import Carousel from '../components/Carousel';
import { skills } from '../components/Skills';
import { FaLinkedin, FaEnvelope, FaGithub, FaFileAlt } from 'react-icons/fa';
import './mainPage.css';

/**
 * Página principal.
 */
function MainPage() {
  // Estado para determinar si la vista es móvil
  const [isMobile, setIsMobile] = useState(false);

  // Estado para determinar si el modo oscuro está activado
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Estado para controlar si el logo está rebotando
  const [isBouncing, setIsBouncing] = useState(false);

  // Referencia al elemento del logo
  const logoRef = useRef<HTMLImageElement | null>(null);

  // Estado para la posición del logo
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

  // Estado para la velocidad del logo
  const [logoVelocity, setLogoVelocity] = useState({ dx: 5, dy: 5 });

  /**
   * Maneja el cambio de tamaño de la ventana y ajusta la posición del logo si es necesario.
   */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);

      setLogoPosition((prev) => {
        const logoElement = logoRef.current;
        if (!logoElement) return prev;

        const { innerWidth, innerHeight } = window;
        const logoWidth = logoElement.offsetWidth;
        const logoHeight = logoElement.offsetHeight;

        let newX = prev.x;
        let newY = prev.y;

        if (newX + logoWidth > innerWidth) newX = innerWidth - logoWidth;
        if (newY + logoHeight > innerHeight) newY = innerHeight - logoHeight;
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;

        return { x: newX, y: newY };
      });
    };

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Controla el movimiento del logo y detecta colisiones con los bordes de la ventana.
   */
  useEffect(() => {
    if (!isBouncing) return;

    const moveLogo = () => {
      setLogoPosition((prev) => {
        const padding = 16;
        const newX = prev.x + logoVelocity.dx;
        const newY = prev.y + logoVelocity.dy;

        const logoElement = logoRef.current;
        if (!logoElement) return prev;

        const { innerWidth, innerHeight } = window;
        const logoWidth = logoElement.offsetWidth;
        const logoHeight = logoElement.offsetHeight;

        let newDx = logoVelocity.dx;
        let newDy = logoVelocity.dy;

        if (newX <= -padding || newX + logoWidth >= innerWidth - padding) {
          newDx = -newDx;
        }
        if (newY <= -padding || newY + logoHeight >= innerHeight - padding) {
          newDy = -newDy;
        }

        setLogoVelocity({ dx: newDx, dy: newDy });

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveLogo, 16);
    return () => clearInterval(interval);
  }, [isBouncing, logoVelocity]);

  /**
   * Maneja el clic en el logo para activar o desactivar el rebote.
   */
  const handleLogoClick = () => {
    setLogoPosition({ x: 0, y: 0 });
    setIsBouncing((prev) => !prev);
  };

  return (
    <div className={isMobile ? 'mobile-layout' : ''}>
      {!isMobile && (
        <header className='header'>
          <div className='logo-container'>
            <img
              ref={logoRef}
              className='logo'
              src={isDarkMode ? './assets/icons/icoBlanco2000.png' : './assets/icons/icoGris2000.png'}
              alt='Giacomo Baldessari'
              onClick={handleLogoClick}
              style={{
                position: isBouncing ? 'absolute' : 'static',
                left: logoPosition.x,
                top: logoPosition.y,
              }}
            />
            {isBouncing && <div className='logo-placeholder' style={{ width: '80px', height: '80px' }}></div>}
          </div>
          <nav className='navbar'>
            <a href='#about' className='nav-link'>Sobre mí</a>
            <a href='#education' className='nav-link'>Educación</a>
            <a href='#stack' className='nav-link'>Stack Tecnológico</a>
            <a href='#projects' className='nav-link'>Proyectos</a>
            <a href='#framework' className='nav-link'>Framework Utilizado</a>
            <a href='#contact' className='nav-link'>Contacto</a>
          </nav>
        </header>
      )}

      <main className='main-content'>
        <div className="content-container">
          {/* Sección Sobre mí */}
          <section id='about'>
            <h1>Sobre mí</h1>
            <div className='section'>
              <p>
                ¡Hola! Mi nombre es Giacomo Baldessari, soy estudiante de Ingeniería Civil en Computación e Informática en la Universidad Católica del Norte.
                Desde que comencé a explorar el mundo del desarrollo de software, me he apasionado por el desarrollo web y móvil, buscando siempre aprender y
                aplicar nuevas herramientas para crear soluciones innovadoras.
              </p>
              <p>
                Me encanta enfrentar desafíos y trabajar en proyectos que no solo mejoren mis habilidades técnicas, sino que también aporten valor a quienes los usan.
                A lo largo de mi formación, he desarrollado aplicaciones y sitios web, enfocándome en la creación de experiencias intuitivas y eficientes.
              </p>
              <p>
                Actualmente, me encuentro en constante aprendizaje, explorando áreas como UX/UI, desarrollo full stack y optimización de rendimiento en aplicaciones web.
                Mi objetivo es seguir creciendo como desarrollador, participando en proyectos que me permitan combinar creatividad y tecnología para generar impacto.
              </p>
            </div>
          </section>

          {/* Sección Educación */}
          <section id='education'>
            <h1>Educación</h1>
            <div className='section'>
              <h2>Universidad Católica del Norte</h2>
              <h3>Ingeniería Civil en Computación e Informática</h3>
              <h3>2021 - Presente</h3>
              <p>
                Actualmente, soy estudiante de Ingeniería Civil en Computación e Informática en la Universidad Católica del Norte, donde he desarrollado una sólida base
                en programación, estructuras de datos, bases de datos y desarrollo de software. Mi formación me ha permitido explorar tanto el desarrollo web como móvil,
                aplicando tecnologías modernas para la creación de soluciones digitales eficientes.
              </p>
              <p>
                Durante mi trayectoria académica, he trabajado en diversos proyectos, tanto individuales como en equipo, que me han permitido mejorar mis habilidades en
                desarrollo full stack, integración de APIs, diseño de interfaces y optimización del rendimiento de aplicaciones. Además, he adquirido conocimientos en
                ingeniería de software y metodologías ágiles, lo que me ha ayudado a comprender el ciclo completo del desarrollo de software.
              </p>
            </div>
          </section>

          {/* Sección Stack Tecnológico */}
          <section id='stack'>
            <h1>Stack Tecnológico</h1>
            <div className='section'>
              <p>
                A lo largo de mi formación, he tenido la oportunidad de trabajar con diversas tecnologías y herramientas que me han permitido desarrollar aplicaciones
                web y móviles. Algunas de las tecnologías con las que tengo experiencia incluyen:
              </p>
              <div className='stack-section'>
                <Carousel items={skills} />
              </div>
            </div>
          </section>

          {/* Sección Proyectos */}
          <section id='projects'>
            <h1>Proyectos</h1>
            <div className='section'>
              <p>
                Puedes revisar mis proyectos en mi perfil de
                <a href='https://github.com/gbaldessari'> GitHub</a>
              </p>
            </div>
          </section>

          {/* Sección Framework Utilizado */}
          <section id='framework'>
            <h1>Framework Utilizado</h1>
            <div className='section'>
              <p>
                Esta página web ha sido desarrollada utilizando <strong>React</strong>, un framework de JavaScript ampliamente utilizado para construir interfaces de usuario interactivas y dinámicas.
                Cabe resaltar que esta página ha sido creada desde cero, sin utilizar plantillas, solo lo aprendido durante mi experiencia desarrollando páginas web.
              </p>
            </div>
          </section>

          {/* Sección Contacto */}
          <section id='contact' className='contact-section'>
            <h1>Contacto</h1>
            <div className='contact-icons'>
              <a href='mailto: giacomo.baldessari@alumnos.ucn.cl'>
                <FaEnvelope />
              </a>
              <a href='https://www.linkedin.com/in/giacomo-baldessari/'>
                <FaLinkedin />
              </a>
              <a href='https://github.com/gbaldessari'>
                <FaGithub />
              </a>
              <a href='documents\CV Giacomo Baldessari.pdf' download>
                <FaFileAlt />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default MainPage;