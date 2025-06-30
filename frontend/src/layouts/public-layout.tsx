// src/layouts/PublicLayout.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "#/lib/auth";

export function PublicLayout() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
