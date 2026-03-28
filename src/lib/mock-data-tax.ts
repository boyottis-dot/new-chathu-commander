export const taxRules = [
  { id: "TAX-001", region: "United States", state: "California", type: "Sales Tax", rate: 7.25, status: "active" as const, lastUpdated: "2026-01-15" },
  { id: "TAX-002", region: "United States", state: "New York", type: "Sales Tax", rate: 8.0, status: "active" as const, lastUpdated: "2026-01-15" },
  { id: "TAX-003", region: "United States", state: "Texas", type: "Sales Tax", rate: 6.25, status: "active" as const, lastUpdated: "2026-01-15" },
  { id: "TAX-004", region: "European Union", state: "Germany", type: "VAT", rate: 19.0, status: "active" as const, lastUpdated: "2026-02-01" },
  { id: "TAX-005", region: "European Union", state: "France", type: "VAT", rate: 20.0, status: "active" as const, lastUpdated: "2026-02-01" },
  { id: "TAX-006", region: "European Union", state: "Netherlands", type: "VAT", rate: 21.0, status: "active" as const, lastUpdated: "2026-02-01" },
  { id: "TAX-007", region: "United Kingdom", state: "UK", type: "VAT", rate: 20.0, status: "active" as const, lastUpdated: "2026-03-01" },
  { id: "TAX-008", region: "Canada", state: "Ontario", type: "HST", rate: 13.0, status: "active" as const, lastUpdated: "2026-01-20" },
  { id: "TAX-009", region: "Australia", state: "National", type: "GST", rate: 10.0, status: "active" as const, lastUpdated: "2026-02-10" },
  { id: "TAX-010", region: "Japan", state: "National", type: "Consumption Tax", rate: 10.0, status: "draft" as const, lastUpdated: "2026-03-20" },
];

export const complianceDocuments = [
  { id: "DOC-001", name: "US Sales Tax Registration", region: "United States", status: "valid" as const, expiresAt: "2027-12-31", uploadedAt: "2026-01-05" },
  { id: "DOC-002", name: "EU VAT Certificate", region: "European Union", status: "valid" as const, expiresAt: "2027-06-30", uploadedAt: "2026-02-01" },
  { id: "DOC-003", name: "UK VAT Registration", region: "United Kingdom", status: "valid" as const, expiresAt: "2027-03-31", uploadedAt: "2026-03-01" },
  { id: "DOC-004", name: "Canadian GST/HST Certificate", region: "Canada", status: "expiring" as const, expiresAt: "2026-05-15", uploadedAt: "2025-05-15" },
  { id: "DOC-005", name: "Australian ABN Registration", region: "Australia", status: "valid" as const, expiresAt: "2028-01-01", uploadedAt: "2026-02-10" },
  { id: "DOC-006", name: "Japan JCT Registration", region: "Japan", status: "pending" as const, expiresAt: null, uploadedAt: "2026-03-20" },
];

export const taxReportHistory = [
  { id: "RPT-001", period: "Q1 2026", region: "United States", totalTax: 48520.00, status: "filed" as const, filedAt: "2026-03-20" },
  { id: "RPT-002", period: "Q1 2026", region: "European Union", totalTax: 32180.00, status: "filed" as const, filedAt: "2026-03-18" },
  { id: "RPT-003", period: "Q1 2026", region: "United Kingdom", totalTax: 12450.00, status: "pending" as const, filedAt: null },
  { id: "RPT-004", period: "Q4 2025", region: "United States", totalTax: 52100.00, status: "filed" as const, filedAt: "2025-12-28" },
  { id: "RPT-005", period: "Q4 2025", region: "European Union", totalTax: 28900.00, status: "filed" as const, filedAt: "2025-12-30" },
];
