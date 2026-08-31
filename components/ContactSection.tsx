import { HeartFilledIcon, MailIcon, PhoneIcon, WhatsappIcon, InstagramIcon } from "./icons";
import Reveal from "./Reveal";
import type { PortfolioData } from "@/lib/types";

export default function ContactSection({ data }: { data: PortfolioData }) {
  const p = data.photographer;
  const phoneDigits = (p.phone || "").replace(/\D/g, "");
  const instagramHandle = (p.instagram || "").replace("@", "");

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto text-center flex flex-col items-center" id="contato">
      <div className="w-full flex flex-col items-center">
        <Reveal
          as="svg"
          className="w-7 h-7 text-brand-accent-strong mb-2 opacity-80 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          aria-hidden="true"
        >
          <path d="M12 20.2C8.5 17.6 3 13.6 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.6-5.5 8.6-9 11.2Z" />
        </Reveal>
        <Reveal as="h2" className="font-display text-5xl md:text-6xl text-brand-ink mb-2">
          Vamos conversar?
        </Reveal>
        <p className="font-hand text-xl md:text-2xl text-brand-ink-soft mb-8 max-w-md">
          Conta pra mim a ideia do seu ensaio — respondo com carinho.
        </p>

        <Reveal as="div" className="w-full bg-brand-paper p-6 sm:p-8 rounded-card shadow-card border border-brand-line-soft/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-full bg-brand-bg-inset flex items-center justify-center text-brand-accent-deep shrink-0">
              <MailIcon className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-brand-ink-faint">E-mail</p>
              <a href={"mailto:" + p.email} className="text-sm font-medium text-brand-ink hover:text-brand-accent truncate block transition-colors">
                {p.email}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3.5 sm:border-l sm:border-brand-line-soft sm:pl-6">
            <span className="w-10 h-10 rounded-full bg-brand-bg-inset flex items-center justify-center text-brand-accent-deep shrink-0">
              <PhoneIcon className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-brand-ink-faint">Telefone</p>
              <a href={"tel:" + phoneDigits} className="text-sm font-medium text-brand-ink hover:text-brand-accent truncate block transition-colors">
                {p.phone}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3.5 sm:border-l sm:border-brand-line-soft sm:pl-6">
            <span className="w-10 h-10 rounded-full bg-brand-bg-inset flex items-center justify-center text-brand-accent-deep shrink-0" aria-hidden="true">
              <HeartFilledIcon className="w-5 h-5 text-brand-accent" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-brand-ink-faint">Nome</p>
              <span className="text-sm font-medium text-brand-ink truncate block">{p.name}</span>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-bg-raised hover:bg-brand-bg-inset border border-brand-line text-brand-ink font-medium text-sm rounded-full shadow-sm hover:shadow transition transform hover:-translate-y-0.5"
            href={"https://wa.me/" + p.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon className="w-4 h-4 text-emerald-600" />
            WhatsApp
          </a>
          <a
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-bg-raised hover:bg-brand-bg-inset border border-brand-line text-brand-ink font-medium text-sm rounded-full shadow-sm hover:shadow transition transform hover:-translate-y-0.5"
            href={"https://instagram.com/" + instagramHandle}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="w-4 h-4 text-pink-600" />
            <span>{p.instagram}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
