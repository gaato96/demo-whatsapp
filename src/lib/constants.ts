import { Rubro, BusinessConfig, Product } from '@/types';

// Fotos reales de zapatillas de alta resolución (Unsplash CDN)
export const MOCK_SHOE_IMAGES = {
  nike: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', // Nike Air Force 1 Red real photo
  adidas: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=600&auto=format&fit=crop&q=80', // Adidas Classic real photo
  puma: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80', // Puma Suede Green/Grey real photo
};

// Cadenas Base64 minimalistas para enviar a la API de Gemini (simulando fotos reales)
// Son imágenes de 1x1 píxeles de color sólido rojo, azul y verde, respetando los colores predominantes
export const MOCK_SHOE_BASE64 = {
  nike: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', // Red 1x1 png
  adidas: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADEwGPwpCWbgAAAABJRU5ErkJggg==', // Blue 1x1 png
  puma: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEhQGAhKmMIQAAAABJRU5ErkJggg==', // Green 1x1 png
};

// Comprobante de transferencia ficticio para demo
export const TRANSFER_RECEIPT = {
  imageUrl: '/transfer_receipt.png',
  message: 'Hola, acá te envío el comprobante de la transferencia bancaria que acabo de hacer. ¿Podés confirmar que recibieron el pago?',
};

export const DEFAULT_INVENTORY: Product[] = [
  {
    id: 'nike-af1',
    name: 'Nike Air Force 1 Red',
    price: 120000,
    sizes: ['39', '40', '41', '42', '43'],
    stock: 12,
    imageUrl: MOCK_SHOE_IMAGES.nike,
    category: 'Zapatillas',
  },
  {
    id: 'adidas-superstar',
    name: 'Adidas Superstar Classic',
    price: 110000,
    sizes: ['38', '40', '41', '42'],
    stock: 8,
    imageUrl: MOCK_SHOE_IMAGES.adidas,
    category: 'Zapatillas',
  },
  {
    id: 'puma-suede',
    name: 'Puma Suede Green',
    price: 95000,
    sizes: ['39', '41', '42', '43', '44'],
    stock: 15,
    imageUrl: MOCK_SHOE_IMAGES.puma,
    category: 'Zapatillas',
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max Usado',
    price: 1050,
    sizes: [],
    stock: 2,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    category: 'iPhones',
    batteryHealth: 96,
    aestheticDetails: 'Impecable, sin detalles estéticos, incluye caja',
    storage: '256GB',
    color: 'Titanio Natural',
    currency: 'USD',
  },
  {
    id: 'iphone-13-standard',
    name: 'iPhone 13 Standard Usado',
    price: 550,
    sizes: [],
    stock: 4,
    imageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&auto=format&fit=crop&q=80',
    category: 'iPhones',
    batteryHealth: 87,
    aestheticDetails: 'Pequeñas marcas de uso en los bordes, pantalla sin rayas',
    storage: '128GB',
    color: 'Azul',
    currency: 'USD',
  },
  {
    id: 'pizza-muzzarella',
    name: 'Pizza Muzzarella Especial',
    price: 8500,
    sizes: [],
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    category: 'Comida',
    currency: 'ARS',
  },
  {
    id: 'hamburguesa-completa',
    name: 'Hamburguesa Completa con Fritas',
    price: 9500,
    sizes: [],
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    category: 'Comida',
    currency: 'ARS',
  },
  {
    id: 'empanadas-docena',
    name: 'Empanadas de Carne (Docena)',
    price: 12000,
    sizes: [],
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    category: 'Comida',
    currency: 'ARS',
  },
];

export const RUBROS: Rubro[] = [
  {
    id: 'restaurante',
    name: 'Restaurante / Comida',
    icon: '🍕',
    fields: [
      { key: 'menu', label: 'Menú con Precios', placeholder: 'Ej: Pizza Muzzarella - $5000\nEmpanadas x12 - $6000\nMilanesa napolitana - $7500', type: 'textarea' },
      { key: 'delivery', label: 'Delivery (Zona y Costo)', placeholder: 'Ej: Zona Centro gratis, hasta 5km $500', type: 'text' },
      { key: 'deliveryTime', label: 'Tiempo Estimado de Entrega', placeholder: 'Ej: 30-45 minutos', type: 'text' },
      { key: 'promotions', label: 'Promociones Activas', placeholder: 'Ej: 2x1 en pizzas los martes, Happy Hour de 18 a 20hs', type: 'textarea' },
    ],
  },
  {
    id: 'peluqueria',
    name: 'Peluquería / Estética',
    icon: '💇',
    fields: [
      { key: 'services', label: 'Servicios y Precios', placeholder: 'Ej: Corte caballero - $3000\nColor completo - $8000\nMechas - $12000', type: 'textarea' },
      { key: 'appointments', label: 'Sistema de Turnos', placeholder: 'Ej: Se reservan por WhatsApp con 24hs de anticipación', type: 'text' },
      { key: 'duration', label: 'Duración Aproximada por Servicio', placeholder: 'Ej: Corte 30min, Color 2hs', type: 'text' },
      { key: 'products', label: 'Productos que Venden', placeholder: 'Ej: Shampoo L\'Oréal, Cremas Schwarzkopf', type: 'textarea' },
    ],
  },
  {
    id: 'gimnasio',
    name: 'Gimnasio / Fitness',
    icon: '🏋️',
    fields: [
      { key: 'plans', label: 'Planes y Precios', placeholder: 'Ej: Musculación $15000/mes\nPase libre $25000/mes', type: 'textarea' },
      { key: 'classes', label: 'Clases Disponibles', placeholder: 'Ej: Spinning, Yoga, Crossfit, Funcional, Zumba', type: 'textarea' },
      { key: 'classSchedule', label: 'Horarios de Clases', placeholder: 'Ej: Spinning L-M-V 8am y 19pm, Yoga M-J 10am', type: 'textarea' },
      { key: 'trainers', label: 'Profesores / Entrenadores', placeholder: 'Ej: Juan Pérez (Musculación), María López (Yoga)', type: 'text' },
      { key: 'freeTrial', label: 'Clase de Prueba Gratis', placeholder: 'Ej: Sí, primera clase gratis sin compromiso', type: 'text' },
    ],
  },
  {
    id: 'clinica',
    name: 'Clínica / Consultorio',
    icon: '🏥',
    fields: [
      { key: 'specialties', label: 'Especialidades', placeholder: 'Ej: Cardiología, Dermatología, Pediatría, Traumatología', type: 'textarea' },
      { key: 'insurance', label: 'Obras Sociales / Seguros', placeholder: 'Ej: OSDE, Swiss Medical, Galeno, Particular', type: 'textarea' },
      { key: 'appointmentSystem', label: 'Cómo Sacar Turno', placeholder: 'Ej: Por WhatsApp o llamando al 11-XXXX-XXXX', type: 'text' },
      { key: 'preparation', label: 'Preparación para Estudios', placeholder: 'Ej: Análisis de sangre requiere 8hs de ayuno', type: 'textarea' },
    ],
  },
  {
    id: 'hotel',
    name: 'Hotel / Alojamiento',
    icon: '🏨',
    fields: [
      { key: 'rooms', label: 'Tipos de Habitación y Tarifas', placeholder: 'Ej: Single $50USD/noche\nDoble $80USD/noche\nSuite $150USD/noche', type: 'textarea' },
      { key: 'amenities', label: 'Amenities', placeholder: 'Ej: WiFi gratis, piscina, gimnasio, desayuno incluido', type: 'textarea' },
      { key: 'checkInOut', label: 'Check-in / Check-out', placeholder: 'Ej: Check-in 14:00, Check-out 10:00', type: 'text' },
      { key: 'cancellation', label: 'Política de Cancelación', placeholder: 'Ej: Cancelación gratuita hasta 48hs antes', type: 'text' },
    ],
  },
  {
    id: 'tienda',
    name: 'Tienda / E-commerce',
    icon: '🛒',
    fields: [
      { key: 'catalog', label: 'Catálogo Destacado', placeholder: 'Ej: Remera básica $5000\nJean slim $12000\nZapatillas running $25000', type: 'textarea' },
      { key: 'shipping', label: 'Formas de Envío', placeholder: 'Ej: Correo Argentino 3-5 días, Moto envío CABA 24hs', type: 'textarea' },
      { key: 'returns', label: 'Política de Devolución', placeholder: 'Ej: 30 días para cambio, producto sin uso con etiqueta', type: 'text' },
    ],
  },
  {
    id: 'iphones',
    name: 'Compra y Venta de iPhones',
    icon: '📱',
    fields: [
      { key: 'warranty', label: 'Garantía en Equipos', placeholder: 'Ej: Todos nuestros equipos cuentan con 90 días de garantía escrita', type: 'text' },
      { key: 'conditions', label: 'Requisitos de Equipos en Parte de Pago', placeholder: 'Ej: Tomamos equipos a partir del iPhone 11. Deben tener batería mayor a 80%, pantalla original y no tener bypass/bloqueo de iCloud.', type: 'textarea' },
      { key: 'paymentInfoUSD', label: 'Medios de Pago e Impuestos', placeholder: 'Ej: Aceptamos dólares billete (cara grande, sin marcas), transferencia bancaria en pesos al valor del Dólar Blue del día, y Mercado Pago con 10% de recargo.', type: 'textarea' },
    ],
  },
  {
    id: 'educacion',
    name: 'Educación / Cursos',
    icon: '📚',
    fields: [
      { key: 'courses', label: 'Cursos Disponibles', placeholder: 'Ej: Marketing Digital (3 meses) $30000\nDiseño Web (6 meses) $50000', type: 'textarea' },
      { key: 'modality', label: 'Modalidad', placeholder: 'Ej: Online en vivo por Zoom, Presencial en sede, Grabado', type: 'text' },
      { key: 'certification', label: 'Certificación', placeholder: 'Ej: Certificado digital avalado por la institución', type: 'text' },
      { key: 'duration', label: 'Duración y Horarios', placeholder: 'Ej: 3 meses, clases martes y jueves de 19 a 21hs', type: 'text' },
    ],
  },
  {
    id: 'servicios',
    name: 'Servicios Profesionales',
    icon: '🔧',
    fields: [
      { key: 'serviceList', label: 'Servicios Ofrecidos', placeholder: 'Ej: Plomería, Electricidad, Pintura, Albañilería', type: 'textarea' },
      { key: 'coverage', label: 'Zonas de Cobertura', placeholder: 'Ej: CABA y GBA Norte (hasta 30km)', type: 'text' },
      { key: 'budget', label: 'Presupuesto', placeholder: 'Ej: Presupuesto sin cargo, visita a domicilio gratis', type: 'text' },
      { key: 'warranty', label: 'Garantía', placeholder: 'Ej: 6 meses de garantía en todos los trabajos', type: 'text' },
    ],
  },
  {
    id: 'automotriz',
    name: 'Automotriz / Taller',
    icon: '🚗',
    fields: [
      { key: 'services', label: 'Servicios (mecánica, chapa, pintura)', placeholder: 'Ej: Service completo $25000, Cambio de aceite $8000', type: 'textarea' },
      { key: 'brands', label: 'Marcas Atendidas', placeholder: 'Ej: Todas las marcas, especialistas en VW y Ford', type: 'text' },
      { key: 'appointment', label: 'Turno Previo', placeholder: 'Ej: Se requiere turno, reservar por WhatsApp', type: 'text' },
      { key: 'budget', label: 'Presupuesto', placeholder: 'Ej: Diagnóstico gratis, presupuesto sin compromiso', type: 'text' },
    ],
  },
  {
    id: 'otro',
    name: 'Otro / Personalizado',
    icon: '🎨',
    fields: [
      { key: 'services', label: 'Productos o Servicios', placeholder: 'Describe tus productos o servicios principales con precios', type: 'textarea' },
      { key: 'customInfo', label: 'Información Adicional', placeholder: 'Cualquier información relevante para el bot', type: 'textarea' },
    ],
  },
];

export const DEFAULT_IPHONE_TRADE_IN = [
  { model: 'iPhone 11', minPrice: 200, maxPrice: 280 },
  { model: 'iPhone 12', minPrice: 300, maxPrice: 380 },
  { model: 'iPhone 13', minPrice: 420, maxPrice: 520 },
  { model: 'iPhone 14', minPrice: 550, maxPrice: 680 },
  { model: 'iPhone 15', minPrice: 750, maxPrice: 900 },
];

export const DEFAULT_CONFIG: BusinessConfig = {
  businessName: '',
  rubro: 'restaurante',
  schedule: '',
  address: '',
  contactPhone: '',
  contactEmail: '',
  socialMedia: '',
  paymentMethods: '',
  welcomeMessage: '',
  faq: '',
  botPersonality: '',
  rubroFields: {},
  iphoneTradeInSettings: DEFAULT_IPHONE_TRADE_IN,
};

export const AUDIO_PROMPTS = [
  '(El cliente envió un mensaje de voz preguntando por los horarios de atención y disponibilidad. Interpreta este audio y responde de forma natural como si lo hubieras escuchado.)',
  '(El cliente envió un mensaje de voz preguntando por los precios y servicios disponibles. Interpreta este audio y responde de forma natural.)',
  '(El cliente envió un mensaje de voz pidiendo información general sobre el negocio. Responde como si hubieras escuchado su consulta.)',
  '(El cliente envió un mensaje de voz consultando cómo puede reservar o hacer un pedido. Responde naturalmente.)',
  '(El cliente envió un mensaje de voz preguntando por promociones o descuentos actuales. Responde de forma amigable.)',
];

