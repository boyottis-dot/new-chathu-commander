import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { budgetItems as initialItems, budgetCategories, type BudgetItem } from "@/lib/mock-data-operations";
import { departments } from "@/lib/mock-data-team";
import { Plus, DollarSign, TrendingUp, AlertTriangle, Pencil } from "lucide-react";

const statusColors: Record<string, string> = { "on-track": "bg-green-500/20 text-green-400", "over-budget": "bg-red-500/20 text-red-400", "under-budget": "bg-blue-500/20 text-blue-400" };
const fmt = (n: number) => `MWK ${(n / 1000000).toFixed(2)}M`;

export default function BudgetPlanner() {
  const [items, setItems] = useState<BudgetItem[]>(initialItems);
  const [deptFilter, setDeptFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ department: "", category: "", allocated: "", period: "August 2024" });

  const filtered = deptFilter === "all" ? items : items.filter(b => b.department === deptFilter);
  const totalAlloc = filtered.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = filtered.reduce((s, b) => s + b.spent, 0);
  const overBudget = filtered.filter(b => b.status === "over-budget");

  // Group by department
  const byDept = filtered.reduce<Record<string, BudgetItem[]>>((acc, b) => { (acc[b.department] ||= []).push(b); return acc; }, {});

  const handleAdd = () => {
    if (!newItem.department || !newItem.category || !newItem.allocated) { toast({ title: "Required fields missing", variant: "destructive" }); return; }
    setItems(prev => [...prev, { id: `bud-${Date.now()}`, department: newItem.department, category: newItem.category, allocated: parseInt(newItem.allocated), spent: 0, period: newItem.period, status: "under-budget" }]);
    setShowAdd(false);
    setNewItem({ department: "", category: "", allocated: "", period: "August 2024" });
    toast({ title: "Budget item added" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Budget Planner</h1><p className="text-muted-foreground">Plan and track departmental budgets</p></div>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" />Add Budget Item</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Allocated</p><p className="text-xl font-bold">{fmt(totalAlloc)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Spent</p><p className="text-xl font-bold">{fmt(totalSpent)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Remaining</p><p className="text-xl font-bold text-green-400">{fmt(totalAlloc - totalSpent)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Over Budget</p><p className="text-xl font-bold text-red-400">{overBudget.length} items</p></CardContent></Card>
      </div>

      <Card><CardContent className="p-4">
        <Select value={deptFilter} onValueChange={setDeptFilter}><SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Departments</SelectItem>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent></Select>
      </CardContent></Card>

      {Object.entries(byDept).map(([dept, deptItems]) => {
        const dAlloc = deptItems.reduce((s, b) => s + b.allocated, 0);
        const dSpent = deptItems.reduce((s, b) => s + b.spent, 0);
        const pct = dAlloc > 0 ? Math.round((dSpent / dAlloc) * 100) : 0;
        return (
          <Card key={dept}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{dept}</CardTitle>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">{fmt(dSpent)} / {fmt(dAlloc)}</span>
                  <Badge className={pct > 100 ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"} variant="secondary">{pct}%</Badge>
                </div>
              </div>
              <Progress value={Math.min(pct, 100)} className="h-2" />
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Category</TableHead><TableHead>Allocated</TableHead><TableHead>Spent</TableHead><TableHead>Remaining</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {deptItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-sm">{item.category}</TableCell>
                      <TableCell className="text-sm">{fmt(item.allocated)}</TableCell>
                      <TableCell className="text-sm">{fmt(item.spent)}</TableCell>
                      <TableCell className="text-sm">{fmt(item.allocated - item.spent)}</TableCell>
                      <TableCell><Badge className={statusColors[item.status]} variant="secondary">{item.status}</Badge></TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent><DialogHeader><DialogTitle>Add Budget Item</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Department</Label><Select value={newItem.department} onValueChange={v => setNewItem(p => ({ ...p, department: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Category</Label><Select value={newItem.category} onValueChange={v => setNewItem(p => ({ ...p, category: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{budgetCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>Allocated Amount (MWK)</Label><Input type="number" value={newItem.allocated} onChange={e => setNewItem(p => ({ ...p, allocated: e.target.value }))} /></div>
            <div><Label>Period</Label><Input value={newItem.period} onChange={e => setNewItem(p => ({ ...p, period: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button onClick={handleAdd}>Add Item</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
