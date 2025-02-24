import { useState, useEffect } from 'react';
import Carousel from './components/Carousel';
import { skills } from './components/Skills';
import { FaLinkedin, FaEnvelope, FaGithub, FaFileAlt } from 'react-icons/fa';

function App() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`header ${isScrollingDown ? 'header-hidden' : ''}`}>
        <nav className="navbar">
          <a href="#about" className="nav-link">Sobre mí</a>
          <a href="#education" className="nav-link">Educación</a>
          <a href="#stack" className="nav-link">Stack Tecnológico</a>
          <a href="#projects" className="nav-link">Proyectos</a>
          <a href="#contact" className="nav-link">Contacto</a>
        </nav>
      </header>
      <main className="main-content">
        <h1>Giacomo Baldessari Marchant</h1>

        <h2>Sobre mí</h2>
        <section id="about" className="section">
          <p>
            ¡Hola! Mi nombre es Giacomo Baldessari, soy estudiante de Ingeniería Civil en Computación e Informática en la Universidad Católica del Norte.
            Desde que comencé a explorar el mundo del desarrollo de software, me he apasionado por el desarrollo web y móvil, buscando siempre aprender y
            aplicar nuevas herramientas para crear soluciones innovadoras.
          </p>
          <br />
          <p>
            Me encanta enfrentar desafíos y trabajar en proyectos que no solo mejoren mis habilidades técnicas, sino que también aporten valor a quienes los usan.
            A lo largo de mi formación, he desarrollado aplicaciones y sitios web, enfocándome en la creación de experiencias intuitivas y eficientes.
          </p>
          <br />
          <p>
            Actualmente, me encuentro en constante aprendizaje, explorando áreas como UX/UI, desarrollo full stack y optimización de rendimiento en aplicaciones web.
            Mi objetivo es seguir creciendo como desarrollador, participando en proyectos que me permitan combinar creatividad y tecnología para generar impacto.
          </p>
        </section>

        <h2>Educación</h2>
        <section id="education" className="section">
          <h3>Universidad Católica del Norte</h3>
          <p>
            Ingeniería Civil en Computación e Informática | [2021] - Actualidad
          </p>
          <br />
          <p>
            Actualmente, soy estudiante de Ingeniería Civil en Computación e Informática en la Universidad Católica del Norte, donde he desarrollado una sólida base
            en programación, estructuras de datos, bases de datos y desarrollo de software. Mi formación me ha permitido explorar tanto el desarrollo web como móvil,
            aplicando tecnologías modernas para la creación de soluciones digitales eficientes.
          </p>
          <br />
          <p>
            Durante mi trayectoria académica, he trabajado en diversos proyectos, tanto individuales como en equipo, que me han permitido mejorar mis habilidades en
            desarrollo full stack, integración de APIs, diseño de interfaces y optimización del rendimiento de aplicaciones. Además, he adquirido conocimientos en
            ingeniería de software y metodologías ágiles, lo que me ha ayudado a comprender el ciclo completo del desarrollo de software.
          </p>
        </section>

        <h2>Stack Tecnológico</h2>
        <section id="stack" className="stack-section">
          <Carousel items={skills} />
        </section>

        <h2>Proyectos</h2>
        <section id="projects" className="section">
          <p>
            Puedes revisar mis proyectos en mi perfil de
            <a href="https://github.com/gbaldessari"> GitHub</a>
          </p>
        </section>

        
        <section id="contact" className="contact-section">
        <h2>Contacto</h2>
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
              <FaFileAlt/>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
