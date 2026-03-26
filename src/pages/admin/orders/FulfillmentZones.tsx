import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MapPin, Plus, Pencil, Truck, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fulfillmentZones, zonePerformance, type FulfillmentZone } from "@/lib/mock-data-zones";

export default function FulfillmentZones() {
  const { toast } = useToast();
  const [zones, setZones] = useState(fulfillmentZones);
  const [editZone, setEditZone] = useState<FulfillmentZone | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [regionFilter, setRegionFilter] = useState("all");

  const totalOrders = zones.reduce((s, z) => s + z.ordersThisMonth, 0);
  const activeZones = zones.filter(z => z.isActive).length;

  const openCreate = () => {
    setEditZone({ id: `z${Date.now()}`, name: "", region: "Central", cities: [], deliveryETA: "", flatRate: 0, perKmRate: 0, isActive: true, couriers: [], ordersThisMonth: 0, avgDeliveryTime: "N/A" });
    setDialogOpen(true);
  };

  const openEdit = (z: FulfillmentZone) => { setEditZone({ ...z }); setDialogOpen(true); };

  const saveZone = () => {
    if (!editZone?.name) return;
    setZones(prev => {
      const exists = prev.find(z => z.id === editZone.id);
      return exists ? prev.map(z => z.id === editZone.id ? editZone : z) : [...prev, editZone];
    });
    setDialogOpen(false);
    toast({ title: "Zone saved", description: `${editZone.name} has been updated.` });
  };

  const toggleZone = (id: string) => setZones(prev => prev.map(z => z.id === id ? { ...z, isActive: !z.isActive } : z));

  const filtered = regionFilter === "all" ? zones : zones.filter(z => z.region === regionFilter);
  const regions = [...new Set(zones.map(z => z.region))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fulfillment Zones</h1>
          <p className="text-muted-foreground">Manage delivery zones, pricing, and ETAs by region</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" />Create Zone</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><MapPin className="h-8 w-8 text-primary" /><div><p className="text-xs text-muted-foreground">Total Zones</p><p className="text-xl font-bold text-foreground">{zones.length}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Truck className="h-8 w-8 text-primary" /><div><p className="text-xs text-muted-foreground">Active Zones</p><p className="text-xl font-bold text-primary">{activeZones}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><DollarSign className="h-8 w-8 text-primary" /><div><p className="text-xs text-muted-foreground">Orders This Month</p><p className="text-xl font-bold text-foreground">{totalOrders.toLocaleString()}</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Clock className="h-8 w-8 text-primary" /><div><p className="text-xs text-muted-foreground">Regions Covered</p><p className="text-xl font-bold text-foreground">{regions.length}</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg">Delivery Performance by Zone</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zonePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
              <XAxis dataKey="zone" stroke="hsl(0,0%,55%)" tick={{ fontSize: 11 }} />
              <YAxis stroke="hsl(0,0%,55%)" />
              <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,20%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
              <Bar dataKey="onTime" fill="hsl(72,85%,71%)" name="On Time %" radius={[4,4,0,0]} stackId="a" />
              <Bar dataKey="late" fill="hsl(38,92%,50%)" name="Late %" radius={[0,0,0,0]} stackId="a" />
              <Bar dataKey="failed" fill="hsl(0,72%,51%)" name="Failed %" radius={[0,0,4,4]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg">All Zones</CardTitle>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Zone</TableHead><TableHead>Region</TableHead><TableHead>Cities</TableHead><TableHead>ETA</TableHead><TableHead>Flat Rate</TableHead><TableHead>Per Km</TableHead><TableHead>Couriers</TableHead><TableHead>Orders</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(z => (
                <TableRow key={z.id}>
                  <TableCell className="font-medium text-foreground">{z.name}</TableCell>
                  <TableCell><Badge variant="outline">{z.region}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-[150px] truncate">{z.cities.join(", ")}</TableCell>
                  <TableCell>{z.deliveryETA}</TableCell>
                  <TableCell>MK {z.flatRate.toLocaleString()}</TableCell>
                  <TableCell>MK {z.perKmRate}</TableCell>
                  <TableCell className="text-xs">{z.couriers.length > 0 ? z.couriers.join(", ") : "—"}</TableCell>
                  <TableCell>{z.ordersThisMonth.toLocaleString()}</TableCell>
                  <TableCell>
                    <Switch checked={z.isActive} onCheckedChange={() => toggleZone(z.id)} />
                  </TableCell>
                  <TableCell><Button size="sm" variant="ghost" onClick={() => openEdit(z)}><Pencil className="h-3 w-3" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editZone?.ordersThisMonth === 0 && !fulfillmentZones.find(z => z.id === editZone?.id) ? "Create" : "Edit"} Fulfillment Zone</DialogTitle></DialogHeader>
          {editZone && (
            <div className="space-y-4">
              <div><Label>Zone Name</Label><Input value={editZone.name} onChange={e => setEditZone({ ...editZone, name: e.target.value })} /></div>
              <div><Label>Region</Label>
                <Select value={editZone.region} onValueChange={v => setEditZone({ ...editZone, region: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Central">Central</SelectItem><SelectItem value="Southern">Southern</SelectItem><SelectItem value="Northern">Northern</SelectItem><SelectItem value="Eastern">Eastern</SelectItem><SelectItem value="Cross-border">Cross-border</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label>Cities (comma-separated)</Label><Input value={editZone.cities.join(", ")} onChange={e => setEditZone({ ...editZone, cities: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Delivery ETA</Label><Input value={editZone.deliveryETA} onChange={e => setEditZone({ ...editZone, deliveryETA: e.target.value })} placeholder="e.g. 1-2 hours" /></div>
                <div><Label>Flat Rate (MK)</Label><Input type="number" value={editZone.flatRate} onChange={e => setEditZone({ ...editZone, flatRate: Number(e.target.value) })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Per Km Rate (MK)</Label><Input type="number" value={editZone.perKmRate} onChange={e => setEditZone({ ...editZone, perKmRate: Number(e.target.value) })} /></div>
                <div><Label>Couriers (comma-separated)</Label><Input value={editZone.couriers.join(", ")} onChange={e => setEditZone({ ...editZone, couriers: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} /></div>
              </div>
              <div className="flex items-center gap-2"><Switch checked={editZone.isActive} onCheckedChange={v => setEditZone({ ...editZone, isActive: v })} /><Label>Active</Label></div>
              <Button className="w-full" onClick={saveZone}>Save Zone</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
