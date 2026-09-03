import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

const nav = [
  { to: "/", label: "Головна" },
  { to: "/services", label: "Послуги" },
  { to: "/blog", label: "Блог" },
  { to: "/contact", label: "Контакти" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-gradient text-primary-foreground">
            <Search className="size-4" />
          </span>
          seo.pp.ua
        </Link>
        <nav aria-label="Головна навігація" className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 hidden rounded-lg bg-brand-gradient px-4 py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Безкоштовний аудит
          </Link>
        </nav>
      </div>
    </header>
  );
}