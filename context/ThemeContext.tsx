/* 

ThemeContext.tsx - Firebase Integration

- Automatically detects system theme
- Syncs with Firebase for logged-in users
- Falls back to AsyncStorage for non-authenticated users
- Real-time updates across devices
*/
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, ThemeColors, ThemeMode } from "../style/theme";

type ThemeContextType = {
  colors: ThemeColors;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@timerkit_theme_mode";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [isLoading, setIsLoading] = useState(true);

  // Load theme AsyncStorage
  useEffect(() => {
    loadThemeFromLocal();
  }, []);

  const loadThemeFromLocal = async () => {
    try {
      setIsLoading(true);
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setThemeModeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error("Failed to load theme from AsyncStorage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
  };

  // Determine actual theme based on mode and system preference
  const isDark =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";

  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <ThemeContext
      value={{ colors, isDark, themeMode, setThemeMode, isLoading }}
    >
      {children}
    </ThemeContext>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
