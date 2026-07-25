# Marketing Site — Deferred Work Plan

Budget cap: **~$25/mo**. Already shipped (see commits): SEO plugins (`jekyll-seo-tag`, `jekyll-sitemap`), robots.txt, JSON-LD structured data (Organization, SoftwareApplication, FAQPage), Formspree-wired contact form, PostHog session replay snippet.

## Configuration still needed

Two `_config.yml` keys are empty until accounts are provisioned:

- `formspree_id` — create a form at https://formspree.io/ (free tier: 50 submissions/mo). Paste the ID (the slug after `/f/` in the endpoint URL). Until set, contact page shows a mailto fallback.
- `posthog_key` — copy the **Project API Key** from https://us.posthog.com/project/settings. `posthog_host` defaults to `https://us.i.posthog.com`; change if using EU cloud.

After setting, rebuild: `bundle exec jekyll build`.

## Post-launch verification

- [ ] Submit `https://geniussheets.us/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
- [ ] Submit the sitemap in [Bing Webmaster Tools](https://www.bing.com/webmasters) (free, separate index).
- [ ] Test structured data with the [Rich Results Test](https://search.google.com/test/rich-results) for `/` and `/pricing`.
- [ ] Confirm Formspree double-opt-in email arrives; whitelist sender domain.
- [ ] Confirm PostHog dashboard shows sessions + autocaptured clicks.

## Deferred work — in priority order

### 1. Lead magnet (half day)
Create a PDF cheatsheet ("QuickBooks → Excel reporting in 5 steps" or "Xero to Google Sheets without copy-paste"). Gate behind email capture.
- Add a slim email-capture section to `/` (above pricing) and `/services`.
- POST to a second Formspree form OR a Brevo/MailerLite list (free up to 300–1000 contacts).
- Redirect to a `/thanks` page that links the PDF and triggers `lead_capture` GA4 + PostHog events.

### 2. Conversion tracking polish — DONE
Shipped in `assets/js/main.js`: `signup_click`, `login_click`, `demo_click`, `pricing_view`, `video_play`, `faq_open`, `contact_submit`, all fanned out to GA4 and PostHog. Outbound `app.geniussheets.com` links are auto-tagged with UTM params (`utm_campaign` = page, `utm_content` = CTA location), so signups attribute back to the exact button that produced them.

Still open:
- `cheatsheet_download` event, once the lead magnet in item 1 exists.
- Verify events land in both GA4 and PostHog after deploy, then build a funnel: `pricing_view` → `signup_click` → signup.
- PostHog feature flags for copy/pricing A/B tests. First test worth running: hero CTA "Start Free Trial" vs "Start For Free" vs "Start 14-Day Free Trial".

### 3. Blog (`_posts/`) — biggest organic lever
Jekyll handles `/blog/` natively. Restore the commented blog-preview block in `index.html` once 3+ posts exist.

First 3 posts (long-tail SEO targets):
- "How to export QuickBooks data to Excel automatically (without Spreadsheet Sync)"
- "Xero + Google Sheets: a live integration without manual exports"
- "Building a multi-client financial dashboard for fractional CFOs"

Each post: 1500+ words, one comparison table, screenshots, internal links to `/pricing` and `/quickstart`.

### 4. Comparison / alternative pages
After blog has 1–2 months of Search Console data showing what people actually search:
- `/vs/quickbooks-spreadsheet-sync`
- `/vs/xero-export`
- `/alternatives/g-accon`, `/alternatives/liveflow`

These rank highly for high-intent searches.

### 5. Social proof
- Customer logos band (you already have `gregorys.png`, `airwavz.png`, etc. — currently in logo carousel; consider a static "Trusted by" strip above the fold too).
- G2 / Capterra / GetApp badges once review count justifies.
- Pull 2–3 more testimonials beyond Courtney/Ben/Seth.

### 6. Paid traffic experiment (~$15–20/mo from budget)
Skip Google Search for now — CPCs for "quickbooks excel" are $3–8 and burn budget fast at this spend.
Try first:
- **Reddit Ads** in r/Accounting, r/Bookkeeping, r/FPandA. Sub-$1 CPCs typical. Promote a blog post, not the homepage.
- **LinkedIn organic** by Joe — post weekly in CFO/accountant communities. Free.
Measure: signups attributed via UTM tags + PostHog session start URL.

### 7. Misc nice-to-haves
- Switch hero CTA copy variants and A/B in PostHog (e.g., "Start For Free" vs "Start 14-Day Free Trial").
- Add `<link rel="alternate" hreflang>` if you ever localize.
- Add per-page `image:` front matter (1200×630 OG image) for nicer link previews when shared. `jekyll-seo-tag` will pick it up automatically.
- Newsletter — currently commented out in footer. Wire up to Brevo/MailerLite once you have content cadence to fill it.
