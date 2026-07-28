export type Tone = "terracotta" | "ochre" | "clay" | "sage" | "ink";
export type Lang = "es" | "en";
export type CategoryKey = "branding" | "contenido" | "social" | "estrategia";

export type LocalizedProduct = {
  name: string;
  features: string[];
  // Propiedades opcionales para evitar errores de TypeScript en otros componentes
  tagline?: string;
  description?: string;
  longDescription?: string;
  deliverables?: string[];
};

export type Product = {
  id: string;
  price: number; // MXN, sin IVA
  category: CategoryKey;
  tone: Tone;
  monthly?: boolean;
  popular?: boolean;
  index: string;
  content: Record<Lang, LocalizedProduct>;
};

export const CATEGORY_KEYS: (CategoryKey | "all")[] = [
  "all",
  "branding",
  "contenido",
  "social",
  "estrategia",
];

export const products: Product[] = [
  {
    id: "brujula-estrategica",
    price: 12792,
    category: "estrategia",
    tone: "terracotta",
    index: "01",
    content: {
      es: {
        name: "Brújula Estratégica",
        features: [
          "Evaluación de estrategia de marketing digital actual.",
          "Análisis de táctica de marketing.",
          "Identificación de oportunidades de integración entre canales digitales y tradicionales.",
          "Informe detallado con diagnóstico, análisis competitivo y recomendaciones estratégicas.",
        ],
      },
      en: {
        name: "Strategic Compass",
        features: [
          "Evaluation of current digital marketing strategy.",
          "Marketing tactics analysis.",
          "Identification of integration opportunities between digital and traditional channels.",
          "Detailed report with diagnosis, competitive analysis and strategic recommendations.",
        ],
      },
    },
  },
  {
    id: "aliados-de-marca",
    price: 13562,
    category: "social",
    tone: "ochre",
    popular: true,
    index: "02",
    content: {
      es: {
        name: "Aliados de Marca",
        features: [
          "Scouting y selección de 1-2 micro influencers",
          "Negociación básica y creación de 1 publicación + 1 historia cada uno",
          "Monitoreo de métricas básicas (alcance, engagement) + reporte básico",
        ],
      },
      en: {
        name: "Brand Allies",
        features: [
          "Scouting and selection of 1-2 micro-influencers",
          "Basic negotiation and creation of 1 post + 1 story each",
          "Basic metrics monitoring (reach, engagement) + basic report",
        ],
      },
    },
  },
  {
    id: "contenido-que-impacta",
    price: 10254,
    category: "contenido",
    tone: "clay",
    index: "03",
    content: {
      es: {
        name: "Contenido que Impacta",
        features: [
          "Segmentación avanzada.",
          "Análisis y segmentación de la base de contactos según: Comportamiento de compra, Interacción con correos anteriores, Datos demográficos y ubicación.",
          "Implementación de etiqueta y flujo personalizados según intereses.",
          "Inserción automática de nombre, preferencias y recomendaciones.",
          "Contenido dinámico según historial del cliente.",
          "Recomendaciones de productos o servicios según comportamiento.",
        ],
      },
      en: {
        name: "Impactful Content",
        features: [
          "Advanced segmentation.",
          "Contact base analysis and segmentation based on: Purchase behavior, Interaction with previous emails, Demographics and location.",
          "Implementation of personalized tags and workflows by interest.",
          "Automatic insertion of name, preferences and recommendations.",
          "Dynamic content based on customer history.",
          "Product or service recommendations based on behavior.",
        ],
      },
    },
  },
  {
    id: "esencia-de-marca",
    price: 23458,
    category: "estrategia",
    tone: "terracotta",
    index: "04",
    content: {
      es: {
        name: "Esencia de Marca",
        features: [
          "Análisis de elementos visuales y percepción del público.",
          "Creación de 2 planes para fortalecer la identidad y coherencia de la marca.",
          "Revisión de métricas clave para evaluar la efectividad de las estrategias implementadas.",
          "Propuesta para optimizar la presencia y rendimiento de la marca.",
          "Aplicación de cambios necesarios para mejorar la percepción y posicionamiento de la marca.",
        ],
      },
      en: {
        name: "Brand Essence",
        features: [
          "Analysis of visual elements and audience perception.",
          "Creation of 2 plans to strengthen brand identity and consistency.",
          "Review of key metrics to evaluate the effectiveness of implemented strategies.",
          "Proposal to optimize brand presence and performance.",
          "Application of necessary changes to improve brand perception and positioning.",
        ],
      },
    },
  },
  {
    id: "huella-de-marca",
    price: 9450,
    category: "branding",
    tone: "ink",
    index: "05",
    content: {
      es: {
        name: "Huella de Marca",
        features: [
          "Diseño básico de logotipo",
          "Manual simple con logo, paleta de color, tipografía y reglas de uso básico.",
          "Tarjeta de presentación corporativa",
          "Hoja membretada",
        ],
      },
      en: {
        name: "Brand Footprint",
        features: [
          "Basic logo design",
          "Simple guidelines with logo, color palette, typography and basic usage rules.",
          "Corporate business card design",
          "Letterhead design",
        ],
      },
    },
  },
  {
    id: "impacto-digital",
    price: 5642,
    category: "social",
    tone: "ochre",
    index: "06",
    content: {
      es: {
        name: "Impacto Digital",
        features: [
          "Campaña de publicidad para redes sociales básica. (Definición del objetivo de la campaña, Identificación del público meta, Selección de plataforma, Creación de una estructura sencilla de campaña con 2 anuncios)",
        ],
      },
      en: {
        name: "Digital Impact",
        features: [
          "Basic social media advertising campaign. (Campaign objective definition, Target audience identification, Platform selection, Creation of a simple campaign structure with 2 ads)",
        ],
      },
    },
  },
  {
    id: "lupa-digital",
    price: 6985,
    category: "estrategia",
    tone: "sage",
    index: "07",
    content: {
      es: {
        name: "Lupa Digital",
        features: [
          "Evaluación de la identidad visual y coherencia de la marca.",
          "Análisis de la presencia en redes sociales y plataformas digitales.",
          "Informe detallado con hallazgos y recomendaciones estratégicas.",
        ],
      },
      en: {
        name: "Digital Magnifier",
        features: [
          "Evaluation of visual identity and brand consistency.",
          "Analysis of presence on social networks and digital platforms.",
          "Detailed report with findings and strategic recommendations.",
        ],
      },
    },
  },
  {
    id: "mensajes-que-venden",
    price: 7639,
    category: "contenido",
    tone: "terracotta",
    index: "08",
    content: {
      es: {
        name: "Mensajes que Venden",
        features: [
          "Creación de 2 boletines (promocionales, informativos o de actualización).",
          "Diseño profesional adaptado a la identidad visual de tu marca.",
          "Plantilla responsive (se ven bien en móvil, tablet y escritorio).",
          "Optimización de asunto, imágenes y llamados a la acción (CTAs).",
        ],
      },
      en: {
        name: "Messages that Sell",
        features: [
          "Creation of 2 newsletters (promotional, informative, or update).",
          "Professional design tailored to your brand's visual identity.",
          "Responsive template (looks great on mobile, tablet, and desktop).",
          "Optimization of subject line, images, and calls to action (CTAs).",
        ],
      },
    },
  },
  {
    id: "movimiento-creativo",
    price: 4863,
    category: "contenido",
    tone: "clay",
    index: "09",
    content: {
      es: {
        name: "Movimiento Creativo",
        features: [
          "GIF animado para redes sociales",
          "Banner animado simple para web o redes",
        ],
      },
      en: {
        name: "Creative Motion",
        features: [
          "Animated GIF for social media",
          "Simple animated banner for web or social media",
        ],
      },
    },
  },
  {
    id: "narrativa-conectiva",
    price: 18467,
    category: "estrategia",
    tone: "terracotta",
    index: "10",
    content: {
      es: {
        name: "Narrativa Conectiva",
        features: [
          "Evaluación de la coherencia y efectividad de los mensajes de la marca.",
          "Creación de narrativa que conecte emocionalmente con la audiencia.",
          "Aplicación de la narrativa en redes sociales, presentaciones y comunicaciones internas.",
          "Medición de la efectividad de las historias contadas y ajustes necesarios.",
        ],
      },
      en: {
        name: "Connective Narrative",
        features: [
          "Evaluation of brand messaging consistency and effectiveness.",
          "Creation of a narrative that emotionally connects with the audience.",
          "Application of the narrative across social media, presentations, and internal communications.",
          "Measurement of storytelling effectiveness and necessary adjustments.",
        ],
      },
    },
  },
  {
    id: "pluma-y-pixel",
    price: 1652,
    category: "contenido",
    tone: "clay",
    index: "11",
    content: {
      es: {
        name: "Pluma y Pixel",
        features: [
          "Creación de hasta 3 imágenes o banners adaptados a la identidad visual de la marca.",
        ],
      },
      en: {
        name: "Pen & Pixel",
        features: [
          "Creation of up to 3 images or banners adapted to the brand's visual identity.",
        ],
      },
    },
  },
  {
    id: "redes-vibrantes",
    price: 4723,
    category: "social",
    tone: "sage",
    index: "12",
    content: {
      es: {
        name: "Redes Vibrantes",
        features: [
          "Elaboración de 5 textos persuasivos para publicaciones en redes sociales, blogs o newsletters.",
          "Planificación y agendamiento de contenido en 2 plataformas como Facebook, Instagram o LinkedIn.",
        ],
      },
      en: {
        name: "Vibrant Networks",
        features: [
          "Creation of 5 persuasive texts for social media posts, blogs, or newsletters.",
          "Content planning and scheduling across 2 platforms such as Facebook, Instagram, or LinkedIn.",
        ],
      },
    },
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelated(id: string, count = 3): Product[] {
  const current = getProduct(id);
  if (!current) return products.slice(0, count);
  const sameCat = products.filter(
    (p) => p.id !== id && p.category === current.category,
  );
  const others = products.filter(
    (p) => p.id !== id && p.category !== current.category,
  );
  return [...sameCat, ...others].slice(0, count);
}

export function formatMXN(n: number): string {
  return `$${n.toLocaleString("en-US")} MXN`;
}

export const IVA_RATE = 0.16;

export const toneStyles: Record<
  Tone,
  { bg: string; text: string; chip: string; border: string }
> = {
  terracotta: {
    bg: "bg-terracotta",
    text: "text-cream",
    chip: "bg-cream/15 text-cream",
    border: "border-terracotta",
  },
  ochre: {
    bg: "bg-ochre",
    text: "text-ink",
    chip: "bg-ink/10 text-ink",
    border: "border-ochre",
  },
  clay: {
    bg: "bg-clay",
    text: "text-cream",
    chip: "bg-cream/15 text-cream",
    border: "border-clay",
  },
  sage: {
    bg: "bg-sage",
    text: "text-cream",
    chip: "bg-cream/15 text-cream",
    border: "border-sage",
  },
  ink: {
    bg: "bg-ink",
    text: "text-cream",
    chip: "bg-cream/10 text-cream",
    border: "border-ink",
  },
};