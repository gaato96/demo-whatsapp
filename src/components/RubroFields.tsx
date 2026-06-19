'use client';

import { RUBROS } from '@/lib/constants';

interface RubroFieldsProps {
  rubroId: string;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export default function RubroFields({ rubroId, values, onChange }: RubroFieldsProps) {
  const rubro = RUBROS.find(r => r.id === rubroId);
  if (!rubro || rubro.fields.length === 0) return null;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-white/80">
        <span className="text-lg">{rubro.icon}</span>
        <h3 className="text-sm font-semibold uppercase tracking-wider">Campos de {rubro.name}</h3>
      </div>
      {rubro.fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-white/70 mb-1.5">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              value={values[field.key] || ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all resize-none"
            />
          ) : (
            <input
              type="text"
              value={values[field.key] || ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all"
            />
          )}
        </div>
      ))}
    </div>
  );
}
