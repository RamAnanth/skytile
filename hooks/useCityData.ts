import { useCallback } from 'react';
import type { City } from '@/lib/cities';
import type { CityState } from '@/lib/types';

export function useCityData() {
  const fetchCityData = useCallback(async (
    city: City, 
    slotSetter: React.Dispatch<React.SetStateAction<CityState>>
  ) => {
    slotSetter(prev => ({ ...prev, isLoading: true, error: null, city, image: null }));
    
    // Scroll to top when starting to load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      let url = '/api/weather?';
      if (city.lat && city.lon) {
        url += `lat=${city.lat}&lon=${city.lon}&city=${encodeURIComponent(city.name)}`;
      } else {
        url += `city=${encodeURIComponent(city.name)}`;
      }

      const weatherResponse = await fetch(url);
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        throw new Error(errorData.error || 'Failed to fetch weather');
      }

      const weatherData = await weatherResponse.json();
      slotSetter(prev => ({ ...prev, weather: weatherData }));

      const genResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weatherData, cityName: city.name }),
      });

      if (!genResponse.ok) {
        const errorData = await genResponse.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const result = await genResponse.json();
      slotSetter(prev => ({ ...prev, image: result.image, prompt: result.prompt || null, isLoading: false }));
    } catch (err) {
      slotSetter(prev => ({ 
        ...prev, 
        error: err instanceof Error ? err.message : 'Something went wrong',
        isLoading: false 
      }));
    }
  }, []);

  return { fetchCityData };
}

