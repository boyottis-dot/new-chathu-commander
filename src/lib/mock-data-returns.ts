export type ReturnStatus = "Requested" | "Approved" | "Shipped Back" | "Received" | "Inspected" | "Restocked" | "Refunded" | "Rejected";
export type ReturnReason = "Defective" | "Wrong Item" | "Not as Described" | "Changed Mind" | "Damaged in Transit" | "Size/Fit Issue";
export type ItemCondition = "New" | "Like New" | "Good" | "Fair" | "Damaged" | "Unsellable";

export interface ReturnRequest {
  id: string;
  orderId: string;
  customer: string;
  customerEmail: string;
  vendor: string;
  product: string;
  quantity: number;
  amount: number;
  reason: ReturnReason;
  status: ReturnStatus;
  condition?: ItemCondition;
  dateRequested: string;
  dateApproved?: string;
  dateReceived?: string;
  dateInspected?: string;
  returnTrackingNumber?: string;
  returnLabel?: string;
  restocked: boolean;
  refundIssued: boolean;
  adminNotes?: string;
  customerNotes: string;
  images: string[];
}

const reasons: ReturnReason[] = ["Defective", "Wrong Item", "Not as Described", "Changed Mind", "Damaged in Transit", "Size/Fit Issue"];
const statuses: ReturnStatus[] = ["Requested", "Approved", "Shipped Back", "Received", "Inspected", "Restocked", "Refunded", "Rejected"];
const conditions: ItemCondition[] = ["New", "Like New", "Good", "Fair", "Damaged", "Unsellable"];
const names = ["Grace Banda", "Chikondi Phiri", "Tamanda Nyirenda", "Blessings Mkandawire", "Mercy Gondwe", "Daniel Kumwenda", "Esther Chilima", "Patrick Mbewe"];
const vendors = ["Zara Collections MW", "TechHub Lilongwe", "BeautyGlow MW", "Fresh Harvest", "StylePoint", "HomeCraft Blantyre"];
const products = ["Ankara Print Maxi Dress", "Wireless Bluetooth Speaker", "Shea Butter Body Cream", "Organic Moringa Powder", "Handwoven Tote Bag", "Bamboo Desk Organizer"];

export const returnRequests: ReturnRequest[] = Array.from({ length: 25 }, (_, i) => {
  const status = statuses[Math.min(i % statuses.length, statuses.length - 1)];
  const dayOffset = Math.floor(Math.random() * 20);
  const reqDate = new Date(Date.now() - dayOffset * 86400000);
  const isProcessed = ["Received", "Inspected", "Restocked", "Refunded"].includes(status);
  return {
    id: `RET-${3000 + i}`,
    orderId: `ORD-${7800 + i}`,
    customer: names[i % names.length],
    customerEmail: `${names[i % names.length].split(" ")[0].toLowerCase()}@email.com`,
    vendor: vendors[i % vendors.length],
    product: products[i % products.length],
    quantity: Math.floor(Math.random() * 2) + 1,
    amount: Math.floor(Math.random() * 40000) + 5000,
    reason: reasons[i % reasons.length],
    status,
    condition: isProcessed ? conditions[Math.floor(Math.random() * conditions.length)] : undefined,
    dateRequested: reqDate.toISOString().split("T")[0],
    dateApproved: status !== "Requested" && status !== "Rejected" ? new Date(reqDate.getTime() + 86400000).toISOString().split("T")[0] : undefined,
    dateReceived: isProcessed ? new Date(reqDate.getTime() + 5 * 86400000).toISOString().split("T")[0] : undefined,
    dateInspected: ["Inspected", "Restocked", "Refunded"].includes(status) ? new Date(reqDate.getTime() + 6 * 86400000).toISOString().split("T")[0] : undefined,
    returnTrackingNumber: status !== "Requested" && status !== "Rejected" ? `RET${Math.floor(Math.random() * 9000000) + 1000000}` : undefined,
    returnLabel: status !== "Requested" ? "return-label.pdf" : undefined,
    restocked: status === "Restocked",
    refundIssued: status === "Refunded",
    adminNotes: isProcessed ? "Item received and inspected by warehouse team." : undefined,
    customerNotes: reasons[i % reasons.length] === "Defective" ? "Product stopped working after 2 days." : "Item doesn't match the listing description.",
    images: ["/placeholder.svg"],
  };
});

export const returnStats = {
  totalThisMonth: 18,
  pendingApproval: 5,
  inTransit: 4,
  awaitingInspection: 3,
  restocked: 8,
  refunded: 12,
  rejected: 2,
  avgProcessingDays: 4.2,
  returnRate: 3.8,
  topReasons: [
    { reason: "Defective", count: 6 },
    { reason: "Wrong Item", count: 4 },
    { reason: "Not as Described", count: 3 },
    { reason: "Size/Fit Issue", count: 3 },
    { reason: "Damaged in Transit", count: 2 },
  ],
};
