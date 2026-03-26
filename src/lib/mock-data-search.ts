export interface SearchQuery {
  id: string;
  term: string;
  count: number;
  results: number;
  conversions: number;
  conversionRate: number;
  trend: "up" | "down" | "stable";
}

export interface ZeroResultQuery {
  id: string;
  term: string;
  count: number;
  lastSearched: string;
  suggestedAction: string;
}

export const topSearches: SearchQuery[] = [
  { id: "s1", term: "iPhone 15 Pro Max", count: 4820, results: 12, conversions: 890, conversionRate: 18.5, trend: "up" },
  { id: "s2", term: "Nike Air Force 1", count: 3650, results: 28, conversions: 720, conversionRate: 19.7, trend: "up" },
  { id: "s3", term: "Samsung Galaxy S24", count: 3200, results: 8, conversions: 540, conversionRate: 16.9, trend: "stable" },
  { id: "s4", term: "Chitenje fabric", count: 2890, results: 45, conversions: 680, conversionRate: 23.5, trend: "up" },
  { id: "s5", term: "Bluetooth earbuds", count: 2540, results: 32, conversions: 410, conversionRate: 16.1, trend: "down" },
  { id: "s6", term: "Baby clothes", count: 2100, results: 56, conversions: 520, conversionRate: 24.8, trend: "up" },
  { id: "s7", term: "Cooking oil", count: 1980, results: 18, conversions: 390, conversionRate: 19.7, trend: "stable" },
  { id: "s8", term: "School bags", count: 1850, results: 24, conversions: 340, conversionRate: 18.4, trend: "down" },
  { id: "s9", term: "Solar panels", count: 1720, results: 6, conversions: 180, conversionRate: 10.5, trend: "up" },
  { id: "s10", term: "Hair extensions", count: 1650, results: 38, conversions: 420, conversionRate: 25.5, trend: "up" },
  { id: "s11", term: "Laptop stand", count: 1520, results: 14, conversions: 280, conversionRate: 18.4, trend: "stable" },
  { id: "s12", term: "Maize flour", count: 1480, results: 22, conversions: 310, conversionRate: 20.9, trend: "stable" },
];

export const zeroResultQueries: ZeroResultQuery[] = [
  { id: "z1", term: "PS5 controller skin", count: 320, lastSearched: "2026-03-25", suggestedAction: "Add category" },
  { id: "z2", term: "Starlink kit Malawi", count: 280, lastSearched: "2026-03-26", suggestedAction: "Partner with vendor" },
  { id: "z3", term: "Electric scooter", count: 245, lastSearched: "2026-03-24", suggestedAction: "Add products" },
  { id: "z4", term: "Protein powder", count: 210, lastSearched: "2026-03-25", suggestedAction: "Add category" },
  { id: "z5", term: "Standing desk", count: 190, lastSearched: "2026-03-23", suggestedAction: "Add products" },
  { id: "z6", term: "Ring light", count: 175, lastSearched: "2026-03-26", suggestedAction: "Synonym mapping" },
  { id: "z7", term: "Weighted blanket", count: 160, lastSearched: "2026-03-22", suggestedAction: "Add products" },
  { id: "z8", term: "Drone camera", count: 148, lastSearched: "2026-03-25", suggestedAction: "Partner with vendor" },
];

export const searchTrends = [
  { date: "Mar 1", searches: 12400, conversions: 2100 },
  { date: "Mar 5", searches: 13200, conversions: 2350 },
  { date: "Mar 9", searches: 11800, conversions: 1980 },
  { date: "Mar 13", searches: 14500, conversions: 2680 },
  { date: "Mar 17", searches: 15200, conversions: 2900 },
  { date: "Mar 21", searches: 16800, conversions: 3200 },
  { date: "Mar 25", searches: 17500, conversions: 3450 },
];

export const categorySearchShare = [
  { category: "Electronics", share: 32, searches: 18400 },
  { category: "Fashion", share: 24, searches: 13800 },
  { category: "Home & Living", share: 16, searches: 9200 },
  { category: "Food & Grocery", share: 12, searches: 6900 },
  { category: "Beauty", share: 9, searches: 5180 },
  { category: "Sports", share: 4, searches: 2300 },
  { category: "Other", share: 3, searches: 1720 },
];
