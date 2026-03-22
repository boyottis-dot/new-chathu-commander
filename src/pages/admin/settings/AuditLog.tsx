import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ClipboardList, Shield, UserPlus, Settings, Package, DollarSign, RotateCcw, Trash2, Edit } from "lucide-react";

interface AuditEntry {
  id: string;
  action: string;
  category: string;
  admin: string;
  target: string;
  timestamp: string;
  ip: string;
  icon: React.ElementType;
}

const auditLog: AuditEntry[] = [
  { id: "AU01", action: "Approved vendor", category: "vendors", admin: "Chathu Owner", target: "TechHub Electronics", timestamp: "2024-01-15 14:32:05", ip: "196.12.45.78", icon: UserPlus },
  { id: "AU02", action: "Released payout", category: "finance", admin: "Grace Banda", target: "MWK 450,000 to FreshMart", timestamp: "2024-01-15 14:15:22", ip: "196.12.45.80", icon: DollarSign },
  { id: "AU03", action: "Rejected product", category: "products", admin: "James Mwale", target: "Counterfeit Watch XL", timestamp: "2024-01-15 13:48:10", ip: "196.12.45.82", icon: Package },
  { id: "AU04", action: "Updated platform fee", category: "settings", admin: "Chathu Owner", target: "Commission: 12% → 15%", timestamp: "2024-01-15 12:30:00", ip: "196.12.45.78", icon: Settings },
  { id: "AU05", action: "Approved refund", category: "refunds", admin: "Grace Banda", target: "Order #ORD-2024-0892", timestamp: "2024-01-15 11:22:45", ip: "196.12.45.80", icon: RotateCcw },
  { id: "AU06", action: "Suspended vendor", category: "vendors", admin: "Chathu Owner", target: "QuickShop Express", timestamp: "2024-01-15 10:15:30", ip: "196.12.45.78", icon: Shield },
  { id: "AU07", action: "Removed review", category: "reviews", admin: "James Mwale", target: "Review #R-4521 (spam)", timestamp: "2024-01-15 09:45:12", ip: "196.12.45.82", icon: Trash2 },
  { id: "AU08", action: "Edited category", category: "shop", admin: "James Mwale", target: "Electronics → Tech & Gadgets", timestamp: "2024-01-14 16:30:00", ip: "196.12.45.82", icon: Edit },
  { id: "AU09", action: "Created admin account", category: "settings", admin: "Chathu Owner", target: "Sarah Phiri (Operations)", timestamp: "2024-01-14 15:00:00", ip: "196.12.45.78", icon: UserPlus },
  { id: "AU10", action: "Held escrow funds", category: "finance", admin: "Grace Banda", target: "MWK 120,000 — dispute pending", timestamp: "2024-01-14 14:20:00", ip: "196.12.45.80", icon: DollarSign },
];

const categoryColors: Record<string, string> = {
  vendors: "bg-blue-500/20 text-blue-400",
  finance: "bg-emerald-500/20 text-emerald-400",
  products: "bg-purple-500/20 text-purple-400",
  settings: "bg-primary/20 text-primary",
  refunds: "bg-orange-500/20 text-orange-400",
  reviews: "bg-yellow-500/20 text-yellow-400",
  shop: "bg-pink-500/20 text-pink-400",
};

export default function AuditLog() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = auditLog.filter(e => {
    const matchSearch = e.action.toLowerCase().includes(search.toLowerCase()) || e.admin.toLowerCase().includes(search.toLowerCase()) || e.target.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || e.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
        <p className="text-muted-foreground text-sm mt-1">Read-only log of all admin actions</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search actions, admins, targets..." className="pl-9 bg-secondary border-border" />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px] bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vendors">Vendors</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
                <SelectItem value="refunds">Refunds</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
                <SelectItem value="shop">Shop</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="w-10"></TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(e => (
                <TableRow key={e.id} className="border-border">
                  <TableCell><e.icon className="h-4 w-4 text-muted-foreground" /></TableCell>
                  <TableCell className="font-medium text-foreground">{e.action}</TableCell>
                  <TableCell><Badge className={categoryColors[e.category] || "bg-muted text-muted-foreground"}>{e.category}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{e.admin}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">{e.target}</TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{e.timestamp}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">{e.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
