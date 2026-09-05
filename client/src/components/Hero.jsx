import React from 'react';
import { ArrowRight, Play, Coffee, Utensils, Building2, Palmtree } from 'lucide-react';

export default function Hero({ onOpenBookCall }) {
  const hospitalitySectors = [
    { name: 'Cafés', icon: Coffee },
    { name: 'Restaurants', icon: Utensils },
    { name: 'Hotels', icon: Building2 },
    { name: 'Resorts', icon: Palmtree },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start pt-28 pb-16 overflow-hidden bg-[#09090b]"
    >
      {/* Background Image with luxury dark vignette and lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Restaurant Dining Room"
          className="w-full h-full object-cover object-center scale-105 transform filter brightness-[0.42] contrast-[1.12]"
        />
        {/* Subtle radial gold warm glow in background */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />
        {/* Dark gradient fade at bottom and left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent w-full lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[68px] text-white leading-[1.08] tracking-tight font-medium break-words">
            We Build Hospitality <br />
            Brands That <span className="italic font-normal text-[#d4af37] drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)]">Grow.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-xl">
            Brand building. Performance marketing. <br className="hidden sm:inline" />
            More visitors. More revenue. Consistent growth.
          </p>

          {/* Category Badges (Cafes, Restaurants, Hotels, Resorts) */}
          <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
            {hospitalitySectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sector.name}
                  className="flex flex-col items-center group cursor-default"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#d4af37] bg-white/5 border border-white/10 group-hover:border-[#d4af37]/60 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <span className="mt-2 text-[11px] sm:text-xs text-gray-400 font-medium tracking-wider group-hover:text-gray-200 transition-colors">
                    {sector.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Call to Actions */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenBookCall}
              className="group inline-flex items-center justify-center px-7 py-3.5 rounded-sm bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(197,160,89,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.5)]"
            >
              <span>BOOK A STRATEGY CALL</span>
              <ArrowRight className="w-4 h-4 ml-2.5 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#case-studies"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-sm bg-black/40 hover:bg-black/60 border border-white/15 hover:border-[#d4af37]/50 text-gray-200 hover:text-white text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 group"
            >
              <span>VIEW OUR WORK</span>
              <div className="w-5 h-5 ml-2.5 rounded-full border border-gray-400 group-hover:border-[#d4af37] flex items-center justify-center">
                <Play className="w-2.5 h-2.5 text-[#d4af37] fill-[#d4af37] translate-x-[1px]" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
