import { Navigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
