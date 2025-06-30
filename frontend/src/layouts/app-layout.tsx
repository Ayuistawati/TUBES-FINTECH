// src/layouts/AppLayout.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "#/lib/auth";
import { SideNavbar } from "./sidebar";

export function AppLayout() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="flex h-full min-h-screen items-center bg-gray-100 dark:bg-slate-900">
      <SideNavbar collapsed={false} />
      <Outlet />
    </main>
  );
}
