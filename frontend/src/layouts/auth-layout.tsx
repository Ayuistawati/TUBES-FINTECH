// src/layouts/AuthLayout.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "#/lib/auth";

export function AuthLayout() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-full min-h-screen items-center">
      <Outlet />
    </div>
  );
}
