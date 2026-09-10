"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { CameraIcon, TrashIcon } from "../icons";
import type { Photo } from "@/lib/types";

interface PhotoRowProps {
  photo: Photo;
  categoryId: string;
  onChange: (id: string, patch: Partial<Photo>) => void;
  onRemove: (photo: Photo) => void;
  onReplaceFile: (photoId: string, file: File) => Promise<void>;
}

export default function PhotoRow({ photo, onChange, onRemove, onReplaceFile }: PhotoRowProps) {
  const [broken, setBroken] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBroken(false);
  }, [photo.src]);

  function handleField<K extends keyof Photo>(field: K, value: Photo[K]) {
    onChange(photo.id, { [field]: value } as Partial<Photo>);
  }

  async function handleFileChosen(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onReplaceFile(photo.id, file);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <tr className="hover:bg-brand-bg-inset/40 transition-colors">
      {/* Miniatura Quadrada Estilo Polaróide */}
      <td className="p-2.5">
        <div className="relative group w-14 h-14 rounded-[2px] bg-brand-paper border border-brand-line-soft shadow-sm overflow-hidden flex items-center justify-center">
          {!photo.src ? (
            <span className="w-full h-full flex items-center justify-center text-brand-accent bg-brand-bg-inset">
              <CameraIcon className="w-5 h-5 opacity-60" />
            </span>
          ) : broken ? (
            <span className="text-[9px] text-rose-600 p-1 text-center leading-tight">
              não encontrada
            </span>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photo.src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
              onError={() => setBroken(true)}
            />
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-semibold">
              Enviando...
            </div>
          )}
        </div>
      </td>

      {/* Botão de Escolher Foto do Computador */}
      <td className="p-2.5">
        <div className="flex flex-col gap-1">
          <label className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-brand-bg-raised hover:bg-brand-bg-inset text-brand-ink text-xs font-semibold rounded border border-brand-line shadow-sm cursor-pointer transition">
            <CameraIcon className="w-3.5 h-3.5 text-brand-accent-deep shrink-0" />
            <span>{isUploading ? "Enviando..." : "Escolher do PC"}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              disabled={isUploading}
              onChange={handleFileChosen}
            />
          </label>

          <button
            type="button"
            onClick={() => setShowManualUrl((v) => !v)}
            className="text-[10px] text-brand-ink-faint hover:text-brand-ink underline text-left"
          >
            {showManualUrl ? "Ocultar link manual" : "Digitar link manual"}
          </button>

          {showManualUrl && (
            <input
              className="w-full min-w-[140px] px-2 py-0.5 bg-brand-bg-raised border border-brand-line rounded text-[11px] text-brand-ink font-mono focus:outline-none focus:ring-1 focus:ring-brand-accent-deep mt-1"
              type="text"
              placeholder="/fotos/exemplo.jpg"
              value={photo.src || ""}
              onChange={(e) => handleField("src", e.target.value.trim() === "" ? null : e.target.value)}
            />
          )}
        </div>
      </td>

      {/* Checkbox Mostrar */}
      <td className="p-2.5">
        <label className="flex items-center gap-1.5 text-xs text-brand-ink cursor-pointer">
          <input
            type="checkbox"
            checked={photo.selected}
            onChange={(e) => handleField("selected", e.target.checked)}
            className="w-4 h-4 rounded text-brand-accent-deep accent-brand-accent-deep cursor-pointer"
          />
          <span>Mostrar</span>
        </label>
      </td>

      {/* Checkbox Destaque */}
      <td className="p-2.5">
        <label className="flex items-center gap-1.5 text-xs text-brand-ink cursor-pointer">
          <input
            type="checkbox"
            checked={photo.featured}
            onChange={(e) => handleField("featured", e.target.checked)}
            className="w-4 h-4 rounded text-brand-accent-deep accent-brand-accent-deep cursor-pointer"
          />
          <span>Destaque</span>
        </label>
      </td>

      {/* Ordem */}
      <td className="p-2.5">
        <input
          className="w-14 px-2 py-1 bg-brand-bg-raised border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
          type="number"
          min="1"
          value={photo.order || 1}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (!Number.isNaN(n)) handleField("order", n);
          }}
        />
      </td>

      {/* Legenda da Foto */}
      <td className="p-2.5">
        <input
          className="w-full min-w-[160px] px-2.5 py-1.5 bg-brand-bg-raised border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
          type="text"
          placeholder="Legenda da polaróide (ex: Noivos ao pôr do sol)"
          value={photo.caption || ""}
          onChange={(e) => handleField("caption", e.target.value)}
        />
      </td>

      {/* Botão Remover */}
      <td className="p-2.5 text-center">
        <button
          type="button"
          className="p-1.5 text-brand-ink-faint hover:text-rose-600 hover:bg-rose-50 rounded transition"
          aria-label="Remover foto"
          onClick={() => onRemove(photo)}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

