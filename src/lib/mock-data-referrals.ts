// Mock data for Referral Program Manager

export interface ReferralProgram {
  id: string;
  name: string;
  rewardType: "percentage" | "fixed" | "free_shipping" | "cashback";
  referrerReward: string;
  refereeReward: string;
  minOrderValue: number;
  maxUses: number;
  usedCount: number;
  expiry: string;
  targetSegment: string;
  active: boolean;
  totalReferrals: number;
  conversions: number;
  revenueGenerated: number;
  createdAt: string;
}

export interface ReferralLink {
  id: string;
  code: string;
  programId: string;
  programName: string;
  assignedTo: string;
  assignedType: "customer" | "vendor" | "campaign";
  clicks: number;
  signups: number;
  conversions: number;
  revenue: number;
  createdAt: string;
  active: boolean;
}

export const referralPrograms: ReferralProgram[] = [
  { id: "RP-001", name: "Friend Invite Bonus", rewardType: "percentage", referrerReward: "10% off next order", refereeReward: "15% off first order", minOrderValue: 5000, maxUses: 500, usedCount: 234, expiry: "2026-06-30", targetSegment: "All Customers", active: true, totalReferrals: 412, conversions: 234, revenueGenerated: 1250000, createdAt: "2026-01-15" },
  { id: "RP-002", name: "Vendor Referral Program", rewardType: "cashback", referrerReward: "MWK 5,000 cashback", refereeReward: "MWK 3,000 cashback", minOrderValue: 10000, maxUses: 200, usedCount: 89, expiry: "2026-12-31", targetSegment: "High Spenders", active: true, totalReferrals: 156, conversions: 89, revenueGenerated: 890000, createdAt: "2026-02-01" },
  { id: "RP-003", name: "Free Shipping Week", rewardType: "free_shipping", referrerReward: "Free shipping on next 3 orders", refereeReward: "Free shipping on first order", minOrderValue: 3000, maxUses: 1000, usedCount: 567, expiry: "2026-04-01", targetSegment: "Local Customers", active: true, totalReferrals: 823, conversions: 567, revenueGenerated: 2340000, createdAt: "2026-03-01" },
  { id: "RP-004", name: "Holiday Cashback Blitz", rewardType: "fixed", referrerReward: "MWK 2,000 credit", refereeReward: "MWK 1,500 credit", minOrderValue: 8000, maxUses: 300, usedCount: 300, expiry: "2025-12-31", targetSegment: "All Customers", active: false, totalReferrals: 489, conversions: 300, revenueGenerated: 1890000, createdAt: "2025-11-15" },
];

export const referralLinks: ReferralLink[] = [
  { id: "RL-001", code: "GRACE-FRIEND10", programId: "RP-001", programName: "Friend Invite Bonus", assignedTo: "Grace Banda", assignedType: "customer", clicks: 145, signups: 34, conversions: 18, revenue: 245000, createdAt: "2026-02-10", active: true },
  { id: "RL-002", code: "TECHUB-REF", programId: "RP-002", programName: "Vendor Referral Program", assignedTo: "TechHub Lilongwe", assignedType: "vendor", clicks: 312, signups: 67, conversions: 42, revenue: 520000, createdAt: "2026-02-15", active: true },
  { id: "RL-003", code: "SPRING2026", programId: "RP-003", programName: "Free Shipping Week", assignedTo: "Spring Campaign", assignedType: "campaign", clicks: 1240, signups: 189, conversions: 134, revenue: 890000, createdAt: "2026-03-01", active: true },
  { id: "RL-004", code: "MERCY-SHARE", programId: "RP-001", programName: "Friend Invite Bonus", assignedTo: "Mercy Gondwe", assignedType: "customer", clicks: 78, signups: 15, conversions: 9, revenue: 112000, createdAt: "2026-03-05", active: true },
  { id: "RL-005", code: "BEAUTY-REF", programId: "RP-002", programName: "Vendor Referral Program", assignedTo: "BeautyGlow MW", assignedType: "vendor", clicks: 198, signups: 45, conversions: 28, revenue: 340000, createdAt: "2026-02-20", active: true },
  { id: "RL-006", code: "HOLIDAY-BLAST", programId: "RP-004", programName: "Holiday Cashback Blitz", assignedTo: "Holiday Campaign", assignedType: "campaign", clicks: 2100, signups: 320, conversions: 210, revenue: 1560000, createdAt: "2025-11-20", active: false },
];

export const referralAnalytics = {
  totalReferrals: 1880,
  totalConversions: 1190,
  conversionRate: 63.3,
  totalRevenue: 6370000,
  avgRevenuePerReferral: 5353,
  topReferrers: [
    { name: "Grace Banda", type: "customer" as const, referrals: 34, conversions: 18, revenue: 245000 },
    { name: "TechHub Lilongwe", type: "vendor" as const, referrals: 67, conversions: 42, revenue: 520000 },
    { name: "Mercy Gondwe", type: "customer" as const, referrals: 15, conversions: 9, revenue: 112000 },
    { name: "BeautyGlow MW", type: "vendor" as const, referrals: 45, conversions: 28, revenue: 340000 },
    { name: "Daniel Kumwenda", type: "customer" as const, referrals: 22, conversions: 14, revenue: 178000 },
  ],
  monthlyData: [
    { month: "Oct", referrals: 120, conversions: 78, revenue: 420000 },
    { month: "Nov", referrals: 310, conversions: 198, revenue: 1120000 },
    { month: "Dec", referrals: 380, conversions: 245, revenue: 1450000 },
    { month: "Jan", referrals: 290, conversions: 185, revenue: 980000 },
    { month: "Feb", referrals: 340, conversions: 220, revenue: 1200000 },
    { month: "Mar", referrals: 440, conversions: 264, revenue: 1200000 },
  ],
};

// Courier Networks mock data
export interface Courier {
  id: string;
  name: string;
  type: "local" | "international" | "both";
  apiEndpoint: string;
  trackingUrlPattern: string;
  status: "active" | "inactive" | "error";
  coverageAreas: string[];
  contactEmail: string;
  avgDeliveryDays: number;
  totalShipments: number;
}

export const couriers: Courier[] = [
  { id: "CR-001", name: "DHL Express", type: "international", apiEndpoint: "https://api.dhl.com/track/v1", trackingUrlPattern: "https://www.dhl.com/track?id={tracking}", status: "active", coverageAreas: ["Europe", "North America", "Asia", "Africa"], contactEmail: "support@dhl.com", avgDeliveryDays: 10, totalShipments: 234 },
  { id: "CR-002", name: "FedEx", type: "international", apiEndpoint: "https://api.fedex.com/track/v1", trackingUrlPattern: "https://www.fedex.com/track?id={tracking}", status: "active", coverageAreas: ["North America", "Europe", "Asia"], contactEmail: "support@fedex.com", avgDeliveryDays: 12, totalShipments: 89 },
  { id: "CR-003", name: "Aramex", type: "international", apiEndpoint: "https://api.aramex.com/v1/track", trackingUrlPattern: "https://www.aramex.com/track?id={tracking}", status: "inactive", coverageAreas: ["Middle East", "Africa", "Asia"], contactEmail: "support@aramex.com", avgDeliveryDays: 14, totalShipments: 45 },
  { id: "CR-004", name: "SpeedPost Malawi", type: "local", apiEndpoint: "https://api.speedpost.mw/track", trackingUrlPattern: "https://speedpost.mw/track/{tracking}", status: "active", coverageAreas: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Mangochi"], contactEmail: "ops@speedpost.mw", avgDeliveryDays: 2, totalShipments: 1230 },
  { id: "CR-005", name: "Local Courier MW", type: "local", apiEndpoint: "https://api.localcourier.mw/v1", trackingUrlPattern: "https://localcourier.mw/track/{tracking}", status: "active", coverageAreas: ["Lilongwe", "Blantyre", "Zomba"], contactEmail: "dispatch@localcourier.mw", avgDeliveryDays: 1, totalShipments: 2450 },
];
