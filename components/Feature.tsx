'use client';

interface FeatureProps {
  icon: string;
  title: string;
  desc: string;
}

export default function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="space-y-3">
      <span className="text-3xl text-orange-400">{icon}</span>
      <h3 className="text-xl font-semibold text-white/90">{title}</h3>
      <p className="text-white/50 leading-relaxed">{desc}</p>
    </div>
  );
}

