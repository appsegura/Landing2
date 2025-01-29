"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BenefitsSection } from "@/types/contentful";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BenefitsProps {
  content: BenefitsSection;
}

export function Benefits({ content }: BenefitsProps) {
  const { title, subtitle, benefits, isVisible, backgroundColor } = content;

  const [activeBenefit, setActiveBenefit] = useState(0);

  if (!isVisible) return null;

  // Función para generar el estilo del fondo basado en el tema y el color personalizado
  const getBackgroundStyle = () => {
    if (!backgroundColor) return {};

    // Convertir el color hex a rgba para usarlo en gradientes
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Crear un gradiente sutil con el color personalizado
    return {
      background: `linear-gradient(135deg, 
        ${hexToRgba(backgroundColor, 0.1)}, 
        ${hexToRgba(backgroundColor, 0.05)}
      )`,
    };
  };

  return (
    <section className="py-24 relative" style={getBackgroundStyle()}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {benefits?.map((benefit, index) => (
              <button
                key={benefit.sys.id}
                onClick={() => setActiveBenefit(index)}
                className={cn(
                  "px-6 py-3 rounded-lg transition-all duration-300",
                  activeBenefit === index
                    ? "bg-primary text-primary-foreground scale-105"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {benefit.fields.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {benefits?.map((benefit, index) => {
              if (index !== activeBenefit) return null;

              const imagePosition = benefit.fields.imagePosition || "right";

              return (
                <motion.div
                  key={benefit.sys.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "grid gap-8 items-center",
                    imagePosition === "right"
                      ? "md:grid-cols-[1fr,auto]"
                      : "md:grid-cols-[auto,1fr]"
                  )}
                >
                  {/* Content Side */}
                  <div
                    className={cn(
                      "card-gradient rounded-lg p-8",
                      benefit.fields.accentColor
                        ? `border-l-4 border-[${benefit.fields.accentColor}]`
                        : ""
                    )}
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      {benefit.fields.title}
                    </h3>
                    <p className="text-foreground/80 mb-6">
                      {benefit.fields.description}
                    </p>

                    {/* CTA Buttons */}
                    {(benefit.fields.ctaText ||
                      benefit.fields.secondaryCtaText) && (
                      <div className="flex flex-wrap gap-4">
                        {benefit.fields.ctaText && benefit.fields.ctaUrl && (
                          <Button asChild>
                            <Link href={benefit.fields.ctaUrl}>
                              {benefit.fields.ctaText}
                            </Link>
                          </Button>
                        )}
                        {benefit.fields.secondaryCtaText &&
                          benefit.fields.secondaryCtaUrl && (
                            <Button variant="outline" asChild>
                              <Link href={benefit.fields.secondaryCtaUrl}>
                                {benefit.fields.secondaryCtaText}
                              </Link>
                            </Button>
                          )}
                      </div>
                    )}
                  </div>

                  {/* Image Side */}
                  {benefit.fields.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative rounded-lg overflow-hidden shadow-xl"
                    >
                      <img
                        src={`https:${benefit.fields.image.fields.file.url}`}
                        alt={
                          benefit.fields.image.fields.title ||
                          benefit.fields.title
                        }
                        className="w-full h-auto max-w-[500px] object-cover rounded-lg"
                        style={
                          benefit.fields.imageWidth
                            ? { width: benefit.fields.imageWidth }
                            : undefined
                        }
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
