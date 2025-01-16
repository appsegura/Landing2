import { ProcessSection } from "@/types/contentful";
import dynamic from "next/dynamic";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ProcessProps {
  content: ProcessSection;
}

export function Process({ content }: ProcessProps) {
  const { title, subtitle, steps, isVisible } = content;

  if (!isVisible) return null;

  const numColumns =
    steps.length % 3 === 0 ? 3 : steps.length % 2 === 0 ? 2 : 3; // Determina el número base de columnas

  const rows = Array.from({ length: Math.ceil(steps.length / numColumns) }).map(
    (_, rowIndex) =>
      steps.slice(rowIndex * numColumns, (rowIndex + 1) * numColumns)
  );

  return (
    <section id="proceso" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid gap-8 ${
                row.length < numColumns
                  ? `md:grid-cols-${numColumns} justify-center items-center`
                  : `md:grid-cols-${numColumns}`
              }`}
            >
              {row.map((step) => {
                const Icon = step?.fields?.icon
                  ? (dynamic(() =>
                      import("lucide-react").then(
                        (mod) => mod[step?.fields?.icon as keyof typeof mod]
                      )
                    ) as LucideIcon)
                  : null;

                return (
                  <div
                    key={step?.sys?.id}
                    className="relative flex flex-col justify-between items-start card-gradient rounded-lg p-6 h-full"
                  >
                    {Icon && <Icon className="h-12 w-12 mb-4 text-primary" />}
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">
                        {step.fields.title}
                      </h3>
                      <p className="text-foreground/80">
                        {step.fields.description}
                      </p>
                    </div>
                    {/* Render CTA if both ctaText and ctaUrl exist */}
                    {step.fields.ctaText && step.fields.ctaUrl && (
                      <div className="mt-4 self-end">
                        <Link
                          href={step.fields.ctaUrl}
                          className="text-primary text-lg font-medium inline-flex items-center hover:underline"
                        >
                          {step.fields.ctaText} <span className="ml-1">→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
