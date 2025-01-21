# Guía Completa de Implementación de Modelos de Contenido en Contentful

## 📋 Instrucciones de Implementación

### Orden de Creación

1. Crear primero los componentes base
2. Luego crear las secciones que utilizan estos componentes
3. Finalmente crear los tipos de páginas que contendrán las secciones

### Consideraciones Importantes

- Todos los IDs de los Content Types deben respetarse exactamente como están documentados
- Los patrones de validación (regex) deben copiarse exactamente
- Las referencias entre contenidos deben configurarse como se indica
- Los valores por defecto deben establecerse como se especifica
- Los campos requeridos deben marcarse como tal

## 🔍 Especificaciones Detalladas

### 1️⃣ Componentes Base

#### 📱 Social Link

**Content Type ID:** `socialLink` **Descripción:** Gestiona los enlaces a redes sociales con sus respectivos íconos.

- `redSocial` (Short text)
  - Required
  - Validations: [Facebook, Twitter, Instagram, LinkedIn, YouTube, WhatsApp, TikTok]
  - **Help text**: "Selecciona la red social. Esto determinará el ícono mostrado automáticamente"
- `url` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - **Help text**: "URL completa del perfil social. Debe comenzar con http:// o https://"

#### 🎁 Benefit

**Content Type ID:** `benefit` **Descripción:** Define los beneficios o características destacadas del producto/servicio.

- `title` (Short text)
  - Required
  - **Help text**: "Título corto y atractivo del beneficio. Máximo 60 caracteres"
- `description` (Long text)
  - Required
  - **Help text**: "Descripción detallada del beneficio. Enfócate en el valor para el usuario. Máximo 200 caracteres"
- `icon` (Media - Image)
  - Optional
  - **Help text**: "Ícono SVG o PNG con fondo transparente. Tamaño recomendado 64x64px"
- `accentColor` (Short text)
  - Optional
  - Pattern: ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
  - **Help text**: "Color hexadecimal (ej: #FF0000) para destacar este beneficio"

#### 🔄 Process Step

**Content Type ID:** `processStep` **Descripción:** Define los pasos de un proceso o flujo de trabajo.

- `title` (Short text)
  - Required
  - **Help text**: "Título breve que describe este paso. Sé específico y accionable"
- `description` (Long text)
  - Required
  - **Help text**: "Explicación detallada de lo que sucede en este paso"
- `icon` (Short text)
  - Required
  - **Help text**: "Nombre del ícono de Lucide (ej: 'arrow-right', 'check-circle')"
- `ctaText` (Short text)
  - Optional
  - **Help text**: "Texto del botón de acción para este paso (si es necesario)"
- `ctaUrl` (Short text)
  - Optional
  - Pattern: ^https?://.\*$
  - **Help text**: "URL para el botón de acción de este paso"

#### 💎 Pricing Plan

**Content Type ID:** `pricingPlan` **Descripción:** Define los planes de precios y sus características.

- `name` (Short text)
  - Required
  - **Help text**: "Nombre del plan (ej: 'Básico', 'Pro', 'Enterprise')"
- `price` (Short text)
  - Required
  - **Help text**: "Precio con moneda y periodicidad (ej: '$99/mes', 'Desde $199')"
- `description` (Long text)
  - Required
  - **Help text**: "Descripción breve del valor principal del plan. Máximo 100 caracteres"
- `features` (Short text - list)
  - Required
  - **Help text**: "Lista de características incluidas. Una por línea"
- `highlightedText` (Boolean)
  - Required
  - Default: false
  - **Help text**: "Activa para destacar este plan como la mejor opción"
- `promotionalText` (Short text)
  - Optional
  - **Help text**: "Texto promocional que aparece sobre el plan (ej: '¡Más popular!')"
- `payLinkText` (Short text)
  - Required
  - **Help text**: "Texto del botón de compra. Máximo 20 caracteres"
- `payLink` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - **Help text**: "URL donde el usuario puede contratar este plan"

#### 👤 Team Member

**Content Type ID:** `teamMember` **Descripción:** Información sobre los miembros del equipo.

- `name` (Short text)
  - Required
  - **Help text**: "Nombre completo del miembro del equipo"
- `role` (Short text)
  - Required
  - **Help text**: "Cargo o posición en la empresa"
- `bio` (Long text)
  - Required
  - **Help text**: "Biografía breve. Máximo 300 caracteres"
- `image` (Media - Image)
  - Required
  - **Help text**: "Foto profesional. Recomendado: 400x400px, formato cuadrado"
- `socialLinks` (Array of References - socialLink)
  - Optional
  - **Help text**: "Enlaces a perfiles profesionales en redes sociales"

#### ❔ FAQ

**Content Type ID:** `faq` **Descripción:** Preguntas frecuentes y sus respuestas.

- `question` (Short text)
  - Required
  - **Help text**: "Pregunta frecuente desde la perspectiva del usuario"
- `answer` (Long text)
  - Required
  - **Help text**: "Respuesta clara y concisa. Evita jerga técnica"

### 2️⃣ Secciones

#### 🅰️ Header Section

**Content Type ID:** `headerSection` **Descripción:** Configura el encabezado principal del sitio.

- `logo` (Media - Image)
  - Required
  - **Help text**: "Logo principal. SVG o PNG con fondo transparente. Altura: 40px"
- `widthLogo` (Number)
  - Optional
  - Default: 150
  - **Help text**: "Ancho del logo en píxeles"
- `ctaText` (Short text)
  - Required
  - **Help text**: "Texto del botón principal. Máximo 15 caracteres"
- `ctaUrl` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - **Help text**: "URL del botón principal"

#### 🦸 Hero Section

**Content Type ID:** `heroSection` **Descripción:** Sección principal de la página de inicio.

- `title` (Short text)
  - Required
  - **Help text**: "Título principal impactante. Máximo 70 caracteres"
- `highlightedText` (Short text)
  - Optional
  - **Help text**: "Parte del título que se destacará visualmente"
- `description` (Long text)
  - Required
  - **Help text**: "Subtítulo que amplía el título. Máximo 150 caracteres"
- `ctaText` (Short text)
  - Required
  - **Help text**: "Texto del botón principal. Máximo 20 caracteres"
- `ctaUrl` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - **Help text**: "URL del botón principal"
- `image` (Media - Image)
  - Optional
  - **Help text**: "Imagen principal. Recomendado: 1200x800px"
- `imagePosition` (Short text)
  - Optional
  - Default: "right"
  - Validations: [right, left, top, bottom, background]
  - **Help text**: "Posición de la imagen respecto al texto"
- `imageWidth` (Number)
  - Optional
  - **Help text**: "Ancho máximo de la imagen en píxeles"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### 🤝 Partners Section

**Content Type ID:** `partnersSection` **Descripción:** Muestra logos de partners o clientes.

- `title` (Short text)
  - Required
  - **Help text**: "Título de la sección de partners"
- `subtitle` (Long text)
  - Optional
  - **Help text**: "Texto descriptivo sobre los partners"
- `logos` (Array of Media)
  - Required
  - **Help text**: "Logos de partners. SVG o PNG con fondo transparente"
- `displayMode` (Short text)
  - Required
  - Validations: [grid, scroll]
  - **Help text**: "'grid' para cuadrícula, 'scroll' para carrusel"
- `scrollSpeed` (Number)
  - Optional
  - Default: 30
  - **Help text**: "Velocidad del carrusel (1-100)"
- `height` (Number)
  - Optional
  - Default: 60
  - **Help text**: "Altura en píxeles para todos los logos"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### 📈 Process Section

**Content Type ID:** `processSection` **Descripción:** Muestra los pasos de un proceso.

- `title` (Short text)
  - Required
  - **Help text**: "Título que describe el proceso"
- `subtitle` (Long text)
  - Required
  - **Help text**: "Descripción breve del proceso"
- `steps` (Array of References - processStep)
  - Required
  - **Help text**: "Pasos del proceso en orden. 2-6 pasos recomendados"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### 🎥 Product Demo Section

**Content Type ID:** `productDemoSection` **Descripción:** Sección para mostrar demos o videos del producto.

- `title` (Short text)
  - Required
  - **Help text**: "Título que introduce la demostración"
- `subtitle` (Short text)
  - Optional
  - **Help text**: "Subtítulo complementario"
- `descriptionTitle` (Short text)
  - Optional
  - **Help text**: "Título de la descripción del video"
- `description` (Long text)
  - Optional
  - **Help text**: "Texto que contextualiza el video"
- `videoUrl` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - **Help text**: "URL del video (YouTube o Vimeo)"
- `videoPosition` (Short text)
  - Required
  - Default: "right"
  - Validations: [right, left, bottom, top]
  - **Help text**: "Posición del video respecto al texto"
- `aspectRatio` (Short text)
  - Required
  - Default: "16:9"
  - Validations: [16:9, 4:3, 1:1, 9:16]
  - **Help text**: "Proporción del video"
- `videoHeight` (Number)
  - Optional
  - **Help text**: "Altura máxima del video en píxeles"
- `ctaText` (Short text)
  - Optional
  - **Help text**: "Texto del botón de acción"
- `ctaUrl` (Short text)
  - Optional
  - Pattern: ^https?://.\*$
  - **Help text**: "URL para el botón de acción"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### 💰 Pricing Section

**Content Type ID:** `pricingSection` **Descripción:** Muestra los planes de precios disponibles.

- `title` (Short text)
  - Required
  - **Help text**: "Título de la sección de precios"
- `subtitle` (Long text)
  - Required
  - **Help text**: "Texto introductorio para los planes"
- `plans` (Array of References - pricingPlan)
  - Required
  - **Help text**: "Planes a mostrar. Ordenar de menor a mayor precio"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### 🎯 Benefits Section

**Content Type ID:** `benefitsSection` **Descripción:** Destaca los beneficios clave del producto/servicio.

- `title` (Short text)
  - Required
  - **Help text**: "Título principal de la sección"
- `subtitle` (Long text)
  - Optional
  - **Help text**: "Subtítulo que refuerza el título"
- `benefits` (Array of References - benefit)
  - Required
  - **Help text**: "Lista de beneficios a mostrar"
- `screenshot` (Media - Image)
  - Optional
  - **Help text**: "Captura de pantalla o imagen ilustrativa"
- `screenshotDescription` (Short text)
  - Optional
  - **Help text**: "Texto descriptivo para la imagen"
- `ctaText` (Short text)
  - Optional
  - **Help text**: "Texto del botón de llamada a la acción"
- `ctaUrl` (Short text)
  - Optional
  - Pattern: ^https?://.\*$
  - **Help text**: "URL para el botón de llamada a la acción"
- `layout` (Short text)
  - Optional
  - Default: "grid"
  - Validations: [grid, split]
  - **Help text**: "Estilo de layout: 'grid' para cuadrícula, 'split' para dividido"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### 👥 Team Section

**Content Type ID:** `teamSection` **Descripción:** Presenta al equipo de la empresa.

- `title` (Short text)
  - Required
  - **Help text**: "Título de la sección del equipo"
- `subtitle` (Long text)
  - Required
  - **Help text**: "Texto que presenta al equipo"
- `members` (Array of References - teamMember)
  - Required
  - **Help text**: "Miembros del equipo a mostrar"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### ❓ FAQ Section

**Content Type ID:** `faqSection` **Descripción:** Sección de preguntas frecuentes.

- `title` (Short text)
  - Required
  - **Help text**: "Título de la sección FAQ"
- `subtitle` (Long text)
  - Required
  - **Help text**: "Texto introductorio para las FAQ"
- `faqs` (Array of References - faq)
  - Required
  - **Help text**: "Preguntas frecuentes a mostrar"
- `columns` (Number)
  - Optional
  - Default: 1
  - Validations: [1, 2]
  - **Help text**: "Número de columnas para mostrar las FAQ"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### 🎯 CTA Section

**Content Type ID:** `ctaSection` **Descripción:** Sección de llamada a la acción.

- `title` (Short text)
  - Required
  - **Help text**: "Título llamativo para la sección"
- `subtitle` (Long text)
  - Required
  - **Help text**: "Texto persuasivo que impulsa a la acción"
- `ctaText` (Short text)
  - Required
  - **Help text**: "Texto del botón principal"
- `ctaUrl` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - **Help text**: "URL del botón principal"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la sección"

#### 👣 Footer Section

**Content Type ID:** `footerSection` **Descripción:** Configura el pie de página del sitio.

- `logo` (Media - Image)
  - Required
  - **Help text**: "Logo para el footer. SVG o PNG con fondo transparente"
- `widthLogo` (Number)
  - Optional
  - Default: 150
  - **Help text**: "Ancho del logo en píxeles"
- `socialLinks` (Array of References - socialLink)
  - Required
  - **Help text**: "Enlaces a redes sociales"
- `email` (Short text)
  - Required
  - Pattern: ^[^\s@]+@[^\s@]+\.[^\s@]+$
  - **Help text**: "Email de contacto principal"
- `phone` (Short text)
  - Required
  - **Help text**: "Teléfono de contacto. Formato internacional"
- `copyright` (Short text)
  - Required
  - **Help text**: "Texto de derechos de autor"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad del footer"

### 3️⃣ Páginas

#### 🏠 Landing Page

**Content Type ID:** `landingPage` **Descripción:** Página principal del sitio.

- `internalName` (Short text)
  - Required
  - **Help text**: "Nombre interno para identificar esta página en el CMS"
- `slug` (Short text)
  - Required
  - Default: "/"
  - Pattern: ^/$
  - Unique
  - **Help text**: "URL de la página principal. Mantener como '/'"
- `title` (Short text)
  - Required
  - **Help text**: "Título SEO de la página. Máximo 60 caracteres"
- `description` (Long text)
  - Required
  - **Help text**: "Meta descripción SEO. 150-160 caracteres"
- `sections` (Array of References)
  - Required
  - **Help text**: "Secciones que compondrán la página. Arrastra para reordenar"
- `googleTagManager` (Short text)
  - Optional
  - **Help text**: "ID de Google Tag Manager (GTM-XXXXXX)"
- `valeiaChat` (Boolean)
  - Optional
  - Default: false
  - **Help text**: "Activar widget de chat de ValeIA"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla si la página está publicada"

#### 📄 Dynamic Page

**Content Type ID:** `dynamicPage` **Descripción:** Páginas dinámicas como blog posts o páginas de contenido.

- `title` (Short text)
  - Required
  - **Help text**: "Título principal de la página"
- `slug` (Short text)
  - Required
  - Pattern: ^[a-z0-9-]+$
  - Unique
  - **Help text**: "URL amigable. Use guiones, solo minúsculas y números"
- `content` (Rich Text)
  - Required
  - **Help text**: "Contenido principal de la página"
- `featuredImage` (Media - Image)
  - Optional
  - **Help text**: "Imagen destacada. Recomendado: 1200x630px"
- `isVisible` (Boolean)
  - Required
  - Default: true
  - **Help text**: "Controla la visibilidad de la página"
- `label` (Short text)
  - Required
  - **Help text**: "Texto para el menú de navegación"
- `location` (Short text)
  - Required
  - Validations: [header, footer, blog, null]
  - **Help text**: "Ubicación del enlace en la navegación"
- `author` (Short text)
  - Optional
  - **Help text**: "Autor del contenido (para blogs)"
- `publishDate` (Date and time)
  - Optional
  - **Help text**: "Fecha de publicación (para blogs)"
- `tags` (Short text - Array)
  - Optional
  - **Help text**: "Categorías o etiquetas para clasificar el contenido"

## 📝 Notas de Implementación

### Validaciones Importantes

1. Asegurarse de que todos los patrones (regex) estén correctamente implementados
2. Verificar que las referencias entre contenidos estén correctamente configuradas
3. Respetar los valores por defecto especificados
4. Mantener los campos requeridos como obligatorios

### Mejores Prácticas

1. Mantener consistencia en el nombramiento de los campos
2. Usar los help texts proporcionados para guiar a los editores
3. Probar todas las validaciones antes de usar en producción
4. Verificar que las referencias circulares no estén presentes

### Consideraciones de SEO

1. Asegurar que los campos de título y descripción tengan límites de caracteres apropiados
2. Mantener los slugs únicos y bien formados
3. Utilizar los campos de SEO opcionales cuando sea posible

### Mantenimiento

1. Revisar periódicamente los enlaces y referencias
2. Actualizar los help texts según el feedback de los editores
3. Mantener las validaciones actualizadas según las necesidades del proyecto

# Custom Theme Content Type

Content Type ID: `customTheme`

Fields:

1. `name` (Short text)

   - Required
   - Help text: "Nombre para identificar este tema personalizado"

2. `primaryColor` (Short text)

   - Required
   - Pattern: ^#([A-Fa-f0-9]{6})$
   - Help text: "Color principal para botones y elementos destacados (formato: #RRGGBB)"
   - Default: "#7c3aed"

3. `accentColor` (Short text)

   - Optional
   - Pattern: ^#([A-Fa-f0-9]{6})$
   - Help text: "Color secundario para gradientes (formato: #RRGGBB). Si no se especifica, se usará el color principal"

4. `backgroundColor` (Short text)

   - Required
   - Pattern: ^#([A-Fa-f0-9]{6})$
   - Help text: "Color de fondo del sitio (formato: #RRGGBB)"
   - Default: "#ffffff"

5. `textColor` (Short text)

   - Required
   - Pattern: ^#([A-Fa-f0-9]{6})$
   - Help text: "Color del texto principal (formato: #RRGGBB)"
   - Default: "#000000"

6. `style` (Select)

   - Required
   - Options:
     - minimal (Sin efectos visuales)
     - gradient (Con efectos de gradiente)
     - glass (Efecto cristal/transparencia)
   - Default: "gradient"
   - Help text: "Estilo visual general del sitio"

7. `borderRadius` (Number)

   - Optional
   - Default: 8
   - Help text: "Radio de borde en píxeles para elementos redondeados (0-20)"
   - Validation: Min: 0, Max: 20

8. `preview` (Media - Image)
   - Optional
   - Help text: "Vista previa del tema personalizado"
