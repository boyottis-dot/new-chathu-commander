

## Dashboard Gap Analysis — What's Missing for a World-Class Platform

After reviewing every module, here's what an Amazon-tier admin dashboard would have that yours currently lacks. Organized by priority.

---

### Critical Gaps (High Impact)

**1. Inventory & Stock Management**
No dedicated inventory page. Products have a `stock` field but there's no low-stock alerts dashboard, restock requests, stock history, or warehouse/location-based inventory tracking. Amazon has entire teams around this.
- New page: `/products/inventory` — stock levels, low-stock alerts, restock queue, stock movement history

**2. Dispute & Resolution Center**
Refund Manager exists but there's no formal dispute system where customers and vendors can submit evidence, admin can mediate, escalate, and track resolution timelines. Amazon's A-to-Z Guarantee system is built around this.
- New page: `/disputes` — open cases, evidence uploads, timeline, resolution actions, SLA tracking

**3. Customer Support / Helpdesk**
No ticket system. When a customer has an issue, there's no way to track it. The "Contact Vendor" dialog sends a one-off message but doesn't create a trackable case.
- New pages: `/support/tickets`, `/support/live` — ticket queue, priority/SLA, assignment to support reps, canned responses, live chat overview

**4. Returns & Reverse Logistics**
Refunds exist but returns (physical product coming back) have no tracking. No return labels, no return status tracking, no restocking workflow.
- New page: `/orders/returns` — return requests, return shipping tracking, restocking confirmation, condition assessment

**5. Search & Discovery Analytics**
No visibility into what customers are searching for, what returns zero results, trending searches, or search conversion rates. Amazon obsesses over this.
- New page: `/analytics/search` — top searches, zero-result queries, search-to-purchase conversion, keyword trends

---

### Important Gaps (Medium Impact)

**6. Seller/Vendor Onboarding Workflow**
"Create Vendor" is a single form. No multi-step onboarding with document verification, bank account validation, agreement signing, and training checklist.
- Enhance `/vendors/create` with a step-by-step wizard and onboarding status tracker

**7. Promotions & Campaign Manager**
Gift Cards & Promos exist but there's no campaign system — flash sales, time-limited deals, banner campaigns with start/end dates, A/B tested promotional content.
- New page: `/marketing/campaigns` — create campaigns with date ranges, target segments, promotional rules, and performance tracking

**8. Customer Lifetime Value & Cohort Analytics**
Customer segments exist but there's no CLV calculation, cohort retention charts, churn prediction, or RFM (Recency/Frequency/Monetary) analysis.
- New page: `/analytics/customers` — CLV scores, cohort charts, churn risk, RFM segmentation

**9. Warehouse / Fulfillment Zones**
Courier Networks exist but there's no concept of fulfillment zones, delivery time estimates by zone, or zone-based pricing rules.
- New page: `/orders/zones` — create delivery zones on a map-style interface, set ETAs and pricing per zone

**10. Bulk Operations & Import/Export**
No CSV import/export for products, customers, or orders. No bulk edit capability. Amazon Seller Central has this everywhere.
- Add bulk actions to existing pages: import/export buttons, bulk status change, bulk price update

---

### Nice-to-Have Gaps

**11. Platform Health & System Monitoring**
No uptime monitoring, API response times, error rate tracking, or system health dashboard. The current "Alerts" card is static mock data.
- New page: `/settings/health` — uptime, API latency, error rates, active users in real-time

**12. Multi-Language / Localization Settings**
No language management for a platform that might serve multiple regions.
- Add to Platform Settings: supported languages, default language, translation management

**13. Tax & Compliance Manager**
No tax rules, VAT settings, or compliance documentation. Essential for real commerce.
- New page: `/finance/tax` — tax rules by region, VAT rates, tax report generation

**14. Vendor Communication Hub / Internal Messaging**
Contact dialogs exist but there's no message history, no inbox, no announcement board for vendors.
- New page: `/communications/inbox` — threaded messages, announcements, broadcast to vendor groups

---

### Recommended Build Order (4 phases)

**Phase 1** — Inventory Management + Dispute Center + Support Tickets (most operationally critical)

**Phase 2** — Returns Tracking + Campaign Manager + Bulk Operations (revenue and efficiency)

**Phase 3** — Search Analytics + Customer Analytics + Fulfillment Zones (data-driven growth)

**Phase 4** — System Health + Tax Manager + Vendor Onboarding Wizard + Messaging Hub (polish)

---

### Technical Notes
- All new pages follow existing patterns (Card, Table, Dialog, Badge, toast, recharts)
- New mock data files for disputes, support tickets, inventory, campaigns, search analytics
- Sidebar additions grouped logically: "Support Center", "Analytics", "Marketing" as new sections
- Existing pages enhanced with bulk action toolbars and export buttons

