import { ThemeProvider, useTheme } from "./lib/ThemeContext";
import ThemeToggle from "./components/ui/ThemeToggle";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.background,
        color: theme.text,
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <main style={{ padding: "2rem" }}>
        <h2 style={{ color: theme.primary }}>Welcome to Flint</h2>
        <p style={{ color: theme.textSecondary }}>
          Dating app for college students
        </p>
      </main>
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
