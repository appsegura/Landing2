import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { getLandingPage } from "@/lib/contentful";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const landingPage = await getLandingPage();

  if (!landingPage) {
    return {
      title: "Scof.ai - Soluciones de Automatización con IA",
      description:
        "Automatizamos tareas repetitivas y optimizamos tu flujo de trabajo con Inteligencia Artificial",
    };
  }

  const headerSection = landingPage.sections.find(
    (section) => section.sys.contentType.sys.id === "headerSection"
  );

  const logoUrl = headerSection?.fields?.logo?.fields?.file?.url
    ? `https:${headerSection.fields.logo.fields.file.url}`
    : "";

  return {
    title: landingPage.title || "Scof.ai - Soluciones de Automatización con IA",
    description:
      landingPage.description ||
      "Automatizamos tareas repetitivas y optimizamos tu flujo de trabajo con Inteligencia Artificial",
    metadataBase: new URL("https://scof.ai"),
    icons: {
      icon: logoUrl,
      shortcut: logoUrl,
      apple: logoUrl,
    },
    openGraph: {
      title: landingPage.title,
      description: landingPage.description,
      type: "website",
      locale: "es",
      images: [
        {
          url: logoUrl,
          width: 60,
          height: 40,
          alt: headerSection?.fields?.logo?.fields?.title || "Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: landingPage.title,
      description: landingPage.description,
      images: [logoUrl],
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
