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

type AccordionSection = 'business' | 'rubro' | 'bot' | 'advanced';

export default function ConfigPanel({ onConfigChange, onApiKeyChange }: ConfigPanelProps) {
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_CONFIG);
  const [apiKey, setApiKey] = useState('');
  const [isSynced, setIsSynced] = useState(false);
  const [saveAnimation, setSaveAnimation] = useState(false);
  
  // UX: Accordion state
  const [activeSection, setActiveSection] = useState<AccordionSection>('business');

  // States for trade-in options editor
  const [newModel, setNewModel] = useState('');
  const [newMin, setNewMin] = useState('');
  const [newMax, setNewMax] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedConfig = loadConfig();
    const savedKey = loadApiKey();
    setConfig(savedConfig);
    setApiKey(savedKey);
    onConfigChange(savedConfig);
    onApiKeyChange(savedKey);
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

  const toggleSection = (section: AccordionSection) => {
    setActiveSection(prev => (prev === section ? 'business' : section));
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">⚙️</span>
              Configurar Agente IA
            </h1>
            <p className="text-white/40 text-xs mt-0.5">Personaliza el comportamiento del bot</p>
          </div>
          {/* Sync badge */}
          <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
            isSynced 
              ? 'bg-[#00A884]/20 text-[#00A884] border border-[#00A884]/20' 
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
          }`}>
            {isSynced ? 'Sincronizado' : 'Modificado'}
          </div>
        </div>
      </div>

      {/* Accordion form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        
        {/* Section 1: Business Details */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
          <button
            onClick={() => toggleSection('business')}
            className={`w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/80 transition-colors ${
              activeSection === 'business' ? 'bg-white/5 border-b border-white/10 text-white' : 'hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🏢</span> Datos del Negocio
            </span>
            <span className={`text-[10px] transition-transform ${activeSection === 'business' ? 'rotate-90' : ''}`}>▶</span>
          </button>
          
          {activeSection === 'business' && (
            <div className="p-4 space-y-4 animate-fade-in text-xs">
              {/* Rubro Selector */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Rubro del Negocio</label>
                <select
                  value={config.rubro}
                  onChange={(e) => handleRubroChange(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#00A884]/60 transition-all cursor-pointer"
                >
                  {RUBROS.map(rubro => (
                    <option key={rubro.id} value={rubro.id} className="bg-[#111b21] text-white">
                      {rubro.icon} {rubro.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Nombre del Negocio *</label>
                <input
                  type="text"
                  value={config.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  placeholder="Ej: iPhones Tucumán"
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all"
                />
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Horarios de Atención</label>
                <input
                  type="text"
                  value={config.schedule}
                  onChange={(e) => updateField('schedule', e.target.value)}
                  placeholder="Ej: L-V 9:00-19:00, Sáb 9:00-13:00"
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Dirección / Local</label>
                <input
                  type="text"
                  value={config.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Ej: San Martín 450, Piso 1"
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white/60 mb-1.5 font-medium">Teléfono</label>
                  <input
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => updateField('contactPhone', e.target.value)}
                    placeholder="+54 381 123-4567"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-1.5 font-medium">Email</label>
                  <input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => updateField('contactEmail', e.target.value)}
                    placeholder="contacto@negocio.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Redes Sociales</label>
                <input
                  type="text"
                  value={config.socialMedia}
                  onChange={(e) => updateField('socialMedia', e.target.value)}
                  placeholder="Instagram: @iphones.tuc"
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Medios de Pago</label>
                <input
                  type="text"
                  value={config.paymentMethods}
                  onChange={(e) => updateField('paymentMethods', e.target.value)}
                  placeholder="Efectivo (USD/ARS), Transferencia, Tarjetas"
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Rubro Settings & Inventory Config */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
          <button
            onClick={() => toggleSection('rubro')}
            className={`w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/80 transition-colors ${
              activeSection === 'rubro' ? 'bg-white/5 border-b border-white/10 text-white' : 'hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🔧</span> Ajustes Específicos del Rubro
            </span>
            <span className={`text-[10px] transition-transform ${activeSection === 'rubro' ? 'rotate-90' : ''}`}>▶</span>
          </button>
          
          {activeSection === 'rubro' && (
            <div className="p-4 space-y-4 animate-fade-in text-xs">
              {/* Dynamic fields */}
              <RubroFields
                rubroId={config.rubro}
                values={config.rubroFields}
                onChange={updateRubroField}
              />

              {/* iPhone Trade-In Config Table */}
              {config.rubro === 'iphones' && (
                <div className="border-t border-white/5 pt-4 space-y-3">
                  <span className="block text-xs font-semibold text-purple-400 uppercase tracking-wider">📱 Cotizador de Canjes (USD)</span>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    Configurá los modelos que aceptás en parte de pago y sus rangos mínimos/máximos. El bot los usará para regatear con el cliente.
                  </p>
                  
                  {/* List of current trade-in settings */}
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                    {(config.iphoneTradeInSettings || []).map((setting, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-950/40 border border-white/5 rounded-lg p-2 text-[10px] text-white">
                        <span className="font-semibold flex-1 truncate">{setting.model}</span>
                        <span className="text-white/40">Min:</span>
                        <span className="text-emerald-400 font-medium">${setting.minPrice}</span>
                        <span className="text-white/40">Max:</span>
                        <span className="text-emerald-400 font-medium">${setting.maxPrice}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (config.iphoneTradeInSettings || []).filter((_, i) => i !== idx);
                            setConfig(prev => ({ ...prev, iphoneTradeInSettings: updated }));
                            setIsSynced(false);
                          }}
                          className="text-red-400 hover:text-red-300 font-bold ml-1 cursor-pointer transition-colors"
                          title="Eliminar"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {(config.iphoneTradeInSettings || []).length === 0 && (
                      <p className="text-[10px] text-white/30 italic text-center py-2">No hay modelos de canje cargados.</p>
                    )}
                  </div>

                  {/* Add new trade-in row */}
                  <div className="bg-slate-950/30 border border-white/5 rounded-lg p-2.5 space-y-2">
                    <span className="block text-[10px] font-semibold text-white/50">Cargar Modelo de Canje</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Modelo (ej: iPhone 13 Pro)"
                        value={newModel}
                        onChange={(e) => setNewModel(e.target.value)}
                        className="col-span-2 bg-slate-950 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-[#00A884]"
                      />
                      <input
                        type="number"
                        placeholder="Mínimo USD"
                        value={newMin}
                        onChange={(e) => setNewMin(e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-[#00A884]"
                      />
                      <input
                        type="number"
                        placeholder="Máximo USD"
                        value={newMax}
                        onChange={(e) => setNewMax(e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:border-[#00A884]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const minVal = Number(newMin);
                          const maxVal = Number(newMax);
                          if (newModel.trim() && minVal > 0 && maxVal >= minVal) {
                            const updated = [...(config.iphoneTradeInSettings || []), { model: newModel.trim(), minPrice: minVal, maxPrice: maxVal }];
                            setConfig(prev => ({ ...prev, iphoneTradeInSettings: updated }));
                            setIsSynced(false);
                            setNewModel('');
                            setNewMin('');
                            setNewMax('');
                          } else {
                            alert('Valores incorrectos. El Mínimo debe ser > 0 y el Máximo >= Mínimo.');
                          }
                        }}
                        className="col-span-2 bg-[#00A884] hover:bg-[#059669] text-white font-bold text-xs rounded py-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        Añadir Modelo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Bot Response & Personality */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
          <button
            onClick={() => toggleSection('bot')}
            className={`w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/80 transition-colors ${
              activeSection === 'bot' ? 'bg-white/5 border-b border-white/10 text-white' : 'hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>💬</span> Comportamiento y Respuestas
            </span>
            <span className={`text-[10px] transition-transform ${activeSection === 'bot' ? 'rotate-90' : ''}`}>▶</span>
          </button>
          
          {activeSection === 'bot' && (
            <div className="p-4 space-y-4 animate-fade-in text-xs">
              {/* Welcome Message */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Mensaje de Bienvenida</label>
                <textarea
                  value={config.welcomeMessage}
                  onChange={(e) => updateField('welcomeMessage', e.target.value)}
                  placeholder="Ej: ¡Hola! 👋 Bienvenido a iPhones Tucumán. ¿Estás buscando comprar un equipo o entregar el tuyo en parte de pago?"
                  rows={3}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all resize-none"
                />
              </div>

              {/* FAQ */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Preguntas Frecuentes (FAQ)</label>
                <textarea
                  value={config.faq}
                  onChange={(e) => updateField('faq', e.target.value)}
                  placeholder={`Ej:\n¿Hacen envíos? Sí, gratis en San Miguel de Tucumán\n¿Tienen garantía? Sí, 90 días escrita\n¿Toman equipos con pantalla cambiada? No, solo originales.`}
                  rows={4}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all resize-none"
                />
              </div>

              {/* Bot Personality */}
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Instrucciones y Personalidad del Bot</label>
                <textarea
                  value={config.botPersonality}
                  onChange={(e) => updateField('botPersonality', e.target.value)}
                  placeholder="Ej: Sé amable y directo. Usa modismos argentinos de forma muy sutil (como che o vistes) si te parece natural. Siempre mantén el tono profesional de un vendedor de alta gama."
                  rows={3}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Advanced config (API Key) */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
          <button
            onClick={() => toggleSection('advanced')}
            className={`w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/80 transition-colors ${
              activeSection === 'advanced' ? 'bg-white/5 border-b border-white/10 text-white' : 'hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🔑</span> Configuración de API Key
            </span>
            <span className={`text-[10px] transition-transform ${activeSection === 'advanced' ? 'rotate-90' : ''}`}>▶</span>
          </button>
          
          {activeSection === 'advanced' && (
            <div className="p-4 space-y-3 animate-fade-in text-xs">
              <div>
                <label className="block text-white/60 mb-1.5 font-medium">Clave de API IA (Opcional)</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setIsSynced(false);
                  }}
                  placeholder="Ingresa tu clave de API"
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 outline-none focus:border-[#00A884]/60 transition-all font-mono"
                />
                <p className="text-white/30 text-[10px] leading-relaxed mt-1">
                  Opcional. Si se deja vacía, la demo usará la clave de conexión por defecto. Se guarda de forma local en tu navegador.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Save Button */}
      <div className="px-4 py-4 border-t border-white/10 bg-slate-950/20">
        <button
          onClick={handleSave}
          className={`w-full py-2.5 rounded-xl font-bold text-white text-xs transition-all relative overflow-hidden ${
            saveAnimation
              ? 'bg-[#00A884] scale-[0.98]'
              : 'bg-gradient-to-r from-[#00A884] to-[#075E54] hover:from-[#00C49A] hover:to-[#128C7E] hover:shadow-lg active:scale-[0.98] cursor-pointer'
          }`}
        >
          {saveAnimation ? (
            <span className="flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sincronizado con Éxito
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              ✨ Guardar y Sincronizar Cambios
            </span>
          )}
          {!saveAnimation && (
            <span className="absolute inset-0 rounded-xl animate-pulse-ring"></span>
          )}
        </button>
      </div>
    </div>
  );
}
