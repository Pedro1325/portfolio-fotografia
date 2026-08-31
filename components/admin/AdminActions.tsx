interface AdminActionsProps {
  onReset: () => void;
  onExport: () => void;
}

export default function AdminActions({ onReset, onExport }: AdminActionsProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-brand-bg-raised/95 backdrop-blur-md border-t border-brand-line p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-brand-ink-soft text-center sm:text-left">
          Alterações ficam salvas neste navegador. Pra publicar de verdade, exporte e substitua{" "}
          <code className="bg-brand-bg-inset px-1.5 py-0.5 rounded border border-brand-line-soft">lib/portfolioData.ts</code>.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            id="btn-reset"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-ink hover:text-rose-700 bg-brand-bg border border-brand-line rounded hover:bg-brand-bg-inset transition"
            onClick={onReset}
          >
            Restaurar padrão
          </button>
          <button
            type="button"
            id="btn-export"
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-brand-accent-ink bg-brand-accent-deep hover:bg-brand-accent-strong rounded shadow-sm hover:shadow transition"
            onClick={onExport}
          >
            Exportar dados atualizados
          </button>
        </div>
      </div>
    </footer>
  );
}
