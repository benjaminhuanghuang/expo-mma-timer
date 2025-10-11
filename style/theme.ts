/*
color definitions
*/

export const Colors = {
  light: {
    background: "#FFFFFF",
    surface: "#F5F5F5",
    card: "#FFFFFF",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#007AFF",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
    border: "#E5E5E5",
    shadow: "#000000",
  },
  dark: {
    background: "#000000",
    surface: "#1C1C1E",
    card: "#2C2C2E",
    text: "#FFFFFF",
    textSecondary: "#999999",
    primary: "#0A84FF",
    success: "#32D74B",
    warning: "#FF9F0A",
    error: "#FF453A",
    border: "#38383A",
    shadow: "#000000",
  },
};

export type ThemeColors = typeof Colors.light;
export type ThemeMode = "light" | "dark" | "system";
