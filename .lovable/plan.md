

## Chathu Super Admin Dashboard — Comprehensive Build Plan

### Design System
- Same dark theme from vendor dashboard: black background, dark cards, lime-green (`hsl(72, 85%, 71%)`) accents
- Inter font family, consistent with vendor app
- Desktop: persistent left sidebar with collapsible groups | Mobile: bottom navigation bar
- All data is mock/dummy data for now — ready to connect to a backend later

### Build Order (across multiple messages)

**Phase 1 — Foundation + Overview**
- Admin sidebar with all 12 sections, collapsible sub-groups, mobile bottom nav
- Overview page: stat cards with trend indicators, revenue line chart (7d/30d/90d/1y toggle), orders bar chart, recent orders table, top vendors & products lists, feed activity summary, alerts section

**Phase 2 — Feed Manager**
- Feed Posts Manager: full table with filters, actions (remove, feature, warn), bulk actions
- Feed Algorithm Manager: weight sliders, post-type toggles, location preview, pin-to-top
- Stories Manager: view/remove/feature stories
- Special Offer Posts Manager: create/edit/delete offers with countdown, target mode

**Phase 3 — Shop Manager**
- Homepage Section Manager: hero slideshow CRUD, category pills, featured banner, partner brands, value props, FAQ, footer links — all with reorder and target mode
- Category Manager: CRUD categories, bulk product assignment, visibility toggle
- Collection Manager: CRUD collections, product assignment, featured toggle, reorder

**Phase 4 — Vendor Manager**
- All Vendors table with filters, search, actions (view, suspend, delete)
- Create New Vendor form with invite link generation and permissions
- Vendor Performance: per-vendor stats, side-by-side comparison, auto-flagging
- Vendor Payouts: escrow table, manual release/hold, custom fee rates, payout history

**Phase 5 — Customer Manager**
- All Customers table with filters, search, actions
- Customer Segments: grouped views, send notification to segment
- Gift Cards & Promo Codes: create/view codes and gift cards with stats

**Phase 6 — Product Manager**
- Product Approval Queue: pending products with approve/reject/request changes, bulk actions
- All Products table: full filters, search, per-product actions
- Featured Products Manager: select products, set feature dates, preview placement

**Phase 7 — Order & Delivery Manager**
- All Orders table: full filters, search, per-order actions
- Delivery Manager: tracking statuses for local/international, DHL tracking input, overdue flagging, manual overrides

**Phase 8 — Financial Manager**
- Revenue Dashboard: totals, breakdowns by location/category/vendor, daily revenue graph
- Escrow Manager: per-vendor escrow balances, release/hold controls
- Payout Manager: pending payouts, bulk release, history, failed payout alerts

**Phase 9 — Refund Manager**
- Refund requests table with filters, full order/customer/vendor detail views
- Approve/reject/escalate actions, delivery fee exclusion enforcement
- Refund stats: monthly totals, refund rate, top vendors by refund rate

**Phase 10 — Reviews & Reports Manager**
- Product Reviews: table, approve/reject/feature/remove, flagging patterns
- Vendor Reviews: same moderation controls
- Reported Content: reports table with dismiss/remove/warn/suspend actions

**Phase 11 — Notifications Manager**
- Send Notification: target picker, type selector, message fields, schedule or send now
- Notification History: sent notifications with open/click rates
- Automated Notification Rules: toggle and edit templates for each trigger

**Phase 12 — Settings**
- Platform Settings: name, logo, fees, delivery rules, return window, escrow delay
- Admin Account Manager: view/create/deactivate admins with role-based access
- API & Integrations: status indicators for all connected services
- Audit Log: read-only log of all admin actions, filterable

Each phase builds on the shared layout and mock data established in Phase 1.

