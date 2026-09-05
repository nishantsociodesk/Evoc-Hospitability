import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Process from './components/Process';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import BookCallModal from './components/BookCallModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('HOME'); // 'HOME' | 'ABOUT'
  const [activeNav, setActiveNav] = useState('HOME');

  const openBookCallPage = () => {
    window.open('/book-call', '_blank', 'noopener,noreferrer');
  };

  if (window.location.pathname === '/book-call') {
    return (
      <div className="min-h-screen bg-[#09090b] text-gray-100 selection:bg-[#c5a059] selection:text-black">
        <BookCallModal isOpen onClose={() => { window.location.href = '/'; }} />
      </div>
    );
  }

  // Handle navigation across pages & sections with dynamic active underline
  const handleNavigate = (name, href) => {
    setActiveNav(name);

    if (name === 'ABOUT') {
      setCurrentPage('ABOUT');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (name === 'HOME') {
      setCurrentPage('HOME');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // For section anchors (#services, #case-studies, #process, #contact)
    if (currentPage !== 'HOME') {
      setCurrentPage('HOME');
      setTimeout(() => {
        const elem = document.querySelector(href);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const elem = document.querySelector(href);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Navigation with dynamic active underline */}
      <Navbar
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onOpenBookCall={openBookCallPage}
      />

      {/* Main Content Router */}
      <main>
        {currentPage === 'ABOUT' ? (
          /* Dedicated About Us Page with Dummy Copy */
          <AboutPage
            onBackToHome={() => handleNavigate('HOME', '#home')}
            onOpenBookCall={openBookCallPage}
          />
        ) : (
          /* Home Page with complete luxury hospitality layout */
          <>
            {/* 1. Hero Section */}
            <Hero onOpenBookCall={openBookCallPage} />

            {/* 2. Client Logos Bar */}
            <ClientLogos />

            {/* 3. Services / What We Do (360° Growth) */}
            <Services />

            {/* 4. Real Results / Case Studies */}
            <CaseStudies onOpenBookCall={openBookCallPage} />

            {/* 5. Our Process (A Proven Process. Predictable Growth.) */}
            <Process />

            {/* 6. Ready to Grow CTA Banner */}
            <CtaBanner onOpenBookCall={openBookCallPage} />
          </>
        )}
      </main>

      {/* Footer (Always accessible) */}
      <Footer onOpenBookCall={openBookCallPage} />

    </div>
  );
}
