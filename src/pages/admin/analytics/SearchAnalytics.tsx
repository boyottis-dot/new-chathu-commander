import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Search, TrendingUp, TrendingDown, Minus, AlertTriangle, ArrowUpDown } from "lucide-react";
import { topSearches, zeroResultQueries, searchTrends, categorySearchShare } from "@/lib/mock-data-search";

const COLORS = ["hsl(72,85%,71%)", "hsl(142,71%,45%)", "hsl(217,91%,60%)", "hsl(38,92%,50%)", "hsl(0,72%,51%)", "hsl(280,65%,60%)", "hsl(180,60%,50%)"];

const trendIcon = (t: string) => t === "up" ? <TrendingUp className="h-4 w-4 text-green-400" /> : t === "down" ? <TrendingDown className="h-4 w-4 text-red-400" /> : <Minus className="h-4 w-4 text-muted-foreground" />;

export default function SearchAnalytics() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"count" | "conversions" | "conversionRate">("count");

  const totalSearches = topSearches.reduce((s, q) => s + q.count, 0);
  const totalConversions = topSearches.reduce((s, q) => s + q.conversions, 0);
  const avgConversion = totalSearches > 0 ? ((totalConversions / totalSearches) * 100).toFixed(1) : "0";
  const zeroResultCount = zeroResultQueries.reduce((s, q) => s + q.count, 0);

  const filtered = topSearches.filter(q => q.term.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Search & Discovery Analytics</h1>
        <p className="text-muted-foreground">Understand what customers search for and optimize discovery</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Searches (30d)</p><p className="text-2xl font-bold text-foreground">{totalSearches.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Search Conversions</p><p className="text-2xl font-bold text-primary">{totalConversions.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Conversion Rate</p><p className="text-2xl font-bold text-foreground">{avgConversion}%</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Zero-Result Searches</p><p className="text-2xl font-bold text-destructive">{zeroResultCount.toLocaleString()}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="trending">
        <TabsList><TabsTrigger value="trending">Trending Searches</TabsTrigger><TabsTrigger value="zero">Zero Results</TabsTrigger><TabsTrigger value="categories">By Category</TabsTrigger><TabsTrigger value="trends">Trends</TabsTrigger></TabsList>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Search Queries</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Input placeholder="Filter searches..." value={filter} onChange={e => setFilter(e.target.value)} className="max-w-xs" />
                <Button variant="outline" size="sm" onClick={() => setSortBy("count")}><ArrowUpDown className="h-3 w-3 mr-1" />Volume</Button>
                <Button variant="outline" size="sm" onClick={() => setSortBy("conversions")}><ArrowUpDown className="h-3 w-3 mr-1" />Conversions</Button>
                <Button variant="outline" size="sm" onClick={() => setSortBy("conversionRate")}><ArrowUpDown className="h-3 w-3 mr-1" />CVR</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>Search Term</TableHead><TableHead>Searches</TableHead><TableHead>Results</TableHead><TableHead>Conversions</TableHead><TableHead>CVR</TableHead><TableHead>Trend</TableHead></TableRow></TableHeader>
                <TableBody>
                  {filtered.map((q, i) => (
                    <TableRow key={q.id}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-medium text-foreground flex items-center gap-2"><Search className="h-3 w-3 text-muted-foreground" />{q.term}</TableCell>
                      <TableCell>{q.count.toLocaleString()}</TableCell>
                      <TableCell>{q.results}</TableCell>
                      <TableCell className="text-primary">{q.conversions.toLocaleString()}</TableCell>
                      <TableCell><Badge variant={q.conversionRate > 20 ? "default" : "secondary"}>{q.conversionRate}%</Badge></TableCell>
                      <TableCell>{trendIcon(q.trend)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" />Zero-Result Queries</CardTitle>
              <CardDescription>Searches that returned no products — opportunity to expand catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Search Term</TableHead><TableHead>Searches</TableHead><TableHead>Last Searched</TableHead><TableHead>Suggested Action</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                <TableBody>
                  {zeroResultQueries.map(q => (
                    <TableRow key={q.id}>
                      <TableCell className="font-medium text-foreground">{q.term}</TableCell>
                      <TableCell>{q.count}</TableCell>
                      <TableCell className="text-muted-foreground">{q.lastSearched}</TableCell>
                      <TableCell><Badge variant="outline">{q.suggestedAction}</Badge></TableCell>
                      <TableCell><Button size="sm" variant="outline">Resolve</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Search Share by Category</CardTitle></CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categorySearchShare} dataKey="share" nameKey="category" cx="50%" cy="50%" outerRadius={100} label={({ category, share }) => `${category} ${share}%`}>
                      {categorySearchShare.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,20%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Searches by Category</CardTitle></CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categorySearchShare} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
                    <XAxis type="number" stroke="hsl(0,0%,55%)" />
                    <YAxis type="category" dataKey="category" stroke="hsl(0,0%,55%)" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,20%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                    <Bar dataKey="searches" fill="hsl(72,85%,71%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Search Volume & Conversions Trend</CardTitle></CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={searchTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
                  <XAxis dataKey="date" stroke="hsl(0,0%,55%)" />
                  <YAxis stroke="hsl(0,0%,55%)" />
                  <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,20%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                  <Line type="monotone" dataKey="searches" stroke="hsl(72,85%,71%)" strokeWidth={2} dot={false} name="Searches" />
                  <Line type="monotone" dataKey="conversions" stroke="hsl(217,91%,60%)" strokeWidth={2} dot={false} name="Conversions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
