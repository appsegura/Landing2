import Image from "next/image";
import { TeamSection } from "@/types/contentful";
import dynamic from "next/dynamic";
import { LucideIcon } from "lucide-react";

interface TeamProps {
  content: TeamSection;
}

export function Team({ content }: TeamProps) {
  const { title, subtitle, members, isVisible } = content;

  if (!isVisible) return null;
  return (
    <section id="equipo" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {members?.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {members.map((member, index) => {
              const { name, role, bio, socialLinks, image } =
                member?.fields || {};

              return (
                <div
                  key={index}
                  className="card-gradient rounded-lg p-6 text-center"
                >
                  {image?.fields?.file?.url && (
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <Image
                        src={`https:${image.fields.file.url}`}
                        alt={image.fields.title || "Team Member"}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}

                  {name && (
                    <h3 className="text-xl font-semibold mb-2">{name}</h3>
                  )}
                  {role && <p className="text-primary mb-3">{role}</p>}
                  {bio && <p className="text-foreground/80 mb-4">{bio}</p>}

                  {socialLinks?.length > 0 && (
                    <div className="flex justify-center space-x-4">
                      {socialLinks.map((link, i) => {
                        if (!link?.fields?.url || !link?.fields?.redSocial) {
                          return null;
                        }

                        const Icon = dynamic(() =>
                          import("lucide-react").then(
                            (mod) =>
                              mod[link.fields.redSocial as keyof typeof mod]
                          )
                        ) as LucideIcon;

                        return (
                          <a
                            key={i}
                            href={link.fields.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/60 hover:text-primary transition-colors"
                            title={link.fields.redSocial}
                          >
                            {Icon && <Icon className="h-5 w-5" />}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
