import { HeartFilledIcon, SparkleIcon } from "./icons";
import PhotoFrame from "./PhotoFrame";
import { featuredFor } from "@/lib/portfolioHelpers";
import type { PortfolioData } from "@/lib/types";

export default function Hero({ data }: { data: PortfolioData }) {
  const firstCategory = data.categories[0];
  const photo = firstCategory ? featuredFor(data, firstCategory.id) : null;

  return (
    <section className="relative py-12 md:py-20 px-6 max-w-6xl mx-auto overflow-hidden" id="topo">
      <span className="absolute top-4 left-6 font-hand text-lg text-brand-ink-faint select-none">/01</span>

      <svg className="absolute -top-10 -right-10 w-64 h-48 text-brand-bg-alt opacity-40 pointer-events-none" viewBox="0 0 400 220" fill="none" aria-hidden="true">
        <path d="M20 40 C120 10, 220 90, 380 30" stroke="currentColor" strokeWidth="26" strokeLinecap="round" />
        <path d="M40 55 L15 30 L45 25 Z" fill="currentColor" />
        <path d="M360 45 L392 24 L378 55 Z" fill="currentColor" />
      </svg>
      <SparkleIcon className="absolute top-8 right-1/4 w-6 h-6 text-brand-gold opacity-70 animate-pulse pointer-events-none" />
      <SparkleIcon className="absolute bottom-12 left-10 w-5 h-5 text-brand-accent opacity-50 pointer-events-none" />
      <SparkleIcon className="absolute top-1/2 left-1/3 w-4 h-4 text-brand-gold opacity-60 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col items-start gap-4">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-brand-ink leading-tight">
            {data.photographer.name}
          </h1>
          <p className="font-hand text-2xl md:text-3xl text-brand-accent-strong">
            registrando o que fica depois do flash
          </p>
          <a
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent-deep hover:bg-brand-accent-strong text-brand-accent-ink font-semibold text-xs md:text-sm uppercase tracking-wider rounded-full shadow-badge transition transform hover:-translate-y-0.5"
            href="#contato"
          >
            <HeartFilledIcon className="w-4 h-4" />
            Vamos conversar
          </a>
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-brand-line-soft w-full text-sm font-medium text-brand-ink-soft">
            <a href="#casamentos" className="hover:text-brand-accent-strong underline-offset-4 hover:underline transition-colors">
              casamentos
            </a>
            <a href="#retratos" className="hover:text-brand-accent-strong underline-offset-4 hover:underline transition-colors">
              retratos
            </a>
            <a href="#editorial" className="hover:text-brand-accent-strong underline-offset-4 hover:underline transition-colors">
              editorial
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end relative" aria-label="Foto em destaque">
          {photo && (
            <a className="block transition transform hover:scale-[1.02]" href={"#" + photo.category}>
              <PhotoFrame photo={photo} index={0} heart hero />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
