import React from 'react';
import { ArrowRight, Phone, Mail, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import logo from '../images/logo.png'

export default function Footer({ onOpenBookCall }) {
  return (
    <footer id="contact" className="bg-[#070709] border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <a href="#home" className="flex flex-col group mb-6 text-left">
             <img
                         src={logo}
                         alt="EVOC Hospitality"
                         className="w-40 h-auto"
                       />
            </a>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-light mb-6">
              A growth partner for cafes, restaurants, hotels & resorts. We build brands that people
              love and businesses that scale.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/evoc.mediahub?igsi=MW00NXk2bDdrcDZ6Zw==' },
                // { icon: Facebook, href: '#facebook' },
                // { icon: Linkedin, href: '#linkedin' },
                // { icon: Twitter, href: '#twitter' },
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    className="w-8 h-8 rounded-full border border-white/10 hover:border-[#d4af37] flex items-center justify-center text-gray-400 hover:text-[#d4af37] transition-all"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-5">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Case Studies', 'Process', 'Contact'].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs text-gray-400 hover:text-white transition-colors tracking-wide"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-5">
              SERVICES
            </h4>
            <ul className="space-y-3">
              {[
                'Brand Strategy',
                'Performance Marketing',
                'Content & Creatives',
                'Social Media Management',
                'Revenue Growth',
                'Reputation Management',
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    className="text-xs text-gray-400 hover:text-white transition-colors tracking-wide"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Let's Talk (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-5">
              LET'S TALK
            </h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
              Book a free strategy call and let's grow your hospitality brand.
            </p>

            <button
              onClick={onOpenBookCall}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-sm border border-[#c5a059]/60 hover:bg-[#c5a059] text-[#c5a059] hover:text-black text-xs font-semibold tracking-wider transition-all duration-300 mb-6 group"
            >
              <span>BOOK A STRATEGY CALL</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="space-y-2 text-xs text-gray-400">
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-2.5 hover:text-[#d4af37] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>+91 63970 62646</span>
              </a>
              <a
                href="mailto:hello@evoc-hospitality.com"
                className="flex items-center space-x-2.5 hover:text-[#d4af37] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Contact@evoclabs.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© 2026 EVOC LABS PVT LTD. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-700">|</span>
            <a href="#terms" className="hover:text-gray-400 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
