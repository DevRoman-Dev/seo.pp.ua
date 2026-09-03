import { Link } from "@tanstack/react-router";
import { services } from "@/data/services";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">seo.pp.ua</p>
          <p className="mt-3 text-sm text-muted-foreground">
            SEO та GEO агенція: класичне просування в Google і оптимізація під AI-пошук.
          </p>
        </div>
        <nav aria-label="Послуги" className="text-sm">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Послуги
          </h2>
          <ul className="mt-3 space-y-2">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services"
                  hash={s.slug}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Сторінки" className="text-sm">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Сайт
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Головна
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-muted-foreground hover:text-foreground">
                Усі послуги
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground">
                Блог
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                Контакти
              </Link>
            </li>
          </ul>
        </nav>
        <div className="text-sm">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Звʼязок
          </h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <a href="mailto:hello@seo.pp.ua" className="hover:text-foreground">
                hello@seo.pp.ua
              </a>
            </li>
            <li>Пн–Пт, 10:00–19:00 (Київ)</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} seo.pp.ua — SEO та GEO послуги.
      </div>
    </footer>
  );
}