import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { revenueOverview, revenueByLocation, revenueByCategory, revenueByVendor, dailyRevenue } from "@/lib/mock-data-finance";
import { DollarSign, TrendingUp, MapPin, Globe } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const fmt = (n: number) => `MWK ${(n / 1000000).toFixed(1)}M`;
const fmtFull = (n: number) => `MWK ${n.toLocaleString()}`;

const COLORS = ["hsl(72, 85%, 71%)", "hsl(160, 60%, 45%)", "hsl(30, 80%, 55%)", "hsl(280, 65%, 60%)", "hsl(200, 70%, 50%)", "hsl(0, 72%, 51%)", "hsl(45, 80%, 55%)", "hsl(120, 50%, 40%)"];

const RevenueDashboard = () => {
  const [range, setRange] = useState("30d");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Revenue Dashboard</h1>
        <p className="text-muted-foreground">Platform-wide financial overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">All Time Revenue</p><p className="text-xl font-bold text-foreground">{fmt(revenueOverview.allTime)}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">This Month</p><p className="text-xl font-bold text-primary">{fmt(revenueOverview.thisMonth)}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">This Week</p><p className="text-xl font-bold text-foreground">{fmt(revenueOverview.thisWeek)}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Today</p><p className="text-xl font-bold text-foreground">{fmtFull(revenueOverview.today)}</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Platform Fees (All Time)</p><p className="text-xl font-bold text-primary">{fmt(revenueOverview.platformFees.allTime)}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Platform Fees (This Month)</p><p className="text-xl font-bold text-foreground">{fmt(revenueOverview.platformFees.thisMonth)}</p></CardContent></Card>
      </div>

      {/* Revenue Graph */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2"><CardTitle className="text-foreground text-lg">Daily Revenue</CardTitle></CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
                <XAxis dataKey="date" stroke="hsl(0, 0%, 55%)" tick={{ fontSize: 11 }} interval={4} />
                <YAxis stroke="hsl(0, 0%, 55%)" tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)" }} formatter={(v: number) => [fmtFull(v), ""]} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(72, 85%, 71%)" strokeWidth={2} dot={false} name="Revenue" />
                <Line type="monotone" dataKey="fees" stroke="hsl(160, 60%, 45%)" strokeWidth={2} dot={false} name="Fees" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Location */}
        <Card className="border-border bg-card">
          <CardHeader><CardTitle className="text-foreground text-lg">Revenue by Location</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueByLocation} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="revenue" nameKey="name">
                      {revenueByLocation.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {revenueByLocation.map((r, i) => (
                  <div key={r.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <div>
                      <p className="text-foreground text-sm flex items-center gap-1">{r.name === "LOCAL" ? <MapPin className="h-3 w-3" /> : <Globe className="h-3 w-3" />} {r.name}</p>
                      <p className="text-muted-foreground text-xs">{fmt(r.revenue)} ({r.percentage}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* By Category */}
        <Card className="border-border bg-card">
          <CardHeader><CardTitle className="text-foreground text-lg">Revenue by Category</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
                  <XAxis type="number" stroke="hsl(0, 0%, 55%)" tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                  <YAxis type="category" dataKey="name" stroke="hsl(0, 0%, 55%)" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)" }} formatter={(v: number) => [fmtFull(v), "Revenue"]} />
                  <Bar dataKey="revenue" fill="hsl(72, 85%, 71%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* By Vendor */}
      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-foreground text-lg">Revenue by Vendor</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={revenueByVendor} cx="50%" cy="50%" outerRadius={100} dataKey="revenue" nameKey="name" label={({ name, percentage }) => `${percentage}%`}>
                    {revenueByVendor.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)" }} formatter={(v: number) => [fmtFull(v), "Revenue"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Table>
              <TableHeader><TableRow className="border-border"><TableHead>Vendor</TableHead><TableHead>Revenue</TableHead><TableHead>Share</TableHead></TableRow></TableHeader>
              <TableBody>
                {revenueByVendor.map((v, i) => (
                  <TableRow key={v.name} className="border-border">
                    <TableCell><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} /><span className="text-foreground">{v.name}</span></div></TableCell>
                    <TableCell className="text-foreground">{fmt(v.revenue)}</TableCell>
                    <TableCell className="text-muted-foreground">{v.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueDashboard;
