import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { tasks as initialTasks, taskColumns, type Task, type TaskStatus, type TaskPriority, type TaskCategory } from "@/lib/mock-data-tasks";
import { employees } from "@/lib/mock-data-team";
import { Plus, Search, Filter, LayoutGrid, List, Clock, MessageSquare, Paperclip, CheckSquare, GripVertical, MoreHorizontal, Eye, Pencil, Trash2, Calendar } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const priorityColors: Record<string, string> = { critical: "bg-red-500/20 text-red-400", high: "bg-orange-500/20 text-orange-400", medium: "bg-amber-500/20 text-amber-400", low: "bg-muted text-muted-foreground" };
const statusColors: Record<string, string> = { backlog: "bg-muted text-muted-foreground", todo: "bg-blue-500/20 text-blue-400", "in-progress": "bg-amber-500/20 text-amber-400", review: "bg-purple-500/20 text-purple-400", done: "bg-green-500/20 text-green-400" };
const categoryColors: Record<string, string> = { support: "bg-blue-500/20 text-blue-400", marketing: "bg-green-500/20 text-green-400", operations: "bg-amber-500/20 text-amber-400", development: "bg-cyan-500/20 text-cyan-400", finance: "bg-red-500/20 text-red-400", content: "bg-pink-500/20 text-pink-400", influencer: "bg-purple-500/20 text-purple-400" };

export default function TaskBoard() {
  const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignee: "", department: "", category: "support" as TaskCategory, priority: "medium" as TaskPriority, dueDate: "", estimatedHours: "", tags: "" });

  const filtered = allTasks.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (deptFilter !== "all" && t.department !== deptFilter) return false;
    return true;
  });

  const handleAdd = () => {
    if (!newTask.title) { toast({ title: "Title required", variant: "destructive" }); return; }
    const emp = employees.find(e => e.name === newTask.assignee);
    const task: Task = {
      id: `task-${Date.now()}`, title: newTask.title, description: newTask.description,
      assignee: newTask.assignee || "Unassigned", assigneeAvatar: emp?.avatar || "??",
      department: newTask.department || "General", category: newTask.category, priority: newTask.priority,
      status: "todo", dueDate: newTask.dueDate, createdDate: new Date().toISOString().split("T")[0],
      tags: newTask.tags.split(",").map(t => t.trim()).filter(Boolean),
      comments: [], checklist: [], attachments: 0,
      estimatedHours: parseInt(newTask.estimatedHours) || 0, loggedHours: 0,
    };
    setAllTasks(prev => [task, ...prev]);
    setShowAdd(false);
    setNewTask({ title: "", description: "", assignee: "", department: "", category: "support", priority: "medium", dueDate: "", estimatedHours: "", tags: "" });
    toast({ title: "Task created" });
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setAllTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    toast({ title: `Task moved to ${newStatus}` });
  };

  const deleteTask = (taskId: string) => {
    setAllTasks(prev => prev.filter(t => t.id !== taskId));
    toast({ title: "Task deleted" });
  };

  const toggleChecklist = (taskId: string, checkId: string) => {
    setAllTasks(prev => prev.map(t => t.id === taskId ? { ...t, checklist: t.checklist.map(c => c.id === checkId ? { ...c, done: !c.done } : c) } : t));
  };

  const KanbanCard = ({ task }: { task: Task }) => (
    <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setViewTask(task)}>
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium leading-tight flex-1">{task.title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="h-6 w-6 shrink-0"><MoreHorizontal className="h-3 w-3" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {taskColumns.filter(c => c.id !== task.status).map(c => <DropdownMenuItem key={c.id} onClick={e => { e.stopPropagation(); moveTask(task.id, c.id); }}>Move to {c.title}</DropdownMenuItem>)}
              <DropdownMenuItem onClick={e => { e.stopPropagation(); deleteTask(task.id); }} className="text-red-400"><Trash2 className="h-3 w-3 mr-2" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className={`text-[10px] ${priorityColors[task.priority]}`}>{task.priority}</Badge>
          <Badge variant="secondary" className={`text-[10px] ${categoryColors[task.category]}`}>{task.category}</Badge>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">{task.assigneeAvatar}</div>
            <span>{task.assignee.split(" ")[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            {task.comments.length > 0 && <span className="flex items-center gap-0.5"><MessageSquare className="h-3 w-3" />{task.comments.length}</span>}
            {task.checklist.length > 0 && <span className="flex items-center gap-0.5"><CheckSquare className="h-3 w-3" />{task.checklist.filter(c => c.done).length}/{task.checklist.length}</span>}
          </div>
        </div>
        {task.dueDate && <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />Due {task.dueDate}</p>}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Task Board</h1><p className="text-muted-foreground">Manage and assign tasks across your team</p></div>
        <div className="flex gap-2">
          <div className="flex border border-border rounded-md">
            <Button variant={view === "kanban" ? "secondary" : "ghost"} size="sm" onClick={() => setView("kanban")}><LayoutGrid className="h-4 w-4" /></Button>
            <Button variant={view === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setView("list")}><List className="h-4 w-4" /></Button>
          </div>
          <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" />New Task</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {taskColumns.map(col => (
          <Card key={col.id}><CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground">{col.title}</p>
            <p className="text-xl font-bold">{allTasks.filter(t => t.status === col.id).length}</p>
          </CardContent></Card>
        ))}
      </div>

      {/* Filters */}
      <Card><CardContent className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}><SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Priority</SelectItem><SelectItem value="critical">Critical</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent></Select>
          <Select value={deptFilter} onValueChange={setDeptFilter}><SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Departments</SelectItem>{[...new Set(allTasks.map(t => t.department))].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
        </div>
      </CardContent></Card>

      {/* Kanban View */}
      {view === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {taskColumns.map(col => (
            <div key={col.id} className="space-y-3">
              <div className={`rounded-lg p-2 ${col.color}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{col.title}</h3>
                  <Badge variant="secondary" className="text-xs">{filtered.filter(t => t.status === col.id).length}</Badge>
                </div>
              </div>
              <div className="space-y-2 min-h-[100px]">
                {filtered.filter(t => t.status === col.id).map(task => <KanbanCard key={task.id} task={task} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Task</TableHead><TableHead>Assignee</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Due Date</TableHead><TableHead>Progress</TableHead><TableHead className="text-right">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(task => (
                <TableRow key={task.id} className="cursor-pointer" onClick={() => setViewTask(task)}>
                  <TableCell><div><p className="font-medium text-sm">{task.title}</p><p className="text-xs text-muted-foreground">{task.department}</p></div></TableCell>
                  <TableCell><div className="flex items-center gap-2"><div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">{task.assigneeAvatar}</div><span className="text-sm">{task.assignee.split(" ")[0]}</span></div></TableCell>
                  <TableCell><Badge className={priorityColors[task.priority]} variant="secondary">{task.priority}</Badge></TableCell>
                  <TableCell><Badge className={statusColors[task.status]} variant="secondary">{task.status}</Badge></TableCell>
                  <TableCell className="text-sm">{task.dueDate}</TableCell>
                  <TableCell>{task.checklist.length > 0 ? <span className="text-xs">{task.checklist.filter(c => c.done).length}/{task.checklist.length}</span> : <span className="text-xs text-muted-foreground">—</span>}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={e => { e.stopPropagation(); setViewTask(task); }}><Eye className="h-3 w-3 mr-2" />View</DropdownMenuItem>
                        {taskColumns.filter(c => c.id !== task.status).map(c => <DropdownMenuItem key={c.id} onClick={e => { e.stopPropagation(); moveTask(task.id, c.id); }}>Move to {c.title}</DropdownMenuItem>)}
                        <DropdownMenuItem onClick={e => { e.stopPropagation(); deleteTask(task.id); }} className="text-red-400"><Trash2 className="h-3 w-3 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      )}

      {/* Task Detail Dialog */}
      <Dialog open={!!viewTask} onOpenChange={() => setViewTask(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{viewTask?.title}</DialogTitle></DialogHeader>
          {viewTask && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={priorityColors[viewTask.priority]} variant="secondary">{viewTask.priority}</Badge>
                <Badge className={statusColors[viewTask.status]} variant="secondary">{viewTask.status}</Badge>
                <Badge className={categoryColors[viewTask.category]} variant="secondary">{viewTask.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{viewTask.description}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">Assignee</p><p>{viewTask.assignee}</p></div>
                <div><p className="text-muted-foreground">Department</p><p>{viewTask.department}</p></div>
                <div><p className="text-muted-foreground">Due Date</p><p>{viewTask.dueDate}</p></div>
                <div><p className="text-muted-foreground">Created</p><p>{viewTask.createdDate}</p></div>
                <div><p className="text-muted-foreground">Est. Hours</p><p>{viewTask.estimatedHours}h</p></div>
                <div><p className="text-muted-foreground">Logged</p><p>{viewTask.loggedHours}h</p></div>
              </div>
              {viewTask.tags.length > 0 && (
                <div><p className="text-sm text-muted-foreground mb-1">Tags</p><div className="flex flex-wrap gap-1">{viewTask.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}</div></div>
              )}
              {viewTask.checklist.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Checklist ({viewTask.checklist.filter(c => c.done).length}/{viewTask.checklist.length})</p>
                  <div className="space-y-1">
                    {viewTask.checklist.map(item => (
                      <label key={item.id} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={item.done} onCheckedChange={() => toggleChecklist(viewTask.id, item.id)} />
                        <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {viewTask.comments.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Comments</p>
                  <div className="space-y-2">
                    {viewTask.comments.map(c => (
                      <div key={c.id} className="bg-muted/50 rounded p-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1"><span className="font-medium text-foreground">{c.author}</span><span>{c.date}</span></div>
                        <p className="text-sm">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                {taskColumns.filter(c => c.id !== viewTask.status).map(c => <Button key={c.id} variant="outline" size="sm" onClick={() => { moveTask(viewTask.id, c.id); setViewTask(null); }}>{c.title}</Button>)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Create New Task</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Title *</Label><Input value={newTask.title} onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))} /></div>
            <div><Label>Description</Label><Textarea value={newTask.description} onChange={e => setNewTask(p => ({ ...p, description: e.target.value }))} rows={3} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Assignee</Label><Select value={newTask.assignee} onValueChange={v => setNewTask(p => ({ ...p, assignee: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{employees.map(e => <SelectItem key={e.id} value={e.name}>{e.name}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Department</Label><Select value={newTask.department} onValueChange={v => setNewTask(p => ({ ...p, department: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{["Customer Support", "Marketing", "Operations", "Influencer Relations", "Finance", "Technology"].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Priority</Label><Select value={newTask.priority} onValueChange={v => setNewTask(p => ({ ...p, priority: v as TaskPriority }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="critical">Critical</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent></Select></div>
              <div><Label>Category</Label><Select value={newTask.category} onValueChange={v => setNewTask(p => ({ ...p, category: v as TaskCategory }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="support">Support</SelectItem><SelectItem value="marketing">Marketing</SelectItem><SelectItem value="operations">Operations</SelectItem><SelectItem value="development">Dev</SelectItem><SelectItem value="finance">Finance</SelectItem><SelectItem value="content">Content</SelectItem><SelectItem value="influencer">Influencer</SelectItem></SelectContent></Select></div>
              <div><Label>Est. Hours</Label><Input type="number" value={newTask.estimatedHours} onChange={e => setNewTask(p => ({ ...p, estimatedHours: e.target.value }))} /></div>
            </div>
            <div><Label>Due Date</Label><Input type="date" value={newTask.dueDate} onChange={e => setNewTask(p => ({ ...p, dueDate: e.target.value }))} /></div>
            <div><Label>Tags (comma separated)</Label><Input value={newTask.tags} onChange={e => setNewTask(p => ({ ...p, tags: e.target.value }))} placeholder="urgent, bug, feature" /></div>
          </div>
          <DialogFooter><Button onClick={handleAdd}>Create Task</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
