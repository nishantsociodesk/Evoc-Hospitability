import React from 'react';

export default function ClientLogos() {
  const brands = [
    { name: 'CAFÉ NOIR', sub: 'COFFEE & BISTRO' },
    { name: 'THE FERN', sub: 'HOTELS & RESORTS' },
    { name: 'URBAN TADKA', sub: 'RESTAURANT' },
    { name: 'SALT', sub: 'KITCHEN & BAR' },
    { name: 'THE SKYLINE', sub: 'RESORT & SPA' },
    { name: 'BREW HOUSE', sub: 'CAFÉ' },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-[#0b0b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#a78b54] font-medium mb-8">
          TRUSTED BY LEADING HOSPITALITY BRANDS
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center py-2 px-3 group opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
            >
              <span className="font-serif text-lg sm:text-xl font-semibold tracking-wider text-[#e6dbbf] group-hover:text-[#d4af37] transition-colors">
                {brand.name}
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-gray-500 uppercase mt-0.5 group-hover:text-gray-400">
                {brand.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
