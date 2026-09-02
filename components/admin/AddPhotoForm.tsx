"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { Category, Photo } from "@/lib/types";

interface AddPhotoFormElements extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  filename: HTMLInputElement;
  caption: HTMLInputElement;
  featured: HTMLInputElement;
  file: HTMLInputElement;
}

interface AddPhotoFormProps {
  categories: Category[];
  onAdd: (photo: Omit<Photo, "id" | "order">) => void;
  onStatus: (message: string, isError?: boolean) => void;
}

export default function AddPhotoForm({ categories, onAdd, onStatus }: AddPhotoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);

  function handleFilePicked(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file || !formRef.current) {
      setPreview(null);
      return;
    }
    const filenameField = (formRef.current.elements as unknown as AddPhotoFormElements).filename;
    if (!filenameField.value) filenameField.value = file.name;
    setPreview({ url: URL.createObjectURL(file), name: file.name });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const elements = form.elements as unknown as AddPhotoFormElements;
    const category = elements.category.value;
    const caption = elements.caption.value.trim();
    const filename = elements.filename.value.trim();
    const featured = elements.featured.checked;

    if (!filename) {
      onStatus("Informe o nome do arquivo antes de adicionar.", true);
      elements.filename.focus();
      return;
    }

    onAdd({
      category,
      src: "/fotos/" + category + "/" + filename.replace(/^\/+/, ""),
      caption: caption || filename,
      featured,
      selected: true,
    });

    form.reset();
    setPreview(null);
  }

  return (
    <section className="bg-brand-paper p-6 sm:p-8 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl text-brand-ink">Adicionar foto</h2>
        <p className="text-xs text-brand-ink-soft bg-brand-bg-inset p-3 rounded border border-brand-line-soft/60 mt-2">
          Primeiro copie o arquivo da foto pra dentro de <code>public/fotos/&lt;categoria&gt;/</code>. Depois cadastre
          ela aqui com o mesmo nome de arquivo.
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
          <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint" htmlFor="f-filename">
            Nome do arquivo
          </label>
          <input
            id="f-filename"
            name="filename"
            type="text"
            placeholder="ana-e-joao-01.jpg"
            autoComplete="off"
            className="w-full px-3 py-2 text-sm bg-brand-bg-raised border border-brand-line rounded focus:outline-none focus:ring-2 focus:ring-brand-accent-deep text-brand-ink placeholder:text-brand-ink-faint/50"
          />
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
            Foto (opcional, só pra prévia)
          </label>
          <input
            id="f-file"
            name="file"
            type="file"
            accept="image/*"
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
            className="w-full px-5 py-2.5 bg-brand-accent-deep hover:bg-brand-accent-strong text-brand-accent-ink font-semibold text-xs uppercase tracking-wider rounded shadow-sm hover:shadow transition"
          >
            Adicionar à lista
          </button>
        </div>

        {preview && (
          <div className="col-span-full bg-brand-bg-inset p-3.5 rounded border border-brand-line-soft flex items-center gap-4 text-xs text-brand-ink-soft mt-2" aria-live="polite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.url} alt="Pré-visualização" className="w-16 h-16 object-cover rounded shadow-sm" />
            <p>
              Pré-visualização só neste navegador. Copie o arquivo pra{" "}
              <code>public/fotos/&lt;categoria&gt;/{preview.name}</code> antes de publicar.
            </p>
          </div>
        )}
      </form>
    </section>
  );
}
