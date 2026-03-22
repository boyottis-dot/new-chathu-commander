import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { allOrders, Order, orderStatusOptions } from "@/lib/mock-data-orders";
import { Search, Eye, Edit, Flag, MessageSquare, Phone, Send } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Processing: "bg-blue-500/20 text-blue-400",
  Shipped: "bg-purple-500/20 text-purple-400",
  Delivered: "bg-emerald-500/20 text-emerald-400",
  Cancelled: "bg-zinc-500/20 text-zinc-400",
  Refunded: "bg-red-500/20 text-red-400",
};

const AllOrders = () => {
  const [orders, setOrders] = useState<Order[]>(allOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [statusEdit, setStatusEdit] = useState<{ order: Order; newStatus: string } | null>(null);

  // Contact dialog state
  const [contactDialog, setContactDialog] = useState<{ type: "vendor" | "customer"; order: Order } | null>(null);
  const [contactMessage, setContactMessage] = useState("");

  const vendors = [...new Set(allOrders.map(o => o.vendor))];

  const filtered = orders.filter(o => {
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (locationFilter !== "all" && o.location !== locationFilter) return false;
    if (vendorFilter !== "all" && o.vendor !== vendorFilter) return false;
    return true;
  });

  const updateStatus = () => {
    if (!statusEdit) return;
    setOrders(prev => prev.map(o => o.id === statusEdit.order.id ? { ...o, status: statusEdit.newStatus as any } : o));
    setStatusEdit(null);
    toast.success("Order status updated");
  };

  const flagOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, flagged: !o.flagged } : o));
    toast.success("Order flag toggled");
  };

  const openContact = (type: "vendor" | "customer", order: Order) => {
    const prefill = `Regarding Order ${order.id}:\nProduct: ${order.product}\nAmount: MWK ${order.amount.toLocaleString()}\nStatus: ${order.status}\n\n`;
    setContactMessage(prefill);
    setContactDialog({ type, order });
  };

  const sendContact = () => {
    if (!contactDialog) return;
    toast.success(`Message sent to ${contactDialog.type === "vendor" ? contactDialog.order.vendor : contactDialog.order.customer}`);
    setContactDialog(null);
    setContactMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">All Orders</h1>
        <p className="text-muted-foreground">{filtered.length} orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["Pending", "Processing", "Shipped", "Delivered"] as const).map(s => (
          <Card key={s} className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">{s}</p>
              <p className="text-2xl font-bold text-foreground">{orders.filter(o => o.status === s).length}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by order ID or customer..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Status</SelectItem>{orderStatusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40 bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Locations</SelectItem><SelectItem value="LOCAL">Local</SelectItem><SelectItem value="INTERNATIONAL">International</SelectItem></SelectContent>
              </Select>
              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger className="w-44 bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Vendors</SelectItem>{vendors.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Del. Fee</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 25).map(o => (
                <TableRow key={o.id} className={`border-border ${o.flagged ? "bg-destructive/5" : ""}`}>
                  <TableCell className="font-medium text-foreground">{o.id}</TableCell>
                  <TableCell className="text-foreground">{o.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{o.vendor}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[120px] truncate">{o.product}</TableCell>
                  <TableCell className="text-foreground">MWK {o.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">MWK {o.deliveryFee.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{o.paymentMethod}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{o.location}</Badge></TableCell>
                  <TableCell><Badge className={statusColors[o.status]}>{o.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-xs">{o.date}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setDetailOrder(o)} title="View"><Eye className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setStatusEdit({ order: o, newStatus: o.status })} title="Edit status"><Edit className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => openContact("vendor", o)} title="Contact vendor"><Phone className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => flagOrder(o.id)} className={o.flagged ? "text-destructive" : ""} title="Flag"><Flag className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!detailOrder} onOpenChange={() => setDetailOrder(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle className="text-foreground">Order {detailOrder?.id}</DialogTitle></DialogHeader>
          {detailOrder && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Customer:</span> <span className="text-foreground">{detailOrder.customer}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{detailOrder.customerEmail}</span></div>
                <div><span className="text-muted-foreground">Vendor:</span> <span className="text-foreground">{detailOrder.vendor}</span></div>
                <div><span className="text-muted-foreground">Product:</span> <span className="text-foreground">{detailOrder.product}</span></div>
                <div><span className="text-muted-foreground">Qty:</span> <span className="text-foreground">{detailOrder.quantity}</span></div>
                <div><span className="text-muted-foreground">Amount:</span> <span className="text-foreground">MWK {detailOrder.amount.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Del. Fee:</span> <span className="text-foreground">MWK {detailOrder.deliveryFee.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Payment:</span> <span className="text-foreground">{detailOrder.paymentMethod}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={statusColors[detailOrder.status]}>{detailOrder.status}</Badge></div>
                <div><span className="text-muted-foreground">Mode:</span> <Badge variant="secondary">{detailOrder.location}</Badge></div>
                <div><span className="text-muted-foreground">Address:</span> <span className="text-foreground">{detailOrder.address}, {detailOrder.city}, {detailOrder.country}</span></div>
                <div><span className="text-muted-foreground">Tracking:</span> <span className="text-foreground">{detailOrder.trackingNumber || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Est. Delivery:</span> <span className="text-foreground">{detailOrder.estimatedDelivery}</span></div>
                <div><span className="text-muted-foreground">Delivered:</span> <span className="text-foreground">{detailOrder.actualDelivery || "—"}</span></div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="border-border" onClick={() => openContact("customer", detailOrder)}>
                  <MessageSquare className="h-4 w-4 mr-1" /> Contact Customer
                </Button>
                <Button size="sm" variant="outline" className="border-border" onClick={() => openContact("vendor", detailOrder)}>
                  <Phone className="h-4 w-4 mr-1" /> Contact Vendor
                </Button>
              </div>
            </div>
          )}
          <DialogFooter><Button variant="ghost" onClick={() => setDetailOrder(null)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={!!statusEdit} onOpenChange={() => setStatusEdit(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Update Order Status</DialogTitle></DialogHeader>
          {statusEdit && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Order: <span className="text-foreground">{statusEdit.order.id}</span></p>
              <Select value={statusEdit.newStatus} onValueChange={v => setStatusEdit({ ...statusEdit, newStatus: v })}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>{orderStatusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setStatusEdit(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={updateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={!!contactDialog} onOpenChange={() => setContactDialog(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Contact {contactDialog?.type === "vendor" ? contactDialog.order.vendor : contactDialog?.order.customer}
            </DialogTitle>
          </DialogHeader>
          {contactDialog && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{contactDialog.type === "vendor" ? contactDialog.order.vendor : contactDialog.order.customer}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{contactDialog.type === "vendor" ? `${contactDialog.order.vendor.toLowerCase().replace(/\s/g, "")}@vendor.mw` : contactDialog.order.customerEmail}</span></div>
                <div><span className="text-muted-foreground">Order:</span> <span className="text-foreground">{contactDialog.order.id}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={statusColors[contactDialog.order.status]}>{contactDialog.order.status}</Badge></div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Subject</Label>
                <Input defaultValue={`Order ${contactDialog.order.id} — Issue`} className="bg-secondary border-border h-9" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Message</Label>
                <Textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} className="bg-secondary border-border min-h-[120px]" />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Send className="h-3 w-3" /> Message will be sent via email and in-app notification
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setContactDialog(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground gap-1.5" onClick={sendContact}>
              <Send className="h-3.5 w-3.5" /> Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllOrders;
