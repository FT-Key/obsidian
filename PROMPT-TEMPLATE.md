# 🦇 PROMPT TEMPLATE: Creación de Componentes Góticos Dark

## 📋 Instrucciones de Uso
Copia y pega este prompt cuando necesites crear un nuevo componente. Reemplaza `[NOMBRE_COMPONENTE]` con el componente que necesitas (ej: Modal, Tabs, Carousel, etc.)

---

## 🎨 PROMPT COMPLETO

```
Crea el componente [NOMBRE_COMPONENTE] para mi aplicación Next.js con estilo Gótico Dark.

PALETA DE COLORES (globals.css):
--color-gothic-void: #0a0a0a (Negro profundo - fondos principales)
--color-gothic-shadow: #1a1a1a (Negro sombra - fondos secundarios)
--color-gothic-charcoal: #2a2a2a (Carbón - elementos elevados)
--color-gothic-steel: #404040 (Acero - bordes y divisores)
--color-gothic-slate: #64748b (Pizarra - texto secundario)
--color-gothic-silver: #94a3b8 (Plateado - texto terciario)
--color-gothic-platinum: #cbd5e1 (Platino - texto principal)
--color-gothic-crimson: #dc2626 (Carmesí - acento peligro)
--color-gothic-blood: #991b1b (Sangre - hover peligro)
--color-gothic-purple: #7c3aed (Púrpura - acento primario)
--color-gothic-deep: #5b21b6 (Púrpura profundo - hover primario)

CARACTERÍSTICAS OBLIGATORIAS DEL ESTILO GÓTICO DARK:

1. FORMAS Y GEOMETRÍA:
   - Esquinas angulares con clip-path (no border-radius suave)
   - Puntas afiladas y ángulos dramáticos
   - Formas que recuerden arquitectura gótica medieval
   - Elementos decorativos en las esquinas (pequeños diamantes, puntas)

2. BORDES Y MARCOS:
   - Bordes de 2px con gradientes
   - Marcos ornamentados con decoraciones en esquinas
   - Líneas decorativas superiores/inferiores con gradientes
   - Puntos brillantes en intersecciones (simulando joyas)

3. SOMBRAS Y PROFUNDIDAD:
   - Sombras múltiples con box-shadow (exterior + inset)
   - Efectos de brillo con rgba y blur
   - Sombras coloreadas (púrpura, rojo) según contexto
   - Profundidad con capas de luz interna (inset shadows)

4. EFECTOS VISUALES:
   - Efectos de vidrio emplomado (backdrop-blur)
   - Brillos que aparecen en hover
   - Gradientes de múltiples colores
   - Efectos de cristal/joya en elementos decorativos
   - Animaciones suaves (300-500ms)

5. DECORACIONES GÓTICAS:
   - Líneas decorativas con gradientes (from-transparent via-color to-transparent)
   - Puntos brillantes en posiciones clave
   - Elementos que simulan hierro forjado
   - Detalles que recuerdan vitrales de catedrales

6. PALETA DE USO:
   - Fondos: void, shadow, charcoal
   - Bordes: steel con alpha
   - Textos: platinum (principal), silver (secundario), slate (terciario)
   - Acentos: purple (primario), crimson (peligro)
   - Hover: deep purple, blood red

7. INTERACTIVIDAD:
   - Hover effects con scale (1.02-1.05)
   - Cambios de sombra en hover (más intensas)
   - Cambios de brillo en bordes
   - Transiciones suaves (transition-all duration-300)
   - Estados: default, hover, active, disabled, loading

8. ESTRUCTURA DEL COMPONENTE:
   - Usar "use client" si necesita interactividad
   - Importar clsx para gestión de clases
   - Props comunes: variant, size, className, disabled, loading
   - Variantes: primary, secondary, danger, ghost, outline, glass
   - Tamaños: sm, md, lg, xl
   - Incluir decoraciones góticas absolutas (position: absolute)
   - Usar relative en el contenedor principal

9. CÓDIGO LIMPIO:
   - Variables en español para props (variant, tamaño, etc)
   - Comentarios descriptivos
   - Separar estilos base de variantes
   - Usar template literals para clases
   - Exportar por defecto

EJEMPLO DE REFERENCIA (estructura base):
Revisa Button.jsx, Card.jsx y Badge.jsx que ya están creados para mantener consistencia visual.

REQUISITOS TÉCNICOS:
- Framework: Next.js 16 con Tailwind CSS 4
- Ubicación: src/app/components/ui/[NOMBRE_COMPONENTE].jsx
- Usar solo clases de Tailwind (no CSS custom, excepto clip-path si es necesario)
- Props TypeScript-friendly pero en JavaScript
- Accesible (aria-labels cuando corresponda)

GENERA:
1. El código completo del componente
2. Ejemplos de uso del componente
3. Lista de props disponibles

Crea el componente [NOMBRE_COMPONENTE] siguiendo estas directrices.
```

---

## 🔧 EJEMPLO DE USO DEL PROMPT

### Para crear un Modal:
```
Crea el componente Modal para mi aplicación Next.js con estilo Gótico Dark.

[COPIAR TODO EL PROMPT DE ARRIBA AQUÍ]
```

### Para crear Tabs:
```
Crea el componente Tabs para mi aplicación Next.js con estilo Gótico Dark.

[COPIAR TODO EL PROMPT DE ARRIBA AQUÍ]
```

---

## 📝 NOTAS ADICIONALES

- **Mantén la paleta de colores** siempre actualizada en este prompt
- **Referencia los componentes existentes** para mantener consistencia
- **Ajusta las características** según el tipo de componente (algunos necesitan más decoración que otros)
- **Incluye animaciones** cuando tenga sentido (loading, transitions, hover)

---

## ✅ CHECKLIST POST-CREACIÓN

Después de crear un componente, verifica:

- [ ] Usa las clases de colores gothic-*
- [ ] Tiene decoraciones en esquinas
- [ ] Sombras múltiples (exterior + inset)
- [ ] Efectos hover suaves
- [ ] Variantes: primary, secondary, danger, ghost, outline
- [ ] Tamaños: sm, md, lg
- [ ] Props: variant, size, className, disabled
- [ ] Usa clsx para combinar clases
- [ ] Exportación por defecto
- [ ] Comentarios descriptivos