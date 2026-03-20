import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Eye, Ban, Trash2, Bell, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { customers, Customer } from "@/lib/mock-data-customers";
import { useToast } from "@/hooks/use-toast";

const statusColor = (s: Customer["status"]) =>
  s === "Active" ? "bg-emerald-500/20 text-emerald-400" :
  s === "Suspended" ? "bg-red-500/20 text-red-400" :
  "bg-yellow-500/20 text-yellow-400";

export default function AllCustomers() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [locFilter, setLocFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detail, setDetail] = useState<Customer | null>(null);

  const locations = [...new Set(customers.map(c => c.location))];

  const filtered = customers.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (locFilter !== "all" && c.location !== locFilter) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Customers</h1>
        <p className="text-muted-foreground text-sm">{customers.length} registered customers</p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
            </div>
            <div className="flex gap-2">
              <Select value={locFilter} onValueChange={setLocFilter}>
                <SelectTrigger className="w-[160px] bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Locations</SelectItem>{locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Suspended">Suspended</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Customer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Total Spend</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-primary/20"><AvatarFallback className="bg-primary/20 text-primary text-xs">{c.avatar}</AvatarFallback></Avatar>
                        <div><p className="font-medium text-sm">{c.name}</p><p className="text-xs text-muted-foreground">{c.email}</p></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{c.location}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.joinDate}</TableCell>
                    <TableCell className="text-right text-sm">{c.totalOrders}</TableCell>
                    <TableCell className="text-right text-sm font-medium">MWK {c.totalSpend.toLocaleString()}</TableCell>
                    <TableCell><Badge variant="outline" className={statusColor(c.status)}>{c.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setDetail(c)}><Eye className="w-4 h-4 mr-2" />View Profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast({ title: `Notification sent to ${c.name}` })}><Bell className="w-4 h-4 mr-2" />Send Notification</DropdownMenuItem>
                          {c.status === "Active" && <DropdownMenuItem onClick={() => toast({ title: `${c.name} suspended` })}><Ban className="w-4 h-4 mr-2" />Suspend</DropdownMenuItem>}
                          <DropdownMenuItem className="text-destructive" onClick={() => toast({ title: `${c.name} deleted` })}><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
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

      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle>Customer Profile</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 bg-primary/20"><AvatarFallback className="bg-primary/20 text-primary text-lg">{detail.avatar}</AvatarFallback></Avatar>
                <div><h3 className="font-semibold text-lg">{detail.name}</h3><p className="text-sm text-muted-foreground">{detail.email}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Location</p><p className="font-medium">{detail.location}</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Joined</p><p className="font-medium">{detail.joinDate}</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Total Orders</p><p className="font-medium">{detail.totalOrders}</p></div>
                <div className="bg-secondary rounded-lg p-3"><p className="text-muted-foreground">Total Spend</p><p className="font-medium">MWK {detail.totalSpend.toLocaleString()}</p></div>
              </div>
              <div><p className="text-xs text-muted-foreground mb-2">Segments</p><div className="flex gap-2 flex-wrap">{detail.segment.map(s => <Badge key={s} variant="outline" className="border-primary/40 text-primary">{s}</Badge>)}</div></div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setDetail(null)}>Close</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
