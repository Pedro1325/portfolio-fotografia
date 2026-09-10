"use client";

import { useState, type FormEvent } from "react";
import type { Category } from "@/lib/types";

interface AddCategoryFormProps {
  existingCount: number;
  onCreate: (data: { label: string; note?: string; status?: string; page?: string }) => Promise<{ error?: string; category?: Category }>;
  onStatus: (msg: string, isError?: boolean) => void;
}

export default function AddCategoryForm({ existingCount, onCreate, onStatus }: AddCategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Disponível");
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);

  const defaultPage = `/${String(existingCount + 2).padStart(2, "0")}`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!label.trim()) {
      onStatus("Digite o nome da categoria.", true);
      return;
    }

    setLoading(true);
    try {
      const res = await onCreate({
        label: label.trim(),
        note: note.trim(),
        status: status.trim(),
        page: page.trim() || defaultPage,
      });

      if (res.error) {
        onStatus(res.error, true);
        return;
      }

      setLabel("");
      setNote("");
      setStatus("Disponível");
      setPage("");
      setOpen(false);
      onStatus(`Categoria "${res.category?.label || label}" criada com sucesso!`);
    } catch {
      onStatus("Erro ao criar a categoria.", true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-brand-paper p-6 sm:p-8 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl text-brand-ink">Gerenciar Álbuns & Categorias</h2>
          <p className="text-xs text-brand-ink-soft mt-1">
            Crie novos álbuns para o portfólio (ex: &quot;Gestantes&quot;, &quot;Corporativo&quot;, &quot;Família&quot;).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="px-4 py-2 bg-brand-accent-deep hover:bg-brand-accent-strong text-brand-accent-ink text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition"
        >
          {open ? "Cancelar" : "+ Novo Álbum / Categoria"}
        </button>
      </div>

      {open && (
        <form onSubmit={handleSubmit} className="bg-brand-bg-raised p-5 rounded border border-brand-line flex flex-col gap-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            <div className="sm:col-span-5 flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint" htmlFor="cat-label">
                Nome da Categoria *
              </label>
              <input
                id="cat-label"
                type="text"
                required
                placeholder="Ex: Gestantes & Bebês"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-2 bg-brand-paper border border-brand-line rounded text-sm text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
              />
            </div>

            <div className="sm:col-span-4 flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint" htmlFor="cat-status">
                Tag / Status (opcional)
              </label>
              <input
                id="cat-status"
                type="text"
                placeholder="Ex: Agenda Aberta"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-brand-paper border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
              />
            </div>

            <div className="sm:col-span-3 flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint" htmlFor="cat-page">
                Numeração (opcional)
              </label>
              <input
                id="cat-page"
                type="text"
                placeholder={defaultPage}
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full px-3 py-2 bg-brand-paper border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep"
              />
            </div>

            <div className="sm:col-span-12 flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint" htmlFor="cat-note">
                Descrição ou frase do álbum (opcional)
              </label>
              <textarea
                id="cat-note"
                rows={2}
                placeholder="Ex: Momentos únicos da espera e dos primeiros dias com delicadeza e afeto..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 bg-brand-paper border border-brand-line rounded text-xs text-brand-ink focus:outline-none focus:ring-1 focus:ring-brand-accent-deep resize-y"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-brand-line">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-brand-ink-soft hover:text-brand-ink transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-brand-accent-deep hover:bg-brand-accent-strong disabled:opacity-60 text-brand-accent-ink text-xs font-semibold uppercase tracking-wider rounded shadow-sm transition"
            >
              {loading ? "Criando..." : "Salvar Categoria"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
