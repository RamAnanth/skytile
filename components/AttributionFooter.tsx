'use client';

interface AttributionFooterProps {
  slot1Prompt: string | null;
  slot2Prompt: string | null;
  onShowPrompt: (prompt: string) => void;
}

export default function AttributionFooter({ slot1Prompt, slot2Prompt, onShowPrompt }: AttributionFooterProps) {
  const suggestCityUrl = 'https://github.com/RamAnanth/skytile/issues/new?template=suggest-city.md';

  return (
    <div className="max-w-7xl mx-auto px-6 pb-8 text-center space-y-3">
      <p className="text-xs text-white/30">
        Powered by <span className="text-white/50 font-medium">nano-banana</span> and <span className="text-white/50 font-medium">Gemini Image Models</span>
      </p>
      <p className="text-xs text-white/20">
        Using <span className="text-white/40">Gemini 2.5 Flash</span>. For better quality results, try <span 
          className="text-white/40 cursor-pointer hover:text-white/60 transition-colors"
          onDoubleClick={() => {
            const prompt = slot1Prompt || slot2Prompt;
            if (prompt) {
              onShowPrompt(prompt);
            }
          }}
        >Gemini 3</span>.
      </p>
      <p className="text-xs text-white/20 pt-2">
        Want to add your city? <a 
          href={suggestCityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white/80 underline transition-colors"
        >
          Suggest a city
        </a>
      </p>
    </div>
  );
}

