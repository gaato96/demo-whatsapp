'use client';

import { useState } from 'react';
import { Booking, Order, Product } from '@/types';

interface OwnerDashboardProps {
  bookings: Booking[];
  orders: Order[];
  inventory: Product[];
  onUpdateInventory: (updatedInventory: Product[]) => void;
  onUpdateBookingStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
  onUpdateOrderStatus: (id: string, status: 'delivered' | 'cancelled') => void;
  onUpdateOrderPayment: (id: string, paymentStatus: 'paid' | 'pending_payment') => void;
}

export default function OwnerDashboard({
  bookings,
  orders,
  inventory,
  onUpdateInventory,
  onUpdateBookingStatus,
  onUpdateOrderStatus,
  onUpdateOrderPayment,
}: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'orders' | 'inventory'>('bookings');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Stats calculation
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingPaymentOrders = orders.filter(o => o.paymentStatus === 'pending_payment' && o.status !== 'cancelled').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setEditPrice(product.price);
    setEditStock(product.stock);
  };

  const handleSaveProduct = (productId: string) => {
    const updated = inventory.map(p => {
      if (p.id === productId) {
        return { ...p, price: editPrice, stock: editStock };
      }
      return p;
    });
    onUpdateInventory(updated);
    setEditingProductId(null);
  };

  // Helper to get order status badge
  const getOrderStatusBadge = (order: Order) => {
    switch (order.status) {
      case 'confirmed':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-500/20 text-blue-400">Confirmado</span>;
      case 'delivered':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#10B981]/20 text-[#10B981]">Entregado</span>;
      case 'cancelled':
        return <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-red-500/20 text-red-400">Cancelado</span>;
    }
  };

  // Helper to get payment status badge
  const getPaymentStatusBadge = (order: Order) => {
    if (order.paymentStatus === 'paid') {
      return <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#10B981]/20 text-[#10B981]">💳 Pagado</span>;
    }
    return <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-500/20 text-amber-400">⏳ Pendiente de Pago</span>;
  };

  return (
    <div className="h-full flex flex-col bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Upper Stats Card */}
      <div className="p-5 bg-gradient-to-r from-[#0f172a]/80 to-[#1e293b]/80 border-b border-white/10">
        <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <span>📊</span> Panel de Control del Negocio (CRM/POS)
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
            <span className="block text-[11px] text-white/50 uppercase font-semibold">Ventas Totales</span>
            <span className="text-base font-bold text-[#25D366] mt-0.5 block">
              ${totalRevenue.toLocaleString('es-AR')}
            </span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
            <span className="block text-[11px] text-white/50 uppercase font-semibold">Turnos Confirmados</span>
            <span className="text-base font-bold text-[#34B7F1] mt-0.5 block">
              {confirmedBookings} / {bookings.length}
            </span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-3">
            <span className="block text-[11px] text-white/50 uppercase font-semibold">Pago Pendiente</span>
            <span className="text-base font-bold text-amber-400 mt-0.5 block">
              {pendingPaymentOrders} {pendingPaymentOrders === 1 ? 'pedido' : 'pedidos'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white/5 border-b border-white/10 px-2 py-1.5 gap-1">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'bookings'
              ? 'bg-[#3B82F6] text-white shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          📅 Turnos ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'orders'
              ? 'bg-[#10B981] text-white shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          🛒 Pedidos ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'inventory'
              ? 'bg-[#8B5CF6] text-white shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          📦 Inventario y Stock
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-slate-950/20">
        
        {/* bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/80 flex items-center justify-between">
              <span>Agenda de Citas Extraídas por IA</span>
              <span className="text-xs text-white/40">Sincronización en tiempo real</span>
            </h3>

            {bookings.length === 0 ? (
              <div className="text-center py-10 bg-white/5 rounded-xl border border-white/5 p-6 text-white/40">
                <span className="text-3xl block mb-2">📅</span>
                No hay turnos registrados aún.
                <p className="text-xs text-white/30 mt-1">
                  Chatea en WhatsApp y agenda un turno (ej: &quot;Quiero un corte el sábado a las 10hs&quot;).
                </p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{booking.clientName}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : booking.status === 'cancelled'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmado' : booking.status === 'cancelled' ? 'Cancelado' : 'Pendiente'}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 flex items-center gap-1.5">
                      <span>👤 {booking.service}</span>
                      <span className="text-white/30">•</span>
                      <span>📞 {booking.clientPhone}</span>
                    </p>
                    <p className="text-xs text-white/80 font-medium">
                      📅 {booking.date} a las 🕒 {booking.time}
                    </p>
                  </div>
                  
                  {booking.status === 'pending' && (
                    <div className="flex gap-1.5 self-end sm:self-center">
                      <button
                        onClick={() => onUpdateBookingStatus(booking.id, 'confirmed')}
                        className="bg-[#10B981] hover:bg-[#059669] text-white text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => onUpdateBookingStatus(booking.id, 'cancelled')}
                        className="bg-white/5 hover:bg-white/10 text-white/70 text-xs px-2.5 py-1.5 rounded-lg border border-white/10 transition-colors"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/80 flex items-center justify-between">
              <span>Pedidos de la Tienda</span>
              <span className="text-xs text-white/40">Solo pedidos confirmados</span>
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-10 bg-white/5 rounded-xl border border-white/5 p-6 text-white/40">
                <span className="text-3xl block mb-2">🛒</span>
                No hay pedidos confirmados todavía.
                <p className="text-xs text-white/30 mt-1">
                  Los pedidos aparecerán aquí cuando el cliente complete todos los datos (nombre, producto, método de pago, entrega) y confirme la compra.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 hover:border-white/20 transition-all"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-semibold text-white text-sm">{order.clientName}</span>
                      <span className="text-xs text-white/40 block">Tel: {order.clientPhone}</span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-sm font-bold text-[#10B981] block">
                        ${order.total.toLocaleString('es-AR')}
                      </span>
                      <div className="flex flex-col items-end gap-1">
                        {getOrderStatusBadge(order)}
                        {getPaymentStatusBadge(order)}
                      </div>
                    </div>
                  </div>

                  {/* Items Summary (always visible) */}
                  <div className="border-t border-white/5 pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] text-white/40 uppercase block">Ítems del Pedido</span>
                      <button
                        onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1"
                      >
                        {expandedOrderId === order.id ? '▲ Ocultar Detalle' : '🔎 Ver Detalle'}
                      </button>
                    </div>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-white/80">
                        <span>
                          {item.quantity}x {item.productName} (Talle: {item.size})
                        </span>
                        <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expanded Order Detail */}
                  {expandedOrderId === order.id && (
                    <div className="bg-gradient-to-br from-black/30 to-black/20 border border-white/10 rounded-xl p-4 space-y-3 animate-fade-in">
                      <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
                        📋 Resumen Completo del Pedido
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <span className="text-white/40 block text-[10px] uppercase mb-0.5">Cliente</span>
                          <span className="font-semibold text-white">{order.clientName}</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <span className="text-white/40 block text-[10px] uppercase mb-0.5">Teléfono</span>
                          <span className="font-semibold text-white">{order.clientPhone}</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <span className="text-white/40 block text-[10px] uppercase mb-0.5">Método de Pago</span>
                          <span className="font-semibold text-white flex items-center gap-1">
                            {order.paymentMethod === 'Transferencia' ? '🏦' : '💵'} {order.paymentMethod || 'Efectivo'}
                          </span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <span className="text-white/40 block text-[10px] uppercase mb-0.5">Tipo de Entrega</span>
                          <span className="font-semibold text-white">
                            {order.deliveryType === 'envio' ? '🚀 Envío a Domicilio' : '🛍️ Retira por Local'}
                          </span>
                        </div>
                      </div>

                      {order.deliveryType === 'envio' && order.shippingAddress && (
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <span className="text-white/40 block text-[10px] uppercase mb-0.5">📍 Dirección de Envío</span>
                          <span className="font-medium text-white text-xs">{order.shippingAddress}</span>
                        </div>
                      )}

                      {/* Payment method specific info */}
                      {order.paymentMethod?.toLowerCase() === 'transferencia' && order.paymentStatus === 'pending_payment' && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5">
                          <span className="text-amber-400 text-[10px] uppercase font-bold block mb-1">⏳ Esperando comprobante de transferencia</span>
                          <span className="text-white/60 text-[11px]">El cliente debe enviar el comprobante por WhatsApp para confirmar el pago.</span>
                        </div>
                      )}

                      {order.paymentMethod?.toLowerCase() === 'efectivo' && order.paymentStatus === 'pending_payment' && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5">
                          <span className="text-amber-400 text-[10px] uppercase font-bold block mb-1">💵 Pago contra entrega</span>
                          <span className="text-white/60 text-[11px]">
                            {order.deliveryType === 'envio' 
                              ? 'El cliente pagará al recibir el envío.' 
                              : 'El cliente pagará al retirar por el local.'}
                          </span>
                        </div>
                      )}

                      <div className="bg-white/5 rounded-lg p-2.5">
                        <span className="text-white/40 block text-[10px] uppercase mb-0.5">Fecha del Pedido</span>
                        <span className="font-medium text-white text-xs">
                          {new Date(order.createdAt).toLocaleString('es-AR', { 
                            dateStyle: 'medium', 
                            timeStyle: 'short' 
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {order.status !== 'cancelled' && (
                    <div className="flex flex-wrap justify-end gap-1.5 border-t border-white/5 pt-2">
                      {/* Mark as paid button */}
                      {order.paymentStatus === 'pending_payment' && (
                        <button
                          onClick={() => onUpdateOrderPayment(order.id, 'paid')}
                          className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium border border-amber-500/20"
                        >
                          💳 Marcar Pagado
                        </button>
                      )}
                      
                      {/* Mark as delivered */}
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
                          className="bg-[#10B981] hover:bg-[#059669] text-white text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium"
                        >
                          ✅ Marcar Entregado
                        </button>
                      )}
                      
                      {/* Cancel */}
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'cancelled')}
                          className="bg-white/5 hover:bg-white/10 text-white/70 text-xs px-2.5 py-1.5 rounded-lg border border-white/10 transition-colors"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white/80">Catálogo de Productos</h3>
              <span className="text-[11px] text-[#A8F0DB] bg-[#00A884]/20 border border-[#00A884]/30 px-2 py-0.5 rounded-full">
                Sincronizado con IA
              </span>
            </div>
            
            <p className="text-xs text-white/50 leading-relaxed">
              💡 <strong>Demo Sincronizada:</strong> Modifica el precio o el stock de cualquier producto aquí debajo. La IA de Gemini leerá estos cambios en tiempo real y responderá con los nuevos valores en el chat de WhatsApp.
            </p>

            <div className="space-y-3">
              {inventory.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Visual shoe render */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900 border border-white/5">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-white text-sm block truncate">{product.name}</span>
                      <span className="text-xs text-white/40 block">Talles: {product.sizes.join(', ')}</span>
                      {editingProductId !== product.id && (
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-[#10B981]">${product.price.toLocaleString('es-AR')}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-xs text-white/60">Stock: {product.stock} u</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {editingProductId === product.id ? (
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <label className="block text-[9px] text-white/40 uppercase">Precio</label>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-white/10 rounded px-1.5 py-1 text-xs text-white outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div className="w-14">
                        <label className="block text-[9px] text-white/40 uppercase">Stock</label>
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-white/10 rounded px-1.5 py-1 text-xs text-white outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                      <div className="flex flex-col gap-1 mt-3">
                        <button
                          onClick={() => handleSaveProduct(product.id)}
                          className="bg-[#8B5CF6] hover:bg-[#7c3aed] text-white text-[10px] px-2 py-1 rounded transition-colors font-semibold"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingProductId(null)}
                          className="bg-white/5 hover:bg-white/10 text-white/60 text-[10px] px-2 py-1 rounded transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-white/5 hover:bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                    >
                      Editar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
