import PhotoFrame from "./PhotoFrame";
import Reveal from "./Reveal";
import type { PortfolioData, Photo } from "@/lib/types";

export default function AboutSection({ data }: { data: PortfolioData }) {
  const profilePhoto: Photo = {
    id: "profile",
    category: "editorial",
    src: data.photographer.avatar || "/fotos/editorial/foto_perfil.jpeg",
    caption: data.photographer.name,
    featured: true,
    selected: true,
    order: 0,
  };

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto" id="sobre">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <Reveal className="md:col-span-5 flex justify-center" aria-label="Foto da fotógrafa">
          <PhotoFrame photo={profilePhoto} index={1} heart />
        </Reveal>
        <Reveal className="md:col-span-7 bg-brand-paper p-8 md:p-10 rounded-card shadow-card border border-brand-line-soft/60 relative flex flex-col gap-2">
          <p className="font-hand text-2xl text-brand-accent-strong">sobre mim</p>
          <h2 className="font-display text-4xl sm:text-5xl text-brand-ink">{data.photographer.name}</h2>
          <p className="font-sans text-xs uppercase tracking-widest font-semibold text-brand-gold">{data.photographer.role}</p>
          <p className="font-sans text-base leading-relaxed text-brand-ink-soft mt-3 whitespace-pre-line">{data.photographer.bio}</p>
        </Reveal>
      </div>
    </section>
  );
}
