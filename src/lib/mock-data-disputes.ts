export type DisputeStatus = "Open" | "Under Review" | "Awaiting Evidence" | "Escalated" | "Resolved" | "Closed";
export type DisputeType = "Product Quality" | "Non-Delivery" | "Wrong Item" | "Refund Issue" | "Vendor Misconduct" | "Billing Error";
export type DisputePriority = "Low" | "Medium" | "High" | "Critical";

export interface DisputeEvidence {
  id: string;
  type: "image" | "document" | "text";
  label: string;
  uploadedBy: "customer" | "vendor" | "admin";
  date: string;
}

export interface DisputeTimeline {
  id: string;
  action: string;
  actor: string;
  date: string;
  note: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  customer: string;
  customerEmail: string;
  vendor: string;
  type: DisputeType;
  status: DisputeStatus;
  priority: DisputePriority;
  amount: number;
  description: string;
  createdDate: string;
  slaDeadline: string;
  assignedTo: string;
  evidence: DisputeEvidence[];
  timeline: DisputeTimeline[];
}

export const disputes: Dispute[] = [
  {
    id: "DSP-001", orderId: "ORD-4501", customer: "Grace Banda", customerEmail: "grace@email.mw",
    vendor: "TechWorld Malawi", type: "Product Quality", status: "Open", priority: "High", amount: 45000,
    description: "Customer received wireless earbuds with one side not working. Vendor claims product was tested before shipping.",
    createdDate: "2026-03-22", slaDeadline: "2026-03-25", assignedTo: "Support Team A",
    evidence: [
      { id: "E1", type: "image", label: "Photo of defective earbuds", uploadedBy: "customer", date: "2026-03-22" },
      { id: "E2", type: "document", label: "Quality test certificate", uploadedBy: "vendor", date: "2026-03-23" },
    ],
    timeline: [
      { id: "T1", action: "Dispute opened", actor: "Grace Banda", date: "2026-03-22 09:15", note: "Customer filed dispute" },
      { id: "T2", action: "Evidence submitted", actor: "Grace Banda", date: "2026-03-22 09:20", note: "Photo uploaded" },
      { id: "T3", action: "Vendor notified", actor: "System", date: "2026-03-22 09:25", note: "Auto-notification sent" },
    ],
  },
  {
    id: "DSP-002", orderId: "ORD-4488", customer: "James Phiri", customerEmail: "james@email.mw",
    vendor: "Zara Collections MW", type: "Wrong Item", status: "Under Review", priority: "Medium", amount: 18500,
    description: "Customer ordered blue denim jacket size M but received black size L.",
    createdDate: "2026-03-20", slaDeadline: "2026-03-24", assignedTo: "Support Team B",
    evidence: [
      { id: "E3", type: "image", label: "Wrong item received", uploadedBy: "customer", date: "2026-03-20" },
      { id: "E4", type: "document", label: "Shipping manifest", uploadedBy: "vendor", date: "2026-03-21" },
    ],
    timeline: [
      { id: "T4", action: "Dispute opened", actor: "James Phiri", date: "2026-03-20 14:30", note: "Wrong item complaint" },
      { id: "T5", action: "Under review", actor: "Admin", date: "2026-03-21 10:00", note: "Reviewing shipping records" },
    ],
  },
  {
    id: "DSP-003", orderId: "ORD-4475", customer: "Fatima Yusuf", customerEmail: "fatima@email.mw",
    vendor: "FreshMart", type: "Non-Delivery", status: "Escalated", priority: "Critical", amount: 32000,
    description: "Order marked as delivered but customer never received. Courier confirms delivery to address but customer denies.",
    createdDate: "2026-03-18", slaDeadline: "2026-03-22", assignedTo: "Senior Manager",
    evidence: [
      { id: "E5", type: "document", label: "Delivery confirmation", uploadedBy: "vendor", date: "2026-03-19" },
      { id: "E6", type: "text", label: "Customer statement", uploadedBy: "customer", date: "2026-03-18" },
      { id: "E7", type: "document", label: "Courier GPS log", uploadedBy: "admin", date: "2026-03-20" },
    ],
    timeline: [
      { id: "T6", action: "Dispute opened", actor: "Fatima Yusuf", date: "2026-03-18 16:00", note: "Non-delivery claim" },
      { id: "T7", action: "Vendor responded", actor: "FreshMart", date: "2026-03-19 09:00", note: "Delivery proof submitted" },
      { id: "T8", action: "Escalated", actor: "Support Team A", date: "2026-03-20 11:00", note: "Conflicting evidence, needs senior review" },
    ],
  },
  {
    id: "DSP-004", orderId: "ORD-4460", customer: "David Mwale", customerEmail: "david@email.mw",
    vendor: "HomeStyle MW", type: "Refund Issue", status: "Awaiting Evidence", priority: "Medium", amount: 15800,
    description: "Customer returned ceramic vase but refund not processed after 7 days.",
    createdDate: "2026-03-16", slaDeadline: "2026-03-23", assignedTo: "Support Team A",
    evidence: [
      { id: "E8", type: "document", label: "Return shipping receipt", uploadedBy: "customer", date: "2026-03-16" },
    ],
    timeline: [
      { id: "T9", action: "Dispute opened", actor: "David Mwale", date: "2026-03-16 12:00", note: "Refund delay complaint" },
      { id: "T10", action: "Awaiting evidence", actor: "Admin", date: "2026-03-17 09:00", note: "Requested warehouse receiving confirmation from vendor" },
    ],
  },
  {
    id: "DSP-005", orderId: "ORD-4440", customer: "Lucy Chirwa", customerEmail: "lucy@email.mw",
    vendor: "Beauty Haven", type: "Vendor Misconduct", status: "Resolved", priority: "High", amount: 8500,
    description: "Vendor sent promotional spam messages to customer's personal phone number obtained from order.",
    createdDate: "2026-03-12", slaDeadline: "2026-03-16", assignedTo: "Senior Manager",
    evidence: [
      { id: "E9", type: "image", label: "Screenshot of spam messages", uploadedBy: "customer", date: "2026-03-12" },
    ],
    timeline: [
      { id: "T11", action: "Dispute opened", actor: "Lucy Chirwa", date: "2026-03-12 08:30", note: "Privacy violation report" },
      { id: "T12", action: "Vendor warned", actor: "Senior Manager", date: "2026-03-13 14:00", note: "Formal warning issued to vendor" },
      { id: "T13", action: "Resolved", actor: "Senior Manager", date: "2026-03-14 10:00", note: "Vendor apologized, MWK 8,500 credit issued to customer" },
    ],
  },
  {
    id: "DSP-006", orderId: "ORD-4420", customer: "Peter Kamanga", customerEmail: "peter@email.mw",
    vendor: "TechWorld Malawi", type: "Billing Error", status: "Closed", priority: "Low", amount: 2400,
    description: "Customer charged twice for same order. Duplicate payment detected.",
    createdDate: "2026-03-08", slaDeadline: "2026-03-12", assignedTo: "Support Team B",
    evidence: [
      { id: "E10", type: "document", label: "Bank statement excerpt", uploadedBy: "customer", date: "2026-03-08" },
    ],
    timeline: [
      { id: "T14", action: "Dispute opened", actor: "Peter Kamanga", date: "2026-03-08 11:00", note: "Double charge reported" },
      { id: "T15", action: "Refund processed", actor: "Finance Team", date: "2026-03-09 15:00", note: "MWK 2,400 refunded" },
      { id: "T16", action: "Closed", actor: "System", date: "2026-03-10 09:00", note: "Auto-closed after refund confirmation" },
    ],
  },
];

export const disputeTypeOptions: DisputeType[] = ["Product Quality", "Non-Delivery", "Wrong Item", "Refund Issue", "Vendor Misconduct", "Billing Error"];
export const disputeStatusOptions: DisputeStatus[] = ["Open", "Under Review", "Awaiting Evidence", "Escalated", "Resolved", "Closed"];
export const disputePriorityOptions: DisputePriority[] = ["Low", "Medium", "High", "Critical"];
