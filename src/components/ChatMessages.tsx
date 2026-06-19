'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto whatsapp-bg py-4 custom-scrollbar">
      {/* Initial date chip */}
      {messages.length > 0 && (
        <div className="flex justify-center mb-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#54656F] text-xs px-3 py-1 rounded-lg shadow-sm">
            Hoy
          </span>
        </div>
      )}

      {/* Welcome message if no messages */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm max-w-sm">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-[#111B21] font-medium text-lg mb-1">¡Probá el Agente IA!</h3>
            <p className="text-[#667781] text-sm">
              Configurá los datos de tu negocio en el panel izquierdo y enviá un mensaje para ver cómo responde el bot.
            </p>
          </div>
        </div>
      )}

      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}
