import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plug, CreditCard, Truck, MessageSquare, Mail, BarChart3, Shield, Globe } from "lucide-react";
import { toast } from "sonner";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "connected" | "disconnected" | "error";
  enabled: boolean;
  lastSync?: string;
}

const integrations: Integration[] = [
  { id: "I1", name: "Airtel Money", description: "Mobile money payments for Malawi", icon: CreditCard, status: "connected", enabled: true, lastSync: "2 min ago" },
  { id: "I2", name: "TNM Mpamba", description: "TNM mobile money integration", icon: CreditCard, status: "connected", enabled: true, lastSync: "5 min ago" },
  { id: "I3", name: "DHL Express", description: "International shipping & tracking", icon: Truck, status: "connected", enabled: true, lastSync: "1 hr ago" },
  { id: "I4", name: "Local Courier API", description: "Domestic delivery partner", icon: Truck, status: "connected", enabled: true, lastSync: "30 min ago" },
  { id: "I5", name: "Firebase Cloud Messaging", description: "Push notification delivery", icon: MessageSquare, status: "connected", enabled: true, lastSync: "Real-time" },
  { id: "I6", name: "SendGrid", description: "Transactional email service", icon: Mail, status: "error", enabled: true, lastSync: "Failed 2hr ago" },
  { id: "I7", name: "Google Analytics", description: "Website & app analytics", icon: BarChart3, status: "connected", enabled: true, lastSync: "Real-time" },
  { id: "I8", name: "Cloudflare", description: "CDN & DDoS protection", icon: Shield, status: "connected", enabled: true, lastSync: "Active" },
  { id: "I9", name: "WhatsApp Business", description: "Customer communication channel", icon: MessageSquare, status: "disconnected", enabled: false },
  { id: "I10", name: "Custom Webhook", description: "Send events to external endpoints", icon: Globe, status: "disconnected", enabled: false },
];

const statusColors: Record<string, string> = {
  connected: "bg-emerald-500/20 text-emerald-400",
  disconnected: "bg-muted text-muted-foreground",
  error: "bg-destructive/20 text-destructive",
};

export default function ApiIntegrations() {
  const connected = integrations.filter(i => i.status === "connected").length;
  const errors = integrations.filter(i => i.status === "error").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">API & Integrations</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage third-party service connections</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div><p className="text-xs text-muted-foreground">Connected</p><p className="text-xl font-bold text-emerald-400">{connected}</p></div>
            <Plug className="h-5 w-5 text-emerald-400" />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div><p className="text-xs text-muted-foreground">Disconnected</p><p className="text-xl font-bold text-muted-foreground">{integrations.length - connected - errors}</p></div>
            <Plug className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div><p className="text-xs text-muted-foreground">Errors</p><p className="text-xl font-bold text-destructive">{errors}</p></div>
            <Plug className="h-5 w-5 text-destructive" />
          </CardContent>
        </Card>
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
                    <p className="text-sm font-semibold text-foreground">{int.name}</p>
                    <p className="text-xs text-muted-foreground">{int.description}</p>
                  </div>
                </div>
                <Switch checked={int.enabled} onCheckedChange={() => toast.success(`${int.name} toggled`)} />
              </div>
              <div className="flex items-center justify-between mt-4">
                <Badge className={statusColors[int.status]}>{int.status}</Badge>
                {int.lastSync && <span className="text-xs text-muted-foreground">Sync: {int.lastSync}</span>}
              </div>
              {int.status === "error" && (
                <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toast.success("Reconnecting...")}>
                  Reconnect
                </Button>
              )}
              {int.status === "disconnected" && (
                <Button size="sm" className="mt-3 w-full" onClick={() => toast.success("Setting up...")}>
                  Connect
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
