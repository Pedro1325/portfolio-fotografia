"use client";

import PhotoRow from "./PhotoRow";
import { photosByCategory } from "@/lib/adminHelpers";
import type { PortfolioData, Category, Photo } from "@/lib/types";

interface CategoryTableProps {
  state: PortfolioData;
  category: Category;
  onChange: (id: string, patch: Partial<Photo>) => void;
  onRemove: (photo: Photo) => void;
  onReplaceFile: (photoId: string, file: File) => Promise<void>;
  onCategoryChange: (categoryId: string, patch: Partial<Category>) => void;
}

export default function CategoryTable({
  state,
  category,
  onChange,
  onRemove,
  onReplaceFile,
  onCategoryChange,
}: CategoryTableProps) {
  const photos = photosByCategory(state, category.id);

  return (
    <section
      className="bg-brand-paper p-6 sm:p-8 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col gap-6"
      aria-labelledby={"cat-" + category.id}
    >
      {/* Cabeçalho da Seção com Edição Dinâmica do Título */}
      <div className="bg-brand-bg-raised p-4 sm:p-5 rounded-card border border-brand-line flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-line pb-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl sm:text-3xl text-brand-ink">
              {category.page} — {category.label}
            </span>
          </div>
          <span className="text-[11px] font-mono text-brand-ink-faint bg-brand-bg-inset px-2.5 py-1 rounded">
            #{category.id}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
          {/* Título da Seção (ex: Casamentos & Eventos) */}
          <div className="sm:col-span-5 flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Título da Seção
            </label>
            <input
              type="text"
              value={category.label}
              placeholder="Ex: Casamentos & Eventos"
              onChange={(e) => onCategoryChange(category.id, { label: e.target.value })}
              className="w-full px-3 py-2 bg-brand-paper border border-brand-line rounded text-sm font-medium text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          {/* Tag de Status */}
          <div className="sm:col-span-4 flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Tag / Status
            </label>
            <input
              type="text"
              value={category.status}
              placeholder="Ex: Disponível para 2026"
              onChange={(e) => onCategoryChange(category.id, { status: e.target.value })}
              className="w-full px-3 py-2 bg-brand-paper border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          {/* Numeração da Página */}
          <div className="sm:col-span-3 flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Numeração / Página
            </label>
            <input
              type="text"
              value={category.page}
              placeholder="Ex: /02"
              onChange={(e) => onCategoryChange(category.id, { page: e.target.value })}
              className="w-full px-3 py-2 bg-brand-paper border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
            />
          </div>

          {/* Frase / Descrição */}
          <div className="sm:col-span-12 flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint">
              Frase ou Descrição da Seção
            </label>
            <textarea
              rows={2}
              value={category.note}
              placeholder="Texto poético ou explicativo que aparece abaixo do título do álbum..."
              onChange={(e) => onCategoryChange(category.id, { note: e.target.value })}
              className="w-full px-3 py-2 bg-brand-paper border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep resize-y"
            />
          </div>
        </div>
      </div>

      {/* Tabela de Fotos do Álbum */}
      <div className="overflow-x-auto rounded border border-brand-line-soft/80 bg-brand-bg-raised">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-brand-bg-inset border-b border-brand-line-soft text-brand-ink-faint uppercase tracking-wider">
            <tr>
              <th className="p-3 font-semibold w-20">Foto</th>
              <th className="p-3 font-semibold w-36">Escolher do PC</th>
              <th className="p-3 font-semibold w-24">Portfólio</th>
              <th className="p-3 font-semibold w-24">Destaque</th>
              <th className="p-3 font-semibold w-20">Ordem</th>
              <th className="p-3 font-semibold">Legenda da Polaróide</th>
              <th className="p-3 font-semibold w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-line-soft/60">
            {photos.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-brand-ink-soft font-hand text-lg">
                  Nenhuma foto nesta categoria ainda. Use o formulário acima para adicionar fotos do seu computador!
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
                  onReplaceFile={onReplaceFile}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

