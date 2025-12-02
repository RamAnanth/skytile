export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  date: string;
  icon?: string;
}

export function buildPrompt(weatherData: WeatherData): string {
  const { city, temperature, date, condition } = weatherData;
  
  return `Present a clear, 45° top-down isometric miniature 3D cartoon scene of ${city}, featuring its most iconic landmarks and architectural elements. Use soft, refined textures with realistic PBR materials and gentle, lifelike lighting and shadows. Integrate the current weather conditions directly into the city environment to create an immersive atmospheric mood.

Use a clean, minimalistic composition with a soft, solid-colored background.

At the top-center, place the title "${city}" in large bold text, a prominent weather icon representing ${condition} beneath it, then the date ${date} (small text) and temperature ${Math.round(temperature)}°C (medium text).

All text must be centered with consistent spacing, and may subtly overlap the tops of the buildings.

Square 1080x1080 dimension.`;
}
