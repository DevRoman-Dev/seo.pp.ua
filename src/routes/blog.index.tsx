import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { sortedPosts, postCategories, formatPostDate } from "@/data/posts";

const title = "Блог про SEO та GEO/LLM: гайди, чеклисти, практика — seo.pp.ua";
const description =
  "Статті про просування в Google та оптимізацію під AI-пошук: GEO, llms.txt, Core Web Vitals, семантика, лінкбілдинг та аналітика GA4 — з практичними чеклистами.";

export const Route = createFileRoute("/blog/")({
  component: BlogIndexPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Блог seo.pp.ua",
          description,
          blogPost: sortedPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            url: `/blog/${p.slug}`,
          })),
        }),
      },
    ],
  }),
});

function BlogIndexPage() {
  const [featured, ...rest] = sortedPosts;

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
              <span className="text-foreground">Блог</span>
            </nav>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold sm:text-5xl">
              Блог про SEO та <span className="text-brand-gradient">GEO/LLM</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {postCategories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {featured ? (
          <section className="mx-auto max-w-6xl px-4 py-16">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group block rounded-3xl border border-border bg-card p-8 shadow-card transition-colors hover:border-primary/60"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {featured.category} · нове
              </p>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold sm:text-3xl">{featured.title}</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">{featured.excerpt}</p>
              <p className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <time dateTime={featured.date}>{formatPostDate(featured.date)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {featured.readingMinutes} хв
                </span>
                <span className="flex items-center gap-1 text-primary">
                  Читати
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </p>
            </Link>
          </section>
        ) : null}

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Усі публікації</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <article
                key={p.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {p.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <p className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={p.date}>{formatPostDate(p.date)}</time>
                  <span>·</span>
                  <span>{p.readingMinutes} хв читання</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border/60 bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Розсилка для практиків</h2>
            <p className="mt-3 text-muted-foreground">
              Раз на два тижні — розбір змін в Google і AI-пошуку та чеклист «47 пунктів SEO + GEO
              2026».
            </p>
            <div className="mt-6 text-left">
              <LeadForm source="blog-index" buttonLabel="Підписатися" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
