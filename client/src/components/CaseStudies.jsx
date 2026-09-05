import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function CaseStudies({ onOpenBookCall }) {
  const caseStudies = [
    {
      title: 'Cafe Noir',
      category: 'CAFE | DELHI',
      multiplier: '2.4X',
      metricLabel: 'Revenue Increased in 60 Days',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'The Fern Resort',
      category: 'RESORT | JAIPUR',
      multiplier: '3.1X',
      metricLabel: 'Bookings Increased in 90 Days',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'Urban Tadka',
      category: 'RESTAURANT | MUMBAI',
      multiplier: '2.8X',
      metricLabel: 'Revenue Increased in 45 Days',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  return (
    <section id="case-studies" className="py-24 bg-[#08080a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Intro & Action */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">
                REAL RESULTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                We Don't Just Market. <br />
                <span className="italic font-normal text-[#d4af37]">We Multiply.</span>
              </h2>
              <p className="mt-5 text-gray-400 text-sm leading-relaxed font-light">
                Here's what we've done for hospitality brands like yours.
              </p>
            </div>

            <div className="mt-8 lg:mt-16">
              <button
                onClick={onOpenBookCall}
                className="inline-flex items-center space-x-2 px-5 py-3 border border-white/15 hover:border-[#d4af37]/60 text-gray-300 hover:text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-sm transition-all group"
              >
                <span>VIEW ALL CASE STUDIES</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform text-[#d4af37]" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Case Study Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="group relative rounded-sm overflow-hidden bg-[#111115] border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col"
              >
                {/* Photo Thumbnail */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-black/30" />
                  
                  {/* Floating Action Arrow */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-gray-300 group-hover:text-black group-hover:bg-[#d4af37] transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Content & Multiplier */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-white font-medium group-hover:text-[#d4af37] transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mt-0.5 font-medium">
                      {study.category}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#d4af37] block leading-none tracking-tight">
                      {study.multiplier}
                    </span>
                    <span className="text-[11px] text-gray-400 font-light mt-1 block">
                      {study.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
