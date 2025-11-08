import { useTheme } from "../../lib/ThemeContext";

export default function ThemeToggle() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "50%",
        backgroundColor: theme.primary,
        color: theme.primary50,
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.2s, opacity 0.2s",
        zIndex: 1000,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      aria-label="Toggle theme"
    >
      {mode === "light" ? "🌙" : "☀️"}
    </button>
  );
}
