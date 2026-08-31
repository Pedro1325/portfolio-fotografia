import { photosByCategory } from "@/lib/adminHelpers";
import type { PortfolioData } from "@/lib/types";

export default function AdminSummary({ state }: { state: PortfolioData }) {
  const total = state.photos.length;
  const totalSelected = state.photos.filter((p) => p.selected).length;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-4" aria-label="Resumo do portfólio">
      <div className="bg-brand-paper p-4 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col items-center text-center gap-1">
        <span className="text-[11px] uppercase font-semibold text-brand-ink-faint tracking-wider">No portfólio</span>
        <span className="font-hand text-2xl md:text-3xl text-brand-accent-deep font-bold">
          {totalSelected} / {total}
        </span>
      </div>
      {state.categories.map((c) => {
        const list = photosByCategory(state, c.id);
        const sel = list.filter((p) => p.selected).length;
        return (
          <div className="bg-brand-paper p-4 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col items-center text-center gap-1" key={c.id}>
            <span className="text-[11px] uppercase font-semibold text-brand-ink-faint tracking-wider">{c.label}</span>
            <span className="font-hand text-2xl md:text-3xl text-brand-ink-soft font-bold">
              {sel} / {list.length}
            </span>
          </div>
        );
      })}
    </section>
  );
}
