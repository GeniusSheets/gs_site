# What's New release log

**Canonical file:** `gs_site/whats_new.md` (plain Markdown)

## Format

```markdown
# What's New

Intro paragraph(s).

<!-- footer
Footer note at the bottom of the page.
-->

## 2026

### June 2026

#### Release headline
Platforms: Web dashboard, Excel

Body paragraph. Supports `code`, [links](/faq), and **bold**.

#### Another release that month
Platforms: Excel

Another paragraph.

### May 2026

#### Next month release
Platforms: All platforms

Body text.
```

**Rules**

- `## YYYY` starts a year section (newest year first).
- `### Month YYYY` groups releases for that month (newest month first).
- `#### Title` is one release within the month.
- `Platforms:` line is optional; comma-separated tags.
- Body is everything until the next `####`, `###`, or `##`.

## After editing

From `gs_web/`:

```bash
npm run sync-whats-new
```

Commit `whats_new.md` plus the generated `_data/whats_new.json` and `src/data/whats_new.js`.
