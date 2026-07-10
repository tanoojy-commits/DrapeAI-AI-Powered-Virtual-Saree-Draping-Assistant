import { NavLink } from "react-router-dom";
import { dashboardNavigation } from "@/constants/app";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-brand/10 bg-white/70 p-4 lg:block">
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        Workspace
      </p>
      <nav className="mt-4 grid gap-1">
        {dashboardNavigation.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className="rounded-xl px-3 py-2 text-sm font-medium text-ink/70 transition hover:bg-brand-soft hover:text-brand"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

