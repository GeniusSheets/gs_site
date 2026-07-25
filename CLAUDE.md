# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Genius Sheets marketing website — a Jekyll static site for a financial reporting SaaS that integrates QuickBooks Online and Xero with Excel and Google Sheets.

## Build & Development Commands

```bash
bundle install                          # Install Ruby dependencies
bundle exec jekyll serve --livereload   # Local dev server at http://localhost:4000
bundle exec jekyll build                # Production build (output: _site/)
bundle exec jekyll clean                # Remove generated files
```

## Architecture

**Stack:** Jekyll 4.4.1, SCSS (compressed), vanilla JavaScript. No Node.js, no frontend framework, no test suite.

**Layout system:** Single layout (`_layouts/default.html`) with `_includes/header.html` and `_includes/footer.html`. All pages use front matter to set `layout: default`.

**Pages:** `index.html`, `pricing.html`, `services.html`, `contact.html`, `quickstart.html`, `whats-new.html` — all at the root level.

**Release log:** `whats_new.md` at the repo root is the canonical changelog (month-grouped Markdown). `whats-new.html` renders parsed data from `_data/whats_new.json`. After editing the Markdown, run `npm run sync-whats-new` in `gs_web/`. See `_data/README-whats_new.md`.

**Agent duty:** When a major user-facing feature ships (across any GS repo), add an entry to `whats_new.md`, sync, and commit the Markdown plus generated JSON. Skip minor bugfixes and internal-only changes. See workspace `CLAUDE.md` for criteria.

**SCSS structure:** `assets/css/main.scss` imports all partials from `_sass/`. Each partial maps to a page or component (`_home.scss`, `_pricing.scss`, etc.). Shared design tokens live in `_sass/_variables.scss` (colors, spacing, breakpoints). Breakpoints: 768px (tablet), 480px (mobile).

**JavaScript:** `assets/js/main.js` handles mobile nav toggle, FAQ accordion, the contact form AJAX submit, the video lightbox, the sticky mobile CTA, and conversion instrumentation. All vanilla DOM manipulation.

**Conversion instrumentation:** every outbound link to `app.geniussheets.com` is auto-tagged with UTM params (`utm_campaign` = page slug, `utm_content` = `data-cta-location`) and fires a `signup_click` event to both GA4 and PostHog. Mark CTAs with `data-cta="signup|login|demo|contact"` and `data-cta-location="<where on the page>"` so new buttons are tracked without touching JS. Events emitted: `signup_click`, `login_click`, `demo_click`, `pricing_view`, `video_play`, `faq_open`, `contact_submit`.

**Video links:** add `data-video="<embed url>"` and `data-video-title` to open in the on-page lightbox instead of sending visitors off site. Keep the `href` as a fallback for no-JS.

**Sticky CTA:** `_includes/sticky-cta.html` renders on every page below 768px. Set `hide_sticky_cta: true` in a page's front matter to suppress it (used on `contact.html`, where the page is already the conversion target).

**Site config:** `_config.yml` holds site title, description, social links, and Sass settings. Changes to `_config.yml` require restarting the dev server.

## Key Conventions

- Brand primary color: `#083c2f` (dark green), accent: `#c9f269` (lime), defined in `_variables.scss`
- Font: Inter (loaded via Google Fonts in `default.html`)
- New page styles go in a new `_sass/_pagename.scss` partial, imported in `assets/css/main.scss`
- Contact form and CTA buttons currently use placeholder `#` links (no backend wired up)
- Never use em-dashes (`—`, `&mdash;`, `&#8212;`) in website copy. Use commas, colons, parentheses, or split into separate sentences instead.
