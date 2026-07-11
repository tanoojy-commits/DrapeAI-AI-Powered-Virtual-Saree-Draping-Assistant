import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@/components/ui/Loader";
import { useAuth } from "@/hooks/useAuth";

export function AdminRoute() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

