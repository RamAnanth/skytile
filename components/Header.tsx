'use client';

import type { CityState } from '@/lib/types';
import { INITIAL_CITY_STATE } from '@/lib/types';

interface HeaderProps {
  mode: 'single' | 'compare';
  onModeToggle: () => void;
  onTeleport: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export default function Header({ mode, onModeToggle, onTeleport, onReset, isLoading }: HeaderProps) {
  return (
    <header className="relative z-50 w-full">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xl font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          <img src="/favicon.ico" alt="" className="w-6 h-6" />
          SkyTile
        </button>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onModeToggle}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === 'compare' 
                ? 'bg-white text-black' 
                : 'glass-light hover:bg-white/10'
            }`}
          >
            {mode === 'compare' ? '✕ Close' : 'Compare'}
          </button>
          
          <button 
            onClick={onTeleport}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Flying...' : 'Teleport ✈'}
          </button>
        </div>
      </div>
    </header>
  );
}

