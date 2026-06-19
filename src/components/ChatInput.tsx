'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { MOCK_SHOE_IMAGES, MOCK_SHOE_BASE64, TRANSFER_RECEIPT } from '@/lib/constants';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendAudio: (base64Buffer: string, mimeType: string, durationSecs: number) => void;
  onSendImage: (message: string, base64Buffer: string, mimeType: string, imageUrl: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSendMessage, onSendAudio, onSendImage, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachShoe = (shoeKey: 'nike' | 'adidas' | 'puma') => {
    if (disabled) return;
    
    const messages = {
      nike: 'Hola, ¿tienen stock de estas Nike rojas en talle 42?',
      adidas: 'Buenas, busco estas Adidas Superstar clásicas, ¿tienen stock y a qué precio?',
      puma: 'Hola! Tienen disponibilidad de estas Puma verdes en talle 44?',
    };

    onSendImage(
      messages[shoeKey],
      MOCK_SHOE_BASE64[shoeKey],
      'image/png',
      MOCK_SHOE_IMAGES[shoeKey]
    );
    setShowAttachMenu(false);
  };

  const handleSendReceipt = async () => {
    if (disabled) return;
    setShowAttachMenu(false);
    
    try {
      // Fetch the receipt image and convert to base64
      const response = await fetch(TRANSFER_RECEIPT.imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        const base64Clean = base64Data.split(',')[1];
        onSendImage(
          TRANSFER_RECEIPT.message,
          base64Clean,
          'image/png',
          TRANSFER_RECEIPT.imageUrl
        );
      };
    } catch (error) {
      console.error('Error loading receipt image:', error);
      // Fallback: send just the text message
      onSendMessage(TRANSFER_RECEIPT.message);
    }
  };

  // Close attach menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAttachMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Audio Recording Logic
  const startRecording = async () => {
    if (disabled) return;
    audioChunksRef.current = [];
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Determine supported mimeType
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
        mimeType = 'audio/ogg;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType });
        
        // Convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          // Extract base64 part
          const base64Clean = base64Data.split(',')[1];
          const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
          
          onSendAudio(base64Clean, recorder.mimeType, duration || 1);
        };

        // Stop all tracks of the stream
        stream.getTracks().forEach(track => track.stop());
      };

      startTimeRef.current = Date.now();
      setRecordingTime(0);
      setIsRecording(true);
      recorder.start();

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('Error al acceder al micrófono:', err);
      alert('No se pudo acceder al micrófono. Asegúrate de dar los permisos necesarios.');
    }
  };

  const stopRecording = (cancel: boolean = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      if (cancel) {
        // Stop but discard
        mediaRecorderRef.current.onstop = () => {
          if (mediaRecorderRef.current) {
            const stream = mediaRecorderRef.current.stream;
            stream.getTracks().forEach(track => track.stop());
          }
        };
      }
      mediaRecorderRef.current.stop();
    }
    
    setIsRecording(false);
    setRecordingTime(0);
  };

  const formatRecordingTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (isRecording) {
    return (
      <div className="flex items-center justify-between gap-4 bg-[#F0F2F5] px-4 py-3 border-t border-slate-200">
        {/* Cancel Recording */}
        <button
          onClick={() => stopRecording(true)}
          className="text-red-500 hover:text-red-600 transition-colors font-medium text-sm"
        >
          Cancelar
        </button>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="w-3.5 h-3.5 bg-red-600 rounded-full animate-ping"></div>
          <span className="text-red-600 font-semibold text-sm">Grabando {formatRecordingTime(recordingTime)}</span>
        </div>

        {/* Stop and Send Button */}
        <button
          onClick={() => stopRecording(false)}
          className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center text-white shadow-md hover:bg-[#059669] transition-colors"
          title="Detener y enviar audio"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 bg-[#F0F2F5] px-4 py-2.5 relative">
      {/* Emoji icon (decorative) */}
      <button className="text-[#54656F] hover:text-[#3B4A54] transition-colors pb-2" title="Emojis">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </button>

      {/* Attachment icon with Dropdown */}
      <div className="relative pb-2" ref={menuRef}>
        <button 
          onClick={() => !disabled && setShowAttachMenu(!showAttachMenu)}
          disabled={disabled}
          className={`text-[#54656F] hover:text-[#3B4A54] transition-colors disabled:opacity-50 ${showAttachMenu ? 'text-[#00A884]' : ''}`} 
          title="Adjuntar Imagen de Calzado (Multimodal)"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
          </svg>
        </button>

        {showAttachMenu && (
          <div className="absolute bottom-10 left-0 bg-white rounded-xl shadow-xl border border-slate-200 py-2 w-64 z-50 animate-fade-in text-sm text-[#111B21]">
            <span className="block px-4 py-1 text-xs text-[#667781] font-semibold uppercase tracking-wider">Enviar Foto (Multimodal)</span>
            <button
              onClick={() => handleAttachShoe('nike')}
              className="w-full text-left px-4 py-2 hover:bg-[#F0F2F5] transition-colors flex items-center gap-2"
            >
              <span>🔴</span> Nike Air Force 1 Red
            </button>
            <button
              onClick={() => handleAttachShoe('adidas')}
              className="w-full text-left px-4 py-2 hover:bg-[#F0F2F5] transition-colors flex items-center gap-2"
            >
              <span>🔵</span> Adidas Superstar Classic
            </button>
            <button
              onClick={() => handleAttachShoe('puma')}
              className="w-full text-left px-4 py-2 hover:bg-[#F0F2F5] transition-colors flex items-center gap-2"
            >
              <span>🟢</span> Puma Suede Green
            </button>
            
            {/* Divider */}
            <div className="my-1.5 border-t border-slate-200" />
            
            <span className="block px-4 py-1 text-xs text-[#667781] font-semibold uppercase tracking-wider">Comprobante de Pago</span>
            <button
              onClick={handleSendReceipt}
              className="w-full text-left px-4 py-2 hover:bg-[#F0F2F5] transition-colors flex items-center gap-2"
            >
              <span>🧾</span> Comprobante de Transferencia
              <span className="ml-auto text-[10px] text-[#00A884] font-semibold bg-[#00A884]/10 px-1.5 py-0.5 rounded">DEMO</span>
            </button>
          </div>
        )}
      </div>

      {/* Text input */}
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje"
          disabled={disabled}
          rows={1}
          className="w-full bg-white rounded-lg border-none px-3 py-[9px] text-[15px] text-[#111B21] placeholder-[#667781] outline-none resize-none max-h-[100px] leading-[20px] disabled:opacity-50"
          style={{ minHeight: '40px' }}
        />
      </div>

      {/* Mic or Send button */}
      {text.trim() ? (
        <button
          onClick={handleSend}
          disabled={disabled}
          className="text-[#54656F] hover:text-[#00A884] transition-colors pb-2 disabled:opacity-50"
          title="Enviar"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      ) : (
        <button
          onClick={startRecording}
          disabled={disabled}
          className="text-[#54656F] hover:text-[#00A884] transition-colors pb-2 disabled:opacity-50"
          title="Grabar audio real"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        </button>
      )}
    </div>
  );
}

