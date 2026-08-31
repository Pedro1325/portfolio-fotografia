"use client";

import PhotoRow from "./PhotoRow";
import { photosByCategory } from "@/lib/adminHelpers";
import type { PortfolioData, Category, Photo } from "@/lib/types";

interface CategoryTableProps {
  state: PortfolioData;
  category: Category;
  onChange: (id: string, patch: Partial<Photo>) => void;
  onRemove: (photo: Photo) => void;
}

export default function CategoryTable({ state, category, onChange, onRemove }: CategoryTableProps) {
  const photos = photosByCategory(state, category.id);

  return (
    <section className="bg-brand-paper p-6 sm:p-8 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col gap-4" aria-labelledby={"cat-" + category.id}>
      <h2 id={"cat-" + category.id} className="font-display text-3xl text-brand-ink">
        {category.page} — {category.label}
      </h2>
      <div className="overflow-x-auto rounded border border-brand-line-soft/80 bg-brand-bg-raised">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-brand-bg-inset border-b border-brand-line-soft text-brand-ink-faint uppercase tracking-wider">
            <tr>
              <th className="p-3 font-semibold w-16">Foto</th>
              <th className="p-3 font-semibold w-24">Portfólio</th>
              <th className="p-3 font-semibold w-24">Destaque</th>
              <th className="p-3 font-semibold w-20">Ordem</th>
              <th className="p-3 font-semibold">Legenda</th>
              <th className="p-3 font-semibold">Arquivo (src)</th>
              <th className="p-3 font-semibold w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-line-soft/60">
            {photos.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-brand-ink-soft font-hand text-lg">
                  Nenhuma foto nesta categoria ainda.
                </td>
              </tr>
            ) : (
              photos.map((photo) => (
                <PhotoRow
                  key={photo.id}
                  photo={photo}
                  categoryId={category.id}
                  onChange={onChange}
                  onRemove={onRemove}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
