import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, TrendingUp, AlertTriangle, Crown } from "lucide-react";
import { clvCustomers, cohortData, segmentDistribution, clvTrends } from "@/lib/mock-data-clv";

const fmt = (n: number) => `MK ${(n / 1000000).toFixed(1)}M`;

const segmentColors: Record<string, string> = {
  Champion: "hsl(72,85%,71%)", Loyal: "hsl(142,71%,45%)", "At Risk": "hsl(38,92%,50%)",
  New: "hsl(217,91%,60%)", Dormant: "hsl(0,72%,51%)",
};
const churnColors: Record<string, string> = { Low: "default", Medium: "secondary", High: "destructive" };
const heatColor = (val: number) => val === 0 ? "bg-muted/30" : val >= 80 ? "bg-primary/80 text-primary-foreground" : val >= 60 ? "bg-primary/50" : val >= 40 ? "bg-primary/30" : "bg-primary/15";

export default function CustomerAnalytics() {
  const [segmentFilter, setSegmentFilter] = useState("all");

  const totalCLV = clvCustomers.reduce((s, c) => s + c.clv, 0);
  const avgCLV = totalCLV / clvCustomers.length;
  const highRisk = clvCustomers.filter(c => c.churnRisk === "High").length;

  const displayed = segmentFilter === "all" ? clvCustomers : clvCustomers.filter(c => c.segment === segmentFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Customer Lifetime Value & Cohort Analytics</h1>
        <p className="text-muted-foreground">RFM segmentation, cohort retention, and churn prediction</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><Crown className="h-8 w-8 text-primary" /><div><p className="text-xs text-muted-foreground">Total CLV (Top 10)</p><p className="text-xl font-bold text-foreground">{fmt(totalCLV)}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><TrendingUp className="h-8 w-8 text-primary" /><div><p className="text-xs text-muted-foreground">Average CLV</p><p className="text-xl font-bold text-foreground">{fmt(avgCLV)}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Users className="h-8 w-8 text-primary" /><div><p className="text-xs text-muted-foreground">Total Segments</p><p className="text-xl font-bold text-foreground">{segmentDistribution.length}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><AlertTriangle className="h-8 w-8 text-destructive" /><div><p className="text-xs text-muted-foreground">High Churn Risk</p><p className="text-xl font-bold text-destructive">{highRisk}</p></div></CardContent></Card>
      </div>

      <Tabs defaultValue="rfm">
        <TabsList><TabsTrigger value="rfm">RFM Segmentation</TabsTrigger><TabsTrigger value="cohort">Cohort Retention</TabsTrigger><TabsTrigger value="trends">CLV Trends</TabsTrigger><TabsTrigger value="segments">Segment Breakdown</TabsTrigger></TabsList>

        <TabsContent value="rfm" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-lg">Customer RFM Analysis</CardTitle>
                <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="Champion">Champion</SelectItem>
                    <SelectItem value="Loyal">Loyal</SelectItem>
                    <SelectItem value="At Risk">At Risk</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Dormant">Dormant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>CLV</TableHead><TableHead>Segment</TableHead><TableHead>Recency</TableHead><TableHead>Frequency</TableHead><TableHead>Monetary</TableHead><TableHead>Orders</TableHead><TableHead>Churn Risk</TableHead></TableRow></TableHeader>
                <TableBody>
                  {displayed.map(c => (
                    <TableRow key={c.id}>
                      <TableCell><div><p className="font-medium text-foreground">{c.name}</p><p className="text-xs text-muted-foreground">{c.email}</p></div></TableCell>
                      <TableCell className="font-semibold text-primary">MK {(c.clv / 1000).toFixed(0)}K</TableCell>
                      <TableCell><Badge style={{ backgroundColor: segmentColors[c.segment], color: c.segment === "Champion" ? "hsl(0,0%,5%)" : undefined }}>{c.segment}</Badge></TableCell>
                      <TableCell>{c.recency}d ago</TableCell>
                      <TableCell>{c.frequency}/mo</TableCell>
                      <TableCell>MK {(c.monetary / 1000).toFixed(0)}K</TableCell>
                      <TableCell>{c.totalOrders}</TableCell>
                      <TableCell><Badge variant={churnColors[c.churnRisk] as any}>{c.churnRisk}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohort" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Cohort Retention Heatmap</CardTitle><CardDescription>Percentage of customers retained each month after first purchase</CardDescription></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr><th className="text-left p-2 text-muted-foreground">Cohort</th>{["M1", "M2", "M3", "M4", "M5", "M6"].map(m => <th key={m} className="p-2 text-center text-muted-foreground">{m}</th>)}</tr></thead>
                  <tbody>
                    {cohortData.map(row => (
                      <tr key={row.cohort}>
                        <td className="p-2 font-medium text-foreground">{row.cohort}</td>
                        {[row.month1, row.month2, row.month3, row.month4, row.month5, row.month6].map((val, i) => (
                          <td key={i} className={`p-2 text-center rounded ${heatColor(val)}`}>{val > 0 ? `${val}%` : "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Average CLV Over Time</CardTitle></CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={clvTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
                    <XAxis dataKey="month" stroke="hsl(0,0%,55%)" />
                    <YAxis stroke="hsl(0,0%,55%)" tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
                    <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,20%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} formatter={(v: number) => `MK ${(v/1000000).toFixed(2)}M`} />
                    <Line type="monotone" dataKey="avgCLV" stroke="hsl(72,85%,71%)" strokeWidth={2} dot={{ fill: "hsl(72,85%,71%)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">New vs Churned Customers</CardTitle></CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clvTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
                    <XAxis dataKey="month" stroke="hsl(0,0%,55%)" />
                    <YAxis stroke="hsl(0,0%,55%)" />
                    <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,20%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                    <Bar dataKey="newCustomers" fill="hsl(72,85%,71%)" name="New" radius={[4,4,0,0]} />
                    <Bar dataKey="churnedCustomers" fill="hsl(0,72%,51%)" name="Churned" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Segment Distribution</CardTitle></CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={segmentDistribution} dataKey="count" nameKey="segment" cx="50%" cy="50%" outerRadius={100} label={({ segment, count }) => `${segment}: ${count}`}>
                      {segmentDistribution.map((s, i) => <Cell key={i} fill={s.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,20%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Revenue by Segment</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {segmentDistribution.map(s => (
                    <div key={s.segment} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-foreground font-medium">{s.segment}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{fmt(s.revenue)}</p>
                        <p className="text-xs text-muted-foreground">{s.count} customers</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
