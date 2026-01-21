// ===================================
// scripts/seedDatabase.js
// ===================================
import { connectDB } from '../src/lib/mongodb.js';
import Product from '../src/domain/models/Product.js';
import Category from '../src/domain/models/Category.js';

/* ================================
   Utilidades
================================ */
const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFrom = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomSubset = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/* ================================
   Datos base - FASHION & NAILS
================================ */
const CATEGORY_DATA = [
  // CATEGORÍAS DE MODA (75 productos)
  {
    name: 'Ropa Mujer',
    description: 'Prendas de moda para mujer: remeras, blusas, vestidos, pantalones'
  },
  {
    name: 'Accesorios',
    description: 'Collares, pulseras, aros, anillos y accesorios de moda'
  },
  {
    name: 'Bolsos y Carteras',
    description: 'Carteras, mochilas, bandoleras y bolsos de mano'
  },
  {
    name: 'Calzado',
    description: 'Zapatillas, sandalias, botas y calzado trendy'
  },
  {
    name: 'Bijouterie',
    description: 'Joyas de fantasía, bijouterie fina y accesorios elegantes'
  },
  // CATEGORÍAS DE UÑAS Y BELLEZA (25 productos)
  {
    name: 'Esmaltes y Tratamientos',
    description: 'Esmaltes, bases, top coats y productos para uñas'
  },
  {
    name: 'Arte de Uñas',
    description: 'Decoraciones, stickers, glitters y accesorios para nail art'
  },
  {
    name: 'Herramientas y Kits',
    description: 'Herramientas profesionales, limas, kits de manicura'
  }
];

// DATOS PARA MODA
const CLOTHING_TYPES = {
  remeras: ['Remera Básica', 'Remera Oversize', 'Crop Top', 'Remera Estampada', 'Blusa Elegante'],
  vestidos: ['Vestido Midi', 'Vestido Corto', 'Vestido Largo', 'Vestido Fiesta'],
  pantalones: ['Jean Tiro Alto', 'Pantalón Wide Leg', 'Cargo', 'Jogger', 'Palazzo'],
  conjuntos: ['Conjunto Deportivo', 'Conjunto Casual', 'Conjunto Elegante'],
  abrigos: ['Campera Oversized', 'Blazer', 'Cardigan', 'Hoodie']
};

const ACCESSORIES_TYPES = [
  'Collar Cadena', 'Pulsera Dorada', 'Aros Argolla', 'Anillo Ajustable',
  'Gargantilla Choker', 'Set de Anillos', 'Tobillera', 'Pulsera Multicolor',
  'Collar Perlas', 'Aros Colgantes', 'Vincha Elegante', 'Scrunchie Set',
  'Gorro Tejido', 'Bufanda', 'Cinturón Trendy'
];

const BAG_TYPES = [
  'Cartera Crossbody', 'Mochila Urban', 'Bolso Tote', 'Riñonera',
  'Bandolera Mini', 'Cartera Clutch', 'Mochila Cuero', 'Bolso Shopper',
  'Necessaire Viaje', 'Monedero Compacto'
];

const SHOE_TYPES = [
  'Zapatillas Urbanas', 'Sandalias Plataforma', 'Botas Texanas',
  'Zapatillas Deportivas', 'Ojotas Confort', 'Alpargatas',
  'Botinetas', 'Zapatillas Lona', 'Sandalias Tiras'
];

const BIJOU_TYPES = [
  'Set Aretes y Collar', 'Cadena Gold Filled', 'Pulsera Charm',
  'Anillo Ajustable Plata', 'Collar Personalizado', 'Aros Perlas',
  'Brazalete Rigido', 'Set Anillos Apilables', 'Collar Piedras'
];

// DATOS PARA UÑAS
const NAIL_COLORS = [
  'Rojo Pasión', 'Rosa Nude', 'Fucsia', 'Coral',
  'Nude Rosado', 'Negro', 'Blanco', 'Gris Perla',
  'Dorado', 'Plata', 'Azul Marino', 'Turquesa',
  'Verde Esmeralda', 'Violeta', 'Borgoña', 'Naranja'
];

const FINISHES = ['Brillo', 'Mate', 'Metalizado', 'Glitter', 'Holográfico'];

const NAIL_PRODUCTS = [
  'Esmalte', 'Base Fortalecedora', 'Top Coat', 'Secador Rápido',
  'Removedor Sin Acetona', 'Aceite Cutículas', 'Kit Manicura',
  'Stickers 3D', 'Glitter Holográfico', 'Piedras Cristal',
  'Lima Profesional', 'Pulidor 4 Caras', 'Set Herramientas'
];

// COLORES Y TALLES
const COLORS = ['Negro', 'Blanco', 'Beige', 'Gris', 'Azul', 'Rosa', 'Rojo', 'Verde', 'Camel', 'Violeta'];
const SIZES_CLOTHING = ['S', 'M', 'L', 'XL'];
const SIZES_SHOES = ['35', '36', '37', '38', '39', '40'];

// MARCAS
const FASHION_BRANDS = ['TrendyStyle', 'UrbanChic', 'ModaVibe', 'StyleCo', 'FashionLux', 'ChicBoutique'];
const NAIL_BRANDS = ['BeautyPro', 'NailLux', 'GlamNails', 'VelvetNails'];

// IMÁGENES
const FASHION_IMAGES = {
  ropa: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600'
  ],
  accesorios: [
    'https://images.unsplash.com/photo-1611652022419-a9419f74343f?w=600',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'
  ],
  bolsos: [
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600'
  ],
  zapatos: [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600'
  ],
  nails: [
    'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600',
    'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600'
  ]
};

/* ================================
   Generadores de Productos - MODA
================================ */

function generateClothing(index, categoryId) {
  const types = Object.values(CLOTHING_TYPES).flat();
  const item = randomFrom(types);
  const color = randomFrom(COLORS);
  const brand = randomFrom(FASHION_BRANDS);
  
  // Ropa: USD 8-35 → ARS 11,600-50,750
  const basePrice = Math.round(random(116, 507) * 100);
  const hasVariants = Math.random() > 0.3;
  
  return {
    name: `${item} ${color} - ${brand}`,
    description: `${item} de alta calidad en color ${color.toLowerCase()}. Diseño moderno y cómodo. Tela suave y durable. Perfecta para cualquier ocasión. Marca ${brand}.`,
    category: categoryId,
    price: basePrice,
    stock: hasVariants ? 0 : random(5, 20),
    main_image: randomFrom(FASHION_IMAGES.ropa),
    images: randomSubset(FASHION_IMAGES.ropa, 3),
    variants: hasVariants ? SIZES_CLOTHING.map(size => ({
      name: `Talle ${size}`,
      color,
      size,
      price: basePrice,
      stock: random(2, 10)
    })) : [],
    featured: Math.random() > 0.85,
    active: true
  };
}

function generateAccessory(index, categoryId) {
  const item = randomFrom(ACCESSORIES_TYPES);
  const brand = randomFrom(FASHION_BRANDS);
  
  // Accesorios: USD 3-15 → ARS 4,350-21,750
  const basePrice = Math.round(random(43, 217) * 100);
  
  return {
    name: `${item} ${brand}`,
    description: `${item} tendencia, diseño único y moderno. Material de alta calidad. Perfecto para complementar cualquier outfit. Ideal para regalo.`,
    category: categoryId,
    price: basePrice,
    stock: random(10, 40),
    main_image: randomFrom(FASHION_IMAGES.accesorios),
    images: randomSubset(FASHION_IMAGES.accesorios, 2),
    variants: [],
    featured: Math.random() > 0.88,
    active: true
  };
}

function generateBag(index, categoryId) {
  const item = randomFrom(BAG_TYPES);
  const color = randomFrom(COLORS);
  const brand = randomFrom(FASHION_BRANDS);
  
  // Bolsos: USD 15-50 → ARS 21,750-72,500
  const basePrice = Math.round(random(217, 725) * 100);
  
  return {
    name: `${item} ${color} ${brand}`,
    description: `${item} en color ${color.toLowerCase()}. Material premium, resistente y elegante. Diseño práctico con múltiples compartimentos. Cierre seguro. Ideal para uso diario.`,
    category: categoryId,
    price: basePrice,
    stock: random(5, 25),
    main_image: randomFrom(FASHION_IMAGES.bolsos),
    images: randomSubset(FASHION_IMAGES.bolsos, 3),
    variants: [],
    featured: Math.random() > 0.8,
    active: true
  };
}

function generateShoes(index, categoryId) {
  const item = randomFrom(SHOE_TYPES);
  const color = randomFrom(COLORS);
  const brand = randomFrom(FASHION_BRANDS);
  
  // Calzado: USD 20-60 → ARS 29,000-87,000
  const basePrice = Math.round(random(290, 870) * 100);
  const hasVariants = Math.random() > 0.2;
  
  return {
    name: `${item} ${color} - ${brand}`,
    description: `${item} en color ${color.toLowerCase()}. Comodidad y estilo en cada paso. Material de primera calidad. Suela antideslizante. Diseño versátil y moderno.`,
    category: categoryId,
    price: basePrice,
    stock: hasVariants ? 0 : random(3, 15),
    main_image: randomFrom(FASHION_IMAGES.zapatos),
    images: randomSubset(FASHION_IMAGES.zapatos, 2),
    variants: hasVariants ? SIZES_SHOES.map(size => ({
      name: `Número ${size}`,
      color,
      size,
      price: basePrice,
      stock: random(1, 5)
    })) : [],
    featured: Math.random() > 0.82,
    active: true
  };
}

function generateBijou(index, categoryId) {
  const item = randomFrom(BIJOU_TYPES);
  const brand = randomFrom(FASHION_BRANDS);
  
  // Bijouterie: USD 5-25 → ARS 7,250-36,250
  const basePrice = Math.round(random(72, 362) * 100);
  
  return {
    name: `${item} ${brand}`,
    description: `${item} elegante y sofisticado. Baño de oro/plata de larga duración. Diseño exclusivo. Hipoalergénico. Viene en caja de regalo. Joya de fantasía premium.`,
    category: categoryId,
    price: basePrice,
    stock: random(8, 30),
    main_image: randomFrom(FASHION_IMAGES.accesorios),
    images: randomSubset(FASHION_IMAGES.accesorios, 2),
    variants: [],
    featured: Math.random() > 0.85,
    active: true
  };
}

/* ================================
   Generadores de Productos - UÑAS
================================ */

function generateNailProduct(index, categoryId) {
  const product = randomFrom(NAIL_PRODUCTS);
  const brand = randomFrom(NAIL_BRANDS);
  
  // Productos de uñas: USD 3-20 → ARS 4,350-29,000
  let basePrice = Math.round(random(43, 290) * 100);
  
  // Si es esmalte, puede tener color
  const isPolish = product === 'Esmalte';
  const color = isPolish ? randomFrom(NAIL_COLORS) : null;
  const finish = isPolish ? randomFrom(FINISHES) : null;
  
  const name = isPolish 
    ? `${product} ${color} ${finish} - ${brand}`
    : `${product} ${brand}`;
    
  const description = isPolish
    ? `Esmalte ${color.toLowerCase()} con acabado ${finish.toLowerCase()}. Secado rápido y larga duración. Fórmula profesional de ${brand}.`
    : `${product} profesional de ${brand}. Alta calidad y resultados duraderos. Ideal para uso personal y profesional.`;
  
  return {
    name,
    description,
    category: categoryId,
    price: basePrice,
    stock: random(10, 40),
    main_image: randomFrom(FASHION_IMAGES.nails),
    images: randomSubset(FASHION_IMAGES.nails, 2),
    variants: [],
    featured: Math.random() > 0.88,
    active: true
  };
}

/* ================================
   Seeder principal
================================ */
async function seedDatabase() {
  try {
    await connectDB();

    console.log('🧹 Limpiando colecciones...');
    await Product.deleteMany();
    await Category.deleteMany();

    console.log('📂 Creando categorías...');
    const categories = await Category.insertMany(CATEGORY_DATA);
    console.log(`✅ ${categories.length} categorías creadas`);

    // Mapeo de categorías
    const catMap = {
      ropa: categories.find(c => c.name === 'Ropa Mujer')._id,
      accesorios: categories.find(c => c.name === 'Accesorios')._id,
      bolsos: categories.find(c => c.name === 'Bolsos y Carteras')._id,
      calzado: categories.find(c => c.name === 'Calzado')._id,
      bijou: categories.find(c => c.name === 'Bijouterie')._id,
      esmaltes: categories.find(c => c.name === 'Esmaltes y Tratamientos')._id,
      arte: categories.find(c => c.name === 'Arte de Uñas')._id,
      herramientas: categories.find(c => c.name === 'Herramientas y Kits')._id
    };

    console.log('📦 Creando 100 productos (75 moda + 25 uñas)...');
    const products = [];

    // 75 PRODUCTOS DE MODA
    for (let i = 0; i < 30; i++) products.push(generateClothing(i, catMap.ropa));
    for (let i = 0; i < 15; i++) products.push(generateAccessory(i, catMap.accesorios));
    for (let i = 0; i < 12; i++) products.push(generateBag(i, catMap.bolsos));
    for (let i = 0; i < 10; i++) products.push(generateShoes(i, catMap.calzado));
    for (let i = 0; i < 8; i++) products.push(generateBijou(i, catMap.bijou));

    // 25 PRODUCTOS DE UÑAS
    for (let i = 0; i < 12; i++) products.push(generateNailProduct(i, catMap.esmaltes));
    for (let i = 0; i < 8; i++) products.push(generateNailProduct(i, catMap.arte));
    for (let i = 0; i < 5; i++) products.push(generateNailProduct(i, catMap.herramientas));

    await Product.insertMany(products);

    console.log('✅ 100 productos creados correctamente');
    console.log(`
📊 Distribución:
   
   🎨 MODA (75 productos):
   - Ropa Mujer: 30
   - Accesorios: 15
   - Bolsos y Carteras: 12
   - Calzado: 10
   - Bijouterie: 8
   
   💅 UÑAS (25 productos):
   - Esmaltes y Tratamientos: 12
   - Arte de Uñas: 8
   - Herramientas y Kits: 5
    `);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando el seeder:', error);
    process.exit(1);
  }
}

seedDatabase();