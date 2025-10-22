import { Navigate } from "react-router-dom";
import type { ReactNode } from "react"; // ✅ type-only import

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const user = localStorage.getItem("user");

  if (user) {
    // Already logged in → redirect to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
