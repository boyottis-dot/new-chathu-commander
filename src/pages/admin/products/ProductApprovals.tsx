import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { pendingProducts, Product } from "@/lib/mock-data-products";
import { CheckCircle, XCircle, MessageSquare, Eye, Search } from "lucide-react";
import { toast } from "sonner";

const ProductApprovals = () => {
  const [products, setProducts] = useState<Product[]>(pendingProducts);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [rejectDialog, setRejectDialog] = useState<Product | null>(null);
  const [feedbackDialog, setFeedbackDialog] = useState<Product | null>(null);
  const [reason, setReason] = useState("");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.vendor.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(p => p.id)));
  };

  const approve = (ids: string[]) => {
    setProducts(prev => prev.filter(p => !ids.includes(p.id)));
    setSelected(new Set());
    toast.success(`${ids.length} product(s) approved`);
  };

  const reject = () => {
    if (!rejectDialog) return;
    setProducts(prev => prev.filter(p => p.id !== rejectDialog.id));
    setRejectDialog(null);
    setReason("");
    toast.success("Product rejected, vendor notified");
  };

  const requestChanges = () => {
    if (!feedbackDialog) return;
    setFeedbackDialog(null);
    setReason("");
    toast.success("Feedback sent to vendor");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Product Approval Queue</h1>
        <p className="text-muted-foreground">{products.length} products awaiting review</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products or vendors..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
            </div>
            {selected.size > 0 && (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => approve(Array.from(selected))} className="bg-primary text-primary-foreground">
                  <CheckCircle className="h-4 w-4 mr-1" /> Bulk Approve ({selected.size})
                </Button>
                <Button size="sm" variant="destructive" onClick={() => { setProducts(prev => prev.filter(p => !selected.has(p.id))); setSelected(new Set()); toast.success("Products rejected"); }}>
                  <XCircle className="h-4 w-4 mr-1" /> Bulk Reject
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="w-10"><Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id} className="border-border">
                  <TableCell><Checkbox checked={selected.has(p.id)} onCheckedChange={() => toggleSelect(p.id)} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-xs text-muted-foreground">IMG</div>
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.vendor}</TableCell>
                  <TableCell className="text-foreground">MWK {p.price.toLocaleString()}</TableCell>
                  <TableCell className="text-foreground">{p.stock}</TableCell>
                  <TableCell className="text-muted-foreground">{p.variants.length > 0 ? p.variants.map(v => `${v.name}: ${v.options.length}`).join(", ") : "None"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.dateSubmitted}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setDetailProduct(p)}><Eye className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-primary hover:text-primary" onClick={() => approve([p.id])}><CheckCircle className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setRejectDialog(p)}><XCircle className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setFeedbackDialog(p)}><MessageSquare className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No pending products</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!detailProduct} onOpenChange={() => setDetailProduct(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle className="text-foreground">{detailProduct?.name}</DialogTitle></DialogHeader>
          {detailProduct && (
            <div className="space-y-3 text-sm">
              <div className="w-full h-40 bg-secondary rounded flex items-center justify-center text-muted-foreground">Product Images</div>
              <p className="text-muted-foreground">{detailProduct.description}</p>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Price:</span> <span className="text-foreground">MWK {detailProduct.price.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Stock:</span> <span className="text-foreground">{detailProduct.stock}</span></div>
                <div><span className="text-muted-foreground">Vendor:</span> <span className="text-foreground">{detailProduct.vendor}</span></div>
                <div><span className="text-muted-foreground">Category:</span> <span className="text-foreground">{detailProduct.category}</span></div>
              </div>
              {detailProduct.variants.length > 0 && (
                <div>
                  <p className="text-muted-foreground mb-1">Variants:</p>
                  {detailProduct.variants.map(v => (
                    <div key={v.name} className="flex gap-2 flex-wrap">
                      <span className="text-foreground">{v.name}:</span>
                      {v.options.map(o => <Badge key={o} variant="secondary">{o}</Badge>)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setDetailProduct(null)}>Close</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { approve([detailProduct!.id]); setDetailProduct(null); }}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectDialog} onOpenChange={() => setRejectDialog(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Reject Product</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Rejecting: <span className="text-foreground">{rejectDialog?.name}</span></p>
          <Textarea placeholder="Reason for rejection (sent to vendor)..." value={reason} onChange={e => setReason(e.target.value)} className="bg-secondary border-border" />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRejectDialog(null)}>Cancel</Button>
            <Button variant="destructive" onClick={reject}>Reject & Notify Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Changes Dialog */}
      <Dialog open={!!feedbackDialog} onOpenChange={() => setFeedbackDialog(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Request Changes</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Product: <span className="text-foreground">{feedbackDialog?.name}</span></p>
          <Textarea placeholder="Describe the changes needed..." value={reason} onChange={e => setReason(e.target.value)} className="bg-secondary border-border" />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setFeedbackDialog(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={requestChanges}>Send Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductApprovals;
