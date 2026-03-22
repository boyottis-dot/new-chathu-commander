

## Comprehensive Audit: Chathu Super Admin Dashboard

After reviewing all pages, mock data, routing, and console logs against the original spec, here are the issues found:

---

### Bugs and Console Errors

1. **Recharts `CartesianGrid` ref warning** — `Overview.tsx` triggers "Function components cannot be given refs" warnings from Recharts. This is a known Recharts issue but can be suppressed or worked around.

2. **Overview "View" button missing** — The spec requires a "View" button per row in the Recent Orders table, but it only shows order data with no action button.

---

### Missing Features by Section

**1. Overview**
- Missing: "View" button on each recent order row (spec says "View button")

**2. Feed Manager**
- Feed Posts: Date filter missing (spec says "by date")
- Feed Offers: No countdown timer end date picker in the create form; no image upload field

**3. Shop Manager - Homepage Sections**
- Hero Slideshow: No image upload field (just text input for URL assumed)
- Footer Links: Need to verify social media URLs and contact details editing exist

**4. Platform Settings (12a) — Multiple missing fields**
- **Missing: Platform logo** upload/setting
- **Missing: Default location mode** for undetected users
- **Missing: Minimum withdrawal amount** for vendors
- **Missing: Delivery fee calculation rules** (per km rate, flat rate by city) — only has flat local/international fees
- **Escrow delay** is labeled "days" but spec says "hours"
- `minOrderAmount` is present but not in the spec (it's an extra, not harmful)

**5. Mobile Bottom Nav**
- Missing sections from "More" menu: Customers, Refunds, Reviews. Only has Feed, Shop, Vendors, Notifications, Settings.

**6. Sidebar Navigation**
- Spec lists "Delivery Manager" as a top-level section, but it's nested under "Order Manager" — this is a reasonable design choice but differs from spec.

---

### Summary of Required Fixes

| # | Fix | Files Affected |
|---|-----|----------------|
| 1 | Add "View" button to Overview recent orders table | `Overview.tsx` |
| 2 | Add date filter to Feed Posts | `FeedPosts.tsx` |
| 3 | Add countdown end date picker and image field to Feed Offers create form | `FeedOffers.tsx` |
| 4 | Add missing Platform Settings fields: logo, default location mode, min vendor withdrawal, per-km delivery rate, fix escrow delay unit to hours | `PlatformSettings.tsx` |
| 5 | Add missing sections to Mobile Bottom Nav "More" menu: Customers, Refunds, Reviews | `MobileBottomNav.tsx` |

---

### Technical Details

- **Overview "View" button**: Add a `<Button>` in the last `<TableCell>` of each recent order row.
- **Feed Posts date filter**: Add a date input or date range picker to the existing filter panel.
- **Feed Offers form**: Add `<Input type="datetime-local">` for countdown end date, and an image URL input.
- **Platform Settings**: Add new state fields and form controls for logo (text input for URL), defaultLocationMode (Select: LOCAL/INTERNATIONAL), minWithdrawalAmount (number input), deliveryPerKmRate (number input), flatRateByCity (number input). Change escrowDelay label from "days" to "hours".
- **MobileBottomNav**: Add Customers (`/customers`), Refunds (`/refunds`), and Reviews (`/reviews/products`) to the `moreNav` array.

All fixes are straightforward additions to existing components with no architectural changes needed.

