import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Truck, Globe, MapPin, Zap, Search, TestTube, ExternalLink } from "lucide-react";
import { couriers, Courier } from "@/lib/mock-data-referrals";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  inactive: "bg-zinc-500/20 text-zinc-400",
  error: "bg-red-500/20 text-red-400",
};

const typeColors: Record<string, string> = {
  local: "text-blue-400 border-blue-400/30",
  international: "text-purple-400 border-purple-400/30",
  both: "text-primary border-primary/30",
};

export default function CourierNetworks() {
  const [courierList, setCourierList] = useState<Courier[]>(couriers);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editCourier, setEditCourier] = useState<Courier | null>(null);

  const [form, setForm] = useState({ name: "", type: "local" as Courier["type"], apiEndpoint: "", trackingUrlPattern: "", coverageAreas: "", contactEmail: "" });

  const filtered = courierList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const activeCouriers = courierList.filter(c => c.status === "active").length;
  const totalShipments = courierList.reduce((s, c) => s + c.totalShipments, 0);

  const createCourier = () => {
    if (!form.name.trim()) return;
    setCourierList(prev => [...prev, {
      id: `CR-${String(prev.length + 1).padStart(3, "0")}`,
      name: form.name,
      type: form.type,
      apiEndpoint: form.apiEndpoint,
      trackingUrlPattern: form.trackingUrlPattern,
      status: "inactive",
      coverageAreas: form.coverageAreas.split(",").map(s => s.trim()).filter(Boolean),
      contactEmail: form.contactEmail,
      avgDeliveryDays: 5,
      totalShipments: 0,
    }]);
    setForm({ name: "", type: "local", apiEndpoint: "", trackingUrlPattern: "", coverageAreas: "", contactEmail: "" });
    setShowCreate(false);
    toast.success("Courier added");
  };

  const toggleStatus = (id: string) => {
    setCourierList(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c));
    toast.success("Courier status updated");
  };

  const deleteCourier = (id: string) => {
    setCourierList(prev => prev.filter(c => c.id !== id));
    toast.success("Courier removed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Courier Networks</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage delivery courier partners and API connections</p>
        </div>
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowCreate(true)}>
          <Plus className="h-3.5 w-3.5" /> Add Courier
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Total Couriers</p><p className="text-2xl font-bold text-foreground">{courierList.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Active</p><p className="text-2xl font-bold text-emerald-400">{activeCouriers}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Local Partners</p><p className="text-2xl font-bold text-foreground">{courierList.filter(c => c.type === "local").length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Total Shipments</p><p className="text-2xl font-bold text-foreground">{totalShipments.toLocaleString()}</p></CardContent></Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search couriers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(courier => (
          <Card key={courier.id} className="bg-card border-border">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{courier.name}</p>
                    <p className="text-[10px] text-muted-foreground">{courier.contactEmail}</p>
                  </div>
                </div>
                <Switch checked={courier.status === "active"} onCheckedChange={() => toggleStatus(courier.id)} />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={statusColors[courier.status]}>{courier.status}</Badge>
                <Badge variant="outline" className={cn("text-[10px]", typeColors[courier.type])}>{courier.type}</Badge>
                <span className="text-[10px] text-muted-foreground">Avg {courier.avgDeliveryDays}d</span>
              </div>

              <div className="text-[10px] text-muted-foreground">
                <p>Coverage: {courier.coverageAreas.join(", ")}</p>
                <p className="mt-1 font-mono truncate">API: {courier.apiEndpoint}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-muted-foreground tabular-nums">{courier.totalShipments.toLocaleString()} shipments</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success("Testing API connection...")}><TestTube className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditCourier(courier)}><Pencil className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteCourier(courier.id)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader><DialogTitle>Add Courier Partner</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1"><Label className="text-xs">Courier Name</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. DHL Express" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Type</Label>
                <Select value={form.type} onValueChange={(v: any) => setForm(p => ({ ...p, type: v }))}>
                  <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="local">Local</SelectItem><SelectItem value="international">International</SelectItem><SelectItem value="both">Both</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label className="text-xs">Contact Email</Label><Input value={form.contactEmail} onChange={e => setForm(p => ({ ...p, contactEmail: e.target.value }))} className="bg-secondary border-border h-9" placeholder="ops@courier.com" /></div>
            </div>
            <div className="space-y-1"><Label className="text-xs">API Endpoint</Label><Input value={form.apiEndpoint} onChange={e => setForm(p => ({ ...p, apiEndpoint: e.target.value }))} className="bg-secondary border-border h-9" placeholder="https://api.courier.com/v1" /></div>
            <div className="space-y-1"><Label className="text-xs">Tracking URL Pattern</Label><Input value={form.trackingUrlPattern} onChange={e => setForm(p => ({ ...p, trackingUrlPattern: e.target.value }))} className="bg-secondary border-border h-9" placeholder="https://courier.com/track/{tracking}" /></div>
            <div className="space-y-1"><Label className="text-xs">Coverage Areas (comma-separated)</Label><Input value={form.coverageAreas} onChange={e => setForm(p => ({ ...p, coverageAreas: e.target.value }))} className="bg-secondary border-border h-9" placeholder="Lilongwe, Blantyre, Mzuzu" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={createCourier}>Add Courier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editCourier} onOpenChange={() => setEditCourier(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader><DialogTitle>Edit {editCourier?.name}</DialogTitle></DialogHeader>
          {editCourier && (
            <div className="space-y-3">
              <div className="space-y-1"><Label className="text-xs">API Endpoint</Label><Input defaultValue={editCourier.apiEndpoint} className="bg-secondary border-border h-9" /></div>
              <div className="space-y-1"><Label className="text-xs">Tracking URL Pattern</Label><Input defaultValue={editCourier.trackingUrlPattern} className="bg-secondary border-border h-9" /></div>
              <div className="space-y-1"><Label className="text-xs">Contact Email</Label><Input defaultValue={editCourier.contactEmail} className="bg-secondary border-border h-9" /></div>
              <div className="space-y-1"><Label className="text-xs">Coverage Areas</Label><Input defaultValue={editCourier.coverageAreas.join(", ")} className="bg-secondary border-border h-9" /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditCourier(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { setEditCourier(null); toast.success("Courier updated"); }}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
