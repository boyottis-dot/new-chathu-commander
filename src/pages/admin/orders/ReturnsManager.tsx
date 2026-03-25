import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { returnRequests, returnStats, ReturnRequest, ReturnStatus, ItemCondition } from "@/lib/mock-data-returns";
import { RotateCcw, Package, Truck, CheckCircle, XCircle, Eye, Search, ClipboardCheck, PackageCheck } from "lucide-react";

const statusColors: Record<string, string> = {
  "Requested": "bg-amber-100 text-amber-800",
  "Approved": "bg-blue-100 text-blue-800",
  "Shipped Back": "bg-indigo-100 text-indigo-800",
  "Received": "bg-purple-100 text-purple-800",
  "Inspected": "bg-cyan-100 text-cyan-800",
  "Restocked": "bg-green-100 text-green-800",
  "Refunded": "bg-emerald-100 text-emerald-800",
  "Rejected": "bg-red-100 text-red-800",
};

const allStatuses: ReturnStatus[] = ["Requested", "Approved", "Shipped Back", "Received", "Inspected", "Restocked", "Refunded", "Rejected"];
const allConditions: ItemCondition[] = ["New", "Like New", "Good", "Fair", "Damaged", "Unsellable"];

export default function ReturnsManager() {
  const [returns, setReturns] = useState<ReturnRequest[]>(returnRequests);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterReason, setFilterReason] = useState("all");
  const [detail, setDetail] = useState<ReturnRequest | null>(null);
  const [inspectItem, setInspectItem] = useState<ReturnRequest | null>(null);
  const [condition, setCondition] = useState<ItemCondition>("Good");
  const [inspectNotes, setInspectNotes] = useState("");

  const filtered = returns.filter(r => {
    const matchSearch = r.id.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase()) || r.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const matchReason = filterReason === "all" || r.reason === filterReason;
    return matchSearch && matchStatus && matchReason;
  });

  const updateStatus = (id: string, status: ReturnStatus) => {
    setReturns(prev => prev.map(r => r.id === id ? { ...r, status, ...(status === "Refunded" ? { refundIssued: true } : {}), ...(status === "Restocked" ? { restocked: true } : {}) } : r));
    toast.success(`Return ${id} updated to ${status}`);
  };

  const submitInspection = () => {
    if (!inspectItem) return;
    setReturns(prev => prev.map(r => r.id === inspectItem.id ? { ...r, status: "Inspected" as ReturnStatus, condition, adminNotes: inspectNotes, dateInspected: new Date().toISOString().split("T")[0] } : r));
    toast.success(`Inspection completed for ${inspectItem.id}`);
    setInspectItem(null);
  };

  const stats = [
    { label: "Pending Approval", value: returnStats.pendingApproval, icon: RotateCcw, color: "text-amber-600" },
    { label: "In Transit", value: returnStats.inTransit, icon: Truck, color: "text-blue-600" },
    { label: "Awaiting Inspection", value: returnStats.awaitingInspection, icon: ClipboardCheck, color: "text-purple-600" },
    { label: "Restocked", value: returnStats.restocked, icon: PackageCheck, color: "text-green-600" },
    { label: "Refunded", value: returnStats.refunded, icon: CheckCircle, color: "text-emerald-600" },
    { label: "Return Rate", value: `${returnStats.returnRate}%`, icon: Package, color: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Returns & Reverse Logistics</h1>
        <p className="text-muted-foreground">Track return requests, inspections, restocking, and refund processing.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <s.icon className={`h-5 w-5 mb-1 ${s.color}`} />
              <span className="text-xl font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search returns..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {allStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterReason} onValueChange={setFilterReason}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Reason" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                {["Defective", "Wrong Item", "Not as Described", "Changed Mind", "Damaged in Transit", "Size/Fit Issue"].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell className="text-muted-foreground">{r.orderId}</TableCell>
                    <TableCell>{r.customer}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{r.product}</TableCell>
                    <TableCell><Badge variant="outline">{r.reason}</Badge></TableCell>
                    <TableCell>MWK {r.amount.toLocaleString()}</TableCell>
                    <TableCell><Badge className={statusColors[r.status]}>{r.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => setDetail(r)}><Eye className="h-4 w-4" /></Button>
                        {r.status === "Requested" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "Approved")}>Approve</Button>
                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => updateStatus(r.id, "Rejected")}><XCircle className="h-4 w-4" /></Button>
                          </>
                        )}
                        {r.status === "Approved" && <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "Shipped Back")}>Mark Shipped</Button>}
                        {r.status === "Shipped Back" && <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "Received")}>Mark Received</Button>}
                        {r.status === "Received" && <Button size="sm" variant="outline" onClick={() => { setInspectItem(r); setCondition("Good"); setInspectNotes(""); }}>Inspect</Button>}
                        {r.status === "Inspected" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "Restocked")}>Restock</Button>
                            <Button size="sm" variant="default" onClick={() => updateStatus(r.id, "Refunded")}>Refund</Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Return {detail?.id}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Order:</span> {detail.orderId}</div>
                <div><span className="text-muted-foreground">Customer:</span> {detail.customer}</div>
                <div><span className="text-muted-foreground">Vendor:</span> {detail.vendor}</div>
                <div><span className="text-muted-foreground">Product:</span> {detail.product}</div>
                <div><span className="text-muted-foreground">Qty:</span> {detail.quantity}</div>
                <div><span className="text-muted-foreground">Amount:</span> MWK {detail.amount.toLocaleString()}</div>
                <div><span className="text-muted-foreground">Reason:</span> {detail.reason}</div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={statusColors[detail.status]}>{detail.status}</Badge></div>
                {detail.condition && <div><span className="text-muted-foreground">Condition:</span> {detail.condition}</div>}
                {detail.returnTrackingNumber && <div><span className="text-muted-foreground">Tracking:</span> {detail.returnTrackingNumber}</div>}
              </div>
              <div className="border-t pt-2">
                <p className="text-muted-foreground text-xs mb-1">Timeline</p>
                <div className="space-y-1 text-xs">
                  <div>Requested: {detail.dateRequested}</div>
                  {detail.dateApproved && <div>Approved: {detail.dateApproved}</div>}
                  {detail.dateReceived && <div>Received: {detail.dateReceived}</div>}
                  {detail.dateInspected && <div>Inspected: {detail.dateInspected}</div>}
                </div>
              </div>
              {detail.customerNotes && <div className="border-t pt-2"><p className="text-muted-foreground text-xs">Customer Notes</p><p>{detail.customerNotes}</p></div>}
              {detail.adminNotes && <div className="border-t pt-2"><p className="text-muted-foreground text-xs">Admin Notes</p><p>{detail.adminNotes}</p></div>}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Inspection Dialog */}
      <Dialog open={!!inspectItem} onOpenChange={() => setInspectItem(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Inspect Return {inspectItem?.id}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Item Condition</label>
              <Select value={condition} onValueChange={v => setCondition(v as ItemCondition)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {allConditions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Inspection Notes</label>
              <Textarea value={inspectNotes} onChange={e => setInspectNotes(e.target.value)} placeholder="Describe item condition, packaging state..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInspectItem(null)}>Cancel</Button>
            <Button onClick={submitInspection}>Complete Inspection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
