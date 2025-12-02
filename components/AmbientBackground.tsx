'use client';

interface AmbientBackgroundProps {
  imageUrl: string | null;
}

export default function AmbientBackground({ imageUrl }: AmbientBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {imageUrl ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center scale-125 blur-[100px] opacity-40"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </>
      ) : (
        <>
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-orange-500/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/6 rounded-full blur-[150px]" />
          <div className="absolute top-[30%] right-[20%] w-[30vw] h-[30vw] bg-rose-500/5 rounded-full blur-[120px]" />
        </>
      )}
    </div>
  );
}

