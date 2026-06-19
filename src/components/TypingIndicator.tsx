'use client';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 px-[5%] mb-1 animate-fade-in">
      <div className="bg-white rounded-tr-[7.5px] rounded-br-[7.5px] rounded-bl-[7.5px] rounded-tl-0 px-4 py-3 shadow-sm relative chat-bubble-incoming">
        <div className="flex items-center gap-[5px]">
          <div className="typing-dot w-2 h-2 bg-[#667781] rounded-full" style={{ animationDelay: '0s' }}></div>
          <div className="typing-dot w-2 h-2 bg-[#667781] rounded-full" style={{ animationDelay: '0.2s' }}></div>
          <div className="typing-dot w-2 h-2 bg-[#667781] rounded-full" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
