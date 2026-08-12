# Shapeshifter Website — Full Mockup

> ⚠️ **BEFORE GOING LIVE:** every page currently contains
> `<meta name="robots" content="noindex, nofollow">` so the draft stays out of
> search engines and AI crawlers while shared via unlisted URL. **Remove that
> line from all 8 HTML pages at launch** (search the repo for `noindex`) — the
> site is invisible to Google and AI assistants until you do.

Self-contained static mockup of the redesigned shapeshifter.com.
No build step, no dependencies — open `index.html` in a browser, or push this folder to GitHub
and serve with GitHub Pages (Settings → Pages → deploy from branch).

## Pages

| File | Nav label |
|------|-----------|
| `index.html` | Home |
| `platform.html` | Platform (the Prophet product page) |
| `solutions.html` | Solutions |
| `how-we-work.html` | How We Work |
| `customers.html` | Customers |
| `resources.html` | Resources (anchors: `#faq`, `#case-studies`, `#news`, `#blog`, `#nerd-corner`) |
| `company.html` | Company |
| `contact.html` | Contact Sales (header CTA + all bottom-of-page CTAs) |

Design system: black `#000000` / accent `#DD336D` / gray `#5A5B5F` / stone `#DEDED9`.
Logo PNGs in `assets/img/` have the mark recolored to `#DD336D` (wordmark untouched).
Headings use Poppins SemiBold, self-hosted in `assets/fonts/` (no external font CDN).
Header is fixed and always dark (white-text logo); footer is light (black-text logo).
Sections alternate dark/light per page. Scroll-triggered fade-ins, image hover motion, and
rows of small rotating shapes (squares / triangles / hexagons) between sections are in
`assets/js/main.js` — rotation speed is set per-shape via `data-rs` attributes in the HTML.

Naming: Shapeshifter is the company, **Prophet** is the product (Platform page), and the
Infinity Engine is Prophet's optimization core — keep that hierarchy in any new copy.

## Video

The film is embedded from YouTube (`youtube.com/embed/EPqxwD7VMgI`) on Home and Platform,
with a referrer policy set and a "Watch on YouTube" fallback link. Note: opening pages via
`file://` can still show a player error (YouTube blocks embeds with no referrer) — serve the
folder over http(s) (GitHub Pages, or `python3 -m http.server`) and it plays. Keep YouTube
for production — free adaptive streaming; GitHub Pages can't stream video files well.

## Images — swap list

The homepage hero (`assets/img/hero-factory.jpg`) is a licensed stock photo stored locally
(web-optimized ~170KB). All other photos hotlink from Unsplash (free license) with an automatic
local fallback (`assets/img/placeholder-photo.svg`) if offline. Every swappable image carries
an on-image label:

- **"STOCK · swap:"** (dark pill) — stock is acceptable short-term; swap when bespoke exists.
- **"BESPOKE NEEDED:"** (coral pill) — must be replaced before launch:
  - All product-UI mocks (`assets/img/placeholder-ui.svg`) → real Shapeshifter screenshots (Home, Platform)
  - Company page → Hamish / Auckland team photography
  - Customers page case-study cards → real customer imagery (with permission)

Remove the label pills at launch by deleting the `<figcaption class="swap-tag">` elements.

## Pre-launch checklist (do not skip)

**Verify (canonical claims sheet — one source per number):**
- 1–3% less fabric · 10–15% faster cutting · 100% automation
- 55+ customers · NPS 83 · "20+ years"
- Pilot pricing language ("fraction of the full subscription")
- FAQ answers (implementation timeline, integration claims)

**Permissions (written customer consent):**
- All three testimonial quotes (currently anonymized to role + descriptor)
- Customer logo wall on `customers.html` (placeholder chips until cleared)
- Any customer-identifiable photography

**Legal review (per Banyan Comparative Marketing Guidelines, Jul 2026):**
- Any future mention of competitor names (Gerber AccuMark etc.) — currently the site
  says only "your existing CAD/CAM environment"
- Brand-name references on Customers page ("factories producing for…") — phrase so no
  affiliation is implied
- Comparison/alternatives pages (phase 2) — Legal before drafting

**Technical at production build:**
- REMOVE the `<meta name="robots" content="noindex, nofollow">` draft tag from every page (added so the draft stays out of search engines while shared via unlisted URL)
- Wire the contact form to CRM/form service (`contact.html` — currently a mock alert)
- robots.txt (allow AI retrieval/live-fetch bots + Sitemap line), sitemap.xml
- Organization + WebSite JSON-LD on all pages; FAQPage schema on `resources.html#faq`
- `/for-ai/overview` canonical-facts page, linked from footer
- Real Privacy/Terms pages (footer links are stubs)
- LinkedIn URL — currently points to linkedin.com/company/shapeshiftersocial; confirm handle
- Homepage hero photo: `assets/img/hero-factory.jpg` (supervisor with tablet on sewing floor) — CONFIRM the stock license covers web use before launch.

## Structure

```
shapeshifter-site/
├── index.html … contact.html   (8 pages)
├── website-readme.md            (this file)
├── assets/
│   ├── css/style.css           (design system)
│   ├── js/main.js              (reveal, parallax shapes, accordion, nav)
│   ├── fonts/                  (Poppins 400/600 woff2, self-hosted)
│   └── img/                    (logos + placeholder SVGs)
└── README.md
```
