'use client';

import { useState, useCallback } from 'react';
import { ChatMessage, BusinessConfig, Product, Booking, Order, DolarBlueRate } from '@/types';
import { AUDIO_PROMPTS } from '@/lib/constants';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface ChatSimulatorProps {
  config: BusinessConfig;
  apiKey: string;
  bookings: Booking[];
  orders: Order[];
  inventory: Product[];
  onAddBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  onAddOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => void;
  onConfirmPayment: () => void;
  dolarBlue?: DolarBlueRate;
}

export default function ChatSimulator({
  config,
  apiKey,
  bookings,
  orders,
  inventory,
  onAddBooking,
  onAddOrder,
  onConfirmPayment,
  dolarBlue,
}: ChatSimulatorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Parse structured action tags like <action>{"type": "...", "data": {...}}</action>
  const parseAction = useCallback((reply: string): { cleanReply: string; action: any | null } => {
    const actionRegex = /<action>([\s\S]*?)<\/action>/i;
    const match = reply.match(actionRegex);
    
    if (match) {
      const jsonStr = match[1].trim();
      const cleanReply = reply.replace(actionRegex, '').trim();
      try {
        const actionObj = JSON.parse(jsonStr);
        return { cleanReply, action: actionObj };
      } catch (e) {
        console.error('Failed to parse action JSON:', e);
        return { cleanReply, action: null };
      }
    }
    
    return { cleanReply: reply, action: null };
  }, []);

  // Execute parsed actions from Gemini
  const executeAction = useCallback((action: any) => {
    if (!action || !action.type || !action.data) return null;

    try {
      if (action.type === 'create_booking') {
        const { service, date, time, clientName } = action.data;
        onAddBooking({
          service: service || 'Servicio General',
          date: date || new Date().toLocaleDateString(),
          time: time || '10:00',
          clientName: clientName || 'Cliente WhatsApp',
          clientPhone: config.contactPhone || '+54 11 9999-9999',
        });
      } else if (action.type === 'create_order') {
        const { clientName, items, total, paymentMethod, deliveryType, shippingAddress, tradeInDetails } = action.data;
        onAddOrder({
          clientName: clientName || 'Cliente WhatsApp',
          clientPhone: config.contactPhone || '+54 11 9999-9999',
          items: items || [],
          total: total || 0,
          paymentMethod: paymentMethod || 'Efectivo',
          deliveryType: deliveryType || 'retiro',
          shippingAddress: shippingAddress || undefined,
          tradeInDetails: tradeInDetails || undefined,
        });
      } else if (action.type === 'show_product') {
        const { productId } = action.data;
        const product = inventory.find(p => p.id === productId);
        return product; // Return to attach to message
      } else if (action.type === 'confirm_payment') {
        // Confirm payment on the most recent pending order
        onConfirmPayment();
      }
    } catch (error) {
      console.error('Error executing action:', error);
    }
    return null;
  }, [config.contactPhone, inventory, onAddBooking, onAddOrder, onConfirmPayment]);

  const sendToAPI = useCallback(async (
    userMessage: string, 
    currentMessages: ChatMessage[],
    imageBuffer?: string,
    imageMime?: string,
    audioBuffer?: string,
    audioMime?: string
  ) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: currentMessages.slice(-20), // Send last 20 messages for context
          config,
          apiKey: apiKey || undefined,
          inventory, // Pass the synchronized live inventory
          imageBuffer,
          imageMime,
          audioBuffer,
          audioMime,
          dolarBlue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la comunicación');
      }

      return data.reply;
    } catch (error) {
      console.error('API Error:', error);
      return 'Disculpas, estoy experimentando una pequeña interrupción en la señal. ¿Podrías volver a enviarme tu mensaje en unos segundos? ¡Gracias por la paciencia! 😊';
    }
  }, [config, apiKey, inventory, dolarBlue]);

  const handleSendMessage = useCallback(async (
    text: string, 
    imageBuffer?: string, 
    imageMime?: string, 
    imageUrl?: string
  ) => {
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      imageUrl,
      base64Data: imageBuffer,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    // Simulate a slight delay to feel more natural (1-2 seconds)
    const delay = Math.random() * 1000 + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Send text and optional base64 image data to route
    const rawReply = await sendToAPI(text, updatedMessages, imageBuffer, imageMime);
    
    // Parse actions out of the response
    const { cleanReply, action } = parseAction(rawReply);
    
    // Execute action & check if we need to attach a product card to the bubble
    const attachedProduct = executeAction(action);

    const botMsg: ChatMessage = {
      id: generateId(),
      role: 'bot',
      content: cleanReply,
      timestamp: new Date(),
      attachedProduct: attachedProduct || undefined,
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  }, [messages, sendToAPI, parseAction, executeAction]);

  const handleSendAudio = useCallback(async (
    base64Buffer: string,
    mimeType: string,
    durationSecs: number
  ) => {
    const audioMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: '🎙️ Mensaje de voz',
      timestamp: new Date(),
      isAudio: true,
      audioDuration: durationSecs,
    };

    const updatedMessages = [...messages, audioMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    const delay = Math.random() * 1000 + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Send real audio data to Gemini API, with empty message so route handles it as audio
    const rawReply = await sendToAPI('', updatedMessages, undefined, undefined, base64Buffer, mimeType);
    
    const { cleanReply, action } = parseAction(rawReply);
    const attachedProduct = executeAction(action);

    const botMsg: ChatMessage = {
      id: generateId(),
      role: 'bot',
      content: cleanReply,
      timestamp: new Date(),
      attachedProduct: attachedProduct || undefined,
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  }, [messages, sendToAPI, parseAction, executeAction]);

  const handleClearChat = () => {
    setMessages([]);
  };

    return (
    <div className="flex flex-col h-full bg-[#ECE5DD] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
      <ChatHeader
        businessName={config.businessName}
        isTyping={isTyping}
      />
      
      {/* Live Dólar Blue banner for iPhones rubro */}
      {config.rubro === 'iphones' && dolarBlue && (
        <div className="bg-slate-900 border-b border-white/5 px-4 py-1.5 flex items-center justify-between text-[11px] text-white/70 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-pulse"></span>
            Dólar Blue Venta: <strong className="text-white">${dolarBlue.venta} ARS</strong>
          </span>
          <span className="text-[10px] text-white/30">Canjes tasados en USD</span>
        </div>
      )}

      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput
        onSendMessage={(text) => handleSendMessage(text)}
        onSendAudio={handleSendAudio}
        onSendImage={(text, buffer, mime, url) => handleSendMessage(text, buffer, mime, url)}
        disabled={isTyping}
      />
      {/* Clear chat button */}
      {messages.length > 0 && (
        <button
          onClick={handleClearChat}
          className="absolute top-[52px] right-2 bg-black/20 hover:bg-black/40 text-white text-xs px-2 py-1 rounded-md transition-colors backdrop-blur-sm z-10"
          title="Limpiar chat"
        >
          🗑️ Limpiar
        </button>
      )}
    </div>
  );
}

