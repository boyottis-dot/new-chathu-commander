// Task Manager mock data

export type TaskPriority = "critical" | "high" | "medium" | "low";
export type TaskStatus = "backlog" | "todo" | "in-progress" | "review" | "done";
export type TaskCategory = "support" | "marketing" | "operations" | "development" | "finance" | "content" | "influencer";

export interface TaskComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeAvatar: string;
  department: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdDate: string;
  tags: string[];
  comments: TaskComment[];
  checklist: { id: string; text: string; done: boolean }[];
  attachments: number;
  estimatedHours: number;
  loggedHours: number;
}

export interface TaskColumn {
  id: TaskStatus;
  title: string;
  color: string;
}

export const taskColumns: TaskColumn[] = [
  { id: "backlog", title: "Backlog", color: "bg-muted" },
  { id: "todo", title: "To Do", color: "bg-blue-500/20" },
  { id: "in-progress", title: "In Progress", color: "bg-amber-500/20" },
  { id: "review", title: "Review", color: "bg-purple-500/20" },
  { id: "done", title: "Done", color: "bg-green-500/20" },
];

export const tasks: Task[] = [
  {
    id: "task-1", title: "Resolve delayed refund for Order #1847", description: "Customer Grace Phiri has been waiting 7 days for refund on returned shoes. Vendor confirmed receipt but refund not processed.", assignee: "Chikondi Msiska", assigneeAvatar: "CM", department: "Customer Support", category: "support", priority: "critical", status: "in-progress", dueDate: "2024-08-20", createdDate: "2024-08-15", tags: ["refund", "urgent", "customer-complaint"], comments: [
      { id: "c1", author: "Grace Banda", text: "Customer has escalated to social media. Please prioritize.", date: "2024-08-16" },
    ], checklist: [
      { id: "cl1", text: "Contact vendor for confirmation", done: true },
      { id: "cl2", text: "Process refund in system", done: false },
      { id: "cl3", text: "Notify customer of resolution", done: false },
    ], attachments: 2, estimatedHours: 2, loggedHours: 1.5,
  },
  {
    id: "task-2", title: "Create Black Friday campaign assets", description: "Design social media posts, email templates, and feed banners for Black Friday sale. Coordinate with vendors for deals.", assignee: "Tadala Nyirenda", assigneeAvatar: "TN", department: "Marketing", category: "marketing", priority: "high", status: "todo", dueDate: "2024-11-15", createdDate: "2024-08-10", tags: ["campaign", "black-friday", "design"], comments: [], checklist: [
      { id: "cl4", text: "Design Instagram stories", done: false },
      { id: "cl5", text: "Create email newsletter template", done: false },
      { id: "cl6", text: "Design hero banner", done: false },
      { id: "cl7", text: "Create TikTok video script", done: false },
    ], attachments: 0, estimatedHours: 16, loggedHours: 0,
  },
  {
    id: "task-3", title: "Audit warehouse inventory levels", description: "Physical count of all items in Blantyre warehouse. Compare with system stock levels and report discrepancies.", assignee: "Blessings Kamanga", assigneeAvatar: "BK", department: "Operations", category: "operations", priority: "high", status: "in-progress", dueDate: "2024-08-22", createdDate: "2024-08-12", tags: ["inventory", "audit", "warehouse"], comments: [
      { id: "c2", author: "Mary Chirwa", text: "Focus on electronics section first — most discrepancies reported there.", date: "2024-08-13" },
    ], checklist: [
      { id: "cl8", text: "Count electronics section", done: true },
      { id: "cl9", text: "Count fashion section", done: true },
      { id: "cl10", text: "Count home & kitchen", done: false },
      { id: "cl11", text: "Submit discrepancy report", done: false },
    ], attachments: 1, estimatedHours: 8, loggedHours: 5,
  },
  {
    id: "task-4", title: "Onboard 3 new influencers for Sept campaign", description: "Sign contracts, set up referral links, and brief new influencers on brand guidelines and commission structure.", assignee: "Daniel Mwale", assigneeAvatar: "DM", department: "Influencer Relations", category: "influencer", priority: "medium", status: "todo", dueDate: "2024-08-30", createdDate: "2024-08-14", tags: ["influencer", "onboarding", "campaign"], comments: [], checklist: [
      { id: "cl12", text: "Send contracts to shortlisted candidates", done: false },
      { id: "cl13", text: "Create brand guideline deck", done: false },
      { id: "cl14", text: "Set up referral tracking links", done: false },
    ], attachments: 3, estimatedHours: 6, loggedHours: 0,
  },
  {
    id: "task-5", title: "Reconcile July vendor payouts", description: "Verify all July payouts match order records. Flag any discrepancies and prepare report for finance team.", assignee: "Mphatso Gondwe", assigneeAvatar: "MG", department: "Finance", category: "finance", priority: "medium", status: "review", dueDate: "2024-08-18", createdDate: "2024-08-05", tags: ["payouts", "reconciliation", "finance"], comments: [
      { id: "c3", author: "Mphatso Gondwe", text: "Found 3 discrepancies totaling MWK 45,000. Awaiting manager review.", date: "2024-08-16" },
    ], checklist: [
      { id: "cl15", text: "Export July payout records", done: true },
      { id: "cl16", text: "Cross-reference with order data", done: true },
      { id: "cl17", text: "Flag discrepancies", done: true },
      { id: "cl18", text: "Manager sign-off", done: false },
    ], attachments: 2, estimatedHours: 4, loggedHours: 3.5,
  },
  {
    id: "task-6", title: "Fix product image upload bug on mobile", description: "Vendors report that product images fail to upload when using mobile browser. Investigate and fix.", assignee: "Luka Jere", assigneeAvatar: "LJ", department: "Technology", category: "development", priority: "critical", status: "in-progress", dueDate: "2024-08-19", createdDate: "2024-08-16", tags: ["bug", "mobile", "upload"], comments: [
      { id: "c4", author: "Luka Jere", text: "Reproduced on Android Chrome. Issue is with file size validation. Working on fix.", date: "2024-08-17" },
    ], checklist: [
      { id: "cl19", text: "Reproduce bug", done: true },
      { id: "cl20", text: "Identify root cause", done: true },
      { id: "cl21", text: "Implement fix", done: false },
      { id: "cl22", text: "Test on multiple devices", done: false },
    ], attachments: 1, estimatedHours: 4, loggedHours: 2,
  },
  {
    id: "task-7", title: "Write September newsletter", description: "Draft the monthly customer newsletter with new arrivals, top vendors, and upcoming promotions.", assignee: "Precious Kachale", assigneeAvatar: "PK", department: "Marketing", category: "content", priority: "low", status: "backlog", dueDate: "2024-09-01", createdDate: "2024-08-10", tags: ["newsletter", "content", "email"], comments: [], checklist: [
      { id: "cl23", text: "Gather product highlights", done: false },
      { id: "cl24", text: "Write copy", done: false },
      { id: "cl25", text: "Design template", done: false },
    ], attachments: 0, estimatedHours: 3, loggedHours: 0,
  },
  {
    id: "task-8", title: "Process 15 pending customer support tickets", description: "Clear backlog of support tickets from the weekend. Prioritize refund requests and delivery complaints.", assignee: "Yankho Tembo", assigneeAvatar: "YT", department: "Customer Support", category: "support", priority: "high", status: "todo", dueDate: "2024-08-19", createdDate: "2024-08-18", tags: ["support", "tickets", "backlog"], comments: [], checklist: [], attachments: 0, estimatedHours: 6, loggedHours: 0,
  },
  {
    id: "task-9", title: "Set up new courier API integration", description: "Integrate SpeedPost Malawi API for local deliveries. Test tracking endpoints and configure webhook callbacks.", assignee: "Luka Jere", assigneeAvatar: "LJ", department: "Technology", category: "development", priority: "medium", status: "backlog", dueDate: "2024-09-10", createdDate: "2024-08-15", tags: ["integration", "courier", "api"], comments: [], checklist: [
      { id: "cl26", text: "Get API credentials", done: false },
      { id: "cl27", text: "Build integration module", done: false },
      { id: "cl28", text: "Test tracking endpoints", done: false },
      { id: "cl29", text: "Configure webhooks", done: false },
    ], attachments: 1, estimatedHours: 12, loggedHours: 0,
  },
  {
    id: "task-10", title: "Coordinate vendor photoshoot day", description: "Organize professional product photography day for 5 top vendors. Book photographer, prepare shot list, and schedule vendors.", assignee: "James Phiri", assigneeAvatar: "JP", department: "Marketing", category: "marketing", priority: "low", status: "done", dueDate: "2024-08-10", createdDate: "2024-07-25", tags: ["photoshoot", "vendors", "content"], comments: [
      { id: "c5", author: "James Phiri", text: "All 5 vendors confirmed. Photographer booked for Aug 10.", date: "2024-08-05" },
      { id: "c6", author: "James Phiri", text: "Completed successfully. 200+ product shots captured.", date: "2024-08-10" },
    ], checklist: [
      { id: "cl30", text: "Book photographer", done: true },
      { id: "cl31", text: "Confirm vendors", done: true },
      { id: "cl32", text: "Prepare shot list", done: true },
      { id: "cl33", text: "Execute photoshoot", done: true },
    ], attachments: 5, estimatedHours: 8, loggedHours: 10,
  },
];
