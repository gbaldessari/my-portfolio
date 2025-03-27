import { useState, useEffect } from 'react';
import Carousel from './components/Carousel';
import { skills } from './components/Skills';
import { FaLinkedin, FaEnvelope, FaGithub, FaFileAlt } from 'react-icons/fa';

function App() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      lastScrollY = window.scrollY;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Inicializar el estado de isMobile
    handleResize();

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={isMobile ? 'mobile-layout' : ''}>
      {!isMobile && (
        <header className={`header ${isScrollingDown ? 'header-hidden' : ''}`}>
          <nav className="navbar">
            <a href="#about" className="nav-link">Sobre mí</a>
            <a href="#education" className="nav-link">Educación</a>
            <a href="#stack" className="nav-link">Stack Tecnológico</a>
            <a href="#projects" className="nav-link">Proyectos</a>
            <a href="#contact" className="nav-link">Contacto</a>
          </nav>
        </header>)}

      <main className={`main-content`}>
      {isDarkMode ? (
      <img className= {`logo`} src={'assets/icons/icoBlanco2000.png'} alt={'Giacomo Baldessari'} />)
      : (<img className= {`logo`} src={'assets/icons/icoGris2000.png'} alt={'Giacomo Baldessari'} />)
      }
        <section id="about">
          <h1>Sobre mí</h1>
          <div className="section">
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

        <section id="education">
          <h1>Educación</h1>
          <div className="section">
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

        <section id="stack">
          <h1>Stack Tecnológico</h1>
          <div className="section">
            <p>
              A lo largo de mi formación, he tenido la oportunidad de trabajar con diversas tecnologías y herramientas que me han permitido desarrollar aplicaciones
              web y móviles. Algunas de las tecnologías con las que tengo experiencia incluyen:
            </p>
            <div className="stack-section">
              <Carousel items={skills} />
            </div>
          </div>
        </section>

        <section id="projects" >
          <h1>Proyectos</h1>
          <div className="section">
            <p>
              Puedes revisar mis proyectos en mi perfil de
              <a href="https://github.com/gbaldessari"> GitHub</a>
            </p>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h1>Contacto</h1>
          <div className="contact-icons">
            <a href="mailto: giacomo.baldessari@alumnos.ucn.cl">
              <FaEnvelope />
            </a>
            <a href="https://www.linkedin.com/in/giacomo-baldessari/">
              <FaLinkedin />
            </a>
            <a href="https://github.com/gbaldessari">
              <FaGithub />
            </a>
            <a href='documents\CV Giacomo Baldessari.pdf' download>
              <FaFileAlt />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
