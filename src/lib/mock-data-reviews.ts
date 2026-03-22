export type ReviewStatus = "published" | "pending" | "rejected" | "featured";
export type ReportStatus = "open" | "dismissed" | "actioned";
export type ReportAction = "dismiss" | "remove_content" | "warn_user" | "suspend_user";

export interface ProductReview {
  id: string;
  productName: string;
  vendorName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  flagged: boolean;
  createdAt: string;
}

export interface VendorReview {
  id: string;
  vendorName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  flagged: boolean;
  createdAt: string;
}

export interface ReportedContent {
  id: string;
  type: "review" | "post" | "product" | "comment";
  contentPreview: string;
  reportedBy: string;
  reportedUser: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}

export const productReviews: ProductReview[] = [
  { id: "PR-001", productName: "Wireless Earbuds Pro", vendorName: "TechHub GH", customerName: "Amara Osei", rating: 5, comment: "Excellent sound quality, very comfortable fit", status: "published", flagged: false, createdAt: "2025-06-18" },
  { id: "PR-002", productName: "Silk Ankara Shirt", vendorName: "StyleVault", customerName: "Kofi Mensah", rating: 2, comment: "Fabric quality is poor, not as advertised", status: "pending", flagged: true, createdAt: "2025-06-17" },
  { id: "PR-003", productName: "Shea Butter Set", vendorName: "BeautyBox", customerName: "Esi Appiah", rating: 4, comment: "Great product, packaging could be better", status: "published", flagged: false, createdAt: "2025-06-16" },
  { id: "PR-004", productName: "Phone Case Bundle", vendorName: "GadgetWorld", customerName: "Yaw Boateng", rating: 1, comment: "Terrible quality. Broke on first day. SCAM!", status: "pending", flagged: true, createdAt: "2025-06-15" },
  { id: "PR-005", productName: "Organic Spice Pack", vendorName: "FreshFoods", customerName: "Abena Darko", rating: 5, comment: "Amazing flavors, will definitely reorder", status: "featured", flagged: false, createdAt: "2025-06-14" },
  { id: "PR-006", productName: "USB-C Hub", vendorName: "TechHub GH", customerName: "Kweku Asante", rating: 3, comment: "Works okay but gets hot after extended use", status: "published", flagged: false, createdAt: "2025-06-13" },
  { id: "PR-007", productName: "Wall Art Canvas", vendorName: "HomeDecor", customerName: "Adjoa Poku", rating: 4, comment: "Beautiful piece, colors are vibrant", status: "published", flagged: false, createdAt: "2025-06-12" },
  { id: "PR-008", productName: "Leather Belt", vendorName: "StyleVault", customerName: "Nana Owusu", rating: 1, comment: "Fake leather, peeling after one week", status: "pending", flagged: true, createdAt: "2025-06-11" },
];

export const vendorReviews: VendorReview[] = [
  { id: "VR-001", vendorName: "TechHub GH", customerName: "Amara Osei", rating: 5, comment: "Fast shipping, great customer service", status: "published", flagged: false, createdAt: "2025-06-18" },
  { id: "VR-002", vendorName: "StyleVault", customerName: "Kofi Mensah", rating: 2, comment: "Slow response to complaints, misleading photos", status: "pending", flagged: true, createdAt: "2025-06-17" },
  { id: "VR-003", vendorName: "BeautyBox", customerName: "Esi Appiah", rating: 4, comment: "Good products, reliable delivery", status: "published", flagged: false, createdAt: "2025-06-16" },
  { id: "VR-004", vendorName: "GadgetWorld", customerName: "Yaw Boateng", rating: 1, comment: "Worst vendor! Selling fake products!", status: "pending", flagged: true, createdAt: "2025-06-15" },
  { id: "VR-005", vendorName: "FreshFoods", customerName: "Abena Darko", rating: 5, comment: "Always fresh, well-packaged products", status: "featured", flagged: false, createdAt: "2025-06-14" },
  { id: "VR-006", vendorName: "HomeDecor", customerName: "Adjoa Poku", rating: 4, comment: "Lovely items, would shop again", status: "published", flagged: false, createdAt: "2025-06-13" },
];

export const reportedContent: ReportedContent[] = [
  { id: "RPT-001", type: "review", contentPreview: "Terrible quality. Broke on first day. SCAM!", reportedBy: "GadgetWorld", reportedUser: "Yaw Boateng", reason: "False claims / defamation", status: "open", createdAt: "2025-06-18" },
  { id: "RPT-002", type: "post", contentPreview: "Buy cheap iPhones here!! DM for price...", reportedBy: "Amara Osei", reportedUser: "SpamAccount42", reason: "Spam / unauthorized selling", status: "open", createdAt: "2025-06-17" },
  { id: "RPT-003", type: "product", contentPreview: "Designer Bag (100% Authentic)", reportedBy: "StyleVault", reportedUser: "FakeGoods", reason: "Counterfeit product listing", status: "open", createdAt: "2025-06-16" },
  { id: "RPT-004", type: "comment", contentPreview: "This vendor is trash, don't buy from...", reportedBy: "BeautyBox", reportedUser: "TrollUser99", reason: "Harassment / hate speech", status: "actioned", createdAt: "2025-06-15" },
  { id: "RPT-005", type: "review", contentPreview: "Worst vendor! Selling fake products!", reportedBy: "GadgetWorld", reportedUser: "Yaw Boateng", reason: "False claims", status: "dismissed", createdAt: "2025-06-14" },
  { id: "RPT-006", type: "post", contentPreview: "Contact me on WhatsApp for cheaper deals", reportedBy: "Kofi Mensah", reportedUser: "ShadyDealer", reason: "Off-platform solicitation", status: "open", createdAt: "2025-06-19" },
];
