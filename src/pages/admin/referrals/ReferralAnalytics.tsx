import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { referralAnalytics } from "@/lib/mock-data-referrals";
import { Users, TrendingUp, DollarSign, BarChart3, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function ReferralAnalytics() {
  const { totalReferrals, totalConversions, conversionRate, totalRevenue, avgRevenuePerReferral, topReferrers, monthlyData } = referralAnalytics;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Referral Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Track referral performance and top referrers</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-xs flex items-center gap-1"><Users className="h-3 w-3" /> Total Referrals</p><p className="text-xl font-bold text-foreground">{totalReferrals.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-xs flex items-center gap-1"><Target className="h-3 w-3" /> Conversions</p><p className="text-xl font-bold text-emerald-400">{totalConversions.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-xs flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Conv. Rate</p><p className="text-xl font-bold text-primary">{conversionRate}%</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-xs flex items-center gap-1"><DollarSign className="h-3 w-3" /> Revenue</p><p className="text-xl font-bold text-foreground">MWK {(totalRevenue / 1000000).toFixed(1)}M</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-xs flex items-center gap-1"><BarChart3 className="h-3 w-3" /> Avg/Referral</p><p className="text-xl font-bold text-foreground">MWK {avgRevenuePerReferral.toLocaleString()}</p></CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-foreground">Monthly Referrals & Conversions</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="referrals" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-foreground">Revenue from Referrals</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`MWK ${v.toLocaleString()}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-sm font-medium text-foreground">Top Referrers</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Referrals</TableHead>
                <TableHead className="text-center">Conversions</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Conv. Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topReferrers.sort((a, b) => b.revenue - a.revenue).map((ref, i) => (
                <TableRow key={ref.name} className="border-border">
                  <TableCell className="font-medium text-foreground">#{i + 1}</TableCell>
                  <TableCell className="font-medium text-foreground">{ref.name}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px] border-border">{ref.type}</Badge></TableCell>
                  <TableCell className="text-center tabular-nums">{ref.referrals}</TableCell>
                  <TableCell className="text-center tabular-nums text-emerald-400">{ref.conversions}</TableCell>
                  <TableCell className="text-foreground tabular-nums">MWK {ref.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-primary tabular-nums">{((ref.conversions / ref.referrals) * 100).toFixed(0)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
