import { useTheme } from "../../lib/ThemeContext";

export default function Navbar() {
  const { theme, mode, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: theme.primary,
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        Flint
      </h1>

      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.primary,
          color: theme.primary50,
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: 500,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {mode === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}
