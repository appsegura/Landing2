import { Hero } from "@/components/hero";
import { Partners } from "@/components/Partners";
import { Process } from "@/components/Features";
import { Pricing } from "@/components/pricing";
import { Team } from "@/components/team";
import { UseCases } from "@/components/use-cases";
import { Cta } from "@/components/cta";
import { ProductDemo } from "@/components/product-demo";
import { Benefits } from "@/components/benefits";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Faq } from "@/components/faq";
import {
  getNavigationPages,
  getLegalPages,
  getLandingPage,
} from "@/lib/contentful";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const landingPage = await getLandingPage();

  return {
    title: landingPage?.title || "",
    description: landingPage?.description || "",
  };
}

export default async function Home() {
  const [navigationPages, legalPages, landingPage] = await Promise.all([
    getNavigationPages(),
    getLegalPages(),
    getLandingPage(),
  ]);

  if (!landingPage) {
    throw new Error("Required content not found");
  }

  // Función para renderizar una sección basada en su tipo de contenido
  const renderSection = (section: any) => {
    // Verificamos que section y sys existan
    if (!section || !section.sys || !section.sys.contentType) {
      return null;
    }

    const contentTypeId = section.sys.contentType.sys.id;
    const sectionContent = section.fields;

    // Renderizamos la sección correspondiente basada en el tipo de contenido
    switch (contentTypeId) {
      case "headerSection":
        return (
          <Header content={sectionContent} navigationPages={navigationPages} />
        );
      case "heroSection":
        return <Hero content={sectionContent} />;
      case "partnersSection":
        return <Partners content={sectionContent} />;
      case "processSection":
        return <Process content={sectionContent} />;
      case "pricingSection":
        return <Pricing content={sectionContent} />;
      case "teamSection":
        return <Team content={sectionContent} />;
      case "faqSection":
        return <Faq content={sectionContent} />;
      case "useCasesSection":
        return <UseCases content={sectionContent} />;
      case "productDemoSection":
        return <ProductDemo content={sectionContent} />;
      case "benefitsSection":
        return <Benefits content={sectionContent} />;
      case "ctaSection":
        return <Cta content={sectionContent} />;
      case "footerSection":
        return (
          <Footer
            content={sectionContent}
            navigationPages={navigationPages}
            legalPages={legalPages}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {landingPage.sections?.map((section, index) => (
        <div key={section.sys.id}>{renderSection(section)}</div>
      ))}
    </>
  );
}
