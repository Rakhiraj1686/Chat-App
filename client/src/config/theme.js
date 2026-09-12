// Centralizes the FlyonUI 2.4.1 theme system so Navbar and Settings stay in sync.

export const THEME_STORAGE_KEY = "dostihubTheme";
export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export const FLYONUI_THEMES = [
  "light", "dark", "black", "ghibli", "pastel", "slack", "spotify",
  "luxury", "valorant", "shadcn", "claude", "vscode", "mintlify",
  "perplexity", "corporate", "gourmet", "marshmallow", "soft",
];

export const THEME_OPTIONS = FLYONUI_THEMES.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const prefersDarkOS = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;

// Resolves a stored preference ("system" | light | dark | "") to the actual
// theme name that should be applied to <html data-theme="...">.
export const resolveTheme = (preference) => {
  if (preference === "system") return prefersDarkOS() ? DARK_THEME : LIGHT_THEME;
  return FLYONUI_THEMES.includes(preference) ? preference : LIGHT_THEME;
};

export const applyTheme = (preference) => {
  document.documentElement.setAttribute("data-theme", resolveTheme(preference));
};

export const getStoredThemePreference = () =>
  localStorage.getItem(THEME_STORAGE_KEY) || LIGHT_THEME;

export const setStoredThemePreference = (preference) => {
  localStorage.setItem(THEME_STORAGE_KEY, preference);
  applyTheme(preference);
};
