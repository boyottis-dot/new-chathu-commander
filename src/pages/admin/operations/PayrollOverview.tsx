import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { payrollEntries as initialPayroll, totalPayroll, type PayrollEntry } from "@/lib/mock-data-operations";
import { departments } from "@/lib/mock-data-team";
import { DollarSign, Download, Send, CheckCircle } from "lucide-react";

const statusColors: Record<string, string> = { pending: "bg-amber-500/20 text-amber-400", paid: "bg-green-500/20 text-green-400", failed: "bg-red-500/20 text-red-400" };
const fmt = (n: number) => `MWK ${n.toLocaleString()}`;

export default function PayrollOverview() {
  const [entries, setEntries] = useState<PayrollEntry[]>(initialPayroll);
  const [deptFilter, setDeptFilter] = useState("all");

  const filtered = deptFilter === "all" ? entries : entries.filter(e => e.department === deptFilter);
  const totalNet = filtered.reduce((s, e) => s + e.netPay, 0);
  const totalGross = filtered.reduce((s, e) => s + e.baseSalary + e.bonus, 0);
  const totalDeductions = filtered.reduce((s, e) => s + e.deductions, 0);

  const processPayroll = () => {
    setEntries(prev => prev.map(e => e.status === "pending" ? { ...e, status: "paid", bankRef: `REF-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}` } : e));
    toast({ title: "Payroll processed", description: `${entries.filter(e => e.status === "pending").length} payments sent` });
  };

  const paySingle = (id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status: "paid", bankRef: `REF-${Date.now()}` } : e));
    toast({ title: "Payment sent" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Payroll Overview</h1><p className="text-muted-foreground">Manage employee salaries and payments</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Export</Button>
          <Button size="sm" onClick={processPayroll}><Send className="h-4 w-4 mr-1" />Process All Payroll</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Gross</p><p className="text-xl font-bold">{fmt(totalGross)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Deductions</p><p className="text-xl font-bold text-red-400">{fmt(totalDeductions)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Net Pay</p><p className="text-xl font-bold text-green-400">{fmt(totalNet)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Pending</p><p className="text-xl font-bold text-amber-400">{entries.filter(e => e.status === "pending").length}</p></CardContent></Card>
      </div>

      <Card><CardContent className="p-4">
        <Select value={deptFilter} onValueChange={setDeptFilter}><SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Departments</SelectItem>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent></Select>
      </CardContent></Card>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Department</TableHead><TableHead>Role</TableHead><TableHead>Type</TableHead><TableHead>Base Salary</TableHead><TableHead>Bonus</TableHead><TableHead>Deductions</TableHead><TableHead>Net Pay</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map(entry => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium text-sm">{entry.employeeName}</TableCell>
                <TableCell className="text-sm">{entry.department}</TableCell>
                <TableCell className="text-sm">{entry.role}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{entry.type}</Badge></TableCell>
                <TableCell className="text-sm">{fmt(entry.baseSalary)}</TableCell>
                <TableCell className="text-sm text-green-400">{entry.bonus > 0 ? `+${fmt(entry.bonus)}` : "—"}</TableCell>
                <TableCell className="text-sm text-red-400">-{fmt(entry.deductions)}</TableCell>
                <TableCell className="text-sm font-bold">{fmt(entry.netPay)}</TableCell>
                <TableCell><Badge className={statusColors[entry.status]} variant="secondary">{entry.status}</Badge></TableCell>
                <TableCell className="text-right">
                  {entry.status === "pending" && <Button variant="outline" size="sm" onClick={() => paySingle(entry.id)}><CheckCircle className="h-3 w-3 mr-1" />Pay</Button>}
                  {entry.status === "paid" && <span className="text-xs text-muted-foreground">{entry.bankRef}</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
