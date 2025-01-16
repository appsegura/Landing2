# Modelos de Contenido Contentful

## 📚 Orden de Creación

1. Landing Page y Páginas

   - Landing Page
   - Dynamic Page
   - Legal Page

2. Secciones de Landing

   - Header Section
   - Hero Section
   - Partners Section
   - Process Section
   - Pricing Section
   - Team Section
   - FAQ Section
   - CTA Section
   - Footer Section

3. Componentes Auxiliares
   - Service
   - Process Step
   - Pricing Plan
   - Team Member
   - Social Link
   - FAQ

## 📄 Landing Page y Páginas

### 🏠 Landing Page

**Content Type ID:** `landingPage`

Configuración principal de la página de inicio.

- `internalName` (Short text)
  - Required
  - Description: Nombre interno para identificar la página
- `slug` (Short text)
  - Required
  - Default: "/"
  - Pattern: ^/$
  - Unique
  - Description: URL de la página de inicio (siempre "/")
- `title` (Short text)
  - Required
  - Description: Título de la página para SEO
- `description` (Long text)
  - Required
  - Description: Descripción de la página para SEO
- `sections` (Array of References)
  - Required
  - Items: References to:
    - heroSection
    - servicesSection
    - processSection
    - pricingSection
    - teamSection
    - faqSection
    - ctaSection
  - Description: Secciones de la página y su orden
- `isVisible` (Boolean)
  - Required
  - Default: true
  - Description: Controla la visibilidad de la página

## 📄 Dynamic Page

**Content Type ID:** `dynamicPage`

Páginas dinámicas que pueden ser enlazadas desde el header o footer.

- `title` (Short text)
  - Required
  - Description: Título principal de la página
- `slug` (Short text)
  - Required
  - Pattern: ^[a-z0-9-]+$ (solo minúsculas, números y guiones)
  - Unique
  - Description: URL amigable para la página
- `content` (Rich Text)
  - Required
  - Description: Contenido principal de la página
  - Validations:
    - Enable all formatting options
    - Enable headings
    - Enable tables
    - Enable hyperlinks
- `featuredImage` (Media - Image)
  - Optional
  - Validations: Only images
  - Description: Imagen destacada de la página
- `isVisible` (Boolean)
  - Required
  - Default: true
  - Description: Controla la visibilidad de la página
- `label` (Short text)
  - Required
  - Description: Texto que se mostrará en el menú
- `location` (Short text)
  - Required
  - Validations: Exactly one of:
    - header
    - footer
    - null
  - Description: Ubicación donde se mostrará el enlace a la página

### 📄 Legal Page

**Content Type ID:** `legalPage`

Páginas legales como términos y condiciones, política de privacidad, etc.

- `title` (Short text)
  - Required
  - Description: Título de la página legal
- `slug` (Short text)
  - Required
  - Pattern: ^[a-z0-9-]+$ (solo minúsculas, números y guiones)
  - Unique
  - Description: URL amigable para la página
- `content` (Rich Text)
  - Required
  - Description: Contenido legal
  - Validations:
    - Enable all formatting options
    - Enable headings
    - Enable tables
    - Enable hyperlinks
- `isVisible` (Boolean)
  - Required
  - Default: true
  - Description: Controla la visibilidad de la página
- `label` (Short text)
  - Required
  - Description: Texto que se mostrará en el footer
- `location` (Short text)
  - Required
  - Default: 'legal'
  - Description: Siempre 'legal' para estas páginas

### 🅰️ Header Section

**Content Type ID:** `headerSection`

Configuración del encabezado del sitio.

- `logo` (Media - Image)
  - Required
  - Validations: Only images
  - Description: Logo del sitio
  - Fields:
    - `width` (Number)
    - `height` (Number)
- `ctaText` (Short text)
  - Required
  - Description: Texto del botón de llamada a la acción
- `ctaUrl` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - Description: URL externa para el botón de llamada a la acción

### 👣 Footer Section

**Content Type ID:** `footerSection`

Configuración del pie de página.

- `logo` (Media - Image)
  - Required
  - Validations: Only images
  - Description: Logo del pie de página
- `socialLinks` (Array of References)
  - Required
  - Items: Reference to `socialLink`
  - Description: Enlaces a redes sociales
- `email` (Short text)
  - Required
  - Pattern: ^[^\s@]+@[^\s@]+\.[^\s@]+$
  - `phone` (Short text)
    - Required
- `copyright` (Short text)
  - Required
  - Description: Texto de derechos de autor
- `isVisible` (Boolean)
  - Required
  - Default: true

## 🎯 Secciones de Landing

## 🦸 Hero Section

**Content Type ID:** `heroSection`

Sección principal de la página de inicio.

- `title` (Short text)
  - Required
  - Description: Título principal del hero
- `highlightedText` (Short text)
  - Required
  - Description: Texto resaltado dentro del título
- `description` (Long text)
  - Required
  - Description: Descripción o subtítulo del hero
- `ctaText` (Short text)
  - Required
  - Description: Texto del botón de llamada a la acción
- `ctaUrl` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - Description: URL externa para el botón de llamada a la acción

## 📈 Process Section

**Content Type ID:** `processSection`

Sección que explica el proceso o metodología.

- `title` (Short text)
  - Required
  - Description: Título de la sección
- `subtitle` (Long text)
  - Required
  - Description: Subtítulo o descripción de la sección
- `steps` (Array of References)
  - Required
  - Items: Reference to `processStep`
  - Description: Pasos del proceso
- `isVisible` (Boolean)
  - Required
  - Default: true

## 💰 Pricing Section

**Content Type ID:** `pricingSection`

Sección de planes y precios.

- `title` (Short text)
  - Required
  - Description: Título de la sección
- `subtitle` (Long text)
  - Required
  - Description: Subtítulo o descripción de la sección
- `plans` (Array of References)
  - Required
  - Items: Reference to `pricingPlan`
  - Description: Planes de precios
- `isVisible` (Boolean)
  - Required
  - Default: true

## 👥 Team Section

**Content Type ID:** `teamSection`

Sección que presenta al equipo.

- `title` (Short text)
  - Required
  - Description: Título de la sección
- `subtitle` (Long text)
  - Required
  - Description: Subtítulo o descripción de la sección
- `members` (Array of References)
  - Required
  - Items: Reference to `teamMember`
  - Description: Miembros del equipo
- `isVisible` (Boolean)
  - Required
  - Default: true

## ❓ FAQ Section

**Content Type ID:** `faqSection`

Sección de preguntas frecuentes.

- `title` (Short text)
  - Required
  - Description: Título de la sección
- `subtitle` (Long text)
  - Required
  - Description: Subtítulo o descripción de la sección
- `faqs` (Array of References)
  - Required
  - Items: Reference to `faq`
  - Description: Lista de preguntas frecuentes
- `isVisible` (Boolean)
  - Required
  - Default: true

## 🎯 CTA Section

**Content Type ID:** `ctaSection`

Sección final de llamada a la acción.

- `title` (Short text)
  - Required
  - Description: Título de la sección
- `subtitle` (Long text)
  - Required
  - Description: Subtítulo o descripción de la sección
- `ctaText` (Short text)
  - Required
  - Description: Texto del botón de llamada a la acción
- `ctaUrl` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - Description: URL externa para el botón
- `isVisible` (Boolean)

  - Required
  - Default: true

## 🤝 Partners Section

**Content Type ID:** `partnersSection`

Sección que muestra los logos de partners o clientes.

- `title` (Short text)
  - Required
  - Description: Título de la sección
- `subtitle` (Long text)
  - Optional
  - Description: Subtítulo o descripción de la sección
- `logos` (Array of Media)
  - Required
  - Validations: Only images
  - Description: Lista de logos de los partners
- `displayMode` (Short text)
  - Required
  - Validations: Exactly one of:
    - grid
    - scroll
  - Description: Modo de visualización de los logos
- `scrollSpeed` (Number)
  - Optional
  - Default: 30
  - Description: Velocidad de desplazamiento para el modo scroll
- `height` (Number)
  - Optional
  - Default: 60
  - Description: Alto en píxeles para todos los logos
- `isVisible` (Boolean)

  - Required
  - Default: true
  - Description: Controla la visibilidad de la sección

## 🎥 Product Demo Section

**Content Type ID:** `productDemoSection`

Sección que muestra un video del producto con texto de apoyo.

- `title` (Short text)
  - Required
  - Description: Título principal de la sección
- `description` (Long text)
  - Optional
  - Description: Texto de apoyo para contextualizar el video
- `videoUrl` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - Description: URL del video (YouTube o Vimeo)
- `videoPosition` (Short text)
  - Required
  - Validations: Exactly one of:
    - right
    - left
    - bottom
  - Default: right
  - Description: Posición del video en relación al texto
- `aspectRatio` (Short text)
  - Required
  - Validations: Exactly one of:
    - 16:9
    - 4:3
    - 1:1
    - 9:16
  - Default: 16:9
  - Description: Proporción del video (incluye vertical 9:16)
- `ctaText` (Short text)
  - Optional
  - Description: Texto del botón de llamada a la acción
- `ctaUrl` (Short text)
  - Optional
  - Pattern: ^https?://.\*$
  - Description: URL para el botón de llamada a la acción
- `isVisible` (Boolean)
  - Required
  - Default: true
  - Description: Controla la visibilidad de la sección

## 🧩 Componentes Auxiliares

## 🔄 Process Step

**Content Type ID:** `processStep`

Representa un paso en el proceso.

- `title` (Short text)
  - Required
  - Description: Título del paso
- `description` (Long text)
  - Required
  - Description: Descripción detallada del paso
- `icon` (Short text)
  - Required
  - Validations: Predefined values from Lucide icons
  - Description: Nombre del ícono de Lucide para el paso

## 💎 Pricing Plan

**Content Type ID:** `pricingPlan`

Define un plan de precios.

- `name` (Short text)
  - Required
  - Description: Nombre del plan
- `price` (Short text)
  - Required
  - Description: Precio del plan
- `description` (Long text)
  - Required
  - Description: Descripción del plan
- `features` (Short text - list)
  - Required
  - Description: Características del plan
- `highlighted` (Boolean)
  - Required
  - Default: false
  - Description: Indica si el plan debe destacarse
- `payLinkText` (Short text)
  - Required
  - Description: Texto del botón de llamada a la acción
- `payLink` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - Description: URL externa para el botón

## 👤 Team Member

**Content Type ID:** `teamMember`

Representa un miembro del equipo.

- `name` (Short text)
  - Required
  - Description: Nombre del miembro
- `role` (Short text)
  - Required
  - Description: Cargo o rol del miembro
- `bio` (Long text)
  - Required
  - Description: Biografía o descripción
- `image` (Media - Image)
  - Required
  - Validations: Only images
  - Description: Foto del miembro
- `socialLinks` (Array of References)
  - Optional
  - Items: Reference to `socialLink`
  - Description: Enlaces a redes sociales del miembro

## 📱 Social Link

**Content Type ID:** `socialLink`

Enlaces a redes sociales.

- `redSocial` (Short text)
  - Required
  - Description: Nombre de la red social
  - Validations: Exactly one of:
    - Facebook
    - Twitter
    - Instagram
    - LinkedIn
    - YouTube
    - WhatsApp
    - Pinterest
    - Snapchat
    - TikTok
    - Reddit
- `url` (Short text)
  - Required
  - Pattern: ^https?://.\*$
  - Description: URL completa del perfil social

## ❔ FAQ

**Content Type ID:** `faq`

Pregunta frecuente individual.

- `question` (Short text)
  - Required
  - Description: Pregunta
- `answer` (Long text)
  - Required
  - Description:
