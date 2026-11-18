# PAIDLANCER — paidlancer.in

Personal brand + digital marketing website for **Peddiraju Bikkavolu (Raju)**, Hyderabad.
React 18 · TypeScript · Vite · Tailwind CSS · React Router · Lucide icons. Every page is **prerendered to static HTML** (real content, meta tags, schema) and then hydrated, so it is fast and fully indexable.

## Quick start

```bash
npm install
cp .env.example .env      # fill in what you have; empty values simply switch features off
npm run dev               # http://localhost:5173
npm run build             # typecheck → client build → SSR build → prerender 35 pages + sitemap.xml + robots.txt
npm run preview           # serve the production build locally
```

`npm run build` outputs everything to **`dist/`** — upload the *contents* of that folder to your hosting.

## Deploying

- **Hostinger / cPanel (Apache):** upload `dist/*` into `public_html`. `.htaccess` is included (HTTPS, trailing slashes, 404 page, caching). Add 301 redirects for any old WordPress blog URLs at the marked place in `.htaccess`.
- **Netlify / Cloudflare Pages / Vercel:** build command `npm run build`, publish directory `dist`. `_headers` sets caching.
- After launch: submit `https://paidlancer.in/sitemap.xml` in Google Search Console.

## Environment variables (`.env`)

| Variable | What it does |
|---|---|
| `VITE_SITE_URL` | Canonical domain (default `https://paidlancer.in`) |
| `VITE_GA4_ID` | Google Analytics 4 measurement ID (`G-…`) |
| `VITE_GTM_ID` | Google Tag Manager container (`GTM-…`) |
| `VITE_META_PIXEL_ID` | Meta Pixel ID |
| `VITE_GSC_VERIFICATION` | Search Console HTML-tag verification code |
| `VITE_FORM_ENDPOINT` | JSON POST endpoint for the booking + discovery forms (Formspree, Web3Forms, a Supabase Edge Function…). Empty = forms hand off to WhatsApp/email, never a fake “success”. |
| `VITE_NEWSLETTER_ENDPOINT` | JSON POST endpoint for newsletter sign-ups. Empty = opens an email to you. |
| `VITE_PAGESPEED_API_KEY` | Google PageSpeed Insights API key for the Website Growth Analyzer. Works without one, but the shared quota runs out quickly — create a free key in Google Cloud Console. |

Tracked events (GA4 / GTM dataLayer / Meta Pixel): `page_view`, `whatsapp_click`, `call_click`, `email_click`, `cta_click`, `form_submit`, `calculator_run`, `audit_run`, `newsletter_subscribe`.

## Where to edit content

| What | File |
|---|---|
| Phone, email, address, stats, social links | `src/data/site.ts` |
| 12 services + 7 SEO landing pages | `src/data/services.ts` |
| Clients / portfolio, testimonials, pricing, FAQs, process | `src/data/content.ts` |
| Blog articles | `src/data/blog/posts-a.ts`, `posts-b.ts` (markdown-lite: `##`, `###`, `-`, `1.`, `**bold**`, `[link](/path/)`) |
| Photos | `src/assets/img/` (WebP, multiple sizes) |

### Things to fill in before launch
1. **Portfolio:** for each client in `content.ts`, add the work you did to `categories` (e.g. `['Website Development', 'SEO Projects']`) — the project-type filter appears automatically — and add a screenshot (`screenshot: import(...)`). Industries were inferred from client names; please double-check them.
2. **Social links:** add Instagram / LinkedIn / YouTube URLs to `site.socials` (they also flow into schema `sameAs`).
3. **PIN code:** add `postalCode` in `site.ts` for complete LocalBusiness schema.
4. **Case studies:** publish only with client permission; add as blog posts in the `case-studies` category (that category is `noindex` until it has posts).

## Adding a blog article
Add an object to `posts-b.ts` (slug, title, metaTitle, metaDescription, category, date, excerpt, coverAlt, body, optional faqs). The route, sitemap entry, schema, TOC, reading time, related posts and category page are generated automatically on the next build.

## Notes
- No stock photos, no fabricated stats, ratings or results. The budget planner is labelled indicative; the analyzer uses Google’s real Lighthouse data or shows an error.
- Reduced-motion users get a static experience; animations pause off-screen.
