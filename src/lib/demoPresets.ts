import { BusinessConfig, Product, Booking } from '@/types';

export interface DemoPreset {
  slug: string;
  rubroLabel: string;
  icon: string;
  accentColor: string;         // Tailwind gradient for welcome screen
  accentHex: string;           // Hex for inline styles
  tagline: string;             // Short tagline shown on welcome screen
  defaultName: string;         // Placeholder business name used before user types
  config: BusinessConfig;
  inventory: Product[];
  initialBookings?: Booking[];
}

// ─────────────────────────────────────────────
//  🍕  COMIDA / GASTRONOMÍA (MENU COMPLETO)
// ─────────────────────────────────────────────
const comidaConfig: BusinessConfig = {
  businessName: 'La Trattoria',
  rubro: 'restaurante',
  schedule: 'Lunes a Domingo de 11:30 a 23:30 hs',
  address: 'San Martín 580, Local 3, Tucumán',
  contactPhone: '+54 381 555-1234',
  contactEmail: 'pedidos@latrattoria.com.ar',
  socialMedia: 'Instagram: @latrattoria.tuc | Facebook: La Trattoria Tucumán',
  paymentMethods: 'Efectivo, Transferencia bancaria, Mercado Pago, Tarjetas de crédito/débito',
  welcomeMessage: '¡Hola! 👋 Bienvenido a *La Trattoria* 🍕\n\nTenemos el menú más completo de minutas, lomitos, pizzas, empanadas y comida mexicana de Tucumán. ¿Qué te gustaría pedir hoy?\n\nPodés consultarme la carta, precios, promociones, o hacerme tu pedido directamente por acá 😊',
  faq: `¿Hacen envíos? Sí, delivery disponible a toda la ciudad de San Miguel de Tucumán. Costo: zona centro gratis, resto $800.
¿Cuánto tarda el delivery? Entre 30 y 45 minutos promedio.
¿Tienen opciones sin TACC? Sí, pizzas y empanadas sin gluten con previo aviso (requiere 24hs de anticipación).
¿Se puede pagar con tarjeta? Sí, aceptamos todas las tarjetas de débito/crédito con código QR o posnet móvil.
¿Tienen lugar para comer ahí? Sí, salón amplio con aire acondicionado y espacio infantil.`,
  botPersonality: 'Sos un asistente simpático, rápido y muy conocedor del menú. Usás emojis de comida de forma divertida y moderada. Sos claro con los precios y sugerís aderezos o bebidas adicionales para agrandar el pedido. Si te piden sugerencias, recomendás el Sándwich de Milanesa Completo o los Lomitos, que son la especialidad de la casa.',
  rubroFields: {
    menu: `🍕 PIZZAS (grandes de 8 porciones)
- Pizza Muzzarella Especial - $8.500
- Pizza Napolitana (con rodajas de tomate y ajo) - $9.200
- Pizza Fugazzeta (muzzarella y cebolla) - $9.800
- Pizza Cuatro Quesos - $10.500
- Pizza de Rúcula y Jamón Crudo - $12.000

🥟 EMPANADAS (precio por docena / consultar unidad)
- Empanadas de Carne a Cuchillo - $12.000
- Empanadas de Pollo al Verdeo - $11.500
- Empanadas de Jamón y Queso - $10.800
- Empanadas de Humita (choclo y queso) - $10.500

🥪 SÁNDWICHES DE MILANESA (típicos tucumanos, pan sanguchero gigante)
- Sándwich de Milanesa Simple - $7.500
- Sándwich de Milanesa Completo (lechuga, tomate, huevo frito y queso) - $9.500
- Sándwich de Milanesa Súper (con papas fritas adentro) - $11.000

🥩 LOMITOS (en pan sanguchero premium)
- Lomito Clásico - $9.000
- Lomito Completo (jamón, queso, huevo, lechuga y tomate) - $11.500
- Lomito Súper "La Trattoria" (doble carne, cheddar, bacon y aderezo especial) - $13.500

🍽️ MILANESAS A LA NAPOLITANA (servidas con papas fritas)
- Napolitana Individual con papas fritas - $10.500
- Napolitana para Compartir (comen 2-3 personas) con papas fritas - $18.500

🌮 COMIDA MEXICANA
- Tacos de Carne Desmechada (porción de 3 unidades) - $9.500
- Quesadillas de Pollo y Queso fundido - $8.800
- Nachos con salsa Cheddar y Guacamole casero - $7.500

🍰 TARTAS CASERAS (con ensalada de guarnición)
- Tarta de Jamón y Queso - $6.500
- Tarta de Verdura, Huevo y Queso - $6.000

🥤 BEBIDAS
- Gaseosas 1.5L (Coca-Cola, Sprite) - $2.800
- Cerveza Quilmes/Stella Artois 1L - $3.500
- Agua mineral o Saborizada 500ml - $1.500`,
    delivery: 'Zona Centro (hasta 3km): GRATIS. Zona Norte/Sur/Oeste (3-7km): $800. Zona Gran Tucumán: $1.500.',
    deliveryTime: '30 a 45 minutos. Los fines de semana puede extenderse hasta 60 minutos.',
    promotions: `⭐ PROMO MARTES 2x1: En pizzas grandes de Muzzarella y Napolitana.
⭐ COMBO MILANESA: 2 Sándwiches de Milanesa Completos + 1 Gaseosa 1.5L por $20.000.
⭐ COMBO AMIGOS: 1 Docena de empanadas + 1 Pizza Muzzarella + 1 Cerveza 1L por $22.000.
⭐ DESCUENTO EFECTIVO: 10% de descuento en tu compra pagando al retirar del local.`,
  },
};

const comidaInventory: Product[] = [
  { id: 'pizza-muzzarella', name: 'Pizza Muzzarella Especial', price: 8500, sizes: [], stock: 40, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80', category: 'Pizzas', currency: 'ARS' },
  { id: 'empanadas-carne', name: 'Empanadas de Carne (Docena)', price: 12000, sizes: [], stock: 60, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80', category: 'Empanadas', currency: 'ARS' },
  { id: 'sandwich-milanesa', name: 'Sándwich de Milanesa Completo', price: 9500, sizes: [], stock: 50, imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80', category: 'Sándwiches', currency: 'ARS' },
  { id: 'lomito-super', name: 'Lomito Súper La Trattoria', price: 13500, sizes: [], stock: 30, imageUrl: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=600&auto=format&fit=crop&q=80', category: 'Lomitos', currency: 'ARS' },
  { id: 'milanesa-napolitana', name: 'Milanesa Napolitana con Fritas (Compartir)', price: 18500, sizes: [], stock: 20, imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80', category: 'Minutas', currency: 'ARS' },
  { id: 'tacos-mexicanos', name: 'Tacos de Carne (3 unidades)', price: 9500, sizes: [], stock: 25, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80', category: 'Mexicana', currency: 'ARS' },
  { id: 'tarta-jamon-queso', name: 'Tarta de Jamón y Queso', price: 6500, sizes: [], stock: 15, imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80', category: 'Tartas', currency: 'ARS' },
  { id: 'gaseosa-coca', name: 'Coca-Cola 1.5L', price: 2800, sizes: [], stock: 100, imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80', category: 'Bebidas', currency: 'ARS' },
];

// ─────────────────────────────────────────────
//  🍔  HAMBURGUESERÍA (ESTILO LENO / BILLY BOB)
// ─────────────────────────────────────────────
const hamburguesasConfig: BusinessConfig = {
  businessName: 'Leno Burger & Co',
  rubro: 'restaurante',
  schedule: 'Martes a Domingo de 19:30 a 00:30 hs | Lunes cerrado',
  address: 'Av. Sarmiento 740, Tucumán',
  contactPhone: '+54 381 555-5566',
  contactEmail: 'hola@lenoburger.com',
  socialMedia: 'Instagram: @lenoburger.co | TikTok: @lenosmash',
  paymentMethods: 'Efectivo, Mercado Pago, Transferencia bancaria, Tarjetas de débito/crédito',
  welcomeMessage: '¡Hola! 🍔 Bienvenido a *Leno Burger & Co* 🔥\n\nHacemos las hamburguesas Smashed más extremas de la ciudad, cebolla caramelizada, panceta crocante y mucho cheddar.\n\n¿Estás para pedir unas burgers hoy? Escribime para ver el menú o armar tu pedido 😋',
  faq: `¿Hacen envíos? Sí, hacemos envíos con delivery propio. Costo de envío: zona de cobertura estándar $900.
¿Qué es el estilo Oklahoma? Hacemos un smash directo de la bola de carne sobre láminas súper finas de cebolla, lo que le da una jugosidad única al caramelizarse en la plancha.
¿Tienen hamburguesas vegetarianas o veganas? Sí, tenemos la Burger Veggie con medallón NotCo y queso vegetal.
¿Los panes son caseros? Sí, horneamos nuestros panes de papa diariamente para asegurar la máxima esponjosidad.`,
  botPersonality: 'Sos un cajero de hamburguesería joven, buena onda, informal pero muy eficiente. Usás expresiones como "che", "de una", "buenísimo" y emojis de hamburguesas y fuego. Conocés al detalle cada burger y podés explicar la diferencia entre una clásica y una Oklahoma smash. Siempre sugerís agregar papas cheddar o bebida para armar el combo.',
  rubroFields: {
    menu: `🍔 HAMBURGUESAS SMASH (Incluyen papas fritas simples)
- Cheeseburger Clásica Simple (1 medallón de carne de 120g, doble cheddar, aderezo Leno) - $7.500
- Cheeseburger Clásica Doble (2 medallones de carne, 4 cheddars, aderezo Leno) - $9.800
- Oklahoma Onion Smash Doble (2 medallones de 120g smashed con cebolla fina en la plancha, 4 cheddars, pepinillos, aderezo especial) - $10.500
- Americana Doble (2 medallones, 4 cheddars, doble panceta crocante, huevo frito y salsa BBQ) - $11.500
- Billy Bacon Burger (2 medallones, triple cheddar, cebolla caramelizada, doble ración de panceta ahumada y salsa ahumada) - $12.000
- Leno Extrema Triple (3 medallones smashed de 120g, 6 fetas de cheddar, panceta picada, cebolla crispy y salsa de la casa) - $14.500
- Not Burger Veggie (Medallón de plantas NotCo, cheddar vegano, lechuga, tomate y aderezo NotMayo) - $9.200

🍟 ACOMPAÑAMIENTOS
- Papas Fritas Simples - $3.500
- Papas Leno (Cheddar fundido, panceta picada crocante y cebollita de verdeo) - $5.500
- Aros de Cebolla con salsa BBQ - $4.000

🥤 BEBIDAS
- Gaseosas lata 354ml - $1.800
- Cerveza IPA Artesanal (Lata) - $3.200
- Agua mineral - $1.500`,
    delivery: 'Envíos en Yerba Buena y San Miguel de Tucumán en zonas delimitadas. Envío estándar: $900.',
    deliveryTime: '30 a 50 minutos. Los fines de semana la espera puede ser de hasta 60-70 minutos.',
    promotions: `⭐ COMBO SHOCK: Oklahoma Smash Doble + Papas Leno + Gaseosa Lata por $14.500
⭐ Miércoles de Amigos: Llevando 3 Burgers Dobles (cualquiera), las papas simples se duplican gratis.
⭐ 10% OFF en Efectivo realizando tu pedido para pasar a retirar (Take Away).`,
  },
};

const hamburguesasInventory: Product[] = [
  { id: 'burger-classic-double', name: 'Cheeseburger Clásica Doble', price: 9800, sizes: [], stock: 40, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', category: 'Burgers', currency: 'ARS' },
  { id: 'burger-oklahoma-double', name: 'Oklahoma Onion Smash Doble', price: 10500, sizes: [], stock: 35, imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80', category: 'Burgers', currency: 'ARS' },
  { id: 'burger-americana', name: 'Hamburguesa Americana Doble', price: 11500, sizes: [], stock: 30, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', category: 'Burgers', currency: 'ARS' },
  { id: 'burger-bacon-billy', name: 'Billy Bacon Burger Doble', price: 12000, sizes: [], stock: 25, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', category: 'Burgers', currency: 'ARS' },
  { id: 'papas-cargadas-cheddar', name: 'Papas Fritas Leno (Cheddar y Bacon)', price: 5500, sizes: [], stock: 50, imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop&q=80', category: 'Papas', currency: 'ARS' },
  { id: 'gaseosa-lata', name: 'Gaseosa Lata 354ml', price: 1800, sizes: [], stock: 120, imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80', category: 'Bebidas', currency: 'ARS' },
];

// ─────────────────────────────────────────────
//  📱  COMPRA Y VENTA DE IPHONES (UP TO 17 PRO MAX, NO ENVIOS)
// ─────────────────────────────────────────────
const iphoneConfig: BusinessConfig = {
  businessName: 'iStore Tucumán',
  rubro: 'iphones',
  schedule: 'Lunes a Sábado de 9:00 a 20:00 hs',
  address: 'Av. Aconquija 1250, Yerba Buena, Tucumán',
  contactPhone: '+54 381 555-9876',
  contactEmail: 'ventas@istoretucuman.com.ar',
  socialMedia: 'Instagram: @istore.tucuman | TikTok: @istoretuc',
  paymentMethods: 'Dólares billete (cara grande, sin marcas), Transferencia en pesos al valor del Dólar Blue del día, Mercado Pago (+10% recargo)',
  welcomeMessage: '¡Hola! 👋 Bienvenido a *iStore Tucumán* 📱\n\nSomos especialistas en compra, venta y canje de iPhones nuevos y usados certificados en Tucumán. Contamos con stock físico inmediato desde el iPhone 11 hasta el iPhone 17 Pro Max.\n\n⚠️ *Aviso importante:* Todas nuestras operaciones se realizan exclusivamente con retiro en nuestro local físico. No hacemos envíos de mercadería por seguridad.\n\n¿Estás buscando comprar un equipo, o querés tasar el tuyo para entregarlo en parte de pago?',
  faq: `¿Hacen envíos? No hacemos envíos de equipos bajo ninguna circunstancia. Todas las compras y canjes se concretan retirando en nuestro local físico en Av. Aconquija 1250, Yerba Buena.
¿Los equipos tienen garantía? Sí, todos nuestros equipos cuentan con 90 días de garantía escrita. Podés extenderla a 6 meses por un adicional de $50 USD.
¿Qué requisitos debe cumplir mi equipo usado? Debe encender, tener batería superior al 78%, pantalla original sin líneas ni manchas, Face ID/Touch ID funcionando, y libre de iCloud.
¿Aceptan transferencia? Sí, en pesos argentinos al valor del Dólar Blue Venta del día de la operación.
¿Los precios son negociables? Los valores publicados son finales, pero podemos mejorar la cotización de toma de tu equipo usado si está en condiciones óptimas (batería >90%, sin detalles estéticos).`,
  botPersonality: 'Sos un asesor de tecnología Apple experto, formal, transparente y muy detallista. Siempre preguntás la ficha técnica completa del equipo del cliente (modelo, capacidad, salud de batería, detalles estéticos) antes de dar una tasación definitiva. Explicás claramente que no se realizan envíos por seguridad. Al concretar un pedido, solicitás el nombre del cliente y el modelo a retirar, y disparás la acción "create_order" especificando siempre el detalle del canje en el campo "tradeInDetails".',
  rubroFields: {
    warranty: '90 días de garantía escrita oficial. Extensión a 6 meses por $50 USD.',
    conditions: 'Tomamos equipos a partir del iPhone 11. Requisitos excluyentes: pantalla original sin reemplazos, Face ID activo, batería >= 78%, libre de iCloud y de bloqueo de red (apto para cualquier chip).',
    paymentInfoUSD: 'Precios en USD. Aceptamos dólares billete (cara grande, sin tachaduras) o pesos argentinos vía transferencia bancaria calculados a la cotización del Dólar Blue Venta en tiempo real.',
  },
  iphoneTradeInSettings: [
    { model: 'iPhone 11', minPrice: 200, maxPrice: 270 },
    { model: 'iPhone 12', minPrice: 300, maxPrice: 380 },
    { model: 'iPhone 13', minPrice: 420, maxPrice: 520 },
    { model: 'iPhone 14', minPrice: 550, maxPrice: 680 },
    { model: 'iPhone 15', minPrice: 700, maxPrice: 880 },
    { model: 'iPhone 15 Pro Max', minPrice: 850, maxPrice: 1050 },
    { model: 'iPhone 16', minPrice: 800, maxPrice: 980 },
    { model: 'iPhone 16 Pro Max', minPrice: 1000, maxPrice: 1220 },
    { model: 'iPhone 17', minPrice: 1100, maxPrice: 1350 },
    { model: 'iPhone 17 Pro Max', minPrice: 1300, maxPrice: 1580 },
  ],
};

const iphoneInventory: Product[] = [
  { id: 'ip17promax-256', name: 'iPhone 17 Pro Max (Usado Certificado)', price: 1580, sizes: [], stock: 1, imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 100, aestheticDetails: 'Como nuevo, sin un solo detalle, incluye caja original', storage: '256GB', color: 'Titanio Desierto', currency: 'USD' },
  { id: 'ip16promax-256', name: 'iPhone 16 Pro Max (Usado Certificado)', price: 1250, sizes: [], stock: 2, imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 96, aestheticDetails: 'Impecable, film protector colocado en pantalla', storage: '256GB', color: 'Titanio Natural', currency: 'USD' },
  { id: 'ip15promax-256', name: 'iPhone 15 Pro Max (Usado Certificado)', price: 980, sizes: [], stock: 3, imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 92, aestheticDetails: 'Excelente estado, marcas leves de funda en bordes', storage: '256GB', color: 'Titanio Azul', currency: 'USD' },
  { id: 'ip14-128', name: 'iPhone 14 (Usado Certificado)', price: 620, sizes: [], stock: 4, imageUrl: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 88, aestheticDetails: 'Buen estado general, marcas normales de uso diario', storage: '128GB', color: 'Púrpura', currency: 'USD' },
  { id: 'ip13-128', name: 'iPhone 13 (Usado Certificado)', price: 510, sizes: [], stock: 5, imageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 85, aestheticDetails: 'Buen estado, detalle estético mínimo en cámara trasera (no afecta funcionamiento)', storage: '128GB', color: 'Azul', currency: 'USD' },
];

// ─────────────────────────────────────────────
//  💇  ESTÉTICA / PELUQUERÍA
// ─────────────────────────────────────────────
const esteticaConfig: BusinessConfig = {
  businessName: 'Estética Camila',
  rubro: 'peluqueria',
  schedule: 'Martes a Sábado de 9:00 a 20:00 hs | Lunes cerrado',
  address: 'Mendoza 340, San Miguel de Tucumán',
  contactPhone: '+54 381 555-4321',
  contactEmail: 'turnos@esteticacamila.com.ar',
  socialMedia: 'Instagram: @estetica.camila | Facebook: Estética Camila Tucumán',
  paymentMethods: 'Efectivo, Transferencia bancaria, Mercado Pago',
  welcomeMessage: '¡Hola! ✨ Bienvenida a *Estética Camila* 💇\n\nSomos tu centro de belleza de confianza en Tucumán. Podés sacar turno, consultar precios o preguntarme lo que necesites.\n\n¿Cómo te puedo ayudar hoy?',
  faq: `¿Se necesita turno previo? Sí, trabajamos exclusivamente con turno para garantizarte la atención sin esperas.
¿Cuánto dura la espera para conseguir turno? Generalmente hay turnos disponibles dentro de los próximos 2-3 días.
¿Aceptan Mercado Pago? Sí, con QR en el local.
¿Tienen estacionamiento? Hay estacionamiento en la calle con parquímetro frente al local.
¿Los productos que usan son de marca? Sí, trabajamos exclusivamente con líneas L'Oréal Professionnel y Schwarzkopf.`,
  botPersonality: 'Sos una asistente amable, femenina y muy profesional del mundo de la belleza. Conocés todos los servicios al detalle, podés hacer recomendaciones personalizadas según el tipo de cabello o el look deseado. Usás emojis sutiles. Siempre recordás que los turnos se confirman enviando el nombre completo.',
  rubroFields: {
    services: `💇 CORTES
- Corte de cabello dama - $5.500
- Corte con secado y planchado - $8.500
- Corte caballero - $3.800
- Corte infantil (hasta 12 años) - $3.000

🎨 COLOR Y DECOLORACIÓN
- Color completo (sin mechas) - $12.000
- Mechas balayage (sin corte) - $22.000
- Mechas fantasía - $18.000
- Retoque de raíz - $9.500
- Decoloración completa - $20.000

✨ TRATAMIENTOS
- Keratina Brasileña (desde $18.000 según largo)
- Hidratación profunda - $8.000
- Botox capilar - $14.000

💅 MANICURA Y PEDICURA
- Manicura tradicional - $4.500
- Semipermanente (esmaltado gel) - $7.500
- Pedicura completa - $7.000`,
    appointments: 'Turnos con 24 hs de anticipación. Ante cancelación, avisar con al menos 4 hs de anticipación para no perder el turno.',
    duration: 'Corte: 30-45 min | Color: 1.5 a 2 hs | Mechas: 2 a 3 hs | Keratina: 3 a 4 hs.',
    products: 'Vendemos líneas de shampoo, acondicionadores y tratamientos L\'Oréal Professionnel y Schwarzkopf Bonacure para uso en casa. Consultá precios en el local.',
  },
};

const esteticaBookings: Booking[] = [
  { id: 'book-est-1', clientName: 'Laura González', clientPhone: '+54 381 600-1111', date: '2026-07-05', time: '10:00', service: 'Mechas Balayage', status: 'confirmed', createdAt: new Date() },
  { id: 'book-est-2', clientName: 'Sofía Martínez', clientPhone: '+54 381 600-2222', date: '2026-07-05', time: '14:00', service: 'Color Completo + Corte', status: 'confirmed', createdAt: new Date() },
  { id: 'book-est-3', clientName: 'Valentina Ruiz', clientPhone: '+54 381 600-3333', date: '2026-07-07', time: '11:00', service: 'Keratina Brasileña', status: 'pending', createdAt: new Date() },
];

// ─────────────────────────────────────────────
//  🏥  CENTRO MÉDICO / CLÍNICA
// ─────────────────────────────────────────────
const medicoConfig: BusinessConfig = {
  businessName: 'Clínica Bienestar',
  rubro: 'clinica',
  schedule: 'Lunes a Viernes de 7:00 a 20:00 hs | Sábados de 8:00 a 13:00 hs',
  address: 'Av. Roca 1245, 2° Piso, San Miguel de Tucumán',
  contactPhone: '+54 381 555-7000',
  contactEmail: 'turnos@clinicabienestar.com.ar',
  socialMedia: 'Instagram: @clinicabienestar.tuc | Facebook: Clínica Bienestar Tucumán',
  paymentMethods: 'Efectivo, Obras sociales, Tarjetas de crédito y débito, Transferencia bancaria',
  welcomeMessage: '¡Hola! 👋 Bienvenido al asistente virtual de *Clínica Bienestar* 🏥\n\nEstoy aquí para ayudarte a sacar turno, informarte sobre nuestras especialidades y obras sociales, o responder cualquier consulta.\n\n¿En qué te puedo ayudar?',
  faq: `¿Qué obras sociales aceptan? OSDE, Swiss Medical, Galeno, OMINT, IOMA, PAMI, IOSPER, y atención particular.
¿Se puede sacar turno online? Sí, directamente por este WhatsApp o llamando al 381 555-7000.
¿Cuánto demoran los turnos? Depende de la especialidad. Clínica médica y pediatría suelen tener disponibilidad en 24-48hs. Especialidades como cardiología pueden demorar de 3 a 7 días.
¿Hacen análisis de sangre en ayunas? Sí, de 7 a 10 hs. No se necesita turno para laboratorio.
¿Los resultados de laboratorio son online? Sí, disponibles en nuestro portal web en 24-48 hs laborables.`,
  botPersonality: 'Sos un asistente médico administrativo formal, empático y muy claro. Jamás das diagnósticos ni consejos médicos. Siempre aclarás que para cualquier consulta médica es necesaria la consulta con el profesional. Sos eficiente para gestionar turnos y muy conocedor de las obras sociales y especialidades disponibles.',
  rubroFields: {
    specialties: `🩺 Clínica Médica (Dr. García)
❤️ Cardiología (Dr. Pérez)
👶 Pediatría (Dra. López)
🧠 Neurología (Dr. Fernández)
🦴 Traumatología y Ortopedia (Dr. Rodríguez)
🌿 Dermatología (Dra. Sosa)
👁️ Oftalmología (Dr. Méndez)
🧪 Laboratorio de Análisis Clínicos
📊 Diagnóstico por Imágenes (Ecografías, Radiografías)`,
    insurance: 'OSDE (todos los planes), Swiss Medical, Galeno, OMINT, IOMA, PAMI, IOSPER, Medicus. Atención particular con descuento del 15% pagando en efectivo.',
    appointmentSystem: 'Por este WhatsApp o llamando al 381 555-7000. Horario de administración: L-V 7:00 a 19:00 hs.',
    preparation: 'Análisis de sangre: 8hs de ayuno, solo agua permitida. Ecografía abdominal: 4hs de ayuno. Ecografía pélvica: vejiga llena (tomar 1 litro de agua 1 hora antes). Consultar caso a caso.',
  },
};

const medicoBookings: Booking[] = [
  { id: 'book-med-1', clientName: 'Carlos Pérez', clientPhone: '+54 381 600-4444', date: '2026-07-04', time: '09:00', service: 'Cardiología — Dr. Pérez', status: 'confirmed', createdAt: new Date() },
  { id: 'book-med-2', clientName: 'María Ríos', clientPhone: '+54 381 600-5555', date: '2026-07-04', time: '10:30', service: 'Dermatología — Dra. Sosa', status: 'confirmed', createdAt: new Date() },
  { id: 'book-med-3', clientName: 'Tomás Herrera', clientPhone: '+54 381 600-6666', date: '2026-07-05', time: '08:00', service: 'Clínica Médica — Dr. García', status: 'pending', createdAt: new Date() },
];

// ─────────────────────────────────────────────
//  🥩  CARNICERÍA (ARGENTINE CUTS & PRICES)
// ─────────────────────────────────────────────
const carniceriaConfig: BusinessConfig = {
  businessName: 'Carnicería El Gaucho',
  rubro: 'tienda',
  schedule: 'Lunes a Sábados de 7:30 a 13:30 y de 17:00 a 21:00 hs | Domingos de 8:30 a 13:00 hs',
  address: 'Belgrano 1400, Barrio Norte, Tucumán',
  contactPhone: '+54 381 555-8800',
  contactEmail: 'elgaucho@carniceria.com.ar',
  socialMedia: 'Instagram: @carniceria.elgaucho',
  paymentMethods: 'Efectivo, Transferencia bancaria (Mercado Pago, Cuenta DNI, BNA+), Tarjetas de débito/crédito sin recargo',
  welcomeMessage: '¡Hola! 👋 Bienvenido a *Carnicería El Gaucho* 🥩\n\nOfrecemos los mejores cortes de novillo seleccionado, pollo fresco, embutidos artesanales y todo lo necesario para tu asado. ¿En qué corte estás pensando para hoy?',
  faq: `¿Hacen envíos? Sí, delivery a domicilio sin cargo para compras superiores a $15.000 en un radio de 4km. Para montos menores o zonas alejadas, el envío cuesta $800.
¿Tienen carbón y leña? Sí, bolsa de carbón de quebracho de 5kg y bolsa de leña seca de espinillo de 10kg disponibles para agregar a tu pedido.
¿Tienen achuras frescas? Sí, mollejas, chinchulines, riñones y tripa gorda entran los días miércoles y viernes frescos de frigorífico.
¿Venden carne envasada al vacío? Sí, podemos envasar al vacío cualquier corte que pidas para que te dure más tiempo en la heladera o freezer.`,
  botPersonality: 'Sos un carnicero de barrio muy experimentado, gaucho, servicial y apasionado de la parrilla y la cocina argentina. Respondés con modismos cordiales y conocés a la perfección para qué sirve cada corte (ej: nalga o cuadrada para milanesas, vacío o asado para parrilla, lomo para bifes tiernos). Brindás los precios por kilo claramente y sugerís carbón o embutidos si el cliente menciona un asado.',
  rubroFields: {
    catalog: `🥩 CORTES PARA PARRILLA (precio por kg)
- Asado de tira especial - $7.500/kg
- Vacío premium - $8.200/kg
- Entraña seleccionada - $9.800/kg
- Tapa de asado - $6.200/kg
- Costilla de ternera - $6.800/kg
- Matambre - $7.800/kg

🥩 CORTES PARA MILANESAS Y GUISOS
- Nalga para Milanesa (bifes cortados listos) - $6.500/kg
- Cuadrada para Milanesa - $5.900/kg
- Lomo premium (super tierno) - $11.000/kg
- Peceto - $9.500/kg
- Roast beef (ideal estofado/carne picada) - $4.900/kg
- Osobuco - $3.800/kg

🍗 POLLO FRESCO
- Pollo entero (limpio) - $2.800/kg
- Suprema de pollo fileteada - $5.500/kg
- Pata y muslo (x kg) - $3.200/kg

🌭 ACHURAS Y EMBUTIDOS
- Chorizo criollo artesanal - $4.500/kg
- Morcilla bombón - $3.800/kg
- Chinchulín limpio - $4.000/kg
- Mollejas tiernas - $5.500/kg

🔥 PARA EL FUEGO (COMPLEMENTOS)
- Carbón vegetal de Quebracho (bolsa 5kg) - $3.500
- Leña seca de Espinillo (bolsa 10kg) - $4.000`,
    shipping: 'Delivery a domicilio rápido en moto en zonas aledañas. Sin cargo para pedidos de más de $15.000. Caso contrario cuesta $800.',
    returns: 'Al ser productos frescos perecederos, no se aceptan devoluciones. Si hay un reclamo sobre la cadena de frío o estado, contactarse dentro de las 2 horas de recibido.',
  },
};

const carniceriaInventory: Product[] = [
  { id: 'asado-tira', name: 'Asado de Tira Especial (por kg)', price: 7500, sizes: [], stock: 35, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80', category: 'Parrilla', currency: 'ARS' },
  { id: 'vacio', name: 'Vacío Premium (por kg)', price: 8200, sizes: [], stock: 25, imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&auto=format&fit=crop&q=80', category: 'Parrilla', currency: 'ARS' },
  { id: 'entranas', name: 'Entraña Seleccionada (por kg)', price: 9800, sizes: [], stock: 15, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80', category: 'Parrilla', currency: 'ARS' },
  { id: 'nalga-milanesa', name: 'Nalga para Milanesa (por kg)', price: 6500, sizes: [], stock: 40, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', category: 'Minutas', currency: 'ARS' },
  { id: 'lomo-premium', name: 'Lomo Premium (por kg)', price: 11000, sizes: [], stock: 12, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', category: 'Cortes', currency: 'ARS' },
  { id: 'suprema-pollo', name: 'Suprema de Pollo (por kg)', price: 5500, sizes: [], stock: 30, imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80', category: 'Pollo', currency: 'ARS' },
  { id: 'carbon-quebracho', name: 'Bolsa de Carbón Quebracho 5kg', price: 3500, sizes: [], stock: 50, imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=600&auto=format&fit=crop&q=80', category: 'Accesorios', currency: 'ARS' },
];

// ─────────────────────────────────────────────
//  👗  COMERCIO DE ROPA / INDUMENTARIA
// ─────────────────────────────────────────────
const ropaConfig: BusinessConfig = {
  businessName: 'Boutique Elegance',
  rubro: 'tienda',
  schedule: 'Lunes a Sábados de 10:00 a 20:00 hs | Domingos 15:00 a 20:00 hs',
  address: 'Shopping Paseo del Sol, Local 142, Tucumán',
  contactPhone: '+54 381 555-3344',
  contactEmail: 'ventas@boutiqueelegance.com.ar',
  socialMedia: 'Instagram: @boutique.elegance.tuc | TikTok: @boutiqueelegance',
  paymentMethods: 'Efectivo, Tarjetas de crédito y débito (hasta 3 cuotas sin interés), Transferencia, Mercado Pago',
  welcomeMessage: '¡Hola! 👗 Bienvenida a *Boutique Elegance* ✨\n\nModa femenina premium con las últimas tendencias. ¿Estás buscando algo en particular o querés ver las novedades de la temporada?',
  faq: `¿Hacen envíos a todo el país? Sí, por Correo Argentino y OCA. El envío va a cargo del comprador salvo en compras superiores a $50.000 (envío gratis).
¿Cuál es la política de cambio? Tenés 30 días para cambiar la prenda, sin uso, con etiqueta y con comprobante de compra.
¿Tienen talles grandes (talle especial)? Sí, trabajamos del talle 36 al 54 en la mayoría de las prendas.
¿Cuándo llegan las nuevas colecciones? Incorporamos novedades todas las semanas. Seguinos en Instagram para ver los lanzamientos primero.
¿Se pueden reservar prendas? Sí, con una seña del 30% podés reservar una prenda hasta 7 días.`,
  botPersonality: 'Sos una asesora de moda entusiasta, elegante y con mucho ojo para los estilos. Conocés cada prenda del catálogo, sus colores y talles disponibles. Hacés recomendaciones según la ocasión (casual, trabajo, fiesta). Usás emojis de ropa y moda con moderación. Siempre consultás talle y preferencia de color antes de recomendar.',
  rubroFields: {
    catalog: `👗 VESTIDOS
- Vestido midi floreado - $28.500 (Talles S, M, L)
- Vestido largo de crepé - $38.000 (Talles S al XL)
- Vestido casual rayado - $22.000 (Talles XS al L)

👖 PANTALONES Y JEANS
- Jean skinny elastizado - $19.500 (Talles 36 al 46)
- Pantalón de vestir palazzo - $24.000 (Talles S al XL)
- Jogger premium - $17.500 (Talles S al XL)

👚 TOPS Y REMERAS
- Remera manga globo - $12.000 (Talles S al XL)
- Top con broderie - $15.500 (Talles XS al L)

🧥 OUTERWEAR
- Blazer oversize - $45.000 (Talles S al XL)
- Campera de cuero sintético - $55.000 (Talles S al L)

👠 ACCESORIOS
- Cinturón elástico - $8.500
- Cartera de mano - $23.000`,
    shipping: 'Envío gratis para compras +$50.000. Correo Argentino estándar (5-7 días). OCA Express (2-3 días) con costo adicional. Retiro en local sin costo.',
    returns: '30 días para cambio de talles o colores. Prenda sin uso, con etiqueta y ticket de compra. No se aceptan devoluciones en accesorios.',
  },
};

const ropaInventory: Product[] = [
  { id: 'vestido-midi', name: 'Vestido Midi Floreado', price: 28500, sizes: ['S', 'M', 'L'], stock: 12, imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&auto=format&fit=crop&q=80', category: 'Vestidos', currency: 'ARS' },
  { id: 'jean-skinny', name: 'Jean Skinny Elastizado', price: 19500, sizes: ['36', '38', '40', '42', '44', '46'], stock: 25, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80', category: 'Jeans', currency: 'ARS' },
  { id: 'blazer-oversize', name: 'Blazer Oversize', price: 45000, sizes: ['S', 'M', 'L', 'XL'], stock: 8, imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4b5ee6?w=600&auto=format&fit=crop&q=80', category: 'Outerwear', currency: 'ARS' },
  { id: 'top-broderie', name: 'Top con Broderie', price: 15500, sizes: ['XS', 'S', 'M', 'L'], stock: 18, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80', category: 'Tops', currency: 'ARS' },
  { id: 'cartera-mano', name: 'Cartera de Mano Premium', price: 23000, sizes: [], stock: 10, imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80', category: 'Accesorios', currency: 'ARS' },
];

// ─────────────────────────────────────────────
//  🚗  CONCESIONARIA / VENTA DE AUTOS
// ─────────────────────────────────────────────
const autosConfig: BusinessConfig = {
  businessName: 'Automotores del Norte',
  rubro: 'tienda',
  schedule: 'Lunes a Viernes de 9:00 a 18:00 hs | Sábados de 9:00 a 13:00 hs',
  address: 'Av. Mate de Luna 3200, Tucumán',
  contactPhone: '+54 381 555-6600',
  contactEmail: 'ventas@automotoresdelnorte.com.ar',
  socialMedia: 'Instagram: @automotoresdelnorte | Facebook: Automotores del Norte',
  paymentMethods: 'Efectivo (USD o ARS), Financiación bancaria propia hasta 60 cuotas, Permuta de vehículos, Transferencia',
  welcomeMessage: '¡Hola! 🚗 Bienvenido a *Automotores del Norte* ✨\n\nContamos con los mejores vehículos 0km y usados seleccionados de Tucumán.\n\n¿Estás buscando un auto en particular, o querés que te ayude a encontrar el ideal según tu presupuesto?',
  faq: `¿Tienen financiación propia? Sí, financiamos hasta el 80% del valor con planes de 12 a 60 cuotas. Requisitos: relación de dependencia o monotributista categoría C o superior.
¿Aceptan permutas? Sí, tomamos tu auto usado como parte de pago. El valor de la permuta se evalúa previo a la operación.
¿Los usados tienen garantía? Sí, 3 meses o 5.000 km de garantía mecánica en todos los usados de nuestro stock.
¿Pueden hacer una transferencia en el día? Sí, tenemos escribanía propia y podemos cerrar la operación en 24-48 hs.
¿Hacen test drive? Sí, con turno previo y presentando DNI. Duracion aproximada: 20-30 minutos.`,
  botPersonality: 'Sos un vendedor de autos experimentado, confiable y muy conocedor del mercado automotriz argentino. Hacés las preguntas clave para entender las necesidades del cliente (uso, presupuesto, cantidad de personas, etc.) antes de recomendar. Conocés los detalles técnicos de cada modelo y las opciones de financiación. Sos directo pero nunca presionás al cliente.',
  rubroFields: {
    catalog: `🚗 VEHÍCULOS 0KM
- Toyota Corolla Cross XEi 2025 - $42.500.000
- Volkswagen Taos Comfortline 2025 - $38.200.000
- Renault Duster Intense 4x4 2025 - $29.800.000
- Fiat Cronos Drive 1.3 2025 - $18.500.000

🔑 USADOS SELECCIONADOS (revisados y garantizados)
- Ford F-150 Lariat 2022 — 35.000 km - USD 38.000
- Jeep Grand Cherokee 3.6 2021 — 52.000 km - USD 28.500
- Toyota Hilux SRX 2.8 TDi 4x4 2022 — 45.000 km - USD 34.000
- Volkswagen Virtus 1.6 MSI 2023 — 22.000 km - $22.000.000
- Chevrolet Tracker LTZ 2022 — 38.000 km - $19.500.000`,
    shipping: 'Entrega en local o a domicilio en Tucumán capital y Gran Tucumán sin costo adicional. Traslado al interior de Tucumán y provincias limítrofes a coordinar.',
    returns: 'En caso de inconvenientes mecánicos dentro de la garantía (3 meses/5.000 km), el vehículo será reparado sin costo en nuestro taller asociado.',
  },
};

const autosInventory: Product[] = [
  { id: 'corolla-cross', name: 'Toyota Corolla Cross XEi 2025', price: 42500000, sizes: [], stock: 3, imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80', category: '0km', currency: 'ARS' },
  { id: 'vw-taos', name: 'Volkswagen Taos Comfortline 2025', price: 38200000, sizes: [], stock: 2, imageUrl: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=600&auto=format&fit=crop&q=80', category: '0km', currency: 'ARS' },
  { id: 'hilux-srx', name: 'Toyota Hilux SRX 4x4 2022', price: 34000, sizes: [], stock: 1, imageUrl: 'https://images.unsplash.com/photo-1605559424843-9873732e5d27?w=600&auto=format&fit=crop&q=80', category: 'Usados', currency: 'USD' },
  { id: 'jeep-cherokee', name: 'Jeep Grand Cherokee 3.6 2021', price: 28500, sizes: [], stock: 1, imageUrl: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&auto=format&fit=crop&q=80', category: 'Usados', currency: 'USD' },
  { id: 'cronos-drive', name: 'Fiat Cronos Drive 1.3 2025', price: 18500000, sizes: [], stock: 5, imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=80', category: '0km', currency: 'ARS' },
];

// ─────────────────────────────────────────────
//  EXPORT: Master registry of all demos
// ─────────────────────────────────────────────
export const DEMO_PRESETS: DemoPreset[] = [
  {
    slug: 'comida',
    rubroLabel: 'Restaurante / Gastronomía',
    icon: '🍕',
    accentColor: 'from-orange-600 via-red-600 to-rose-700',
    accentHex: '#dc2626',
    tagline: 'Pizzas, empanadas, milanesas, lomitos, minutas y tacos por WhatsApp',
    defaultName: 'La Trattoria',
    config: comidaConfig,
    inventory: comidaInventory,
  },
  {
    slug: 'hamburguesas',
    rubroLabel: 'Hamburguesería / Fast Food',
    icon: '🍔',
    accentColor: 'from-amber-600 via-yellow-600 to-amber-700',
    accentHex: '#d97706',
    tagline: 'Hamburguesas clásicas, smash y papas cargadas por WhatsApp',
    defaultName: 'Leno Burger & Co',
    config: hamburguesasConfig,
    inventory: hamburguesasInventory,
  },
  {
    slug: 'iphone',
    rubroLabel: 'Compra y Venta de iPhones',
    icon: '📱',
    accentColor: 'from-slate-700 via-slate-800 to-gray-900',
    accentHex: '#6366f1',
    tagline: 'Cotizá tu canje, consultá precios en USD y reservá retiro en local por WhatsApp',
    defaultName: 'iStore Tucumán',
    config: iphoneConfig,
    inventory: iphoneInventory,
  },
  {
    slug: 'estetica',
    rubroLabel: 'Peluquería / Estética',
    icon: '💇',
    accentColor: 'from-pink-600 via-rose-500 to-fuchsia-600',
    accentHex: '#ec4899',
    tagline: 'Turnos, precios y consultas de belleza en tiempo real',
    defaultName: 'Estética Camila',
    config: esteticaConfig,
    inventory: [],
    initialBookings: esteticaBookings,
  },
  {
    slug: 'medico',
    rubroLabel: 'Centro Médico / Clínica',
    icon: '🏥',
    accentColor: 'from-cyan-600 via-blue-600 to-indigo-700',
    accentHex: '#0891b2',
    tagline: 'Turnos médicos, especialidades y obras sociales en segundos',
    defaultName: 'Clínica Bienestar',
    config: medicoConfig,
    inventory: [],
    initialBookings: medicoBookings,
  },
  {
    slug: 'carniceria',
    rubroLabel: 'Carnicería',
    icon: '🥩',
    accentColor: 'from-red-700 via-red-800 to-rose-900',
    accentHex: '#b91c1c',
    tagline: 'Cortes criollos, precios actualizados y pedidos al local',
    defaultName: 'Carnicería El Gaucho',
    config: carniceriaConfig,
    inventory: carniceriaInventory,
  },
  {
    slug: 'ropa',
    rubroLabel: 'Comercio de Ropa',
    icon: '👗',
    accentColor: 'from-violet-600 via-purple-600 to-fuchsia-700',
    accentHex: '#7c3aed',
    tagline: 'Catálogo, talles, envíos y moda — todo en un mensaje',
    defaultName: 'Boutique Elegance',
    config: ropaConfig,
    inventory: ropaInventory,
  },
  {
    slug: 'autos',
    rubroLabel: 'Concesionaria / Venta de Autos',
    icon: '🚗',
    accentColor: 'from-blue-700 via-blue-800 to-slate-900',
    accentHex: '#1d4ed8',
    tagline: 'Stock, financiación, test drive y permutas desde WhatsApp',
    defaultName: 'Automotores del Norte',
    config: autosConfig,
    inventory: autosInventory,
  },
];

export function getDemoBySlug(slug: string): DemoPreset | undefined {
  return DEMO_PRESETS.find(d => d.slug === slug);
}
