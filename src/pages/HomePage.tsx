import { usePageSeo } from '../hooks/usePageSeo';
import './mainPage.css';
import '../components/sections/sections.css';
import AboutTeaser from '../components/sections/AboutTeaser';
import CTABanner from '../components/sections/CTABanner';
import FAQ from '../components/sections/FAQ';
import Hero from '../components/sections/Hero';
import Process from '../components/sections/Process';
import Services from '../components/sections/Services';
import SocialProof from '../components/sections/SocialProof';
import WhyMe from '../components/sections/WhyMe';

function HomePage() {
  usePageSeo({ titleKey: 'meta.home.title', descriptionKey: 'meta.home.description' });

  return (
    <div className="main-content">
      <div className="content-container page-stack">
        <div className="hero-band">
          <Hero />
          <SocialProof />
        </div>
        <Services />
        <Process />
        <WhyMe />
        <AboutTeaser />
        <FAQ />
        <CTABanner />
      </div>
    </div>
  );
}

export default HomePage;
