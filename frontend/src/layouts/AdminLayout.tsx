import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-pearl text-ink">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

