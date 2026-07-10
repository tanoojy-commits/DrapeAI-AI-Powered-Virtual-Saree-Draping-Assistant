import { APP_NAME } from "@/constants/app";

export function Footer() {
  return (
    <footer className="border-t border-brand/10 bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 {APP_NAME}. All rights reserved.</p>
        <p>Built for premium virtual saree try-on experiences.</p>
      </div>
    </footer>
  );
}

