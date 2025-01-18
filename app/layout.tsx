import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { getLandingPage } from "@/lib/contentful";
import { Metadata } from "next";
import Script from "next/script";

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

export default async function RootLayout({ children }: RootLayoutProps) {
  const landingPage = await getLandingPage();
  const gtmId = landingPage?.googleTagManager;
  const valeiaChat = landingPage?.valeiaChat || false;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}
      </head>
      <body className={inter.className}>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {valeiaChat && <Script src="chat-widget.es.js" />}
      </body>
    </html>
  );
}
