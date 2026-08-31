"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { slugify } from "@/lib/adminHelpers";
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
  onAdd: (photo: Omit<Photo, "order">) => void;
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

    const id = category + "-" + slugify(caption || filename) + "-" + Date.now().toString(36).slice(-4);
    onAdd({
      id,
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
    <section className="admin-add">
      <h2>Adicionar foto</h2>
      <p className="admin-add__help">
        Primeiro copie o arquivo da foto pra dentro de <code>public/fotos/&lt;categoria&gt;/</code>. Depois cadastre
        ela aqui com o mesmo nome de arquivo.
      </p>
      <form ref={formRef} className="admin-add__form" onSubmit={handleSubmit}>
        <div className="admin-field">
          <label htmlFor="f-category">Categoria</label>
          <select id="f-category" name="category" defaultValue={categories[0]?.id}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="f-filename">Nome do arquivo</label>
          <input id="f-filename" name="filename" type="text" placeholder="ana-e-joao-01.jpg" autoComplete="off" />
        </div>
        <div className="admin-field">
          <label htmlFor="f-caption">Legenda</label>
          <input id="f-caption" name="caption" type="text" placeholder="Ana & João — cerimônia" autoComplete="off" />
        </div>
        <div className="admin-field admin-field--check">
          <label className="admin-check">
            <input type="checkbox" name="featured" />
            <span>Destaque na home</span>
          </label>
        </div>
        <div className="admin-field">
          <label htmlFor="f-file">Foto (opcional, só pra prévia)</label>
          <input id="f-file" name="file" type="file" accept="image/*" onChange={handleFilePicked} />
        </div>
        <div className="admin-field admin-field--wide" id="add-photo-preview" aria-live="polite">
          {preview && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview.url} alt="Pré-visualização" />
              <p>
                Pré-visualização só neste navegador. Copie o arquivo pra{" "}
                <code>public/fotos/&lt;categoria&gt;/{preview.name}</code> antes de publicar.
              </p>
            </>
          )}
        </div>
        <button type="submit" className="admin-btn admin-btn--primary">
          Adicionar à lista
        </button>
      </form>
    </section>
  );
}
