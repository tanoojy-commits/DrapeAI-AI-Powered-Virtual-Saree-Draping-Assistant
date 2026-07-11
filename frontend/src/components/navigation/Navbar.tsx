import { Link, NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { APP_NAME, publicNavigation } from "@/constants/app";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-brand">
          <span className="grid size-10 place-items-center rounded-full bg-brand text-white shadow-glow">
            <Sparkles size={20} />
          </span>
          <span>{APP_NAME}</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
          {publicNavigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                isActive ? "text-brand" : "transition hover:text-brand"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link
              to={user?.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition hover:bg-brand-soft hover:text-brand sm:inline-flex"
            >
              {user?.role === "ADMIN" ? "Admin" : "Dashboard"}
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-deep"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition hover:bg-brand-soft hover:text-brand sm:inline-flex"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-deep"
            >
              Start Try-On
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
