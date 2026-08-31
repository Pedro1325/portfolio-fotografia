"use client";

import { THEME_PRESETS, type ThemeConfig } from "@/lib/themes";

interface ThemeCustomizerProps {
  theme: ThemeConfig;
  onChange: (patch: Partial<ThemeConfig>) => void;
  onSelectPreset: (preset: ThemeConfig) => void;
}

export default function ThemeCustomizer({ theme, onChange, onSelectPreset }: ThemeCustomizerProps) {
  return (
    <section className="bg-brand-paper p-6 sm:p-8 rounded-card border border-brand-line-soft/80 shadow-card flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl text-brand-ink">Personalizar Aparência & Cores</h2>
        <p className="text-xs text-brand-ink-soft bg-brand-bg-inset p-3 rounded border border-brand-line-soft/60 mt-2">
          Escolha uma paleta pré-configurada ou personalize as cores e fontes livremente. As alterações aparecem no site em tempo real!
        </p>
      </div>

      {/* 1. Presets de Temas Prontos */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint block mb-3">
          1. Escolha uma Paleta Pronta
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {THEME_PRESETS.map((preset) => {
            const isSelected = theme.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`p-4 rounded-card text-left transition-all border flex flex-col gap-2.5 relative ${
                  isSelected
                    ? "border-brand-accent-deep ring-2 ring-brand-accent-deep/30 bg-brand-bg-inset/50 shadow-md"
                    : "border-brand-line-soft bg-brand-bg-raised hover:border-brand-accent/50 hover:bg-brand-bg-inset/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-brand-ink">{preset.name}</span>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold text-brand-accent-deep bg-brand-bg px-2 py-0.5 rounded-full border border-brand-line-soft">
                      Ativo
                    </span>
                  )}
                </div>

                {/* Bolinhas de Amostra de Cores */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: preset.bgPrimary }}
                    title="Fundo principal"
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: preset.bgTint }}
                    title="Fundo alternado"
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: preset.accentColor }}
                    title="Cor de destaque"
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: preset.textColor }}
                    title="Cor do texto"
                  />
                </div>

                <p className="text-[11px] text-brand-ink-soft leading-tight">{preset.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-brand-line-soft/60" />

      {/* 2. Color Pickers para Ajuste Fino */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-brand-ink-faint block mb-3">
          2. Ou Faça o Ajuste Fino das Cores
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cor de Fundo */}
          <div className="bg-brand-bg-raised p-3.5 rounded border border-brand-line flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-brand-ink">Fundo Principal</p>
              <p className="text-[10px] text-brand-ink-faint">Fundo geral do site</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-brand-ink-soft">{theme.bgPrimary}</span>
              <input
                type="color"
                value={theme.bgPrimary}
                onChange={(e) => onChange({ bgPrimary: e.target.value, id: "custom" })}
                className="w-8 h-8 rounded border border-brand-line cursor-pointer bg-transparent p-0"
              />
            </div>
          </div>

          {/* Cor de Fundo Secundária */}
          <div className="bg-brand-bg-raised p-3.5 rounded border border-brand-line flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-brand-ink">Fundo das Seções</p>
              <p className="text-[10px] text-brand-ink-faint">Álbuns e seções pares</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-brand-ink-soft">{theme.bgTint}</span>
              <input
                type="color"
                value={theme.bgTint}
                onChange={(e) => onChange({ bgTint: e.target.value, id: "custom" })}
                className="w-8 h-8 rounded border border-brand-line cursor-pointer bg-transparent p-0"
              />
            </div>
          </div>

          {/* Cor de Destaque / Botões */}
          <div className="bg-brand-bg-raised p-3.5 rounded border border-brand-line flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-brand-ink">Cor de Destaque</p>
              <p className="text-[10px] text-brand-ink-faint">Botões, laços e ícones</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-brand-ink-soft">{theme.accentColor}</span>
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => onChange({ accentColor: e.target.value, id: "custom" })}
                className="w-8 h-8 rounded border border-brand-line cursor-pointer bg-transparent p-0"
              />
            </div>
          </div>

          {/* Cor do Texto do Botão */}
          <div className="bg-brand-bg-raised p-3.5 rounded border border-brand-line flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-brand-ink">Texto do Botão</p>
              <p className="text-[10px] text-brand-ink-faint">Contraste sobre os botões</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-brand-ink-soft">{theme.accentInk}</span>
              <input
                type="color"
                value={theme.accentInk}
                onChange={(e) => onChange({ accentInk: e.target.value, id: "custom" })}
                className="w-8 h-8 rounded border border-brand-line cursor-pointer bg-transparent p-0"
              />
            </div>
          </div>

          {/* Cor dos Textos */}
          <div className="bg-brand-bg-raised p-3.5 rounded border border-brand-line flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-brand-ink">Cor dos Textos</p>
              <p className="text-[10px] text-brand-ink-faint">Títulos e parágrafos</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-brand-ink-soft">{theme.textColor}</span>
              <input
                type="color"
                value={theme.textColor}
                onChange={(e) => onChange({ textColor: e.target.value, id: "custom" })}
                className="w-8 h-8 rounded border border-brand-line cursor-pointer bg-transparent p-0"
              />
            </div>
          </div>

          {/* Estilo de Tipografia */}
          <div className="bg-brand-bg-raised p-3.5 rounded border border-brand-line flex flex-col justify-center gap-1.5">
            <label htmlFor="f-font" className="text-xs font-semibold text-brand-ink">
              Estilo da Fonte
            </label>
            <select
              id="f-font"
              value={theme.fontFamily}
              onChange={(e) => onChange({ fontFamily: e.target.value as ThemeConfig["fontFamily"], id: "custom" })}
              className="w-full px-2 py-1 text-xs bg-brand-bg border border-brand-line rounded focus:outline-none focus:ring-1 focus:ring-brand-accent-deep text-brand-ink"
            >
              <option value="hand">🌸 Tema Rose / Romântica (Alex Brush + Caveat)</option>
              <option value="serif">🖤 Tema Dark Editorial (Serifada)</option>
              <option value="sans">🌿 Tema Clean / Linho (Poppins)</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
