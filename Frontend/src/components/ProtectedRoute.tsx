import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode; // ✅ allows multiple/nested elements
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
