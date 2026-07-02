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
  // Initialize config with preset and customized business name
  const [config, setConfig] = useState<BusinessConfig>({
    ...preset.config,
    businessName: businessName,
  });

  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'dashboard' | 'config'>('chat');
  
  // UX controls: config starts hidden as requested, owner dashboard too
  const [showConfig, setShowConfig] = useState(false);
  const [showOwnerDashboard, setShowOwnerDashboard] = useState(false);

  // CRM simulation states populated from preset
  const [bookings, setBookings] = useState<Booking[]>(preset.initialBookings || []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<Product[]>(preset.inventory);

  // Live Dólar Blue rate
  const [dolarBlue, setDolarBlue] = useState<DolarBlueRate>({
    compra: 1350,
    venta: 1400,
    fechaActualizacion: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchDolar = async () => {
      try {
        const res = await fetch('https://dolarapi.com/v1/dolares/blue');
        if (res.ok) {
          const data = await res.json();
          setDolarBlue({
            compra: data.compra,
            venta: data.venta,
            fechaActualizacion: data.fechaActualizacion || new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error('Error fetching dollar rate:', err);
      }
    };
    fetchDolar();
    const interval = setInterval(fetchDolar, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  // Sync business name updates from config panel back to our config
  const handleConfigChange = (newConfig: BusinessConfig) => {
    setConfig(newConfig);
  };

  // State handlers
  const handleAddBooking = (newBooking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const booking: Booking = {
      ...newBooking,
      id: `book-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date(),
    };
    setBookings(prev => [booking, ...prev]);
  };

  const handleAddOrder = (newOrder: Omit<Order, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => {
    const paymentStatus: 'paid' | 'pending_payment' = 
      newOrder.paymentMethod?.toLowerCase() === 'efectivo' || newOrder.paymentMethod?.toLowerCase() === 'transferencia'
        ? 'pending_payment'
        : 'paid';

    const order: Order = {
      ...newOrder,
      id: `ord-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'confirmed',
      paymentStatus,
      createdAt: new Date(),
    };
    setOrders(prev => [order, ...prev]);

    // Update inventory stock based on the order
    setInventory(prevInventory => {
      return prevInventory.map(prod => {
        const orderItem = newOrder.items.find(item => item.productId === prod.id);
        if (orderItem) {
          const newStock = Math.max(0, prod.stock - orderItem.quantity);
          return { ...prod, stock: newStock };
        }
        return prod;
      });
    });
  };

  const handleUpdateBookingStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleUpdateOrderStatus = (id: string, status: 'delivered' | 'cancelled') => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, status } : o))
    );
  };

  const handleUpdateOrderPayment = (id: string, paymentStatus: 'paid' | 'pending_payment') => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, paymentStatus } : o))
    );
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

  const handleUpdateInventory = (updatedInventory: Product[]) => {
    setInventory(updatedInventory);
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A884]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#075E54]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
            title="Volver atrás"
          >
            ◀
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A884] to-[#075E54] flex items-center justify-center shadow-lg">
            <span className="text-xl">{preset.icon}</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-tight">
              {config.businessName} <span className="text-xs font-normal text-white/40">({preset.rubroLabel})</span>
            </h1>
            <p className="text-[#00A884] text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Agente IA de WhatsApp Activo
            </p>
          </div>
        </div>

        {/* Dolar Blue Ticker Widget */}
        <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white">
          <span className="text-[#00A884] font-bold">💵 Dólar Blue:</span>
          <span>Compra <strong className="text-white">${dolarBlue.compra}</strong></span>
          <span className="text-white/20">|</span>
          <span>Venta <strong className="text-white">${dolarBlue.venta}</strong></span>
        </div>

        {/* Buttons to toggle Config and CRM */}
        <div className="flex items-center gap-2">
          {/* Config Panel Toggle */}
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              showConfig
                ? 'bg-[#00A884]/20 text-[#00A884] border-[#00A884]/40 hover:bg-[#00A884]/30'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>⚙️</span> {showConfig ? 'Ocultar Configuración' : 'Editar Configuración'}
          </button>

          {/* CRM Toggle */}
          <button
            onClick={() => setShowOwnerDashboard(!showOwnerDashboard)}
            className={`hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              showOwnerDashboard
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 hover:bg-blue-600/30'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>📊</span> {showOwnerDashboard ? 'Ocultar Panel CRM' : 'Ver Panel CRM'}
          </button>
        </div>
      </header>

      {/* Mobile Tab Toggles */}
      <div className="flex md:hidden px-4 py-3 gap-2 bg-slate-900/30 border-b border-white/5 relative z-10">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'chat' ? 'bg-[#00A884] text-white shadow-lg' : 'bg-white/5 text-white/50'
          }`}
        >
          💬 Chat
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-white/50'
          }`}
        >
          📊 CRM
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'config' ? 'bg-amber-600 text-white shadow-lg' : 'bg-white/5 text-white/50'
          }`}
        >
          ⚙️ Config
        </button>
      </div>

      {/* Layout Columns */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden relative z-10">
        {/* Col 1: Config Panel (Left) */}
        {showConfig && (
          <div className="w-[300px] xl:w-[350px] flex-shrink-0 rounded-2xl border border-white/10 overflow-hidden flex flex-col animate-slide-in">
            <ConfigPanel
              onConfigChange={handleConfigChange}
              onApiKeyChange={setApiKey}
            />
          </div>
        )}
        
        {/* Mobile fallback for config */}
        {activeTab === 'config' && (
          <div className="flex-1 rounded-2xl border border-white/10 overflow-hidden flex flex-col md:hidden">
            <ConfigPanel
              onConfigChange={handleConfigChange}
              onApiKeyChange={setApiKey}
            />
          </div>
        )}

        {/* Col 2: Chat Simulator (Middle/Main) */}
        <div className={`flex-1 min-w-0 ${activeTab !== 'chat' ? 'hidden md:flex md:flex-col' : 'flex flex-col'}`}>
          <ChatSimulator 
            config={config} 
            apiKey={apiKey}
            bookings={bookings}
            orders={orders}
            inventory={inventory}
            onAddBooking={handleAddBooking}
            onAddOrder={handleAddOrder}
            onConfirmPayment={handleConfirmPayment}
            dolarBlue={dolarBlue}
          />
        </div>

        {/* Col 3: Owner Dashboard (Right) */}
        {showOwnerDashboard && (
          <div className="w-[380px] xl:w-[480px] flex-shrink-0 rounded-2xl border border-white/10 overflow-hidden flex flex-col animate-slide-in">
            <OwnerDashboard
              bookings={bookings}
              orders={orders}
              inventory={inventory}
              onUpdateInventory={handleUpdateInventory}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onUpdateOrderPayment={handleUpdateOrderPayment}
              dolarBlue={dolarBlue}
            />
          </div>
        )}

        {/* Mobile fallback for dashboard */}
        {activeTab === 'dashboard' && (
          <div className="flex-1 rounded-2xl border border-white/10 overflow-hidden flex flex-col md:hidden">
            <OwnerDashboard
              bookings={bookings}
              orders={orders}
              inventory={inventory}
              onUpdateInventory={handleUpdateInventory}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onUpdateOrderPayment={handleUpdateOrderPayment}
              dolarBlue={dolarBlue}
            />
          </div>
        )}
      </div>
    </div>
  );
}
