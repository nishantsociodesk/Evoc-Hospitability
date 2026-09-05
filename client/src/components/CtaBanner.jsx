import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner({ onOpenBookCall }) {
  return (
    <section className="py-12 bg-[#09090c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-sm p-8 sm:p-12 bg-gradient-to-r from-[#141419] via-[#101014] to-[#141419] border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300 shadow-2xl">
          {/* Subtle palm shadow / luxury overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/20 via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight">
                Ready to Grow Your <br />
                <span className="text-[#d4af37]">Hospitality Brand?</span>
              </h2>
            </div>

            <div className="max-w-md">
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Let's build a powerful brand, bring in more visitors and double your revenue.
              </p>
            </div>

            <div>
              <button
                onClick={onOpenBookCall}
                className="inline-flex items-center justify-center px-5 sm:px-7 py-3.5 rounded-sm bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-[0.12em] sm:tracking-[0.16em] uppercase text-center transition-all duration-300 shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.5)]"
              >
                <span>BOOK A STRATEGY CALL</span>
                <ArrowRight className="w-4 h-4 ml-2.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
