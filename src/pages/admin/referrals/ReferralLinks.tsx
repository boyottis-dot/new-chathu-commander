import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { referralLinks, ReferralLink, referralPrograms } from "@/lib/mock-data-referrals";
import { Plus, Link2, Copy, Search, ExternalLink, Users, ShoppingBag, Megaphone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, React.ElementType> = { customer: Users, vendor: ShoppingBag, campaign: Megaphone };

export default function ReferralLinks() {
  const [links, setLinks] = useState<ReferralLink[]>(referralLinks);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [form, setForm] = useState({ programId: "", assignedTo: "", assignedType: "customer" as ReferralLink["assignedType"], customCode: "" });
  const [bulkForm, setBulkForm] = useState({ programId: "", prefix: "", count: "10" });

  const filtered = links.filter(l => l.code.toLowerCase().includes(search.toLowerCase()) || l.assignedTo.toLowerCase().includes(search.toLowerCase()));
  const totalClicks = links.reduce((s, l) => s + l.clicks, 0);
  const totalConversions = links.reduce((s, l) => s + l.conversions, 0);

  const createLink = () => {
    if (!form.assignedTo.trim()) return;
    const code = form.customCode.trim() || `${form.assignedTo.replace(/\s/g, "-").toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const program = referralPrograms.find(p => p.id === form.programId);
    setLinks(prev => [...prev, {
      id: `RL-${String(prev.length + 1).padStart(3, "0")}`,
      code,
      programId: form.programId,
      programName: program?.name || "Unknown",
      assignedTo: form.assignedTo,
      assignedType: form.assignedType,
      clicks: 0, signups: 0, conversions: 0, revenue: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      active: true,
    }]);
    setForm({ programId: "", assignedTo: "", assignedType: "customer", customCode: "" });
    setShowCreate(false);
    toast.success("Referral link created");
  };

  const bulkGenerate = () => {
    const count = Number(bulkForm.count) || 10;
    const program = referralPrograms.find(p => p.id === bulkForm.programId);
    const newLinks = Array.from({ length: count }, (_, i) => ({
      id: `RL-${String(links.length + i + 1).padStart(3, "0")}`,
      code: `${bulkForm.prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      programId: bulkForm.programId,
      programName: program?.name || "Unknown",
      assignedTo: `Campaign Batch ${links.length + i + 1}`,
      assignedType: "campaign" as const,
      clicks: 0, signups: 0, conversions: 0, revenue: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      active: true,
    }));
    setLinks(prev => [...prev, ...newLinks]);
    setShowBulk(false);
    toast.success(`${count} referral links generated`);
  };

  const copyLink = (code: string) => {
    navigator.clipboard.writeText(`https://chathu.mw/ref/${code}`);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Referral Links</h1>
          <p className="text-muted-foreground text-sm mt-1">Generate and track custom referral links</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1.5 border-border" onClick={() => setShowBulk(true)}>Bulk Generate</Button>
          <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowCreate(true)}>
            <Plus className="h-3.5 w-3.5" /> Create Link
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Total Links</p><p className="text-2xl font-bold text-foreground">{links.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Total Clicks</p><p className="text-2xl font-bold text-foreground">{totalClicks.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Conversions</p><p className="text-2xl font-bold text-emerald-400">{totalConversions}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Conversion Rate</p><p className="text-2xl font-bold text-primary">{totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : 0}%</p></CardContent></Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by code or name..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Code</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Clicks</TableHead>
                <TableHead className="text-center">Signups</TableHead>
                <TableHead className="text-center">Conversions</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(link => {
                const TIcon = typeIcons[link.assignedType];
                return (
                  <TableRow key={link.id} className={cn("border-border", !link.active && "opacity-50")}>
                    <TableCell><span className="font-mono text-xs text-primary">{link.code}</span></TableCell>
                    <TableCell className="text-muted-foreground text-xs">{link.programName}</TableCell>
                    <TableCell className="text-foreground text-xs">{link.assignedTo}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] border-border gap-1"><TIcon className="h-2.5 w-2.5" />{link.assignedType}</Badge></TableCell>
                    <TableCell className="text-center tabular-nums">{link.clicks}</TableCell>
                    <TableCell className="text-center tabular-nums">{link.signups}</TableCell>
                    <TableCell className="text-center tabular-nums text-emerald-400">{link.conversions}</TableCell>
                    <TableCell className="text-foreground tabular-nums">MWK {link.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyLink(link.code)}><Copy className="h-3.5 w-3.5" /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Link Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Create Referral Link</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Program</Label>
              <Select value={form.programId} onValueChange={v => setForm(p => ({ ...p, programId: v }))}>
                <SelectTrigger className="bg-secondary border-border h-9"><SelectValue placeholder="Select program" /></SelectTrigger>
                <SelectContent>{referralPrograms.filter(p => p.active).map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Assigned To</Label><Input value={form.assignedTo} onChange={e => setForm(p => ({ ...p, assignedTo: e.target.value }))} className="bg-secondary border-border h-9" placeholder="Name" /></div>
              <div className="space-y-1">
                <Label className="text-xs">Type</Label>
                <Select value={form.assignedType} onValueChange={(v: any) => setForm(p => ({ ...p, assignedType: v }))}>
                  <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="customer">Customer</SelectItem><SelectItem value="vendor">Vendor</SelectItem><SelectItem value="campaign">Campaign</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1"><Label className="text-xs">Custom Code (optional)</Label><Input value={form.customCode} onChange={e => setForm(p => ({ ...p, customCode: e.target.value }))} className="bg-secondary border-border h-9" placeholder="Leave blank to auto-generate" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={createLink}>Create Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Generate Dialog */}
      <Dialog open={showBulk} onOpenChange={setShowBulk}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Bulk Generate Links</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Program</Label>
              <Select value={bulkForm.programId} onValueChange={v => setBulkForm(p => ({ ...p, programId: v }))}>
                <SelectTrigger className="bg-secondary border-border h-9"><SelectValue placeholder="Select program" /></SelectTrigger>
                <SelectContent>{referralPrograms.filter(p => p.active).map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Code Prefix</Label><Input value={bulkForm.prefix} onChange={e => setBulkForm(p => ({ ...p, prefix: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. SPRING" /></div>
              <div className="space-y-1"><Label className="text-xs">Count</Label><Input type="number" value={bulkForm.count} onChange={e => setBulkForm(p => ({ ...p, count: e.target.value }))} className="bg-secondary border-border h-9" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowBulk(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={bulkGenerate}>Generate {bulkForm.count} Links</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
