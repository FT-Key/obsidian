# 🛍️ ProductCard - Ejemplos de Uso

## 📋 Descripción

`ProductCard` es un componente gótico dark optimizado para mostrar productos con:
- ✅ Imagen que "sale" del contenedor (efecto float)
- ✅ Optimización SEO con Next Image y Schema.org
- ✅ Soporte para PNG transparentes y imágenes rectangulares
- ✅ Rating con estrellas
- ✅ Descuentos automáticos
- ✅ Botones de acción rápida (wishlist, quick view)
- ✅ 4 variantes visuales

---

## 🎨 Variantes Disponibles

### 1. **Default** (Clásica)
```jsx
<ProductCard
  variant="default"
  image="/product.png"
  imageAlt="Producto"
  title="Mi Producto"
  price={99.99}
/>
```

### 2. **Elevated** (Elevada con más sombra)
```jsx
<ProductCard
  variant="elevated"
  image="/product.png"
  title="Producto Premium"
  price={149.99}
/>
```

### 3. **Glass** (Efecto de vidrio)
```jsx
<ProductCard
  variant="glass"
  image="/product.png"
  title="Producto Especial"
  price={199.99}
/>
```

### 4. **Premium** (Con tono púrpura)
```jsx
<ProductCard
  variant="premium"
  image="/product.png"
  title="Producto Exclusivo"
  price={299.99}
/>
```

---

## 📸 Posiciones de Imagen

### Float (Recomendado para PNG transparentes)
La imagen "flota" y sale del contenedor en hover
```jsx
<ProductCard
  imagePosition="float"
  imageSize="large" // small, medium, large
  image="/product-transparent.png"
/>
```

### Contained (Para imágenes rectangulares/cuadradas)
La imagen se mantiene dentro del contenedor
```jsx
<ProductCard
  imagePosition="contained"
  imageSize="medium"
  image="/product-photo.jpg"
/>
```

### Background (Imagen de fondo)
```jsx
<ProductCard
  imagePosition="background"
  image="/product-bg.jpg"
/>
```

---

## 💰 Precios y Descuentos

### Con descuento automático
```jsx
<ProductCard
  price={99.99}
  originalPrice={149.99}
  // Calcula automáticamente: -33%
/>
```

### Con badge de descuento personalizado
```jsx
<ProductCard
  price={99.99}
  originalPrice={149.99}
  discount={35} // Muestra -35%
/>
```

### Con badge personalizado
```jsx
<ProductCard
  badge="NUEVO"
  price={99.99}
/>
```

---

## ⭐ Rating y Reseñas

```jsx
<ProductCard
  rating={4.5} // 0 a 5
  reviews={128} // Número de reseñas
/>
```

---

## 🎯 Acciones

### Todas las acciones disponibles
```jsx
<ProductCard
  onAddToCart={() => {
    console.log('Agregado al carrito');
    // Tu lógica aquí
  }}
  onWishlist={() => {
    console.log('Agregado a favoritos');
  }}
  onQuickView={() => {
    console.log('Vista rápida abierta');
  }}
/>
```

### Solo carrito (sin botones de acción rápida)
```jsx
<ProductCard
  onAddToCart={() => addToCart(product)}
  // Sin onWishlist ni onQuickView = no muestra esos botones
/>
```

---

## 🔍 Optimización SEO

El componente incluye automáticamente:

### Schema.org markup
```jsx
<ProductCard
  image="/product.png"
  imageAlt="Descripción detallada del producto" // Importante para SEO
  title="Nombre del Producto"
  description="Descripción completa"
  price={99.99}
  rating={4.5}
  reviews={100}
/>
```

Genera automáticamente:
- `itemScope itemType="https://schema.org/Product"`
- `itemprop="name"`, `itemprop="description"`, etc.
- `itemprop="offers"` con precio y disponibilidad
- `itemprop="aggregateRating"` con valoraciones

### Next Image Optimization
```jsx
<ProductCard
  image="/product.png"
  imagePriority={true} // Para imágenes above-the-fold
  imageSizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes
/>
```

---

## 📐 Tamaños de Imagen

```jsx
// Pequeño (h-40 / ~160px)
<ProductCard imageSize="small" />

// Mediano (h-56 / ~224px) - Predeterminado
<ProductCard imageSize="medium" />

// Grande (h-72 / ~288px)
<ProductCard imageSize="large" />
```

---

## 🎨 Ejemplo Completo

```jsx
<ProductCard
  // Información del producto
  image="/products/headphones.png"
  imageAlt="Audífonos Premium Inalámbricos con Cancelación de Ruido"
  title="Audífonos Premium"
  description="Sonido de alta fidelidad con cancelación de ruido activa y batería de 30 horas"
  
  // Precios
  price={299.99}
  originalPrice={399.99}
  
  // Rating
  rating={4.5}
  reviews={128}
  
  // Visual
  variant="premium"
  imagePosition="float"
  imageSize="large"
  badge="NUEVO"
  
  // Acciones
  onAddToCart={() => addToCart(product)}
  onWishlist={() => toggleWishlist(product.id)}
  onQuickView={() => openQuickView(product)}
  
  // SEO
  imagePriority={false}
  imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  
  // Estilos personalizados
  className="custom-class"
  imageClassName="custom-image-class"
/>
```

---

## 📱 Responsive Grid

### 3 columnas en desktop
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <ProductCard {...product1} />
  <ProductCard {...product2} />
  <ProductCard {...product3} />
</div>
```

### 4 columnas en desktop
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <ProductCard {...product} />
</div>
```

### 2 columnas para productos destacados
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
  <ProductCard imageSize="large" {...featuredProduct} />
</div>
```

---

## 💡 Tips de Uso

### 1. **Para productos con fondo transparente (PNG)**
```jsx
<ProductCard
  imagePosition="float"
  imageSize="large"
  variant="premium"
/>
```

### 2. **Para fotos de productos rectangulares**
```jsx
<ProductCard
  imagePosition="contained"
  imageSize="medium"
  variant="elevated"
/>
```

### 3. **Para productos sin imagen**
Usa un placeholder:
```jsx
<ProductCard
  image="/placeholder-product.png"
  imageAlt="Imagen no disponible"
/>
```

### 4. **Para mejor performance**
```jsx
// Primera fila (visible): priority={true}
<ProductCard imagePriority={true} />

// Resto: priority={false}
<ProductCard imagePriority={false} />
```

---

## 🚀 Integración con Estado

```jsx
const [products, setProducts] = useState([]);
const [wishlist, setWishlist] = useState([]);
const [cart, setCart] = useState([]);

const handleAddToCart = (product) => {
  setCart([...cart, product]);
  toast.success('Producto agregado al carrito');
};

const handleToggleWishlist = (productId) => {
  setWishlist(prev => 
    prev.includes(productId) 
      ? prev.filter(id => id !== productId)
      : [...prev, productId]
  );
};

return (
  <div className="grid grid-cols-3 gap-8">
    {products.map(product => (
      <ProductCard
        key={product.id}
        {...product}
        onAddToCart={() => handleAddToCart(product)}
        onWishlist={() => handleToggleWishlist(product.id)}
      />
    ))}
  </div>
);
```

---

## 🎯 Props Completas

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `image` | string | - | **Requerido**. URL de la imagen |
| `imageAlt` | string | 'Producto' | Alt text para SEO |
| `title` | string | - | **Requerido**. Nombre del producto |
| `description` | string | - | Descripción breve |
| `price` | number | - | **Requerido**. Precio actual |
| `originalPrice` | number | - | Precio original (tachado) |
| `discount` | number | - | % de descuento manual |
| `rating` | number | 0 | Rating de 0 a 5 |
| `reviews` | number | 0 | Número de reseñas |
| `badge` | string | - | Badge personalizado |
| `variant` | string | 'default' | 'default', 'elevated', 'glass', 'premium' |
| `imagePosition` | string | 'float' | 'float', 'contained', 'background' |
| `imageSize` | string | 'large' | 'small', 'medium', 'large' |
| `hoverable` | boolean | true | Efectos hover |
| `onAddToCart` | function | - | Callback al agregar al carrito |
| `onWishlist` | function | - | Callback al agregar a favoritos |
| `onQuickView` | function | - | Callback para vista rápida |
| `className` | string | '' | Clases adicionales |
| `imageClassName` | string | '' | Clases para la imagen |
| `imagePriority` | boolean | false | Priority de Next Image |
| `imageSizes` | string | - | Sizes de Next Image |