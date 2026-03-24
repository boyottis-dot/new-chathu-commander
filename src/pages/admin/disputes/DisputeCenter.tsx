import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, AlertTriangle, Scale, Clock, CheckCircle, XCircle, Eye, Shield, Filter, MessageSquare } from "lucide-react";
import { disputes, disputeStatusOptions, disputeTypeOptions, disputePriorityOptions, type Dispute, type DisputeStatus } from "@/lib/mock-data-disputes";

const statusColors: Record<string, string> = {
  "Open": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Under Review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Awaiting Evidence": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Escalated": "bg-red-500/10 text-red-400 border-red-500/20",
  "Resolved": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Closed": "bg-muted text-muted-foreground border-border",
};

const priorityColors: Record<string, string> = {
  Low: "text-muted-foreground", Medium: "text-yellow-400", High: "text-orange-400", Critical: "text-red-400",
};

export default function DisputeCenter() {
  const { toast } = useToast();
  const [items, setItems] = useState(disputes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState<Dispute | null>(null);
  const [responseText, setResponseText] = useState("");

  const open = items.filter(i => !["Resolved", "Closed"].includes(i.status)).length;
  const escalated = items.filter(i => i.status === "Escalated").length;
  const resolved = items.filter(i => i.status === "Resolved").length;

  const filtered = items.filter(i => {
    const matchSearch = i.customer.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()) || i.orderId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    const matchType = typeFilter === "all" || i.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const updateStatus = (id: string, status: DisputeStatus, note: string) => {
    setItems(items.map(i => i.id === id ? {
      ...i, status,
      timeline: [...i.timeline, { id: `T-${Date.now()}`, action: status, actor: "Admin", date: new Date().toISOString().slice(0, 16).replace("T", " "), note }],
    } : i));
    setSelected(null);
    toast({ title: `Dispute ${id} — ${status}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dispute & Resolution Center</h1>
        <p className="text-muted-foreground text-sm">Mediate disputes between customers and vendors</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><Scale className="w-8 h-8 text-primary" /><div><p className="text-2xl font-bold">{items.length}</p><p className="text-xs text-muted-foreground">Total Cases</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><Clock className="w-8 h-8 text-yellow-400" /><div><p className="text-2xl font-bold">{open}</p><p className="text-xs text-muted-foreground">Open</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><AlertTriangle className="w-8 h-8 text-red-400" /><div><p className="text-2xl font-bold">{escalated}</p><p className="text-xs text-muted-foreground">Escalated</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><CheckCircle className="w-8 h-8 text-emerald-400" /><div><p className="text-2xl font-bold">{resolved}</p><p className="text-xs text-muted-foreground">Resolved</p></div></div></CardContent></Card>
      </div>

      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search by customer, ID, or order..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" /></div>
            <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[170px] bg-secondary border-border"><Filter className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem>{disputeStatusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger className="w-[170px] bg-secondary border-border"><SelectValue placeholder="Type" /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem>{disputeTypeOptions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <Table>
          <TableHeader><TableRow className="border-border">
            <TableHead>Case</TableHead><TableHead>Customer</TableHead><TableHead>Vendor</TableHead><TableHead>Type</TableHead><TableHead>Priority</TableHead><TableHead>Amount</TableHead><TableHead>SLA</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map(d => {
              const slaDate = new Date(d.slaDeadline);
              const overdue = slaDate < new Date() && !["Resolved", "Closed"].includes(d.status);
              return (
                <TableRow key={d.id} className="border-border">
                  <TableCell><div><p className="font-mono text-xs">{d.id}</p><p className="text-xs text-muted-foreground">{d.orderId}</p></div></TableCell>
                  <TableCell className="font-medium">{d.customer}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.vendor}</TableCell>
                  <TableCell className="text-sm">{d.type}</TableCell>
                  <TableCell><span className={`font-medium text-sm ${priorityColors[d.priority]}`}>{d.priority}</span></TableCell>
                  <TableCell className="font-medium">MWK {d.amount.toLocaleString()}</TableCell>
                  <TableCell><span className={`text-xs ${overdue ? "text-red-400 font-medium" : "text-muted-foreground"}`}>{overdue ? "OVERDUE" : d.slaDeadline}</span></TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[d.status]}>{d.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelected(d); setResponseText(""); }}><Eye className="w-4 h-4" /></Button></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">{selected?.id} <Badge variant="outline" className={statusColors[selected?.status || ""]}>{selected?.status}</Badge></DialogTitle>
            <DialogDescription>{selected?.type} • {selected?.vendor} • MWK {selected?.amount.toLocaleString()}</DialogDescription>
          </DialogHeader>
          {selected && <div className="space-y-5">
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm font-medium mb-1">Description</p>
              <p className="text-sm text-muted-foreground">{selected.description}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Evidence ({selected.evidence.length})</p>
              <div className="space-y-2">{selected.evidence.map(e => (
                <div key={e.id} className="flex items-center gap-3 bg-secondary rounded-lg p-3">
                  <Shield className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1"><p className="text-sm">{e.label}</p><p className="text-xs text-muted-foreground">by {e.uploadedBy} • {e.date}</p></div>
                  <Badge variant="outline" className="text-xs">{e.type}</Badge>
                </div>
              ))}</div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Timeline</p>
              <div className="space-y-3 border-l-2 border-border pl-4">
                {selected.timeline.map(t => (
                  <div key={t.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                    <p className="text-sm font-medium">{t.action}</p>
                    <p className="text-xs text-muted-foreground">{t.actor} • {t.date}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {!["Resolved", "Closed"].includes(selected.status) && <div className="space-y-3">
              <div className="space-y-2"><Label>Admin Response / Action Note</Label><Textarea value={responseText} onChange={e => setResponseText(e.target.value)} placeholder="Add notes, resolution details..." className="bg-secondary border-border" /></div>
              <div className="flex flex-wrap gap-2">
                {selected.status !== "Under Review" && <Button variant="outline" size="sm" onClick={() => updateStatus(selected.id, "Under Review", responseText || "Moved to review")}>Start Review</Button>}
                {selected.status !== "Escalated" && <Button variant="outline" size="sm" className="text-red-400" onClick={() => updateStatus(selected.id, "Escalated", responseText || "Escalated to senior team")}><AlertTriangle className="w-4 h-4 mr-1" />Escalate</Button>}
                <Button variant="outline" size="sm" className="text-emerald-400" onClick={() => updateStatus(selected.id, "Resolved", responseText || "Dispute resolved")}><CheckCircle className="w-4 h-4 mr-1" />Resolve</Button>
                <Button variant="outline" size="sm" onClick={() => updateStatus(selected.id, "Closed", responseText || "Case closed")}><XCircle className="w-4 h-4 mr-1" />Close</Button>
              </div>
            </div>}
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
