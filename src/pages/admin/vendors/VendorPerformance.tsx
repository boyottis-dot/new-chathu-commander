import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertTriangle, Star, TrendingUp, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { vendorPerformance } from "@/lib/mock-data-vendors";

export default function VendorPerformance() {
  const [selectedA, setSelectedA] = useState(vendorPerformance[0].vendorId);
  const [selectedB, setSelectedB] = useState("");
  const vendorA = vendorPerformance.find(v => v.vendorId === selectedA)!;
  const vendorB = selectedB ? vendorPerformance.find(v => v.vendorId === selectedB) : null;

  const StatBlock = ({ label, value, suffix }: { label: string; value: number | string; suffix?: string }) => (
    <div className="bg-secondary rounded-lg p-3 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold">{value}{suffix}</p>
    </div>
  );

  const VendorCard = ({ v, color }: { v: typeof vendorA; color: string }) => (
    <Card className="border-border flex-1">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-primary/20"><AvatarFallback className="bg-primary/20 text-primary">{v.avatar}</AvatarFallback></Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{v.vendorName}</CardTitle>
            {v.flagged && <Badge className="bg-red-500/20 text-red-400 mt-1"><AlertTriangle className="w-3 h-3 mr-1" />Flagged</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <StatBlock label="Avg Rating" value={v.avgRating} suffix="/5" />
          <StatBlock label="Return Rate" value={v.returnRate} suffix="%" />
          <StatBlock label="Refund Rate" value={v.refundRate} suffix="%" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Revenue (6 months)</p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={v.revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} formatter={(v: number) => [`MWK ${v.toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><BarChart3 className="w-3 h-3" /> Orders (6 months)</p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={v.ordersByMonth}>
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Bar dataKey="orders" fill={color} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Star className="w-3 h-3" /> Top Products</p>
          {v.topProducts.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 text-sm">
              <span>{p.name}</span><span className="text-muted-foreground">{p.units} units</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vendor Performance</h1>
        <p className="text-muted-foreground text-sm">Per-vendor stats and side-by-side comparison</p>
      </div>

      {/* Flagged vendors alert */}
      {vendorPerformance.filter(v => v.flagged).length > 0 && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div>
              <p className="font-medium text-sm">Flagged Vendors</p>
              <p className="text-xs text-muted-foreground">{vendorPerformance.filter(v => v.flagged).map(v => v.vendorName).join(", ")} — declining sales or high refund rates</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-3">
        <Select value={selectedA} onValueChange={setSelectedA}>
          <SelectTrigger className="w-[240px] bg-secondary border-border"><SelectValue placeholder="Select vendor A" /></SelectTrigger>
          <SelectContent>{vendorPerformance.map(v => <SelectItem key={v.vendorId} value={v.vendorId}>{v.vendorName}</SelectItem>)}</SelectContent>
        </Select>
        <span className="text-muted-foreground self-center text-sm">vs</span>
        <Select value={selectedB} onValueChange={setSelectedB}>
          <SelectTrigger className="w-[240px] bg-secondary border-border"><SelectValue placeholder="Compare with…" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            {vendorPerformance.filter(v => v.vendorId !== selectedA).map(v => <SelectItem key={v.vendorId} value={v.vendorId}>{v.vendorName}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <VendorCard v={vendorA} color="hsl(var(--primary))" />
        {vendorB && <VendorCard v={vendorB} color="hsl(200, 70%, 55%)" />}
      </div>
    </div>
  );
}
