import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { employees as initialEmployees, departments, customRoles, type Employee } from "@/lib/mock-data-team";
import { Search, Plus, Mail, Phone, MoreHorizontal, UserPlus, Filter, Download, Eye, Pencil, Trash2, BarChart3 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  "on-leave": "bg-amber-500/20 text-amber-400",
  suspended: "bg-red-500/20 text-red-400",
  terminated: "bg-muted text-muted-foreground",
};

const typeColors: Record<string, string> = {
  "full-time": "bg-blue-500/20 text-blue-400",
  "part-time": "bg-purple-500/20 text-purple-400",
  contract: "bg-cyan-500/20 text-cyan-400",
  intern: "bg-amber-500/20 text-amber-400",
};

const fmt = (n: number) => `MWK ${(n / 1000).toFixed(0)}K`;

export default function EmployeeDirectory() {
  const [emps, setEmps] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewEmp, setViewEmp] = useState<Employee | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: "", email: "", phone: "", department: "", role: "", type: "full-time" as Employee["type"], salary: "", location: "" });

  const filtered = emps.filter(e => {
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (deptFilter !== "all" && e.department !== deptFilter) return false;
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    if (typeFilter !== "all" && e.type !== typeFilter) return false;
    return true;
  });

  const handleAdd = () => {
    if (!newEmp.name || !newEmp.email || !newEmp.department) {
      toast({ title: "Required fields missing", variant: "destructive" });
      return;
    }
    const emp: Employee = {
      id: `emp-${Date.now()}`, name: newEmp.name, email: newEmp.email, phone: newEmp.phone,
      avatar: newEmp.name.split(" ").map(n => n[0]).join("").slice(0, 2),
      department: newEmp.department, role: newEmp.role || "Staff", type: newEmp.type,
      status: "active", joinDate: new Date().toISOString().split("T")[0],
      salary: parseInt(newEmp.salary) || 0, location: newEmp.location || "Lilongwe",
      skills: [], assignedTasks: 0, completedTasks: 0, performance: 0,
    };
    setEmps(prev => [emp, ...prev]);
    setShowAdd(false);
    setNewEmp({ name: "", email: "", phone: "", department: "", role: "", type: "full-time", salary: "", location: "" });
    toast({ title: "Employee added" });
  };

  const toggleStatus = (id: string, status: Employee["status"]) => {
    setEmps(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    toast({ title: `Employee ${status}` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Employee Directory</h1>
          <p className="text-muted-foreground">Manage your team members across all departments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Export</Button>
          <Button size="sm" onClick={() => setShowAdd(true)}><UserPlus className="h-4 w-4 mr-1" />Add Employee</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted-foreground">Total Employees</p>
          <p className="text-2xl font-bold">{emps.length}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-400">{emps.filter(e => e.status === "active").length}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted-foreground">Departments</p>
          <p className="text-2xl font-bold">{departments.length}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted-foreground">Avg Performance</p>
          <p className="text-2xl font-bold">{Math.round(emps.reduce((s, e) => s + e.performance, 0) / emps.length)}%</p>
        </CardContent></Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-[180px]"><Filter className="h-3 w-3 mr-1" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{emp.avatar}</div>
                      <div>
                        <p className="font-medium text-sm">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{emp.department}</TableCell>
                  <TableCell className="text-sm">{emp.role}</TableCell>
                  <TableCell><Badge className={typeColors[emp.type]} variant="secondary">{emp.type}</Badge></TableCell>
                  <TableCell><Badge className={statusColors[emp.status]} variant="secondary">{emp.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={emp.performance} className="w-16 h-2" />
                      <span className="text-xs">{emp.performance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{emp.assignedTasks} active</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewEmp(emp)}><Eye className="h-3 w-3 mr-2" />View Profile</DropdownMenuItem>
                        <DropdownMenuItem><Pencil className="h-3 w-3 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem><Mail className="h-3 w-3 mr-2" />Send Email</DropdownMenuItem>
                        {emp.status === "active" && <DropdownMenuItem onClick={() => toggleStatus(emp.id, "suspended")} className="text-red-400"><Trash2 className="h-3 w-3 mr-2" />Suspend</DropdownMenuItem>}
                        {emp.status === "suspended" && <DropdownMenuItem onClick={() => toggleStatus(emp.id, "active")} className="text-green-400">Reactivate</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Profile Dialog */}
      <Dialog open={!!viewEmp} onOpenChange={() => setViewEmp(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Employee Profile</DialogTitle></DialogHeader>
          {viewEmp && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">{viewEmp.avatar}</div>
                <div>
                  <h3 className="text-lg font-semibold">{viewEmp.name}</h3>
                  <p className="text-sm text-muted-foreground">{viewEmp.role} — {viewEmp.department}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge className={statusColors[viewEmp.status]} variant="secondary">{viewEmp.status}</Badge>
                    <Badge className={typeColors[viewEmp.type]} variant="secondary">{viewEmp.type}</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">Email</p><p>{viewEmp.email}</p></div>
                <div><p className="text-muted-foreground">Phone</p><p>{viewEmp.phone}</p></div>
                <div><p className="text-muted-foreground">Location</p><p>{viewEmp.location}</p></div>
                <div><p className="text-muted-foreground">Joined</p><p>{viewEmp.joinDate}</p></div>
                <div><p className="text-muted-foreground">Salary</p><p>{fmt(viewEmp.salary)}</p></div>
                <div><p className="text-muted-foreground">Performance</p><p>{viewEmp.performance}%</p></div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">{viewEmp.skills.map(s => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Card><CardContent className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Assigned Tasks</p>
                  <p className="text-xl font-bold">{viewEmp.assignedTasks}</p>
                </CardContent></Card>
                <Card><CardContent className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-xl font-bold text-green-400">{viewEmp.completedTasks}</p>
                </CardContent></Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New Employee</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Full Name *</Label><Input value={newEmp.name} onChange={e => setNewEmp(p => ({ ...p, name: e.target.value }))} /></div>
            <div><Label>Email *</Label><Input type="email" value={newEmp.email} onChange={e => setNewEmp(p => ({ ...p, email: e.target.value }))} /></div>
            <div><Label>Phone</Label><Input value={newEmp.phone} onChange={e => setNewEmp(p => ({ ...p, phone: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Department *</Label>
                <Select value={newEmp.department} onValueChange={v => setNewEmp(p => ({ ...p, department: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Role</Label>
                <Select value={newEmp.role} onValueChange={v => setNewEmp(p => ({ ...p, role: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{customRoles.filter(r => !newEmp.department || r.department === newEmp.department).map(r => <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type</Label>
                <Select value={newEmp.type} onValueChange={v => setNewEmp(p => ({ ...p, type: v as Employee["type"] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Salary (MWK)</Label><Input type="number" value={newEmp.salary} onChange={e => setNewEmp(p => ({ ...p, salary: e.target.value }))} /></div>
            </div>
            <div><Label>Location</Label><Input value={newEmp.location} onChange={e => setNewEmp(p => ({ ...p, location: e.target.value }))} placeholder="Lilongwe" /></div>
          </div>
          <DialogFooter><Button onClick={handleAdd}>Add Employee</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
