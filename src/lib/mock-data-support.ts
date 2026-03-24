export type TicketStatus = "Open" | "In Progress" | "Waiting on Customer" | "Waiting on Vendor" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
export type TicketChannel = "Email" | "Chat" | "Phone" | "Social Media" | "In-App";

export interface TicketMessage {
  id: string;
  sender: string;
  role: "customer" | "agent" | "system";
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  customerEmail: string;
  channel: TicketChannel;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  messages: TicketMessage[];
  tags: string[];
}

export interface CannedResponse {
  id: string;
  title: string;
  category: string;
  message: string;
  usageCount: number;
}

export interface LiveSession {
  id: string;
  customer: string;
  agent: string;
  status: "Active" | "Queued" | "Ended";
  startedAt: string;
  duration: string;
  messageCount: number;
  topic: string;
}

const agents = ["Chimwemwe Nyirenda", "Thandiwe Moyo", "Blessings Kamanga", "Mercy Phiri"];
const categories = ["Order Issue", "Payment", "Account", "Product Inquiry", "Delivery", "Returns", "Technical", "General"];

export const supportTickets: SupportTicket[] = [
  {
    id: "TKT-001", subject: "Order stuck in processing for 3 days", customer: "Grace Banda", customerEmail: "grace@email.mw",
    channel: "Email", status: "Open", priority: "High", category: "Order Issue", assignedTo: agents[0],
    createdAt: "2026-03-23 08:30", updatedAt: "2026-03-23 08:30", slaDeadline: "2026-03-24 08:30",
    messages: [
      { id: "M1", sender: "Grace Banda", role: "customer", message: "My order ORD-4530 has been in 'Processing' status for 3 days now. Can you please check what's happening?", timestamp: "2026-03-23 08:30" },
    ],
    tags: ["order", "delay"],
  },
  {
    id: "TKT-002", subject: "Can't apply promo code at checkout", customer: "James Phiri", customerEmail: "james@email.mw",
    channel: "Chat", status: "In Progress", priority: "Medium", category: "Payment", assignedTo: agents[1],
    createdAt: "2026-03-22 14:15", updatedAt: "2026-03-23 09:00", slaDeadline: "2026-03-24 14:15",
    messages: [
      { id: "M2", sender: "James Phiri", role: "customer", message: "I'm trying to use promo code SAVE20 but it says 'invalid code'. I received this code via email yesterday.", timestamp: "2026-03-22 14:15" },
      { id: "M3", sender: agents[1], role: "agent", message: "Hi James, I can see the promo code SAVE20 in our system. Let me check its validity and restrictions. Can you share a screenshot of the error?", timestamp: "2026-03-22 14:30" },
      { id: "M4", sender: "James Phiri", role: "customer", message: "Sure, here's the screenshot. It shows 'Code not valid for this purchase'.", timestamp: "2026-03-22 14:45" },
    ],
    tags: ["promo", "checkout"],
  },
  {
    id: "TKT-003", subject: "Request to change delivery address", customer: "Fatima Yusuf", customerEmail: "fatima@email.mw",
    channel: "Phone", status: "Waiting on Customer", priority: "Medium", category: "Delivery", assignedTo: agents[2],
    createdAt: "2026-03-21 11:00", updatedAt: "2026-03-22 16:00", slaDeadline: "2026-03-23 11:00",
    messages: [
      { id: "M5", sender: "Fatima Yusuf", role: "customer", message: "I need to change the delivery address for my order ORD-4525. I'm moving to a new house this weekend.", timestamp: "2026-03-21 11:00" },
      { id: "M6", sender: agents[2], role: "agent", message: "Hi Fatima, the order is already packed. I'll check with the warehouse if we can update the address. Please provide the new address.", timestamp: "2026-03-21 11:30" },
      { id: "M7", sender: "System", role: "system", message: "Waiting for customer to provide new delivery address", timestamp: "2026-03-22 16:00" },
    ],
    tags: ["delivery", "address-change"],
  },
  {
    id: "TKT-004", subject: "Product arrived damaged", customer: "David Mwale", customerEmail: "david@email.mw",
    channel: "In-App", status: "Waiting on Vendor", priority: "High", category: "Returns", assignedTo: agents[0],
    createdAt: "2026-03-20 09:45", updatedAt: "2026-03-22 10:00", slaDeadline: "2026-03-22 09:45",
    messages: [
      { id: "M8", sender: "David Mwale", role: "customer", message: "The ceramic vase I ordered arrived with a crack on the side. I want a replacement or refund.", timestamp: "2026-03-20 09:45" },
      { id: "M9", sender: agents[0], role: "agent", message: "I'm sorry about that David. I've forwarded this to the vendor HomeStyle MW for review. They'll need to confirm the damage.", timestamp: "2026-03-20 10:15" },
      { id: "M10", sender: "System", role: "system", message: "Escalated to vendor. Awaiting vendor response.", timestamp: "2026-03-22 10:00" },
    ],
    tags: ["damaged", "return", "escalated"],
  },
  {
    id: "TKT-005", subject: "How to track my international order?", customer: "Lucy Chirwa", customerEmail: "lucy@email.mw",
    channel: "Email", status: "Resolved", priority: "Low", category: "General", assignedTo: agents[3],
    createdAt: "2026-03-19 16:00", updatedAt: "2026-03-20 09:30", slaDeadline: "2026-03-21 16:00",
    messages: [
      { id: "M11", sender: "Lucy Chirwa", role: "customer", message: "I placed an international order last week. How can I track it?", timestamp: "2026-03-19 16:00" },
      { id: "M12", sender: agents[3], role: "agent", message: "Hi Lucy! You can track your order using the DHL tracking number in your order confirmation email. Go to Orders > My Orders > click on the order to see tracking details.", timestamp: "2026-03-20 09:30" },
      { id: "M13", sender: "Lucy Chirwa", role: "customer", message: "Found it, thank you!", timestamp: "2026-03-20 10:00" },
    ],
    tags: ["tracking", "international"],
  },
  {
    id: "TKT-006", subject: "Account login issues after password reset", customer: "Peter Kamanga", customerEmail: "peter@email.mw",
    channel: "Chat", status: "Closed", priority: "Low", category: "Account", assignedTo: agents[1],
    createdAt: "2026-03-17 13:20", updatedAt: "2026-03-17 14:00", slaDeadline: "2026-03-19 13:20",
    messages: [
      { id: "M14", sender: "Peter Kamanga", role: "customer", message: "I reset my password but I still can't log in.", timestamp: "2026-03-17 13:20" },
      { id: "M15", sender: agents[1], role: "agent", message: "Try clearing your browser cache and cookies, then use the new password. If that doesn't work, I'll reset it manually.", timestamp: "2026-03-17 13:35" },
      { id: "M16", sender: "Peter Kamanga", role: "customer", message: "Clearing cache worked! Thanks.", timestamp: "2026-03-17 14:00" },
    ],
    tags: ["account", "login"],
  },
  {
    id: "TKT-007", subject: "Vendor not responding to messages", customer: "Martha Gondwe", customerEmail: "martha@email.mw",
    channel: "Social Media", status: "In Progress", priority: "Urgent", category: "Product Inquiry", assignedTo: agents[2],
    createdAt: "2026-03-23 07:00", updatedAt: "2026-03-23 10:00", slaDeadline: "2026-03-23 19:00",
    messages: [
      { id: "M17", sender: "Martha Gondwe", role: "customer", message: "I've been trying to contact Beauty Haven about product ingredients for 5 days. No response at all. This is unacceptable!", timestamp: "2026-03-23 07:00" },
      { id: "M18", sender: agents[2], role: "agent", message: "I understand your frustration Martha. I'm contacting the vendor directly and will get back to you within 4 hours.", timestamp: "2026-03-23 10:00" },
    ],
    tags: ["vendor", "unresponsive", "urgent"],
  },
];

export const cannedResponses: CannedResponse[] = [
  { id: "CR-1", title: "Order Status Check", category: "Order Issue", message: "Hi [Customer], I've checked your order [Order ID] and it's currently [Status]. The estimated delivery date is [Date]. Is there anything else I can help with?", usageCount: 142 },
  { id: "CR-2", title: "Refund Processing", category: "Payment", message: "Hi [Customer], your refund of MWK [Amount] has been initiated and will be processed within 5-7 business days. You'll receive a confirmation email once complete.", usageCount: 89 },
  { id: "CR-3", title: "Delivery Delay Apology", category: "Delivery", message: "Hi [Customer], we sincerely apologize for the delay in delivering your order. We're working with our courier partner to expedite this. You can expect delivery by [New Date].", usageCount: 115 },
  { id: "CR-4", title: "Return Instructions", category: "Returns", message: "Hi [Customer], to initiate a return: 1) Go to My Orders 2) Select the order 3) Click 'Request Return' 4) Choose your reason 5) Drop off at the nearest collection point. Your refund will be processed once we receive the item.", usageCount: 76 },
  { id: "CR-5", title: "Escalation Notice", category: "General", message: "Hi [Customer], I've escalated your case to our senior team for priority review. You'll receive an update within 24 hours. Your case reference is [Ticket ID].", usageCount: 45 },
  { id: "CR-6", title: "Password Reset Help", category: "Account", message: "Hi [Customer], to reset your password: 1) Click 'Forgot Password' on the login page 2) Enter your email 3) Check your inbox for the reset link 4) Create a new password. If you don't receive the email, check your spam folder.", usageCount: 98 },
];

export const liveSessions: LiveSession[] = [
  { id: "LS-1", customer: "Anna Nyirongo", agent: agents[0], status: "Active", startedAt: "2026-03-24 09:15", duration: "12 min", messageCount: 8, topic: "Order tracking" },
  { id: "LS-2", customer: "Robert Banda", agent: agents[1], status: "Active", startedAt: "2026-03-24 09:22", duration: "5 min", messageCount: 3, topic: "Payment issue" },
  { id: "LS-3", customer: "Sarah Mbewe", agent: "", status: "Queued", startedAt: "2026-03-24 09:28", duration: "2 min", messageCount: 1, topic: "Product question" },
  { id: "LS-4", customer: "John Tembo", agent: "", status: "Queued", startedAt: "2026-03-24 09:30", duration: "0 min", messageCount: 0, topic: "Delivery complaint" },
  { id: "LS-5", customer: "Emily Kachale", agent: agents[2], status: "Ended", startedAt: "2026-03-24 08:45", duration: "28 min", messageCount: 15, topic: "Return process" },
  { id: "LS-6", customer: "Michael Chisi", agent: agents[3], status: "Ended", startedAt: "2026-03-24 08:30", duration: "18 min", messageCount: 11, topic: "Account help" },
];

export const ticketStatusOptions: TicketStatus[] = ["Open", "In Progress", "Waiting on Customer", "Waiting on Vendor", "Resolved", "Closed"];
export const ticketPriorityOptions: TicketPriority[] = ["Low", "Medium", "High", "Urgent"];
export const ticketChannelOptions: TicketChannel[] = ["Email", "Chat", "Phone", "Social Media", "In-App"];
