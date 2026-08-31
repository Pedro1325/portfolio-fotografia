"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clone, buildExportSource } from "@/lib/adminHelpers";
import { loadDraft, saveDraft, clearDraft } from "@/lib/portfolioHelpers";
import { BackArrowIcon, AlertIcon } from "../icons";
import AdminSummary from "./AdminSummary";
import AddPhotoForm from "./AddPhotoForm";
import CategoryTable from "./CategoryTable";
import AdminActions from "./AdminActions";
import type { PortfolioData, Photo } from "@/lib/types";
import ThemeCustomizer from "./ThemeCustomizer";
import { DEFAULT_THEME, type ThemeConfig } from "@/lib/themes";

function timeNow(): string {
  const d = new Date();
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

export default function AdminApp({ initialData }: { initialData: PortfolioData }) {
  const [state, setState] = useState<PortfolioData>(initialData);
  const [status, setStatus] = useState("Alterações são salvas automaticamente neste navegador.");
  const [statusError, setStatusError] = useState(false);
  
  useEffect(() => {
    const draft = loadDraft();
    if (draft) setState(draft);
  }, []);

  function persist(next: PortfolioData, message?: string) {
    setState(next);
    try {
      saveDraft(next);
      setStatus(message || "Alterações salvas neste navegador às " + timeNow() + ".");
      setStatusError(false);
    } catch {
      setStatus("Não foi possível salvar automaticamente (armazenamento local indisponível).");
      setStatusError(true);
    }
  }

  function handleThemeChange(patch: Partial<ThemeConfig>) {
    const next = clone(state);
    next.theme = { ...(next.theme || DEFAULT_THEME), ...patch };
    persist(next, "Cores personalizadas — salvo às " + timeNow() + ".");
  }

  function handleSelectPreset(preset: ThemeConfig) {
    const next = clone(state);
    next.theme = clone(preset);
    persist(next, `Paleta "${preset.name}" aplicada — salvo às ` + timeNow() + ".");
  }

  function handleChange(id: string, patch: Partial<Photo>) {
    const next = clone(state);
    const photo = next.photos.find((p) => p.id === id);
    if (!photo) return;
    Object.assign(photo, patch);
    persist(next);
  }

  function handleRemove(photo: Photo) {
    if (!window.confirm(`Remover "${photo.caption || photo.id}" da lista? Isso não apaga nenhum arquivo, só a entrada.`)) {
      return;
    }
    const next = clone(state);
    next.photos = next.photos.filter((p) => p.id !== photo.id);
    persist(next, "Foto removida da lista — salvo às " + timeNow() + ".");
  }

  function handleAdd(newPhoto: Omit<Photo, "order">) {
    const next = clone(state);
    const siblings = next.photos.filter((p) => p.category === newPhoto.category);
    const nextOrder = siblings.reduce((max, p) => Math.max(max, p.order || 0), 0) + 1;
    next.photos.push({ ...newPhoto, order: nextOrder });
    persist(next, "Foto adicionada — salvo às " + timeNow() + ".");
  }

  function handleReset() {
    if (!window.confirm("Restaurar os dados originais? Isso descarta suas alterações salvas neste navegador.")) return;
    clearDraft();
    setState(clone(initialData));
    setStatus("Dados restaurados ao padrão original.");
    setStatusError(false);
  }

  function handleExport() {
    const blob = new Blob([buildExportSource(state)], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolioData.ts";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    setStatus("portfolioData.ts exportado. Substitua lib/portfolioData.ts por ele antes de publicar.");
    setStatusError(false);
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink">
      <header className="sticky top-0 z-40 bg-brand-bg-raised/95 backdrop-blur-md border-b border-brand-line shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <Link
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-ink hover:text-brand-accent transition-colors"
            href="/"
          >
            <BackArrowIcon className="w-4 h-4" />
            Ver site
          </Link>
          <h1 className="font-display text-2xl md:text-3xl text-brand-ink">Área da fotógrafa</h1>
          <p
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusError
                ? "bg-rose-100 text-rose-700 border border-rose-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-6">
        <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-card flex items-start gap-3 text-xs text-amber-900 shadow-sm">
          <AlertIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>
            Esta página não fica no menu do site, mas o endereço não é secreto — qualquer pessoa com o link consegue
            abrir. Pra proteger de verdade, ative a senha de acesso do seu provedor de hospedagem (veja o README do
            projeto).
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8 pb-32 flex flex-col gap-10">
        <AdminSummary state={state} />
        <ThemeCustomizer
          theme={state.theme || DEFAULT_THEME }
          onChange={handleThemeChange}
          onSelectPreset={handleSelectPreset}
          />
        <AddPhotoForm
          categories={state.categories}
          onAdd={handleAdd}
          onStatus={(msg, err) => {
            setStatus(msg);
            setStatusError(!!err);
          }}
        />
        {state.categories.map((category) => (
          <CategoryTable
            key={category.id}
            state={state}
            category={category}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        ))}
      </main>

      <AdminActions onReset={handleReset} onExport={handleExport} />
    </div>
  );
}
