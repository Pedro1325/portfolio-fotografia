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

function timeNow(): string {
  const d = new Date();
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

export default function AdminApp({ initialData }: { initialData: PortfolioData }) {
  const [state, setState] = useState<PortfolioData>(initialData);
  const [status, setStatus] = useState("Alterações são salvas automaticamente neste navegador.");
  const [statusError, setStatusError] = useState(false);

  // Resume a previously saved draft, if this browser has one — mirrors the
  // public site's behavior so what you left off editing is still here.
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
    <>
      <header className="admin-topbar">
        <div className="admin-topbar__inner">
          <Link className="admin-topbar__back" href="/">
            <BackArrowIcon />
            Ver site
          </Link>
          <h1>Área da fotógrafa</h1>
          <p className={"admin-topbar__status" + (statusError ? " is-error" : "")} role="status" aria-live="polite">
            {status}
          </p>
        </div>
      </header>

      <div className="admin-notice">
        <AlertIcon />
        <p>
          Esta página não fica no menu do site, mas o endereço não é secreto — qualquer pessoa com o link consegue
          abrir. Pra proteger de verdade, ative a senha de acesso do seu provedor de hospedagem (veja o README do
          projeto).
        </p>
      </div>

      <main className="admin-main">
        <AdminSummary state={state} />
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
    </>
  );
}
