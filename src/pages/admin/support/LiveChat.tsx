import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Users, Clock, CheckCircle, PhoneCall, UserPlus } from "lucide-react";
import { liveSessions, type LiveSession } from "@/lib/mock-data-support";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Queued: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Ended: "bg-muted text-muted-foreground border-border",
};

export default function LiveChat() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState(liveSessions);
  const [filter, setFilter] = useState("all");

  const active = sessions.filter(s => s.status === "Active").length;
  const queued = sessions.filter(s => s.status === "Queued").length;

  const filtered = filter === "all" ? sessions : sessions.filter(s => s.status === filter);

  const assignAgent = (id: string) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, status: "Active" as const, agent: "You (Admin)" } : s));
    toast({ title: "Session assigned to you" });
  };

  const endSession = (id: string) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, status: "Ended" as const } : s));
    toast({ title: "Session ended" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Live Chat Overview</h1>
        <p className="text-muted-foreground text-sm">Monitor and manage active customer chat sessions</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><MessageCircle className="w-8 h-8 text-primary" /><div><p className="text-2xl font-bold">{sessions.length}</p><p className="text-xs text-muted-foreground">Total Sessions</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><PhoneCall className="w-8 h-8 text-emerald-400" /><div><p className="text-2xl font-bold">{active}</p><p className="text-xs text-muted-foreground">Active</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><Clock className="w-8 h-8 text-yellow-400" /><div><p className="text-2xl font-bold">{queued}</p><p className="text-xs text-muted-foreground">In Queue</p></div></div></CardContent></Card>
        <Card className="border-border"><CardContent className="p-4"><div className="flex items-center gap-3"><Users className="w-8 h-8 text-blue-400" /><div><p className="text-2xl font-bold">4</p><p className="text-xs text-muted-foreground">Agents Online</p></div></div></CardContent></Card>
      </div>

      {queued > 0 && (
        <Card className="border-border border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <p className="text-sm"><span className="font-medium text-yellow-400">{queued} customers</span> are waiting in queue. Average wait time: ~3 min</p>
          </CardContent>
        </Card>
      )}

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Chat Sessions</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[130px] bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Queued">Queued</SelectItem><SelectItem value="Ended">Ended</SelectItem></SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow className="border-border">
              <TableHead>Customer</TableHead><TableHead>Topic</TableHead><TableHead>Agent</TableHead><TableHead>Duration</TableHead><TableHead>Messages</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id} className="border-border">
                  <TableCell className="font-medium">{s.customer}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.topic}</TableCell>
                  <TableCell className="text-sm">{s.agent || <span className="text-yellow-400 text-xs">Unassigned</span>}</TableCell>
                  <TableCell className="text-sm">{s.duration}</TableCell>
                  <TableCell>{s.messageCount}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[s.status]}>{s.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {s.status === "Queued" && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => assignAgent(s.id)}><UserPlus className="w-3.5 h-3.5 mr-1" />Assign</Button>}
                      {s.status === "Active" && <Button size="sm" variant="outline" className="h-7 text-xs text-red-400" onClick={() => endSession(s.id)}>End</Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
