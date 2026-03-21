// Mock data for Financial Manager

export interface RevenueBreakdown {
  name: string;
  revenue: number;
  percentage: number;
}

export const revenueOverview = {
  allTime: 187450000,
  thisMonth: 24680000,
  thisWeek: 5930000,
  today: 847520,
  platformFees: { allTime: 18745000, thisMonth: 2468000 },
};

export const revenueByLocation: RevenueBreakdown[] = [
  { name: "LOCAL", revenue: 17204000, percentage: 69.7 },
  { name: "INTERNATIONAL", revenue: 7476000, percentage: 30.3 },
];

export const revenueByCategory: RevenueBreakdown[] = [
  { name: "Fashion", revenue: 8882000, percentage: 36.0 },
  { name: "Electronics", revenue: 5416000, percentage: 21.9 },
  { name: "Beauty", revenue: 3949000, percentage: 16.0 },
  { name: "Food", revenue: 2714000, percentage: 11.0 },
  { name: "Home", revenue: 1975000, percentage: 8.0 },
  { name: "Accessories", revenue: 1745000, percentage: 7.1 },
];

export const revenueByVendor: RevenueBreakdown[] = [
  { name: "Zara Collections MW", revenue: 6420000, percentage: 26.0 },
  { name: "TechHub Lilongwe", revenue: 4690000, percentage: 19.0 },
  { name: "BeautyGlow MW", revenue: 3580000, percentage: 14.5 },
  { name: "Fresh Harvest", revenue: 2960000, percentage: 12.0 },
  { name: "StylePoint", revenue: 2470000, percentage: 10.0 },
  { name: "HomeCraft Blantyre", revenue: 1980000, percentage: 8.0 },
  { name: "CraftWorks MW", revenue: 1480000, percentage: 6.0 },
  { name: "Nature's Best MW", revenue: 1100000, percentage: 4.5 },
];

export const dailyRevenue = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en", { month: "short", day: "numeric" }),
  revenue: Math.floor(Math.random() * 500000) + 500000,
  fees: Math.floor(Math.random() * 50000) + 50000,
}));

// Escrow data
export interface EscrowEntry {
  id: string;
  vendor: string;
  amount: number;
  orders: number;
  oldestOrder: string;
  expectedRelease: string;
  status: "Held" | "Ready" | "On Hold";
  holdReason?: string;
}

export const escrowEntries: EscrowEntry[] = [
  { id: "ESC-001", vendor: "Zara Collections MW", amount: 1240000, orders: 12, oldestOrder: "2026-03-14", expectedRelease: "2026-03-22", status: "Ready" },
  { id: "ESC-002", vendor: "TechHub Lilongwe", amount: 890000, orders: 8, oldestOrder: "2026-03-15", expectedRelease: "2026-03-23", status: "Ready" },
  { id: "ESC-003", vendor: "BeautyGlow MW", amount: 560000, orders: 15, oldestOrder: "2026-03-16", expectedRelease: "2026-03-24", status: "Held" },
  { id: "ESC-004", vendor: "Fresh Harvest", amount: 340000, orders: 22, oldestOrder: "2026-03-17", expectedRelease: "2026-03-25", status: "Held" },
  { id: "ESC-005", vendor: "StylePoint", amount: 780000, orders: 6, oldestOrder: "2026-03-13", expectedRelease: "2026-03-21", status: "On Hold", holdReason: "Pending dispute resolution — Order ORD-7801" },
  { id: "ESC-006", vendor: "HomeCraft Blantyre", amount: 420000, orders: 9, oldestOrder: "2026-03-18", expectedRelease: "2026-03-26", status: "Held" },
  { id: "ESC-007", vendor: "CraftWorks MW", amount: 180000, orders: 4, oldestOrder: "2026-03-19", expectedRelease: "2026-03-27", status: "Held" },
  { id: "ESC-008", vendor: "Nature's Best MW", amount: 95000, orders: 3, oldestOrder: "2026-03-20", expectedRelease: "2026-03-28", status: "Held" },
];

export const totalEscrow = escrowEntries.reduce((sum, e) => sum + e.amount, 0);

// Payout data
export interface Payout {
  id: string;
  vendor: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: "Pending" | "Completed" | "Failed";
  requestDate: string;
  completedDate?: string;
  bankRef?: string;
  failReason?: string;
}

export const payouts: Payout[] = [
  { id: "PAY-301", vendor: "Zara Collections MW", amount: 1100000, fee: 110000, netAmount: 990000, status: "Pending", requestDate: "2026-03-20" },
  { id: "PAY-300", vendor: "TechHub Lilongwe", amount: 750000, fee: 75000, netAmount: 675000, status: "Pending", requestDate: "2026-03-20" },
  { id: "PAY-299", vendor: "BeautyGlow MW", amount: 430000, fee: 43000, netAmount: 387000, status: "Pending", requestDate: "2026-03-19" },
  { id: "PAY-298", vendor: "Fresh Harvest", amount: 280000, fee: 28000, netAmount: 252000, status: "Completed", requestDate: "2026-03-15", completedDate: "2026-03-17", bankRef: "NBM-2026031700142" },
  { id: "PAY-297", vendor: "StylePoint", amount: 650000, fee: 65000, netAmount: 585000, status: "Completed", requestDate: "2026-03-14", completedDate: "2026-03-16", bankRef: "NBM-2026031600098" },
  { id: "PAY-296", vendor: "HomeCraft Blantyre", amount: 320000, fee: 32000, netAmount: 288000, status: "Completed", requestDate: "2026-03-13", completedDate: "2026-03-15", bankRef: "STD-2026031500076" },
  { id: "PAY-295", vendor: "CraftWorks MW", amount: 150000, fee: 15000, netAmount: 135000, status: "Failed", requestDate: "2026-03-12", failReason: "Invalid bank account details" },
  { id: "PAY-294", vendor: "Nature's Best MW", amount: 90000, fee: 9000, netAmount: 81000, status: "Failed", requestDate: "2026-03-11", failReason: "Bank system timeout" },
];
