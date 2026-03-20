import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Eye, Ban, RotateCcw, Trash2, MoreHorizontal, Store } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { vendors, Vendor } from "@/lib/mock-data-vendors";
import { useToast } from "@/hooks/use-toast";

const statusColor = (s: Vendor["status"]) =>
  s === "Active" ? "bg-emerald-500/20 text-emerald-400" :
  s === "Suspended" ? "bg-red-500/20 text-red-400" :
  "bg-yellow-500/20 text-yellow-400";

export default function AllVendors() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [locFilter, setLocFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailVendor, setDetailVendor] = useState<Vendor | null>(null);

  const locations = [...new Set(vendors.map(v => v.location))];
  const categories = [...new Set(vendors.map(v => v.category))];

  const filtered = vendors.filter(v => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (locFilter !== "all" && v.location !== locFilter) return false;
    if (catFilter !== "all" && v.category !== catFilter) return false;
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    return true;
  });

  const action = (msg: string) => toast({ title: msg });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Vendors</h1>
          <p className="text-muted-foreground text-sm">{vendors.length} vendors on the platform</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => window.location.href = "/vendors/create"}>
          <Store className="w-4 h-4 mr-2" /> Add Vendor
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={locFilter} onValueChange={setLocFilter}>
                <SelectTrigger className="w-[140px] bg-secondary border-border"><Filter className="w-3 h-3 mr-1" /><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Locations</SelectItem>{locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={catFilter} onValueChange={setCatFilter}>
                <SelectTrigger className="w-[140px] bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Suspended">Suspended</SelectItem><SelectItem value="Pending Setup">Pending</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Vendor</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Products</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Followers</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(v => (
                  <TableRow key={v.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-primary/20"><AvatarFallback className="bg-primary/20 text-primary text-xs">{v.avatar}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium text-sm">{v.name}</p>
                          <p className="text-xs text-muted-foreground">{v.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{v.location}</TableCell>
                    <TableCell className="text-sm">{v.category}</TableCell>
                    <TableCell className="text-right text-sm">{v.totalProducts}</TableCell>
                    <TableCell className="text-right text-sm font-medium">MWK {v.totalSales.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm">{v.totalFollowers.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{v.joinDate}</TableCell>
                    <TableCell><Badge variant="outline" className={statusColor(v.status)}>{v.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setDetailVendor(v)}><Eye className="w-4 h-4 mr-2" />View Details</DropdownMenuItem>
                          {v.status === "Active" && <DropdownMenuItem onClick={() => action(`${v.name} suspended`)}><Ban className="w-4 h-4 mr-2" />Suspend</DropdownMenuItem>}
                          {v.status === "Suspended" && <DropdownMenuItem onClick={() => action(`${v.name} reactivated`)}><RotateCcw className="w-4 h-4 mr-2" />Reactivate</DropdownMenuItem>}
                          <DropdownMenuItem className="text-destructive" onClick={() => action(`${v.name} deleted`)}><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!detailVendor} onOpenChange={() => setDetailVendor(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle>Vendor Details</DialogTitle></DialogHeader>
          {detailVendor && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 bg-primary/20"><AvatarFallback className="bg-primary/20 text-primary text-lg">{detailVendor.avatar}</AvatarFallback></Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{detailVendor.name}</h3>
                  <p className="text-sm text-muted-foreground">{detailVendor.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Location</p><p className="font-medium">{detailVendor.location}</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Category</p><p className="font-medium">{detailVendor.category}</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Products</p><p className="font-medium">{detailVendor.totalProducts}</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Total Sales</p><p className="font-medium">MWK {detailVendor.totalSales.toLocaleString()}</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Followers</p><p className="font-medium">{detailVendor.totalFollowers.toLocaleString()}</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Fee Rate</p><p className="font-medium">{detailVendor.feeRate}%</p></div>
              </div>
              <div className="flex gap-2 flex-wrap text-xs">
                <Badge variant="outline" className={detailVendor.canPost ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}>{detailVendor.canPost ? "✓" : "✗"} Feed Posts</Badge>
                <Badge variant="outline" className={detailVendor.canDiscount ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}>{detailVendor.canDiscount ? "✓" : "✗"} Discounts</Badge>
                <Badge variant="outline" className={detailVendor.internationalShipping ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}>{detailVendor.internationalShipping ? "✓" : "✗"} Intl Shipping</Badge>
              </div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setDetailVendor(null)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
