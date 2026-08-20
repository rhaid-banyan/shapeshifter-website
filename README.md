# Shapeshifter Website

Static site for shapeshifter.com, modeled on geminishale.com. No build step —
open `index.html` in a browser (or `python3 -m http.server` for the video to play),
push to GitHub for Pages hosting.

**Launch prep completed 2026-08-20:** noindex tags REMOVED (site is now indexable
once served), robots.txt + sitemap.xml added (AI retrieval/training bots explicitly
allowed), Organization + WebSite JSON-LD on every page, FAQPage schema on Resources,
canonical + Open Graph tags on every page, `/for-ai/overview/` canonical-facts page
linked from the footer, and all remaining image swap-labels stripped.

## Pages

| File | Nav label |
|------|-----------|
| `index.html` | Home |
| `platform.html` | Platform (the Prophet product page) |
| `solutions.html` | Solutions |
| `how-we-work.html` | How We Work |
| `customers.html` | Customers |
| `resources.html` | Resources (anchors: `#faq`, `#case-studies`, `#nerd-corner`) |
| `company.html` | Company |
| `contact.html` | Contact Sales (header CTA + all bottom-of-page CTAs) |
| `for-ai/overview/` | Canonical facts for AI assistants (footer link, not in nav) |

Plus `robots.txt` and `sitemap.xml` at the root (canonical domain baked in:
`https://www.shapeshifter.com`). If the site launches on a different domain,
update the URLs in robots.txt, sitemap.xml, the JSON-LD blocks, and the
canonical/og tags in each page head.

## Design system

Black `#000000` / accent `#DD336D` / gray `#5A5B5F` / stone `#DEDED9`.
Poppins SemiBold headings, self-hosted in `assets/fonts/`. Header fixed and dark
(white-text logo); footer light (black-text logo); sections alternate dark/light.
Animations: scroll fade-ins, rotating shape rows atop black sections, logo conveyor
belts (Customers), illustrated 3-step diagram with line animations (Home + Platform),
count-up numbers (Home value cards, Customers stats). CSS is versioned in the
`<link>` tags (`style.css?v=4`) — bump the number on every meaningful CSS change.

Naming: Shapeshifter = company · **Prophet** = product · Infinity Engine = Prophet's
optimization core.

## STILL OPEN BEFORE / SHORTLY AFTER GO-LIVE

**Permissions (site is now indexable — these are live claims):**
- Kiabi & Kontoor quotes (Customers page) came from confidential IcebergIQ
  due-diligence interviews (Mar 2023) — customer consent still needed
- VF quote (How We Work) — same source, same requirement
- Brand + factory logo belts: usage based on public LinkedIn collaborations
  (Ryan approved Aug 2026); no-affiliation disclaimer is on the page
- Hirdaramani quote + photo: supplied by Shapeshifter — treated as cleared

**Claims sheet (verify with Shapeshifter):**
- "Over 1 billion garments optimized" and "550+ smart factories" (client-supplied,
  not yet substantiated) — note hero stat currently shows 55+ manufacturers
- 1–3% fabric / 10–15% cutting / 100% automation / NPS 83 / "20+ years"

**Functional:**
- Contact form is still a mock (shows an alert) — wire to Formspree/CRM when chosen
- Privacy & Terms footer links are stubs (`#`) — Legal to supply pages
- Platform CTA mentions the "AI upload assistant" — link its URL when live
- LinkedIn handle (`shapeshiftersocial`) — confirm; it's in the footer and the JSON-LD sameAs
- Hero photo license (`assets/img/hero-factory.jpg`) — confirm web use
- Case-study cards (Customers) use temporary Unsplash stock; "coming soon" copy —
  replace when real case studies exist
- Video loop idea (1:36–1:45 of older Prophet film) — parked, needs MP4

## Structure

```
shapeshifter-site/
├── index.html … contact.html    (8 pages)
├── for-ai/overview/index.html   (AI canonical-facts page)
├── robots.txt · sitemap.xml
├── README.md
└── assets/
    ├── css/style.css            (design system)
    ├── js/main.js               (reveal, shapes, belts, count-ups, accordion, nav)
    ├── fonts/                   (Poppins 400/600 woff2, self-hosted)
    └── img/                     (logos, stock photos, placeholder SVGs)
```
