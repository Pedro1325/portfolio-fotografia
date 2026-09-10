"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { CameraIcon } from "../icons";
import type { Photographer } from "@/lib/types";

interface PhotographerProfileFormProps {
  photographer: Photographer;
  onChange: (patch: Partial<Photographer>) => void;
  onAvatarUpload: (file: File) => Promise<void>;
}

export default function PhotographerProfileForm({
  photographer,
  onChange,
  onAvatarUpload,
}: PhotographerProfileFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChosen(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onAvatarUpload(file);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <section className="bg-brand-paper p-6 sm:p-8 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl text-brand-ink">Perfil & Textos Principais do Site</h2>
        <p className="text-xs text-brand-ink-soft bg-brand-bg-inset p-3 rounded border border-brand-line-soft/60 mt-2">
          Edite as informações que aparecem no topo do site, na seção &quot;Sobre mim&quot; e nos contatos. Todas as alterações são salvas automaticamente!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Foto de Perfil */}
        <div className="md:col-span-4 flex flex-col items-center gap-3 p-4 bg-brand-bg-raised rounded-card border border-brand-line">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
            Foto de Perfil (Sobre Mim)
          </label>
          <div className="relative w-36 h-36 rounded-[4px] bg-brand-paper border border-brand-line-soft shadow-card overflow-hidden flex items-center justify-center">
            {photographer.avatar ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={photographer.avatar}
                alt={photographer.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <CameraIcon className="w-8 h-8 text-brand-accent opacity-60" />
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                Enviando...
              </div>
            )}
          </div>

          <label className="inline-flex items-center gap-2 px-4 py-2 bg-brand-bg-inset hover:bg-brand-bg-alt/60 text-brand-accent-deep text-xs font-semibold rounded-full border border-brand-line shadow-sm cursor-pointer transition">
            <CameraIcon className="w-4 h-4" />
            <span>{isUploading ? "Enviando..." : "Escolher foto do PC"}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              disabled={isUploading}
              onChange={handleFileChosen}
            />
          </label>
        </div>

        {/* Campos de Texto */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Nome da Fotógrafa (Título do Site)
            </label>
            <input
              type="text"
              value={photographer.name}
              placeholder="Sabrina Trindade"
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full px-3 py-2 bg-brand-bg-raised border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Frase de Destaque / Especialidade (Hero)
            </label>
            <input
              type="text"
              value={photographer.role}
              placeholder="registrando o que fica depois do flash"
              onChange={(e) => onChange({ role: e.target.value })}
              className="w-full px-3 py-2 bg-brand-bg-raised border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Localização (Cidade / Estado)
            </label>
            <input
              type="text"
              value={photographer.location}
              placeholder="São Paulo, SP"
              onChange={(e) => onChange({ location: e.target.value })}
              className="w-full px-3 py-2 bg-brand-bg-raised border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              E-mail de Contato
            </label>
            <input
              type="email"
              value={photographer.email}
              placeholder="contato@seusite.com"
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full px-3 py-2 bg-brand-bg-raised border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Telefone / WhatsApp (exibição)
            </label>
            <input
              type="text"
              value={photographer.phone}
              placeholder="+55 (11) 99999-9999"
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full px-3 py-2 bg-brand-bg-raised border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Número WhatsApp (com DDD, somente dígitos)
            </label>
            <input
              type="text"
              value={photographer.whatsapp}
              placeholder="5511999999999"
              onChange={(e) => onChange({ whatsapp: e.target.value })}
              className="w-full px-3 py-2 bg-brand-bg-raised border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Instagram (com @)
            </label>
            <input
              type="text"
              value={photographer.instagram}
              placeholder="@seuinstagram"
              onChange={(e) => onChange({ instagram: e.target.value })}
              className="w-full px-3 py-2 bg-brand-bg-raised border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Biografia / Texto &quot;Sobre mim&quot;
            </label>
            <textarea
              rows={4}
              value={photographer.bio}
              placeholder="Conte um pouco sobre a sua trajetória, sua visão da fotografia e o carinho em cada ensaio..."
              onChange={(e) => onChange({ bio: e.target.value })}
              className="w-full px-3 py-2 bg-brand-bg-raised border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep resize-y leading-relaxed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
