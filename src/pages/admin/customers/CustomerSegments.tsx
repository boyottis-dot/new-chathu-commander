import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Bell, Send } from "lucide-react";
import { customers, customerSegments } from "@/lib/mock-data-customers";
import { useToast } from "@/hooks/use-toast";

export default function CustomerSegments() {
  const { toast } = useToast();
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [notifDialog, setNotifDialog] = useState<string | null>(null);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");

  const segmentCustomers = selectedSegment
    ? customers.filter(c => c.segment.includes(selectedSegment))
    : [];

  const sendNotification = () => {
    toast({ title: `Notification sent to ${notifDialog} segment` });
    setNotifDialog(null);
    setNotifTitle("");
    setNotifMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customer Segments</h1>
        <p className="text-muted-foreground text-sm">View and manage customer groups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customerSegments.map(seg => (
          <Card key={seg.name} className={`border-border cursor-pointer transition-all hover:border-primary/40 ${selectedSegment === seg.name ? "ring-1 ring-primary" : ""}`} onClick={() => setSelectedSegment(selectedSegment === seg.name ? null : seg.name)}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-secondary"><Users className="w-5 h-5" style={{ color: seg.color }} /></div>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={e => { e.stopPropagation(); setNotifDialog(seg.name); }}>
                  <Bell className="w-3 h-3 mr-1" />Notify
                </Button>
              </div>
              <h3 className="font-semibold">{seg.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{seg.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline" style={{ borderColor: seg.color, color: seg.color }}>{seg.count} customers</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSegment && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">{selectedSegment}</CardTitle>
            <CardDescription>{segmentCustomers.length} customers in this segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {segmentCustomers.map(c => (
                <div key={c.id} className="flex items-center justify-between bg-secondary rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-primary/20"><AvatarFallback className="bg-primary/20 text-primary text-xs">{c.avatar}</AvatarFallback></Avatar>
                    <div><p className="font-medium text-sm">{c.name}</p><p className="text-xs text-muted-foreground">{c.email}</p></div>
                  </div>
                  <div className="text-right text-sm"><p className="font-medium">{c.totalOrders} orders</p><p className="text-xs text-muted-foreground">MWK {c.totalSpend.toLocaleString()}</p></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={!!notifDialog} onOpenChange={() => setNotifDialog(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Send Notification to {notifDialog}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input placeholder="Notification title" value={notifTitle} onChange={e => setNotifTitle(e.target.value)} className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Message</Label><Textarea placeholder="Type your message..." value={notifMessage} onChange={e => setNotifMessage(e.target.value)} className="bg-secondary border-border" rows={4} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotifDialog(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={sendNotification}><Send className="w-4 h-4 mr-2" />Send Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
