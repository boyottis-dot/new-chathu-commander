import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, MousePointerClick, Send, Users, Clock } from "lucide-react";

interface NotificationRecord {
  id: string;
  title: string;
  type: "push" | "in_app" | "email" | "sms";
  target: string;
  recipients: number;
  sentAt: string;
  openRate: number;
  clickRate: number;
  status: "sent" | "scheduled" | "failed";
}

const notifications: NotificationRecord[] = [
  { id: "N001", title: "Flash Sale: 50% Off Today!", type: "push", target: "All Users", recipients: 12450, sentAt: "2024-01-15 14:30", openRate: 34.2, clickRate: 12.8, status: "sent" },
  { id: "N002", title: "New Vendor: TechHub Now Live", type: "in_app", target: "All Users", recipients: 12450, sentAt: "2024-01-14 10:00", openRate: 56.1, clickRate: 23.4, status: "sent" },
  { id: "N003", title: "Your Weekly Digest", type: "email", target: "VIP Customers", recipients: 156, sentAt: "2024-01-13 08:00", openRate: 68.5, clickRate: 31.2, status: "sent" },
  { id: "N004", title: "Order Delivery Update", type: "sms", target: "New Customers", recipients: 342, sentAt: "2024-01-12 16:45", openRate: 89.3, clickRate: 45.6, status: "sent" },
  { id: "N005", title: "Valentine's Day Special", type: "push", target: "All Users", recipients: 12450, sentAt: "2024-02-14 09:00", openRate: 0, clickRate: 0, status: "scheduled" },
  { id: "N006", title: "Payment Reminder", type: "email", target: "Inactive Users", recipients: 1205, sentAt: "2024-01-10 12:00", openRate: 22.1, clickRate: 8.3, status: "sent" },
  { id: "N007", title: "New Features Released", type: "push", target: "All Vendors", recipients: 87, sentAt: "2024-01-09 11:00", openRate: 0, clickRate: 0, status: "failed" },
];

const typeColors: Record<string, string> = {
  push: "bg-blue-500/20 text-blue-400",
  in_app: "bg-primary/20 text-primary",
  email: "bg-purple-500/20 text-purple-400",
  sms: "bg-orange-500/20 text-orange-400",
};

const statusColors: Record<string, string> = {
  sent: "bg-emerald-500/20 text-emerald-400",
  scheduled: "bg-yellow-500/20 text-yellow-400",
  failed: "bg-destructive/20 text-destructive",
};

export default function NotificationHistory() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = notifications.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || n.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalSent = notifications.filter(n => n.status === "sent").reduce((s, n) => s + n.recipients, 0);
  const avgOpenRate = notifications.filter(n => n.status === "sent").reduce((s, n) => s + n.openRate, 0) / notifications.filter(n => n.status === "sent").length;
  const avgClickRate = notifications.filter(n => n.status === "sent").reduce((s, n) => s + n.clickRate, 0) / notifications.filter(n => n.status === "sent").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notification History</h1>
        <p className="text-muted-foreground text-sm mt-1">Track sent notifications and engagement metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Sent", value: totalSent.toLocaleString(), icon: Send, color: "text-primary" },
          { label: "Avg Open Rate", value: `${avgOpenRate.toFixed(1)}%`, icon: Eye, color: "text-blue-400" },
          { label: "Avg Click Rate", value: `${avgClickRate.toFixed(1)}%`, icon: MousePointerClick, color: "text-emerald-400" },
          { label: "Scheduled", value: notifications.filter(n => n.status === "scheduled").length.toString(), icon: Clock, color: "text-yellow-400" },
        ].map(stat => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notifications..." className="pl-9 bg-secondary border-border" />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="push">Push</SelectItem>
                <SelectItem value="in_app">In-App</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Target</TableHead>
                <TableHead className="text-right">Recipients</TableHead>
                <TableHead className="text-right">Open Rate</TableHead>
                <TableHead className="text-right">Click Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(n => (
                <TableRow key={n.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{n.title}</TableCell>
                  <TableCell><Badge className={typeColors[n.type]}>{n.type.replace("_", "-")}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{n.target}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{n.recipients.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{n.status === "sent" ? `${n.openRate}%` : "—"}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{n.status === "sent" ? `${n.clickRate}%` : "—"}</TableCell>
                  <TableCell><Badge className={statusColors[n.status]}>{n.status}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{n.sentAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
