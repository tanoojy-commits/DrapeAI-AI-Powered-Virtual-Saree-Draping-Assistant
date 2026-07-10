import { Outlet } from "react-router-dom";
import { Footer } from "@/components/navigation/Footer";
import { Navbar } from "@/components/navigation/Navbar";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-pearl text-ink">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

