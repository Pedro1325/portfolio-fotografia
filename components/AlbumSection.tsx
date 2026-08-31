import Link from "next/link";
import PhotoFrame from "./PhotoFrame";
import Reveal from "./Reveal";
import { selectedInCategory } from "@/lib/portfolioHelpers";
import type { PortfolioData, Category } from "@/lib/types";

interface AlbumSectionProps {
  data: PortfolioData;
  category: Category;
  tint?: boolean;
}

export default function AlbumSection({ data, category, tint = false }: AlbumSectionProps) {
  const photos = selectedInCategory(data, category.id);

  return (
    <section className={`py-16 md:py-24 px-6 transition-colors border-t border-brand-line-soft/60 ${tint ? "bg-brand-bg-inset/50" : "bg-brand-bg"}`} id={category.id}>
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <Reveal className="flex flex-col items-center text-center gap-1.5 max-w-xl mx-auto">
          <span className="font-hand text-base text-brand-ink-faint select-none">{category.page}</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-ink">{category.label}</h2>
          {category.status && (
            <span className="inline-block font-sans text-xs uppercase tracking-wider font-semibold text-brand-accent-strong bg-brand-bg-raised px-3.5 py-1 rounded-full border border-brand-line-soft mt-1 shadow-sm">
              {category.status}
            </span>
          )}
          {category.note && <p className="font-hand text-xl md:text-2xl text-brand-ink-soft mt-2">{category.note}</p>}
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-start justify-items-center">
          {photos.length === 0 ? (
            <p className="col-span-full text-center font-hand text-xl text-brand-ink-soft py-12">
              Nenhuma foto escolhida pra este álbum ainda. Use a{" "}
              <Link href="/admin" className="text-brand-accent-deep underline hover:text-brand-accent transition-colors">
                área da fotógrafa
              </Link>{" "}
              pra selecionar quais fotos aparecem aqui.
            </p>
          ) : (
            photos.map((photo, i) => (
              <PhotoFrame key={photo.id} photo={photo} index={i} heart={i === 0} rotate={i !== 0} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
