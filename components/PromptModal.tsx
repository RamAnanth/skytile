'use client';

interface PromptModalProps {
  prompt: string;
  onClose: () => void;
}

export default function PromptModal({ prompt, onClose }: PromptModalProps) {
  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-8 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-serif text-white mb-2">AI Prompt</h3>
            <p className="text-sm text-white/50 mb-4">Double-click the image to reveal this easter egg</p>
          </div>
          
          <div className="relative">
            <pre className="text-sm text-white/80 font-mono bg-white/5 p-6 rounded-xl border border-white/10 overflow-x-auto whitespace-pre-wrap">
              {prompt}
            </pre>
            <button
              onClick={handleCopyPrompt}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

