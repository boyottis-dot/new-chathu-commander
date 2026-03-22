

## Comprehensive Enhancement Plan — 8 Feature Upgrades

### 1. Advanced Feed Algorithm Page
**Current**: Basic weight sliders (4 signals), post type toggles, location preview, pin post.
**Upgrade**: Add engagement decay curve control, time-of-day boost scheduling, per-category weight overrides, A/B test toggle (split feed into variant A/B with percentages), content freshness half-life slider, user affinity scoring weights (purchase history, likes, follows, shares), feed diversity settings (max posts from same vendor), and a real-time feed simulation preview showing a mock feed ranked by current settings.

**Files**: `src/pages/admin/feed/FeedAlgorithm.tsx`, `src/lib/mock-data-feed.ts`

---

### 2. Value Props — Add/Remove Support
**Current**: Only edit button on fixed 4 value proposition cards.
**Upgrade**: Add "Add Value Prop" button with dialog (icon, title, description, target mode). Add delete button per card. Make list dynamic with state management.

**Files**: `src/pages/admin/shop/HomepageSections.tsx`

---

### 3. Dual-Page Content Management (Feed Homepage vs Shop Page)
**Current**: Single homepage section manager. No concept of two separate storefronts.
**Upgrade**: 
- Add a **page context selector** (tabs or toggle) at the top of Homepage Sections: "Feed Page" vs "Shop Page"
- Each page has its own set of hero slides, featured banners, category pills, and recommendation rules
- New "Recommendation Engine" card per page context: configure what drives recommendations (e.g., Feed page = social signals like follows/likes; Shop page = purchase history/trending/categories)
- Store separate configs in state for `feedPageConfig` and `shopPageConfig`
- Also add page context awareness to Featured Products and Collection Manager (which page should a featured item appear on)

**Files**: `src/pages/admin/shop/HomepageSections.tsx`, `src/lib/mock-data-shop.ts`, `src/pages/admin/products/FeaturedProducts.tsx`, `src/pages/admin/shop/CollectionManager.tsx`

---

### 4. Category & Collection Product Assignment + Auto-Rules
**Current**: "Assign Products" menu item exists but has no dialog/UI. No auto-categorization.
**Upgrade**:
- **Category Manager**: Add a product assignment dialog — shows all products with checkboxes, search, and bulk assign/unassign
- **Auto-Categorization Rules**: New section on Category Manager — create rules like "Auto-add products where type = Electronics AND price < MWK 50,000 AND location = LOCAL". Rules have conditions (field, operator, value) and run on new product approval
- **Collection Manager**: Same product assignment dialog for manual add/remove from collections

**Files**: `src/pages/admin/shop/CategoryManager.tsx`, `src/pages/admin/shop/CollectionManager.tsx`, `src/lib/mock-data-products.ts`

---

### 5. Order Manager — Contact Vendor Button
**Current**: "Contact Customer" and "Contact Vendor" buttons exist in the order detail dialog but are non-functional placeholders.
**Upgrade**: Add a contact dialog that opens when clicking "Contact Vendor" — shows vendor name, email, a message textarea with pre-filled order context, and a "Send Message" button. Same for "Contact Customer". Add these contact actions to the table row actions too (not just the detail dialog).

**Files**: `src/pages/admin/orders/AllOrders.tsx`

---

### 6. Courier Networks Manager
**Current**: Delivery Manager is DHL-only. Tracking dialog says "DHL Tracking Number".
**Upgrade**:
- New page: **Courier Networks** (`/orders/couriers`) — manage courier partners
- CRUD for couriers: name, type (local/international), API endpoint, tracking URL pattern, status, coverage areas
- Mock couriers: DHL, FedEx, Aramex, Local Courier MW, SpeedPost Malawi
- Update Delivery Manager: when editing tracking, select courier from dropdown instead of assuming DHL
- Add courier column to delivery table
- Add sidebar nav item under Order Manager

**Files**: New `src/pages/admin/orders/CourierNetworks.tsx`, edit `src/pages/admin/orders/DeliveryManager.tsx`, `src/lib/mock-data-orders.ts`, `src/components/admin/AdminSidebar.tsx`, `src/App.tsx`

---

### 7. Referral Program Manager
**Current**: No referral features exist anywhere in the dashboard.
**Upgrade**: New top-level sidebar section "Referral Manager" with sub-pages:
- **Referral Programs** (`/referrals/programs`): Create custom referral programs — name, reward type (percentage discount, fixed amount, free shipping, cashback), reward for referrer, reward for referee, minimum order value, expiry, max uses, target segment. View all active/expired programs with stats (total referrals, conversions, revenue generated)
- **Referral Links** (`/referrals/links`): Generate custom referral links per program, per customer, or per vendor. Track clicks, signups, and conversions per link. Bulk generate links for campaigns
- **Referral Analytics** (`/referrals/analytics`): Dashboard with total referrals, conversion rate, revenue from referrals, top referrers table, referral chain visualization

**Files**: New `src/pages/admin/referrals/ReferralPrograms.tsx`, `src/pages/admin/referrals/ReferralLinks.tsx`, `src/pages/admin/referrals/ReferralAnalytics.tsx`, new `src/lib/mock-data-referrals.ts`, edit `src/components/admin/AdminSidebar.tsx`, `src/components/admin/MobileBottomNav.tsx`, `src/App.tsx`

---

### 8. Advanced Automation Rules & API Integrations
**Current**: Automation Rules has 8 hardcoded rules with only template editing. API Integrations has 10 hardcoded cards with only toggle.
**Upgrade**:
- **Automation Rules**: Add "Create New Rule" button with full form — name, trigger event (select from list + custom event name), conditions (e.g., "if order amount > X", "if customer segment = Y"), action type (in-app, push, email, webhook), message template with variable picker, delay (immediate, 1hr, 1d, 3d, custom), active toggle. Add delete rule. Add duplicate rule button
- **API Integrations**: Add "Add Integration" button — name, type (REST API, Webhook, OAuth), base URL, API key field, headers, test endpoint button. Per integration: view request logs, edit config, test connection. Add webhook management: create outgoing webhooks with event subscriptions and endpoint URL

**Files**: `src/pages/admin/notifications/AutomationRules.tsx`, `src/pages/admin/settings/ApiIntegrations.tsx`

---

### Build Priority
Build in this order across implementation messages:
1. Items 1, 2, 5 (smaller scope, single-file changes)
2. Items 3, 4 (shop manager restructuring)
3. Item 6 (courier networks — new page + edits)
4. Item 7 (referral system — 3 new pages + mock data)
5. Item 8 (automation + API enhancements)

### Technical Notes
- All data remains mock — new mock data files for referrals and couriers
- Same dark + lime-green theme throughout
- All new pages follow existing component patterns (Card, Table, Dialog, Badge, toast)
- New sidebar sections added to `navSections` array and mobile nav

