// carouselItems.js - Datos para el carousel de tienda de uñas y moda

export const carouselItems = [
  // ========== SERVICIOS DE UÑAS ==========
  {
    id: 'service-1',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop',
    title: 'Manicure Gel Deluxe',
    category: 'Servicio de Uñas',
    description: 'Manicure completo con esmaltado en gel de larga duración. Incluye limado, cutícula, hidratación y diseño básico a elección.',
    price: '$45.000',
    duration: '90 minutos',
    rating: '4.9',
    features: [
      'Esmaltado gel de alta calidad',
      'Diseño básico incluido',
      'Duración de 3-4 semanas',
      'Hidratación profunda'
    ]
  },
  {
    id: 'service-2',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&h=600&fit=crop',
    title: 'Uñas Esculpidas Acrylic',
    category: 'Servicio de Uñas',
    description: 'Extensión de uñas con acrílico profesional, forma y largo personalizado. Diseño y decoración premium.',
    price: '$65.000',
    originalPrice: '$75.000',
    duration: '2 horas',
    rating: '5.0',
    features: [
      'Extensión con acrílico premium',
      'Forma personalizada',
      'Diseño artístico incluido',
      'Resistencia garantizada'
    ]
  },
  {
    id: 'service-3',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&h=600&fit=crop',
    title: 'Nail Art Gothic',
    category: 'Servicio de Uñas',
    description: 'Diseño artístico gótico con detalles en negro, plateado y amatista. Incluye aplicaciones de cristales y efectos especiales.',
    price: '$55.000',
    duration: '2.5 horas',
    rating: '4.8',
    features: [
      'Diseño gótico personalizado',
      'Cristales Swarovski',
      'Efectos metálicos',
      'Acabado profesional'
    ]
  },
  {
    id: 'service-4',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=600&fit=crop',
    title: 'Pedicure Spa Dark',
    category: 'Servicio de Uñas',
    description: 'Pedicure de lujo con exfoliación, masaje relajante y esmaltado gel. Ambiente gótico y aromaterapia.',
    price: '$40.000',
    duration: '75 minutos',
    rating: '4.9',
    features: [
      'Exfoliación con sales negras',
      'Masaje de 20 minutos',
      'Esmaltado gel premium',
      'Aromaterapia incluida'
    ]
  },

  // ========== PRODUCTOS DE MODA ==========
  {
    id: 'product-1',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=600&fit=crop',
    title: 'Vestido Gothic Lace',
    category: 'Ropa',
    description: 'Vestido gótico elegante con encaje francés y detalles victorianos. Perfecto para eventos nocturnos.',
    price: '$89.000',
    originalPrice: '$120.000',
    stock: 5,
    rating: '4.7',
    features: [
      'Encaje francés premium',
      'Diseño victoriano',
      'Tallas S a XL disponibles',
      'Cierre con cordones'
    ]
  },
  {
    id: 'product-2',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
    title: 'Chaqueta Biker Dark',
    category: 'Ropa',
    description: 'Chaqueta de cuero sintético premium estilo biker. Herrajes plateados y forro interior acolchado.',
    price: '$135.000',
    stock: 3,
    rating: '5.0',
    features: [
      'Cuero sintético premium',
      'Herrajes plateados',
      'Forro térmico',
      'Múltiples bolsillos'
    ]
  },
  {
    id: 'product-3',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=600&fit=crop',
    title: 'Cartera Gothic Chain',
    category: 'Accesorios',
    description: 'Cartera de mano con cadenas plateadas y detalles de tachuelas. Espacio para tarjetas y efectivo.',
    price: '$45.000',
    stock: 8,
    rating: '4.6',
    features: [
      'Cadena plateada desmontable',
      'Tachuelas decorativas',
      'Múltiples compartimentos',
      'Cierre magnético'
    ]
  },
  {
    id: 'product-4',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=600&fit=crop',
    title: 'Choker Amatista',
    category: 'Accesorios',
    description: 'Gargantilla con cristal amatista genuino y cadena de acero quirúrgico. Ajustable.',
    price: '$28.000',
    originalPrice: '$35.000',
    stock: 12,
    rating: '4.9',
    features: [
      'Cristal amatista genuino',
      'Acero quirúrgico',
      'Ajustable 35-40cm',
      'Hipoalergénico'
    ]
  },
  {
    id: 'product-5',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=600&fit=crop',
    title: 'Botas Platform Gothic',
    category: 'Calzado',
    description: 'Botas con plataforma de 8cm, hebillas plateadas y cordones cruzados. Suela antideslizante.',
    price: '$95.000',
    stock: 6,
    rating: '4.8',
    features: [
      'Plataforma 8cm',
      'Hebillas plateadas',
      'Suela antideslizante',
      'Tallas 35 a 40'
    ]
  },

  // ========== COMBOS Y PROMOCIONES ==========
  {
    id: 'combo-1',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop',
    title: 'Combo Dark Queen',
    category: 'Promoción',
    description: 'Manicure gel + Pedicure spa + Diseño nail art. El paquete completo para un look gótico impecable.',
    price: '$115.000',
    originalPrice: '$140.000',
    duration: '4 horas',
    rating: '5.0',
    features: [
      'Manicure gel completo',
      'Pedicure spa deluxe',
      'Diseño artístico premium',
      'Ahorra $25.000'
    ]
  },
  {
    id: 'combo-2',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
    title: 'Set Outfit Gothic',
    category: 'Promoción',
    description: 'Vestido gothic lace + Choker amatista + Cartera chain. Todo lo que necesitas para tu look perfecto.',
    price: '$145.000',
    originalPrice: '$162.000',
    stock: 4,
    rating: '4.9',
    features: [
      'Vestido gothic lace',
      'Choker amatista',
      'Cartera con cadena',
      'Ahorra $17.000'
    ]
  }
];

// Función helper para filtrar por categoría
export const getItemsByCategory = (category) => {
  return carouselItems.filter(item => item.category === category);
};

// Categorías disponibles
export const categories = [
  'Servicio de Uñas',
  'Ropa',
  'Accesorios',
  'Calzado',
  'Promoción'
];

// Función helper para obtener items destacados (con descuento o rating alto)
export const getFeaturedItems = () => {
  return carouselItems.filter(item => 
    item.originalPrice || (item.rating && parseFloat(item.rating) >= 4.8)
  );
};

export default carouselItems;