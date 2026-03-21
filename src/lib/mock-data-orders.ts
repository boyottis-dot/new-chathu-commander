// Mock data for Order & Delivery Manager

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";
export type DeliveryMode = "LOCAL" | "INTERNATIONAL";
export type DeliveryStatus = "Awaiting Pickup" | "Packed" | "Dispatched" | "In Transit" | "Out for Delivery" | "Delivered" | "Failed";

export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  vendor: string;
  product: string;
  quantity: number;
  amount: number;
  deliveryFee: number;
  paymentMethod: string;
  status: OrderStatus;
  date: string;
  location: DeliveryMode;
  deliveryStatus: DeliveryStatus;
  trackingNumber?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  address: string;
  city: string;
  country: string;
  flagged: boolean;
}

const names = ["Grace Banda", "Chikondi Phiri", "Tamanda Nyirenda", "Blessings Mkandawire", "Mercy Gondwe", "Daniel Kumwenda", "Esther Chilima", "Patrick Mbewe", "Ruth Kamanga", "Samuel Nkhoma", "Tionge Kalua", "Agnes Mwale", "Joseph Tembo", "Fatsani Zulu", "Chimwemwe Msiska", "Linda Chirwa", "George Jere", "Martha Chisi", "Emmanuel Banda", "Rose Ng'ambi"];
const vendors = ["Zara Collections MW", "TechHub Lilongwe", "BeautyGlow MW", "Fresh Harvest", "StylePoint", "HomeCraft Blantyre", "CraftWorks MW", "Nature's Best MW"];
const products = ["Ankara Print Maxi Dress", "Wireless Bluetooth Speaker", "Shea Butter Body Cream", "Organic Moringa Powder", "Handwoven Tote Bag", "Bamboo Desk Organizer", "Dashiki Shirt", "USB-C Fast Charger", "Leather Sandals", "Baobab Oil"];
const statuses: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];
const deliveryStatuses: DeliveryStatus[] = ["Awaiting Pickup", "Packed", "Dispatched", "In Transit", "Out for Delivery", "Delivered"];
const methods = ["Paychangu", "Stripe", "Mobile Money", "Bank Transfer"];
const cities = ["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Mangochi"];
const intlCities = ["London", "Johannesburg", "Nairobi", "New York", "Dubai"];

export const allOrders: Order[] = Array.from({ length: 50 }, (_, i) => {
  const isLocal = Math.random() > 0.3;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const dStatus = status === "Delivered" ? "Delivered" as DeliveryStatus : status === "Cancelled" ? "Failed" as DeliveryStatus : deliveryStatuses[Math.floor(Math.random() * (deliveryStatuses.length - 1))];
  const city = isLocal ? cities[Math.floor(Math.random() * cities.length)] : intlCities[Math.floor(Math.random() * intlCities.length)];
  const dayOffset = Math.floor(Math.random() * 30);
  const amount = Math.floor(Math.random() * 150000) + 5000;
  const estDays = isLocal ? 3 : 14;
  const orderDate = new Date(Date.now() - dayOffset * 86400000);
  const estDate = new Date(orderDate.getTime() + estDays * 86400000);
  const isOverdue = estDate < new Date() && status !== "Delivered" && status !== "Cancelled" && status !== "Refunded";

  return {
    id: `ORD-${7850 - i}`,
    customer: names[i % names.length],
    customerEmail: `${names[i % names.length].split(" ")[0].toLowerCase()}@email.com`,
    vendor: vendors[i % vendors.length],
    product: products[i % products.length],
    quantity: Math.floor(Math.random() * 3) + 1,
    amount,
    deliveryFee: isLocal ? 2500 : 15000,
    paymentMethod: methods[Math.floor(Math.random() * methods.length)],
    status,
    date: orderDate.toISOString().split("T")[0],
    location: isLocal ? "LOCAL" : "INTERNATIONAL",
    deliveryStatus: dStatus,
    trackingNumber: !isLocal && status !== "Pending" ? `DHL${Math.floor(Math.random() * 9000000000) + 1000000000}` : undefined,
    estimatedDelivery: estDate.toISOString().split("T")[0],
    actualDelivery: status === "Delivered" ? new Date(orderDate.getTime() + (estDays - 1) * 86400000).toISOString().split("T")[0] : undefined,
    address: `${Math.floor(Math.random() * 200) + 1} Main St`,
    city,
    country: isLocal ? "Malawi" : city === "London" ? "UK" : city === "Johannesburg" ? "South Africa" : city === "Nairobi" ? "Kenya" : city === "New York" ? "USA" : "UAE",
    flagged: isOverdue,
  };
});

export const orderStatusOptions: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];
export const deliveryStatusOptions: DeliveryStatus[] = ["Awaiting Pickup", "Packed", "Dispatched", "In Transit", "Out for Delivery", "Delivered", "Failed"];
