
export interface ThemeConfig {
    id: string; 
    name: string; 
    description: string;
    bgPrimary: string; // Cor do fundo como principal
    bgTint: string; //Cor de fundo de sessao alternadas 
    accentInk: string,
    accentColor: string; // Cor de botões, tag de destaque
    textColor: string // Cor de texto
    fontFamily: "hand" | "serif" | "sans"; // Vibe tipográfica
}

export const THEME_PRESETS: ThemeConfig[] =  [
    {
        id: "romantico",
        name: "🌸 Romântico Scrapbook",
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
        name: "🖤 Editorial Noturno",
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
        name: "🌿 Terracota & Linho",
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
        name: "💜 Lavanda & Poesia",
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