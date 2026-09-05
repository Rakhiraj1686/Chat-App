// Centralizes the DostiHub theme system: "dostihub" (light), "dostihub-dark",
// or "system" (follows the OS preference). Used by main.jsx (initial paint),
// Navbar, and Settings so all three stay in sync.

export const THEME_STORAGE_KEY = "dostihubTheme";
export const LIGHT_THEME = "dostihub";
export const DARK_THEME = "dostihub-dark";

const prefersDarkOS = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;

// Resolves a stored preference ("system" | light | dark | "") to the actual
// theme name that should be applied to <html data-theme="...">.
export const resolveTheme = (preference) => {
  if (preference === DARK_THEME) return DARK_THEME;
  if (preference === LIGHT_THEME) return LIGHT_THEME;
  // "system" or unset: follow the OS
  return prefersDarkOS() ? DARK_THEME : LIGHT_THEME;
};

export const applyTheme = (preference) => {
  document.documentElement.setAttribute("data-theme", resolveTheme(preference));
};

export const getStoredThemePreference = () =>
  localStorage.getItem(THEME_STORAGE_KEY) || "system";

export const setStoredThemePreference = (preference) => {
  localStorage.setItem(THEME_STORAGE_KEY, preference);
  applyTheme(preference);
};
