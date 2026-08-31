import { HeartFilledIcon, MailIcon, PhoneIcon, WhatsappIcon, InstagramIcon } from "./icons";
import Reveal from "./Reveal";
import type { PortfolioData } from "@/lib/types";

export default function ContactSection({ data }: { data: PortfolioData }) {
  const p = data.photographer;
  const phoneDigits = (p.phone || "").replace(/\D/g, "");
  const instagramHandle = (p.instagram || "").replace("@", "");

  return (
    <section className="contact" id="contato">
      <div className="contact__inner">
        <Reveal
          as="svg"
          className="contact__divider"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          aria-hidden="true"
        >
          <path d="M12 20.2C8.5 17.6 3 13.6 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.6-5.5 8.6-9 11.2Z" />
        </Reveal>
        <Reveal as="h2" className="contact__title">
          Vamos conversar?
        </Reveal>
        <p className="contact__lede">Conta pra mim a ideia do seu ensaio — respondo com carinho.</p>

        <Reveal as="div" className="contact__card">
          <div className="contact__row">
            <span className="contact__row-icon">
              <MailIcon />
            </span>
            <div>
              <p className="contact__row-label">E-mail</p>
              <a href={"mailto:" + p.email}>{p.email}</a>
            </div>
          </div>
          <div className="contact__row">
            <span className="contact__row-icon">
              <PhoneIcon />
            </span>
            <div>
              <p className="contact__row-label">Telefone</p>
              <a href={"tel:" + phoneDigits}>{p.phone}</a>
            </div>
          </div>
          <div className="contact__row">
            <span className="contact__row-icon" aria-hidden="true">
              <HeartFilledIcon />
            </span>
            <div>
              <p className="contact__row-label">Nome</p>
              <span>{p.name}</span>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" className="contact__tags">
          <a className="tag-link" href={"https://wa.me/" + p.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsappIcon />
            WhatsApp
          </a>
          <a
            className="tag-link"
            href={"https://instagram.com/" + instagramHandle}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            <span>{p.instagram}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
