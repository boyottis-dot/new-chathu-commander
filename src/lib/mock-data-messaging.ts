export interface Thread {
  id: string;
  subject: string;
  participants: string[];
  participantType: "vendor" | "team" | "mixed";
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  status: "active" | "archived";
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: "all_vendors" | "top_vendors" | "new_vendors" | "all_team" | "department";
  audienceLabel: string;
  sentAt: string;
  readCount: number;
  totalRecipients: number;
  author: string;
}

export const threads: Thread[] = [
  { id: "THR-001", subject: "Shipping delay policy update", participants: ["TechZone Electronics", "Admin"], participantType: "vendor", lastMessage: "We've updated our shipping SLA to 3 business days for standard orders.", lastMessageAt: "2026-03-28T10:30:00Z", unreadCount: 2, status: "active" },
  { id: "THR-002", subject: "Product listing quality issues", participants: ["Fashion Hub", "Admin", "QA Team"], participantType: "mixed", lastMessage: "Please review the attached examples of listings that need improvement.", lastMessageAt: "2026-03-27T16:45:00Z", unreadCount: 0, status: "active" },
  { id: "THR-003", subject: "Commission rate negotiation", participants: ["Home Essentials Co", "Admin"], participantType: "vendor", lastMessage: "We'd like to discuss a volume-based commission structure.", lastMessageAt: "2026-03-27T09:15:00Z", unreadCount: 1, status: "active" },
  { id: "THR-004", subject: "Holiday season preparation", participants: ["All Top Vendors", "Admin"], participantType: "vendor", lastMessage: "Reminder: Increase stock levels by April 15 for the spring sale.", lastMessageAt: "2026-03-26T14:00:00Z", unreadCount: 0, status: "active" },
  { id: "THR-005", subject: "Return policy clarification", participants: ["Gadget World", "Admin", "Support Team"], participantType: "mixed", lastMessage: "The 30-day return window applies to all electronics.", lastMessageAt: "2026-03-25T11:20:00Z", unreadCount: 0, status: "archived" },
  { id: "THR-006", subject: "New feature rollout feedback", participants: ["Marketing Team", "Dev Team", "Admin"], participantType: "team", lastMessage: "The campaign builder is getting positive feedback from vendors.", lastMessageAt: "2026-03-25T08:00:00Z", unreadCount: 3, status: "active" },
];

export const announcements: Announcement[] = [
  { id: "ANN-001", title: "Platform Maintenance Window", body: "Scheduled maintenance on April 2, 2026 from 2:00 AM to 6:00 AM UTC. Expect intermittent downtime.", audience: "all_vendors", audienceLabel: "All Vendors", sentAt: "2026-03-28T08:00:00Z", readCount: 124, totalRecipients: 186, author: "System Admin" },
  { id: "ANN-002", title: "New Commission Structure Effective April 1", body: "We're updating our commission tiers. Top-performing vendors will see reduced rates. Check your dashboard for details.", audience: "all_vendors", audienceLabel: "All Vendors", sentAt: "2026-03-25T10:00:00Z", readCount: 178, totalRecipients: 186, author: "Finance Team" },
  { id: "ANN-003", title: "Spring Sale Campaign — Vendor Guidelines", body: "Submit your promotional products and discounts by March 30 to be featured in the spring sale.", audience: "top_vendors", audienceLabel: "Top Vendors", sentAt: "2026-03-22T12:00:00Z", readCount: 45, totalRecipients: 52, author: "Marketing" },
  { id: "ANN-004", title: "Q1 Performance Review Complete", body: "All Q1 vendor performance reports are now available in your dashboard.", audience: "all_vendors", audienceLabel: "All Vendors", sentAt: "2026-03-20T09:00:00Z", readCount: 160, totalRecipients: 186, author: "Operations" },
  { id: "ANN-005", title: "Welcome Aboard — Onboarding Resources", body: "Welcome to the platform! Here are resources to get started: documentation, training videos, and support contacts.", audience: "new_vendors", audienceLabel: "New Vendors", sentAt: "2026-03-18T14:00:00Z", readCount: 12, totalRecipients: 14, author: "Vendor Relations" },
];
