import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { influencers as initialInf, type Influencer } from "@/lib/mock-data-team";
import { Search, Plus, MoreHorizontal, Eye, Pencil, UserPlus, Crown, TrendingUp, DollarSign } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const tierColors: Record<string, string> = { bronze: "bg-orange-500/20 text-orange-400", silver: "bg-zinc-400/20 text-zinc-300", gold: "bg-yellow-500/20 text-yellow-400", platinum: "bg-purple-500/20 text-purple-300" };
const statusColors: Record<string, string> = { active: "bg-green-500/20 text-green-400", pending: "bg-amber-500/20 text-amber-400", paused: "bg-muted text-muted-foreground", terminated: "bg-red-500/20 text-red-400" };
const fmt = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : `${n}`;

export default function InfluencerNetwork() {
  const [infs, setInfs] = useState<Influencer[]>(initialInf);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [viewInf, setViewInf] = useState<Influencer | null>(null);
  const [newInf, setNewInf] = useState({ name: "", email: "", platform: "Instagram", handle: "", followers: "", commission: "10", location: "", niche: "" });

  const filtered = infs.filter(i => {
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.handle.toLowerCase().includes(search.toLowerCase())) return false;
    if (tierFilter !== "all" && i.tier !== tierFilter) return false;
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    return true;
  });

  const totalSales = infs.reduce((s, i) => s + i.totalSales, 0);
  const totalFollowers = infs.reduce((s, i) => s + i.followers, 0);

  const handleAdd = () => {
    if (!newInf.name || !newInf.email) { toast({ title: "Required fields missing", variant: "destructive" }); return; }
    setInfs(prev => [{ id: `inf-${Date.now()}`, name: newInf.name, email: newInf.email, platform: newInf.platform, handle: newInf.handle, followers: parseInt(newInf.followers) || 0, engagementRate: 0, status: "pending", totalCampaigns: 0, totalSales: 0, commission: parseInt(newInf.commission) || 10, joinDate: new Date().toISOString().split("T")[0], tier: "bronze", location: newInf.location, niche: newInf.niche }, ...prev]);
    setShowAdd(false);
    setNewInf({ name: "", email: "", platform: "Instagram", handle: "", followers: "", commission: "10", location: "", niche: "" });
    toast({ title: "Influencer added" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Influencer Network</h1><p className="text-muted-foreground">Manage influencer partnerships, commissions, and performance</p></div>
        <Button size="sm" onClick={() => setShowAdd(true)}><UserPlus className="h-4 w-4 mr-1" />Add Influencer</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Influencers</p><p className="text-2xl font-bold">{infs.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Reach</p><p className="text-2xl font-bold">{fmt(totalFollowers)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Sales Generated</p><p className="text-2xl font-bold">MWK {fmt(totalSales)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Active Campaigns</p><p className="text-2xl font-bold">{infs.reduce((s, i) => s + i.totalCampaigns, 0)}</p></CardContent></Card>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search influencers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
          <Select value={tierFilter} onValueChange={setTierFilter}><SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Tiers</SelectItem><SelectItem value="platinum">Platinum</SelectItem><SelectItem value="gold">Gold</SelectItem><SelectItem value="silver">Silver</SelectItem><SelectItem value="bronze">Bronze</SelectItem></SelectContent></Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="paused">Paused</SelectItem></SelectContent></Select>
        </div>
      </CardContent></Card>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Influencer</TableHead><TableHead>Platform</TableHead><TableHead>Followers</TableHead><TableHead>Engagement</TableHead><TableHead>Tier</TableHead><TableHead>Sales</TableHead><TableHead>Commission</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map(inf => (
              <TableRow key={inf.id}>
                <TableCell><div><p className="font-medium text-sm">{inf.name}</p><p className="text-xs text-muted-foreground">{inf.niche}</p></div></TableCell>
                <TableCell><div><p className="text-sm">{inf.platform}</p><p className="text-xs text-muted-foreground">{inf.handle}</p></div></TableCell>
                <TableCell className="text-sm">{fmt(inf.followers)}</TableCell>
                <TableCell className="text-sm">{inf.engagementRate}%</TableCell>
                <TableCell><Badge className={tierColors[inf.tier]} variant="secondary"><Crown className="h-3 w-3 mr-1" />{inf.tier}</Badge></TableCell>
                <TableCell className="text-sm">MWK {fmt(inf.totalSales)}</TableCell>
                <TableCell className="text-sm">{inf.commission}%</TableCell>
                <TableCell><Badge className={statusColors[inf.status]} variant="secondary">{inf.status}</Badge></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setViewInf(inf)}><Eye className="h-3 w-3 mr-2" />View Profile</DropdownMenuItem>
                      <DropdownMenuItem><Pencil className="h-3 w-3 mr-2" />Edit</DropdownMenuItem>
                      <DropdownMenuItem><DollarSign className="h-3 w-3 mr-2" />Adjust Commission</DropdownMenuItem>
                      <DropdownMenuItem><TrendingUp className="h-3 w-3 mr-2" />Upgrade Tier</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>

      <Dialog open={!!viewInf} onOpenChange={() => setViewInf(null)}>
        <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Influencer Profile</DialogTitle></DialogHeader>
          {viewInf && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">{viewInf.name.split(" ").map(n=>n[0]).join("")}</div>
                <div><h3 className="font-semibold text-lg">{viewInf.name}</h3><p className="text-sm text-muted-foreground">{viewInf.handle} · {viewInf.platform}</p><Badge className={tierColors[viewInf.tier]} variant="secondary"><Crown className="h-3 w-3 mr-1" />{viewInf.tier}</Badge></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">Followers</p><p className="font-medium">{fmt(viewInf.followers)}</p></div>
                <div><p className="text-muted-foreground">Engagement Rate</p><p className="font-medium">{viewInf.engagementRate}%</p></div>
                <div><p className="text-muted-foreground">Total Sales</p><p className="font-medium">MWK {fmt(viewInf.totalSales)}</p></div>
                <div><p className="text-muted-foreground">Campaigns</p><p className="font-medium">{viewInf.totalCampaigns}</p></div>
                <div><p className="text-muted-foreground">Commission</p><p className="font-medium">{viewInf.commission}%</p></div>
                <div><p className="text-muted-foreground">Location</p><p className="font-medium">{viewInf.location}</p></div>
                <div><p className="text-muted-foreground">Niche</p><p className="font-medium">{viewInf.niche}</p></div>
                <div><p className="text-muted-foreground">Joined</p><p className="font-medium">{viewInf.joinDate}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent><DialogHeader><DialogTitle>Add Influencer</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3"><div><Label>Name *</Label><Input value={newInf.name} onChange={e => setNewInf(p => ({ ...p, name: e.target.value }))} /></div><div><Label>Email *</Label><Input value={newInf.email} onChange={e => setNewInf(p => ({ ...p, email: e.target.value }))} /></div></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Platform</Label><Select value={newInf.platform} onValueChange={v => setNewInf(p => ({ ...p, platform: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Instagram">Instagram</SelectItem><SelectItem value="TikTok">TikTok</SelectItem><SelectItem value="YouTube">YouTube</SelectItem><SelectItem value="Facebook">Facebook</SelectItem><SelectItem value="Twitter">Twitter</SelectItem></SelectContent></Select></div>
              <div><Label>Handle</Label><Input value={newInf.handle} onChange={e => setNewInf(p => ({ ...p, handle: e.target.value }))} placeholder="@handle" /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Followers</Label><Input type="number" value={newInf.followers} onChange={e => setNewInf(p => ({ ...p, followers: e.target.value }))} /></div>
              <div><Label>Commission %</Label><Input type="number" value={newInf.commission} onChange={e => setNewInf(p => ({ ...p, commission: e.target.value }))} /></div>
              <div><Label>Location</Label><Input value={newInf.location} onChange={e => setNewInf(p => ({ ...p, location: e.target.value }))} /></div>
            </div>
            <div><Label>Niche</Label><Input value={newInf.niche} onChange={e => setNewInf(p => ({ ...p, niche: e.target.value }))} placeholder="Fashion, Tech, Food..." /></div>
          </div>
          <DialogFooter><Button onClick={handleAdd}>Add Influencer</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
