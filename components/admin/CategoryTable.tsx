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
    <section className="admin-cat" aria-labelledby={"cat-" + category.id}>
      <h2 id={"cat-" + category.id}>
        {category.page} — {category.label}
      </h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Portfólio</th>
              <th>Destaque</th>
              <th>Ordem</th>
              <th>Legenda</th>
              <th>Arquivo (src)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {photos.length === 0 ? (
              <tr className="admin-empty-row">
                <td colSpan={7}>Nenhuma foto nesta categoria ainda.</td>
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
