"use client";

import { ProductDemoSection } from "@/types/contentful";
import { Button } from "./ui/button";
import Link from "next/link";

interface ProductDemoProps {
  content: ProductDemoSection;
}

export function ProductDemo({ content }: ProductDemoProps) {
  const {
    title,
    subtitle,
    descriptionTitle,
    description,
    videoUrl,
    videoPosition,
    aspectRatio,
    videoHeight,
    ctaText,
    ctaUrl,
    isVisible,
  } = content;

  if (!isVisible) return null;

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "16:9":
        return "aspect-video";
      case "4:3":
        return "aspect-4/3";
      case "1:1":
        return "aspect-square";
      case "9:16":
        return "aspect-[9/16]";
      default:
        return "aspect-video";
    }
  };

  const embedVideo = () => {
    const videoId = videoUrl.includes("youtube.com/shorts")
      ? videoUrl.split("shorts/")[1]
      : videoUrl.includes("youtube.com/watch?v=")
        ? videoUrl.split("v=")[1]
        : videoUrl.includes("vimeo")
          ? videoUrl.split("/").pop()
          : null;

    const embedUrl = videoId
      ? videoUrl.includes("youtube")
        ? `https://www.youtube.com/embed/${videoId}`
        : `https://player.vimeo.com/video/${videoId}`
      : videoUrl;

    return (
      <div
        className={`relative ${getAspectRatioClass()}`}
        style={{ height: videoHeight ? `${videoHeight}px` : "auto" }}
      >
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full rounded-lg shadow-lg "
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  const renderContent = () => {
    const textContent = (
      <div className="flex flex-col justify-center">
        {descriptionTitle && (
          <h3 className="text-2xl font-semibold mb-4">{descriptionTitle}</h3>
        )}
        {description && (
          <p className="text-lg text-foreground/80 mb-8">{description}</p>
        )}
        {ctaText && ctaUrl && (
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href={ctaUrl}>{ctaText}</Link>
            </Button>
          </div>
        )}
      </div>
    );

    const videoContent = (
      <div className="w-full md:w-auto flex justify-center items-center">
        {embedVideo()}
      </div>
    );

    const textContentContainer = (
      <div className="w-1/2 flex justify-center items-center">
        {textContent}
      </div>
    );

    switch (videoPosition) {
      case "left":
        return (
          <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
            {videoContent}
            {textContentContainer}
          </div>
        );
      case "right":
        return (
          <div className="flex flex-col md:flex-row gap-24 justify-center items-center">
            {textContentContainer}
            {videoContent}
          </div>
        );
      case "bottom":
        return (
          <div className="flex flex-col gap-12">
            <div className="text-center max-w-3xl mx-auto">{textContent}</div>
            <div className="flex justify-center max-w-3xl mx-auto w-full">
              {videoContent}
            </div>
          </div>
        );
      case "top":
        return (
          <div className="flex flex-col gap-12">
            <div className="flex justify-center max-w-3xl mx-auto w-full">
              {videoContent}
            </div>
            <div className="text-center max-w-3xl mx-auto">{textContent}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          {subtitle && <p className="text-lg text-foreground/60">{subtitle}</p>}
        </header>
        {renderContent()}
      </div>
    </section>
  );
}
