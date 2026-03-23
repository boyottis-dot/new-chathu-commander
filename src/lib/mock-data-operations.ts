// Operations mock data: budgets, expenses, payroll, forecasting

export interface BudgetItem {
  id: string;
  department: string;
  category: string;
  allocated: number;
  spent: number;
  period: string;
  status: "on-track" | "over-budget" | "under-budget";
}

export interface Expense {
  id: string;
  title: string;
  category: string;
  department: string;
  amount: number;
  date: string;
  submittedBy: string;
  status: "pending" | "approved" | "rejected" | "reimbursed";
  receipt: boolean;
  notes: string;
  vendor: string;
}

export interface PayrollEntry {
  id: string;
  employeeName: string;
  department: string;
  role: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  payDate: string;
  status: "pending" | "paid" | "failed";
  bankRef: string;
  type: "full-time" | "part-time" | "contract";
}

export interface ForecastEntry {
  month: string;
  projectedRevenue: number;
  projectedExpenses: number;
  projectedProfit: number;
  actualRevenue?: number;
  actualExpenses?: number;
  actualProfit?: number;
}

export const budgetCategories = [
  "Salaries", "Marketing", "Software & Tools", "Office Supplies",
  "Logistics", "Influencer Payments", "Equipment", "Travel",
  "Training", "Legal & Compliance", "Utilities", "Miscellaneous",
];

export const budgetItems: BudgetItem[] = [
  { id: "bud-1", department: "Customer Support", category: "Salaries", allocated: 1800000, spent: 1500000, period: "August 2024", status: "on-track" },
  { id: "bud-2", department: "Customer Support", category: "Software & Tools", allocated: 300000, spent: 280000, period: "August 2024", status: "on-track" },
  { id: "bud-3", department: "Marketing", category: "Salaries", allocated: 2000000, spent: 2000000, period: "August 2024", status: "on-track" },
  { id: "bud-4", department: "Marketing", category: "Marketing", allocated: 2500000, spent: 2800000, period: "August 2024", status: "over-budget" },
  { id: "bud-5", department: "Operations", category: "Salaries", allocated: 2000000, spent: 1800000, period: "August 2024", status: "under-budget" },
  { id: "bud-6", department: "Operations", category: "Logistics", allocated: 1200000, spent: 1100000, period: "August 2024", status: "on-track" },
  { id: "bud-7", department: "Influencer Relations", category: "Influencer Payments", allocated: 3000000, spent: 2100000, period: "August 2024", status: "under-budget" },
  { id: "bud-8", department: "Finance", category: "Salaries", allocated: 1200000, spent: 1100000, period: "August 2024", status: "on-track" },
  { id: "bud-9", department: "Technology", category: "Salaries", allocated: 3500000, spent: 3250000, period: "August 2024", status: "on-track" },
  { id: "bud-10", department: "Technology", category: "Software & Tools", allocated: 800000, spent: 950000, period: "August 2024", status: "over-budget" },
  { id: "bud-11", department: "Technology", category: "Equipment", allocated: 1500000, spent: 300000, period: "August 2024", status: "under-budget" },
  { id: "bud-12", department: "Marketing", category: "Travel", allocated: 500000, spent: 400000, period: "August 2024", status: "on-track" },
];

export const expenses: Expense[] = [
  { id: "exp-1", title: "Facebook Ads — August Campaign", category: "Marketing", department: "Marketing", amount: 450000, date: "2024-08-05", submittedBy: "James Phiri", status: "approved", receipt: true, notes: "Monthly ad spend for product awareness campaign", vendor: "Meta Platforms" },
  { id: "exp-2", title: "Courier fuel reimbursement", category: "Logistics", department: "Operations", amount: 85000, date: "2024-08-08", submittedBy: "Mary Chirwa", status: "reimbursed", receipt: true, notes: "Fuel for local deliveries in Blantyre", vendor: "Puma Energy" },
  { id: "exp-3", title: "Zendesk monthly subscription", category: "Software & Tools", department: "Customer Support", amount: 120000, date: "2024-08-01", submittedBy: "Grace Banda", status: "approved", receipt: true, notes: "Customer support ticket management tool", vendor: "Zendesk" },
  { id: "exp-4", title: "Office printer ink cartridges", category: "Office Supplies", department: "Operations", amount: 35000, date: "2024-08-10", submittedBy: "Blessings Kamanga", status: "pending", receipt: true, notes: "Replacement ink for warehouse label printer", vendor: "Computer World" },
  { id: "exp-5", title: "Influencer campaign payment — Tionge", category: "Influencer Payments", department: "Influencer Relations", amount: 350000, date: "2024-08-12", submittedBy: "Daniel Mwale", status: "approved", receipt: false, notes: "August fashion campaign collaboration", vendor: "Tionge Kalua" },
  { id: "exp-6", title: "AWS hosting costs — August", category: "Software & Tools", department: "Technology", amount: 280000, date: "2024-08-01", submittedBy: "Luka Jere", status: "approved", receipt: true, notes: "Monthly cloud infrastructure costs", vendor: "Amazon Web Services" },
  { id: "exp-7", title: "Team lunch — Operations team", category: "Miscellaneous", department: "Operations", amount: 65000, date: "2024-08-15", submittedBy: "Mary Chirwa", status: "pending", receipt: true, notes: "Monthly team building lunch", vendor: "Four Seasons Restaurant" },
  { id: "exp-8", title: "Google Workspace licenses", category: "Software & Tools", department: "Technology", amount: 95000, date: "2024-08-01", submittedBy: "Peter Ngoma", status: "approved", receipt: true, notes: "Monthly subscription for 20 users", vendor: "Google" },
  { id: "exp-9", title: "Photography equipment rental", category: "Equipment", department: "Marketing", amount: 150000, date: "2024-08-09", submittedBy: "James Phiri", status: "rejected", receipt: false, notes: "Rejected — company owns equipment", vendor: "Photo Studio Lilongwe" },
  { id: "exp-10", title: "Legal consultation fee", category: "Legal & Compliance", department: "Finance", amount: 200000, date: "2024-08-14", submittedBy: "Sarah Kamanga", status: "approved", receipt: true, notes: "Vendor contract review and compliance audit", vendor: "Mkandawire & Associates" },
];

export const payrollEntries: PayrollEntry[] = [
  { id: "pay-1", employeeName: "Grace Banda", department: "Customer Support", role: "Support Lead", baseSalary: 450000, bonus: 50000, deductions: 67500, netPay: 432500, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-2", employeeName: "James Phiri", department: "Marketing", role: "Campaign Manager", baseSalary: 500000, bonus: 0, deductions: 75000, netPay: 425000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-3", employeeName: "Mary Chirwa", department: "Operations", role: "Logistics Coordinator", baseSalary: 480000, bonus: 30000, deductions: 72000, netPay: 438000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-4", employeeName: "Daniel Mwale", department: "Influencer Relations", role: "Influencer Manager", baseSalary: 520000, bonus: 0, deductions: 78000, netPay: 442000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-5", employeeName: "Chikondi Msiska", department: "Customer Support", role: "Support Agent", baseSalary: 280000, bonus: 0, deductions: 42000, netPay: 238000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-6", employeeName: "Tadala Nyirenda", department: "Marketing", role: "Content Creator", baseSalary: 320000, bonus: 20000, deductions: 48000, netPay: 292000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-7", employeeName: "Blessings Kamanga", department: "Operations", role: "Warehouse Staff", baseSalary: 200000, bonus: 0, deductions: 30000, netPay: 170000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-8", employeeName: "Yankho Tembo", department: "Customer Support", role: "Support Agent", baseSalary: 150000, bonus: 0, deductions: 22500, netPay: 127500, payDate: "2024-08-25", status: "pending", bankRef: "", type: "part-time" },
  { id: "pay-9", employeeName: "Mphatso Gondwe", department: "Finance", role: "Accountant", baseSalary: 420000, bonus: 0, deductions: 63000, netPay: 357000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-10", employeeName: "Luka Jere", department: "Technology", role: "Full-Stack Developer", baseSalary: 650000, bonus: 50000, deductions: 97500, netPay: 602500, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-11", employeeName: "Fatsani Moyo", department: "Operations", role: "Warehouse Staff", baseSalary: 200000, bonus: 0, deductions: 30000, netPay: 170000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "full-time" },
  { id: "pay-12", employeeName: "Precious Kachale", department: "Marketing", role: "Content Creator", baseSalary: 250000, bonus: 0, deductions: 0, netPay: 250000, payDate: "2024-08-25", status: "pending", bankRef: "", type: "contract" },
];

export const forecastData: ForecastEntry[] = [
  { month: "Jan 2024", projectedRevenue: 8000000, projectedExpenses: 6500000, projectedProfit: 1500000, actualRevenue: 7800000, actualExpenses: 6200000, actualProfit: 1600000 },
  { month: "Feb 2024", projectedRevenue: 8500000, projectedExpenses: 6800000, projectedProfit: 1700000, actualRevenue: 9100000, actualExpenses: 7000000, actualProfit: 2100000 },
  { month: "Mar 2024", projectedRevenue: 9000000, projectedExpenses: 7000000, projectedProfit: 2000000, actualRevenue: 8700000, actualExpenses: 7200000, actualProfit: 1500000 },
  { month: "Apr 2024", projectedRevenue: 9500000, projectedExpenses: 7200000, projectedProfit: 2300000, actualRevenue: 9800000, actualExpenses: 7100000, actualProfit: 2700000 },
  { month: "May 2024", projectedRevenue: 10000000, projectedExpenses: 7500000, projectedProfit: 2500000, actualRevenue: 10200000, actualExpenses: 7800000, actualProfit: 2400000 },
  { month: "Jun 2024", projectedRevenue: 10500000, projectedExpenses: 7800000, projectedProfit: 2700000, actualRevenue: 10100000, actualExpenses: 8000000, actualProfit: 2100000 },
  { month: "Jul 2024", projectedRevenue: 11000000, projectedExpenses: 8000000, projectedProfit: 3000000, actualRevenue: 11500000, actualExpenses: 8200000, actualProfit: 3300000 },
  { month: "Aug 2024", projectedRevenue: 11500000, projectedExpenses: 8200000, projectedProfit: 3300000 },
  { month: "Sep 2024", projectedRevenue: 12000000, projectedExpenses: 8500000, projectedProfit: 3500000 },
  { month: "Oct 2024", projectedRevenue: 13000000, projectedExpenses: 9000000, projectedProfit: 4000000 },
  { month: "Nov 2024", projectedRevenue: 15000000, projectedExpenses: 10000000, projectedProfit: 5000000 },
  { month: "Dec 2024", projectedRevenue: 18000000, projectedExpenses: 12000000, projectedProfit: 6000000 },
];

export const totalPayroll = payrollEntries.reduce((sum, e) => sum + e.netPay, 0);
export const totalBudgetAllocated = budgetItems.reduce((sum, b) => sum + b.allocated, 0);
export const totalBudgetSpent = budgetItems.reduce((sum, b) => sum + b.spent, 0);
export const totalExpenses = expenses.filter(e => e.status === "approved" || e.status === "reimbursed").reduce((sum, e) => sum + e.amount, 0);
