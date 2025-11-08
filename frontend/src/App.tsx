import { ThemeProvider } from "./lib/ThemeContext";
import ThemeToggle from "./components/ui/ThemeToggle";

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-[#1A1A1A] dark:text-dark-text transition-colors duration-300">
      <main className="p-8">
        <h2 className="text-primary dark:text-primary-500 text-3xl font-semibold mb-2">
          Welcome to Flint
        </h2>
        <p className="text-[#4A4A4A] dark:text-dark-text-secondary">
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
