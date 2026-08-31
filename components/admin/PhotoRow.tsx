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
    <tr>
      <td className="admin-thumb">
        {!photo.src ? (
          <span className="admin-thumb__ph">
            <CameraIcon />
          </span>
        ) : broken ? (
          <span className="admin-thumb__missing">arquivo não encontrado: {photo.src}</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt="" loading="lazy" onError={() => setBroken(true)} />
        )}
      </td>
      <td>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={photo.selected}
            onChange={(e) => handleField("selected", e.target.checked)}
          />
          <span>Mostrar</span>
        </label>
      </td>
      <td>
        <label className="admin-check">
          <input
            type="checkbox"
            checked={photo.featured}
            onChange={(e) => handleField("featured", e.target.checked)}
          />
          <span>Destaque</span>
        </label>
      </td>
      <td>
        <input
          className="admin-input admin-input--num"
          type="number"
          min="1"
          value={photo.order || 1}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (!Number.isNaN(n)) handleField("order", n);
          }}
        />
      </td>
      <td>
        <input
          className="admin-input"
          type="text"
          placeholder="Legenda"
          value={photo.caption || ""}
          onChange={(e) => handleField("caption", e.target.value)}
        />
      </td>
      <td>
        <input
          className="admin-input admin-input--path"
          type="text"
          placeholder={`/fotos/${categoryId}/arquivo.jpg`}
          value={photo.src || ""}
          onChange={(e) => handleField("src", e.target.value.trim() === "" ? null : e.target.value)}
        />
      </td>
      <td>
        <button
          type="button"
          className="admin-icon-btn admin-icon-btn--danger"
          aria-label="Remover foto"
          onClick={() => onRemove(photo)}
        >
          <TrashIcon />
        </button>
      </td>
    </tr>
  );
}
