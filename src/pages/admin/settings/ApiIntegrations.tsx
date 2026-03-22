import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plug, CreditCard, Truck, MessageSquare, Mail, BarChart3, Shield, Globe, Plus, Pencil, Trash2, TestTube, Webhook, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "connected" | "disconnected" | "error";
  enabled: boolean;
  lastSync?: string;
  type: "built-in" | "custom";
  apiEndpoint?: string;
}

interface OutgoingWebhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  lastTriggered?: string;
  successRate: number;
}

const initialIntegrations: Integration[] = [
  { id: "I1", name: "Airtel Money", description: "Mobile money payments for Malawi", icon: CreditCard, status: "connected", enabled: true, lastSync: "2 min ago", type: "built-in" },
  { id: "I2", name: "TNM Mpamba", description: "TNM mobile money integration", icon: CreditCard, status: "connected", enabled: true, lastSync: "5 min ago", type: "built-in" },
  { id: "I3", name: "DHL Express", description: "International shipping & tracking", icon: Truck, status: "connected", enabled: true, lastSync: "1 hr ago", type: "built-in" },
  { id: "I4", name: "Local Courier API", description: "Domestic delivery partner", icon: Truck, status: "connected", enabled: true, lastSync: "30 min ago", type: "built-in" },
  { id: "I5", name: "Firebase Cloud Messaging", description: "Push notification delivery", icon: MessageSquare, status: "connected", enabled: true, lastSync: "Real-time", type: "built-in" },
  { id: "I6", name: "SendGrid", description: "Transactional email service", icon: Mail, status: "error", enabled: true, lastSync: "Failed 2hr ago", type: "built-in" },
  { id: "I7", name: "Google Analytics", description: "Website & app analytics", icon: BarChart3, status: "connected", enabled: true, lastSync: "Real-time", type: "built-in" },
  { id: "I8", name: "Cloudflare", description: "CDN & DDoS protection", icon: Shield, status: "connected", enabled: true, lastSync: "Active", type: "built-in" },
  { id: "I9", name: "WhatsApp Business", description: "Customer communication channel", icon: MessageSquare, status: "disconnected", enabled: false, type: "built-in" },
  { id: "I10", name: "Custom Webhook", description: "Send events to external endpoints", icon: Globe, status: "disconnected", enabled: false, type: "built-in" },
];

const initialWebhooks: OutgoingWebhook[] = [
  { id: "WH-001", name: "Order Events to ERP", url: "https://erp.company.com/webhooks/orders", events: ["order.placed", "order.delivered", "order.cancelled"], active: true, lastTriggered: "5 min ago", successRate: 98.5 },
  { id: "WH-002", name: "Refund Alerts to Slack", url: "https://hooks.slack.com/services/T00/B00/xxx", events: ["refund.approved", "refund.disputed"], active: true, lastTriggered: "2 hours ago", successRate: 100 },
];

const statusColors: Record<string, string> = {
  connected: "bg-emerald-500/20 text-emerald-400",
  disconnected: "bg-muted text-muted-foreground",
  error: "bg-destructive/20 text-destructive",
};

const availableEvents = [
  "order.placed", "order.delivered", "order.cancelled", "order.shipped",
  "refund.requested", "refund.approved", "refund.rejected", "refund.disputed",
  "vendor.signup", "vendor.suspended", "vendor.payout",
  "product.approved", "product.rejected", "product.low_stock",
  "customer.signup", "customer.purchase",
];

export default function ApiIntegrations() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [webhooks, setWebhooks] = useState(initialWebhooks);
  const [showAddIntegration, setShowAddIntegration] = useState(false);
  const [showAddWebhook, setShowAddWebhook] = useState(false);

  const [intForm, setIntForm] = useState({ name: "", description: "", type: "REST API", baseUrl: "", apiKey: "" });
  const [whForm, setWhForm] = useState({ name: "", url: "", events: [] as string[] });

  const connected = integrations.filter(i => i.status === "connected").length;
  const errors = integrations.filter(i => i.status === "error").length;

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i));
    toast.success("Integration toggled");
  };

  const addIntegration = () => {
    if (!intForm.name.trim()) return;
    setIntegrations(prev => [...prev, {
      id: `I${Date.now()}`,
      name: intForm.name,
      description: intForm.description,
      icon: Globe,
      status: "disconnected",
      enabled: false,
      type: "custom",
      apiEndpoint: intForm.baseUrl,
    }]);
    setIntForm({ name: "", description: "", type: "REST API", baseUrl: "", apiKey: "" });
    setShowAddIntegration(false);
    toast.success("Integration added");
  };

  const deleteIntegration = (id: string) => {
    setIntegrations(prev => prev.filter(i => i.id !== id));
    toast.success("Integration removed");
  };

  const addWebhook = () => {
    if (!whForm.name.trim() || !whForm.url.trim()) return;
    setWebhooks(prev => [...prev, {
      id: `WH-${String(prev.length + 1).padStart(3, "0")}`,
      name: whForm.name,
      url: whForm.url,
      events: whForm.events,
      active: true,
      successRate: 100,
    }]);
    setWhForm({ name: "", url: "", events: [] });
    setShowAddWebhook(false);
    toast.success("Webhook created");
  };

  const toggleWebhook = (id: string) => {
    setWebhooks(prev => prev.map(w => w.id === id ? { ...w, active: !w.active } : w));
    toast.success("Webhook toggled");
  };

  const toggleEvent = (event: string) => {
    setWhForm(prev => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">API & Integrations</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage service connections and outgoing webhooks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border"><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Connected</p><p className="text-xl font-bold text-emerald-400">{connected}</p></div><Plug className="h-5 w-5 text-emerald-400" /></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Disconnected</p><p className="text-xl font-bold text-muted-foreground">{integrations.length - connected - errors}</p></div><Plug className="h-5 w-5 text-muted-foreground" /></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Errors</p><p className="text-xl font-bold text-destructive">{errors}</p></div><Plug className="h-5 w-5 text-destructive" /></CardContent></Card>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList className="bg-secondary border border-border h-9">
          <TabsTrigger value="integrations" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Integrations ({integrations.length})</TabsTrigger>
          <TabsTrigger value="webhooks" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Webhooks ({webhooks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddIntegration(true)}>
              <Plus className="h-3.5 w-3.5" /> Add Integration
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map(int => (
              <Card key={int.id} className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <int.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{int.name}</p>
                          {int.type === "custom" && <Badge variant="outline" className="text-[9px] border-border">Custom</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{int.description}</p>
                      </div>
                    </div>
                    <Switch checked={int.enabled} onCheckedChange={() => toggleIntegration(int.id)} />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Badge className={statusColors[int.status]}>{int.status}</Badge>
                    <div className="flex items-center gap-2">
                      {int.lastSync && <span className="text-xs text-muted-foreground">Sync: {int.lastSync}</span>}
                      {int.type === "custom" && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteIntegration(int.id)}><Trash2 className="h-3 w-3" /></Button>
                      )}
                    </div>
                  </div>
                  {int.status === "error" && (
                    <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toast.success("Reconnecting...")}>Reconnect</Button>
                  )}
                  {int.status === "disconnected" && (
                    <Button size="sm" className="mt-3 w-full bg-primary text-primary-foreground" onClick={() => toast.success("Setting up...")}>Connect</Button>
                  )}
                  {int.status === "connected" && (
                    <Button variant="outline" size="sm" className="mt-3 w-full gap-1.5 border-border" onClick={() => toast.success("Connection verified ✓")}>
                      <TestTube className="h-3.5 w-3.5" /> Test Connection
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{webhooks.length} outgoing webhooks</p>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowAddWebhook(true)}>
              <Plus className="h-3.5 w-3.5" /> Add Webhook
            </Button>
          </div>

          {webhooks.map(wh => (
            <Card key={wh.id} className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Webhook className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{wh.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono truncate max-w-sm">{wh.url}</p>
                    </div>
                  </div>
                  <Switch checked={wh.active} onCheckedChange={() => toggleWebhook(wh.id)} />
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {wh.events.map(e => (
                    <Badge key={e} variant="outline" className="text-[10px] border-border">{e}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {wh.lastTriggered && <span>Last: {wh.lastTriggered}</span>}
                    <span>Success: <span className="text-emerald-400 font-medium">{wh.successRate}%</span></span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.success("Test payload sent")}>Test</Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { setWebhooks(prev => prev.filter(w => w.id !== wh.id)); toast.success("Webhook deleted"); }}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Add Integration Dialog */}
      <Dialog open={showAddIntegration} onOpenChange={setShowAddIntegration}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Add Custom Integration</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1"><Label className="text-xs">Integration Name</Label><Input value={intForm.name} onChange={e => setIntForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. Custom CRM" /></div>
            <div className="space-y-1"><Label className="text-xs">Description</Label><Input value={intForm.description} onChange={e => setIntForm(p => ({ ...p, description: e.target.value }))} className="bg-secondary border-border h-9" placeholder="What this integration does" /></div>
            <div className="space-y-1">
              <Label className="text-xs">Type</Label>
              <Select value={intForm.type} onValueChange={v => setIntForm(p => ({ ...p, type: v }))}>
                <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="REST API">REST API</SelectItem><SelectItem value="Webhook">Webhook</SelectItem><SelectItem value="OAuth">OAuth</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-1"><Label className="text-xs">Base URL</Label><Input value={intForm.baseUrl} onChange={e => setIntForm(p => ({ ...p, baseUrl: e.target.value }))} className="bg-secondary border-border h-9" placeholder="https://api.service.com/v1" /></div>
            <div className="space-y-1"><Label className="text-xs">API Key</Label><Input type="password" value={intForm.apiKey} onChange={e => setIntForm(p => ({ ...p, apiKey: e.target.value }))} className="bg-secondary border-border h-9" placeholder="sk_live_..." /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAddIntegration(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={addIntegration}>Add Integration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Webhook Dialog */}
      <Dialog open={showAddWebhook} onOpenChange={setShowAddWebhook}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader><DialogTitle>Create Outgoing Webhook</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1"><Label className="text-xs">Webhook Name</Label><Input value={whForm.name} onChange={e => setWhForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. Order Events to ERP" /></div>
            <div className="space-y-1"><Label className="text-xs">Endpoint URL</Label><Input value={whForm.url} onChange={e => setWhForm(p => ({ ...p, url: e.target.value }))} className="bg-secondary border-border h-9" placeholder="https://your-service.com/webhook" /></div>
            <div className="space-y-1">
              <Label className="text-xs">Subscribe to Events</Label>
              <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto p-2 bg-secondary rounded-lg">
                {availableEvents.map(event => (
                  <Button
                    key={event}
                    variant={whForm.events.includes(event) ? "default" : "outline"}
                    size="sm"
                    className={`text-[10px] h-7 ${whForm.events.includes(event) ? "bg-primary text-primary-foreground" : "border-border"}`}
                    onClick={() => toggleEvent(event)}
                  >
                    {event}
                  </Button>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">{whForm.events.length} events selected</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAddWebhook(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={addWebhook}>Create Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
