"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { Category } from "@/lib/types";
import type { UploadPhotoResult } from "@/lib/actions/portfolio";

interface AddPhotoFormElements extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  caption: HTMLInputElement;
  featured: HTMLInputElement;
  file: HTMLInputElement;
}

interface AddPhotoFormProps {
  categories: Category[];
  onUpload: (formData: FormData) => Promise<UploadPhotoResult>;
  onStatus: (message: string, isError?: boolean) => void;
}

export default function AddPhotoForm({ categories, onUpload, onStatus }: AddPhotoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleFilePicked(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setPreview(null);
      return;
    }
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const elements = form.elements as unknown as AddPhotoFormElements;

    if (!elements.file.files || elements.file.files.length === 0) {
      onStatus("Escolha uma foto antes de enviar.", true);
      return;
    }

    setIsUploading(true);
    const formData = new FormData(form);
    const result = await onUpload(formData);
    setIsUploading(false);

    if ("error" in result) {
      onStatus(result.error, true);
      return;
    }

    form.reset();
    setPreview(null);
    onStatus("Foto enviada — salva no banco.");
  }

  return (
    <section className="bg-brand-paper p-6 sm:p-8 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl text-brand-ink">Adicionar foto</h2>
        <p className="text-xs text-brand-ink-soft bg-brand-bg-inset p-3 rounded border border-brand-line-soft/60 mt-2">
          Escolha o arquivo direto do seu computador — JPG, PNG ou WebP, até 8MB.
        </p>
      </div>

      <form ref={formRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint" htmlFor="f-category">
            Categoria
          </label>
          <select
            id="f-category"
            name="category"
            defaultValue={categories[0]?.id}
            className="w-full px-3 py-2 text-sm bg-brand-bg-raised border border-brand-line rounded focus:outline-none focus:ring-2 focus:ring-brand-accent-deep text-brand-ink"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint" htmlFor="f-caption">
            Legenda
          </label>
          <input
            id="f-caption"
            name="caption"
            type="text"
            placeholder="Ana & João — cerimônia"
            autoComplete="off"
            className="w-full px-3 py-2 text-sm bg-brand-bg-raised border border-brand-line rounded focus:outline-none focus:ring-2 focus:ring-brand-accent-deep text-brand-ink placeholder:text-brand-ink-faint/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint" htmlFor="f-file">
            Foto
          </label>
          <input
            id="f-file"
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            onChange={handleFilePicked}
            className="w-full text-xs text-brand-ink file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-bg-inset file:text-brand-accent-deep hover:file:bg-brand-bg-alt/50 cursor-pointer"
          />
        </div>

        <div className="flex items-center pb-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-brand-ink cursor-pointer">
            <input type="checkbox" name="featured" className="w-4 h-4 rounded text-brand-accent-deep focus:ring-brand-accent accent-brand-accent-deep" />
            <span>Destaque na home</span>
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={isUploading}
            className="w-full px-5 py-2.5 bg-brand-accent-deep hover:bg-brand-accent-strong disabled:opacity-60 text-brand-accent-ink font-semibold text-xs uppercase tracking-wider rounded shadow-sm hover:shadow transition"
          >
            {isUploading ? "Enviando…" : "Enviar foto"}
          </button>
        </div>

        {preview && (
          <div className="col-span-full bg-brand-bg-inset p-3.5 rounded border border-brand-line-soft flex items-center gap-4 text-xs text-brand-ink-soft mt-2" aria-live="polite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Pré-visualização" className="w-16 h-16 object-cover rounded shadow-sm" />
            <p>Pré-visualização — clique em &quot;Enviar foto&quot; pra salvar de verdade.</p>
          </div>
        )}
      </form>
    </section>
  );
}
