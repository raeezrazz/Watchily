import { Navigate } from "react-router-dom";
import type { JSX } from "react"; // ✅ type-only import

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = localStorage.getItem("user"); // check if user is logged in

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
