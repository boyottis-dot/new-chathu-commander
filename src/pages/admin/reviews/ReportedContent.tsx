import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { reportedContent as initialReports, ReportedContent as ReportType, ReportStatus } from "@/lib/mock-data-reviews";
import { Search, Shield, XCircle, AlertTriangle, Ban, Trash2 } from "lucide-react";

const statusColors: Record<ReportStatus, string> = {
  open: "bg-yellow-500/20 text-yellow-400",
  dismissed: "bg-muted text-muted-foreground",
  actioned: "bg-green-500/20 text-green-400",
};

const typeColors: Record<string, string> = {
  review: "bg-blue-500/20 text-blue-400",
  post: "bg-purple-500/20 text-purple-400",
  product: "bg-orange-500/20 text-orange-400",
  comment: "bg-cyan-500/20 text-cyan-400",
};

export default function ReportedContentPage() {
  const [reports, setReports] = useState<ReportType[]>(initialReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionDialog, setActionDialog] = useState<ReportType | null>(null);

  const filtered = reports.filter((r) => {
    const matchesSearch = r.contentPreview.toLowerCase().includes(search.toLowerCase()) || r.reportedUser.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (id: string, action: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: action === "dismiss" ? "dismissed" as ReportStatus : "actioned" as ReportStatus } : r)));
    setActionDialog(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reported Content</h1>
        <p className="text-muted-foreground">Review and act on user-reported content</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-yellow-400">{reports.filter((r) => r.status === "open").length}</p><p className="text-xs text-muted-foreground">Open Reports</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-400">{reports.filter((r) => r.status === "actioned").length}</p><p className="text-xs text-muted-foreground">Actioned</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-muted-foreground">{reports.filter((r) => r.status === "dismissed").length}</p><p className="text-xs text-muted-foreground">Dismissed</p></CardContent></Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search content or user..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
        <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="open">Open</SelectItem><SelectItem value="actioned">Actioned</SelectItem><SelectItem value="dismissed">Dismissed</SelectItem></SelectContent></Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Type</TableHead><TableHead>Content</TableHead><TableHead>Reported User</TableHead><TableHead className="hidden md:table-cell">Reported By</TableHead><TableHead className="hidden md:table-cell">Reason</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell><Badge className={typeColors[r.type]}>{r.type}</Badge></TableCell>
                  <TableCell className="max-w-[200px] truncate text-foreground">{r.contentPreview}</TableCell>
                  <TableCell className="font-medium text-foreground">{r.reportedUser}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{r.reportedBy}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{r.reason}</TableCell>
                  <TableCell><Badge className={statusColors[r.status]}>{r.status}</Badge></TableCell>
                  <TableCell>
                    {r.status === "open" && (
                      <Button size="sm" variant="outline" onClick={() => setActionDialog(r)} className="gap-1"><Shield className="h-3 w-3" />Act</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={!!actionDialog} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Take Action — {actionDialog?.id}</DialogTitle><DialogDescription>Choose how to handle this reported content</DialogDescription></DialogHeader>
          {actionDialog && (
            <div className="space-y-3 text-sm">
              <div><p className="text-muted-foreground">Content</p><p className="text-foreground">{actionDialog.contentPreview}</p></div>
              <div><p className="text-muted-foreground">Reported User</p><p className="font-medium text-foreground">{actionDialog.reportedUser}</p></div>
              <div><p className="text-muted-foreground">Reason</p><p className="text-foreground">{actionDialog.reason}</p></div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => handleAction(actionDialog!.id, "dismiss")} className="gap-2"><XCircle className="h-4 w-4" />Dismiss</Button>
            <Button variant="outline" className="gap-2 text-orange-400" onClick={() => handleAction(actionDialog!.id, "remove")}><Trash2 className="h-4 w-4" />Remove Content</Button>
            <Button variant="outline" className="gap-2 text-yellow-400" onClick={() => handleAction(actionDialog!.id, "warn")}><AlertTriangle className="h-4 w-4" />Warn User</Button>
            <Button variant="destructive" className="gap-2" onClick={() => handleAction(actionDialog!.id, "suspend")}><Ban className="h-4 w-4" />Suspend User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
