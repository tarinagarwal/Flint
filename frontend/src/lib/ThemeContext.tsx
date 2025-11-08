import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { lightTheme, darkTheme } from "./theme";
import type { Theme } from "./theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as ThemeMode) || "light";
  });

  const theme = mode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.style.setProperty("--bg", theme.background);
    document.documentElement.style.setProperty("--text", theme.text);
  }, [mode, theme]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
