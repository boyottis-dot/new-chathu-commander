export type CampaignStatus = "Draft" | "Scheduled" | "Active" | "Paused" | "Ended";
export type CampaignType = "Flash Sale" | "Banner" | "Email" | "Push Notification" | "Social Media" | "Discount Code";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  targetSegment: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  products: string[];
  description: string;
  createdBy: string;
  createdAt: string;
}

const types: CampaignType[] = ["Flash Sale", "Banner", "Email", "Push Notification", "Social Media", "Discount Code"];
const segments = ["All Customers", "New Users", "Returning Customers", "High Value", "Inactive 30d", "VIP Members"];

export const campaigns: Campaign[] = [
  { id: "CMP-001", name: "Easter Flash Sale", type: "Flash Sale", status: "Active", startDate: "2026-03-20", endDate: "2026-03-28", targetSegment: "All Customers", budget: 500000, spent: 235000, impressions: 45000, clicks: 8200, conversions: 420, revenue: 2100000, discountType: "percentage", discountValue: 25, products: ["All Fashion"], description: "25% off all fashion items for Easter weekend.", createdBy: "Admin", createdAt: "2026-03-15" },
  { id: "CMP-002", name: "New User Welcome", type: "Discount Code", status: "Active", startDate: "2026-01-01", endDate: "2026-12-31", targetSegment: "New Users", budget: 200000, spent: 89000, impressions: 12000, clicks: 3400, conversions: 890, revenue: 1560000, discountType: "fixed", discountValue: 5000, products: ["All Products"], description: "MWK 5,000 off first order for new users.", createdBy: "Marketing Team", createdAt: "2025-12-20" },
  { id: "CMP-003", name: "Tech Week Banner", type: "Banner", status: "Scheduled", startDate: "2026-04-01", endDate: "2026-04-07", targetSegment: "All Customers", budget: 150000, spent: 0, impressions: 0, clicks: 0, conversions: 0, revenue: 0, products: ["Electronics"], description: "Homepage banner promoting tech products.", createdBy: "Admin", createdAt: "2026-03-22" },
  { id: "CMP-004", name: "VIP Exclusive Deals", type: "Email", status: "Active", startDate: "2026-03-01", endDate: "2026-03-31", targetSegment: "VIP Members", budget: 80000, spent: 45000, impressions: 3200, clicks: 1800, conversions: 340, revenue: 890000, discountType: "percentage", discountValue: 15, products: ["Premium Collection"], description: "Exclusive 15% off for VIP members.", createdBy: "Admin", createdAt: "2026-02-25" },
  { id: "CMP-005", name: "Win-Back Campaign", type: "Push Notification", status: "Paused", startDate: "2026-02-15", endDate: "2026-03-15", targetSegment: "Inactive 30d", budget: 60000, spent: 32000, impressions: 8500, clicks: 920, conversions: 45, revenue: 180000, discountType: "percentage", discountValue: 20, products: ["All Products"], description: "Re-engage inactive users with 20% discount.", createdBy: "Marketing Team", createdAt: "2026-02-10" },
  { id: "CMP-006", name: "Social Media Blitz", type: "Social Media", status: "Ended", startDate: "2026-02-01", endDate: "2026-02-14", targetSegment: "All Customers", budget: 300000, spent: 295000, impressions: 125000, clicks: 15600, conversions: 780, revenue: 3200000, products: ["Valentine's Collection"], description: "Valentine's Day social campaign.", createdBy: "Marketing Team", createdAt: "2026-01-25" },
  { id: "CMP-007", name: "Clearance Sale", type: "Flash Sale", status: "Draft", startDate: "", endDate: "", targetSegment: "All Customers", budget: 100000, spent: 0, impressions: 0, clicks: 0, conversions: 0, revenue: 0, discountType: "percentage", discountValue: 40, products: ["Clearance Items"], description: "40% off clearance items.", createdBy: "Admin", createdAt: "2026-03-24" },
];

export const campaignStats = {
  activeCampaigns: 3,
  totalBudget: 1390000,
  totalSpent: 696000,
  totalRevenue: 7930000,
  avgConversionRate: 4.8,
  avgROI: 10.4,
};
