export interface Vendor {
  id: string;
  name: string;
  avatar: string;
  email: string;
  location: string;
  category: string;
  totalProducts: number;
  totalSales: number;
  totalFollowers: number;
  joinDate: string;
  status: "Active" | "Suspended" | "Pending Setup";
  canPost: boolean;
  canDiscount: boolean;
  internationalShipping: boolean;
  feeRate: number;
}

export interface VendorPayout {
  id: string;
  vendorName: string;
  vendorAvatar: string;
  amountInEscrow: number;
  deliveryConfirmedDate: string;
  releaseDate: string;
  status: "Pending" | "Released" | "On Hold" | "Failed";
  holdReason?: string;
}

export interface VendorPerformance {
  vendorId: string;
  vendorName: string;
  avatar: string;
  revenueByMonth: { month: string; revenue: number }[];
  ordersByMonth: { month: string; orders: number }[];
  topProducts: { name: string; units: number }[];
  avgRating: number;
  returnRate: number;
  refundRate: number;
  flagged: boolean;
}

export const vendors: Vendor[] = [
  { id: "V001", name: "Zara Collections MW", avatar: "ZC", email: "zara@collections.mw", location: "Lilongwe", category: "Fashion", totalProducts: 87, totalSales: 2340000, totalFollowers: 1245, joinDate: "2025-06-15", status: "Active", canPost: true, canDiscount: true, internationalShipping: true, feeRate: 12 },
  { id: "V002", name: "TechHub Lilongwe", avatar: "TH", email: "info@techhub.mw", location: "Lilongwe", category: "Electronics", totalProducts: 134, totalSales: 1890000, totalFollowers: 876, joinDate: "2025-07-22", status: "Active", canPost: true, canDiscount: true, internationalShipping: true, feeRate: 10 },
  { id: "V003", name: "BeautyGlow MW", avatar: "BG", email: "hello@beautyglow.mw", location: "Blantyre", category: "Beauty", totalProducts: 56, totalSales: 1560000, totalFollowers: 2134, joinDate: "2025-08-03", status: "Active", canPost: true, canDiscount: false, internationalShipping: false, feeRate: 12 },
  { id: "V004", name: "Fresh Harvest", avatar: "FH", email: "orders@freshharvest.mw", location: "Zomba", category: "Groceries", totalProducts: 203, totalSales: 1230000, totalFollowers: 567, joinDate: "2025-05-11", status: "Active", canPost: true, canDiscount: true, internationalShipping: false, feeRate: 8 },
  { id: "V005", name: "StylePoint", avatar: "SP", email: "style@point.mw", location: "Mzuzu", category: "Fashion", totalProducts: 45, totalSales: 980000, totalFollowers: 432, joinDate: "2025-09-18", status: "Active", canPost: false, canDiscount: true, internationalShipping: true, feeRate: 12 },
  { id: "V006", name: "HomeCraft Blantyre", avatar: "HC", email: "home@craft.mw", location: "Blantyre", category: "Home & Living", totalProducts: 78, totalSales: 670000, totalFollowers: 321, joinDate: "2025-10-05", status: "Active", canPost: true, canDiscount: true, internationalShipping: false, feeRate: 12 },
  { id: "V007", name: "QuickMart", avatar: "QM", email: "quick@mart.mw", location: "Lilongwe", category: "Groceries", totalProducts: 312, totalSales: 450000, totalFollowers: 189, joinDate: "2025-11-20", status: "Suspended", canPost: false, canDiscount: false, internationalShipping: false, feeRate: 12 },
  { id: "V008", name: "Afri Threads", avatar: "AT", email: "afri@threads.mw", location: "Lilongwe", category: "Fashion", totalProducts: 0, totalSales: 0, totalFollowers: 12, joinDate: "2026-03-10", status: "Pending Setup", canPost: true, canDiscount: false, internationalShipping: false, feeRate: 12 },
  { id: "V009", name: "GadgetZone MW", avatar: "GZ", email: "gadgets@zone.mw", location: "Blantyre", category: "Electronics", totalProducts: 67, totalSales: 890000, totalFollowers: 543, joinDate: "2025-08-28", status: "Active", canPost: true, canDiscount: true, internationalShipping: true, feeRate: 10 },
  { id: "V010", name: "Nature's Best", avatar: "NB", email: "natures@best.mw", location: "Zomba", category: "Health", totalProducts: 34, totalSales: 340000, totalFollowers: 267, joinDate: "2025-12-01", status: "Active", canPost: true, canDiscount: false, internationalShipping: false, feeRate: 12 },
];

export const vendorPayouts: VendorPayout[] = [
  { id: "PAY-001", vendorName: "Zara Collections MW", vendorAvatar: "ZC", amountInEscrow: 456000, deliveryConfirmedDate: "2026-03-17", releaseDate: "2026-03-20", status: "Pending" },
  { id: "PAY-002", vendorName: "TechHub Lilongwe", vendorAvatar: "TH", amountInEscrow: 289000, deliveryConfirmedDate: "2026-03-16", releaseDate: "2026-03-19", status: "Released" },
  { id: "PAY-003", vendorName: "BeautyGlow MW", vendorAvatar: "BG", amountInEscrow: 178000, deliveryConfirmedDate: "2026-03-18", releaseDate: "2026-03-21", status: "Pending" },
  { id: "PAY-004", vendorName: "Fresh Harvest", vendorAvatar: "FH", amountInEscrow: 95000, deliveryConfirmedDate: "2026-03-15", releaseDate: "2026-03-18", status: "On Hold", holdReason: "Customer dispute on ORD-7801" },
  { id: "PAY-005", vendorName: "StylePoint", vendorAvatar: "SP", amountInEscrow: 134000, deliveryConfirmedDate: "2026-03-17", releaseDate: "2026-03-20", status: "Pending" },
  { id: "PAY-006", vendorName: "HomeCraft Blantyre", vendorAvatar: "HC", amountInEscrow: 67000, deliveryConfirmedDate: "2026-03-14", releaseDate: "2026-03-17", status: "Released" },
  { id: "PAY-007", vendorName: "GadgetZone MW", vendorAvatar: "GZ", amountInEscrow: 210000, deliveryConfirmedDate: "2026-03-18", releaseDate: "2026-03-21", status: "Pending" },
  { id: "PAY-008", vendorName: "QuickMart", vendorAvatar: "QM", amountInEscrow: 43000, deliveryConfirmedDate: "2026-03-12", releaseDate: "2026-03-15", status: "Failed" },
];

export const vendorPerformance: VendorPerformance[] = [
  {
    vendorId: "V001", vendorName: "Zara Collections MW", avatar: "ZC",
    revenueByMonth: [
      { month: "Oct", revenue: 340000 }, { month: "Nov", revenue: 420000 }, { month: "Dec", revenue: 580000 },
      { month: "Jan", revenue: 390000 }, { month: "Feb", revenue: 460000 }, { month: "Mar", revenue: 510000 },
    ],
    ordersByMonth: [
      { month: "Oct", orders: 28 }, { month: "Nov", orders: 34 }, { month: "Dec", orders: 47 },
      { month: "Jan", orders: 31 }, { month: "Feb", orders: 38 }, { month: "Mar", orders: 42 },
    ],
    topProducts: [
      { name: "Ankara Print Maxi Dress", units: 87 }, { name: "Chitenge Wrap Skirt", units: 64 },
      { name: "Beaded Necklace Set", units: 52 },
    ],
    avgRating: 4.7, returnRate: 2.1, refundRate: 1.8, flagged: false,
  },
  {
    vendorId: "V002", vendorName: "TechHub Lilongwe", avatar: "TH",
    revenueByMonth: [
      { month: "Oct", revenue: 280000 }, { month: "Nov", revenue: 310000 }, { month: "Dec", revenue: 490000 },
      { month: "Jan", revenue: 260000 }, { month: "Feb", revenue: 320000 }, { month: "Mar", revenue: 380000 },
    ],
    ordersByMonth: [
      { month: "Oct", orders: 19 }, { month: "Nov", orders: 22 }, { month: "Dec", orders: 38 },
      { month: "Jan", orders: 18 }, { month: "Feb", orders: 24 }, { month: "Mar", orders: 29 },
    ],
    topProducts: [
      { name: "Wireless Bluetooth Speaker", units: 72 }, { name: "USB-C Hub 7-in-1", units: 58 },
      { name: "Phone Case Universal", units: 45 },
    ],
    avgRating: 4.5, returnRate: 3.4, refundRate: 2.7, flagged: false,
  },
  {
    vendorId: "V003", vendorName: "BeautyGlow MW", avatar: "BG",
    revenueByMonth: [
      { month: "Oct", revenue: 210000 }, { month: "Nov", revenue: 260000 }, { month: "Dec", revenue: 380000 },
      { month: "Jan", revenue: 240000 }, { month: "Feb", revenue: 290000 }, { month: "Mar", revenue: 340000 },
    ],
    ordersByMonth: [
      { month: "Oct", orders: 32 }, { month: "Nov", orders: 38 }, { month: "Dec", orders: 52 },
      { month: "Jan", orders: 35 }, { month: "Feb", orders: 41 }, { month: "Mar", orders: 48 },
    ],
    topProducts: [
      { name: "Shea Butter Body Cream", units: 95 }, { name: "Cocoa Lip Balm", units: 78 },
      { name: "Hair Growth Oil", units: 61 },
    ],
    avgRating: 4.8, returnRate: 1.2, refundRate: 0.9, flagged: false,
  },
  {
    vendorId: "V004", vendorName: "Fresh Harvest", avatar: "FH",
    revenueByMonth: [
      { month: "Oct", revenue: 180000 }, { month: "Nov", revenue: 195000 }, { month: "Dec", revenue: 230000 },
      { month: "Jan", revenue: 170000 }, { month: "Feb", revenue: 160000 }, { month: "Mar", revenue: 140000 },
    ],
    ordersByMonth: [
      { month: "Oct", orders: 48 }, { month: "Nov", orders: 52 }, { month: "Dec", orders: 61 },
      { month: "Jan", orders: 45 }, { month: "Feb", orders: 42 }, { month: "Mar", orders: 37 },
    ],
    topProducts: [
      { name: "Organic Moringa Powder 500g", units: 68 }, { name: "Dried Mango Slices", units: 54 },
      { name: "Baobab Juice 1L", units: 43 },
    ],
    avgRating: 4.3, returnRate: 4.8, refundRate: 5.2, flagged: true,
  },
  {
    vendorId: "V005", vendorName: "StylePoint", avatar: "SP",
    revenueByMonth: [
      { month: "Oct", revenue: 150000 }, { month: "Nov", revenue: 170000 }, { month: "Dec", revenue: 240000 },
      { month: "Jan", revenue: 130000 }, { month: "Feb", revenue: 145000 }, { month: "Mar", revenue: 160000 },
    ],
    ordersByMonth: [
      { month: "Oct", orders: 14 }, { month: "Nov", orders: 16 }, { month: "Dec", orders: 23 },
      { month: "Jan", orders: 12 }, { month: "Feb", orders: 14 }, { month: "Mar", orders: 16 },
    ],
    topProducts: [
      { name: "Handwoven Tote Bag", units: 42 }, { name: "Leather Belt", units: 31 },
      { name: "Sunglasses Classic", units: 28 },
    ],
    avgRating: 4.6, returnRate: 1.5, refundRate: 1.2, flagged: false,
  },
];

export const payoutHistory = [
  { id: "PH-001", vendorName: "Zara Collections MW", amount: 380000, date: "2026-03-13", bankRef: "NBM-78341", status: "Completed" as const },
  { id: "PH-002", vendorName: "TechHub Lilongwe", amount: 256000, date: "2026-03-12", bankRef: "STD-45219", status: "Completed" as const },
  { id: "PH-003", vendorName: "BeautyGlow MW", amount: 145000, date: "2026-03-11", bankRef: "FMB-91823", status: "Completed" as const },
  { id: "PH-004", vendorName: "Fresh Harvest", amount: 89000, date: "2026-03-10", bankRef: "NBM-67234", status: "Completed" as const },
  { id: "PH-005", vendorName: "HomeCraft Blantyre", amount: 112000, date: "2026-03-09", bankRef: "STD-33847", status: "Completed" as const },
];
