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
    <div className={`min-h-screen bg-gradient-to-br ${preset.accentColor} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in text-center">
        {/* Category Icon Badge */}
        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg animate-bounce">
          {preset.icon}
        </div>

        {/* Tagline */}
        <div className="mb-2">
          <span className="bg-white/10 border border-white/10 text-white/90 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {preset.rubroLabel}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
          Simulador Agente IA
        </h1>
        <p className="text-white/60 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
          {preset.tagline}
        </p>

        {/* Name input form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-md mx-auto">
          <div>
            <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-2">
              ¿Cómo se llama tu negocio?
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={`Ej: ${preset.defaultName}`}
              className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all font-medium text-center text-lg"
            />
            <p className="text-white/30 text-[10px] text-center mt-2 leading-relaxed">
              Si lo dejás en blanco, usaremos el nombre por defecto: <strong>{preset.defaultName}</strong>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            Comenzar Demo del Bot
            <span className="text-lg">⚡</span>
          </button>
        </form>

        {/* Footer badges */}
        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-4">
          <span className="text-[10px] text-white/40">Powered by</span>
          <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            Gemini 2.5 Flash ✨
          </span>
        </div>
      </div>
    </div>
  );
}
