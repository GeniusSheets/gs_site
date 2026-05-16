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

**Pages:** `index.html`, `pricing.html`, `services.html`, `contact.html`, `quickstart.html` — all at the root level.

**SCSS structure:** `assets/css/main.scss` imports all partials from `_sass/`. Each partial maps to a page or component (`_home.scss`, `_pricing.scss`, etc.). Shared design tokens live in `_sass/_variables.scss` (colors, spacing, breakpoints). Breakpoints: 768px (tablet), 480px (mobile).

**JavaScript:** `assets/js/main.js` handles mobile nav toggle, FAQ accordion, and pricing monthly/yearly toggle. All vanilla DOM manipulation.

**Site config:** `_config.yml` holds site title, description, social links, and Sass settings. Changes to `_config.yml` require restarting the dev server.

## Key Conventions

- Brand primary color: `#083c2f` (dark green), accent: `#c9f269` (lime), defined in `_variables.scss`
- Font: Inter (loaded via Google Fonts in `default.html`)
- New page styles go in a new `_sass/_pagename.scss` partial, imported in `assets/css/main.scss`
- Contact form and CTA buttons currently use placeholder `#` links (no backend wired up)
