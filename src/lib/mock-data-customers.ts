export interface Customer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  location: string;
  joinDate: string;
  totalOrders: number;
  totalSpend: number;
  status: "Active" | "Suspended" | "Inactive";
  segment: string[];
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrder: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  targetSegment: string;
  status: "Active" | "Expired" | "Depleted";
}

export interface GiftCard {
  id: string;
  value: number;
  recipientEmail: string;
  expiryDate: string;
  status: "Active" | "Redeemed" | "Expired";
  redeemedDate?: string;
  purchaserName: string;
}

export const customers: Customer[] = [
  { id: "C001", name: "Grace Banda", avatar: "GB", email: "grace.banda@mail.mw", location: "Lilongwe", joinDate: "2025-04-12", totalOrders: 28, totalSpend: 456000, status: "Active", segment: ["Repeat Buyers", "High Spenders", "Local Customers"] },
  { id: "C002", name: "Chikondi Phiri", avatar: "CP", email: "chikondi.p@mail.mw", location: "Blantyre", joinDate: "2025-06-23", totalOrders: 15, totalSpend: 234000, status: "Active", segment: ["Repeat Buyers", "Local Customers"] },
  { id: "C003", name: "Tamanda Nyirenda", avatar: "TN", email: "tamanda.n@mail.mw", location: "Zomba", joinDate: "2025-09-05", totalOrders: 7, totalSpend: 89000, status: "Active", segment: ["Local Customers"] },
  { id: "C004", name: "Blessings Mkandawire", avatar: "BM", email: "blessings.mk@mail.mw", location: "Mzuzu", joinDate: "2025-03-18", totalOrders: 42, totalSpend: 780000, status: "Active", segment: ["Repeat Buyers", "High Spenders", "Local Customers"] },
  { id: "C005", name: "Mercy Gondwe", avatar: "MG", email: "mercy.g@mail.mw", location: "Lilongwe", joinDate: "2026-01-15", totalOrders: 3, totalSpend: 34000, status: "Active", segment: ["New Customers", "Local Customers"] },
  { id: "C006", name: "Daniel Kumwenda", avatar: "DK", email: "daniel.k@mail.com", location: "London, UK", joinDate: "2025-11-02", totalOrders: 12, totalSpend: 345000, status: "Active", segment: ["Repeat Buyers", "International Customers"] },
  { id: "C007", name: "Esther Chilima", avatar: "EC", email: "esther.c@mail.mw", location: "Blantyre", joinDate: "2025-07-30", totalOrders: 0, totalSpend: 0, status: "Inactive", segment: ["Inactive Customers", "Local Customers"] },
  { id: "C008", name: "Patrick Mbewe", avatar: "PM", email: "patrick.m@mail.com", location: "Johannesburg, SA", joinDate: "2025-10-14", totalOrders: 8, totalSpend: 198000, status: "Active", segment: ["International Customers"] },
  { id: "C009", name: "Ruth Kamanga", avatar: "RK", email: "ruth.k@mail.mw", location: "Lilongwe", joinDate: "2026-02-28", totalOrders: 2, totalSpend: 18000, status: "Active", segment: ["New Customers", "Local Customers"] },
  { id: "C010", name: "Samuel Nkhoma", avatar: "SN", email: "samuel.n@mail.mw", location: "Zomba", joinDate: "2025-05-09", totalOrders: 19, totalSpend: 267000, status: "Suspended", segment: ["Repeat Buyers", "Local Customers"] },
  { id: "C011", name: "Fatsani Kamoto", avatar: "FK", email: "fatsani.k@mail.com", location: "New York, US", joinDate: "2025-12-20", totalOrders: 5, totalSpend: 423000, status: "Active", segment: ["High Spenders", "International Customers"] },
  { id: "C012", name: "Tionge Msiska", avatar: "TM", email: "tionge.m@mail.mw", location: "Mzuzu", joinDate: "2025-08-17", totalOrders: 1, totalSpend: 12000, status: "Inactive", segment: ["Inactive Customers", "Local Customers"] },
];

export const customerSegments = [
  { name: "New Customers", description: "Joined within the last 30 days", count: 2, color: "hsl(var(--primary))" },
  { name: "Repeat Buyers", description: "5+ orders placed", count: 5, color: "hsl(200, 70%, 55%)" },
  { name: "High Spenders", description: "Total spend above MWK 400,000", count: 3, color: "hsl(280, 65%, 60%)" },
  { name: "Inactive Customers", description: "No orders in 60+ days", count: 2, color: "hsl(var(--destructive))" },
  { name: "International Customers", description: "Located outside Malawi", count: 3, color: "hsl(35, 80%, 55%)" },
  { name: "Local Customers", description: "Located within Malawi", count: 9, color: "hsl(160, 60%, 45%)" },
];

export const promoCodes: PromoCode[] = [
  { id: "PR-001", code: "WELCOME20", discountType: "percentage", discountValue: 20, minOrder: 5000, expiryDate: "2026-06-30", usageLimit: 500, usageCount: 187, targetSegment: "New Customers", status: "Active" },
  { id: "PR-002", code: "FLASH50", discountType: "fixed", discountValue: 5000, minOrder: 25000, expiryDate: "2026-03-25", usageLimit: 100, usageCount: 78, targetSegment: "All Customers", status: "Active" },
  { id: "PR-003", code: "LOYALVIP", discountType: "percentage", discountValue: 15, minOrder: 10000, expiryDate: "2026-12-31", usageLimit: 200, usageCount: 43, targetSegment: "Repeat Buyers", status: "Active" },
  { id: "PR-004", code: "NEWYEAR25", discountType: "percentage", discountValue: 25, minOrder: 15000, expiryDate: "2026-01-31", usageLimit: 300, usageCount: 300, targetSegment: "All Customers", status: "Depleted" },
  { id: "PR-005", code: "XMAS2025", discountType: "fixed", discountValue: 3000, minOrder: 10000, expiryDate: "2025-12-31", usageLimit: 500, usageCount: 412, targetSegment: "All Customers", status: "Expired" },
];

export const giftCards: GiftCard[] = [
  { id: "GC-001", value: 25000, recipientEmail: "grace.banda@mail.mw", expiryDate: "2026-09-20", status: "Active", purchaserName: "Daniel Kumwenda" },
  { id: "GC-002", value: 50000, recipientEmail: "chikondi.p@mail.mw", expiryDate: "2026-06-15", status: "Redeemed", redeemedDate: "2026-02-14", purchaserName: "Blessings Mkandawire" },
  { id: "GC-003", value: 15000, recipientEmail: "tamanda.n@mail.mw", expiryDate: "2026-08-01", status: "Active", purchaserName: "Mercy Gondwe" },
  { id: "GC-004", value: 100000, recipientEmail: "fatsani.k@mail.com", expiryDate: "2025-12-31", status: "Expired", purchaserName: "Patrick Mbewe" },
];
