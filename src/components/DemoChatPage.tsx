'use client';

import { useState, useEffect } from 'react';
import { BusinessConfig, Booking, Order, Product, DolarBlueRate } from '@/types';
import { DemoPreset } from '@/lib/demoPresets';
import ConfigPanel from '@/components/ConfigPanel';
import ChatSimulator from '@/components/ChatSimulator';
import OwnerDashboard from '@/components/OwnerDashboard';

interface DemoChatPageProps {
  preset: DemoPreset;
  businessName: string;
  onBack: () => void;
}

export default function DemoChatPage({ preset, businessName, onBack }: DemoChatPageProps) {
  const [config, setConfig] = useState<BusinessConfig>({
    ...preset.config,
    businessName: businessName,
  });

  const [apiKey, setApiKey] = useState('');

  // Mobile: one panel visible at a time
  type MobileView = 'chat' | 'crm' | 'config';
  const [mobileView, setMobileView] = useState<MobileView>('chat');

  // Desktop: togglable sidepanels (hidden by default per user request)
  const [showConfig, setShowConfig] = useState(false);
  const [showCRM, setShowCRM] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>(preset.initialBookings || []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<Product[]>(preset.inventory);

  const [dolarBlue, setDolarBlue] = useState<DolarBlueRate>({
    compra: 1350,
    venta: 1400,
    fechaActualizacion: new Date().toISOString(),
  });

  const isIphones = config.rubro === 'iphones';

  useEffect(() => {
    if (!isIphones) return; // Only fetch for iPhone rubro
    const fetchDolar = async () => {
      try {
        const res = await fetch('https://dolarapi.com/v1/dolares/blue');
        if (res.ok) {
          const data = await res.json();
          setDolarBlue({ compra: data.compra, venta: data.venta, fechaActualizacion: data.fechaActualizacion || new Date().toISOString() });
        }
      } catch { /* silent fallback */ }
    };
    fetchDolar();
    const interval = setInterval(fetchDolar, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isIphones]);

  const handleAddBooking = (newBooking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    setBookings(prev => [{
      ...newBooking,
      id: `book-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date(),
    }, ...prev]);
  };

  const handleAddOrder = (newOrder: Omit<Order, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => {
    const paymentStatus: 'paid' | 'pending_payment' =
      ['efectivo', 'transferencia'].includes((newOrder.paymentMethod || '').toLowerCase())
        ? 'pending_payment' : 'paid';
    setOrders(prev => [{
      ...newOrder,
      id: `ord-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'confirmed',
      paymentStatus,
      createdAt: new Date(),
    }, ...prev]);
    setInventory(prev => prev.map(prod => {
      const item = newOrder.items.find(i => i.productId === prod.id);
      return item ? { ...prod, stock: Math.max(0, prod.stock - item.quantity) } : prod;
    }));
  };

  const handleConfirmPayment = () => {
    setOrders(prev => {
      const idx = prev.findIndex(o => o.paymentStatus === 'pending_payment' && o.status !== 'cancelled');
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], paymentStatus: 'paid' };
      return updated;
    });
  };

  return (
    <div className="flex flex-col h-screen-mobile bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">

      {/* ── Desktop Header ─────────────────────────────── */}
      <header className="hidden md:flex items-center justify-between px-5 py-3 border-b border-white/5 bg-slate-950/30 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} title="Volver" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer text-sm">◀</button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A884] to-[#075E54] flex items-center justify-center text-lg">{preset.icon}</div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{config.businessName}</p>
            <p className="text-[#00A884] text-[10px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              {preset.rubroLabel} · Agente IA activo
            </p>
          </div>
        </div>

        {/* Dolar Blue — only for iPhones */}
        {isIphones && (
          <div className="hidden lg:flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/60">💵 Dólar Blue:</span>
            <span>Compra <strong>${dolarBlue.compra}</strong></span>
            <span className="text-white/20">|</span>
            <span>Venta <strong>${dolarBlue.venta}</strong></span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button onClick={() => setShowConfig(v => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${showConfig ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}>
            ⚙️ {showConfig ? 'Ocultar' : 'Config'}
          </button>
          <button onClick={() => setShowCRM(v => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${showCRM ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}>
            📊 {showCRM ? 'Ocultar CRM' : 'Ver CRM'}
          </button>
        </div>
      </header>

      {/* ── Mobile Header ─────────────────────────────── */}
      <header className="flex md:hidden items-center gap-2.5 px-4 py-3 border-b border-white/5 bg-slate-950/50 backdrop-blur-md flex-shrink-0">
        <button onClick={onBack} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 text-xs cursor-pointer">◀</button>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A884] to-[#075E54] flex items-center justify-center text-base">{preset.icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight truncate">{config.businessName}</p>
          <p className="text-[#00A884] text-[10px] flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Agente IA activo
          </p>
        </div>
        {isIphones && (
          <div className="flex-shrink-0 bg-white/5 border border-white/10 rounded-full px-2 py-1 text-[10px] text-white/70 font-medium">
            💵 ${dolarBlue.venta}
          </div>
        )}
      </header>

      {/* ── Main Content Area ─────────────────────────── */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* Config panel — desktop left sidebar */}
        {showConfig && (
          <div className="hidden md:flex flex-col w-[300px] xl:w-[340px] flex-shrink-0 border-r border-white/5 overflow-hidden animate-slide-in">
            <ConfigPanel onConfigChange={setConfig} onApiKeyChange={setApiKey} />
          </div>
        )}

        {/* Chat — center / full on mobile */}
        <div className={`flex-1 min-w-0 flex flex-col ${mobileView !== 'chat' ? 'hidden md:flex' : 'flex'}`}>
          <ChatSimulator
            config={config}
            apiKey={apiKey}
            bookings={bookings}
            orders={orders}
            inventory={inventory}
            onAddBooking={handleAddBooking}
            onAddOrder={handleAddOrder}
            onConfirmPayment={handleConfirmPayment}
            dolarBlue={isIphones ? dolarBlue : undefined}
          />
        </div>

        {/* CRM panel — desktop right sidebar */}
        {showCRM && (
          <div className="hidden md:flex flex-col w-[380px] xl:w-[460px] flex-shrink-0 border-l border-white/5 overflow-hidden animate-slide-in">
            <OwnerDashboard
              bookings={bookings}
              orders={orders}
              inventory={inventory}
              rubro={config.rubro}
              onUpdateInventory={setInventory}
              onUpdateBookingStatus={(id, status) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))}
              onUpdateOrderStatus={(id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))}
              onUpdateOrderPayment={(id, ps) => setOrders(prev => prev.map(o => o.id === id ? { ...o, paymentStatus: ps } : o))}
              dolarBlue={isIphones ? dolarBlue : undefined}
            />
          </div>
        )}

        {/* Mobile: CRM view */}
        {mobileView === 'crm' && (
          <div className="flex md:hidden flex-col flex-1 overflow-hidden">
            <OwnerDashboard
              bookings={bookings}
              orders={orders}
              inventory={inventory}
              rubro={config.rubro}
              onUpdateInventory={setInventory}
              onUpdateBookingStatus={(id, status) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))}
              onUpdateOrderStatus={(id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))}
              onUpdateOrderPayment={(id, ps) => setOrders(prev => prev.map(o => o.id === id ? { ...o, paymentStatus: ps } : o))}
              dolarBlue={isIphones ? dolarBlue : undefined}
            />
          </div>
        )}

        {/* Mobile: Config view */}
        {mobileView === 'config' && (
          <div className="flex md:hidden flex-col flex-1 overflow-hidden">
            <ConfigPanel onConfigChange={setConfig} onApiKeyChange={setApiKey} />
          </div>
        )}
      </div>

      {/* ── Mobile Bottom Tab Bar ─────────────────────── */}
      <nav className="flex md:hidden items-center border-t border-white/5 bg-slate-950/80 backdrop-blur-md flex-shrink-0 pb-safe">
        {[
          { id: 'chat', label: 'Chat', icon: '💬' },
          { id: 'crm',  label: 'Panel',  icon: '📊' },
          { id: 'config', label: 'Config', icon: '⚙️' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMobileView(tab.id as MobileView)}
            className={`flex-1 py-3.5 flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
              mobileView === tab.id
                ? 'text-[#00A884]'
                : 'text-white/35 hover:text-white/60'
            }`}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            <span className="text-[10px] font-semibold leading-none">{tab.label}</span>
            {mobileView === tab.id && (
              <span className="w-5 h-0.5 bg-[#00A884] rounded-full mt-0.5" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
