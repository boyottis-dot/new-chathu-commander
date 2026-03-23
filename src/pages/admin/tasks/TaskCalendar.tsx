import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tasks } from "@/lib/mock-data-tasks";
import { ChevronLeft, ChevronRight } from "lucide-react";

const priorityColors: Record<string, string> = { critical: "bg-red-500/20 text-red-400 border-red-500/30", high: "bg-orange-500/20 text-orange-400 border-orange-500/30", medium: "bg-amber-500/20 text-amber-400 border-amber-500/30", low: "bg-muted text-muted-foreground border-border" };

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function TaskCalendar() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(7); // August (0-indexed)
  const [deptFilter, setDeptFilter] = useState("all");

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const filteredTasks = tasks.filter(t => deptFilter === "all" || t.department === deptFilter);

  const getTasksForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return filteredTasks.filter(t => t.dueDate === dateStr);
  };

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const today = new Date();
  const isToday = (day: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Task Calendar</h1><p className="text-muted-foreground">View tasks and deadlines on a calendar</p></div>
        <Select value={deptFilter} onValueChange={setDeptFilter}><SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Departments</SelectItem>{[...new Set(tasks.map(t => t.department))].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card><CardContent className="p-3 text-center"><p className="text-xs text-muted-foreground">Due This Month</p><p className="text-xl font-bold">{filteredTasks.filter(t => t.dueDate.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length}</p></CardContent></Card>
        <Card><CardContent className="p-3 text-center"><p className="text-xs text-muted-foreground">Overdue</p><p className="text-xl font-bold text-red-400">{filteredTasks.filter(t => new Date(t.dueDate) < today && t.status !== "done").length}</p></CardContent></Card>
        <Card><CardContent className="p-3 text-center"><p className="text-xs text-muted-foreground">Critical Tasks</p><p className="text-xl font-bold text-orange-400">{filteredTasks.filter(t => t.priority === "critical" && t.status !== "done").length}</p></CardContent></Card>
        <Card><CardContent className="p-3 text-center"><p className="text-xs text-muted-foreground">Completed</p><p className="text-xl font-bold text-green-400">{filteredTasks.filter(t => t.status === "done").length}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prev}><ChevronLeft className="h-4 w-4" /></Button>
            <CardTitle className="text-lg">{months[month]} {year}</CardTitle>
            <Button variant="ghost" size="icon" onClick={next}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground p-2">{d}</div>
            ))}
            {blanks.map(i => <div key={`blank-${i}`} className="min-h-[80px] bg-muted/20 rounded" />)}
            {days.map(day => {
              const dayTasks = getTasksForDay(day);
              return (
                <div key={day} className={`min-h-[80px] rounded p-1 border ${isToday(day) ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted/30"}`}>
                  <p className={`text-xs font-medium mb-1 ${isToday(day) ? "text-primary" : "text-muted-foreground"}`}>{day}</p>
                  <div className="space-y-0.5">
                    {dayTasks.slice(0, 3).map(task => (
                      <div key={task.id} className={`text-[9px] px-1 py-0.5 rounded truncate border ${priorityColors[task.priority]}`} title={task.title}>
                        {task.title.slice(0, 20)}...
                      </div>
                    ))}
                    {dayTasks.length > 3 && <p className="text-[9px] text-muted-foreground">+{dayTasks.length - 3} more</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader><CardTitle className="text-base">Upcoming Deadlines</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredTasks
              .filter(t => t.status !== "done" && new Date(t.dueDate) >= new Date(today.toISOString().split("T")[0]))
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 8)
              .map(task => (
                <div key={task.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">{task.assigneeAvatar}</div>
                    <div><p className="text-sm font-medium">{task.title}</p><p className="text-xs text-muted-foreground">{task.assignee} · {task.department}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors[task.priority]} variant="secondary">{task.priority}</Badge>
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
