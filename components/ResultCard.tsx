'use client';

import type { CityState } from '@/lib/types';

interface ResultCardProps {
  state: CityState;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-white/40 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-medium text-white/80">{value}</p>
    </div>
  );
}

export default function ResultCard({ state, onToast }: ResultCardProps) {
  if (!state.image || !state.weather) return null;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = state.image!;
    link.download = `${state.city?.name || 'city'}-weather-scene.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('Image downloaded!', 'success');
  };

  const handleCopyImage = async () => {
    try {
      const response = await fetch(state.image!);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      onToast('Image copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback to download
      handleDownload();
    }
  };

  return (
    <div className="group relative animate-in zoom-in-95 fade-in duration-700">
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40">
        
        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img 
            src={state.image} 
            alt={state.city?.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Action buttons - Top right */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleDownload}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/80 transition-all hover:scale-110"
            title="Download image"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button
            onClick={handleCopyImage}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/80 transition-all hover:scale-110"
            title="Copy image"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        
        {/* Info Overlay - Always visible at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/50 text-sm mb-1">{state.weather.date}</p>
              <h2 className="text-3xl md:text-4xl font-serif text-white">{state.city?.name}</h2>
              <p className="text-white/60 mt-1">{state.weather?.condition} · {state.weather?.description}</p>
            </div>
            <div className="text-right">
              <span className="text-5xl md:text-6xl font-light text-gradient-warm">{state.weather.temperature}°</span>
            </div>
          </div>
          
          {/* Stats row */}
          <div className="flex gap-6 mt-4 pt-4 border-t border-white/10">
            <Stat label="Humidity" value={`${state.weather.humidity}%`} />
            <Stat label="Wind" value={`${state.weather.windSpeed} km/h`} />
          </div>
        </div>
      </div>
    </div>
  );
}

