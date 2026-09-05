import React from 'react';
import { Search, Compass, Rocket, TrendingUp } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      icon: Search,
      desc: 'We understand your brand, audience and goals.',
    },
    {
      num: '02',
      title: 'Strategize',
      icon: Compass,
      desc: 'We create a custom growth strategy for your business.',
    },
    {
      num: '03',
      title: 'Execute',
      icon: Rocket,
      desc: 'We build, launch and optimize with precision.',
    },
    {
      num: '04',
      title: 'Scale',
      icon: TrendingUp,
      desc: 'We scale what works and maximize your revenue.',
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#09090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-left mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">
            OUR PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            A Proven Process. <br />
            <span className="italic font-normal text-gray-200">Predictable Growth.</span>
          </h2>
        </div>

        {/* 4 Steps Timeline */}
        <div className="relative">
          {/* Dotted horizontal connector line for desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-[1px] border-t border-dashed border-gray-700 pointer-events-none z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-start group">
                  {/* Step Icon Node */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-full bg-[#121217] border border-gray-700 group-hover:border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Step Number & Title */}
                  <span className="text-xs font-serif font-bold text-[#c5a059] tracking-widest block mb-1">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-serif text-white font-medium mb-2 group-hover:text-[#d4af37] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
