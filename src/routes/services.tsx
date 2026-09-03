import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { services, serviceGroups } from "@/data/services";

const title = "SEO послуги: аудит, просування в Google, GEO та llms.txt — seo.pp.ua";
const description =
  "Усі SEO-сервіси в одному місці: технічний аудит, просування в Google, локальне SEO, GEO та оптимізація під LLM, Core Web Vitals, контент, лінкбілдинг, аналітика GA4.";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "SEO та GEO послуги",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.short,
              serviceType: s.group,
              url: `/services#${s.slug}`,
            },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Головна", item: "/" },
            { "@type": "ListItem", position: 2, name: "Послуги", item: "/services" },
          ],
        }),
      },
    ],
  }),
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-hero grid-lines border-b border-border/60">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <nav aria-label="Хлібні крихти" className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Головна
              </Link>
              <span className="px-2">/</span>
              <span className="text-foreground">Послуги</span>
            </nav>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold sm:text-5xl">
              SEO-сервіси: від технічного аудиту до <span className="text-brand-gradient">GEO</span>{" "}
              та оптимізації під LLM
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {description} Обирайте окремий сервіс або комплекс — ми зберемо пакет під ваші цілі та
              бюджет.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {serviceGroups.map((g) => (
                <a
                  key={g}
                  href={`#${encodeURIComponent(g)}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {g}
                </a>
              ))}
            </div>
          </div>
        </section>

        {serviceGroups.map((group) => (
          <section key={group} id={encodeURIComponent(group)} className="scroll-mt-20">
            <div className="mx-auto max-w-6xl px-4 py-16">
              <h2 className="text-2xl font-bold sm:text-3xl">{group}</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <article
                      key={s.slug}
                      id={s.slug}
                      className="flex scroll-mt-24 flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50"
                    >
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span className="text-muted-foreground">{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 font-display text-base font-semibold text-primary">
                        {s.price}
                      </p>
                      <Link
                        to="/contact"
                        className="mt-4 inline-flex justify-center rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
                      >
                        Замовити
                      </Link>
                    </article>
                  ))}
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-border/60 bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Не знаєте, з чого почати?</h2>
            <p className="mt-3 text-muted-foreground">
              Залиште email — надішлемо чеклист «47 пунктів SEO + GEO 2026» і підкажемо, які сервіси
              дадуть результат найшвидше саме вашому сайту.
            </p>
            <div className="mt-6 text-left">
              <LeadForm source="services-page" buttonLabel="Отримати чеклист" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}