import React from 'react';
import { ArrowRight, ArrowLeft, Award, TrendingUp, Users, Sparkles, Building2, Utensils, CheckCircle2 } from 'lucide-react';

export default function AboutPage({ onBackToHome, onOpenBookCall }) {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Hospitality-First DNA',
      desc: 'We are not a generic marketing agency. We specialize 100% in hospitality — understanding dining room economics, table turn rates, revPASH, and guest lifetime value.',
    },
    {
      icon: TrendingUp,
      title: 'Predictable Revenue Engines',
      desc: 'We build end-to-end performance marketing funnels designed to fill weekday tables, scale banquet bookings, and generate high-ticket private event inquiries.',
    },
    {
      icon: Award,
      title: 'Boutique Creative Standards',
      desc: 'From cinematic dining films to mouth-watering food photography, we create scroll-stopping visual assets that capture the authentic atmosphere of your venue.',
    },
    {
      icon: Users,
      title: 'Dedicated Growth Partners',
      desc: 'Every brand is paired with a dedicated strategist, media buyer, and content team who act as a relentless extension of your hospitality management team.',
    },
  ];

  const team = [
    {
      name: 'Rohan Sen',
      role: 'Founder & Hospitality Growth Director',
      bio: 'Former luxury restaurant operator turned growth strategist. Scaled 30+ dining & resort concepts across Delhi NCR and Mumbai.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Aanya Singhania',
      role: 'Head of Culinary & Visual Storytelling',
      bio: 'Award-winning food and hospitality visual director. Directs campaigns for Michelin-guide chefs, boutique hotels, and specialty cafes.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Kabir Varma',
      role: 'Head of Performance Marketing',
      bio: 'Performance marketing specialist managing over ₹5Cr+ in high-return ad spend specifically for food, beverage, and hospitality destinations.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#09090b] text-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#d4af37] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">
              ABOUT EVOC HOSPITALITY
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12]">
              Crafting Unforgettable Experiences. <br />
              <span className="italic text-[#d4af37]">Multiplying Venue Revenue.</span>
            </h1>
            <p className="mt-6 text-gray-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              EVOC Hospitality is India's dedicated growth and performance marketing partner for
              ambitious cafés, fine-dining restaurants, luxury hotels, and boutique resorts. We exist
              to turn culinary passion and beautiful spaces into scalable, highly profitable businesses.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBookCall}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-widest uppercase rounded-sm transition-all shadow-[0_4px_20px_rgba(197,160,89,0.3)]"
              >
                <span>BOOK A STRATEGY CALL</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={onBackToHome}
                className="inline-flex items-center justify-center px-6 py-3 border border-white/15 hover:border-[#d4af37] text-gray-300 hover:text-white text-xs tracking-widest uppercase rounded-sm transition-all"
              >
                <span>EXPLORE OUR WORK</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                alt="Hospitality Ambiance"
                className="w-full h-96 object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold block">
                  THE EVOC PHILOSOPHY
                </span>
                <p className="text-sm font-serif text-white italic mt-1">
                  "In hospitality, every empty seat is lost revenue that never returns. Our mission is to ensure your venue is always the first choice."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics / Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-6 rounded-sm bg-[#121217] border border-white/5 mb-24 text-center">
          <div>
            <span className="font-serif text-3xl sm:text-4xl text-[#d4af37] font-semibold block">
              50+
            </span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 block">
              Brands Scaled
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl sm:text-4xl text-[#d4af37] font-semibold block">
              ₹120Cr+
            </span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 block">
              Revenue Generated
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl sm:text-4xl text-[#d4af37] font-semibold block">
              2.9X
            </span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 block">
              Average Growth Multiplier
            </span>
          </div>
          <div>
            <span className="font-serif text-3xl sm:text-4xl text-[#d4af37] font-semibold block">
              12
            </span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 mt-1 block">
              Cities Across India
            </span>
          </div>
        </div>

        {/* Our Story / Detailed Copy */}
        <div className="max-w-4xl mx-auto mb-24 space-y-8">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-2">
              OUR JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Why We Started EVOC Hospitality
            </h2>
          </div>

          <div className="prose prose-invert max-w-none text-gray-300 font-light text-sm sm:text-base leading-relaxed space-y-6">
            <p>
              Running a café, restaurant, or boutique resort is one of the most demanding yet rewarding
              endeavors in business. Hospitality operators pour their hearts into interior aesthetics,
              menu engineering, culinary craftsmanship, and guest warmth. Yet, all too often,
              exceptional venues struggle with low weekday footfalls, inconsistent weekend covers, and
              unpredictable foot traffic.
            </p>
            <p>
              Traditional marketing agencies treat a craft cocktail bar the same way they treat a software
              company or an e-commerce store. They boost generic Instagram posts, rely on vanity likes,
              and fail to deliver paying guests who walk through the doors and re-order.
            </p>
            <p>
              EVOC was born to bridge this exact gap. By combining high-definition visual production,
              localized geo-fenced performance marketing, and automated guest reservation systems, we
              turn hospitality brands into dominant local destinations with predictable returns.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-2">
              HOW WE OPERATE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              The Four Pillars of Our Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-sm bg-[#121217] border border-white/5 hover:border-[#c5a059]/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-xl text-white font-medium mb-3 group-hover:text-[#d4af37] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-2">
              THE STRATEGISTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Meet Our Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="rounded-sm overflow-hidden bg-[#121217] border border-white/5 hover:border-[#d4af37]/40 transition-all flex flex-col group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium group-hover:text-[#d4af37] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-[#c5a059] font-medium mt-1 mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-sm bg-gradient-to-r from-[#141419] via-[#101014] to-[#141419] border border-[#c5a059]/30 text-center max-w-4xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-2">
            LET'S COLLABORATE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-4">
            Ready to Multiply Your Hospitality Revenue?
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Schedule a free 30-minute growth audit with our senior hospitality team to explore customized footfall and revenue acceleration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBookCall}
              className="px-8 py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-widest uppercase rounded-sm transition-all shadow-[0_4px_25px_rgba(197,160,89,0.35)]"
            >
              BOOK A STRATEGY CALL →
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-3.5 border border-white/15 hover:border-gray-400 text-gray-300 text-xs tracking-widest uppercase rounded-sm transition-all"
            >
              RETURN TO HOME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
