import { useState, useEffect, useRef } from 'react';
import Carousel from '../components/Carousel';
import { skills } from '../components/Skills';
import { FaLinkedin, FaEnvelope, FaGithub, FaFileAlt, FaGraduationCap, FaBars, FaTimes, FaBriefcase, FaPhone } from 'react-icons/fa';
import './mainPage.css';
import Cards from '../components/Cards';
import { projects } from '../components/Projects';

const NAV_LINKS = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#education', label: 'Educación' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
];

function MainPage() {
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [isBouncing, setIsBouncing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const logoVelocityRef = useRef({ dx: 5, dy: 5 });
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

  const clampLogoPosition = (x: number, y: number) => {
    const logoElement = logoRef.current;
    if (!logoElement) return { x, y };

    const padding = 8;
    const logoWidth = logoElement.offsetWidth;
    const logoHeight = logoElement.offsetHeight;
    const maxX = Math.max(padding, window.innerWidth - logoWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - logoHeight - padding);

    return {
      x: Math.min(Math.max(x, padding), maxX),
      y: Math.min(Math.max(y, padding), maxY),
    };
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);

      setLogoPosition((prev) => clampLogoPosition(prev.x, prev.y));
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

  useEffect(() => {
    if (!isBouncing) return;

    const moveLogo = () => {
      const logoElement = logoRef.current;
      if (!logoElement) return;

      const padding = 8;
      const logoWidth = logoElement.offsetWidth;
      const logoHeight = logoElement.offsetHeight;
      const maxX = Math.max(padding, window.innerWidth - logoWidth - padding);
      const maxY = Math.max(padding, window.innerHeight - logoHeight - padding);

      setLogoPosition((prev) => {
        let newX = prev.x + logoVelocityRef.current.dx;
        let newY = prev.y + logoVelocityRef.current.dy;

        if (newX <= padding) {
          newX = padding;
          logoVelocityRef.current.dx = Math.abs(logoVelocityRef.current.dx);
        } else if (newX >= maxX) {
          newX = maxX;
          logoVelocityRef.current.dx = -Math.abs(logoVelocityRef.current.dx);
        }

        if (newY <= padding) {
          newY = padding;
          logoVelocityRef.current.dy = Math.abs(logoVelocityRef.current.dy);
        } else if (newY >= maxY) {
          newY = maxY;
          logoVelocityRef.current.dy = -Math.abs(logoVelocityRef.current.dy);
        }

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveLogo, 16);
    return () => clearInterval(interval);
  }, [isBouncing]);

  const handleLogoClick = () => {
    if (isBouncing) {
      setIsBouncing(false);
      setLogoPosition({ x: 0, y: 0 });
      return;
    }

    const rect = logoRef.current?.getBoundingClientRect();
    if (rect) {
      setLogoPosition(clampLogoPosition(rect.left, rect.top));
    }

    logoVelocityRef.current = { dx: 5, dy: 5 };
    setIsBouncing(true);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="logo-container">
            <img
              ref={logoRef}
              className={`logo${isBouncing ? ' logo-bouncing' : ''}`}
              src={isDarkMode ? './assets/icons/icoBlanco2000.png' : './assets/icons/icoGris2000.png'}
              alt="Giacomo Baldessari"
              onClick={handleLogoClick}
              style={{
                left: isBouncing ? logoPosition.x : undefined,
                top: isBouncing ? logoPosition.y : undefined,
              }}
            />
            {isBouncing && <div className="logo-placeholder" />}
          </div>

          <nav className="navbar" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Navegación móvil">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="nav-link" onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
      </nav>

      <main className="main-content">
        <div className="content-container">
          <section className="hero">
            <span className="hero-greeting">Portafolio</span>
            <h1 className="hero-name">Giacomo Baldessari Marchant</h1>
            <p className="hero-title">Desarrollador Full Stack · La Serena, Chile</p>
            <p className="hero-description">
              Desarrollador full stack con experiencia entregando aplicaciones web en producción para pymes y organizaciones públicas.
              Especializado en React, NestJS y TypeScript, desde APIs REST e integraciones hasta el despliegue.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">Ver proyectos</a>
              <a href="#contact" className="btn btn-secondary">Contactar</a>
            </div>
          </section>

          <section id="about" className="section-anchor">
            <div className="section">
              <span className="section-label">01 — Perfil</span>
              <h1>Sobre mí</h1>
              <p>
                Soy desarrollador full stack con foco en soluciones web listas para producción: APIs REST escalables,
                integraciones con servicios externos y despliegue continuo en entornos cloud e infraestructura con contenedores.
              </p>
              <p>
                Combino mi formación en Ingeniería Civil en Computación e Informática en la Universidad Católica del Norte
                con experiencia freelance desarrollando plataformas a medida para pymes —desde gestión operativa y comercial
                hasta captación de leads e integraciones CRM— priorizando rendimiento, mantenibilidad y entrega de valor al negocio.
              </p>
              <p>
                Trabajo principalmente con <strong>React</strong>, <strong>NestJS</strong> y <strong>TypeScript</strong>,
                complementando con bases relacionales y documentales según las necesidades de cada proyecto.
              </p>
            </div>
          </section>

          <section id="experience" className="section-anchor">
            <div className="section">
              <span className="section-label">02 — Experiencia</span>
              <h1>Experiencia laboral</h1>
              <div className="education-card">
                <div className="education-icon">
                  <FaBriefcase />
                </div>
                <div className="education-details">
                  <h2>Desarrollador de Software Freelance</h2>
                  <p className="education-degree">React · NestJS · TypeScript</p>
                  <p className="education-period">Mayo 2025 — Actualidad</p>
                  <p>
                    Desarrollo de aplicaciones web para pymes, APIs REST escalables y soluciones a medida con foco en rendimiento
                    y entrega continua. He liderado proyectos de punta a punta: diseño de arquitectura, implementación full stack,
                    integraciones (WhatsApp, WooCommerce, CRM, mapas) y despliegue productivo.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="education" className="section-anchor">
            <div className="section">
              <span className="section-label">03 — Formación</span>
              <h1>Educación</h1>
              <div className="education-card">
                <div className="education-icon">
                  <FaGraduationCap />
                </div>
                <div className="education-details">
                  <h2>Universidad Católica del Norte</h2>
                  <p className="education-degree">Ingeniería Civil en Computación e Informática · Sede Coquimbo</p>
                  <p className="education-period">2021 — 2026</p>
                  <p>
                    Formación en programación, estructuras de datos, bases de datos, ingeniería de software y metodologías ágiles.
                    He participado en proyectos académicos individuales y colaborativos,
                    fortaleciendo competencias en desarrollo full stack, integración de APIs, despliegue de aplicaciones y optimización de rendimiento.
                  </p>
                </div>
              </div>
              <div className="languages-block">
                <h2>Idiomas</h2>
                <ul className="languages-list">
                  <li><strong>Español</strong> — Nativo</li>
                  <li><strong>Italiano</strong> — B2 (CILS)</li>
                  <li><strong>Inglés</strong> — B1/B2</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="stack" className="section-anchor">
            <div className="section">
              <span className="section-label">04 — Tecnologías</span>
              <h1>Stack Tecnológico</h1>
              <p>
                Lenguajes como Python, TypeScript/JavaScript, Java y C/C++. Frontend con React y React Native;
                backend con NestJS; bases de datos MySQL/MariaDB, PostgreSQL y MongoDB; y herramientas de despliegue
                como Docker, Vercel, Railway, Jenkins y GitHub.
              </p>
              <div className="stack-section">
                <Carousel items={skills} />
              </div>
            </div>
          </section>

          <section id="projects" className="section-anchor">
            <div className="section">
              <span className="section-label">05 — Trabajo</span>
              <h1>Proyectos</h1>
              <Cards items={projects} />
              <p>
                Puede consultar más de mis proyectos personales en mi perfil de{' '}
                <a href="https://github.com/gbaldessari" target="_blank" rel="noopener noreferrer" className="github-link">
                  GitHub →
                </a>
              </p>
            </div>
          </section>

          <section id="framework" className="section-anchor">
            <div className="section">
              <span className="section-label">06 — Detalles</span>
              <h1>Sobre este sitio</h1>
              <p className="framework-note">
                Desarrollado con <strong>React</strong> y desplegado en <strong>GitHub Pages</strong>.
                Construido desde cero, sin plantillas prediseñadas, aplicando los conocimientos adquiridos en desarrollo web.
              </p>
            </div>
          </section>

          <section id="contact" className="section-anchor">
            <div className="contact-section">
              <span className="section-label">07 — Contacto</span>
              <h1>¿Trabajamos juntos?</h1>
              <p className="contact-subtitle">
                Disponible para proyectos freelance y oportunidades profesionales · La Serena, Chile
              </p>
              <div className="contact-icons">
                <a href="mailto:giacomo.baldessari11@gmail.com" className="contact-link" aria-label="Enviar correo">
                  <FaEnvelope />
                  <span>Email</span>
                </a>
                <a href="tel:+56964293503" className="contact-link" aria-label="Llamar por teléfono">
                  <FaPhone />
                  <span>+56 9 6429 3503</span>
                </a>
                <a href="https://www.linkedin.com/in/giacomo-baldessari/" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="LinkedIn">
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/gbaldessari" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="GitHub">
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a href="documents/CV Giacomo Baldessari.pdf" download className="contact-link" aria-label="Descargar CV">
                  <FaFileAlt />
                  <span>CV</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default MainPage;
