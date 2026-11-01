# What's New

A high-level timeline of recent Genius Sheets releases across the web dashboard, Excel add-in, and Google Sheets add-in. Dates reflect when features shipped to production.

<!-- footer
Missing something or want detail on a specific release? Email info@geniussheets.us.
-->

## 2026

### November 2026

#### Account activity, date presets, and clearer formula errors in Google Sheets
Platforms: Google Sheets

The Google Sheets add-in now has the Account Activity panel from Excel. A new Account Activity button on the main menu lists chart of accounts changes from QuickBooks, such as accounts added, renamed, moved, merged, or deactivated, for the selected company or for all of your companies. You can also show journal entries, bills, expenses, sales, and transfers, and a badge counts changes you haven't seen yet. Reports now have one-click date ranges (YTD, Last month, Last quarter, Last year, and This month) and open on year to date, through the end of the current month. A new calendar opens on the year first, so earlier periods are a few clicks away. When Genius Sheets formulas can't calculate, the sidebar now says why: you're signed out, your session expired, your plan doesn't include filters, a date in the formula isn't valid, or your accounting data couldn't be reached. Where signing in again fixes it, you can do that right from the message.

#### Full account names for journal entry imports
Platforms: Excel

Balance Sheet and Profit and Loss reports can now include each account's full QuickBooks name, ready to paste into a journal entry import. Turn on Full Account Names in the Reports pane, and the report gets a column with names in the format QuickBooks' import expects, such as "Investment:Capital Partners Partnership". Accounts with an account number get it in front, once: "5332 Insurance Expense:Homeowners Insurance". Companies that number some accounts and not others come out right, account by account. The rest of the report, including any Genius Sheets formulas, stays where it was.

### October 2026

#### Date presets and clearer formula errors in Excel
Platforms: Excel

Reports now have one-click date ranges: YTD, Last month, Last quarter, Last year, and This month. Reports now open on year to date, from January 1 through the end of the current month. When Genius Sheets formulas can't update, the add-in now says why: you're signed out, your session expired, your plan doesn't include filters, or your accounting data couldn't be reached. Where it helps, you can sign in again right from the message.

#### Account activity: see chart of accounts changes as they happen
Platforms: Web dashboard, Excel

When someone adds, renames, moves, merges, or deactivates an account in QuickBooks, Genius Sheets now records it on the new Activity page. That makes it easy to see when a formula report needs a new row or an updated label. Each change shows the company, the account's full name, and what happened, such as "Renamed from Travel" or "Moved under Expenses:Office". The page opens on chart of accounts changes from the last 30 days. You can filter by company, date range, or type of change, and also show journal entries, bills, expenses, sales, and transfers. In Excel, a new Activity button lists the same changes for the selected company or for all of your companies, and a badge counts changes you haven't seen yet. Activity is recorded from QuickBooks starting this month.

#### Full alerts for every plan
Platforms: Web dashboard

Full alerts are now available on every plan for $5/month per connection, and Alerts has its own link in the top navigation. On top of the Basic alerts included with every plan, Full alerts watch cash runway for each company and across all of them, expense spikes, unusually large expenses, gross margin drops, receivables growing faster than revenue, and variance against your QuickBooks budgets, with thresholds you can adjust to match how your business runs. Add or remove them anytime from your team's billing page, and the price follows your connection count. Enterprise plans include Full alerts.

### September 2026

#### Alerts: daily checks on your books (beta)
Platforms: Web dashboard

Genius Sheets now checks each connected company's books every day and flags what needs attention on the new Alerts page. Basic alerts, included with every plan, cover a cash balance dropping below a floor, a bank account going overdrawn, a month closing at a net loss, and a QuickBooks or Xero connection that needs reconnecting. Pick a company to see its alerts, and turn individual alerts on or off for your team.

#### Budget vs Actual report
Platforms: Excel, Google Sheets

Compare your QuickBooks budget to actuals without leaving your spreadsheet. The new Budget vs Actual report builds a worksheet with Actual, Budget, Variance $, and Variance % for every account, month by month, plus a year-to-date summary. Pick a company, choose one of your QuickBooks budgets, set a date range, and the report fills in with live formulas that recalculate as your data refreshes. In Google Sheets, you can also lay out the whole period in a single column, the date range defaults to the year to date through the last closed month, and the report option only appears for companies that have a budget in QuickBooks. Quarterly and annual QuickBooks budgets are supported too: their amounts are spread evenly across the months they cover, so every budget shows up in your monthly view.

### August 2026

#### Comped seats shown on team billing
Platforms: Web dashboard

The team billing card now shows any complimentary seats on your plan alongside your paid seats, so your available connections and members always add up correctly.

### June 2026

#### AI Analyst: ask your financials in plain English
Platforms: Web dashboard

Ask questions about your finances in plain English and get instant answers, right in the web dashboard. The new AI Analyst tab reads your live QuickBooks data (Profit and Loss, balance sheet, cash flow, invoices, and customers) and answers questions like "What were my expenses last month?" or "Which invoices are overdue?" Pick a company, type a question, and get a clear, formatted answer. Conversations are kept per company so you can pick up where you left off.

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