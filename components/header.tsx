"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { HeaderContent, DynamicPage } from "@/types/contentful";

interface HeaderProps {
  content: HeaderContent;
  navigationPages: DynamicPage[];
}

export function Header({ content, navigationPages }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logo, ctaText, ctaUrl, widthLogo } = content;

  const headerPages = navigationPages.filter(
    (page) => page.location === "header" && page.isVisible && page.slug
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b pb-3 pt-4">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {logo?.fields?.file?.url && (
            <img
              src={`https:${logo.fields.file.url}`}
              alt={logo.fields.title}
              width={
                typeof widthLogo === "number" && widthLogo > 0 ? widthLogo : 100
              }
            />
          )}
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {headerPages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="text-foreground/80 hover:text-foreground"
            >
              {page.label}
            </Link>
          ))}
          {ctaUrl && (
            <Button asChild>
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
                {ctaText}
              </a>
            </Button>
          )}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 w-full bg-background border-b">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {headerPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {page.label}
              </Link>
            ))}
            {ctaUrl && (
              <Button asChild className="w-full">
                <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
                  {ctaText}
                </a>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
