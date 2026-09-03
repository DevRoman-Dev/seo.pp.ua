# Деплой на Vercel

1. Завантажте проєкт у Git-репозиторій (GitHub/GitLab/Bitbucket).
2. У Vercel: **Add New → Project → Import** цей репозиторій.
3. Налаштування збірки підхопляться з `vercel.json`:
   - Build Command: `NITRO_PRESET=vercel npm run build`
   - Output Directory: `.vercel/output`
   - Framework Preset: Other (`null`)
4. Натисніть **Deploy**. Після успішної збірки сайт доступний на `*.vercel.app`.
5. Домен: **Project → Settings → Domains → Add** → `seo.pp.ua` (і `www.seo.pp.ua`).
   У DNS-реєстратора додайте записи, які покаже Vercel:
   - `A` для `seo.pp.ua` → `76.76.21.21`
   - `CNAME` для `www` → `cname.vercel-dns.com`
6. Дочекайтесь видачі SSL-сертифіката (автоматично, кілька хвилин).
7. Перевірте `https://seo.pp.ua/sitemap.xml`, `/robots.txt`, `/llms.txt` та `/blog`.

Змінні середовища (якщо додаватимете) — **Settings → Environment Variables**;
клієнтські мають починатися з `VITE_`.
