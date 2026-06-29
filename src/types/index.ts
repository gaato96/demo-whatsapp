export interface RubroField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea';
}

export interface Rubro {
  id: string;
  name: string;
  icon: string;
  fields: RubroField[];
}

export interface TradeInOption {
  model: string;
  minPrice: number;
  maxPrice: number;
}

export interface DolarBlueRate {
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export interface BusinessConfig {
  businessName: string;
  rubro: string;
  schedule: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  socialMedia: string;
  paymentMethods: string;
  welcomeMessage: string;
  faq: string;
  botPersonality: string;
  // Dynamic rubro fields stored as key-value
  rubroFields: Record<string, string>;
  iphoneTradeInSettings?: TradeInOption[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sizes: string[];
  stock: number;
  imageUrl: string;
  category: string;
  // iPhone specific properties (optional)
  batteryHealth?: number;
  aestheticDetails?: string;
  storage?: string;
  color?: string;
  currency?: 'USD' | 'ARS';
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  deliveryType: 'envio' | 'retiro';
  shippingAddress?: string;
  status: 'confirmed' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending_payment';
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
  audioDuration?: number;
  imageUrl?: string;      // URL for rendering on screen
  base64Data?: string;    // Base64 string for API processing
  attachedProduct?: Product; // Associated product metadata for rendering interactive cards
}

