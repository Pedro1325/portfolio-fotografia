interface AdminActionsProps {
  onReset: () => void;
  onExport: () => void;
}

export default function AdminActions({ onReset, onExport }: AdminActionsProps) {
  return (
    <footer className="admin-actions">
      <p className="admin-actions__hint">
        Alterações ficam salvas neste navegador. Pra publicar de verdade, exporte e substitua{" "}
        <code>lib/portfolioData.ts</code>.
      </p>
      <div className="admin-actions__buttons">
        <button type="button" id="btn-reset" className="admin-btn" onClick={onReset}>
          Restaurar padrão
        </button>
        <button type="button" id="btn-export" className="admin-btn admin-btn--primary" onClick={onExport}>
          Exportar dados atualizados
        </button>
      </div>
    </footer>
  );
}
