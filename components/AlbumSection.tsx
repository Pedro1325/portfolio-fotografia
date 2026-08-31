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
    <section className={"album" + (tint ? " album--tint" : "")} id={category.id}>
      <div className="album__inner">
        <Reveal className="album__head">
          <span className="album__page">{category.page}</span>
          <h2 className="album__title">{category.label}</h2>
          <span className="album__status">{category.status}</span>
          <p className="album__note">{category.note}</p>
        </Reveal>

        <div className="photo-grid">
          {photos.length === 0 ? (
            <p className="empty-note">
              Nenhuma foto escolhida pra este álbum ainda. Use a{" "}
              <Link href="/admin">área da fotógrafa</Link> pra selecionar quais fotos aparecem aqui.
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
