import { useState, type FormEvent } from "react";
import { toast } from "sonner";

interface LeadFormProps {
  source: string;
  buttonLabel?: string;
  onDone?: () => void;
}

export function LeadForm({ source, buttonLabel = "Отримати", onDone }: LeadFormProps) {
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const key = "seo-leads";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
      prev.push({ email, site, source, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      /* локальне збереження недоступне */
    }
    setSent(true);
    toast.success("Готово! Надішлемо чеклист і план аудиту на вашу пошту.");
    onDone?.();
  }

  if (sent) {
    return (
      <p className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
        Дякуємо! Перевірте пошту {email} — чеклист уже в дорозі.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor={`email-${source}`}>
        Email
      </label>
      <input
        id={`email-${source}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ваш@email.com"
        className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
      />
      <label className="sr-only" htmlFor={`site-${source}`}>
        Адреса сайту
      </label>
      <input
        id={`site-${source}`}
        type="text"
        value={site}
        onChange={(e) => setSite(e.target.value)}
        placeholder="ваш-сайт.com"
        className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {buttonLabel}
      </button>
    </form>
  );
}