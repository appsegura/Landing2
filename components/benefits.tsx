"use client";

import { motion } from "framer-motion";
import { BenefitsSection } from "@/types/contentful";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

interface BenefitsProps {
  content: BenefitsSection;
}

export function Benefits({ content }: BenefitsProps) {
  const {
    title,
    subtitle,
    benefits,
    screenshot,
    screenshotDescription,
    ctaText,
    ctaUrl,
    isVisible,
    layout = "grid",
  } = content;

  if (!isVisible) return null;

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`max-w-7xl mx-auto ${
            layout === "split"
              ? "md:grid md:grid-cols-2 gap-12 items-center"
              : ""
          }`}
        >
          {/* Benefits Grid/List */}
          <motion.div
            className={`grid gap-8 ${
              layout === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } mb-12 md:mb-0`}
            variants={containerAnimation}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {benefits?.map((benefit, index) => {
              const Icon = benefit.fields.icon?.fields?.file?.url && (
                <img
                  src={`https:${benefit.fields.icon.fields.file.url}`}
                  alt={benefit.fields.icon.fields.title || ""}
                  className="w-12 h-12 object-contain mb-4"
                />
              );

              return (
                <motion.div
                  key={index}
                  className={`card-gradient rounded-lg p-6 ${
                    benefit.fields.accentColor ? `border-l-4` : ""
                  }`}
                  style={
                    benefit.fields.accentColor
                      ? {
                          borderColor: benefit.fields.accentColor,
                          background: `linear-gradient(to right, ${benefit.fields.accentColor}0A, transparent)`,
                        }
                      : {}
                  }
                  variants={itemAnimation}
                >
                  {Icon}
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.fields.title}
                  </h3>
                  <p className="text-foreground/80">
                    {benefit.fields.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Screenshot Area */}
          {screenshot && layout === "split" && (
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-2xl"
              >
                <Image
                  src={`https:${screenshot.fields.file.url}`}
                  alt={screenshot.fields.title || "Product screenshot"}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                {screenshotDescription && (
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
                    <p className="text-sm text-foreground/80">
                      {screenshotDescription}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        {ctaText && ctaUrl && (
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href={ctaUrl}>{ctaText}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
