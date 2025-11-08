import { useAuth } from "../../lib/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary dark:text-primary-500 mb-4">
          Welcome, {user?.name}!
        </h1>
        <p className="text-[#4A4A4A] dark:text-dark-text-secondary mb-8">
          @{user?.username} • {user?.college.name}
        </p>
        <button
          onClick={logout}
          className="px-6 py-3 bg-primary dark:bg-primary-500 text-white rounded-lg hover:scale-105 transition-transform"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
