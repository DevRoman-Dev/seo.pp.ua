import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Clock, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";

const title = "Контакти — безкоштовний SEO-аудит сайту | seo.pp.ua";
const description =
  "Замовте безкоштовну SEO та GEO діагностику сайту: напишіть на hello@seo.pp.ua або залиште email — відповідаємо протягом одного робочого дня.";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: title,
          description,
        }),
      },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="bg-hero grid-lines">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <nav aria-label="Хлібні крихти" className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Головна
              </Link>
              <span className="px-2">/</span>
              <span className="text-foreground">Контакти</span>
            </nav>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
              Безкоштовна <span className="text-brand-gradient">діагностика</span> вашого сайту
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Подивимось видимість у Google, технічні помилки та готовність сайту до AI-пошуку.
              Надішлемо короткий висновок з 3–5 пріоритетними задачами.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-primary" />
                <a href="mailto:hello@seo.pp.ua" className="hover:text-primary">
                  hello@seo.pp.ua
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-5 text-primary" />
                <span className="text-muted-foreground">Пн–Пт, 10:00–19:00 (Київ)</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-5 text-primary" />
                <span className="text-muted-foreground">Київ, Україна — працюємо віддалено</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <h2 className="text-xl font-semibold">Залишити заявку</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Вкажіть email і адресу сайту — повернемось із висновком протягом робочого дня.
            </p>
            <div className="mt-6">
              <LeadForm source="contact-page" buttonLabel="Надіслати" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Надсилаючи заявку, ви погоджуєтесь на обробку контактних даних для звʼязку.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
