'use client';

import type { City } from '@/lib/cities';

interface CityCardProps {
  city: City;
  index: number;
  onClick: () => void;
}

export default function CityCard({ city, index, onClick }: CityCardProps) {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 50}ms` }}
      className="group relative p-6 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-in fade-in slide-in-from-bottom-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/5" />
      
      <div className="relative">
        <h3 className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors mb-1">
          {city.name}
        </h3>
        <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
          {city.country}
        </p>
      </div>
      
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
        <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

