'use client';

import { useState, useRef, useEffect } from 'react';
import { predefinedCities, type City } from '@/lib/cities';

interface CitySelectorProps {
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

export default function CitySelector({ onCitySelect, selectedCity }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Update search query when selectedCity changes externally (e.g. via Teleport)
  useEffect(() => {
    if (selectedCity) {
      setSearchQuery(selectedCity.name);
    }
  }, [selectedCity]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = predefinedCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (city: City) => {
    onCitySelect(city);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onCitySelect({ name: searchQuery.trim(), country: '', lat: 0, lon: 0 });
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full z-50" ref={wrapperRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-4 py-4 text-base rounded-2xl glass-input"
        />
      </form>

      {/* Dropdown */}
      {isOpen && (searchQuery || filteredCities.length > 0) && (
        <div className="absolute mt-2 w-full max-h-72 overflow-y-auto rounded-xl glass-panel p-1 bg-slate-900/95 border border-white/10">
          {filteredCities.length > 0 ? (
            <div className="grid grid-cols-1">
              {filteredCities.map((city) => (
                <button
                  key={`${city.name}-${city.country}`}
                  onClick={() => handleSelect(city)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-left text-slate-200 hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">{city.name}</span>
                  <span className="text-xs text-slate-500">{city.country}</span>
                </button>
              ))}
            </div>
          ) : searchQuery && (
            <div className="px-4 py-3 text-slate-400 text-sm">
              Press Enter to search for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
