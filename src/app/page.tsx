'use client';

import { useState, useEffect } from 'react';
import { BusinessConfig, Booking, Order, Product, DolarBlueRate } from '@/types';
import { DEFAULT_CONFIG, DEFAULT_INVENTORY } from '@/lib/constants';
import ConfigPanel from '@/components/ConfigPanel';
import ChatSimulator from '@/components/ChatSimulator';
import OwnerDashboard from '@/components/OwnerDashboard';

export default function Home() {
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_CONFIG);
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'config' | 'chat' | 'dashboard'>('config');
  const [showOwnerDashboard, setShowOwnerDashboard] = useState(false);

  // Shared states for the visual CRM simulation
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<Product[]>(DEFAULT_INVENTORY);

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
    // Determine payment status based on payment method
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

  // Confirms payment on the most recent pending_payment order (triggered by bot action)
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
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A884]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#075E54]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00A884]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A884] to-[#075E54] flex items-center justify-center shadow-lg shadow-[#00A884]/20">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Demo Agente IA WhatsApp</h1>
              <p className="text-white/40 text-xs">Simulador interactivo de bot inteligente</p>
            </div>
          </div>
          
          {/* Dollar Blue Ticker Widget */}
          <div className="hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-xs text-white">
            <span className="text-[#00A884] font-bold flex items-center gap-1">
              <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-500"></span>
              💵 Dólar Blue:
            </span>
            <span>Compra <strong className="text-white">${dolarBlue.compra}</strong></span>
            <span className="text-white/20">|</span>
            <span>Venta <strong className="text-white">${dolarBlue.venta}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            {/* Owner CRM Control Switch */}
            <button
              onClick={() => setShowOwnerDashboard(!showOwnerDashboard)}
              className={`hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                showOwnerDashboard
                  ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 hover:bg-blue-600/30'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>📊</span> {showOwnerDashboard ? 'Ocultar Control de Negocio' : 'Ver Control de Negocio (CRM)'}
            </button>

            <span className="text-xs text-white/30 hidden sm:block">Powered by</span>
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
              <span className="text-sm">✨</span>
              <span className="text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Google Gemini 2.5
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Tab Toggle */}
        <div className="flex xl:hidden px-4 py-3 gap-2">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'config'
                ? 'bg-[#00A884] text-white shadow-lg'
                : 'bg-white/5 text-white/50 hover:text-white/70'
            }`}
          >
            ⚙️ Configuración
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'chat'
                ? 'bg-[#00A884] text-white shadow-lg'
                : 'bg-white/5 text-white/50 hover:text-white/70'
            }`}
          >
            💬 Chat WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#00A884] text-white shadow-lg'
                : 'bg-white/5 text-white/50 hover:text-white/70'
            }`}
          >
            📊 Panel Dueño
          </button>
        </div>

        {/* Conditional Layout based on showOwnerDashboard */}
        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          
          {/* Column 1: Config Panel (Left) */}
          <div className={`xl:w-[28%] xl:min-w-[340px] xl:max-w-[420px] flex-shrink-0 rounded-2xl border border-white/10 overflow-hidden ${
            activeTab === 'config' ? 'flex flex-col w-full' : 'hidden xl:flex xl:flex-col'
          }`}>
            <ConfigPanel
              onConfigChange={setConfig}
              onApiKeyChange={setApiKey}
            />
          </div>

          {/* Column 2: Chat Simulator (Middle/Main) */}
          <div className={`flex-1 min-w-0 ${
            activeTab === 'chat' ? 'flex flex-col w-full' : 'hidden xl:flex xl:flex-col'
          }`}>
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

          {/* Column 3: Owner CRM Dashboard (Right) - Hidden unless showOwnerDashboard is true */}
          {showOwnerDashboard && (
            <div className={`xl:w-[35%] xl:min-w-[420px] xl:max-w-[540px] flex-shrink-0 rounded-2xl border border-white/10 overflow-hidden animate-fade-in ${
              activeTab === 'dashboard' ? 'flex flex-col w-full' : 'hidden xl:flex xl:flex-col'
            }`}>
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
    </main>
  );
}

