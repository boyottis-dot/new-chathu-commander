import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, UserCheck, ClipboardList, RotateCcw, Rss, Heart, UserPlus, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { overviewStats, revenueData, ordersData, recentOrders, topVendors, topProducts, feedActivity, alerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function formatMWK(amount: number) {
  return `MK ${amount.toLocaleString()}`;
}

const statCards = [
  { label: "Revenue Today", value: formatMWK(overviewStats.totalRevenueToday.value), change: overviewStats.totalRevenueToday.change, icon: DollarSign },
  { label: "Orders Today", value: overviewStats.totalOrdersToday.value.toString(), change: overviewStats.totalOrdersToday.change, icon: ShoppingCart },
  { label: "Active Vendors", value: overviewStats.activeVendors.value.toString(), change: overviewStats.activeVendors.change, icon: Users },
  { label: "Active Customers", value: overviewStats.activeCustomers.value.toLocaleString(), change: overviewStats.activeCustomers.change, icon: UserCheck },
  { label: "Pending Approvals", value: overviewStats.pendingApprovals.value.toString(), change: overviewStats.pendingApprovals.change, icon: ClipboardList },
  { label: "Pending Refunds", value: overviewStats.pendingRefunds.value.toString(), change: overviewStats.pendingRefunds.change, icon: RotateCcw },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-success/15 text-success border-success/20",
  Shipped: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Processing: "bg-warning/15 text-warning border-warning/20",
  Pending: "bg-muted text-muted-foreground border-border",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/20",
};

type Period = "7d" | "30d" | "90d" | "1y";

export default function Overview() {
  const [revenuePeriod, setRevenuePeriod] = useState<Period>("30d");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform overview and health metrics</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((stat, i) => (
          <Card key={stat.label} className="bg-card border-border" style={{ animationDelay: `${i * 60}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className={cn("text-xs font-medium flex items-center gap-0.5", stat.change >= 0 ? "text-success" : "text-destructive")}>
                  {stat.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(stat.change)}%
                </span>
              </div>
              <p className="text-lg font-bold text-foreground tabular-nums">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <div className="flex gap-1">
                {(["7d", "30d", "90d", "1y"] as Period[]).map((p) => (
                  <Button key={p} variant={revenuePeriod === p ? "default" : "ghost"} size="sm" className={cn("h-7 text-xs px-2", revenuePeriod === p && "bg-primary text-primary-foreground")} onClick={() => setRevenuePeriod(p)}>
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData[revenuePeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 16%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 16%)", borderRadius: "8px", fontSize: 12 }} formatter={(v: number) => [formatMWK(v), "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(72 85% 71%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orders (30 days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 16%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 16%)", borderRadius: "8px", fontSize: 12 }} />
                <Bar dataKey="orders" fill="hsl(72 85% 71%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-primary">View all</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs text-muted-foreground">Order ID</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Customer</TableHead>
                  <TableHead className="text-xs text-muted-foreground hidden md:table-cell">Vendor</TableHead>
                  <TableHead className="text-xs text-muted-foreground text-right">Amount</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="border-border">
                    <TableCell className="text-xs font-mono text-primary">{order.id}</TableCell>
                    <TableCell className="text-xs">{order.customer}</TableCell>
                    <TableCell className="text-xs text-muted-foreground hidden md:table-cell">{order.vendor}</TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{formatMWK(order.amount)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-[10px] font-medium", statusColors[order.status])}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Top vendors & products */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Top Vendors (This Month)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topVendors.map((vendor, i) => (
              <div key={vendor.name} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 tabular-nums">{i + 1}</span>
                <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-semibold text-primary">{vendor.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{vendor.name}</p>
                  <p className="text-[10px] text-muted-foreground">{vendor.orders} orders</p>
                </div>
                <span className="text-xs font-medium tabular-nums text-foreground">{formatMWK(vendor.sales)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Top Products (This Month)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 tabular-nums">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground">{product.vendor}</p>
                </div>
                <span className="text-xs font-medium tabular-nums text-foreground">{product.units} sold</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Feed activity & Alerts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Feed Activity Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Rss className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xl font-bold tabular-nums">{feedActivity.postsToday}</p>
                <p className="text-[10px] text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Heart className="h-4 w-4 text-destructive" />
                </div>
                <p className="text-xl font-bold tabular-nums">{feedActivity.likesToday.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <UserPlus className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-xl font-bold tabular-nums">{feedActivity.followsToday}</p>
                <p className="text-[10px] text-muted-foreground">Follows</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-2.5">
                {alert.type === "error" ? (
                  <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs">{alert.message}</p>
                  <p className="text-[10px] text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
