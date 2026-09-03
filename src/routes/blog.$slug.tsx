import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { getPost, sortedPosts, formatPostDate } from "@/data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Публікацію не знайдено — seo.pp.ua" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const url = `/blog/${post.slug}`;
    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "uk-UA",
            keywords: post.keywords.join(", "),
            articleSection: post.category,
            author: { "@type": "Organization", name: "seo.pp.ua" },
            publisher: { "@type": "Organization", name: "seo.pp.ua" },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Головна", item: "/" },
              { "@type": "ListItem", position: 2, name: "Блог", item: "/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Публікацію не знайдено</h1>
        <p className="mt-4 text-muted-foreground">
          Можливо, посилання застаріло. Перегляньте всі статті в блозі.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-flex rounded-xl bg-brand-gradient px-5 py-3 font-semibold text-primary-foreground"
        >
          До блогу
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <article>
          <header className="bg-hero grid-lines border-b border-border/60">
            <div className="mx-auto max-w-3xl px-4 py-20">
              <nav aria-label="Хлібні крихти" className="text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">
                  Головна
                </Link>
                <span className="px-2">/</span>
                <Link to="/blog" className="hover:text-foreground">
                  Блог
                </Link>
              </nav>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">
                {post.category}
              </p>
              <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
              <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
              <p className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {post.readingMinutes} хв читання
                </span>
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-3xl px-4 py-16">
            {post.sections.map((s) => (
              <section key={s.heading} className="mb-12">
                <h2 className="text-2xl font-bold">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {s.bullets ? (
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-muted-foreground">
                        <Check className="mt-1 size-4 shrink-0 text-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <aside className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
              <h2 className="font-display text-lg font-semibold">Головне</h2>
              <ul className="mt-4 space-y-2">
                {post.takeaways.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="mt-12 rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">Хочете такий результат на своєму сайті?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Залиште email — надішлемо чеклист «47 пунктів SEO + GEO 2026» і безкоштовну
                діагностику.
              </p>
              <div className="mt-5">
                <LeadForm source={`post-${post.slug}`} buttonLabel="Отримати чеклист" />
              </div>
            </div>

            <Link
              to="/blog"
              className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Усі публікації
            </Link>
          </div>
        </article>

        <section className="border-t border-border/60 bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-bold">Читайте також</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <article
                  key={p.slug}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {p.category}
                  </p>
                  <h3 className="mt-3 text-base font-semibold">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
