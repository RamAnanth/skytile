import { NextRequest, NextResponse } from 'next/server';

// Weather code mapping (WMO codes from Open-Meteo)
const weatherCodeMap: Record<number, { condition: string; description: string; icon: string }> = {
  0: { condition: 'Clear', description: 'clear sky', icon: '01d' },
  1: { condition: 'Clear', description: 'mainly clear', icon: '01d' },
  2: { condition: 'Clouds', description: 'partly cloudy', icon: '02d' },
  3: { condition: 'Clouds', description: 'overcast', icon: '04d' },
  45: { condition: 'Fog', description: 'foggy', icon: '50d' },
  48: { condition: 'Fog', description: 'depositing rime fog', icon: '50d' },
  51: { condition: 'Drizzle', description: 'light drizzle', icon: '09d' },
  53: { condition: 'Drizzle', description: 'moderate drizzle', icon: '09d' },
  55: { condition: 'Drizzle', description: 'dense drizzle', icon: '09d' },
  61: { condition: 'Rain', description: 'slight rain', icon: '10d' },
  63: { condition: 'Rain', description: 'moderate rain', icon: '10d' },
  65: { condition: 'Rain', description: 'heavy rain', icon: '10d' },
  71: { condition: 'Snow', description: 'slight snow', icon: '13d' },
  73: { condition: 'Snow', description: 'moderate snow', icon: '13d' },
  75: { condition: 'Snow', description: 'heavy snow', icon: '13d' },
  80: { condition: 'Rain', description: 'slight rain showers', icon: '09d' },
  81: { condition: 'Rain', description: 'moderate rain showers', icon: '09d' },
  82: { condition: 'Rain', description: 'violent rain showers', icon: '09d' },
  85: { condition: 'Snow', description: 'slight snow showers', icon: '13d' },
  86: { condition: 'Snow', description: 'heavy snow showers', icon: '13d' },
  95: { condition: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
  96: { condition: 'Thunderstorm', description: 'thunderstorm with hail', icon: '11d' },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!city && (!lat || !lon)) {
    return NextResponse.json(
      { error: 'City name or coordinates (lat, lon) are required' },
      { status: 400 }
    );
  }

  try {
    let latitude: number;
    let longitude: number;
    let cityName = '';
    let country = '';

    // If coordinates provided, use them directly
    if (lat && lon) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lon);
      // Use provided city name if available, otherwise it will be set from selected dropdown
      if (city) {
        cityName = city;
      }
    } else {
      // Geocode city name to get coordinates
      const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city!)}&count=1&language=en&format=json`;
      const geocodeResponse = await fetch(geocodeUrl);
      
      if (!geocodeResponse.ok) {
        throw new Error('Failed to geocode city');
      }

      const geocodeData = await geocodeResponse.json();
      
      if (!geocodeData.results || geocodeData.results.length === 0) {
        return NextResponse.json(
          { error: 'City not found' },
          { status: 404 }
        );
      }

      const location = geocodeData.results[0];
      latitude = location.latitude;
      longitude = location.longitude;
      cityName = location.name;
      country = location.country || '';
    }

    // Fetch current weather
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    const weatherCode = current.weather_code;
    const weatherInfo = weatherCodeMap[weatherCode] || { condition: 'Unknown', description: 'unknown', icon: '01d' };

    // Get timezone from weather data (Open-Meteo provides it)
    const timezone = weatherData.timezone || 'UTC';
    
    // Format current date in the city's local timezone
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: timezone
    });

    return NextResponse.json({
      city: cityName || city || 'Unknown', // Always include city name
      country: country,
      temperature: Math.round(current.temperature_2m),
      condition: weatherInfo.condition,
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      date: formattedDate,
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
