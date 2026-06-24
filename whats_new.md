# What's New

A high-level timeline of recent Genius Sheets releases across the web dashboard, Excel add-in, and Google Sheets add-in. Dates reflect when features shipped to production.

<!-- footer
Missing something or want detail on a specific release? Email info@geniussheets.us.
-->

## 2026

### June 2026

#### Spend by Vendor report
Platforms: Excel, Google Sheets

A new Spend by Vendor report totals what you paid each vendor over a period and pulls it straight into a worksheet. Use it to spot your largest payees at a glance or to break spending out by vendor alongside your other Genius Sheets reports.

#### Searchable company selector
Platforms: Excel, Google Sheets

The company dropdown is now sorted alphabetically and type-to-filter searchable, so teams with many QuickBooks or Xero connections can jump to the right company quickly instead of scrolling a long list.

#### 1099 vendor report
Platforms: Excel, Google Sheets

Pull your 1099-eligible QuickBooks vendors and what you paid each of them for the year straight into a worksheet, with a flag for who crossed the $600 threshold. It defaults to the prior calendar year on a cash basis. Use it to reconcile against QuickBooks' own 1099 list before filing. Payments made by card or third-party networks (reported separately on a 1099-K) are not included.

#### Team billing and member management
Platforms: Web dashboard, Backend

Self-serve billing is live: set the number of QuickBooks or Xero company connections and team seats you need, then manage members from the dashboard. Team members share a connection pool, and reconnecting QuickBooks updates every team copy of a company automatically.

#### Xero support in Google Sheets
Platforms: Google Sheets

The Google Sheets add-in now supports Xero companies alongside QuickBooks Online, including P&L, balance sheet, and cash flow reports with the same formula workflow. The classic menu is the default again for a simpler experience.

#### More reliable Refresh Data in Excel
Platforms: Excel

Refresh Data now warms the formula cache before recalculation, which fixes blank cells that sometimes appeared after a refresh. Error reporting is improved for faster troubleshooting.

### May 2026

#### Xero integration (general availability)
Platforms: All platforms

Connect Xero organizations from the dashboard and pull Profit & Loss, Balance Sheet, and Cash Flow data into Excel and Google Sheets with the same GS formulas you already use for QuickBooks. Account names from Xero sync without the internal code prefix for easier formula matching.

#### Auto-refresh when you open a workbook
Platforms: Excel

Excel now refreshes all Genius Sheets formulas automatically when you open a workbook, so numbers are current without an extra click.

### April 2026

#### Reconnect warnings on the dashboard
Platforms: Web dashboard

Companies that need re-authentication are flagged on the dashboard so you can reconnect QuickBooks before formulas start failing in your spreadsheets.

### March 2026

#### Refresh All across every worksheet
Platforms: Excel, Google Sheets

A new **Refresh All** button recalculates every Genius Sheets formula in the workbook, not just the active sheet. Use it when multiple tabs look stale after a sync or reconnect.

#### Better handling of Total column variants
Platforms: Excel, Google Sheets

Reports that label the summary column as either "Total" or "Total for" are now recognized consistently, reducing mismatched numbers on filtered reports.

### January 2026

#### Product analytics and error monitoring
Platforms: Web dashboard, Excel

Anonymous usage and error telemetry help us spot regressions faster. No change to how you use Genius Sheets day to day.

## 2025

### December 2025

#### Xero preview (beta)
Platforms: Web dashboard, Backend

Early Xero OAuth and report sync shipped behind a feature flag while we validated data accuracy against live Xero organizations.

### September 2025

#### Budget formulas
Platforms: Excel, Google Sheets, Backend

New `GS.IS.BUDGET` / `GS_IS_BUDGET` formulas pull budget amounts from QuickBooks Online so you can compare actual vs budget in the same spreadsheet layout. See the [FAQ](/faq#income-statement-budget-gs-is-budget) for syntax and examples.

#### Range formulas for batch pulls
Platforms: Excel, Google Sheets

`GS.IS.RANGE`, `GS.BS.RANGE`, and `GS.CF.RANGE` (and underscore variants) let you pass ranges of categories or dates and get a 2D array back in one formula call.

### August 2025

#### FAQ and in-app support chat
Platforms: Web dashboard, Excel, Google Sheets

A searchable [FAQ](/faq) covers formulas, troubleshooting stale Excel data, and common errors. Live chat support is available from the website while you work through setup.

#### Faster syncs for active accounts
Platforms: Backend

Nightly QuickBooks data pulls now focus on paying and trial accounts, reducing sync lag for active users.

### January 2025

#### Excel add-in store refresh
Platforms: Excel, Web dashboard

Updated Excel marketplace listing, official Intuit Connect branding, and a modernized web app build for better compatibility with current browsers.