import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Search, AlertTriangle, Package, TrendingDown, ArrowUpDown, Plus, Eye, RefreshCw, Download, Filter } from "lucide-react";
import { inventoryItems, stockMovements, restockRequests, type InventoryItem, type RestockRequest } from "@/lib/mock-data-inventory";

const statusColors: Record<string, string> = {
  "In Stock": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Low Stock": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Out of Stock": "bg-red-500/10 text-red-400 border-red-500/20",
  "Overstock": "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const restockStatusColors: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Approved: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Ordered: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Received: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const movementTypeColors: Record<string, string> = {
  Inbound: "text-emerald-400",
  Outbound: "text-red-400",
  Adjustment: "text-yellow-400",
  Return: "text-blue-400",
};

export default function InventoryManagement() {
  const { toast } = useToast();
  const [items, setItems] = useState(inventoryItems);
  const [requests, setRequests] = useState(restockRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selected, setSelected] = useState<InventoryItem | null>(null);
  const [restockDialog, setRestockDialog] = useState(false);
  const [restockForm, setRestockForm] = useState({ productId: "", quantity: "50" });

  const lowStock = items.filter(i => i.status === "Low Stock").length;
  const outOfStock = items.filter(i => i.status === "Out of Stock").length;
  const totalValue = items.reduce((s, i) => s + i.currentStock * i.unitCost, 0);

  const filtered = items.filter(i => {
    const matchSearch = i.productName.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    const matchLocation = locationFilter === "all" || i.location === locationFilter;
    return matchSearch && matchStatus && matchLocation;
  });

  const createRestockRequest = () => {
    const item = items.find(i => i.id === restockForm.productId);
    if (!item) return;
    const newReq: RestockRequest = {
      id: `RST-${(requests.length + 1).toString().padStart(3, "0")}`,
      productName: item.productName, sku: item.sku, vendor: item.vendor,
      quantityRequested: parseInt(restockForm.quantity), currentStock: item.currentStock,
      status: "Pending", requestedDate: "2026-03-24", expectedDate: "",
    };
    setRequests([newReq, ...requests]);
    setRestockDialog(false);
    setRestockForm({ productId: "", quantity: "50" });
    toast({ title: "Restock request created", description: `${item.productName} — ${restockForm.quantity} units` });
  };

  const updateRestockStatus = (id: string, status: RestockRequest["status"]) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    toast({ title: `Request ${id} updated to ${status}` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground text-sm">Track stock levels, movements, and restock requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Export</Button>
          <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => setRestockDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />Restock Request
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border"><CardContent className="p-4">
          <div className="flex items-center gap-3"><Package className="w-8 h-8 text-primary" /><div>
            <p className="text-2xl font-bold">{items.length}</p><p className="text-xs text-muted-foreground">Total Products</p>
          </div></div>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-4">
          <div className="flex items-center gap-3"><AlertTriangle className="w-8 h-8 text-yellow-400" /><div>
            <p className="text-2xl font-bold">{lowStock}</p><p className="text-xs text-muted-foreground">Low Stock</p>
          </div></div>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-4">
          <div className="flex items-center gap-3"><TrendingDown className="w-8 h-8 text-red-400" /><div>
            <p className="text-2xl font-bold">{outOfStock}</p><p className="text-xs text-muted-foreground">Out of Stock</p>
          </div></div>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-4">
          <div className="flex items-center gap-3"><ArrowUpDown className="w-8 h-8 text-emerald-400" /><div>
            <p className="text-2xl font-bold">MWK {(totalValue / 1e6).toFixed(1)}M</p><p className="text-xs text-muted-foreground">Total Value</p>
          </div></div>
        </CardContent></Card>
      </div>

      <Tabs defaultValue="stock">
        <TabsList className="bg-secondary">
          <TabsTrigger value="stock">Stock Levels</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          <TabsTrigger value="restock">Restock Queue ({requests.filter(r => r.status === "Pending" || r.status === "Approved").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search by name or SKU..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" /></div>
                <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[160px] bg-secondary border-border"><Filter className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem>{["In Stock","Low Stock","Out of Stock","Overstock"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}><SelectTrigger className="w-[180px] bg-secondary border-border"><SelectValue placeholder="Location" /></SelectTrigger><SelectContent><SelectItem value="all">All Locations</SelectItem>{["Lilongwe Warehouse","Blantyre Hub","Mzuzu Storage","Zomba Depot"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <Table>
              <TableHeader><TableRow className="border-border">
                <TableHead>Product</TableHead><TableHead>SKU</TableHead><TableHead>Stock</TableHead><TableHead>Level</TableHead><TableHead>Location</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filtered.map(item => (
                  <TableRow key={item.id} className="border-border">
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono">{item.sku}</TableCell>
                    <TableCell>{item.currentStock} / {item.maxStock}</TableCell>
                    <TableCell><div className="w-20"><Progress value={(item.currentStock / item.maxStock) * 100} className="h-2" /></div></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.location}</TableCell>
                    <TableCell><Badge variant="outline" className={statusColors[item.status]}>{item.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelected(item)}><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setRestockForm({ productId: item.id, quantity: "50" }); setRestockDialog(true); }}><RefreshCw className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="movements">
          <Card className="border-border">
            <CardHeader><CardTitle className="text-lg">Recent Stock Movements</CardTitle><CardDescription>Track all inventory changes</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow className="border-border">
                  <TableHead>Date</TableHead><TableHead>Product</TableHead><TableHead>Type</TableHead><TableHead>Qty</TableHead><TableHead>Reference</TableHead><TableHead>Note</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {stockMovements.map(m => (
                    <TableRow key={m.id} className="border-border">
                      <TableCell className="text-sm">{m.date}</TableCell>
                      <TableCell className="font-medium">{m.productName}</TableCell>
                      <TableCell><Badge variant="outline" className={movementTypeColors[m.type]}>{m.type}</Badge></TableCell>
                      <TableCell className={m.quantity > 0 ? "text-emerald-400 font-medium" : "text-red-400 font-medium"}>{m.quantity > 0 ? `+${m.quantity}` : m.quantity}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{m.reference}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{m.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restock">
          <Card className="border-border">
            <CardHeader><CardTitle className="text-lg">Restock Requests</CardTitle><CardDescription>Manage pending and active restock orders</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow className="border-border">
                  <TableHead>ID</TableHead><TableHead>Product</TableHead><TableHead>Vendor</TableHead><TableHead>Qty</TableHead><TableHead>Current</TableHead><TableHead>Status</TableHead><TableHead>Requested</TableHead><TableHead>Actions</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {requests.map(r => (
                    <TableRow key={r.id} className="border-border">
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell className="font-medium">{r.productName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.vendor}</TableCell>
                      <TableCell>{r.quantityRequested}</TableCell>
                      <TableCell className={r.currentStock === 0 ? "text-red-400" : "text-yellow-400"}>{r.currentStock}</TableCell>
                      <TableCell><Badge variant="outline" className={restockStatusColors[r.status]}>{r.status}</Badge></TableCell>
                      <TableCell className="text-sm">{r.requestedDate}</TableCell>
                      <TableCell>
                        {r.status === "Pending" && <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => updateRestockStatus(r.id, "Approved")}>Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs text-red-400" onClick={() => updateRestockStatus(r.id, "Cancelled")}>Cancel</Button>
                        </div>}
                        {r.status === "Approved" && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => updateRestockStatus(r.id, "Ordered")}>Mark Ordered</Button>}
                        {r.status === "Ordered" && <Button size="sm" variant="outline" className="h-7 text-xs text-emerald-400" onClick={() => updateRestockStatus(r.id, "Received")}>Mark Received</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader><DialogTitle>{selected?.productName}</DialogTitle><DialogDescription>{selected?.sku} • {selected?.vendor}</DialogDescription></DialogHeader>
          {selected && <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Current Stock</p><p className="text-xl font-bold">{selected.currentStock}</p></div>
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Reorder Level</p><p className="text-xl font-bold">{selected.reorderLevel}</p></div>
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Unit Cost</p><p className="text-xl font-bold">MWK {selected.unitCost.toLocaleString()}</p></div>
              <div className="bg-secondary rounded-lg p-3"><p className="text-xs text-muted-foreground">Total Value</p><p className="text-xl font-bold">MWK {(selected.currentStock * selected.unitCost).toLocaleString()}</p></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Location</span><span>{selected.location}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Category</span><span>{selected.category}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Last Restocked</span><span>{selected.lastRestocked}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><Badge variant="outline" className={statusColors[selected.status]}>{selected.status}</Badge></div>
            </div>
            <div><p className="text-xs text-muted-foreground mb-1">Stock Level</p><Progress value={(selected.currentStock / selected.maxStock) * 100} className="h-3" /><p className="text-xs text-muted-foreground mt-1">{selected.currentStock} / {selected.maxStock} units</p></div>
          </div>}
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={restockDialog} onOpenChange={setRestockDialog}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader><DialogTitle>Create Restock Request</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Product</Label>
              <Select value={restockForm.productId} onValueChange={v => setRestockForm(f => ({ ...f, productId: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select product" /></SelectTrigger>
                <SelectContent>{items.filter(i => i.status !== "In Stock" && i.status !== "Overstock").map(i => <SelectItem key={i.id} value={i.id}>{i.productName} ({i.currentStock} left)</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" value={restockForm.quantity} onChange={e => setRestockForm(f => ({ ...f, quantity: e.target.value }))} className="bg-secondary border-border" />
            </div>
          </div>
          <DialogFooter><Button onClick={createRestockRequest} className="bg-primary text-primary-foreground">Submit Request</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
