// Shop Manager mock data

export const heroSlides = [
  { id: "SLIDE-1", image: "https://picsum.photos/seed/hero1/800/400", headline: "New Season Arrivals", ctaText: "Shop Now", ctaLink: "/collections/new-arrivals", targetMode: "BOTH" as const, active: true, order: 1 },
  { id: "SLIDE-2", image: "https://picsum.photos/seed/hero2/800/400", headline: "Up to 40% Off Electronics", ctaText: "Browse Deals", ctaLink: "/collections/electronics", targetMode: "LOCAL" as const, active: true, order: 2 },
  { id: "SLIDE-3", image: "https://picsum.photos/seed/hero3/800/400", headline: "Free Shipping Worldwide", ctaText: "Learn More", ctaLink: "/shipping", targetMode: "INTERNATIONAL" as const, active: false, order: 3 },
  { id: "SLIDE-4", image: "https://picsum.photos/seed/hero4/800/400", headline: "Handmade African Crafts", ctaText: "Explore", ctaLink: "/collections/crafts", targetMode: "BOTH" as const, active: true, order: 4 },
];

export const categoryPills = [
  { id: "CP-1", icon: "👗", label: "Fashion", linkedCollection: "fashion", targetMode: "BOTH" as const, order: 1 },
  { id: "CP-2", icon: "📱", label: "Electronics", linkedCollection: "electronics", targetMode: "BOTH" as const, order: 2 },
  { id: "CP-3", icon: "💄", label: "Beauty", linkedCollection: "beauty", targetMode: "BOTH" as const, order: 3 },
  { id: "CP-4", icon: "🏠", label: "Home & Living", linkedCollection: "home-living", targetMode: "LOCAL" as const, order: 4 },
  { id: "CP-5", icon: "🌿", label: "Organic", linkedCollection: "organic", targetMode: "BOTH" as const, order: 5 },
  { id: "CP-6", icon: "👟", label: "Footwear", linkedCollection: "footwear", targetMode: "BOTH" as const, order: 6 },
];

export const featuredBanner = {
  image: "https://picsum.photos/seed/banner1/800/300",
  title: "Curated African Collection",
  subtitle: "Discover authentic handmade products from across Malawi",
  cta: "View Collection",
  linkedCollection: "african-collection",
  targetMode: "BOTH" as const,
};

export const partnerBrands = [
  { id: "PB-1", name: "Airtel MW", logo: "https://picsum.photos/seed/brand1/120/60", order: 1 },
  { id: "PB-2", name: "TNM", logo: "https://picsum.photos/seed/brand2/120/60", order: 2 },
  { id: "PB-3", name: "National Bank", logo: "https://picsum.photos/seed/brand3/120/60", order: 3 },
  { id: "PB-4", name: "FDH Bank", logo: "https://picsum.photos/seed/brand4/120/60", order: 4 },
  { id: "PB-5", name: "Globe Internet", logo: "https://picsum.photos/seed/brand5/120/60", order: 5 },
];

export const valuePropositions = [
  { id: "VP-1", icon: "🚚", title: "Fast Delivery", description: "Same-day delivery in Lilongwe & Blantyre", targetMode: "LOCAL" as const },
  { id: "VP-2", icon: "🔒", title: "Secure Payments", description: "Pay safely with Paychangu or Stripe", targetMode: "BOTH" as const },
  { id: "VP-3", icon: "↩️", title: "Easy Returns", description: "14-day hassle-free return policy", targetMode: "BOTH" as const },
  { id: "VP-4", icon: "🌍", title: "Ship Worldwide", description: "DHL international shipping available", targetMode: "INTERNATIONAL" as const },
];

export const faqItems = [
  { id: "FAQ-1", question: "How do I place an order?", answer: "Browse products, add to cart, and checkout with your preferred payment method.", targetMode: "BOTH" as const, order: 1 },
  { id: "FAQ-2", question: "What payment methods are accepted?", answer: "We accept Airtel Money, TNM Mpamba, bank transfer, and international cards via Stripe.", targetMode: "BOTH" as const, order: 2 },
  { id: "FAQ-3", question: "How long does delivery take?", answer: "Local: 1-3 business days. International: 7-14 business days via DHL.", targetMode: "BOTH" as const, order: 3 },
  { id: "FAQ-4", question: "Can I return a product?", answer: "Yes, within 14 days of delivery. Contact customer support to initiate a return.", targetMode: "BOTH" as const, order: 4 },
];

export const footerLinks = {
  navigation: [
    { label: "About Us", url: "/about" },
    { label: "Contact", url: "/contact" },
    { label: "Careers", url: "/careers" },
    { label: "Terms of Service", url: "/terms" },
    { label: "Privacy Policy", url: "/privacy" },
  ],
  social: {
    facebook: "https://facebook.com/chathu",
    instagram: "https://instagram.com/chathu",
    twitter: "https://x.com/chathu",
    tiktok: "https://tiktok.com/@chathu",
  },
  contact: {
    email: "support@chathu.mw",
    phone: "+265 999 123 456",
    address: "Area 47, Lilongwe, Malawi",
  },
};

// Categories
export const categories = [
  { id: "CAT-1", name: "Fashion", icon: "👗", image: "https://picsum.photos/seed/cat1/200/200", targetMode: "BOTH" as const, order: 1, visible: true, productCount: 234 },
  { id: "CAT-2", name: "Electronics", icon: "📱", image: "https://picsum.photos/seed/cat2/200/200", targetMode: "BOTH" as const, order: 2, visible: true, productCount: 156 },
  { id: "CAT-3", name: "Beauty & Skincare", icon: "💄", image: "https://picsum.photos/seed/cat3/200/200", targetMode: "BOTH" as const, order: 3, visible: true, productCount: 189 },
  { id: "CAT-4", name: "Home & Living", icon: "🏠", image: "https://picsum.photos/seed/cat4/200/200", targetMode: "LOCAL" as const, order: 4, visible: true, productCount: 98 },
  { id: "CAT-5", name: "Organic & Health", icon: "🌿", image: "https://picsum.photos/seed/cat5/200/200", targetMode: "BOTH" as const, order: 5, visible: true, productCount: 67 },
  { id: "CAT-6", name: "Footwear", icon: "👟", image: "https://picsum.photos/seed/cat6/200/200", targetMode: "BOTH" as const, order: 6, visible: false, productCount: 45 },
  { id: "CAT-7", name: "Accessories", icon: "👜", image: "https://picsum.photos/seed/cat7/200/200", targetMode: "INTERNATIONAL" as const, order: 7, visible: true, productCount: 112 },
  { id: "CAT-8", name: "Food & Groceries", icon: "🛒", image: "https://picsum.photos/seed/cat8/200/200", targetMode: "LOCAL" as const, order: 8, visible: true, productCount: 78 },
];

// Collections
export const collections = [
  { id: "COL-1", name: "New Arrivals", headerImage: "https://picsum.photos/seed/col1/400/200", description: "Latest products from all vendors", targetMode: "BOTH" as const, order: 1, visible: true, featured: true, productCount: 48 },
  { id: "COL-2", name: "Best Sellers", headerImage: "https://picsum.photos/seed/col2/400/200", description: "Top selling products this month", targetMode: "BOTH" as const, order: 2, visible: true, featured: false, productCount: 32 },
  { id: "COL-3", name: "African Crafts", headerImage: "https://picsum.photos/seed/col3/400/200", description: "Handmade crafts from Malawian artisans", targetMode: "INTERNATIONAL" as const, order: 3, visible: true, featured: false, productCount: 27 },
  { id: "COL-4", name: "Summer Essentials", headerImage: "https://picsum.photos/seed/col4/400/200", description: "Stay cool with our summer picks", targetMode: "BOTH" as const, order: 4, visible: true, featured: false, productCount: 19 },
  { id: "COL-5", name: "Local Favorites", headerImage: "https://picsum.photos/seed/col5/400/200", description: "Most loved products in Malawi", targetMode: "LOCAL" as const, order: 5, visible: false, featured: false, productCount: 41 },
  { id: "COL-6", name: "Gift Ideas", headerImage: "https://picsum.photos/seed/col6/400/200", description: "Perfect gifts for every occasion", targetMode: "BOTH" as const, order: 6, visible: true, featured: false, productCount: 22 },
];
