// Feed Manager mock data

export const feedPosts = Array.from({ length: 40 }, (_, i) => ({
  id: `POST-${1000 + i}`,
  thumbnail: `https://picsum.photos/seed/${i + 10}/80/80`,
  author: [
    "Zara Collections MW", "Grace Banda", "TechHub Lilongwe", "Mercy Gondwe",
    "BeautyGlow MW", "Daniel Kumwenda", "Fresh Harvest", "Esther Chilima",
    "StylePoint", "Ruth Kamanga", "HomeCraft Blantyre", "Patrick Mbewe",
  ][i % 12],
  authorType: i % 3 === 0 ? "customer" as const : "vendor" as const,
  attachedProduct: i % 4 === 0 ? null : [
    "Ankara Print Maxi Dress", "Wireless Speaker", "Shea Butter Cream",
    "Moringa Powder 500g", "Handwoven Tote Bag", "Denim Jacket",
  ][i % 6],
  datePosted: new Date(Date.now() - i * 3600000 * Math.random() * 24).toISOString(),
  likes: Math.floor(Math.random() * 500) + 10,
  saves: Math.floor(Math.random() * 120) + 2,
  purchaseClicks: Math.floor(Math.random() * 80),
  status: i % 15 === 0 ? "removed" as const : "active" as const,
  reported: i % 8 === 0,
  featured: i % 12 === 0,
}));

export const feedAlgorithmWeights = {
  followedVendors: 70,
  trendingPosts: 50,
  newPosts: 60,
  sponsoredPosts: 30,
};

export const feedPostTypes = [
  { key: "vendor", label: "Vendor Posts", enabled: true },
  { key: "review", label: "Review Posts", enabled: true },
  { key: "collection", label: "Collection Cards", enabled: false },
  { key: "offer", label: "Offer Posts", enabled: true },
];

export const stories = Array.from({ length: 12 }, (_, i) => ({
  id: `STORY-${100 + i}`,
  vendor: [
    "Zara Collections MW", "TechHub Lilongwe", "BeautyGlow MW",
    "Fresh Harvest", "StylePoint", "HomeCraft Blantyre",
    "QuickMart MW", "Glow Cosmetics", "FitWear Africa",
    "Urban Kicks", "Mama's Kitchen", "CraftHouse MW",
  ][i],
  avatar: ["ZC", "TH", "BG", "FH", "SP", "HB", "QM", "GC", "FA", "UK", "MK", "CH"][i],
  thumbnail: `https://picsum.photos/seed/${i + 50}/120/200`,
  postedAt: new Date(Date.now() - i * 1800000).toISOString(),
  views: Math.floor(Math.random() * 2000) + 100,
  featured: i === 0,
  active: i < 10,
}));

export const specialOffers = [
  {
    id: "OFFER-001",
    title: "Flash Friday Sale",
    image: "https://picsum.photos/seed/offer1/400/200",
    discountDetails: "30% off all dresses",
    countdownEnd: new Date(Date.now() + 86400000 * 2).toISOString(),
    attachedProduct: "Ankara Print Maxi Dress",
    ctaText: "Shop Now",
    targetMode: "BOTH" as const,
    active: true,
    expired: false,
  },
  {
    id: "OFFER-002",
    title: "New Arrivals Week",
    image: "https://picsum.photos/seed/offer2/400/200",
    discountDetails: "Buy 2 Get 1 Free",
    countdownEnd: new Date(Date.now() + 86400000 * 5).toISOString(),
    attachedProduct: "Handwoven Tote Bag",
    ctaText: "Explore Collection",
    targetMode: "LOCAL" as const,
    active: true,
    expired: false,
  },
  {
    id: "OFFER-003",
    title: "Tech Clearance",
    image: "https://picsum.photos/seed/offer3/400/200",
    discountDetails: "Up to 50% off electronics",
    countdownEnd: new Date(Date.now() - 86400000).toISOString(),
    attachedProduct: "Wireless Bluetooth Speaker",
    ctaText: "Shop Tech",
    targetMode: "INTERNATIONAL" as const,
    active: false,
    expired: true,
  },
  {
    id: "OFFER-004",
    title: "Beauty Bundle Deal",
    image: "https://picsum.photos/seed/offer4/400/200",
    discountDetails: "15% off skincare sets",
    countdownEnd: new Date(Date.now() + 86400000 * 3).toISOString(),
    attachedProduct: "Shea Butter Body Cream",
    ctaText: "Get Deal",
    targetMode: "BOTH" as const,
    active: false,
    expired: false,
  },
];
