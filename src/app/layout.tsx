import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Demo Agente IA WhatsApp | Bot Inteligente para tu Negocio",
  description:
    "Simulador interactivo de bot de WhatsApp con Inteligencia Artificial. Configura los datos de tu negocio y prueba en tiempo real cómo responde el agente IA a tus clientes.",
  keywords: [
    "WhatsApp bot",
    "agente IA",
    "inteligencia artificial",
    "chatbot",
    "negocio",
    "automatización",
    "demo",
    "Gemini",
  ],
  authors: [{ name: "Gutmark" }],
  openGraph: {
    title: "Demo Agente IA WhatsApp",
    description: "Probá cómo un bot de WhatsApp con IA puede atender a tus clientes 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
