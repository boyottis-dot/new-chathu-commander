// Team & HR mock data

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  role: string;
  type: "full-time" | "part-time" | "contract" | "intern";
  status: "active" | "on-leave" | "suspended" | "terminated";
  joinDate: string;
  salary: number;
  location: string;
  skills: string[];
  assignedTasks: number;
  completedTasks: number;
  performance: number; // 0-100
}

export interface Department {
  id: string;
  name: string;
  head: string;
  headEmail: string;
  employeeCount: number;
  budget: number;
  budgetUsed: number;
  color: string;
  description: string;
}

export interface CustomRole {
  id: string;
  name: string;
  department: string;
  permissions: string[];
  employeeCount: number;
}

export interface Influencer {
  id: string;
  name: string;
  email: string;
  platform: string;
  handle: string;
  followers: number;
  engagementRate: number;
  status: "active" | "pending" | "paused" | "terminated";
  totalCampaigns: number;
  totalSales: number;
  commission: number;
  joinDate: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  location: string;
  niche: string;
}

export const departments: Department[] = [
  { id: "dept-1", name: "Customer Support", head: "Grace Banda", headEmail: "grace@chathu.mw", employeeCount: 12, budget: 2400000, budgetUsed: 1800000, color: "#3b82f6", description: "Handle customer inquiries, complaints, and returns" },
  { id: "dept-2", name: "Marketing", head: "James Phiri", headEmail: "james@chathu.mw", employeeCount: 8, budget: 5000000, budgetUsed: 3200000, color: "#10b981", description: "Brand promotion, campaigns, and social media management" },
  { id: "dept-3", name: "Operations", head: "Mary Chirwa", headEmail: "mary@chathu.mw", employeeCount: 15, budget: 3500000, budgetUsed: 2900000, color: "#f59e0b", description: "Logistics, warehouse, and day-to-day operations" },
  { id: "dept-4", name: "Influencer Relations", head: "Daniel Mwale", headEmail: "daniel@chathu.mw", employeeCount: 5, budget: 4000000, budgetUsed: 2100000, color: "#8b5cf6", description: "Manage influencer partnerships and ambassador programs" },
  { id: "dept-5", name: "Finance", head: "Sarah Kamanga", headEmail: "sarah@chathu.mw", employeeCount: 6, budget: 1500000, budgetUsed: 1100000, color: "#ef4444", description: "Accounting, payroll, and financial planning" },
  { id: "dept-6", name: "Technology", head: "Peter Ngoma", headEmail: "peter@chathu.mw", employeeCount: 10, budget: 6000000, budgetUsed: 4500000, color: "#06b6d4", description: "Platform development and technical infrastructure" },
];

export const customRoles: CustomRole[] = [
  { id: "role-1", name: "Support Agent", department: "Customer Support", permissions: ["view_orders", "manage_refunds", "contact_customers"], employeeCount: 8 },
  { id: "role-2", name: "Support Lead", department: "Customer Support", permissions: ["view_orders", "manage_refunds", "contact_customers", "assign_tasks", "view_reports"], employeeCount: 2 },
  { id: "role-3", name: "Campaign Manager", department: "Marketing", permissions: ["create_campaigns", "manage_feed", "view_analytics", "manage_promos"], employeeCount: 3 },
  { id: "role-4", name: "Content Creator", department: "Marketing", permissions: ["create_posts", "manage_feed", "upload_media"], employeeCount: 4 },
  { id: "role-5", name: "Warehouse Staff", department: "Operations", permissions: ["view_orders", "update_delivery", "manage_stock"], employeeCount: 10 },
  { id: "role-6", name: "Logistics Coordinator", department: "Operations", permissions: ["view_orders", "update_delivery", "manage_couriers", "assign_tasks"], employeeCount: 3 },
  { id: "role-7", name: "Influencer Manager", department: "Influencer Relations", permissions: ["manage_influencers", "create_campaigns", "view_analytics", "manage_referrals"], employeeCount: 3 },
  { id: "role-8", name: "Accountant", department: "Finance", permissions: ["view_revenue", "manage_payouts", "manage_payroll", "view_reports"], employeeCount: 4 },
  { id: "role-9", name: "Full-Stack Developer", department: "Technology", permissions: ["all"], employeeCount: 5 },
];

export const employees: Employee[] = [
  { id: "emp-1", name: "Grace Banda", email: "grace@chathu.mw", phone: "+265 999 111 001", avatar: "GB", department: "Customer Support", role: "Support Lead", type: "full-time", status: "active", joinDate: "2024-01-15", salary: 450000, location: "Lilongwe", skills: ["Communication", "CRM", "Problem Solving"], assignedTasks: 5, completedTasks: 42, performance: 92 },
  { id: "emp-2", name: "James Phiri", email: "james@chathu.mw", phone: "+265 999 111 002", avatar: "JP", department: "Marketing", role: "Campaign Manager", type: "full-time", status: "active", joinDate: "2024-02-01", salary: 500000, location: "Lilongwe", skills: ["Social Media", "Analytics", "Content Strategy"], assignedTasks: 8, completedTasks: 35, performance: 88 },
  { id: "emp-3", name: "Mary Chirwa", email: "mary@chathu.mw", phone: "+265 999 111 003", avatar: "MC", department: "Operations", role: "Logistics Coordinator", type: "full-time", status: "active", joinDate: "2023-11-01", salary: 480000, location: "Blantyre", skills: ["Logistics", "Inventory", "Vendor Management"], assignedTasks: 12, completedTasks: 67, performance: 95 },
  { id: "emp-4", name: "Daniel Mwale", email: "daniel@chathu.mw", phone: "+265 999 111 004", avatar: "DM", department: "Influencer Relations", role: "Influencer Manager", type: "full-time", status: "active", joinDate: "2024-03-15", salary: 520000, location: "Lilongwe", skills: ["Influencer Marketing", "Negotiation", "Analytics"], assignedTasks: 6, completedTasks: 28, performance: 85 },
  { id: "emp-5", name: "Chikondi Msiska", email: "chikondi@chathu.mw", phone: "+265 999 111 005", avatar: "CM", department: "Customer Support", role: "Support Agent", type: "full-time", status: "active", joinDate: "2024-04-01", salary: 280000, location: "Lilongwe", skills: ["Communication", "Patience", "Typing"], assignedTasks: 15, completedTasks: 120, performance: 78 },
  { id: "emp-6", name: "Tadala Nyirenda", email: "tadala@chathu.mw", phone: "+265 999 111 006", avatar: "TN", department: "Marketing", role: "Content Creator", type: "full-time", status: "active", joinDate: "2024-05-10", salary: 320000, location: "Lilongwe", skills: ["Photography", "Video Editing", "Copywriting"], assignedTasks: 4, completedTasks: 55, performance: 91 },
  { id: "emp-7", name: "Blessings Kamanga", email: "blessings@chathu.mw", phone: "+265 999 111 007", avatar: "BK", department: "Operations", role: "Warehouse Staff", type: "full-time", status: "active", joinDate: "2024-01-20", salary: 200000, location: "Blantyre", skills: ["Inventory", "Packing", "Quality Check"], assignedTasks: 8, completedTasks: 200, performance: 82 },
  { id: "emp-8", name: "Yankho Tembo", email: "yankho@chathu.mw", phone: "+265 999 111 008", avatar: "YT", department: "Customer Support", role: "Support Agent", type: "part-time", status: "active", joinDate: "2024-06-01", salary: 150000, location: "Mzuzu", skills: ["Communication", "CRM"], assignedTasks: 10, completedTasks: 45, performance: 74 },
  { id: "emp-9", name: "Mphatso Gondwe", email: "mphatso@chathu.mw", phone: "+265 999 111 009", avatar: "MG", department: "Finance", role: "Accountant", type: "full-time", status: "active", joinDate: "2024-02-15", salary: 420000, location: "Lilongwe", skills: ["Accounting", "Excel", "Financial Analysis"], assignedTasks: 3, completedTasks: 30, performance: 90 },
  { id: "emp-10", name: "Luka Jere", email: "luka@chathu.mw", phone: "+265 999 111 010", avatar: "LJ", department: "Technology", role: "Full-Stack Developer", type: "full-time", status: "active", joinDate: "2023-09-01", salary: 650000, location: "Lilongwe", skills: ["React", "Node.js", "PostgreSQL", "TypeScript"], assignedTasks: 7, completedTasks: 48, performance: 94 },
  { id: "emp-11", name: "Fatsani Moyo", email: "fatsani@chathu.mw", phone: "+265 999 111 011", avatar: "FM", department: "Operations", role: "Warehouse Staff", type: "full-time", status: "on-leave", joinDate: "2024-03-01", salary: 200000, location: "Blantyre", skills: ["Inventory", "Driving"], assignedTasks: 0, completedTasks: 150, performance: 80 },
  { id: "emp-12", name: "Precious Kachale", email: "precious@chathu.mw", phone: "+265 999 111 012", avatar: "PK", department: "Marketing", role: "Content Creator", type: "contract", status: "active", joinDate: "2024-07-01", salary: 250000, location: "Zomba", skills: ["Graphic Design", "Branding"], assignedTasks: 6, completedTasks: 22, performance: 87 },
];

export const influencers: Influencer[] = [
  { id: "inf-1", name: "Tionge Kalua", email: "tionge@gmail.com", platform: "Instagram", handle: "@tionge_style", followers: 125000, engagementRate: 4.8, status: "active", totalCampaigns: 12, totalSales: 850000, commission: 10, joinDate: "2024-01-10", tier: "gold", location: "Lilongwe", niche: "Fashion & Beauty" },
  { id: "inf-2", name: "Chimwemwe Banda", email: "chimwe@gmail.com", platform: "TikTok", handle: "@chimwe_vibes", followers: 280000, engagementRate: 6.2, status: "active", totalCampaigns: 18, totalSales: 1500000, commission: 12, joinDate: "2023-11-20", tier: "platinum", location: "Blantyre", niche: "Lifestyle" },
  { id: "inf-3", name: "Kondwani Phiri", email: "kondwani@gmail.com", platform: "YouTube", handle: "KondwaniReviews", followers: 45000, engagementRate: 3.5, status: "active", totalCampaigns: 8, totalSales: 320000, commission: 8, joinDate: "2024-03-05", tier: "silver", location: "Lilongwe", niche: "Tech Reviews" },
  { id: "inf-4", name: "Thandiwe Mbewe", email: "thandiwe@gmail.com", platform: "Instagram", handle: "@thandiwe_cooks", followers: 67000, engagementRate: 5.1, status: "active", totalCampaigns: 6, totalSales: 420000, commission: 8, joinDate: "2024-05-15", tier: "silver", location: "Mzuzu", niche: "Food & Cooking" },
  { id: "inf-5", name: "Wezi Ng'oma", email: "wezi@gmail.com", platform: "Facebook", handle: "WeziDeals", followers: 95000, engagementRate: 3.8, status: "pending", totalCampaigns: 0, totalSales: 0, commission: 10, joinDate: "2024-08-01", tier: "bronze", location: "Lilongwe", niche: "Deals & Discounts" },
  { id: "inf-6", name: "Lusayo Kamwendo", email: "lusayo@gmail.com", platform: "TikTok", handle: "@lusayo_fits", followers: 180000, engagementRate: 7.0, status: "active", totalCampaigns: 15, totalSales: 1200000, commission: 12, joinDate: "2024-02-10", tier: "gold", location: "Blantyre", niche: "Fashion" },
  { id: "inf-7", name: "Tamara Chisale", email: "tamara@gmail.com", platform: "Instagram", handle: "@tamara_wellness", followers: 32000, engagementRate: 4.2, status: "paused", totalCampaigns: 4, totalSales: 180000, commission: 8, joinDate: "2024-04-20", tier: "bronze", location: "Zomba", niche: "Health & Wellness" },
];

export const allPermissions = [
  "view_orders", "manage_orders", "manage_refunds", "contact_customers", "contact_vendors",
  "assign_tasks", "view_reports", "create_campaigns", "manage_feed", "view_analytics",
  "manage_promos", "create_posts", "upload_media", "update_delivery", "manage_stock",
  "manage_couriers", "manage_influencers", "manage_referrals", "view_revenue",
  "manage_payouts", "manage_payroll", "manage_products", "manage_vendors",
  "manage_settings", "manage_admins", "all",
];
