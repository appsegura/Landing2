export interface LandingPage {
  internalName: string;
  slug: string;
  title: string;
  description: string;
  sections: Array<
    | HeroContent
    | PartnersSection
    | ProcessSection
    | PricingSection
    | TeamSection
    | FaqSection
    | CtaSection
  >;
  isVisible: boolean;
}

export interface DynamicPage {
  title: string;
  slug: string;
  content: any; // Rich Text content from Contentful
  featuredImage?: {
    url: string;
    title: string;
  };
  isVisible: boolean;
  label: string;
  location: "header" | "footer" | null;
}

export interface HeaderContent {
  logo: {
    url: string;
    title: string;
    width: number;
    height: number;
  };
  ctaText: string;
  ctaUrl: string;
}

export interface HeroContent {
  title: string;
  highlightedText: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  isVisible: boolean;
}

export interface Logo {
  fields: {
    file: {
      url: string;
    };
    title: string;
  };
}

export interface PartnersSection {
  title: string;
  subtitle?: string;
  logos: Logo[];
  isVisible: boolean;
  displayMode: "grid" | "scroll";
  scrollSpeed?: number;
  height?: number;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
  ctaText: string;
  ctaUrl: string;
}

export interface ProcessSection {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  isVisible: boolean;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  highlighted: boolean;
  promotionalText?: string;
  ctaText: string;
  ctaUrl: string;
}

export interface PricingSection {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  isVisible: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: {
    url: string;
    title: string;
  };
  socialLinks?: SocialLink[];
}

export interface TeamSection {
  title: string;
  subtitle: string;
  members: TeamMember[];
  isVisible: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  subtitle: string;
  faqs: FAQ[];
  isVisible: boolean;
}

export interface CtaSection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  isVisible: boolean;
}

export interface SocialLink {
  redSocial:
    | "Facebook"
    | "Twitter"
    | "Instagram"
    | "LinkedIn"
    | "YouTube"
    | "WhatsApp"
    | "Pinterest"
    | "Snapchat"
    | "TikTok"
    | "Reddit";
  url: string;
}

export interface FooterSection {
  logo: {
    url: string;
    title: string;
  };
  socialLinks: SocialLink[];
  email: string;
  phone: string;

  copyright: string;
  isVisible: boolean;
}

export interface LegalPage {
  title: string;
  slug: string;
  content: any; // Rich Text content from Contentful
  isVisible: boolean;
  label: string;
  location: "legal";
}

export interface UseCase {
  name: string;
  description: any; // Rich Text content
  image?: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
      title: string;
    };
  };
  icon?: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
  accentColor?: string;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface UseCasesSection {
  title: string;
  subtitle?: string;
  cases: {
    fields: UseCase;
    sys: {
      id: string;
    };
  }[];
  isVisible: boolean;
}

export interface ProductDemoSection {
  title: string;
  subtitle?: string;
  descriptionTitle?: string;
  description?: string;
  videoUrl: string;
  videoPosition: "right" | "left" | "bottom" | "top";
  aspectRatio: "16:9" | "4:3" | "1:1" | "9:16";
  videoHeight: number;
  ctaText?: string;
  ctaUrl?: string;
  isVisible: boolean;
}
