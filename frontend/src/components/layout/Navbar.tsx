import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-dark-surface border-b border-primary-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary dark:text-primary-500" />
            <span className="text-2xl font-bold text-primary dark:text-primary-500">
              Flint
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-[#4A4A4A] dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-500"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-primary dark:bg-primary-500 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/request-college"
                  className="text-[#4A4A4A] dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-500"
                >
                  Add College
                </Link>
                <Link
                  to="/login"
                  className="text-[#4A4A4A] dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary-500"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary dark:bg-primary-500 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
