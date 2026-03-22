export type RefundStatus = "pending" | "approved" | "rejected" | "escalated";
export type RefundReason = "defective" | "wrong_item" | "not_received" | "changed_mind" | "other";

export interface RefundRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  vendorName: string;
  productName: string;
  orderTotal: number;
  deliveryFee: number;
  refundAmount: number;
  reason: RefundReason;
  description: string;
  status: RefundStatus;
  createdAt: string;
  resolvedAt?: string;
}

export const refundRequests: RefundRequest[] = [
  { id: "REF-001", orderId: "ORD-1042", customerName: "Amara Osei", customerEmail: "amara@mail.com", vendorName: "TechHub GH", productName: "Wireless Earbuds Pro", orderTotal: 85, deliveryFee: 8, refundAmount: 77, reason: "defective", description: "Left earbud not working after 2 days", status: "pending", createdAt: "2025-06-18" },
  { id: "REF-002", orderId: "ORD-1038", customerName: "Kofi Mensah", customerEmail: "kofi.m@mail.com", vendorName: "StyleVault", productName: "Silk Ankara Shirt", orderTotal: 45, deliveryFee: 5, refundAmount: 40, reason: "wrong_item", description: "Received size L instead of M", status: "pending", createdAt: "2025-06-17" },
  { id: "REF-003", orderId: "ORD-1025", customerName: "Esi Appiah", customerEmail: "esi.a@mail.com", vendorName: "BeautyBox", productName: "Shea Butter Set", orderTotal: 32, deliveryFee: 4, refundAmount: 28, reason: "not_received", description: "Order shows delivered but never received", status: "escalated", createdAt: "2025-06-15", resolvedAt: "2025-06-17" },
  { id: "REF-004", orderId: "ORD-1019", customerName: "Yaw Boateng", customerEmail: "yaw.b@mail.com", vendorName: "GadgetWorld", productName: "Phone Case Bundle", orderTotal: 22, deliveryFee: 3, refundAmount: 19, reason: "changed_mind", description: "No longer need the product", status: "rejected", createdAt: "2025-06-14", resolvedAt: "2025-06-15" },
  { id: "REF-005", orderId: "ORD-1010", customerName: "Abena Darko", customerEmail: "abena.d@mail.com", vendorName: "FreshFoods", productName: "Organic Spice Pack", orderTotal: 18, deliveryFee: 3, refundAmount: 15, reason: "defective", description: "Package arrived damaged and leaking", status: "approved", createdAt: "2025-06-12", resolvedAt: "2025-06-13" },
  { id: "REF-006", orderId: "ORD-998", customerName: "Kweku Asante", customerEmail: "kweku@mail.com", vendorName: "TechHub GH", productName: "USB-C Hub", orderTotal: 55, deliveryFee: 5, refundAmount: 50, reason: "defective", description: "Ports not recognizing devices", status: "approved", createdAt: "2025-06-10", resolvedAt: "2025-06-11" },
  { id: "REF-007", orderId: "ORD-985", customerName: "Adjoa Poku", customerEmail: "adjoa.p@mail.com", vendorName: "HomeDecor", productName: "Wall Art Canvas", orderTotal: 70, deliveryFee: 10, refundAmount: 60, reason: "wrong_item", description: "Received completely different design", status: "pending", createdAt: "2025-06-19" },
  { id: "REF-008", orderId: "ORD-972", customerName: "Nana Owusu", customerEmail: "nana.o@mail.com", vendorName: "StyleVault", productName: "Leather Belt", orderTotal: 28, deliveryFee: 4, refundAmount: 24, reason: "other", description: "Quality much lower than advertised photos", status: "pending", createdAt: "2025-06-19" },
];

export const refundStats = {
  totalThisMonth: 12,
  totalAmount: 485,
  refundRate: 3.2,
  avgResolutionDays: 1.8,
  topVendorsByRefundRate: [
    { vendor: "TechHub GH", rate: 5.1, count: 4 },
    { vendor: "StyleVault", rate: 3.8, count: 3 },
    { vendor: "HomeDecor", rate: 2.9, count: 2 },
    { vendor: "BeautyBox", rate: 1.5, count: 1 },
    { vendor: "FreshFoods", rate: 1.2, count: 1 },
  ],
};
