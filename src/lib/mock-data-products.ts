// Mock data for Product Manager

export type ProductStatus = "Approved" | "Pending" | "Rejected" | "Deactivated";

export interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  comparePrice?: number;
  vendor: string;
  vendorId: string;
  category: string;
  collection: string;
  stock: number;
  status: ProductStatus;
  variants: { name: string; options: string[] }[];
  dateSubmitted: string;
  dateApproved?: string;
  featured: boolean;
  featureStart?: string;
  featureEnd?: string;
  rating: number;
  reviewCount: number;
  unitsSold: number;
}

export const pendingProducts: Product[] = [
  {
    id: "PRD-501", name: "Handmade Leather Sandals", images: ["/placeholder.svg"], description: "Authentic handmade leather sandals crafted by local artisans in Blantyre.", price: 18500, vendor: "CraftWorks MW", vendorId: "V-012", category: "Fashion", collection: "Summer Essentials", stock: 45, status: "Pending", variants: [{ name: "Size", options: ["38", "39", "40", "41", "42"] }, { name: "Color", options: ["Brown", "Tan", "Black"] }], dateSubmitted: "2026-03-20", rating: 0, reviewCount: 0, unitsSold: 0, featured: false,
  },
  {
    id: "PRD-502", name: "Organic Baobab Oil 100ml", images: ["/placeholder.svg"], description: "Cold-pressed baobab oil sourced from Malawian baobab trees.", price: 12000, vendor: "Nature's Best MW", vendorId: "V-008", category: "Beauty", collection: "Organic Beauty", stock: 120, status: "Pending", variants: [{ name: "Size", options: ["50ml", "100ml", "200ml"] }], dateSubmitted: "2026-03-20", rating: 0, reviewCount: 0, unitsSold: 0, featured: false,
  },
  {
    id: "PRD-503", name: "Chitenge Print Laptop Sleeve", images: ["/placeholder.svg"], description: "Padded laptop sleeve with beautiful chitenge fabric exterior.", price: 15000, vendor: "StylePoint", vendorId: "V-005", category: "Accessories", collection: "Tech Accessories", stock: 30, status: "Pending", variants: [{ name: "Size", options: ["13 inch", "15 inch"] }], dateSubmitted: "2026-03-19", rating: 0, reviewCount: 0, unitsSold: 0, featured: false,
  },
  {
    id: "PRD-504", name: "Dried Mango Strips 250g", images: ["/placeholder.svg"], description: "Sun-dried mango strips, no added sugar.", price: 3500, vendor: "Fresh Harvest", vendorId: "V-004", category: "Food", collection: "Healthy Snacks", stock: 200, status: "Pending", variants: [], dateSubmitted: "2026-03-19", rating: 0, reviewCount: 0, unitsSold: 0, featured: false,
  },
  {
    id: "PRD-505", name: "Wireless Earbuds Pro", images: ["/placeholder.svg"], description: "High-quality wireless earbuds with noise cancellation.", price: 45000, vendor: "TechHub Lilongwe", vendorId: "V-002", category: "Electronics", collection: "Audio", stock: 50, status: "Pending", variants: [{ name: "Color", options: ["Black", "White"] }], dateSubmitted: "2026-03-18", rating: 0, reviewCount: 0, unitsSold: 0, featured: false,
  },
];

export const allProducts: Product[] = [
  {
    id: "PRD-101", name: "Ankara Print Maxi Dress", images: ["/placeholder.svg"], description: "Beautiful full-length ankara print dress.", price: 35000, comparePrice: 42000, vendor: "Zara Collections MW", vendorId: "V-001", category: "Fashion", collection: "New Arrivals", stock: 23, status: "Approved", variants: [{ name: "Size", options: ["S", "M", "L", "XL"] }, { name: "Color", options: ["Blue/Gold", "Red/Black", "Green/White"] }], dateSubmitted: "2026-02-15", dateApproved: "2026-02-16", featured: true, featureStart: "2026-03-01", featureEnd: "2026-03-31", rating: 4.8, reviewCount: 67, unitsSold: 342,
  },
  {
    id: "PRD-102", name: "Wireless Bluetooth Speaker", images: ["/placeholder.svg"], description: "Portable Bluetooth speaker with deep bass.", price: 28000, vendor: "TechHub Lilongwe", vendorId: "V-002", category: "Electronics", collection: "Audio", stock: 15, status: "Approved", variants: [{ name: "Color", options: ["Black", "Blue", "Red"] }], dateSubmitted: "2026-02-10", dateApproved: "2026-02-11", featured: true, featureStart: "2026-03-10", featureEnd: "2026-04-10", rating: 4.5, reviewCount: 43, unitsSold: 287,
  },
  {
    id: "PRD-103", name: "Shea Butter Body Cream 500ml", images: ["/placeholder.svg"], description: "Pure shea butter moisturizing cream.", price: 8500, vendor: "BeautyGlow MW", vendorId: "V-003", category: "Beauty", collection: "Skincare", stock: 89, status: "Approved", variants: [{ name: "Size", options: ["250ml", "500ml"] }], dateSubmitted: "2026-01-20", dateApproved: "2026-01-21", featured: false, rating: 4.7, reviewCount: 92, unitsSold: 256,
  },
  {
    id: "PRD-104", name: "Organic Moringa Powder 500g", images: ["/placeholder.svg"], description: "100% organic moringa leaf powder.", price: 6500, vendor: "Fresh Harvest", vendorId: "V-004", category: "Food", collection: "Superfoods", stock: 156, status: "Approved", variants: [], dateSubmitted: "2026-01-15", dateApproved: "2026-01-16", featured: false, rating: 4.6, reviewCount: 31, unitsSold: 198,
  },
  {
    id: "PRD-105", name: "Handwoven Tote Bag", images: ["/placeholder.svg"], description: "Traditional handwoven tote bag.", price: 22000, vendor: "StylePoint", vendorId: "V-005", category: "Fashion", collection: "Accessories", stock: 34, status: "Approved", variants: [{ name: "Color", options: ["Natural", "Indigo", "Rust"] }], dateSubmitted: "2026-02-01", dateApproved: "2026-02-02", featured: false, rating: 4.9, reviewCount: 28, unitsSold: 176,
  },
  {
    id: "PRD-106", name: "Bamboo Desk Organizer", images: ["/placeholder.svg"], description: "Eco-friendly bamboo desk organizer set.", price: 14000, vendor: "HomeCraft Blantyre", vendorId: "V-006", category: "Home", collection: "Office", stock: 0, status: "Approved", variants: [], dateSubmitted: "2026-02-05", dateApproved: "2026-02-06", featured: false, rating: 4.3, reviewCount: 18, unitsSold: 89,
  },
  {
    id: "PRD-107", name: "Men's Dashiki Shirt", images: ["/placeholder.svg"], description: "Classic dashiki shirt with modern fit.", price: 25000, vendor: "Zara Collections MW", vendorId: "V-001", category: "Fashion", collection: "Men's Fashion", stock: 42, status: "Approved", variants: [{ name: "Size", options: ["M", "L", "XL", "XXL"] }], dateSubmitted: "2026-02-20", dateApproved: "2026-02-21", featured: false, rating: 4.4, reviewCount: 36, unitsSold: 154,
  },
  {
    id: "PRD-108", name: "USB-C Fast Charger 65W", images: ["/placeholder.svg"], description: "GaN fast charger with USB-C PD.", price: 19500, vendor: "TechHub Lilongwe", vendorId: "V-002", category: "Electronics", collection: "Chargers", stock: 67, status: "Approved", variants: [], dateSubmitted: "2026-03-01", dateApproved: "2026-03-02", featured: false, rating: 4.6, reviewCount: 22, unitsSold: 134,
  },
  {
    id: "PRD-109", name: "Expired Face Serum", images: ["/placeholder.svg"], description: "Anti-aging face serum.", price: 32000, vendor: "BeautyGlow MW", vendorId: "V-003", category: "Beauty", collection: "Skincare", stock: 5, status: "Deactivated", variants: [], dateSubmitted: "2025-12-01", dateApproved: "2025-12-02", featured: false, rating: 3.2, reviewCount: 8, unitsSold: 12,
  },
  {
    id: "PRD-110", name: "Rejected Low Quality Item", images: ["/placeholder.svg"], description: "Item rejected for quality.", price: 5000, vendor: "QuickMart", vendorId: "V-010", category: "Other", collection: "", stock: 0, status: "Rejected", variants: [], dateSubmitted: "2026-03-15", featured: false, rating: 0, reviewCount: 0, unitsSold: 0,
  },
  ...pendingProducts,
];

export const productCategories = ["Fashion", "Electronics", "Beauty", "Food", "Home", "Accessories", "Other"];
export const productCollections = ["New Arrivals", "Audio", "Skincare", "Superfoods", "Accessories", "Office", "Men's Fashion", "Chargers", "Summer Essentials", "Organic Beauty", "Tech Accessories", "Healthy Snacks"];
