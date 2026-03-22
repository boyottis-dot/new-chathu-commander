import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, UserPlus, Search, MoreHorizontal, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "operations_admin" | "content_admin";
  status: "active" | "deactivated";
  lastLogin: string;
  createdAt: string;
}

const admins: Admin[] = [
  { id: "A1", name: "Chathu Owner", email: "admin@chathu.mw", role: "super_admin", status: "active", lastLogin: "2024-01-15 09:30", createdAt: "2023-06-01" },
  { id: "A2", name: "Grace Banda", email: "grace@chathu.mw", role: "operations_admin", status: "active", lastLogin: "2024-01-15 08:15", createdAt: "2023-08-15" },
  { id: "A3", name: "James Mwale", email: "james@chathu.mw", role: "content_admin", status: "active", lastLogin: "2024-01-14 16:45", createdAt: "2023-09-20" },
  { id: "A4", name: "Sarah Phiri", email: "sarah@chathu.mw", role: "operations_admin", status: "deactivated", lastLogin: "2023-12-01 10:00", createdAt: "2023-07-10" },
];

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  operations_admin: "Operations Admin",
  content_admin: "Content Admin",
};

const roleColors: Record<string, string> = {
  super_admin: "bg-primary/20 text-primary",
  operations_admin: "bg-blue-500/20 text-blue-400",
  content_admin: "bg-purple-500/20 text-purple-400",
};

export default function AdminAccounts() {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "content_admin" });

  const filtered = admins.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    if (!newAdmin.name || !newAdmin.email) { toast.error("Fill in all fields"); return; }
    toast.success(`Invite sent to ${newAdmin.email}`);
    setShowCreate(false);
    setNewAdmin({ name: "", email: "", role: "content_admin" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Accounts</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage administrator access and roles</p>
        </div>
        <Button onClick={() => setShowCreate(true)}><UserPlus className="h-4 w-4 mr-2" />Add Admin</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(roleLabels).map(([key, label]) => (
          <Card key={key} className="bg-card border-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold text-foreground">{admins.filter(a => a.role === key && a.status === "active").length}</p>
              </div>
              <Shield className={`h-5 w-5 ${key === "super_admin" ? "text-primary" : key === "operations_admin" ? "text-blue-400" : "text-purple-400"}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search admins..." className="pl-9 bg-secondary border-border" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(a => (
                <TableRow key={a.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{a.name}</TableCell>
                  <TableCell className="text-muted-foreground">{a.email}</TableCell>
                  <TableCell><Badge className={roleColors[a.role]}>{roleLabels[a.role]}</Badge></TableCell>
                  <TableCell>
                    <Badge className={a.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-destructive/20 text-destructive"}>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{a.lastLogin}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.success("Role updated")}>Change Role</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Password reset sent")}>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => toast.success(`${a.name} ${a.status === "active" ? "deactivated" : "reactivated"}`)}>
                          {a.status === "active" ? "Deactivate" : "Reactivate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Add New Admin</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={newAdmin.name} onChange={e => setNewAdmin(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" value={newAdmin.email} onChange={e => setNewAdmin(p => ({ ...p, email: e.target.value }))} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newAdmin.role} onValueChange={v => setNewAdmin(p => ({ ...p, role: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin — Full platform control</SelectItem>
                  <SelectItem value="operations_admin">Operations Admin — No financial access</SelectItem>
                  <SelectItem value="content_admin">Content Admin — Feed & products only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate}><Mail className="h-4 w-4 mr-2" />Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
