import PhotoFrame from "./PhotoFrame";
import Reveal from "./Reveal";
import { featuredFor } from "@/lib/portfolioHelpers";
import type { PortfolioData } from "@/lib/types";

export default function AboutSection({ data }: { data: PortfolioData }) {
  const category = data.categories[1] || data.categories[0];
  const photo = category ? featuredFor(data, category.id) : null;

  return (
    <section className="about" id="sobre">
      <div className="about__inner">
        <Reveal className="about__photo" aria-label="Foto da fotógrafa">
          {photo && <PhotoFrame photo={photo} index={1} heart />}
        </Reveal>
        <Reveal className="about__card">
          <p className="about__label">sobre mim</p>
          <h2 className="about__name">{data.photographer.name}</h2>
          <p className="about__role">{data.photographer.role}</p>
          <p className="about__bio">{data.photographer.bio}</p>
        </Reveal>
      </div>
    </section>
  );
}
