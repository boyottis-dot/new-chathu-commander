import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { campaigns as initialCampaigns, campaignStats, Campaign, CampaignStatus, CampaignType } from "@/lib/mock-data-campaigns";
import { Megaphone, Zap, TrendingUp, DollarSign, Eye, Pause, Play, Plus, Search, BarChart3, Target } from "lucide-react";

const statusColors: Record<string, string> = {
  "Draft": "bg-muted text-muted-foreground",
  "Scheduled": "bg-blue-100 text-blue-800",
  "Active": "bg-green-100 text-green-800",
  "Paused": "bg-amber-100 text-amber-800",
  "Ended": "bg-secondary text-secondary-foreground",
};

const typeIcons: Record<string, React.ElementType> = {
  "Flash Sale": Zap,
  "Banner": Megaphone,
  "Email": Target,
  "Push Notification": Megaphone,
  "Social Media": TrendingUp,
  "Discount Code": DollarSign,
};

const allTypes: CampaignType[] = ["Flash Sale", "Banner", "Email", "Push Notification", "Social Media", "Discount Code"];

export default function CampaignManager() {
  const [items, setItems] = useState<Campaign[]>(initialCampaigns);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [detail, setDetail] = useState<Campaign | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", type: "Flash Sale" as CampaignType, targetSegment: "All Customers", startDate: "", endDate: "", budget: "", discountType: "percentage" as "percentage" | "fixed", discountValue: "", description: "" });

  const filtered = items.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    const matchType = filterType === "all" || c.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const toggleStatus = (id: string) => {
    setItems(prev => prev.map(c => {
      if (c.id !== id) return c;
      const next: CampaignStatus = c.status === "Active" ? "Paused" : c.status === "Paused" ? "Active" : c.status === "Scheduled" ? "Active" : c.status;
      return { ...c, status: next };
    }));
    toast.success("Campaign status updated");
  };

  const createCampaign = () => {
    if (!form.name || !form.startDate || !form.endDate) { toast.error("Fill in required fields"); return; }
    const newC: Campaign = {
      id: `CMP-${String(items.length + 1).padStart(3, "0")}`,
      name: form.name, type: form.type, status: "Draft", startDate: form.startDate, endDate: form.endDate,
      targetSegment: form.targetSegment, budget: Number(form.budget) || 0, spent: 0, impressions: 0, clicks: 0, conversions: 0, revenue: 0,
      discountType: form.discountType, discountValue: Number(form.discountValue) || 0, products: [], description: form.description, createdBy: "Admin", createdAt: new Date().toISOString().split("T")[0],
    };
    setItems(prev => [newC, ...prev]);
    setShowCreate(false);
    toast.success("Campaign created as Draft");
  };

  const ctr = (c: Campaign) => c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(1) : "0.0";
  const convRate = (c: Campaign) => c.clicks > 0 ? ((c.conversions / c.clicks) * 100).toFixed(1) : "0.0";
  const roi = (c: Campaign) => c.spent > 0 ? ((c.revenue / c.spent) * 100 - 100).toFixed(0) : "0";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Marketing Campaigns</h1>
          <p className="text-muted-foreground">Create and manage promotional campaigns, flash sales, and targeted offers.</p>
        </div>
        <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" />New Campaign</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Active", value: campaignStats.activeCampaigns, icon: Zap, color: "text-green-600" },
          { label: "Total Budget", value: `MWK ${(campaignStats.totalBudget / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-blue-600" },
          { label: "Spent", value: `MWK ${(campaignStats.totalSpent / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-amber-600" },
          { label: "Revenue", value: `MWK ${(campaignStats.totalRevenue / 1000000).toFixed(1)}M`, icon: TrendingUp, color: "text-emerald-600" },
          { label: "Avg Conv. Rate", value: `${campaignStats.avgConversionRate}%`, icon: Target, color: "text-purple-600" },
          { label: "Avg ROI", value: `${campaignStats.avgROI}x`, icon: BarChart3, color: "text-primary" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <s.icon className={`h-5 w-5 mb-1 ${s.color}`} />
              <span className="text-xl font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search campaigns..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {["Draft", "Scheduled", "Active", "Paused", "Ended"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {allTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget Used</TableHead>
                  <TableHead>CTR</TableHead>
                  <TableHead>Conv.</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => {
                  const Icon = typeIcons[c.type] || Megaphone;
                  return (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{c.name}</div>
                            <div className="text-xs text-muted-foreground">{c.startDate || "Not set"} → {c.endDate || "Not set"}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{c.type}</Badge></TableCell>
                      <TableCell><Badge className={statusColors[c.status]}>{c.status}</Badge></TableCell>
                      <TableCell>
                        <div className="w-20">
                          <Progress value={c.budget > 0 ? (c.spent / c.budget) * 100 : 0} className="h-2" />
                          <span className="text-xs text-muted-foreground">{c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{ctr(c)}%</TableCell>
                      <TableCell>{convRate(c)}%</TableCell>
                      <TableCell>MWK {c.revenue.toLocaleString()}</TableCell>
                      <TableCell className={Number(roi(c)) > 0 ? "text-green-600" : "text-muted-foreground"}>{roi(c)}%</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => setDetail(c)}><Eye className="h-4 w-4" /></Button>
                          {(c.status === "Active" || c.status === "Paused" || c.status === "Scheduled") && (
                            <Button size="icon" variant="ghost" onClick={() => toggleStatus(c.id)}>
                              {c.status === "Active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{detail?.name}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">{detail.description}</p>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Type:</span> {detail.type}</div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={statusColors[detail.status]}>{detail.status}</Badge></div>
                <div><span className="text-muted-foreground">Target:</span> {detail.targetSegment}</div>
                <div><span className="text-muted-foreground">Created:</span> {detail.createdAt}</div>
                <div><span className="text-muted-foreground">Period:</span> {detail.startDate || "—"} → {detail.endDate || "—"}</div>
                <div><span className="text-muted-foreground">Budget:</span> MWK {detail.budget.toLocaleString()}</div>
                {detail.discountValue && <div><span className="text-muted-foreground">Discount:</span> {detail.discountType === "percentage" ? `${detail.discountValue}%` : `MWK ${detail.discountValue.toLocaleString()}`}</div>}
              </div>
              <div className="border-t pt-2 grid grid-cols-3 gap-2 text-center">
                <div><span className="text-lg font-bold">{detail.impressions.toLocaleString()}</span><br /><span className="text-xs text-muted-foreground">Impressions</span></div>
                <div><span className="text-lg font-bold">{detail.clicks.toLocaleString()}</span><br /><span className="text-xs text-muted-foreground">Clicks</span></div>
                <div><span className="text-lg font-bold">{detail.conversions.toLocaleString()}</span><br /><span className="text-xs text-muted-foreground">Conversions</span></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Create Campaign</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Campaign Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as CampaignType }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{allTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Target Segment</Label>
                <Select value={form.targetSegment} onValueChange={v => setForm(f => ({ ...f, targetSegment: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["All Customers", "New Users", "Returning Customers", "High Value", "Inactive 30d", "VIP Members"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Start Date</Label><Input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></div>
              <div><Label>End Date</Label><Input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Budget (MWK)</Label><Input type="number" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} /></div>
              <div><Label>Discount Type</Label>
                <Select value={form.discountType} onValueChange={v => setForm(f => ({ ...f, discountType: v as "percentage" | "fixed" }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="percentage">Percentage</SelectItem><SelectItem value="fixed">Fixed Amount</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label>Discount Value</Label><Input type="number" value={form.discountValue} onChange={e => setForm(f => ({ ...f, discountValue: e.target.value }))} /></div>
            </div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={createCampaign}>Create Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
