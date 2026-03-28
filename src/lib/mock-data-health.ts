export const systemServices = [
  { name: "API Gateway", status: "operational" as const, uptime: 99.98, latency: 42, lastIncident: "2026-02-10" },
  { name: "Database (Primary)", status: "operational" as const, uptime: 99.99, latency: 8, lastIncident: "2026-01-05" },
  { name: "Database (Replica)", status: "operational" as const, uptime: 99.95, latency: 12, lastIncident: "2026-02-28" },
  { name: "Payment Processing", status: "operational" as const, uptime: 99.97, latency: 180, lastIncident: "2026-03-01" },
  { name: "Search Engine", status: "degraded" as const, uptime: 99.80, latency: 320, lastIncident: "2026-03-27" },
  { name: "CDN / Asset Delivery", status: "operational" as const, uptime: 99.99, latency: 15, lastIncident: "2025-12-20" },
  { name: "Email Service", status: "operational" as const, uptime: 99.90, latency: 95, lastIncident: "2026-03-15" },
  { name: "Push Notifications", status: "outage" as const, uptime: 98.50, latency: 0, lastIncident: "2026-03-28" },
  { name: "File Storage", status: "operational" as const, uptime: 99.96, latency: 55, lastIncident: "2026-01-22" },
  { name: "Background Workers", status: "operational" as const, uptime: 99.92, latency: 25, lastIncident: "2026-02-14" },
];

export const errorRateHistory = [
  { time: "00:00", rate: 0.12, requests: 8400 },
  { time: "02:00", rate: 0.08, requests: 3200 },
  { time: "04:00", rate: 0.05, requests: 1800 },
  { time: "06:00", rate: 0.10, requests: 5600 },
  { time: "08:00", rate: 0.15, requests: 14200 },
  { time: "10:00", rate: 0.22, requests: 22800 },
  { time: "12:00", rate: 0.18, requests: 28500 },
  { time: "14:00", rate: 0.35, requests: 31200 },
  { time: "16:00", rate: 0.28, requests: 29800 },
  { time: "18:00", rate: 0.20, requests: 25600 },
  { time: "20:00", rate: 0.14, requests: 18900 },
  { time: "22:00", rate: 0.10, requests: 12400 },
];

export const activeUsersRealtime = [
  { time: "5m ago", users: 1842 },
  { time: "4m ago", users: 1910 },
  { time: "3m ago", users: 1878 },
  { time: "2m ago", users: 1956 },
  { time: "1m ago", users: 2014 },
  { time: "Now", users: 1988 },
];

export const recentIncidents = [
  { id: "INC-001", title: "Push notification service unresponsive", severity: "critical" as const, status: "investigating", startedAt: "2026-03-28T08:15:00Z", service: "Push Notifications" },
  { id: "INC-002", title: "Elevated search latency", severity: "warning" as const, status: "monitoring", startedAt: "2026-03-27T14:30:00Z", service: "Search Engine" },
  { id: "INC-003", title: "Email delivery delays (resolved)", severity: "warning" as const, status: "resolved", startedAt: "2026-03-15T09:00:00Z", resolvedAt: "2026-03-15T11:45:00Z", service: "Email Service" },
  { id: "INC-004", title: "Payment gateway timeout spike (resolved)", severity: "critical" as const, status: "resolved", startedAt: "2026-03-01T16:20:00Z", resolvedAt: "2026-03-01T17:05:00Z", service: "Payment Processing" },
];
