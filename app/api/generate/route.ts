import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildPrompt, type WeatherData } from '@/lib/prompt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const weatherData: WeatherData = body.weatherData;
    const cityName = body.cityName;

    // Validate required data
    if (!weatherData) {
      return NextResponse.json(
        { error: 'Weather data is required' },
        { status: 400 }
      );
    }

    if (!cityName) {
      return NextResponse.json(
        { error: 'City name is required' },
        { status: 400 }
      );
    }

    // Proceed with image generation
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key is not configured. Get one at https://aistudio.google.com/app/apikey' },
        { status: 500 }
      );
    }

    // Use the city name from the selected dropdown, not from weather API
    const promptData: WeatherData = {
      ...weatherData,
      city: cityName, // Override with selected city name
    };

    const model = process.env.GOOGLE_MODEL || 'gemini-2.5-flash-image';
    const prompt = buildPrompt(promptData);

    // Initialize Google GenAI client
    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    // Generate image using Gemini
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    // Extract image data from response
    if (!response.candidates || response.candidates.length === 0) {
      return NextResponse.json(
        { error: 'No response from image generation model' },
        { status: 500 }
      );
    }

    const parts = response.candidates[0]?.content?.parts;
    
    if (!parts || parts.length === 0) {
      return NextResponse.json(
        { error: 'No content parts in response' },
        { status: 500 }
      );
    }
    
    for (const part of parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || 'image/png';
        
        return NextResponse.json({
          image: `data:${mimeType};base64,${imageData}`,
          prompt: prompt,
        });
      }
    }

    return NextResponse.json(
      { error: 'No image data found in response' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
}
