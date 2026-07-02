'use client';

import { ChatMessage } from '@/types';

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  if (message.isAudio) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-[5%] mb-1 animate-fade-in`}>
        <div
          className={`relative max-w-[65%] rounded-[7.5px] px-3 py-2 shadow-sm ${
            isUser
              ? 'bg-[#D9FDD3] rounded-br-none chat-bubble-outgoing'
              : 'bg-white rounded-bl-none chat-bubble-incoming'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00A884]/20">
              <svg className="w-4 h-4 text-[#00A884]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </div>
            {/* Waveform visual */}
            <div className="flex items-center gap-[2px] flex-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full bg-[#667781]/50"
                  style={{ height: `${Math.random() * 16 + 4}px` }}
                />
              ))}
            </div>
            <span className="text-xs text-[#667781] font-medium">
              {message.audioDuration ? `0:${String(message.audioDuration).padStart(2, '0')}` : '0:12'}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[11px] text-[#667781] leading-none">{time}</span>
            {isUser && (
              <svg className="w-4 h-3 text-[#53BDEB]" viewBox="0 0 16 11" fill="currentColor">
                <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.344.153l-.311.31a.445.445 0 0 0-.127.333c0 .127.042.23.127.312l2.713 2.713a.51.51 0 0 0 .362.162c.14 0 .266-.06.377-.178l6.83-8.43a.44.44 0 0 0 .109-.305.449.449 0 0 0-.135-.316l-.38-.218z"/>
                <path d="M14.757.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.249-.38.38 1.932 1.932a.51.51 0 0 0 .362.162c.14 0 .266-.06.377-.178l6.83-8.43a.44.44 0 0 0 .109-.305.449.449 0 0 0-.135-.316l-.38-.218-.64.51z"/>
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} px-[5%] mb-2 animate-fade-in`}>
      <div
        className={`relative max-w-[65%] rounded-[7.5px] shadow-sm overflow-hidden ${
          isUser
            ? 'bg-[#D9FDD3] rounded-br-none chat-bubble-outgoing'
            : 'bg-white rounded-bl-none chat-bubble-incoming'
        }`}
      >
        {/* Native WhatsApp Media Header (Image with caption style) */}
        {(message.imageUrl || (!isUser && message.attachedProduct)) && (
          <div className="w-full max-w-[280px] aspect-[4/3] bg-slate-900 overflow-hidden border-b border-black/5 relative">
            <img 
              src={message.imageUrl || message.attachedProduct?.imageUrl} 
              alt="Media" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
        )}

        {/* AI Badge for bot messages */}
        {!isUser && (
          <div className="flex items-center gap-1 px-[9px] pt-[6px] pb-0">
            <span className="text-[10px] font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              🤖 Agente IA
            </span>
          </div>
        )}

        <div className="px-[9px] pt-[3px] pb-[8px] overflow-hidden">
          <span className="text-[14.2px] text-[#111B21] leading-[19px] whitespace-pre-wrap break-words">
            {message.content}
          </span>
          <span className="float-right ml-[10px] mt-[3px] flex items-center gap-1">
            <span className="text-[11px] text-[#667781] leading-none">{time}</span>
            {isUser && (
              <svg className="w-4 h-3 text-[#53BDEB]" viewBox="0 0 16 11" fill="currentColor">
                <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.344.153l-.311.31a.445.445 0 0 0-.127.333c0 .127.042.23.127.312l2.713 2.713a.51.51 0 0 0 .362.162c.14 0 .266-.06.377-.178l6.83-8.43a.44.44 0 0 0 .109-.305.449.449 0 0 0-.135-.316l-.38-.218z"/>
                <path d="M14.757.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.249-.38.38 1.932 1.932a.51.51 0 0 0 .362.162c.14 0 .266-.06.377-.178l6.83-8.43a.44.44 0 0 0 .109-.305.449.449 0 0 0-.135-.316l-.38-.218-.64.51z"/>
              </svg>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

