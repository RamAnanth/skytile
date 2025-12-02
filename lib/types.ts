import type { City } from './cities';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  icon?: string;
  humidity: number;
  windSpeed: number;
  date: string;
}

export interface CityState {
  city: City | null;
  weather: WeatherData | null;
  image: string | null;
  prompt: string | null;
  isLoading: boolean;
  error: string | null;
}

export const INITIAL_CITY_STATE: CityState = {
  city: null,
  weather: null,
  image: null,
  prompt: null,
  isLoading: false,
  error: null,
};

