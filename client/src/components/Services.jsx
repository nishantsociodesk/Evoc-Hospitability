import React from 'react';
import { Target, Megaphone, Camera, MessageSquareCode, TrendingUp, Star } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Brand Strategy',
      icon: Target,
      desc: 'We craft unique brand identities that connect, differentiate and position you as the go-to choice.',
    },
    {
      title: 'Performance Marketing',
      icon: Megaphone,
      desc: 'High-performing ad campaigns that drive bookings, footfall and revenue with measurable results.',
    },
    {
      title: 'Content & Creatives',
      icon: Camera,
      desc: 'Stunning photos, videos and creatives that tell your story and stop the scroll.',
    },
    {
      title: 'Social Media Management',
      icon: MessageSquareCode,
      desc: 'Engaging content and community management that builds loyalty and brand love.',
    },
    {
      title: 'Revenue Growth Systems',
      icon: TrendingUp,
      desc: 'Funnels, offers and automation systems designed to increase repeat business and average order value.',
    },
    {
      title: 'Reputation & Reviews',
      icon: Star,
      desc: 'Build trust and credibility with review management and online reputation strategies.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#09090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">
              WHAT WE DO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.15]">
              360° Growth <br />
              <span className="text-gray-200">For Hospitality Brands</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light lg:pl-10">
              We blend branding, marketing and technology to create powerful growth engines for cafes,
              restaurants, hotels and resorts.
            </p>
          </div>
        </div>

        {/* 6 Services Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-sm bg-[#121216]/60 hover:bg-[#15151c]/90 border border-white/5 hover:border-[#c5a059]/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Subtle top-right corner gold glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#c5a059]/5 rounded-bl-full group-hover:bg-[#c5a059]/10 transition-colors pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-white mb-3 tracking-wide group-hover:text-[#d4af37] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                    {svc.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
