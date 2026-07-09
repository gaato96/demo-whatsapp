import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from '@/lib/buildSystemPrompt';
import { BusinessConfig, ChatMessage, Product } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history, config, apiKey, inventory, imageBuffer, imageMime, audioBuffer, audioMime, dolarBlue } = body as {
      message: string;
      history: ChatMessage[];
      config: BusinessConfig;
      apiKey?: string;
      inventory?: Product[];
      imageBuffer?: string;
      imageMime?: string;
      audioBuffer?: string;
      audioMime?: string;
      dolarBlue?: { compra: number; venta: number };
    };

    // Validate required fields
    if (!message && !imageBuffer && !audioBuffer) {
      return NextResponse.json(
        { error: 'Mensaje, imagen o audio son requeridos.' },
        { status: 400 }
      );
    }

    if (!config) {
      return NextResponse.json(
        { error: 'La configuración del negocio es requerida.' },
        { status: 400 }
      );
    }

    // Use provided API key or fall back to environment variable
    const geminiApiKey = apiKey || process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'No se encontró una clave de API activa. Configura una en el panel o contacta al administrador.' },
        { status: 401 }
      );
    }

    // Build the system prompt dynamically with the current inventory and dollar rate
    const systemPrompt = buildSystemPrompt(config, inventory || [], dolarBlue);

    // Initialize Gemini
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    // Format history for Gemini API
    const formattedHistory = (history || [])
      .map((msg: ChatMessage) => {
        const parts: any[] = [{ text: msg.content }];
        
        // If the message historically had an image
        if (msg.base64Data && msg.imageUrl && !msg.isAudio) {
          const mime = msg.imageUrl.includes('png') ? 'image/png' : 'image/jpeg';
          parts.unshift({
            inlineData: {
              mimeType: mime,
              data: msg.base64Data
            }
          });
        }
        
        return {
          role: msg.role === 'user' ? 'user' as const : 'model' as const,
          parts: parts,
        };
      });

    // Prepare current turn parts
    const currentTurnParts: any[] = [];

    // Add image if user sent one
    if (imageBuffer && imageMime) {
      const cleanImageMime = imageMime.split(';')[0];
      currentTurnParts.push({
        inlineData: {
          mimeType: cleanImageMime,
          data: imageBuffer
        }
      });
    }

    // Add audio if user recorded one
    if (audioBuffer && audioMime) {
      const cleanAudioMime = audioMime.split(';')[0];
      currentTurnParts.push({
        inlineData: {
          mimeType: cleanAudioMime,
          data: audioBuffer
        }
      });
    }

    // Add text message (or instruction fallback)
    // Add text message (or instruction fallback)
    const textPrompt = message || (audioBuffer ? 'El cliente envió un mensaje de voz. Escucha el archivo de audio adjunto, transcribe e interpreta su consulta, y responde directamente al cliente en texto.' : 'Describe esta imagen.');
    currentTurnParts.push({ text: textPrompt });

    // Multi-tier call with auto-retries and progressive fallback to lighter models
    let responseText = '';
    let lastError: any = null;
    const maxRetries = 3;
    const modelTiers = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.5-flash', 'gemini-1.5-flash'];
    const delayMs = [0, 1000, 2000, 3000];

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const modelToUse = modelTiers[Math.min(attempt, modelTiers.length - 1)];
        
        if (attempt > 0) {
          console.log(`[Gemini API] Retry attempt ${attempt}/${maxRetries} using ${modelToUse} after ${delayMs[attempt]}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs[attempt]));
        }

        const response = await ai.models.generateContent({
          model: modelToUse,
          config: {
            systemInstruction: systemPrompt,
          },
          contents: [
            ...formattedHistory,
            {
              role: 'user' as const,
              parts: currentTurnParts,
            },
          ],
        });

        responseText = response.text || '';
        break; // Success! Exit loop
      } catch (err: any) {
        lastError = err;
        const errMsg = err instanceof Error ? err.message : String(err);
        
        // Check if rate limited (429 / ResourceExhausted)
        if (errMsg.includes('RATE_LIMIT') || errMsg.includes('429') || errMsg.includes('ResourceExhausted')) {
          if (attempt < maxRetries) {
            continue;
          }
          // All retries exhausted — return a natural-looking response instead of error
          console.log('[Gemini API] All retries exhausted. Returning graceful fallback.');
          return NextResponse.json({
            reply: '¡Hola! Dame un momento por favor, estoy procesando tu consulta. 😊 ¿Podrías reenviarme tu último mensaje en unos segundos? ¡Gracias por la paciencia!'
          });
        }
        
        // For other types of errors, fail fast without retrying
        throw err;
      }
    }

    const reply = responseText || 'Lo siento, no pude generar una respuesta. Intenta de nuevo.';
    return NextResponse.json({ reply });

  } catch (error: unknown) {
    console.error('Error in chat API:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('401')) {
      return NextResponse.json(
        { error: 'La clave de API no es válida. Verifica tu configuración.' },
        { status: 401 }
      );
    }

    // Friendly fallback message if rate limit (429) is completely exhausted after retries
    if (errorMessage.includes('RATE_LIMIT') || errorMessage.includes('429') || errorMessage.includes('ResourceExhausted')) {
      return NextResponse.json({
        reply: '¡Hola! Dame un momento por favor, estoy procesando tu consulta. 😊 ¿Podrías reenviarme tu último mensaje en unos segundos? ¡Gracias por la paciencia!'
      });
    }

    return NextResponse.json(
      { error: 'Error al procesar el mensaje. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}

