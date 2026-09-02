import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import AmbientBackdrop from './AmbientBackdrop';
import LocaleSync from './LocaleSync';
import ScrollToTop from './ScrollToTop';
import SeoDefaults from '../seo/SeoDefaults';
import './layout.css';

function Layout() {
  return (
    <div className="app-layout">
      <LocaleSync />
      <ScrollToTop />
      <SeoDefaults />
      <AmbientBackdrop />
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
