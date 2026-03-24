import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Ticket, Clock, UserCheck, AlertCircle, Eye, Send, Filter, Plus, Copy, Edit, Trash2, MessageSquare } from "lucide-react";
import {
  supportTickets, cannedResponses, ticketStatusOptions, ticketPriorityOptions, ticketChannelOptions,
  type SupportTicket, type TicketStatus, type CannedResponse,
} from "@/lib/mock-data-support";

const statusColors: Record<string, string> = {
  "Open": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Waiting on Customer": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Waiting on Vendor": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Resolved": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Closed": "bg-muted text-muted-foreground border-border",
};

const priorityColors: Record<string, string> = {
  Low: "text-muted-foreground", Medium: "text-yellow-400", High: "text-orange-400", Urgent: "text-red-400",
};

export default function SupportTickets() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState(supportTickets);
  const [canned, setCanned] = useState(cannedResponses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selected, setSelected] = useState<SupportTicket | null>(null);
  const [reply, setReply] = useState("");
  const [cannedDialog, setCannedDialog] = useState(false);
  const [editCanned, setEditCanned] = useState<CannedResponse | null>(null);
  const [cannedForm, setCannedForm] = useState({ title: "", category: "", message: "" });

  const openCount = tickets.filter(t => t.status === "Open").length;
  const inProgressCount = tickets.filter(t => t.status === "In Progress").length;
  const breachedSla = tickets.filter(t => {
    if (["Resolved", "Closed"].includes(t.status)) return false;
    return new Date(t.slaDeadline) < new Date();
  }).length;

  const filtered = tickets.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const sendReply = () => {
    if (!selected || !reply.trim()) return;
    const updatedTickets = tickets.map(t => t.id === selected.id ? {
      ...t,
      status: "In Progress" as TicketStatus,
      messages: [...t.messages, { id: `M-${Date.now()}`, sender: t.assignedTo, role: "agent" as const, message: reply, timestamp: new Date().toISOString().slice(0, 16).replace("T", " ") }],
    } : t);
    setTickets(updatedTickets);
    setSelected(updatedTickets.find(t => t.id === selected.id) || null);
    setReply("");
    toast({ title: "Reply sent" });
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));
    if (selected?.id === id) setSelected({ ...selected, status });
    toast({ title: `Ticket ${id} — ${status}` });
  };

  const useCannedResponse = (c: CannedResponse) => {
    setReply(c.message);
    setCanned(canned.map(cr => cr.id === c.id ? { ...cr, usageCount: cr.usageCount + 1 } : cr));
  };

  const saveCanned = () => {
    if (editCanned) {
      setCanned(canned.map(c => c.id === editCanned.id ? { ...c, ...cannedForm } : c));
    } else {
      setCanned([...canned, { id: `CR-${Date.now()}`, ...cannedForm, usageCount: 0 }]);
    }
    setCannedDialog(false);
    setEditCanned(null);
    setCannedForm({ title: "", category: "", message: "" });
    toast({ title: editCanned ? "Response updated" : "Response created" });
  };

  const deleteCanned = (id: string) => {
    setCanned(canned.filter(c => c.id !== id));
    toast({ title: "Response deleted" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground text-sm">Manage customer support requests with SLA tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><Ticket className="w-8 h-8 text-primary" /><div><p className="text-2xl font-bold">{tickets.length}</p><p className="text-xs text-muted-foreground">Total Tickets</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><Clock className="w-8 h-8 text-blue-400" /><div><p className="text-2xl font-bold">{openCount}</p><p className="text-xs text-muted-foreground">Open</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><UserCheck className="w-8 h-8 text-yellow-400" /><div><p className="text-2xl font-bold">{inProgressCount}</p><p className="text-xs text-muted-foreground">In Progress</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><AlertCircle className="w-8 h-8 text-red-400" /><div><p className="text-2xl font-bold">{breachedSla}</p><p className="text-xs text-muted-foreground">SLA Breached</p></div></div></CardContent></Card>
      </div>

      <Tabs defaultValue="tickets">
        <TabsList className="bg-secondary">
          <TabsTrigger value="tickets">Ticket Queue</TabsTrigger>
          <TabsTrigger value="canned">Canned Responses ({canned.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card className="border-border"><CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" /></div>
              <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-[180px] bg-secondary border-border"><Filter className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem>{ticketStatusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}><SelectTrigger className="w-[140px] bg-secondary border-border"><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent><SelectItem value="all">All Priority</SelectItem>{ticketPriorityOptions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
            </div>
          </CardContent></Card>

          <Card className="border-border">
            <Table>
              <TableHeader><TableRow className="border-border">
                <TableHead>Ticket</TableHead><TableHead>Subject</TableHead><TableHead>Customer</TableHead><TableHead>Channel</TableHead><TableHead>Priority</TableHead><TableHead>Assigned</TableHead><TableHead>SLA</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filtered.map(t => {
                  const slaBreached = new Date(t.slaDeadline) < new Date() && !["Resolved", "Closed"].includes(t.status);
                  return (
                    <TableRow key={t.id} className="border-border">
                      <TableCell className="font-mono text-xs">{t.id}</TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">{t.subject}</TableCell>
                      <TableCell className="text-sm">{t.customer}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{t.channel}</Badge></TableCell>
                      <TableCell><span className={`text-sm font-medium ${priorityColors[t.priority]}`}>{t.priority}</span></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{t.assignedTo.split(" ")[0]}</TableCell>
                      <TableCell><span className={`text-xs ${slaBreached ? "text-red-400 font-medium" : "text-muted-foreground"}`}>{slaBreached ? "BREACHED" : t.slaDeadline.slice(5)}</span></TableCell>
                      <TableCell><Badge variant="outline" className={statusColors[t.status]}>{t.status}</Badge></TableCell>
                      <TableCell><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelected(t); setReply(""); }}><Eye className="w-4 h-4" /></Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="canned" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => { setCannedForm({ title: "", category: "", message: "" }); setEditCanned(null); setCannedDialog(true); }}>
              <Plus className="w-4 h-4 mr-2" />Add Response
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {canned.map(c => (
              <Card key={c.id} className="border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{c.title}</CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditCanned(c); setCannedForm({ title: c.title, category: c.category, message: c.message }); setCannedDialog(true); }}><Edit className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400" onClick={() => deleteCanned(c.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                  <CardDescription>{c.category} • Used {c.usageCount} times</CardDescription>
                </CardHeader>
                <CardContent><p className="text-xs text-muted-foreground line-clamp-3">{c.message}</p></CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Ticket Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">{selected?.id} <Badge variant="outline" className={statusColors[selected?.status || ""]}>{selected?.status}</Badge></DialogTitle>
          </DialogHeader>
          {selected && <div className="space-y-4">
            <div className="bg-secondary rounded-lg p-4">
              <p className="font-medium text-sm">{selected.subject}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                <span>Customer: {selected.customer}</span>
                <span>Channel: {selected.channel}</span>
                <span>Assigned: {selected.assignedTo}</span>
                <span>Created: {selected.createdAt}</span>
              </div>
              <div className="flex gap-1 mt-2">{selected.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}</div>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {selected.messages.map(m => (
                <div key={m.id} className={`rounded-lg p-3 ${m.role === "agent" ? "bg-primary/10 ml-8" : m.role === "system" ? "bg-muted text-center" : "bg-secondary mr-8"}`}>
                  <div className="flex justify-between mb-1"><span className="text-xs font-medium">{m.sender}</span><span className="text-[10px] text-muted-foreground">{m.timestamp}</span></div>
                  <p className="text-sm">{m.message}</p>
                </div>
              ))}
            </div>

            {!["Resolved", "Closed"].includes(selected.status) && <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                <Label className="text-xs text-muted-foreground">Quick:</Label>
                {canned.slice(0, 3).map(c => (
                  <Button key={c.id} variant="outline" size="sm" className="h-6 text-xs" onClick={() => useCannedResponse(c)}>{c.title}</Button>
                ))}
              </div>
              <Textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply..." className="bg-secondary border-border" rows={3} />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Select onValueChange={v => updateTicketStatus(selected.id, v as TicketStatus)}>
                    <SelectTrigger className="w-[180px] h-9 bg-secondary border-border text-xs"><SelectValue placeholder="Change status" /></SelectTrigger>
                    <SelectContent>{ticketStatusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button onClick={sendReply} className="bg-primary text-primary-foreground"><Send className="w-4 h-4 mr-2" />Send Reply</Button>
              </div>
            </div>}
          </div>}
        </DialogContent>
      </Dialog>

      {/* Canned Response Dialog */}
      <Dialog open={cannedDialog} onOpenChange={setCannedDialog}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader><DialogTitle>{editCanned ? "Edit" : "Create"} Canned Response</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input value={cannedForm.title} onChange={e => setCannedForm(f => ({ ...f, title: e.target.value }))} className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Category</Label>
              <Select value={cannedForm.category} onValueChange={v => setCannedForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>{["Order Issue","Payment","Account","Delivery","Returns","Technical","General"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Message Template</Label><Textarea value={cannedForm.message} onChange={e => setCannedForm(f => ({ ...f, message: e.target.value }))} className="bg-secondary border-border" rows={4} placeholder="Use [Customer], [Order ID], etc. for variables" /></div>
          </div>
          <DialogFooter><Button onClick={saveCanned} className="bg-primary text-primary-foreground">Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
