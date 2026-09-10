
export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  bgPrimary: string;
  bgTint: string;
  accentInk: string;
  accentColor: string;
  textColor: string;
  fontFamily: "hand" | "serif" | "sans";
}

export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: "romantico",
    name: "Romântico Scrapbook",
    description: "Tons suaves de rosa, papel creme e laços rosé.",
    bgPrimary: "#fdf4ee",
    bgTint: "#fbe9ee",
    accentColor: "#b83d6b",
    accentInk: "#ffffff",
    textColor: "#5a3341",
    fontFamily: "hand",
  },
  {
    id: "editorial-dark",
    name: "Editorial Noturno",
    description: "Fundo escuro dramático com toques de bronze.",
    bgPrimary: "#141213",
    bgTint: "#1e1b1c",
    accentColor: "#cf9f5f",
    accentInk: "#141213",
    textColor: "#fdf4ee",
    fontFamily: "serif",
  },
  {
    id: "terracota",
    name: "Terracota & Linho",
    description: "Tons terrosos aconchegantes e acolhedores.",
    bgPrimary: "#fcf8f2",
    bgTint: "#f5ece1",
    accentColor: "#c25e3e",
    accentInk: "#ffffff",
    textColor: "#3d2b1f",
    fontFamily: "sans",
  },
  {
    id: "lavanda",
    name: "Lavanda & Poesia",
    description: "Lilás suave e elegante para ensaios artísticos.",
    bgPrimary: "#f8f6fc",
    bgTint: "#eeeaf7",
    accentColor: "#7c5295",
    accentInk: "#ffffff",
    textColor: "#33263a",
    fontFamily: "hand",
  },
];

export const DEFAULT_THEME: ThemeConfig = THEME_PRESETS[0];

export function getThemeCssVariables(theme: ThemeConfig): React.CSSProperties {
  const isDark =
    theme.id === "editorial-dark" ||
    theme.bgPrimary.toLowerCase().startsWith("#1") ||
    theme.bgPrimary.toLowerCase().startsWith("#0") ||
    theme.bgPrimary.toLowerCase().startsWith("#2");

  const fontDisplay =
    theme.fontFamily === "serif"
      ? '"Playfair Display", Georgia, serif'
      : theme.fontFamily === "sans"
      ? '"Poppins", "Segoe UI", sans-serif'
      : '"Alex Brush", "Segoe Script", cursive';

  const fontHand =
    theme.fontFamily === "serif"
      ? '"Playfair Display", Georgia, serif'
      : '"Caveat", "Segoe Script", cursive';

  const fontBody =
    theme.fontFamily === "serif"
      ? '"Georgia", serif'
      : '"Poppins", "Segoe UI", sans-serif';

  return {
    "--brand-bg": theme.bgPrimary,
    "--brand-bg-tint": theme.bgTint,
    "--brand-bg-raised": isDark ? "#1e1b1c" : "#ffffff",
    "--brand-bg-inset": theme.bgTint,
    "--brand-line": isDark ? "rgba(255, 255, 255, 0.15)" : `color-mix(in srgb, ${theme.textColor} 18%, transparent)`,
    "--brand-line-soft": isDark ? "rgba(255, 255, 255, 0.08)" : `color-mix(in srgb, ${theme.textColor} 10%, transparent)`,
    "--brand-ink": theme.textColor,
    "--brand-ink-soft": isDark ? "rgba(253, 244, 238, 0.8)" : `color-mix(in srgb, ${theme.textColor} 72%, transparent)`,
    "--brand-ink-faint": isDark ? "rgba(253, 244, 238, 0.55)" : `color-mix(in srgb, ${theme.textColor} 50%, transparent)`,
    "--brand-accent": theme.accentColor,
    "--brand-accent-strong": theme.accentColor,
    "--brand-accent-deep": theme.accentColor,
    "--brand-accent-soft": theme.bgTint,
    "--brand-accent-ink": theme.accentInk,
    "--brand-gold": "#cf9f5f",
    "--brand-gold-soft": "#e8d3ad",
    "--brand-paper": isDark ? "#232022" : "#ffffff",
    "--brand-paper-ink": isDark ? "#fdf4ee" : theme.textColor,
    "--font-display": fontDisplay,
    "--font-hand": fontHand,
    "--font-body": fontBody,
  } as React.CSSProperties;
}