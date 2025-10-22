import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const user = localStorage.getItem("user");

  if (user) {
    // Already logged in → redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
}
