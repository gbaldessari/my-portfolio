import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ROUTE_IDS } from '../../config/navigation';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import './layout.css';
import './language-switcher.css';
import './theme-toggle.css';

function Header() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const paths = useLocalizedPath();
  const [isBouncing, setIsBouncing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

  const logoSrc = theme === 'dark'
    ? '/assets/icons/logo_dark.png'
    : '/assets/icons/logo_light.png';

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header-inner">
          <div className="logo-container">
            <Link to={paths.home} className="logo-link">
              <img
                ref={logoRef}
                className={`logo${isBouncing ? ' logo-bouncing' : ''}`}
                src={logoSrc}
                alt="Giacomo Baldessari"
                onClick={handleLogoClick}
                style={{
                  left: isBouncing ? `${logoPosition.x}px` : undefined,
                  top: isBouncing ? `${logoPosition.y}px` : undefined,
                }}
              />
            </Link>
            {isBouncing && <div className="logo-placeholder" />}
          </div>

          <nav className="navbar" aria-label={t('a11y.mainNav')}>
            {NAV_ROUTE_IDS.map((link) => (
              <NavLink
                key={link.id}
                to={paths[link.id]}
                end={link.end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {t(link.key)}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <LanguageSwitcher />

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label={t('a11y.mobileNav')}>
        {NAV_ROUTE_IDS.map((link) => (
          <NavLink
            key={link.id}
            to={paths[link.id]}
            end={link.end}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={handleNavClick}
          >
            {t(link.key)}
          </NavLink>
        ))}
        <div className="mobile-nav-controls">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </>
  );
}

export default Header;
