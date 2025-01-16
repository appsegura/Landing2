import { Button } from "./ui/button";
import { HeroContent } from "@/types/contentful";
import Link from "next/link";

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  const {
    title,
    highlightedText,
    description,
    ctaText,
    ctaUrl,
    isVisible,
    image,
    imagePosition = "right", // Posición por defecto: derecha
    imageWidth,
  } = content;

  if (!isVisible) return null;

  // Definir el ancho de la imagen con valor por defecto si no se proporciona
  const computedImageWidth =
    typeof imageWidth === "number" && imageWidth > 0 ? imageWidth : 400;

  // Determinar clases CSS basadas en la posición de la imagen
  const imagePositionClasses = {
    right: "flex-row-reverse",
    left: "flex-row",
    top: "flex-col",
    bottom: "flex-col-reverse",
  };

  const layoutClasses = image
    ? imagePositionClasses[imagePosition] || "flex-row"
    : "";

  return (
    <section
      className={`relative ${
        image && imagePosition === "background"
          ? "pt-40 pb-24 overflow-hidden"
          : "py-20"
      }`}
      style={
        image?.fields?.file?.url && imagePosition === "background"
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https:${image.fields.file.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {/* Degradado sobre la imagen de fondo */}
      {imagePosition === "background" && (
        <div className="absolute inset-0 gradient-bg" />
      )}

      <div className="container mx-auto px-4 relative">
        {image?.fields?.file?.url && imagePosition !== "background" ? (
          // Diseño con imagen y contenido adaptados según la posición
          <div
            className={`w-full md:w-auto flex ${layoutClasses} items-center`}
          >
            {imagePosition === "top" || imagePosition === "bottom" ? (
              <>
                <img
                  src={`https:${image.fields.file.url}`}
                  alt={image.fields.title || "Hero Image"}
                  className="mx-auto mt-10 mb-6 rounded-lg"
                  style={{ width: computedImageWidth }}
                />
                <div className="text-center w-full">
                  <h1 className="text-4xl md:text-6xl font-bold mt-20 mb-10">
                    {title}{" "}
                    <span className="text-gradient">{highlightedText}</span>
                  </h1>
                  <p className="text-lg md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto">
                    {description}
                  </p>
                  {ctaUrl && ctaText && (
                    <Button asChild size="lg">
                      <Link href={ctaUrl}>{ctaText}</Link>
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <>
                <img
                  src={`https:${image.fields.file.url}`}
                  alt={image.fields.title || "Hero Image"}
                  className="mx-auto rounded-lg"
                  style={{ width: computedImageWidth }}
                />
                <div className="text-center w-full md:w-1/2">
                  <h1 className="text-4xl md:text-6xl font-bold mt-20 mb-6">
                    {title}{" "}
                    <span className="text-gradient">{highlightedText}</span>
                  </h1>
                  <p className="text-lg md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto">
                    {description}
                  </p>
                  {ctaUrl && ctaText && (
                    <Button asChild size="lg">
                      <Link href={ctaUrl}>{ctaText}</Link>
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          // Diseño original cuando no hay imagen o la imagen es de fondo
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mt-20 mb-10">
              {title} <span className="text-gradient">{highlightedText}</span>
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto">
              {description}
            </p>
            {ctaUrl && ctaText && (
              <Button asChild size="lg">
                <Link href={ctaUrl}>{ctaText}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
