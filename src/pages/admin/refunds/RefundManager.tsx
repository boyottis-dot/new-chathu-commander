import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { refundRequests as initialRefunds, refundStats, RefundRequest, RefundStatus } from "@/lib/mock-data-refunds";
import { Search, CheckCircle, XCircle, AlertTriangle, DollarSign, TrendingUp, Clock, BarChart3 } from "lucide-react";

const statusColors: Record<RefundStatus, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  approved: "bg-green-500/20 text-green-400",
  rejected: "bg-destructive/20 text-destructive",
  escalated: "bg-orange-500/20 text-orange-400",
};

const reasonLabels: Record<string, string> = {
  defective: "Defective Product",
  wrong_item: "Wrong Item",
  not_received: "Not Received",
  changed_mind: "Changed Mind",
  other: "Other",
};

export default function RefundManager() {
  const [refunds, setRefunds] = useState<RefundRequest[]>(initialRefunds);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null);

  const filtered = refunds.filter((r) => {
    const matchesSearch = r.customerName.toLowerCase().includes(search.toLowerCase()) || r.orderId.toLowerCase().includes(search.toLowerCase()) || r.vendorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, status: RefundStatus) => {
    setRefunds((prev) => prev.map((r) => (r.id === id ? { ...r, status, resolvedAt: status !== "pending" ? new Date().toISOString().split("T")[0] : undefined } : r)));
    setSelectedRefund(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Refund Manager</h1>
        <p className="text-muted-foreground">Review and process customer refund requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><DollarSign className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold text-foreground">${refundStats.totalAmount}</p><p className="text-xs text-muted-foreground">Total Refunded (Month)</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><BarChart3 className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold text-foreground">{refundStats.totalThisMonth}</p><p className="text-xs text-muted-foreground">Requests This Month</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><TrendingUp className="h-8 w-8 text-destructive" /><div><p className="text-2xl font-bold text-foreground">{refundStats.refundRate}%</p><p className="text-xs text-muted-foreground">Refund Rate</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Clock className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold text-foreground">{refundStats.avgResolutionDays}d</p><p className="text-xs text-muted-foreground">Avg Resolution</p></div></CardContent></Card>
      </div>

      {/* Top Vendors by Refund Rate */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Top Vendors by Refund Rate</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {refundStats.topVendorsByRefundRate.map((v) => (
              <div key={v.vendor} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{v.vendor}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-destructive" style={{ width: `${Math.min(v.rate * 10, 100)}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-16 text-right">{v.rate}% ({v.count})</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by customer, order, vendor..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
        <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="rejected">Rejected</SelectItem><SelectItem value="escalated">Escalated</SelectItem></SelectContent></Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Customer</TableHead><TableHead>Vendor</TableHead><TableHead>Product</TableHead><TableHead>Reason</TableHead><TableHead className="text-right">Refund</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell><div><p className="font-medium text-foreground">{r.customerName}</p><p className="text-xs text-muted-foreground">{r.orderId}</p></div></TableCell>
                  <TableCell className="text-muted-foreground">{r.vendorName}</TableCell>
                  <TableCell className="text-muted-foreground">{r.productName}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{reasonLabels[r.reason]}</Badge></TableCell>
                  <TableCell className="text-right font-medium text-foreground">${r.refundAmount}<p className="text-xs text-muted-foreground">excl. ${r.deliveryFee} delivery</p></TableCell>
                  <TableCell><Badge className={statusColors[r.status]}>{r.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setSelectedRefund(r)}><Search className="h-3 w-3" /></Button>
                      {r.status === "pending" && (
                        <>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-green-400" onClick={() => updateStatus(r.id, "approved")}><CheckCircle className="h-3 w-3" /></Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => updateStatus(r.id, "rejected")}><XCircle className="h-3 w-3" /></Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-orange-400" onClick={() => updateStatus(r.id, "escalated")}><AlertTriangle className="h-3 w-3" /></Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRefund} onOpenChange={() => setSelectedRefund(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Refund Request — {selectedRefund?.id}</DialogTitle><DialogDescription>Full details for this refund request</DialogDescription></DialogHeader>
          {selectedRefund && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-muted-foreground">Customer</p><p className="font-medium text-foreground">{selectedRefund.customerName}</p></div>
                <div><p className="text-muted-foreground">Email</p><p className="font-medium text-foreground">{selectedRefund.customerEmail}</p></div>
                <div><p className="text-muted-foreground">Order</p><p className="font-medium text-foreground">{selectedRefund.orderId}</p></div>
                <div><p className="text-muted-foreground">Vendor</p><p className="font-medium text-foreground">{selectedRefund.vendorName}</p></div>
                <div><p className="text-muted-foreground">Product</p><p className="font-medium text-foreground">{selectedRefund.productName}</p></div>
                <div><p className="text-muted-foreground">Reason</p><p className="font-medium text-foreground">{reasonLabels[selectedRefund.reason]}</p></div>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-muted-foreground mb-1">Description</p>
                <p className="text-foreground">{selectedRefund.description}</p>
              </div>
              <div className="border-t border-border pt-3 grid grid-cols-3 gap-3">
                <div><p className="text-muted-foreground">Order Total</p><p className="font-bold text-foreground">${selectedRefund.orderTotal}</p></div>
                <div><p className="text-muted-foreground">Delivery Fee</p><p className="font-bold text-destructive">-${selectedRefund.deliveryFee}</p></div>
                <div><p className="text-muted-foreground">Refund Amount</p><p className="font-bold text-primary">${selectedRefund.refundAmount}</p></div>
              </div>
              <p className="text-xs text-muted-foreground italic">⚠ Delivery fees are never included in refunds per platform policy.</p>
            </div>
          )}
          {selectedRefund?.status === "pending" && (
            <DialogFooter>
              <Button variant="outline" onClick={() => updateStatus(selectedRefund.id, "escalated")} className="text-orange-400">Escalate</Button>
              <Button variant="destructive" onClick={() => updateStatus(selectedRefund.id, "rejected")}>Reject</Button>
              <Button onClick={() => updateStatus(selectedRefund.id, "approved")}>Approve Refund</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
