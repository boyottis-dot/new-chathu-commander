// Document Manager mock data

export type DocType = "pdf" | "docx" | "xlsx" | "pptx" | "image" | "csv" | "other";

export interface DocFile {
  id: string;
  name: string;
  type: DocType;
  size: string;
  folderId: string;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  version: number;
  sharedWith: string[];
  tags: string[];
  starred: boolean;
}

export interface DocFolder {
  id: string;
  name: string;
  parentId: string | null;
  color: string;
  fileCount: number;
  department: string;
  createdBy: string;
}

export interface DocTemplate {
  id: string;
  name: string;
  type: DocType;
  category: string;
  description: string;
  usageCount: number;
  lastUsed: string;
  createdBy: string;
}

export interface DocVersion {
  id: string;
  fileId: string;
  version: number;
  modifiedBy: string;
  modifiedDate: string;
  changes: string;
  size: string;
}

export const folders: DocFolder[] = [
  { id: "fld-1", name: "Vendor Contracts", parentId: null, color: "#3b82f6", fileCount: 12, department: "Finance", createdBy: "Sarah Kamanga" },
  { id: "fld-2", name: "Marketing Assets", parentId: null, color: "#10b981", fileCount: 28, department: "Marketing", createdBy: "James Phiri" },
  { id: "fld-3", name: "HR Documents", parentId: null, color: "#f59e0b", fileCount: 15, department: "Operations", createdBy: "Mary Chirwa" },
  { id: "fld-4", name: "Financial Reports", parentId: null, color: "#ef4444", fileCount: 8, department: "Finance", createdBy: "Sarah Kamanga" },
  { id: "fld-5", name: "SOPs & Procedures", parentId: null, color: "#8b5cf6", fileCount: 20, department: "Operations", createdBy: "Mary Chirwa" },
  { id: "fld-6", name: "Influencer Agreements", parentId: null, color: "#06b6d4", fileCount: 7, department: "Influencer Relations", createdBy: "Daniel Mwale" },
  { id: "fld-7", name: "Campaign Briefs", parentId: "fld-2", color: "#10b981", fileCount: 10, department: "Marketing", createdBy: "James Phiri" },
  { id: "fld-8", name: "Brand Guidelines", parentId: "fld-2", color: "#10b981", fileCount: 5, department: "Marketing", createdBy: "Tadala Nyirenda" },
  { id: "fld-9", name: "Monthly Reports", parentId: "fld-4", color: "#ef4444", fileCount: 6, department: "Finance", createdBy: "Mphatso Gondwe" },
  { id: "fld-10", name: "Legal", parentId: null, color: "#64748b", fileCount: 4, department: "Finance", createdBy: "Sarah Kamanga" },
];

export const files: DocFile[] = [
  { id: "file-1", name: "Vendor Agreement — MalawiTech.pdf", type: "pdf", size: "2.4 MB", folderId: "fld-1", uploadedBy: "Sarah Kamanga", uploadDate: "2024-07-15", lastModified: "2024-07-15", version: 1, sharedWith: ["Finance", "Operations"], tags: ["contract", "vendor"], starred: true },
  { id: "file-2", name: "August Campaign Brief.docx", type: "docx", size: "1.1 MB", folderId: "fld-7", uploadedBy: "James Phiri", uploadDate: "2024-08-01", lastModified: "2024-08-10", version: 3, sharedWith: ["Marketing", "Influencer Relations"], tags: ["campaign", "brief"], starred: false },
  { id: "file-3", name: "Q2 Revenue Report.xlsx", type: "xlsx", size: "3.8 MB", folderId: "fld-9", uploadedBy: "Mphatso Gondwe", uploadDate: "2024-07-10", lastModified: "2024-07-12", version: 2, sharedWith: ["Finance"], tags: ["report", "quarterly"], starred: true },
  { id: "file-4", name: "Employee Handbook v4.pdf", type: "pdf", size: "5.2 MB", folderId: "fld-3", uploadedBy: "Mary Chirwa", uploadDate: "2024-06-01", lastModified: "2024-08-05", version: 4, sharedWith: ["All"], tags: ["hr", "handbook", "policy"], starred: true },
  { id: "file-5", name: "Brand Logo Pack.zip", type: "other", size: "15.6 MB", folderId: "fld-8", uploadedBy: "Tadala Nyirenda", uploadDate: "2024-05-20", lastModified: "2024-05-20", version: 1, sharedWith: ["Marketing"], tags: ["brand", "logo", "assets"], starred: false },
  { id: "file-6", name: "Influencer Rate Card.xlsx", type: "xlsx", size: "0.8 MB", folderId: "fld-6", uploadedBy: "Daniel Mwale", uploadDate: "2024-08-01", lastModified: "2024-08-12", version: 2, sharedWith: ["Influencer Relations", "Finance"], tags: ["influencer", "rates"], starred: false },
  { id: "file-7", name: "Warehouse SOP — Receiving.pdf", type: "pdf", size: "1.5 MB", folderId: "fld-5", uploadedBy: "Mary Chirwa", uploadDate: "2024-04-10", lastModified: "2024-07-20", version: 3, sharedWith: ["Operations"], tags: ["sop", "warehouse"], starred: false },
  { id: "file-8", name: "July Financial Summary.pptx", type: "pptx", size: "4.2 MB", folderId: "fld-9", uploadedBy: "Mphatso Gondwe", uploadDate: "2024-08-05", lastModified: "2024-08-05", version: 1, sharedWith: ["Finance", "All Admins"], tags: ["report", "presentation"], starred: false },
  { id: "file-9", name: "Customer Support Scripts.docx", type: "docx", size: "0.6 MB", folderId: "fld-5", uploadedBy: "Grace Banda", uploadDate: "2024-03-15", lastModified: "2024-08-08", version: 5, sharedWith: ["Customer Support"], tags: ["sop", "support", "scripts"], starred: true },
  { id: "file-10", name: "Terms of Service — Draft.pdf", type: "pdf", size: "0.9 MB", folderId: "fld-10", uploadedBy: "Sarah Kamanga", uploadDate: "2024-08-14", lastModified: "2024-08-14", version: 1, sharedWith: ["Finance", "Technology"], tags: ["legal", "terms"], starred: false },
  { id: "file-11", name: "Product Photography Guide.pdf", type: "pdf", size: "3.1 MB", folderId: "fld-8", uploadedBy: "Tadala Nyirenda", uploadDate: "2024-06-20", lastModified: "2024-06-20", version: 1, sharedWith: ["Marketing"], tags: ["guide", "photography"], starred: false },
  { id: "file-12", name: "Payroll August 2024.xlsx", type: "xlsx", size: "1.2 MB", folderId: "fld-4", uploadedBy: "Mphatso Gondwe", uploadDate: "2024-08-20", lastModified: "2024-08-20", version: 1, sharedWith: ["Finance"], tags: ["payroll", "confidential"], starred: false },
];

export const templates: DocTemplate[] = [
  { id: "tpl-1", name: "Vendor Agreement Template", type: "pdf", category: "Contracts", description: "Standard vendor partnership agreement with terms, commission rates, and obligations.", usageCount: 24, lastUsed: "2024-08-10", createdBy: "Sarah Kamanga" },
  { id: "tpl-2", name: "Campaign Brief Template", type: "docx", category: "Marketing", description: "Template for briefing marketing campaigns including objectives, audience, budget, and KPIs.", usageCount: 15, lastUsed: "2024-08-01", createdBy: "James Phiri" },
  { id: "tpl-3", name: "Influencer Contract Template", type: "pdf", category: "Contracts", description: "Standard influencer collaboration agreement with deliverables and payment terms.", usageCount: 18, lastUsed: "2024-08-12", createdBy: "Daniel Mwale" },
  { id: "tpl-4", name: "Monthly Report Template", type: "xlsx", category: "Reports", description: "Standardized monthly financial and operational report spreadsheet.", usageCount: 8, lastUsed: "2024-08-05", createdBy: "Mphatso Gondwe" },
  { id: "tpl-5", name: "Employee Onboarding Checklist", type: "docx", category: "HR", description: "Checklist for onboarding new employees including IT setup, training, and documentation.", usageCount: 12, lastUsed: "2024-07-20", createdBy: "Mary Chirwa" },
  { id: "tpl-6", name: "Expense Report Template", type: "xlsx", category: "Finance", description: "Standard form for submitting expense claims with receipt tracking.", usageCount: 30, lastUsed: "2024-08-15", createdBy: "Mphatso Gondwe" },
  { id: "tpl-7", name: "SOP Template", type: "docx", category: "Operations", description: "Standard operating procedure template with steps, responsibilities, and quality checks.", usageCount: 10, lastUsed: "2024-07-25", createdBy: "Mary Chirwa" },
  { id: "tpl-8", name: "NDA Template", type: "pdf", category: "Legal", description: "Non-disclosure agreement for vendors, partners, and contractors.", usageCount: 6, lastUsed: "2024-08-02", createdBy: "Sarah Kamanga" },
];

export const versions: DocVersion[] = [
  { id: "ver-1", fileId: "file-4", version: 4, modifiedBy: "Mary Chirwa", modifiedDate: "2024-08-05", changes: "Updated remote work policy section", size: "5.2 MB" },
  { id: "ver-2", fileId: "file-4", version: 3, modifiedBy: "Mary Chirwa", modifiedDate: "2024-06-15", changes: "Added social media guidelines", size: "4.8 MB" },
  { id: "ver-3", fileId: "file-4", version: 2, modifiedBy: "Grace Banda", modifiedDate: "2024-04-01", changes: "Updated leave policy", size: "4.5 MB" },
  { id: "ver-4", fileId: "file-4", version: 1, modifiedBy: "Mary Chirwa", modifiedDate: "2024-01-10", changes: "Initial version", size: "4.0 MB" },
  { id: "ver-5", fileId: "file-2", version: 3, modifiedBy: "James Phiri", modifiedDate: "2024-08-10", changes: "Added budget breakdown", size: "1.1 MB" },
  { id: "ver-6", fileId: "file-2", version: 2, modifiedBy: "Tadala Nyirenda", modifiedDate: "2024-08-05", changes: "Added creative brief section", size: "0.9 MB" },
  { id: "ver-7", fileId: "file-2", version: 1, modifiedBy: "James Phiri", modifiedDate: "2024-08-01", changes: "Initial draft", size: "0.7 MB" },
];
