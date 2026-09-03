import { useEffect, useState } from "react";
import { X, Gift } from "lucide-react";
import { LeadForm } from "./LeadForm";

const STORAGE_KEY = "seo-exit-lead-shown";

export function ExitIntentLead() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") return;

    const show = () => {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
      localStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") show();
    };
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY - 240 && y < 400) show();
      lastY = y;
    };

    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-lead-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-glow">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Закрити"
          className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Gift className="size-3.5" /> Безкоштовно
        </span>
        <h2 id="exit-lead-title" className="mt-4 text-2xl font-bold">
          Заберіть чеклист «47 пунктів SEO + GEO 2026»
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Перед тим як піти — залиште email. Надішлемо чеклист технічного аудиту, шаблон llms.txt і
          міні-план, як потрапити у відповіді ChatGPT та AI Overviews.
        </p>
        <div className="mt-6">
          <LeadForm source="exit-intent" buttonLabel="Хочу чеклист" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Без спаму. Відписка одним кліком.</p>
      </div>
    </div>
  );
}