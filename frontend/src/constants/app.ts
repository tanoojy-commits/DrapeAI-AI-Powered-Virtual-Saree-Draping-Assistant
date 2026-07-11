import type { NavigationItem } from "@/types/navigation";

export const APP_NAME = import.meta.env.VITE_APP_NAME ?? "DrapeAI";

export const publicNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const dashboardNavigation: NavigationItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Profile", href: "/profile" },
  { label: "Try-On", href: "/try-on" },
  { label: "History", href: "/history" },
  { label: "Favorites", href: "/favorites" },
];
