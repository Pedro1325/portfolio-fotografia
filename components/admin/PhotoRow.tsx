"use client";

import { useEffect, useState } from "react";
import { CameraIcon, TrashIcon } from "../icons";
import type { Photo } from "@/lib/types";

interface PhotoRowProps {
  photo: Photo;
  categoryId: string;
  onChange: (id: string, patch: Partial<Photo>) => void;
  onRemove: (photo: Photo) => void;
}

export default function PhotoRow({ photo, categoryId, onChange, onRemove }: PhotoRowProps) {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [photo.src]);

  function handleField<K extends keyof Photo>(field: K, value: Photo[K]) {
    onChange(photo.id, { [field]: value } as Partial<Photo>);
  }

  return (
    <tr className="hover:bg-brand-bg-inset/40 transition-colors">
      <td className="p-2.5">
        {!photo.src ? (
          <span className="w-12 h-14 rounded bg-brand-bg-inset border border-brand-line-soft flex items-center justify-center text-brand-accent">
            <CameraIcon className="w-5 h-5 opacity-60" />
          </span>
        ) : broken ? (
          <span className="text-[10px] text-rose-600 max-w-[100px] block leading-tight">arquivo não encontrado</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt="" loading="lazy" className="w-12 h-14 object-cover rounded border border-brand-line-soft shadow-sm" onError={() => setBroken(true)} />
        )}
      </td>
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
      <td className="p-2.5">
        <input
          className="w-full min-w-[140px] px-2.5 py-1 bg-brand-bg-raised border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
          type="text"
          placeholder="Legenda"
          value={photo.caption || ""}
          onChange={(e) => handleField("caption", e.target.value)}
        />
      </td>
      <td className="p-2.5">
        <input
          className="w-full min-w-[180px] px-2.5 py-1 bg-brand-bg-raised border border-brand-line rounded text-xs text-brand-ink font-mono focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
          type="text"
          placeholder={`/fotos/${categoryId}/arquivo.jpg`}
          value={photo.src || ""}
          onChange={(e) => handleField("src", e.target.value.trim() === "" ? null : e.target.value)}
        />
      </td>
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
