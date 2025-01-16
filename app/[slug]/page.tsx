import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getDynamicPage,
  getLegalPage,
  getLandingPage,
  getNavigationPages,
  getLegalPages,
} from "@/lib/contentful";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Esta función es requerida para generar las rutas estáticas
export async function generateStaticParams() {
  const [navigationPages, legalPages] = await Promise.all([
    getNavigationPages(),
    getLegalPages(),
  ]);

  // Combinar todas las páginas para generar las rutas
  const allPages = [...navigationPages, ...legalPages];

  return allPages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [landingPage, navigationPages, legalPages] = await Promise.all([
    getLandingPage(),
    getNavigationPages(),
    getLegalPages(),
  ]);

  if (!landingPage) {
    notFound();
  }

  // Obtener header y footer de las secciones de la landing page
  const headerSection = landingPage.sections.find(
    (section) => section.sys.contentType.sys.id === "headerSection"
  );
  const footerSection = landingPage.sections.find(
    (section) => section.sys.contentType.sys.id === "footerSection"
  );

  // Intentar obtener la página como dinámica o legal
  const page =
    (await getDynamicPage(params.slug)) || (await getLegalPage(params.slug));

  if (!page || !page.isVisible) {
    notFound();
  }

  return (
    <>
      {headerSection && (
        <Header
          content={headerSection.fields}
          navigationPages={navigationPages}
        />
      )}
      <main className="py-24">
        <div className="container mx-auto px-4">
          <article className="prose prose-invert mx-auto">
            {page.featuredImage && (
              <div className="mb-8">
                <Image
                  src={page.featuredImage.url}
                  alt={page.featuredImage.title}
                  width={1200}
                  height={600}
                  className="rounded-lg"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: page.content,
              }}
            />
          </article>
        </div>
      </main>
      {footerSection && (
        <Footer
          content={footerSection.fields}
          navigationPages={navigationPages}
          legalPages={legalPages}
        />
      )}
    </>
  );
}
