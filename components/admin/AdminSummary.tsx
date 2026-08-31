import { photosByCategory } from "@/lib/adminHelpers";
import type { PortfolioData } from "@/lib/types";

export default function AdminSummary({ state }: { state: PortfolioData }) {
  const total = state.photos.length;
  const totalSelected = state.photos.filter((p) => p.selected).length;

  return (
    <section className="admin-summary" aria-label="Resumo do portfólio">
      <div className="stat stat--total">
        <span className="stat__label">No portfólio</span>
        <span className="stat__value">
          {totalSelected} / {total}
        </span>
      </div>
      {state.categories.map((c) => {
        const list = photosByCategory(state, c.id);
        const sel = list.filter((p) => p.selected).length;
        return (
          <div className="stat" key={c.id}>
            <span className="stat__label">{c.label}</span>
            <span className="stat__value">
              {sel} / {list.length}
            </span>
          </div>
        );
      })}
    </section>
  );
}
