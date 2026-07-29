export const THEMES = {
    blue: { bg: "#e0f2fe", card: "#ffffff", text: "#111111", border: "#7dd3fc", heading: "#0369a1" },
    pink: { bg: "#fce7f3", card: "#ffffff", text: "#111111", border: "#f9a8d4", heading: "#9d174d" },
    white: { bg: "#ffffff", card: "#f9fafb", text: "#111111", border: "#d1d5db", heading: "#111111" },
    dark: { bg: "#1e1e2e", card: "#2e2e3e", text: "#ffffff", border: "#4b5563", heading: "#93c5fd" },
    energy: { bg: "#fff7ed", card: "#ffffff", text: "#111111", border: "#fb923c", heading: "#ea580c" },
};

export const getActiveTheme = () => {
    const profile = JSON.parse(localStorage.getItem("mochiProfile") || "null");
    const settingsKey = profile?.id ? `mochiSettings_${profile.id}` : "mochiSettings_guest";
    const settings = JSON.parse(localStorage.getItem(settingsKey) || "null");
    return THEMES[settings?.theme] || THEMES.blue;
};