export interface FulfillmentZone {
  id: string;
  name: string;
  region: string;
  cities: string[];
  deliveryETA: string;
  flatRate: number;
  perKmRate: number;
  isActive: boolean;
  couriers: string[];
  ordersThisMonth: number;
  avgDeliveryTime: string;
}

export const fulfillmentZones: FulfillmentZone[] = [
  { id: "z1", name: "Lilongwe Metro", region: "Central", cities: ["Lilongwe City", "Area 47", "Area 25", "Kanengo"], deliveryETA: "1-2 hours", flatRate: 1500, perKmRate: 150, isActive: true, couriers: ["Chathu Express", "ZipIt"], ordersThisMonth: 3420, avgDeliveryTime: "1.4 hrs" },
  { id: "z2", name: "Blantyre Metro", region: "Southern", cities: ["Blantyre City", "Limbe", "Chilobwe", "Ndirande"], deliveryETA: "1-3 hours", flatRate: 1500, perKmRate: 150, isActive: true, couriers: ["Chathu Express", "FastTrack"], ordersThisMonth: 2890, avgDeliveryTime: "1.8 hrs" },
  { id: "z3", name: "Mzuzu Zone", region: "Northern", cities: ["Mzuzu City", "Ekwendeni"], deliveryETA: "2-4 hours", flatRate: 2000, perKmRate: 200, isActive: true, couriers: ["Chathu Express"], ordersThisMonth: 980, avgDeliveryTime: "2.6 hrs" },
  { id: "z4", name: "Central Rural", region: "Central", cities: ["Dedza", "Ntcheu", "Salima", "Dowa"], deliveryETA: "1-2 days", flatRate: 3500, perKmRate: 120, isActive: true, couriers: ["Chathu Express", "AXA"], ordersThisMonth: 620, avgDeliveryTime: "1.2 days" },
  { id: "z5", name: "Southern Rural", region: "Southern", cities: ["Zomba", "Mangochi", "Mulanje", "Thyolo"], deliveryETA: "1-2 days", flatRate: 3500, perKmRate: 130, isActive: true, couriers: ["FastTrack", "AXA"], ordersThisMonth: 540, avgDeliveryTime: "1.5 days" },
  { id: "z6", name: "Northern Rural", region: "Northern", cities: ["Karonga", "Chitipa", "Nkhata Bay", "Rumphi"], deliveryETA: "2-3 days", flatRate: 4500, perKmRate: 140, isActive: true, couriers: ["AXA"], ordersThisMonth: 280, avgDeliveryTime: "2.1 days" },
  { id: "z7", name: "Lakeshore", region: "Eastern", cities: ["Monkey Bay", "Cape Maclear", "Nkhotakota", "Salima Beach"], deliveryETA: "1-3 days", flatRate: 4000, perKmRate: 160, isActive: false, couriers: [], ordersThisMonth: 0, avgDeliveryTime: "N/A" },
  { id: "z8", name: "International", region: "Cross-border", cities: ["Mozambique Border", "Zambia Border", "Tanzania Border"], deliveryETA: "5-10 days", flatRate: 15000, perKmRate: 0, isActive: false, couriers: ["DHL", "FedEx"], ordersThisMonth: 45, avgDeliveryTime: "6.2 days" },
];

export const zonePerformance = [
  { zone: "Lilongwe Metro", onTime: 94, late: 4, failed: 2 },
  { zone: "Blantyre Metro", onTime: 91, late: 6, failed: 3 },
  { zone: "Mzuzu Zone", onTime: 87, late: 9, failed: 4 },
  { zone: "Central Rural", onTime: 78, late: 15, failed: 7 },
  { zone: "Southern Rural", onTime: 75, late: 17, failed: 8 },
  { zone: "Northern Rural", onTime: 70, late: 20, failed: 10 },
];
