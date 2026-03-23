import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { expenses as initialExpenses, budgetCategories, type Expense } from "@/lib/mock-data-operations";
import { departments } from "@/lib/mock-data-team";
import { Plus, Search, Download, Check, X, Receipt } from "lucide-react";

const statusColors: Record<string, string> = { pending: "bg-amber-500/20 text-amber-400", approved: "bg-green-500/20 text-green-400", rejected: "bg-red-500/20 text-red-400", reimbursed: "bg-blue-500/20 text-blue-400" };
const fmt = (n: number) => `MWK ${n.toLocaleString()}`;

export default function ExpenseTracker() {
  const [exps, setExps] = useState<Expense[]>(initialExpenses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newExp, setNewExp] = useState({ title: "", category: "", department: "", amount: "", vendor: "", notes: "", receipt: false });

  const filtered = exps.filter(e => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    return true;
  });

  const totalPending = exps.filter(e => e.status === "pending").reduce((s, e) => s + e.amount, 0);
  const totalApproved = exps.filter(e => e.status === "approved" || e.status === "reimbursed").reduce((s, e) => s + e.amount, 0);

  const approve = (id: string) => { setExps(prev => prev.map(e => e.id === id ? { ...e, status: "approved" } : e)); toast({ title: "Expense approved" }); };
  const reject = (id: string) => { setExps(prev => prev.map(e => e.id === id ? { ...e, status: "rejected" } : e)); toast({ title: "Expense rejected" }); };

  const handleAdd = () => {
    if (!newExp.title || !newExp.amount) { toast({ title: "Required fields missing", variant: "destructive" }); return; }
    setExps(prev => [{ id: `exp-${Date.now()}`, title: newExp.title, category: newExp.category || "Miscellaneous", department: newExp.department || "General", amount: parseInt(newExp.amount), date: new Date().toISOString().split("T")[0], submittedBy: "Admin", status: "pending", receipt: newExp.receipt, notes: newExp.notes, vendor: newExp.vendor }, ...prev]);
    setShowAdd(false);
    setNewExp({ title: "", category: "", department: "", amount: "", vendor: "", notes: "", receipt: false });
    toast({ title: "Expense submitted" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Expense Tracker</h1><p className="text-muted-foreground">Track and approve company expenses</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Export</Button>
          <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" />Log Expense</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Expenses</p><p className="text-xl font-bold">{fmt(totalApproved)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Pending Approval</p><p className="text-xl font-bold text-amber-400">{fmt(totalPending)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">This Month</p><p className="text-xl font-bold">{exps.length} entries</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Without Receipt</p><p className="text-xl font-bold text-red-400">{exps.filter(e => !e.receipt).length}</p></CardContent></Card>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search expenses..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="rejected">Rejected</SelectItem><SelectItem value="reimbursed">Reimbursed</SelectItem></SelectContent></Select>
        </div>
      </CardContent></Card>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Expense</TableHead><TableHead>Category</TableHead><TableHead>Department</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Submitted By</TableHead><TableHead>Receipt</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map(exp => (
              <TableRow key={exp.id}>
                <TableCell><div><p className="font-medium text-sm">{exp.title}</p><p className="text-xs text-muted-foreground">{exp.vendor}</p></div></TableCell>
                <TableCell className="text-sm">{exp.category}</TableCell>
                <TableCell className="text-sm">{exp.department}</TableCell>
                <TableCell className="text-sm font-medium">{fmt(exp.amount)}</TableCell>
                <TableCell className="text-sm">{exp.date}</TableCell>
                <TableCell className="text-sm">{exp.submittedBy}</TableCell>
                <TableCell>{exp.receipt ? <Receipt className="h-4 w-4 text-green-400" /> : <span className="text-xs text-muted-foreground">None</span>}</TableCell>
                <TableCell><Badge className={statusColors[exp.status]} variant="secondary">{exp.status}</Badge></TableCell>
                <TableCell className="text-right">
                  {exp.status === "pending" && (
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-green-400" onClick={() => approve(exp.id)}><Check className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400" onClick={() => reject(exp.id)}><X className="h-3 w-3" /></Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent><DialogHeader><DialogTitle>Log Expense</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Title *</Label><Input value={newExp.title} onChange={e => setNewExp(p => ({ ...p, title: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Category</Label><Select value={newExp.category} onValueChange={v => setNewExp(p => ({ ...p, category: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{budgetCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Department</Label><Select value={newExp.department} onValueChange={v => setNewExp(p => ({ ...p, department: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Amount (MWK) *</Label><Input type="number" value={newExp.amount} onChange={e => setNewExp(p => ({ ...p, amount: e.target.value }))} /></div>
              <div><Label>Vendor</Label><Input value={newExp.vendor} onChange={e => setNewExp(p => ({ ...p, vendor: e.target.value }))} /></div>
            </div>
            <div><Label>Notes</Label><Textarea value={newExp.notes} onChange={e => setNewExp(p => ({ ...p, notes: e.target.value }))} rows={2} /></div>
            <div className="flex items-center gap-2"><Switch checked={newExp.receipt} onCheckedChange={v => setNewExp(p => ({ ...p, receipt: v }))} /><Label>Receipt attached</Label></div>
          </div>
          <DialogFooter><Button onClick={handleAdd}>Submit Expense</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
