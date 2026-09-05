import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '../images/logo.png';

export default function Navbar({
  activeNav = 'HOME',
  onNavigate,
  onOpenBookCall,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CASE STUDIES', href: '#case-studies' },
    { name: 'PROCESS', href: '#process' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(link.name, link.href);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090c]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - clicking returns to HOME */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, { name: 'HOME', href: '#home' })}
          className="flex flex-col group text-left cursor-pointer"
        >
          <img
            src={logo}
            alt="EVOC Hospitality"
            className="w-40 h-auto"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeNav === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-xs font-medium tracking-[0.18em] transition-all relative py-1 cursor-pointer ${
                  isActive ? 'text-[#d4af37]' : 'text-gray-300 hover:text-[#d4af37]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37] shadow-[0_0_10px_#d4af37] transition-all duration-300" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA & Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Book Strategy Call Button */}
          <button
            onClick={onOpenBookCall}
            className="group relative inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0b] font-semibold text-xs tracking-[0.15em] transition-all duration-300 shadow-[0_4px_20px_rgba(197,160,89,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.45)]"
          >
            <span>BOOK A STRATEGY CALL</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0c0c10]/98 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-medium tracking-[0.2em] transition-colors py-1 flex items-center justify-between ${
                    isActive ? 'text-[#d4af37] font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                </a>
              );
            })}
            <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookCall();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.18em] rounded-sm"
              >
                <span>BOOK A STRATEGY CALL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
