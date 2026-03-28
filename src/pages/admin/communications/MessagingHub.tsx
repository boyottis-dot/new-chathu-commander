import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Megaphone, Send, Users, Mail, Eye } from "lucide-react";
import { threads, announcements, type Thread, type Announcement } from "@/lib/mock-data-messaging";
import { format } from "date-fns";

const MessagingHub = () => {
  const { toast } = useToast();
  const [allThreads] = useState(threads);
  const [allAnnouncements, setAllAnnouncements] = useState(announcements);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", body: "", audience: "all_vendors" });

  const totalUnread = allThreads.reduce((a, t) => a + t.unreadCount, 0);

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    toast({ title: "Message sent", description: `Reply sent in "${selectedThread?.subject}"` });
    setReplyText("");
  };

  const handleSendAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.body) return;
    const audienceLabels: Record<string, string> = {
      all_vendors: "All Vendors", top_vendors: "Top Vendors", new_vendors: "New Vendors",
      all_team: "All Team", department: "Department",
    };
    const ann: Announcement = {
      id: `ANN-${String(allAnnouncements.length + 1).padStart(3, "0")}`,
      title: newAnnouncement.title,
      body: newAnnouncement.body,
      audience: newAnnouncement.audience as Announcement["audience"],
      audienceLabel: audienceLabels[newAnnouncement.audience] || newAnnouncement.audience,
      sentAt: new Date().toISOString(),
      readCount: 0,
      totalRecipients: newAnnouncement.audience === "all_vendors" ? 186 : 52,
      author: "Admin",
    };
    setAllAnnouncements([ann, ...allAnnouncements]);
    setNewAnnouncement({ title: "", body: "", audience: "all_vendors" });
    toast({ title: "Announcement sent", description: `"${ann.title}" sent to ${ann.audienceLabel}` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messaging Hub</h1>
          <p className="text-muted-foreground">Internal communications, vendor messaging, and announcements</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Megaphone className="h-4 w-4 mr-2" />New Announcement</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Broadcast Announcement</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={newAnnouncement.title} onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})} placeholder="Announcement title" /></div>
              <div><Label>Message</Label><Textarea value={newAnnouncement.body} onChange={e => setNewAnnouncement({...newAnnouncement, body: e.target.value})} placeholder="Write your announcement..." rows={4} /></div>
              <div>
                <Label>Audience</Label>
                <Select value={newAnnouncement.audience} onValueChange={v => setNewAnnouncement({...newAnnouncement, audience: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_vendors">All Vendors</SelectItem>
                    <SelectItem value="top_vendors">Top Vendors</SelectItem>
                    <SelectItem value="new_vendors">New Vendors</SelectItem>
                    <SelectItem value="all_team">All Team Members</SelectItem>
                    <SelectItem value="department">Specific Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSendAnnouncement} className="w-full"><Send className="h-4 w-4 mr-2" />Send Announcement</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><MessageSquare className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{allThreads.filter(t => t.status === "active").length}</p>
                <p className="text-xs text-muted-foreground">Active Threads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10"><Mail className="h-5 w-5 text-destructive" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalUnread}</p>
                <p className="text-xs text-muted-foreground">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary"><Megaphone className="h-5 w-5 text-muted-foreground" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{allAnnouncements.length}</p>
                <p className="text-xs text-muted-foreground">Announcements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader><CardTitle className="text-sm">Conversations</CardTitle></CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {allThreads.map(thread => (
                      <button
                        key={thread.id}
                        onClick={() => setSelectedThread(thread)}
                        className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${selectedThread?.id === thread.id ? "bg-muted" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{thread.subject}</p>
                          {thread.unreadCount > 0 && (
                            <Badge variant="destructive" className="shrink-0 text-[10px] h-5">{thread.unreadCount}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{thread.lastMessage}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-[10px]">{thread.participantType}</Badge>
                          <span className="text-[10px] text-muted-foreground">{format(new Date(thread.lastMessageAt), "MMM d, h:mm a")}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="pt-6 h-full flex flex-col">
                  {selectedThread ? (
                    <>
                      <div className="mb-4">
                        <h3 className="font-semibold text-foreground">{selectedThread.subject}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{selectedThread.participants.join(", ")}</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-muted/30 rounded-lg p-4 mb-4 min-h-[200px]">
                        <div className="bg-card rounded-lg p-3 max-w-[80%] shadow-sm">
                          <p className="text-sm">{selectedThread.lastMessage}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{format(new Date(selectedThread.lastMessageAt), "MMM d, h:mm a")}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type a reply..." onKeyDown={e => e.key === "Enter" && handleSendReply()} />
                        <Button onClick={handleSendReply}><Send className="h-4 w-4" /></Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Select a conversation to view messages</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Read Rate</TableHead>
                    <TableHead>Author</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAnnouncements.map(ann => (
                    <TableRow key={ann.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ann.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{ann.body}</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{ann.audienceLabel}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{format(new Date(ann.sentAt), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{ann.readCount}/{ann.totalRecipients}</span>
                          <span className="text-xs text-muted-foreground">({Math.round((ann.readCount / ann.totalRecipients) * 100)}%)</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{ann.author}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessagingHub;
