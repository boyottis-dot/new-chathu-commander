import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allOrders, Order, deliveryStatusOptions } from "@/lib/mock-data-orders";
import { couriers } from "@/lib/mock-data-referrals";
import { Truck, Globe, MapPin, AlertTriangle, CheckCircle, Search, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const deliveryColors: Record<string, string> = {
  "Awaiting Pickup": "bg-zinc-500/20 text-zinc-400",
  "Packed": "bg-blue-500/20 text-blue-400",
  "Dispatched": "bg-purple-500/20 text-purple-400",
  "In Transit": "bg-yellow-500/20 text-yellow-400",
  "Out for Delivery": "bg-orange-500/20 text-orange-400",
  "Delivered": "bg-emerald-500/20 text-emerald-400",
  "Failed": "bg-red-500/20 text-red-400",
};

const DeliveryManager = () => {
  const shippedOrders = allOrders.filter(o => !["Pending", "Cancelled", "Refunded"].includes(o.status));
  const [orders, setOrders] = useState<Order[]>(shippedOrders);
  const [search, setSearch] = useState("");
  const [trackingEdit, setTrackingEdit] = useState<{ order: Order; tracking: string } | null>(null);
  const [statusEdit, setStatusEdit] = useState<{ order: Order; newStatus: string } | null>(null);

  const localOrders = orders.filter(o => o.location === "LOCAL");
  const intlOrders = orders.filter(o => o.location === "INTERNATIONAL");
  const overdueOrders = orders.filter(o => o.flagged);

  const filterBySearch = (list: Order[]) => list.filter(o =>
    !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const updateTracking = () => {
    if (!trackingEdit) return;
    setOrders(prev => prev.map(o => o.id === trackingEdit.order.id ? { ...o, trackingNumber: trackingEdit.tracking } : o));
    setTrackingEdit(null);
    toast.success("Tracking number updated");
  };

  const updateDeliveryStatus = () => {
    if (!statusEdit) return;
    setOrders(prev => prev.map(o => o.id === statusEdit.order.id ? { ...o, deliveryStatus: statusEdit.newStatus as any, actualDelivery: statusEdit.newStatus === "Delivered" ? new Date().toISOString().split("T")[0] : o.actualDelivery } : o));
    setStatusEdit(null);
    toast.success("Delivery status updated");
  };

  const markDelivered = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, deliveryStatus: "Delivered", status: "Delivered", actualDelivery: new Date().toISOString().split("T")[0], flagged: false } : o));
    toast.success("Marked as delivered");
  };

  const renderTable = (list: Order[]) => (
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Delivery Status</TableHead>
          <TableHead>Tracking</TableHead>
          <TableHead>Est. Delivery</TableHead>
          <TableHead>Actual</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterBySearch(list).map(o => (
          <TableRow key={o.id} className={`border-border ${o.flagged ? "bg-destructive/5" : ""}`}>
            <TableCell className="font-medium text-foreground">{o.id} {o.flagged && <AlertTriangle className="inline h-3 w-3 text-destructive ml-1" />}</TableCell>
            <TableCell className="text-foreground">{o.customer}</TableCell>
            <TableCell className="text-muted-foreground">{o.city}, {o.country}</TableCell>
            <TableCell><Badge className={deliveryColors[o.deliveryStatus] || ""}>{o.deliveryStatus}</Badge></TableCell>
            <TableCell className="text-muted-foreground text-xs font-mono">{o.trackingNumber || "—"}</TableCell>
            <TableCell className="text-muted-foreground">{o.estimatedDelivery}</TableCell>
            <TableCell className="text-foreground">{o.actualDelivery || "—"}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <Button size="icon" variant="ghost" onClick={() => setStatusEdit({ order: o, newStatus: o.deliveryStatus })}><Edit className="h-4 w-4" /></Button>
                {o.location === "INTERNATIONAL" && <Button size="icon" variant="ghost" onClick={() => setTrackingEdit({ order: o, tracking: o.trackingNumber || "" })}><Truck className="h-4 w-4" /></Button>}
                {o.deliveryStatus !== "Delivered" && <Button size="icon" variant="ghost" className="text-primary hover:text-primary" onClick={() => markDelivered(o.id)}><CheckCircle className="h-4 w-4" /></Button>}
              </div>
            </TableCell>
          </TableRow>
        ))}
        {filterBySearch(list).length === 0 && (
          <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No orders found</TableCell></TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Delivery Manager</h1>
        <p className="text-muted-foreground">Track and manage all dispatched orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Total Dispatched</p><p className="text-2xl font-bold text-foreground">{orders.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm flex items-center gap-1"><MapPin className="h-3 w-3" /> Local</p><p className="text-2xl font-bold text-foreground">{localOrders.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm flex items-center gap-1"><Globe className="h-3 w-3" /> International</p><p className="text-2xl font-bold text-foreground">{intlOrders.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-destructive" /> Overdue</p><p className="text-2xl font-bold text-destructive">{overdueOrders.length}</p></CardContent></Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by order ID or customer..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-secondary">
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="local">Local ({localOrders.length})</TabsTrigger>
          <TabsTrigger value="intl">International ({intlOrders.length})</TabsTrigger>
          <TabsTrigger value="overdue" className="text-destructive">Overdue ({overdueOrders.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all"><Card className="border-border bg-card"><CardContent className="p-0">{renderTable(orders)}</CardContent></Card></TabsContent>
        <TabsContent value="local"><Card className="border-border bg-card"><CardContent className="p-0">{renderTable(localOrders)}</CardContent></Card></TabsContent>
        <TabsContent value="intl"><Card className="border-border bg-card"><CardContent className="p-0">{renderTable(intlOrders)}</CardContent></Card></TabsContent>
        <TabsContent value="overdue"><Card className="border-border bg-card"><CardContent className="p-0">{renderTable(overdueOrders)}</CardContent></Card></TabsContent>
      </Tabs>

      {/* Tracking Number Dialog */}
      <Dialog open={!!trackingEdit} onOpenChange={() => setTrackingEdit(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">DHL Tracking Number</DialogTitle></DialogHeader>
          {trackingEdit && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Order: <span className="text-foreground">{trackingEdit.order.id}</span></p>
              <Input value={trackingEdit.tracking} onChange={e => setTrackingEdit({ ...trackingEdit, tracking: e.target.value })} placeholder="Enter DHL tracking number..." className="bg-secondary border-border" />
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setTrackingEdit(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={updateTracking}>Save Tracking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Override Dialog */}
      <Dialog open={!!statusEdit} onOpenChange={() => setStatusEdit(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Override Delivery Status</DialogTitle></DialogHeader>
          {statusEdit && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Order: <span className="text-foreground">{statusEdit.order.id}</span></p>
              <Select value={statusEdit.newStatus} onValueChange={v => setStatusEdit({ ...statusEdit, newStatus: v })}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>{deliveryStatusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setStatusEdit(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={updateDeliveryStatus}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryManager;
