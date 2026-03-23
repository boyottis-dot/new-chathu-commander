import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { departments as initialDepts, customRoles as initialRoles, allPermissions, type Department, type CustomRole } from "@/lib/mock-data-team";
import { Plus, Pencil, Trash2, Users, Shield, Building2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function DepartmentsRoles() {
  const [depts, setDepts] = useState<Department[]>(initialDepts);
  const [roles, setRoles] = useState<CustomRole[]>(initialRoles);
  const [showAddDept, setShowAddDept] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [newDept, setNewDept] = useState({ name: "", head: "", headEmail: "", budget: "", description: "", color: "#3b82f6" });
  const [newRole, setNewRole] = useState({ name: "", department: "", permissions: [] as string[] });

  const handleAddDept = () => {
    if (!newDept.name) { toast({ title: "Name required", variant: "destructive" }); return; }
    setDepts(prev => [...prev, { id: `dept-${Date.now()}`, name: newDept.name, head: newDept.head, headEmail: newDept.headEmail, employeeCount: 0, budget: parseInt(newDept.budget) || 0, budgetUsed: 0, color: newDept.color, description: newDept.description }]);
    setShowAddDept(false);
    setNewDept({ name: "", head: "", headEmail: "", budget: "", description: "", color: "#3b82f6" });
    toast({ title: "Department created" });
  };

  const handleAddRole = () => {
    if (!newRole.name || !newRole.department) { toast({ title: "Name and department required", variant: "destructive" }); return; }
    setRoles(prev => [...prev, { id: `role-${Date.now()}`, name: newRole.name, department: newRole.department, permissions: newRole.permissions, employeeCount: 0 }]);
    setShowAddRole(false);
    setNewRole({ name: "", department: "", permissions: [] });
    toast({ title: "Role created" });
  };

  const togglePerm = (perm: string) => {
    setNewRole(prev => ({ ...prev, permissions: prev.permissions.includes(perm) ? prev.permissions.filter(p => p !== perm) : [...prev.permissions, perm] }));
  };

  const deleteDept = (id: string) => { setDepts(prev => prev.filter(d => d.id !== id)); toast({ title: "Department deleted" }); };
  const deleteRole = (id: string) => { setRoles(prev => prev.filter(r => r.id !== id)); toast({ title: "Role deleted" }); };

  const fmt = (n: number) => `MWK ${(n / 1000000).toFixed(1)}M`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Departments & Roles</h1>
        <p className="text-muted-foreground">Manage organizational structure, departments, and custom roles with permissions</p>
      </div>

      <Tabs defaultValue="departments">
        <TabsList><TabsTrigger value="departments"><Building2 className="h-3 w-3 mr-1" />Departments</TabsTrigger><TabsTrigger value="roles"><Shield className="h-3 w-3 mr-1" />Roles & Permissions</TabsTrigger></TabsList>

        <TabsContent value="departments" className="space-y-4 mt-4">
          <div className="flex justify-end"><Button size="sm" onClick={() => setShowAddDept(true)}><Plus className="h-4 w-4 mr-1" />Add Department</Button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {depts.map(dept => {
              const pct = dept.budget > 0 ? Math.round((dept.budgetUsed / dept.budget) * 100) : 0;
              return (
                <Card key={dept.id} className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: dept.color }} />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{dept.name}</CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400" onClick={() => deleteDept(dept.id)}><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">{dept.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{dept.employeeCount} employees</span>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Head: <span className="text-foreground">{dept.head}</span></p>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Budget: {fmt(dept.budget)}</span>
                        <span className={pct > 90 ? "text-red-400" : "text-muted-foreground"}>{pct}% used</span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4 mt-4">
          <div className="flex justify-end"><Button size="sm" onClick={() => setShowAddRole(true)}><Plus className="h-4 w-4 mr-1" />Create Role</Button></div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map(role => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.department}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {role.permissions.slice(0, 3).map(p => <Badge key={p} variant="outline" className="text-[10px]">{p.replace(/_/g, " ")}</Badge>)}
                          {role.permissions.length > 3 && <Badge variant="secondary" className="text-[10px]">+{role.permissions.length - 3}</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{role.employeeCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400" onClick={() => deleteRole(role.id)}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Department Dialog */}
      <Dialog open={showAddDept} onOpenChange={setShowAddDept}>
        <DialogContent><DialogHeader><DialogTitle>Add Department</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name *</Label><Input value={newDept.name} onChange={e => setNewDept(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Department Head</Label><Input value={newDept.head} onChange={e => setNewDept(p => ({ ...p, head: e.target.value }))} /></div>
              <div><Label>Head Email</Label><Input value={newDept.headEmail} onChange={e => setNewDept(p => ({ ...p, headEmail: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Monthly Budget (MWK)</Label><Input type="number" value={newDept.budget} onChange={e => setNewDept(p => ({ ...p, budget: e.target.value }))} /></div>
              <div><Label>Color</Label><Input type="color" value={newDept.color} onChange={e => setNewDept(p => ({ ...p, color: e.target.value }))} /></div>
            </div>
            <div><Label>Description</Label><Textarea value={newDept.description} onChange={e => setNewDept(p => ({ ...p, description: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter><Button onClick={handleAddDept}>Create Department</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Role Dialog */}
      <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
        <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Create Custom Role</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Role Name *</Label><Input value={newRole.name} onChange={e => setNewRole(p => ({ ...p, name: e.target.value }))} /></div>
            <div>
              <Label>Department *</Label>
              <Select value={newRole.department} onValueChange={v => setNewRole(p => ({ ...p, department: v }))}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>{depts.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                {allPermissions.map(perm => (
                  <label key={perm} className="flex items-center gap-2 text-xs cursor-pointer">
                    <Checkbox checked={newRole.permissions.includes(perm)} onCheckedChange={() => togglePerm(perm)} />
                    {perm.replace(/_/g, " ")}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter><Button onClick={handleAddRole}>Create Role</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
