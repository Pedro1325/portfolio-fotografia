"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { clone, buildExportSource } from "@/lib/adminHelpers";
import { removePhoto, selectThemePreset, updatePhoto, updateTheme, uploadPhoto, type UploadPhotoResult } from "@/lib/actions/portfolio";
import { BackArrowIcon, AlertIcon } from "../icons";
import AdminSummary from "./AdminSummary";
import AddPhotoForm from "./AddPhotoForm";
import CategoryTable from "./CategoryTable";
import AdminActions from "./AdminActions";
import type { PortfolioData, Photo } from "@/lib/types";
import ThemeCustomizer from "./ThemeCustomizer";
import { DEFAULT_THEME, type ThemeConfig } from "@/lib/themes";

export default function AdminApp({ initialData }: { initialData: PortfolioData }) {
  const [state, setState] = useState<PortfolioData>(initialData);
  const [status, setStatus] = useState("Alterações são salvas direto no banco de dados.");
  const [statusError, setStatusError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pendingPatches = useRef<Record<string, Partial<Photo>>>({});
  const pendingTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  function runStatus(promise: Promise<unknown>, okMessage: string, errMessage: string) {
    startTransition(async () => {
      try {
        await promise;
        setStatus(okMessage);
        setStatusError(false);
      } catch {
        setStatus(errMessage);
        setStatusError(true);
      }
    });
  }

  function handleThemeChange(patch: Partial<ThemeConfig>) {
    const next = clone(state);
    next.theme = { ...(next.theme || DEFAULT_THEME), ...patch };
    setState(next);
    runStatus(updateTheme(patch), "Cores personalizadas — salvas no banco.", "Não foi possível salvar as cores.");
  }

  function handleSelectPreset(preset: ThemeConfig) {
    const next = clone(state);
    next.theme = clone(preset);
    setState(next);
    runStatus(
      selectThemePreset(preset),
      `Paleta "${preset.name}" aplicada — salva no banco.`,
      "Não foi possível aplicar a paleta."
    );
  }

  function handleChange(id: string, patch: Partial<Photo>) {
    const next = clone(state);
    const photo = next.photos.find((p) => p.id === id);
    if (!photo) return;
    Object.assign(photo, patch);
    setState(next);

    pendingPatches.current[id] = { ...pendingPatches.current[id], ...patch };
    if (pendingTimers.current[id]) clearTimeout(pendingTimers.current[id]);
    pendingTimers.current[id] = setTimeout(() => {
      const toSend = pendingPatches.current[id];
      delete pendingPatches.current[id];
      runStatus(updatePhoto(id, toSend), "Alterações salvas no banco.", "Não foi possível salvar essa alteração.");
    }, 500);
  }

  function handleRemove(photo: Photo) {
    if (!window.confirm(`Remover "${photo.caption || photo.id}" da lista? Isso não apaga nenhum arquivo, só a entrada.`)) {
      return;
    }
    const next = clone(state);
    next.photos = next.photos.filter((p) => p.id !== photo.id);
    setState(next);
    runStatus(removePhoto(photo.id), "Foto removida da lista — salvo no banco.", "Não foi possível remover a foto.");
  }

  async function handleUpload(formData: FormData): Promise<UploadPhotoResult> {
    // Diferente dos outros handlers: aqui a gente espera a resposta do
    // servidor ANTES de mexer no estado local — o arquivo em si só existe
    // depois do upload terminar, não tem como "otimisticamente" mostrar
    // uma foto que ainda não foi salva em disco.
    const result = await uploadPhoto(formData);
    if (!("error" in result)) {
      const next = clone(state);
      next.photos.push(result);
      setState(next);
    }
    return result;
  }

  function handleExport() {
    const blob = new Blob([buildExportSource(state)], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-backup.ts";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    setStatus("Backup em JSON/TS baixado (não é mais o mecanismo de publicação — o banco já é a fonte de verdade).");
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
            Ver Portfolio
          </Link>
          <h1 className="font-display text-2xl md:text-3xl text-brand-ink">Área da fotógrafa</h1>
          <div className="flex items-center gap-3">
            <p
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                statusError
                  ? "bg-rose-100 text-rose-700 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
              role="status"
              aria-live="polite"
            >
              {isPending ? "Salvando…" : status}
            </p>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-xs font-semibold uppercase tracking-wider text-brand-ink-soft hover:text-rose-700 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-6">
        <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-card flex items-start gap-3 text-xs text-amber-900 shadow-sm">
          <AlertIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>
            Esta página está protegida por login — só você, autenticada, consegue editar por aqui.
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
          onUpload={handleUpload}
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

      <AdminActions onExport={handleExport} />
    </div>
  );
}
