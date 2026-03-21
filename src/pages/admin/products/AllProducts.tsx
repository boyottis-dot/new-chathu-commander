import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allProducts, productCategories, productCollections, Product, ProductStatus } from "@/lib/mock-data-products";
import { Search, Edit, Star, StarOff, Power, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const statusColors: Record<ProductStatus, string> = {
  Approved: "bg-emerald-500/20 text-emerald-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Rejected: "bg-red-500/20 text-red-400",
  Deactivated: "bg-zinc-500/20 text-zinc-400",
};

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const vendors = [...new Set(allProducts.map(p => p.vendor))];

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (vendorFilter !== "all" && p.vendor !== vendorFilter) return false;
    if (stockFilter === "out" && p.stock > 0) return false;
    if (stockFilter === "low" && (p.stock === 0 || p.stock > 10)) return false;
    return true;
  });

  const toggleFeatured = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
    toast.success("Featured status updated");
  };

  const toggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === "Deactivated" ? "Approved" as ProductStatus : "Deactivated" as ProductStatus } : p));
    toast.success("Product status updated");
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">All Products</h1>
        <p className="text-muted-foreground">{filtered.length} of {products.length} products</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 bg-secondary border-border"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="Approved">Approved</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Rejected">Rejected</SelectItem><SelectItem value="Deactivated">Deactivated</SelectItem></SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-36 bg-secondary border-border"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Categories</SelectItem>{productCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger className="w-44 bg-secondary border-border"><SelectValue placeholder="Vendor" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Vendors</SelectItem>{vendors.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-36 bg-secondary border-border"><SelectValue placeholder="Stock" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Stock</SelectItem><SelectItem value="out">Out of Stock</SelectItem><SelectItem value="low">Low Stock (≤10)</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Product</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-xs text-muted-foreground">IMG</div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-foreground">{p.name}</p>
                          {p.featured && <Star className="h-3 w-3 text-primary fill-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{p.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.vendor}</TableCell>
                  <TableCell><Badge variant="secondary">{p.category}</Badge></TableCell>
                  <TableCell className="text-foreground">MWK {p.price.toLocaleString()}</TableCell>
                  <TableCell><span className={p.stock === 0 ? "text-destructive" : p.stock <= 10 ? "text-yellow-400" : "text-foreground"}>{p.stock}</span></TableCell>
                  <TableCell className="text-foreground">{p.rating > 0 ? `${p.rating} ★ (${p.reviewCount})` : "—"}</TableCell>
                  <TableCell className="text-foreground">{p.unitsSold}</TableCell>
                  <TableCell><Badge className={statusColors[p.status]}>{p.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setEditProduct(p)}><Eye className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => toggleFeatured(p.id)}>{p.featured ? <StarOff className="h-4 w-4 text-primary" /> : <Star className="h-4 w-4" />}</Button>
                      <Button size="icon" variant="ghost" onClick={() => toggleStatus(p.id)}><Power className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle className="text-foreground">{editProduct?.name}</DialogTitle></DialogHeader>
          {editProduct && (
            <div className="space-y-3 text-sm">
              <div className="w-full h-32 bg-secondary rounded flex items-center justify-center text-muted-foreground">Product Images</div>
              <p className="text-muted-foreground">{editProduct.description}</p>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Price:</span> <span className="text-foreground">MWK {editProduct.price.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Stock:</span> <span className="text-foreground">{editProduct.stock}</span></div>
                <div><span className="text-muted-foreground">Vendor:</span> <span className="text-foreground">{editProduct.vendor}</span></div>
                <div><span className="text-muted-foreground">Category:</span> <span className="text-foreground">{editProduct.category}</span></div>
                <div><span className="text-muted-foreground">Collection:</span> <span className="text-foreground">{editProduct.collection || "—"}</span></div>
                <div><span className="text-muted-foreground">Rating:</span> <span className="text-foreground">{editProduct.rating} ★ ({editProduct.reviewCount})</span></div>
                <div><span className="text-muted-foreground">Units Sold:</span> <span className="text-foreground">{editProduct.unitsSold}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={statusColors[editProduct.status]}>{editProduct.status}</Badge></div>
              </div>
            </div>
          )}
          <DialogFooter><Button variant="ghost" onClick={() => setEditProduct(null)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
