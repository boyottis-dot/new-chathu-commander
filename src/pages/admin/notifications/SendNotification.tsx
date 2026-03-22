import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Send, Users, UserCheck, Store, Bell, Clock, Megaphone } from "lucide-react";
import { toast } from "sonner";

const targetOptions = [
  { value: "all_users", label: "All Users", icon: Users, count: 12450 },
  { value: "all_vendors", label: "All Vendors", icon: Store, count: 87 },
  { value: "new_customers", label: "New Customers (30d)", icon: UserCheck, count: 342 },
  { value: "inactive_users", label: "Inactive Users (90d+)", icon: Users, count: 1205 },
  { value: "vip_customers", label: "VIP Customers", icon: UserCheck, count: 156 },
];

const typeOptions = [
  { value: "push", label: "Push Notification" },
  { value: "in_app", label: "In-App" },
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
];

export default function SendNotification() {
  const [target, setTarget] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");

  const selectedTarget = targetOptions.find(t => t.value === target);

  const handleSend = () => {
    if (!target || !type || !title || !message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success(schedule ? "Notification scheduled successfully" : "Notification sent successfully", {
      description: `${selectedTarget?.label} • ${selectedTarget?.count.toLocaleString()} recipients`,
    });
    setTarget(""); setType(""); setTitle(""); setMessage("");
    setSchedule(false); setScheduleDate("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Send Notification</h1>
        <p className="text-muted-foreground text-sm mt-1">Compose and send notifications to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-foreground text-base">Target Audience</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  {targetOptions.map(t => (
                    <SelectItem key={t.value} value={t.value}>
                      <span className="flex items-center gap-2">
                        <t.icon className="h-4 w-4" />
                        {t.label}
                        <Badge variant="secondary" className="ml-2 text-xs">{t.count.toLocaleString()}</Badge>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTarget && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <Megaphone className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">
                    This will reach <strong>{selectedTarget.count.toLocaleString()}</strong> {selectedTarget.label.toLowerCase()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-foreground text-base">Notification Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Notification Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map(t => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Notification title" className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your notification message..." rows={4} className="bg-secondary border-border" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-foreground text-base">Scheduling</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label>Schedule for later</Label>
                </div>
                <Switch checked={schedule} onCheckedChange={setSchedule} />
              </div>
              {schedule && (
                <Input type="datetime-local" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="bg-secondary border-border" />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-foreground text-base">Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-lg bg-secondary p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">CHATHU</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{title || "Notification Title"}</p>
                <p className="text-xs text-muted-foreground">{message || "Your notification message will appear here..."}</p>
                <p className="text-[10px] text-muted-foreground mt-2">Just now</p>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSend} className="w-full" size="lg">
            <Send className="h-4 w-4 mr-2" />
            {schedule ? "Schedule Notification" : "Send Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
