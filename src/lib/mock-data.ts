// Mock data for the Super Admin Dashboard

export const overviewStats = {
  totalRevenueToday: { value: 847520, change: 12.5, currency: "MWK" },
  totalOrdersToday: { value: 234, change: -3.2 },
  activeVendors: { value: 156, change: 4.1 },
  activeCustomers: { value: 3847, change: 8.7 },
  pendingApprovals: { value: 23, change: 15.0 },
  pendingRefunds: { value: 7, change: -28.6 },
};

export const revenueData = {
  "7d": Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString("en", { month: "short", day: "numeric" }),
    revenue: Math.floor(Math.random() * 500000) + 400000,
  })),
  "30d": Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en", { month: "short", day: "numeric" }),
    revenue: Math.floor(Math.random() * 600000) + 300000,
  })),
  "90d": Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 86400000).toLocaleDateString("en", { month: "short", day: "numeric" }),
    revenue: Math.floor(Math.random() * 700000) + 200000,
  })),
  "1y": Array.from({ length: 12 }, (_, i) => ({
    date: new Date(2025, i).toLocaleDateString("en", { month: "short" }),
    revenue: Math.floor(Math.random() * 8000000) + 3000000,
  })),
};

export const ordersData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en", { month: "short", day: "numeric" }),
  orders: Math.floor(Math.random() * 80) + 120,
}));

export const recentOrders = [
  { id: "ORD-7841", customer: "Grace Banda", vendor: "Zara Collections MW", amount: 45000, status: "Delivered", date: "2026-03-20" },
  { id: "ORD-7840", customer: "Chikondi Phiri", vendor: "TechHub Lilongwe", amount: 128000, status: "Shipped", date: "2026-03-20" },
  { id: "ORD-7839", customer: "Tamanda Nyirenda", vendor: "Fresh Harvest", amount: 12500, status: "Processing", date: "2026-03-20" },
  { id: "ORD-7838", customer: "Blessings Mkandawire", vendor: "StylePoint", amount: 67800, status: "Delivered", date: "2026-03-19" },
  { id: "ORD-7837", customer: "Mercy Gondwe", vendor: "BeautyGlow MW", amount: 23400, status: "Pending", date: "2026-03-19" },
  { id: "ORD-7836", customer: "Daniel Kumwenda", vendor: "Zara Collections MW", amount: 89000, status: "Shipped", date: "2026-03-19" },
  { id: "ORD-7835", customer: "Esther Chilima", vendor: "HomeCraft Blantyre", amount: 156000, status: "Delivered", date: "2026-03-19" },
  { id: "ORD-7834", customer: "Patrick Mbewe", vendor: "TechHub Lilongwe", amount: 34500, status: "Processing", date: "2026-03-18" },
  { id: "ORD-7833", customer: "Ruth Kamanga", vendor: "Fresh Harvest", amount: 8900, status: "Delivered", date: "2026-03-18" },
  { id: "ORD-7832", customer: "Samuel Nkhoma", vendor: "StylePoint", amount: 52000, status: "Cancelled", date: "2026-03-18" },
];

export const topVendors = [
  { name: "Zara Collections MW", sales: 2340000, orders: 187, avatar: "ZC" },
  { name: "TechHub Lilongwe", sales: 1890000, orders: 134, avatar: "TH" },
  { name: "BeautyGlow MW", sales: 1560000, orders: 223, avatar: "BG" },
  { name: "Fresh Harvest", sales: 1230000, orders: 312, avatar: "FH" },
  { name: "StylePoint", sales: 980000, orders: 98, avatar: "SP" },
];

export const topProducts = [
  { name: "Ankara Print Maxi Dress", units: 342, vendor: "Zara Collections MW" },
  { name: "Wireless Bluetooth Speaker", units: 287, vendor: "TechHub Lilongwe" },
  { name: "Shea Butter Body Cream", units: 256, vendor: "BeautyGlow MW" },
  { name: "Organic Moringa Powder 500g", units: 198, vendor: "Fresh Harvest" },
  { name: "Handwoven Tote Bag", units: 176, vendor: "StylePoint" },
];

export const feedActivity = {
  postsToday: 47,
  likesToday: 1283,
  followsToday: 89,
};

export const alerts = [
  { type: "warning" as const, message: "12 products are out of stock across 4 vendors", time: "2 hours ago" },
  { type: "error" as const, message: "Refund dispute escalated — Order ORD-7801", time: "3 hours ago" },
  { type: "warning" as const, message: "Vendor 'QuickMart' suspended for policy violation", time: "5 hours ago" },
  { type: "error" as const, message: "Payment processing failed for 3 orders", time: "6 hours ago" },
];
