import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Gauge, LineChart, Search, Sparkles, Check } from "lucide-react";
import heroImage from "@/assets/hero-seo.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { services } from "@/data/services";

const title = "SEO та GEO агенція seo.pp.ua — просування в Google і AI-пошуку";
const description =
  "Виводимо сайти в топ Google і в відповіді ChatGPT, Gemini та AI Overviews: технічний аудит, GEO, llms.txt, Core Web Vitals, контент, лінкбілдинг та аналітика.";

const faq = [
  {
    q: "Що таке GEO і чим воно відрізняється від SEO?",
    a: "SEO — це видимість у класичній видачі Google. GEO (Generative Engine Optimization) — це оптимізація під генеративні системи: ChatGPT, Gemini, Perplexity та AI Overviews. Технічна база спільна, але GEO додатково вимагає машиночитної структури, фактологічних блоків, чітких визначень і джерел, які модель може процитувати.",
  },
  {
    q: "Через скільки часу будуть результати?",
    a: "Технічні правки і швидкість дають ефект за 2–6 тижнів. Стабільне зростання органічного трафіку зазвичай видно з 3–4 місяця, залежно від конкуренції в ніші та поточного стану сайту.",
  },
  {
    q: "Чи потрібен файл llms.txt?",
    a: "Він не є офіційним стандартом Google, але допомагає AI-агентам швидше зрозуміти структуру сайту та ключові сторінки. Ми створюємо llms.txt разом із коректними правилами для AI-краулерів у robots.txt.",
  },
  {
    q: "Як ви звітуєте про роботу?",
    a: "Щомісяця: динаміка позицій і трафіку з Search Console та GA4, виконані задачі, отримані посилання, план на наступний період. Усе в одному дашборді, до якого у вас є доступ.",
  },
];

const pillars = [
  {
    icon: Search,
    title: "Класичне SEO",
    text: "Семантика, структура, контент і посилання — усе, що дає стабільні позиції в Google.",
  },
  {
    icon: Bot,
    title: "GEO та LLM",
    text: "Робимо сайт джерелом, яке цитують ChatGPT, Perplexity, Gemini та AI Overviews.",
  },
  {
    icon: Gauge,
    title: "Технічна база",
    text: "Core Web Vitals, індексація, Schema.org, чисті канонікали й sitemap.",
  },
  {
    icon: LineChart,
    title: "Прозора аналітика",
    text: "GA4, Search Console і дашборд, де видно запити, трафік та заявки.",
  },
];

const steps = [
  { n: "01", t: "Діагностика", d: "Аналізуємо видимість, техстан, конкурентів і попит у ніші." },
  { n: "02", t: "Стратегія", d: "Складаємо roadmap SEO + GEO з пріоритетами та очікуваним впливом." },
  { n: "03", t: "Впровадження", d: "Технічні правки, контент, розмітка, посилання, llms.txt." },
  { n: "04", t: "Масштабування", d: "Щомісячні ітерації на основі даних Search Console і GA4." },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "seo.pp.ua",
          description,
          url: "/",
          email: "hello@seo.pp.ua",
          areaServed: "UA",
          address: { "@type": "PostalAddress", addressLocality: "Київ", addressCountry: "UA" },
          knowsAbout: ["SEO", "GEO", "Generative Engine Optimization", "Core Web Vitals", "llms.txt"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-hero grid-lines border-b border-border/60">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" /> SEO + GEO для AI-пошуку 2026
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Google полюбить ваш сайт. <span className="text-brand-gradient">І AI — теж.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Безкоштовний аудит <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold transition-colors hover:border-primary/60 hover:text-primary"
                >
                  Усі послуги
                </Link>
              </div>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
                {[
                  ["12", "SEO-сервісів"],
                  ["200+", "перевірок в аудиті"],
                  ["24 год", "відповідь на заявку"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-display text-2xl font-bold text-primary">{v}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <img
              src={heroImage}
              alt="Графік зростання органічного трафіку та AI-пошукові запити"
              width={1536}
              height={1024}
              className="rounded-3xl border border-border shadow-glow"
            />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
            Чотири напрями, які разом дають зростання
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50"
              >
                <p.icon className="size-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border/60 bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Популярні SEO-сервіси</h2>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Дивитись усі 12 послуг <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((s) => (
                <article
                  key={s.slug}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.group}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
                  <Link
                    to="/services"
                    hash={s.slug}
                    className="mt-4 text-sm font-semibold text-primary hover:underline"
                  >
                    Детальніше
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">Як ми працюємо</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-3xl font-bold text-primary/60">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-border/60 bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-20">
            <h2 className="text-3xl font-bold sm:text-4xl">Часті питання</h2>
            <div className="mt-8 divide-y divide-border">
              {faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="cursor-pointer list-none font-semibold marker:hidden">
                    <span className="flex items-start gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-primary" />
                      {item.q}
                    </span>
                  </summary>
                  <p className="mt-3 pl-7 text-sm text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Чеклист «47 пунктів SEO + GEO 2026» — безкоштовно
          </h2>
          <p className="mt-4 text-muted-foreground">
            Технічний чеклист, шаблон llms.txt і план, як потрапити у відповіді ChatGPT та AI
            Overviews.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <LeadForm source="home-cta" buttonLabel="Забрати чеклист" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
