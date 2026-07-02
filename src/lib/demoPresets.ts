import { BusinessConfig, Product, Booking } from '@/types';
import { DEFAULT_IPHONE_TRADE_IN } from '@/lib/constants';

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
//  🍕  COMIDA / GASTRONOMÍA
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
  welcomeMessage: '¡Hola! 👋 Bienvenido a *La Trattoria* 🍕\n\nSomos tu pizzería de confianza con el mejor sabor casero de Tucumán. ¿Qué antojo te trajo por acá?\n\nPodés preguntarme por nuestro menú, precios, promociones, o hacer un pedido directamente por acá 😊',
  faq: `¿Hacen envíos? Sí, delivery disponible a toda la ciudad de San Miguel de Tucumán. Costo: zona centro gratis, resto $800.
¿Cuánto tarda el delivery? Entre 30 y 45 minutos promedio.
¿Tienen opciones sin TACC? Sí, pizzas sin gluten con previo aviso (requiere 24hs de anticipación).
¿Se puede pagar con tarjeta? Sí, aceptamos todas las tarjetas con y sin cuotas.
¿Tienen estacionamiento? Contamos con estacionamiento gratuito en la parte trasera del local.`,
  botPersonality: 'Sos un asistente simpático, cálido y muy conocedor de la gastronomía italiana. Usás emojis de comida con moderación. Sos directo con los precios y entusiasta con las promociones. Siempre ofrecés sugerencias del menú cuando el cliente no sabe qué pedir.',
  rubroFields: {
    menu: `🍕 PIZZAS (porciones de 8 cortes)
- Pizza Muzzarella Especial - $8.500
- Pizza Napolitana - $9.200
- Pizza Fugazzeta - $9.800
- Pizza Cuatro Quesos - $10.500
- Pizza de Rúcula y Jamón Crudo - $12.000

🍔 HAMBURGUESAS
- Hamburguesa Clásica (doble carne + papas fritas) - $9.500
- Hamburguesa BBQ Crispy - $10.800
- Hamburguesa Veggie - $8.900

🥟 EMPANADAS (precio x docena)
- Empanadas de Carne Cortada a Cuchillo - $12.000
- Empanadas de Pollo al Verdeo - $11.500
- Empanadas de Jamón y Queso - $10.800
- Empanadas de Humita - $10.500

🥤 BEBIDAS
- Gaseosas 1.5L - $2.800
- Agua mineral - $1.500
- Vino de la casa (media botella) - $5.500`,
    delivery: 'Zona Centro (hasta 3km): GRATIS. Zona Norte/Sur/Oeste (3-7km): $800. Zona Gran Tucumán (más de 7km): $1.500.',
    deliveryTime: '30 a 45 minutos en horario normal. Hasta 60 minutos los fines de semana y feriados.',
    promotions: `⭐ PROMO MARTES 2x1: Llevás dos pizzas al precio de una (aplica a Muzzarella y Napolitana)
⭐ COMBO FAMILIA: 2 pizzas grandes + 1 docena de empanadas + 2 gaseosas 1.5L por $32.000
⭐ CUMPLEAÑOS: Si es tu cumpleaños, el postre va por la casa 🎂
⭐ DESCUENTO ONLINE: 10% de descuento en todos los pedidos por WhatsApp pagando con transferencia.`,
  },
};

const comidaInventory: Product[] = [
  { id: 'pizza-muzzarella', name: 'Pizza Muzzarella Especial', price: 8500, sizes: [], stock: 50, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80', category: 'Pizzas', currency: 'ARS' },
  { id: 'pizza-cuatro-quesos', name: 'Pizza Cuatro Quesos', price: 10500, sizes: [], stock: 40, imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&auto=format&fit=crop&q=80', category: 'Pizzas', currency: 'ARS' },
  { id: 'hamburguesa-bbq', name: 'Hamburguesa BBQ Crispy', price: 10800, sizes: [], stock: 30, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80', category: 'Hamburguesas', currency: 'ARS' },
  { id: 'empanadas-carne', name: 'Empanadas de Carne (Docena)', price: 12000, sizes: [], stock: 100, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80', category: 'Empanadas', currency: 'ARS' },
  { id: 'empanadas-pollo', name: 'Empanadas de Pollo (Docena)', price: 11500, sizes: [], stock: 80, imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop&q=80', category: 'Empanadas', currency: 'ARS' },
];

// ─────────────────────────────────────────────
//  📱  COMPRA Y VENTA DE IPHONES
// ─────────────────────────────────────────────
const iphoneConfig: BusinessConfig = {
  businessName: 'iStore Tucumán',
  rubro: 'iphones',
  schedule: 'Lunes a Sábado de 9:00 a 20:00 hs',
  address: 'Av. Aconquija 1250, Yerba Buena, Tucumán',
  contactPhone: '+54 381 555-9876',
  contactEmail: 'ventas@istoretucuman.com.ar',
  socialMedia: 'Instagram: @istore.tucuman | TikTok: @istoretuc',
  paymentMethods: 'Dólares billete (cara grande), Transferencia en pesos al valor Dólar Blue del día, Mercado Pago (+10% recargo)',
  welcomeMessage: '¡Hola! 👋 Bienvenido a *iStore Tucumán* 📱\n\nSomos especialistas en compra y venta de iPhones usados certificados en Tucumán.\n\n¿Estás buscando comprar un equipo, o querés saber cuánto te damos por el tuyo?',
  faq: `¿Los equipos tienen garantía? Sí, todos nuestros equipos cuentan con 90 días de garantía escrita por defecto. Podés extenderla a 6 meses por un adicional.
¿Tienen pantalla original? Sí, solo vendemos equipos con pantalla y Face ID/Touch ID 100% originales.
¿Puedo pagar en cuotas? En cuotas solo con tarjeta de crédito a través de Mercado Pago (tiene recargo del 10%).
¿Hacen envíos? Sí, enviamos a todo el país por Andreani o OCA. El costo va por cuenta del comprador.
¿Toman equipos con bypass de iCloud? No. Solo tomamos equipos desbloqueados y sin restricciones de ningún tipo.`,
  botPersonality: 'Sos un vendedor experto en tecnología Apple, honesto y muy conocedor de los detalles técnicos de los iPhones. Siempre verificás las condiciones del equipo antes de dar una tasación. Sos transparente con los precios y las condiciones. Usás términos técnicos cuando habla con alguien que sabe, y los explicás de forma simple cuando el cliente es novato.',
  rubroFields: {
    warranty: '90 días de garantía escrita en todos los equipos. Extensión a 6 meses disponible.',
    conditions: 'Tomamos equipos a partir del iPhone 11. Requisitos: pantalla original (sin cambio de display), batería mayor al 78%, sin bypass de iCloud, sin bloqueo MDM, y sin rayaduras severas en la pantalla.',
    paymentInfoUSD: 'Los precios están en USD. Aceptamos: Dólares billete (cara grande, sin marcas), Transferencia en pesos al valor del Dólar Blue Venta del día de cierre, Mercado Pago con 10% de recargo.',
  },
  iphoneTradeInSettings: [
    { model: 'iPhone 11', minPrice: 200, maxPrice: 270 },
    { model: 'iPhone 11 Pro', minPrice: 270, maxPrice: 340 },
    { model: 'iPhone 12', minPrice: 300, maxPrice: 390 },
    { model: 'iPhone 12 Pro', minPrice: 370, maxPrice: 460 },
    { model: 'iPhone 13', minPrice: 430, maxPrice: 530 },
    { model: 'iPhone 13 Pro', minPrice: 520, maxPrice: 640 },
    { model: 'iPhone 14', minPrice: 560, maxPrice: 690 },
    { model: 'iPhone 14 Pro', minPrice: 680, maxPrice: 820 },
    { model: 'iPhone 15', minPrice: 760, maxPrice: 920 },
    { model: 'iPhone 15 Pro', minPrice: 880, maxPrice: 1050 },
    { model: 'iPhone 15 Pro Max', minPrice: 980, maxPrice: 1180 },
  ],
};

const iphoneInventory: Product[] = [
  { id: 'ip15promax-256', name: 'iPhone 15 Pro Max — 256GB', price: 1100, sizes: [], stock: 2, imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 97, aestheticDetails: 'Impecable, sin detalles, incluye caja y accesorios originales', storage: '256GB', color: 'Titanio Negro', currency: 'USD' },
  { id: 'ip15pro-128', name: 'iPhone 15 Pro — 128GB', price: 880, sizes: [], stock: 3, imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 99, aestheticDetails: 'Impecable, pantalla sin rayas', storage: '128GB', color: 'Titanio Blanco', currency: 'USD' },
  { id: 'ip14-256', name: 'iPhone 14 — 256GB', price: 650, sizes: [], stock: 4, imageUrl: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 91, aestheticDetails: 'Muy buen estado, leve marca en el marco izquierdo', storage: '256GB', color: 'Medianoche', currency: 'USD' },
  { id: 'ip13-128', name: 'iPhone 13 — 128GB', price: 520, sizes: [], stock: 5, imageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 87, aestheticDetails: 'Buen estado, pequeñas marcas de uso en bordes, sin rayas en pantalla', storage: '128GB', color: 'Azul', currency: 'USD' },
  { id: 'ip12-128', name: 'iPhone 12 — 128GB', price: 370, sizes: [], stock: 6, imageUrl: 'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=600&auto=format&fit=crop&q=80', category: 'iPhones', batteryHealth: 82, aestheticDetails: 'Estado regular, algunas marcas de uso, pantalla original sin rayas', storage: '128GB', color: 'Negro', currency: 'USD' },
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
//  🥩  CARNICERÍA
// ─────────────────────────────────────────────
const carniceriaConfig: BusinessConfig = {
  businessName: 'Carnicería El Gaucho',
  rubro: 'tienda',
  schedule: 'Lunes a Sábados de 7:00 a 13:00 y de 17:00 a 21:00 hs | Domingos de 8:00 a 12:00 hs',
  address: 'Belgrano 1400, Barrio Norte, Tucumán',
  contactPhone: '+54 381 555-8800',
  contactEmail: 'elgaucho@carniceria.com.ar',
  socialMedia: 'Instagram: @carniceria.elgaucho',
  paymentMethods: 'Efectivo, Transferencia bancaria, Mercado Pago (sin recargo)',
  welcomeMessage: '¡Hola! 👋 Bienvenido a *Carnicería El Gaucho* 🥩\n\nCarne fresca, cortes premium y el mejor asado de Tucumán. ¿Qué necesitás para hoy?',
  faq: `¿Hacen pedidos por encargo? Sí, pedidos de más de 5kg con 24hs de anticipación. Pedidos para eventos y asados: consultar.
¿Tienen delivery? Sí, para pedidos mayores a $15.000. Zona de reparto: radio de 5km desde el local.
¿Los productos son frescos? Sí, recibimos media res directamente de frigorífico tres veces por semana (lunes, miércoles y viernes).
¿Tienen productos listos para el asado? Sí: chorizos, morcillas, mollejas, riñones y pollo entero siempre disponibles.
¿Hacen paquetes de asado? Sí, consultá nuestro Paquete Asado Familiar (12 personas).`,
  botPersonality: 'Sos un carnicero experto y apasionado del buen asado argentino. Conocés cada corte, su preparación ideal, y cómo elegir la mejor carne según la ocasión. Sos amigable, directo y usás el lenguaje del asado argentino. Recomendás cortes según el uso (parrilla, horno, guiso) y siempre ofrecés el precio por kilo.',
  rubroFields: {
    catalog: `🥩 CORTES VACUNOS (precio por kg)
- Asado de tira - $6.500/kg
- Vacío - $7.200/kg
- Costillar - $5.800/kg
- Bife de chorizo - $9.500/kg
- Lomo - $12.000/kg
- Cuadril - $8.000/kg
- Nalga - $5.500/kg
- Paleta - $4.800/kg

🍗 POLLO
- Pollo entero - $3.200/kg
- Pechuga sin hueso - $5.000/kg
- Muslos y contramuslos - $3.800/kg

🌭 EMBUTIDOS Y ACHURAS
- Chorizos criollos - $4.200/kg
- Morcilla - $3.800/kg
- Mollejas - $5.500/kg
- Riñones - $3.500/kg
- Chinchulín - $4.000/kg

📦 PAQUETES ESPECIALES
- Paquete Asado Familiar (12 personas): 3kg asado + 2kg vacío + 12 chorizos + 12 morcillas - $65.000`,
    shipping: 'Delivery gratuito para pedidos mayores a $15.000 en radio de 5km. Para zonas más lejanas, consultar costo.',
    returns: 'No se aceptan devoluciones en productos cárnicos por razones de higiene. Ante cualquier problema con la calidad, comunicarse de inmediato.',
  },
};

const carniceriaInventory: Product[] = [
  { id: 'asado-tira', name: 'Asado de Tira (por kg)', price: 6500, sizes: [], stock: 40, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80', category: 'Vacuno', currency: 'ARS' },
  { id: 'vacio', name: 'Vacío (por kg)', price: 7200, sizes: [], stock: 25, imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&auto=format&fit=crop&q=80', category: 'Vacuno', currency: 'ARS' },
  { id: 'lomo', name: 'Lomo (por kg)', price: 12000, sizes: [], stock: 10, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', category: 'Vacuno', currency: 'ARS' },
  { id: 'chorizo', name: 'Chorizos Criollos (por kg)', price: 4200, sizes: [], stock: 60, imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=600&auto=format&fit=crop&q=80', category: 'Embutidos', currency: 'ARS' },
  { id: 'paquete-asado', name: 'Paquete Asado Familiar (12 personas)', price: 65000, sizes: [], stock: 15, imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80', category: 'Paquetes', currency: 'ARS' },
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
    tagline: 'Pedidos, menú, delivery y más — todo por WhatsApp',
    defaultName: 'La Trattoria',
    config: comidaConfig,
    inventory: comidaInventory,
  },
  {
    slug: 'iphone',
    rubroLabel: 'Compra y Venta de iPhones',
    icon: '📱',
    accentColor: 'from-slate-700 via-slate-800 to-gray-900',
    accentHex: '#6366f1',
    tagline: 'Cotizá tu canje, consultá precios en USD y comprá sin salir de WhatsApp',
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
    tagline: 'Cortes, precios y pedidos para el mejor asado argentino',
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
