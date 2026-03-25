import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { allProducts } from "@/lib/mock-data-products";
import { allOrders } from "@/lib/mock-data-orders";
import { Upload, Download, Package, ShoppingCart, FileSpreadsheet, CheckCircle, AlertTriangle } from "lucide-react";

interface ImportJob {
  id: string;
  type: "Products" | "Orders";
  fileName: string;
  totalRows: number;
  processed: number;
  errors: number;
  status: "Processing" | "Completed" | "Failed";
  date: string;
}

const mockJobs: ImportJob[] = [
  { id: "IMP-001", type: "Products", fileName: "products_march.csv", totalRows: 150, processed: 150, errors: 2, status: "Completed", date: "2026-03-20" },
  { id: "IMP-002", type: "Orders", fileName: "bulk_orders.csv", totalRows: 80, processed: 80, errors: 0, status: "Completed", date: "2026-03-18" },
  { id: "IMP-003", type: "Products", fileName: "new_electronics.csv", totalRows: 45, processed: 30, errors: 0, status: "Processing", date: "2026-03-25" },
];

export default function BulkOperations() {
  const [tab, setTab] = useState("products");
  const [jobs, setJobs] = useState<ImportJob[]>(mockJobs);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleOrder = (id: string) => {
    setSelectedOrders(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const selectAllProducts = () => {
    setSelectedProducts(prev => prev.size === allProducts.length ? new Set() : new Set(allProducts.map(p => p.id)));
  };
  const selectAllOrders = () => {
    setSelectedOrders(prev => prev.size === allOrders.length ? new Set() : new Set(allOrders.map(o => o.id)));
  };

  const exportCSV = (type: "products" | "orders") => {
    const headers = type === "products"
      ? ["ID", "Name", "Price", "Vendor", "Category", "Stock", "Status"]
      : ["ID", "Customer", "Product", "Amount", "Status", "Date"];
    const rows = type === "products"
      ? allProducts.map(p => [p.id, p.name, p.price, p.vendor, p.category, p.stock, p.status])
      : allOrders.map(o => [o.id, o.customer, o.product, o.amount, o.status, o.date]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${type}_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
    toast.success(`${type} CSV exported successfully`);
  };

  const simulateImport = () => {
    setImporting(true);
    setImportProgress(0);
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setImporting(false);
          setJobs(j => [{ id: `IMP-${String(j.length + 1).padStart(3, "0")}`, type: tab === "products" ? "Products" : "Orders", fileName: "uploaded_file.csv", totalRows: 50, processed: 50, errors: 1, status: "Completed", date: new Date().toISOString().split("T")[0] }, ...j]);
          toast.success("Import completed with 1 warning");
          setShowImport(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const applyBulkAction = () => {
    const count = tab === "products" ? selectedProducts.size : selectedOrders.size;
    if (count === 0) { toast.error("Select items first"); return; }
    if (!bulkAction) { toast.error("Choose an action"); return; }
    toast.success(`Applied "${bulkAction}" to ${count} ${tab}`);
    setSelectedProducts(new Set()); setSelectedOrders(new Set()); setBulkAction("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bulk Operations</h1>
        <p className="text-muted-foreground">Import, export, and perform bulk actions on products and orders.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex flex-col items-center"><Upload className="h-5 w-5 mb-1 text-blue-600" /><span className="text-xl font-bold">{jobs.length}</span><span className="text-xs text-muted-foreground">Total Imports</span></CardContent></Card>
        <Card><CardContent className="p-4 flex flex-col items-center"><CheckCircle className="h-5 w-5 mb-1 text-green-600" /><span className="text-xl font-bold">{jobs.filter(j => j.status === "Completed").length}</span><span className="text-xs text-muted-foreground">Completed</span></CardContent></Card>
        <Card><CardContent className="p-4 flex flex-col items-center"><AlertTriangle className="h-5 w-5 mb-1 text-amber-600" /><span className="text-xl font-bold">{jobs.reduce((s, j) => s + j.errors, 0)}</span><span className="text-xs text-muted-foreground">Total Errors</span></CardContent></Card>
        <Card><CardContent className="p-4 flex flex-col items-center"><FileSpreadsheet className="h-5 w-5 mb-1 text-muted-foreground" /><span className="text-xl font-bold">{jobs.reduce((s, j) => s + j.totalRows, 0)}</span><span className="text-xs text-muted-foreground">Rows Processed</span></CardContent></Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="products"><Package className="h-4 w-4 mr-1" />Products</TabsTrigger>
          <TabsTrigger value="orders"><ShoppingCart className="h-4 w-4 mr-1" />Orders</TabsTrigger>
          <TabsTrigger value="history"><FileSpreadsheet className="h-4 w-4 mr-1" />Import History</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <CardTitle className="text-lg">Product Bulk Actions</CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => exportCSV("products")}><Download className="h-4 w-4 mr-1" />Export CSV</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowImport(true)}><Upload className="h-4 w-4 mr-1" />Import CSV</Button>
                  <Select value={bulkAction} onValueChange={setBulkAction}>
                    <SelectTrigger className="w-[180px] h-9"><SelectValue placeholder="Bulk Action..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activate">Activate Selected</SelectItem>
                      <SelectItem value="deactivate">Deactivate Selected</SelectItem>
                      <SelectItem value="feature">Mark as Featured</SelectItem>
                      <SelectItem value="unfeature">Remove Featured</SelectItem>
                      <SelectItem value="delete">Delete Selected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={applyBulkAction} disabled={selectedProducts.size === 0}>Apply ({selectedProducts.size})</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"><Checkbox checked={selectedProducts.size === allProducts.length} onCheckedChange={selectAllProducts} /></TableHead>
                      <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allProducts.slice(0, 15).map(p => (
                      <TableRow key={p.id} className={selectedProducts.has(p.id) ? "bg-primary/5" : ""}>
                        <TableCell><Checkbox checked={selectedProducts.has(p.id)} onCheckedChange={() => toggleProduct(p.id)} /></TableCell>
                        <TableCell className="font-medium">{p.id}</TableCell>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>MWK {p.price.toLocaleString()}</TableCell>
                        <TableCell>{p.stock}</TableCell>
                        <TableCell><Badge variant="outline">{p.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <CardTitle className="text-lg">Order Bulk Actions</CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => exportCSV("orders")}><Download className="h-4 w-4 mr-1" />Export CSV</Button>
                  <Select value={bulkAction} onValueChange={setBulkAction}>
                    <SelectTrigger className="w-[180px] h-9"><SelectValue placeholder="Bulk Action..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Mark Processing</SelectItem>
                      <SelectItem value="shipped">Mark Shipped</SelectItem>
                      <SelectItem value="cancel">Cancel Selected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={applyBulkAction} disabled={selectedOrders.size === 0}>Apply ({selectedOrders.size})</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"><Checkbox checked={selectedOrders.size === allOrders.length} onCheckedChange={selectAllOrders} /></TableHead>
                      <TableHead>ID</TableHead><TableHead>Customer</TableHead><TableHead>Product</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allOrders.slice(0, 15).map(o => (
                      <TableRow key={o.id} className={selectedOrders.has(o.id) ? "bg-primary/5" : ""}>
                        <TableCell><Checkbox checked={selectedOrders.has(o.id)} onCheckedChange={() => toggleOrder(o.id)} /></TableCell>
                        <TableCell className="font-medium">{o.id}</TableCell>
                        <TableCell>{o.customer}</TableCell>
                        <TableCell className="max-w-[120px] truncate">{o.product}</TableCell>
                        <TableCell>MWK {o.amount.toLocaleString()}</TableCell>
                        <TableCell><Badge variant="outline">{o.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader><CardTitle className="text-lg">Import History</CardTitle><CardDescription>Track all CSV imports and their status.</CardDescription></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead><TableHead>Type</TableHead><TableHead>File</TableHead><TableHead>Rows</TableHead><TableHead>Errors</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map(j => (
                    <TableRow key={j.id}>
                      <TableCell className="font-medium">{j.id}</TableCell>
                      <TableCell><Badge variant="outline">{j.type}</Badge></TableCell>
                      <TableCell>{j.fileName}</TableCell>
                      <TableCell>{j.processed}/{j.totalRows}</TableCell>
                      <TableCell className={j.errors > 0 ? "text-amber-600" : "text-green-600"}>{j.errors}</TableCell>
                      <TableCell><Badge className={j.status === "Completed" ? "bg-green-100 text-green-800" : j.status === "Processing" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}>{j.status}</Badge></TableCell>
                      <TableCell>{j.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Import Dialog */}
      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent>
          <DialogHeader><DialogTitle>Import CSV</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Upload a CSV file with product data. Required columns: Name, Price, Vendor, Category, Stock.</p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={() => {}} />
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <Button variant="outline" onClick={() => fileRef.current?.click()}>Choose File</Button>
              <p className="text-xs text-muted-foreground mt-2">CSV files up to 10MB</p>
            </div>
            {importing && (
              <div>
                <Progress value={importProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Processing... {importProgress}%</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImport(false)}>Cancel</Button>
            <Button onClick={simulateImport} disabled={importing}>{importing ? "Processing..." : "Start Import"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
