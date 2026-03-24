export interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  vendor: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  maxStock: number;
  location: string;
  lastRestocked: string;
  unitCost: number;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Overstock";
}

export interface StockMovement {
  id: string;
  productName: string;
  sku: string;
  type: "Inbound" | "Outbound" | "Adjustment" | "Return";
  quantity: number;
  date: string;
  reference: string;
  note: string;
}

export interface RestockRequest {
  id: string;
  productName: string;
  sku: string;
  vendor: string;
  quantityRequested: number;
  currentStock: number;
  status: "Pending" | "Approved" | "Ordered" | "Received" | "Cancelled";
  requestedDate: string;
  expectedDate: string;
}

const locations = ["Lilongwe Warehouse", "Blantyre Hub", "Mzuzu Storage", "Zomba Depot"];
const categories = ["Fashion", "Electronics", "Beauty", "Groceries", "Home & Living", "Health"];
const vendors = ["Zara Collections MW", "TechWorld Malawi", "Beauty Haven", "FreshMart", "HomeStyle MW", "VitaHealth"];

const productNames = [
  "Cotton T-Shirt", "Wireless Earbuds", "Face Moisturizer", "Organic Rice 5kg", "Throw Pillow Set",
  "Vitamin C Tablets", "Denim Jacket", "Phone Charger", "Hair Oil", "Fresh Milk 1L",
  "Ceramic Vase", "First Aid Kit", "Silk Scarf", "Bluetooth Speaker", "Lip Balm Set",
  "Brown Sugar 2kg", "Bed Sheet Set", "Eye Drops", "Running Shoes", "USB Cable",
  "Sunscreen SPF50", "Pasta 500g", "Table Lamp", "Pain Relief Gel", "Leather Belt",
];

export const inventoryItems: InventoryItem[] = productNames.map((name, i) => {
  const stock = [0, 3, 5, 12, 45, 78, 150, 200, 8, 2, 95, 1, 60, 30, 4, 180, 25, 0, 55, 7, 120, 42, 15, 3, 88][i];
  const reorder = [20, 10, 15, 20, 10, 25, 15, 30, 10, 20, 15, 10, 20, 10, 15, 25, 10, 20, 15, 10, 20, 15, 10, 15, 10][i];
  const status: InventoryItem["status"] = stock === 0 ? "Out of Stock" : stock <= reorder ? "Low Stock" : stock > 180 ? "Overstock" : "In Stock";
  return {
    id: `INV-${(i + 1).toString().padStart(4, "0")}`,
    productName: name,
    sku: `SKU-${(1000 + i).toString()}`,
    vendor: vendors[i % vendors.length],
    category: categories[i % categories.length],
    currentStock: stock,
    reorderLevel: reorder,
    maxStock: 200,
    location: locations[i % locations.length],
    lastRestocked: `2026-0${(i % 3) + 1}-${(10 + (i % 18)).toString().padStart(2, "0")}`,
    unitCost: [450, 12000, 3500, 8900, 6500, 2200, 15000, 1800, 4500, 950, 7800, 3200, 9500, 18000, 1500, 2800, 5500, 1200, 22000, 800, 4200, 1600, 8500, 2900, 7200][i],
    status,
  };
});

export const stockMovements: StockMovement[] = [
  { id: "SM-001", productName: "Cotton T-Shirt", sku: "SKU-1000", type: "Outbound", quantity: -15, date: "2026-03-23", reference: "ORD-4521", note: "Customer order fulfillment" },
  { id: "SM-002", productName: "Wireless Earbuds", sku: "SKU-1001", type: "Inbound", quantity: 50, date: "2026-03-22", reference: "PO-0089", note: "Vendor restock delivery" },
  { id: "SM-003", productName: "Face Moisturizer", sku: "SKU-1002", type: "Return", quantity: 2, date: "2026-03-22", reference: "RET-0034", note: "Customer return — unopened" },
  { id: "SM-004", productName: "Organic Rice 5kg", sku: "SKU-1003", type: "Outbound", quantity: -8, date: "2026-03-21", reference: "ORD-4519", note: "Bulk order" },
  { id: "SM-005", productName: "Throw Pillow Set", sku: "SKU-1004", type: "Adjustment", quantity: -3, date: "2026-03-21", reference: "ADJ-012", note: "Damaged during handling" },
  { id: "SM-006", productName: "Denim Jacket", sku: "SKU-1006", type: "Inbound", quantity: 30, date: "2026-03-20", reference: "PO-0088", note: "New season stock" },
  { id: "SM-007", productName: "Phone Charger", sku: "SKU-1007", type: "Outbound", quantity: -22, date: "2026-03-20", reference: "ORD-4515", note: "Flash sale orders" },
  { id: "SM-008", productName: "Running Shoes", sku: "SKU-1018", type: "Inbound", quantity: 40, date: "2026-03-19", reference: "PO-0087", note: "Restock from vendor" },
  { id: "SM-009", productName: "Sunscreen SPF50", sku: "SKU-1020", type: "Outbound", quantity: -10, date: "2026-03-19", reference: "ORD-4510", note: "Summer promo orders" },
  { id: "SM-010", productName: "Bluetooth Speaker", sku: "SKU-1013", type: "Adjustment", quantity: 5, date: "2026-03-18", reference: "ADJ-011", note: "Count correction after audit" },
];

export const restockRequests: RestockRequest[] = [
  { id: "RST-001", productName: "Cotton T-Shirt", sku: "SKU-1000", vendor: "Zara Collections MW", quantityRequested: 100, currentStock: 0, status: "Approved", requestedDate: "2026-03-22", expectedDate: "2026-03-28" },
  { id: "RST-002", productName: "Eye Drops", sku: "SKU-1017", vendor: "VitaHealth", quantityRequested: 50, currentStock: 0, status: "Ordered", requestedDate: "2026-03-20", expectedDate: "2026-03-26" },
  { id: "RST-003", productName: "Fresh Milk 1L", sku: "SKU-1009", vendor: "FreshMart", quantityRequested: 80, currentStock: 2, status: "Pending", requestedDate: "2026-03-23", expectedDate: "" },
  { id: "RST-004", productName: "Wireless Earbuds", sku: "SKU-1001", vendor: "TechWorld Malawi", quantityRequested: 60, currentStock: 3, status: "Received", requestedDate: "2026-03-15", expectedDate: "2026-03-22" },
  { id: "RST-005", productName: "USB Cable", sku: "SKU-1019", vendor: "TechWorld Malawi", quantityRequested: 100, currentStock: 7, status: "Pending", requestedDate: "2026-03-23", expectedDate: "" },
  { id: "RST-006", productName: "Lip Balm Set", sku: "SKU-1014", vendor: "Beauty Haven", quantityRequested: 40, currentStock: 4, status: "Cancelled", requestedDate: "2026-03-10", expectedDate: "" },
];
