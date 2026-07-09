'use client';

import { useState, useEffect } from 'react';
import { DEMO_PRESETS } from '@/lib/demoPresets';

export default function DemosDashboard() {
  const [origin, setOrigin] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleCopyLink = (slug: string) => {
    const url = `${origin}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-6 relative overflow-y-auto" style={{ height: '100dvh' }}>
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00A884]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 mb-4 backdrop-blur-md">
            <span>🔗</span> Gestor de Enlaces Demo
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Demos Preconfiguradas para Clientes
          </h1>
          <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
            Enviá estos enlaces directos a tus clientes. Al ingresar, solo completarán el nombre de su negocio y probarán el bot adaptado a su rubro.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_PRESETS.map((demo) => {
            const demoUrl = `${origin}/${demo.slug}`;
            return (
              <div 
                key={demo.slug}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Top card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {demo.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/30 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full">
                      /{demo.slug}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-1.5">
                    {demo.defaultName}
                  </h3>
                  <p className="text-xs text-[#00A884] font-medium mb-3">
                    {demo.rubroLabel}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">
                    {demo.tagline}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2.5 mt-auto">
                  {/* Link field display */}
                  <div className="bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-[10px] text-white/40 font-mono truncate select-all">
                    {origin ? demoUrl : `/${demo.slug}`}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCopyLink(demo.slug)}
                      className={`py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        copiedSlug === demo.slug
                          ? 'bg-[#00A884] text-white'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {copiedSlug === demo.slug ? (
                        <>Copiado ✓</>
                      ) : (
                        <>Copiar Link 🔗</>
                      )}
                    </button>

                    <a
                      href={`/${demo.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 rounded-lg bg-gradient-to-r from-[#00A884] to-[#075E54] hover:from-[#00C49A] hover:to-[#128C7E] text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1 shadow-md shadow-[#00A884]/5 cursor-pointer"
                    >
                      Probar Demo ⚡
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to home */}
        <div className="mt-16 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
          >
            ← Volver a la Simulación Principal
          </a>
        </div>
      </div>
    </main>
  );
}
