'use client';

export default function LoadingCard() {
  return (
    <div className="aspect-square rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-6 overflow-hidden relative">
      {/* Animated gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 animate-pulse" />
      
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        <div className="absolute inset-0 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-white/70">Generating weather scene</p>
        <p className="text-sm text-white/40">AI is creating the visualization...</p>
      </div>
    </div>
  );
}

