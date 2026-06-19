'use client';

import { useState, useEffect } from 'react';
import { BusinessConfig } from '@/types';
import { RUBROS, DEFAULT_CONFIG } from '@/lib/constants';
import { saveConfig, loadConfig, saveApiKey, loadApiKey } from '@/lib/storage';
import RubroFields from './RubroFields';

interface ConfigPanelProps {
  onConfigChange: (config: BusinessConfig) => void;
  onApiKeyChange: (key: string) => void;
}

export default function ConfigPanel({ onConfigChange, onApiKeyChange }: ConfigPanelProps) {
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_CONFIG);
  const [apiKey, setApiKey] = useState('');
  const [isSynced, setIsSynced] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saveAnimation, setSaveAnimation] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedConfig = loadConfig();
    const savedKey = loadApiKey();
    setConfig(savedConfig);
    setApiKey(savedKey);
    onConfigChange(savedConfig);
    onApiKeyChange(savedKey);
    // Check if there's saved data
    if (savedConfig.businessName) {
      setIsSynced(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (field: keyof BusinessConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setIsSynced(false);
  };

  const updateRubroField = (key: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      rubroFields: { ...prev.rubroFields, [key]: value },
    }));
    setIsSynced(false);
  };

  const handleRubroChange = (rubroId: string) => {
    setConfig(prev => ({ ...prev, rubro: rubroId, rubroFields: {} }));
    setIsSynced(false);
  };

  const handleSave = () => {
    saveConfig(config);
    saveApiKey(apiKey);
    onConfigChange(config);
    onApiKeyChange(apiKey);
    setIsSynced(true);
    setSaveAnimation(true);
    setTimeout(() => setSaveAnimation(false), 2000);
  };

  const selectedRubro = RUBROS.find(r => r.id === config.rubro);

  return (
    <div className="h-full flex flex-col bg-white/[0.03] backdrop-blur-xl">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              Configurar Agente IA
            </h1>
            <p className="text-white/40 text-sm mt-1">Personaliza tu bot de WhatsApp</p>
          </div>
          {/* Sync badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            isSynced 
              ? 'bg-[#00A884]/20 text-[#00A884] border border-[#00A884]/30' 
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
            {isSynced ? '✅ Sincronizado' : '⚠️ Pendiente'}
          </div>
        </div>
      </div>

      {/* Scrollable form */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 custom-scrollbar">
        {/* Rubro selector */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Rubro del Negocio</label>
          <select
            value={config.rubro}
            onChange={(e) => handleRubroChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all appearance-none cursor-pointer"
          >
            {RUBROS.map(rubro => (
              <option key={rubro.id} value={rubro.id} className="bg-[#1e293b] text-white">
                {rubro.icon} {rubro.name}
              </option>
            ))}
          </select>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Nombre del Negocio *</label>
          <input
            type="text"
            value={config.businessName}
            onChange={(e) => updateField('businessName', e.target.value)}
            placeholder="Ej: Pizzería Don Juan"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all"
          />
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Horarios de Atención</label>
          <input
            type="text"
            value={config.schedule}
            onChange={(e) => updateField('schedule', e.target.value)}
            placeholder="Ej: Lunes a Viernes 9:00-18:00, Sábados 10:00-14:00"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Dirección / Ubicación</label>
          <input
            type="text"
            value={config.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Ej: Av. Corrientes 1234, CABA"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all"
          />
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Teléfono</label>
            <input
              type="text"
              value={config.contactPhone}
              onChange={(e) => updateField('contactPhone', e.target.value)}
              placeholder="Ej: +54 11 1234-5678"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
            <input
              type="email"
              value={config.contactEmail}
              onChange={(e) => updateField('contactEmail', e.target.value)}
              placeholder="info@negocio.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all"
            />
          </div>
        </div>

        {/* Social Media */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Redes Sociales</label>
          <input
            type="text"
            value={config.socialMedia}
            onChange={(e) => updateField('socialMedia', e.target.value)}
            placeholder="Ej: @pizzeriadonjuan en Instagram y Facebook"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all"
          />
        </div>

        {/* Payment Methods */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Medios de Pago</label>
          <input
            type="text"
            value={config.paymentMethods}
            onChange={(e) => updateField('paymentMethods', e.target.value)}
            placeholder="Ej: Efectivo, Mercado Pago, Tarjetas de crédito/débito, Transferencia"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all"
          />
        </div>

        {/* Divider for rubro-specific fields */}
        <div className="border-t border-white/10 pt-4">
          <RubroFields
            rubroId={config.rubro}
            values={config.rubroFields}
            onChange={updateRubroField}
          />
        </div>

        {/* Welcome Message */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Mensaje de Bienvenida</label>
          <textarea
            value={config.welcomeMessage}
            onChange={(e) => updateField('welcomeMessage', e.target.value)}
            placeholder="Ej: ¡Hola! 👋 Bienvenido a Pizzería Don Juan. ¿En qué puedo ayudarte hoy?"
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all resize-none"
          />
        </div>

        {/* FAQ */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Preguntas Frecuentes</label>
          <textarea
            value={config.faq}
            onChange={(e) => updateField('faq', e.target.value)}
            placeholder={`Ej:\n¿Hacen delivery? Sí, hasta 5km del local\n¿Aceptan tarjeta? Sí, todas las tarjetas\n¿Tienen estacionamiento? Sí, estacionamiento gratuito`}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all resize-none"
          />
        </div>

        {/* Bot Personality */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">
            🎭 Instrucciones / Personalidad del Bot
          </label>
          <textarea
            value={config.botPersonality}
            onChange={(e) => updateField('botPersonality', e.target.value)}
            placeholder={`Ej: Sé muy amable y cercano. Usa emojis frecuentemente. Tutea al cliente. Si preguntan por algo que no sabés, sugerí que llamen al local. Siempre intentá cerrar una venta o reserva.`}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all resize-none"
          />
        </div>

        {/* Advanced Section */}
        <div className="border-t border-white/10 pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-white/50 hover:text-white/70 text-sm transition-colors"
          >
            <span className={`transform transition-transform ${showAdvanced ? 'rotate-90' : ''}`}>▶</span>
            ⚙️ Configuración Avanzada
          </button>
          {showAdvanced && (
            <div className="mt-3 animate-fade-in">
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                🔑 API Key de Gemini (opcional)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsSynced(false);
                }}
                placeholder="Dejar vacío para usar la key por defecto"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#00A884]/60 focus:ring-1 focus:ring-[#00A884]/30 transition-all font-mono"
              />
              <p className="text-white/30 text-xs mt-1">Se guarda localmente en tu navegador de forma segura.</p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="px-6 py-4 border-t border-white/10">
        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-xl font-semibold text-white text-sm transition-all relative overflow-hidden ${
            saveAnimation
              ? 'bg-[#00A884] scale-[0.98]'
              : 'bg-gradient-to-r from-[#00A884] to-[#075E54] hover:from-[#00C49A] hover:to-[#128C7E] hover:shadow-lg hover:shadow-[#00A884]/25 active:scale-[0.98]'
          }`}
        >
          {saveAnimation ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ¡Agente Sincronizado!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              ✨ Guardar y Sincronizar Agente
            </span>
          )}
          {/* Pulse animation on the button */}
          {!saveAnimation && (
            <span className="absolute inset-0 rounded-xl animate-pulse-ring"></span>
          )}
        </button>
      </div>
    </div>
  );
}
