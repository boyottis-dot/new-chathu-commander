export interface CLVCustomer {
  id: string;
  name: string;
  email: string;
  clv: number;
  segment: "Champion" | "Loyal" | "At Risk" | "New" | "Dormant";
  recency: number; // days since last order
  frequency: number; // orders per month
  monetary: number; // avg order value
  firstOrder: string;
  lastOrder: string;
  totalOrders: number;
  churnRisk: "Low" | "Medium" | "High";
}

export const clvCustomers: CLVCustomer[] = [
  { id: "c1", name: "Grace Banda", email: "grace@mail.mw", clv: 2850000, segment: "Champion", recency: 2, frequency: 4.2, monetary: 45000, firstOrder: "2024-06-12", lastOrder: "2026-03-24", totalOrders: 89, churnRisk: "Low" },
  { id: "c2", name: "James Phiri", email: "james@mail.mw", clv: 2100000, segment: "Champion", recency: 5, frequency: 3.8, monetary: 38000, firstOrder: "2024-08-20", lastOrder: "2026-03-21", totalOrders: 72, churnRisk: "Low" },
  { id: "c3", name: "Fatima Salim", email: "fatima@mail.mw", clv: 1680000, segment: "Loyal", recency: 8, frequency: 2.9, monetary: 32000, firstOrder: "2024-10-05", lastOrder: "2026-03-18", totalOrders: 54, churnRisk: "Low" },
  { id: "c4", name: "Peter Mwale", email: "peter@mail.mw", clv: 1450000, segment: "Loyal", recency: 12, frequency: 2.5, monetary: 28000, firstOrder: "2025-01-15", lastOrder: "2026-03-14", totalOrders: 38, churnRisk: "Medium" },
  { id: "c5", name: "Mary Chirwa", email: "mary@mail.mw", clv: 980000, segment: "At Risk", recency: 35, frequency: 1.8, monetary: 25000, firstOrder: "2025-03-10", lastOrder: "2026-02-19", totalOrders: 22, churnRisk: "High" },
  { id: "c6", name: "John Gondwe", email: "john@mail.mw", clv: 750000, segment: "At Risk", recency: 42, frequency: 1.2, monetary: 22000, firstOrder: "2025-05-20", lastOrder: "2026-02-12", totalOrders: 15, churnRisk: "High" },
  { id: "c7", name: "Esther Nkhoma", email: "esther@mail.mw", clv: 420000, segment: "New", recency: 3, frequency: 2.1, monetary: 18000, firstOrder: "2026-01-10", lastOrder: "2026-03-23", totalOrders: 6, churnRisk: "Low" },
  { id: "c8", name: "Daniel Kamanga", email: "daniel@mail.mw", clv: 380000, segment: "New", recency: 7, frequency: 1.8, monetary: 15000, firstOrder: "2026-02-01", lastOrder: "2026-03-19", totalOrders: 4, churnRisk: "Medium" },
  { id: "c9", name: "Chikondi Msiska", email: "chikondi@mail.mw", clv: 290000, segment: "Dormant", recency: 68, frequency: 0.5, monetary: 20000, firstOrder: "2025-04-15", lastOrder: "2026-01-17", totalOrders: 8, churnRisk: "High" },
  { id: "c10", name: "Ruth Ngwira", email: "ruth@mail.mw", clv: 180000, segment: "Dormant", recency: 90, frequency: 0.3, monetary: 12000, firstOrder: "2025-06-20", lastOrder: "2025-12-26", totalOrders: 3, churnRisk: "High" },
];

export const cohortData = [
  { cohort: "2024 Q3", month1: 100, month2: 72, month3: 58, month4: 48, month5: 42, month6: 38 },
  { cohort: "2024 Q4", month1: 100, month2: 68, month3: 52, month4: 44, month5: 39, month6: 0 },
  { cohort: "2025 Q1", month1: 100, month2: 75, month3: 60, month4: 50, month5: 0, month6: 0 },
  { cohort: "2025 Q2", month1: 100, month2: 70, month3: 55, month4: 0, month5: 0, month6: 0 },
  { cohort: "2025 Q3", month1: 100, month2: 78, month3: 0, month4: 0, month5: 0, month6: 0 },
  { cohort: "2025 Q4", month1: 100, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0 },
];

export const segmentDistribution = [
  { segment: "Champion", count: 245, revenue: 48500000, color: "hsl(72, 85%, 71%)" },
  { segment: "Loyal", count: 580, revenue: 32800000, color: "hsl(142, 71%, 45%)" },
  { segment: "At Risk", count: 320, revenue: 12400000, color: "hsl(38, 92%, 50%)" },
  { segment: "New", count: 890, revenue: 8900000, color: "hsl(217, 91%, 60%)" },
  { segment: "Dormant", count: 410, revenue: 3200000, color: "hsl(0, 72%, 51%)" },
];

export const clvTrends = [
  { month: "Oct", avgCLV: 850000, newCustomers: 120, churnedCustomers: 18 },
  { month: "Nov", avgCLV: 920000, newCustomers: 145, churnedCustomers: 22 },
  { month: "Dec", avgCLV: 1050000, newCustomers: 210, churnedCustomers: 15 },
  { month: "Jan", avgCLV: 980000, newCustomers: 165, churnedCustomers: 28 },
  { month: "Feb", avgCLV: 1020000, newCustomers: 180, churnedCustomers: 20 },
  { month: "Mar", avgCLV: 1100000, newCustomers: 195, churnedCustomers: 16 },
];
