'use client';

interface ChatHeaderProps {
  businessName: string;
  isTyping: boolean;
}

export default function ChatHeader({ businessName, isTyping }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 bg-[#075E54] px-4 py-2.5 text-white">
      {/* Avatar */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#DFE5E7]">
          <img
            src="/bot-avatar.png"
            alt="Bot Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-[#00A884] text-white text-lg">🤖</div>';
            }}
          />
        </div>
        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54]"></div>
      </div>

      {/* Name & Status */}
      <div className="flex-1 min-w-0">
        <h2 className="text-[16px] font-medium truncate leading-tight">
          {businessName || 'Tu Negocio'}
        </h2>
        <p className={`text-[13px] leading-tight ${ isTyping ? 'text-[#A8F0DB]' : 'text-white/70'}`}>
          {isTyping ? (
            <span className="italic">escribiendo...</span>
          ) : (
            'en línea'
          )}
        </p>
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-4">
        <button className="text-white/80 hover:text-white transition-colors" title="Videollamada">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        </button>
        <button className="text-white/80 hover:text-white transition-colors" title="Buscar">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <button className="text-white/80 hover:text-white transition-colors" title="Más opciones">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
