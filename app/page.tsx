'use client';

import { useState, useCallback } from 'react';
import CitySelector from '@/components/CitySelector';
import ComparisonActions from '@/components/ComparisonActions';
import Toast from '@/components/Toast';
import PromptModal from '@/components/PromptModal';
import LandingPage from '@/components/LandingPage';
import ResultCard from '@/components/ResultCard';
import LoadingCard from '@/components/LoadingCard';
import Header from '@/components/Header';
import AmbientBackground from '@/components/AmbientBackground';
import AttributionFooter from '@/components/AttributionFooter';
import { type City, predefinedCities } from '@/lib/cities';
import { type CityState, INITIAL_CITY_STATE } from '@/lib/types';
import { useCityData } from '@/hooks/useCityData';

export default function Home() {
  const [mode, setMode] = useState<'single' | 'compare'>('single');
  const [slot1, setSlot1] = useState<CityState>(INITIAL_CITY_STATE);
  const [slot2, setSlot2] = useState<CityState>(INITIAL_CITY_STATE);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);

  const { fetchCityData } = useCityData();

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  }, []);

  const handleShowPrompt = useCallback((prompt: string) => {
    setCurrentPrompt(prompt);
    setShowPrompt(true);
  }, []);

  const handleTeleport = useCallback(() => {
    setMode('single');
    const currentName = slot1.city?.name;
    let randomCity = predefinedCities[Math.floor(Math.random() * predefinedCities.length)];
    if (randomCity.name === currentName) {
      randomCity = predefinedCities[Math.floor(Math.random() * predefinedCities.length)];
    }
    fetchCityData(randomCity, setSlot1);
  }, [slot1.city?.name, fetchCityData]);

  const handleReset = useCallback(() => {
    setSlot1(INITIAL_CITY_STATE);
    setSlot2(INITIAL_CITY_STATE);
    setMode('single');
  }, []);

  const hasContent = slot1.image || slot1.isLoading;
  const showLanding = !hasContent && mode === 'single';

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white noise-overlay">
      
      <AmbientBackground imageUrl={slot1.image} />

      <Header
        mode={mode}
        onModeToggle={() => setMode(mode === 'single' ? 'compare' : 'single')}
        onTeleport={handleTeleport}
        onReset={handleReset}
        isLoading={slot1.isLoading}
      />

      <main className="relative z-10">
        {showLanding ? (
          <LandingPage 
            onCitySelect={(city) => fetchCityData(city, setSlot1)} 
            onTeleport={handleTeleport}
          />
        ) : (
          <>
            <div className={`max-w-7xl mx-auto px-6 py-8 ${mode === 'compare' ? 'grid md:grid-cols-2 gap-8' : ''}`}>
              
              {/* Comparison Actions */}
              {mode === 'compare' && (
                <ComparisonActions slot1={slot1} slot2={slot2} onToast={showToast} />
              )}
              
              {/* Slot 1 */}
              <div className={`${mode === 'single' ? 'max-w-3xl mx-auto' : ''}`}>
                <div className="mb-6">
                  <CitySelector onCitySelect={(city) => fetchCityData(city, setSlot1)} selectedCity={slot1.city} />
                </div>
                
                {slot1.isLoading ? (
                  <LoadingCard />
                ) : slot1.image ? (
                  <ResultCard 
                    state={slot1} 
                    onToast={showToast}
                  />
                ) : (
                  <div className="aspect-square rounded-3xl border border-white/5 bg-white/[0.02] flex items-center justify-center">
                    <p className="text-white/30 text-lg">Search for a city above</p>
                  </div>
                )}
              </div>

              {/* Slot 2 (Compare Mode) */}
              {mode === 'compare' && (
                <div className="animate-in slide-in-from-right duration-500">
                  <div className="mb-6">
                    <CitySelector onCitySelect={(city) => fetchCityData(city, setSlot2)} selectedCity={slot2.city} />
                  </div>
                  
                  {slot2.isLoading ? (
                    <LoadingCard />
                  ) : slot2.image ? (
                    <ResultCard 
                      state={slot2} 
                      onToast={showToast}
                    />
                  ) : (
                    <div className="aspect-square rounded-3xl border border-white/5 bg-white/[0.02] flex items-center justify-center">
                      <p className="text-white/30 text-lg">Search for a city above</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <AttributionFooter
              slot1Prompt={slot1.prompt}
              slot2Prompt={slot2.prompt}
              onShowPrompt={handleShowPrompt}
            />
          </>
        )}
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Prompt Modal (Easter Egg) */}
      {showPrompt && currentPrompt && (
        <PromptModal prompt={currentPrompt} onClose={() => setShowPrompt(false)} />
      )}
    </div>
  );
}
