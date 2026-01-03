# 🦇 PROMPT TEMPLATE: Creación de Componentes Góticos Dark v2.0

## 📋 Instrucciones de Uso
Copia y pega este prompt cuando necesites crear un nuevo componente. Reemplaza `[NOMBRE_COMPONENTE]` con el componente que necesitas (ej: Modal, Tabs, Carousel, etc.)

---

## 🎨 PROMPT COMPLETO

```
Crea el componente [NOMBRE_COMPONENTE] para mi aplicación Next.js con estilo Gótico Dark Medieval.

FILOSOFÍA DE DISEÑO:
El estilo es DARK GOTHIC MEDIEVAL, NO cyberpunk neon. Los colores deben ser sutiles y elegantes:
- Base: Negros profundos, grises oscuros, blancos grisáceos
- Acentos: Colores usados SOLO como decoradores/detalles, nunca como color dominante
- Estética: Catedral gótica medieval con metales y piedras, NO luces neon brillantes

═══════════════════════════════════════════════════════════════════════════

PALETA DE COLORES REFINADA (globals.css):

🖤 NEGROS Y SOMBRAS (Base principal - usar abundantemente):
--color-gothic-void: #050505        (Negro absoluto - fondos más profundos)
--color-gothic-abyss: #0a0a0a       (Negro abismo - fondo principal)
--color-gothic-shadow: #121212      (Negro sombra - fondos secundarios)
--color-gothic-obsidian: #1a1a1a    (Obsidiana - elementos elevados)

⚙️ GRISES METÁLICOS (Estructura y bordes - usar frecuentemente):
--color-gothic-iron: #242424        (Hierro - superficies base)
--color-gothic-steel: #2d2d2d       (Acero - elementos interactivos)
--color-gothic-gunmetal: #3a3a3a    (Metal de cañón - bordes activos)
--color-gothic-pewter: #4a4a4a      (Peltre - divisores)

🤍 PLATEADOS Y BLANCOS (Textos y elementos claros):
--color-gothic-ash: #6b7280         (Ceniza - texto terciario)
--color-gothic-smoke: #9ca3af       (Humo - texto secundario)
--color-gothic-silver: #d1d5db      (Plateado - texto principal)
--color-gothic-chrome: #e5e7eb      (Cromado - texto destacado)
--color-gothic-pearl: #f3f4f6       (Perla - texto brillante)

💎 ACENTOS SUTILES (Usar MÍNIMAMENTE como decoradores):
--color-gothic-amethyst: #6b21a8    (Amatista oscura - acento primario)
--color-gothic-wine: #7c2d12        (Vino - acento peligro)
--color-gothic-crimson: #991b1b     (Carmesí - estados de error)
--color-gothic-plum: #4c1d95        (Ciruela - hover sutil)
--color-gothic-emerald: #065f46     (Esmeralda oscura - success)
--color-gothic-amber: #c2410c       (Ámbar oscuro - warning)

═══════════════════════════════════════════════════════════════════════════

SISTEMA DE VARIANTES - CÓMO USAR COLORES:

📌 REGLA DE ORO: Base gris/negro + acento de color SUTIL

✅ PRIMARY (Acción principal):
   - Base: Blanco grisáceo (from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af])
   - Texto: Negro (text-gray-900)
   - Bordes: Gris oscuro (border-[#6b7280])
   - Sombras: Negras profundas
   - Decoraciones: Toques grises sutiles
   Ejemplo: Button primary es gris claro elegante, NO tiene color dominante

✅ SECONDARY (Acción alternativa):
   - Base: Gris medio (from-[#d1d5db] via-[#9ca3af] to-[#6b7280])
   - Texto: Negro (text-gray-900)
   - Bordes: Gris oscuro (border-[#4b5563])
   - Acento: Toques SUTILES de amatista en sombras/decoraciones
   - Sombras: 0_0_0_1px_rgba(107,33,168,0.25) - muy sutil
   Ejemplo: Badge secondary tiene base gris + línea/punto morado discreto

✅ DANGER (Peligro/Destrucción):
   - Base: Rojo vino OSCURO (from-[#7c2d12] via-[#991b1b] to-[#7f1d1d])
   - Texto: Rojo claro (text-red-100)
   - Bordes: Rojo oscuro (border-[#991b1b])
   - Sombras: Rojo oscuro con blur controlado
   - Este SÍ puede tener color dominante por ser crítico
   Ejemplo: Button danger es rojo vino completo (no gris con rojo)

✅ SUCCESS (Éxito/Confirmación):
   - Base: Verde oscuro (from-[#065f46] via-[#047857] to-[#064e3b])
   - Texto: Verde claro (text-emerald-100)
   - Bordes: Verde medio (border-[#059669])
   - Sombras: Verde con blur controlado
   Ejemplo: Badge success tiene fondo verde oscuro + texto claro

✅ WARNING (Advertencia):
   - Base: Naranja/ámbar oscuro (from-[#c2410c] via-[#ea580c] to-[#9a3412])
   - Texto: Naranja claro (text-orange-100)
   - Bordes: Naranja medio (border-[#ea580c])
   - Sombras: Naranja con blur controlado
   Ejemplo: Button warning es naranja oscuro completo

✅ INFO:
   - Base: Cyan oscuro (from-[#0e7490] via-[#0891b2] to-[#155e75])
   - Texto: Cyan claro (text-cyan-100)
   - Bordes: Cyan medio (border-[#06b6d4])

✅ GHOST (Transparente):
   - Base: Transparente (bg-transparent)
   - Texto: Gris (text-gray-400)
   - Bordes: Gris oscuro (border-[#2d2d2d])
   - Hover: Fondo gris muy sutil

✅ OUTLINE:
   - Base: Transparente
   - Solo bordes grises
   - Texto gris que se vuelve blanco en hover

═══════════════════════════════════════════════════════════════════════════

CARACTERÍSTICAS OBLIGATORIAS DEL ESTILO GÓTICO DARK:

1. FORMAS Y GEOMETRÍA GÓTICA:
   - Esquinas angulares con clip-path: clip-path-gothic
   - Cortes de 6-8px en las esquinas (no redondeadas)
   - Formas que recuerden arquitectura gótica medieval
   - Elementos decorativos pequeños y discretos en esquinas

2. BORDES Y MARCOS METÁLICOS:
   - Bordes de 1-2px en colores metálicos (#3a3a3a, #4a4a4a)
   - NO usar bordes de colores brillantes (salvo danger/success/warning que lo necesiten)
   - Marcos con sombras inset para simular profundidad
   - Líneas decorativas muy finas (1px) en gradiente

3. SOMBRAS PROFUNDAS Y CONTROLADAS:
   ⚠️ IMPORTANTE: Las sombras NO deben parecer luces neon
   
   Sombras normales:
   - shadow-[0_2px_6px_rgba(0,0,0,0.6)] - Sombra negra profunda
   - inset_0_1px_0_rgba(255,255,255,0.08) - Luz interna sutil
   
   Sombras hover SUAVIZADAS:
   - shadow-[0_2px_8px_rgba(0,0,0,0.7),0_0_10px_rgba(COLOR,0.25)]
   - Blur máximo de 10-15px, NO 20-30px
   - Opacidad de colores 0.15-0.3, NO 0.5-0.8
   
   Ejemplo CORRECTO de hover con color:
   hover:shadow-[0_2px_8px_rgba(107,33,168,0.3),0_0_10px_rgba(107,33,168,0.2)]
   
   Ejemplo INCORRECTO (muy neon):
   ❌ hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]

4. DECORACIONES GÓTICAS SUTILES:
   - Punto decorativo superior: w-[2-3px] h-[2-3px] con opacity 20-40%
   - Líneas decorativas: h-[1px] con gradientes from-transparent
   - Puntos en esquinas: w-[2px] h-[2px] bg-white/20
   - Todo debe ser DISCRETO, no llamativo

5. EFECTOS VISUALES ELEGANTES:
   - backdrop-blur-md para efectos de vidrio (12px máximo)
   - Gradientes sutiles en fondos (from-via-to con colores cercanos)
   - Animaciones suaves: transition-all duration-300
   - Scale en hover: 1.02 máximo (NO 1.05 o más)

6. PALETA DE USO POR ELEMENTO:
   
   Fondos principales: #0a0a0a, #121212, #1a1a1a
   Fondos elevados: #2d2d2d, #242424
   Fondos claros (primary): #e5e7eb, #d1d5db, #9ca3af
   
   Bordes neutros: #3a3a3a, #4a4a4a, #6b7280
   Bordes de color: Usar SOLO en danger/success/warning
   
   Textos oscuros: text-gray-900 (sobre fondos claros)
   Textos claros: text-gray-200, text-gray-300, text-gray-400
   Textos de color: SOLO en sus variantes específicas
   
   Acentos de color: SOLO en:
   - Sombras muy sutiles (rgba con 0.15-0.3)
   - Decoraciones pequeñas (puntos, líneas)
   - Hover effects controlados
   - Variantes specific (danger debe ser rojo, etc)

7. INTERACTIVIDAD:
   - Hover: scale-[1.02], cambios sutiles de sombra
   - Active: scale-[0.98]
   - Disabled: opacity-40
   - Loading: spinner animado
   - Transiciones: duration-300
   
8. ESTRUCTURA DEL COMPONENTE:
   - "use client" si tiene interactividad
   - Importar clsx para gestión de clases
   - Props: variant, size, className, disabled, loading (si aplica)
   - Variantes: primary, secondary, danger, success, warning, info, ghost, outline
   - Tamaños: sm, md, lg (y xl si tiene sentido)
   - Decoraciones absolutas con position: absolute
   - Contenedor principal con position: relative

9. CÓDIGO LIMPIO:
   - Variables descriptivas en español
   - Comentarios que expliquen el propósito
   - Separar claramente: baseStyles, variants, sizes
   - Exportar por defecto
   - Usar clsx para combinar clases condicionales

═══════════════════════════════════════════════════════════════════════════

EJEMPLOS DE REFERENCIA (ya creados - estudiar para consistencia):

📦 Button.jsx:
   - Primary: Blanco grisáceo elegante
   - Secondary: Gris con toques morados sutiles
   - Danger: Rojo vino completo
   - Success: Verde oscuro
   - Warning: Naranja oscuro
   - Decoraciones: Líneas y puntos muy discretos

📦 Badge.jsx:
   - Misma lógica que Button
   - Hover más suave (blur 10px máximo)
   - Decoraciones más pequeñas (3px)
   - Consistencia de colores con Button

═══════════════════════════════════════════════════════════════════════════

REQUISITOS TÉCNICOS:
- Framework: Next.js 16 con Tailwind CSS 4
- Ubicación: src/app/components/ui/[NOMBRE_COMPONENTE].jsx
- SOLO clases de Tailwind (CSS custom solo para clip-path si es necesario)
- Props type-safe pero en JavaScript
- Accesibilidad: aria-labels, roles, keyboard navigation

═══════════════════════════════════════════════════════════════════════════

GENERA:
1. El código completo del componente siguiendo EXACTAMENTE estas directrices
2. Ejemplos de uso con diferentes variantes
3. Lista completa de props disponibles con descripción

⚠️ RECORDATORIO CRÍTICO:
- Los colores son DECORADORES, no elementos dominantes (excepto danger/success/warning)
- Las sombras deben ser SUTILES, no luces neon brillantes
- La base es SIEMPRE gris/negro, los colores son ACENTOS
- Consistencia con Button.jsx y Badge.jsx es OBLIGATORIA

Crea el componente [NOMBRE_COMPONENTE] siguiendo estas directrices.
```

---

## 🔧 EJEMPLOS DE USO DEL PROMPT

### Para crear un Modal:
```
Crea el componente Modal para mi aplicación Next.js con estilo Gótico Dark Medieval.

[COPIAR TODO EL PROMPT DE ARRIBA AQUÍ]
```

### Para crear un Input:
```
Crea el componente Input para mi aplicación Next.js con estilo Gótico Dark Medieval.

[COPIAR TODO EL PROMPT DE ARRIBA AQUÍ]
```

### Para crear Tabs:
```
Crea el componente Tabs para mi aplicación Next.js con estilo Gótico Dark Medieval.

[COPIAR TODO EL PROMPT DE ARRIBA AQUÍ]
```

---

## 📝 GUÍA RÁPIDA DE CONSISTENCIA

### ✅ HACER:
- Base gris/negro para la mayoría de componentes
- Primary = blanco grisáceo elegante
- Secondary = gris con toque morado discreto
- Danger/Success/Warning = color completo pero OSCURO
- Sombras negras profundas + blur controlado (10-15px)
- Decoraciones pequeñas (2-3px)
- Hover sutil (scale 1.02, sombras suaves)

### ❌ NO HACER:
- Fondos de colores brillantes tipo neon
- Sombras enormes tipo `0_0_30px_rgba(...,0.8)`
- Primary con color dominante (debe ser gris claro)
- Bordes gruesos o muy coloridos
- Decoraciones grandes o llamativas
- Efectos de scale grandes (1.05+)

---

## 🎨 PALETA VISUAL RESUMIDA

```
BACKGROUNDS:
█ #050505  Negro absoluto
█ #0a0a0a  Negro abismo (fondo principal)
█ #121212  Negro sombra
█ #1a1a1a  Obsidiana
█ #242424  Hierro
█ #2d2d2d  Acero
▓ #e5e7eb  Gris claro (primary)
▓ #d1d5db  Plateado claro

ACENTOS (usar poco):
💜 #6b21a8  Amatista (secondary)
🔴 #7c2d12  Vino (danger)
🟢 #065f46  Esmeralda (success)
🟠 #c2410c  Ámbar (warning)
🔵 #0e7490  Cyan (info)
```

---

## ✅ CHECKLIST POST-CREACIÓN

Después de crear un componente, verifica:

### Estructura:
- [ ] Usa "use client" si tiene interactividad
- [ ] Importa clsx
- [ ] Props: variant, size, className como mínimo
- [ ] Exportación por defecto
- [ ] Comentarios descriptivos

### Estilo:
- [ ] Base gris/negro (NO colores dominantes excepto danger/success/warning)
- [ ] Primary es blanco grisáceo
- [ ] Secondary es gris con toque morado
- [ ] Esquinas angulares (clip-path-gothic)
- [ ] Decoraciones sutiles (puntos 2-3px, líneas 1px)
- [ ] Sombras controladas (blur 10-15px máximo)
- [ ] Hover suave (scale 1.02, sombras suaves)

### Variantes:
- [ ] primary, secondary, danger, success, warning mínimo
- [ ] ghost, outline, glass si aplica
- [ ] Cada variante visualmente diferenciable
- [ ] Consistencia con Button.jsx y Badge.jsx

### Accesibilidad:
- [ ] aria-labels donde corresponda
- [ ] Estados disabled/loading manejados
- [ ] Contraste de texto adecuado
- [ ] Navegación por teclado funciona

---

## 🆘 TROUBLESHOOTING

**Problema**: "Se ve muy neon/cyberpunk"
**Solución**: Reducir opacidad de colores, usar más negro/gris de base

**Problema**: "No se diferencian las variantes"
**Solución**: Usar colores completos SOLO en danger/success/warning

**Problema**: "Primary parece default"
**Solución**: Primary debe ser gris CLARO (#e5e7eb), no oscuro

**Problema**: "Sombras muy intensas en hover"
**Solución**: Máximo blur de 10-15px, opacidad 0.15-0.3

---

## 📚 RECURSOS

- **Referencia Button.jsx**: Ejemplo perfecto de variantes y colores
- **Referencia Badge.jsx**: Ejemplo de hover suavizado
- **Referencia globals.css**: Paleta completa y utilidades
- **Tailwind Docs**: https://tailwindcss.com
- **Next.js Docs**: https://nextjs.org