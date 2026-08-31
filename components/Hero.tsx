import { HeartFilledIcon, SparkleIcon } from "./icons";
import PhotoFrame from "./PhotoFrame";
import { featuredFor } from "@/lib/portfolioHelpers";
import type { PortfolioData } from "@/lib/types";

export default function Hero({ data }: { data: PortfolioData }) {
  const firstCategory = data.categories[0];
  const photo = firstCategory ? featuredFor(data, firstCategory.id) : null;

  return (
    <section className="hero" id="topo">
      <span className="hero__page">/01</span>

      <svg className="hero__ribbon" viewBox="0 0 400 220" fill="none" aria-hidden="true">
        <path d="M20 40 C120 10, 220 90, 380 30" stroke="currentColor" strokeWidth="26" strokeLinecap="round" opacity="0.5" />
        <path d="M40 55 L15 30 L45 25 Z" fill="currentColor" opacity="0.5" />
        <path d="M360 45 L392 24 L378 55 Z" fill="currentColor" opacity="0.5" />
      </svg>
      <SparkleIcon className="hero__sparkle hero__sparkle--1" />
      <SparkleIcon className="hero__sparkle hero__sparkle--2" />
      <SparkleIcon className="hero__sparkle hero__sparkle--3" />

      <div className="hero__grid">
        <div className="hero__intro">
          <h1 className="hero__name">{data.photographer.name}</h1>
          <p className="hero__tagline">registrando o que fica depois do flash</p>
          <a className="hero__cta" href="#contato">
            <HeartFilledIcon />
            Vamos conversar
          </a>
          <div className="hero__tabs">
            <a href="#casamentos">casamentos</a>
            <a href="#retratos">retratos</a>
            <a href="#editorial">editorial</a>
          </div>
        </div>

        <div className="hero__photo" aria-label="Foto em destaque">
          {photo && (
            <a className="hero-photo__link" href={"#" + photo.category}>
              <PhotoFrame photo={photo} index={0} heart hero />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
