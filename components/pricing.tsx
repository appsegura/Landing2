import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { PricingSection } from "@/types/contentful";
import Link from "next/link";

interface PricingProps {
  content: PricingSection;
}

export function Pricing({ content }: PricingProps) {
  const { title, subtitle, plans, isVisible } = content;

  if (!isVisible) return null;

  return (
    <section id="precios" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Plans */}
        <div className="flex flex-row justify-center gap-8">
          {plans.map((plan) => (
            <div
              key={plan.fields.name}
              className={`card-gradient rounded-lg p-6 flex flex-col justify-between w-full md:w-1/3 ${
                plan.fields.highlightedText ? "ring-2 ring-primary" : ""
              }`}
            >
              {/* Promotional Text for Highlighted Plan */}
              {plan.fields.highlightedText && (
                <div className="text-center mb-4 -top-4 left-1/2 transform -translate-y-9">
                  <span className="bg-primary text-white text-sm font-bold px-4 py-1 rounded-full">
                    {plan?.fields?.promotionalText}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold mb-2">{plan.fields.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    {plan.fields.price}
                  </span>
                </div>
                <p className="text-foreground/80 mb-6">
                  {plan.fields.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.fields.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pay Button */}
              {plan.fields.payLink && plan.fields.payLinkText && (
                <Button
                  asChild
                  className="w-full mt-auto"
                  variant={plan.fields.highlightedText ? "default" : "outline"}
                >
                  <Link href={plan.fields.payLink}>
                    {plan.fields.payLinkText}
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
