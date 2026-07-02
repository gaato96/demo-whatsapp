'use client';

import { useState } from 'react';
import { DemoPreset } from '@/lib/demoPresets';

interface DemoWelcomeProps {
  preset: DemoPreset;
  onStart: (businessName: string) => void;
}

export default function DemoWelcome({ preset, onStart }: DemoWelcomeProps) {
  const [businessName, setBusinessName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = businessName.trim() || preset.defaultName;
    onStart(finalName);
  };

  return (
    <div
      className={`min-h-screen h-screen-mobile bg-gradient-to-br ${preset.accentColor} flex flex-col items-center justify-center p-5 relative overflow-hidden`}
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/20 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md bg-slate-900/85 backdrop-blur-2xl border border-white/10 rounded-3xl px-6 py-8 shadow-2xl relative z-10 animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-5xl shadow-lg">
            {preset.icon}
          </div>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-3">
          <span className="bg-white/10 border border-white/15 text-white/90 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {preset.rubroLabel}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center mb-2">
          Demo Agente IA
        </h1>
        <p className="text-white/55 text-sm text-center mb-7 leading-relaxed max-w-xs mx-auto">
          {preset.tagline}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-[11px] font-bold uppercase tracking-wider mb-2 text-center">
              ¿Cómo se llama tu negocio?
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={preset.defaultName}
              autoComplete="organization"
              className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all font-semibold text-center"
            />
            <p className="text-white/30 text-[10px] text-center mt-1.5">
              Dejalo en blanco para usar: <em>{preset.defaultName}</em>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-extrabold py-4 rounded-xl shadow-lg transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-sm"
          >
            Comenzar Demo del Bot ⚡
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-center gap-3">
          <span className="text-[10px] text-white/30">Powered by</span>
          <span className="bg-[#00A884]/10 border border-[#00A884]/25 text-[#00A884] text-[10px] font-bold px-2.5 py-1 rounded-full">
            IA de WhatsApp v2 ✨
          </span>
        </div>
      </div>
    </div>
  );
}
