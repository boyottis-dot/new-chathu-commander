import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Zap, ShoppingCart, UserPlus, Star, RotateCcw, Truck, CreditCard, AlertTriangle, Edit } from "lucide-react";
import { toast } from "sonner";

interface AutoRule {
  id: string;
  name: string;
  trigger: string;
  icon: React.ElementType;
  description: string;
  template: string;
  enabled: boolean;
  sent7d: number;
}

const initialRules: AutoRule[] = [
  { id: "R1", name: "Welcome Email", trigger: "user_signup", icon: UserPlus, description: "Sent when a new user creates an account", template: "Welcome to Chathu! Start exploring vendors near you.", enabled: true, sent7d: 142 },
  { id: "R2", name: "Order Confirmation", trigger: "order_placed", icon: ShoppingCart, description: "Sent when an order is successfully placed", template: "Your order #{{order_id}} has been confirmed!", enabled: true, sent7d: 567 },
  { id: "R3", name: "Delivery Update", trigger: "delivery_status_change", icon: Truck, description: "Sent when delivery status changes", template: "Your order is now {{status}}.", enabled: true, sent7d: 834 },
  { id: "R4", name: "Review Reminder", trigger: "order_delivered_3d", icon: Star, description: "Sent 3 days after order delivery", template: "How was your order? Leave a review!", enabled: false, sent7d: 0 },
  { id: "R5", name: "Refund Processed", trigger: "refund_approved", icon: RotateCcw, description: "Sent when a refund is approved", template: "Your refund of MWK {{amount}} has been processed.", enabled: true, sent7d: 23 },
  { id: "R6", name: "Payout Sent", trigger: "vendor_payout", icon: CreditCard, description: "Sent to vendor when payout is released", template: "Your payout of MWK {{amount}} has been sent.", enabled: true, sent7d: 45 },
  { id: "R7", name: "Low Stock Alert", trigger: "product_low_stock", icon: AlertTriangle, description: "Sent to vendor when product stock is below threshold", template: "{{product}} is running low ({{stock}} left).", enabled: true, sent7d: 18 },
  { id: "R8", name: "Account Suspended", trigger: "vendor_suspended", icon: AlertTriangle, description: "Sent when a vendor account is suspended", template: "Your vendor account has been suspended. Contact support.", enabled: true, sent7d: 2 },
];

export default function AutomationRules() {
  const [rules, setRules] = useState(initialRules);
  const [editRule, setEditRule] = useState<AutoRule | null>(null);
  const [editTemplate, setEditTemplate] = useState("");

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    const rule = rules.find(r => r.id === id)!;
    toast.success(`${rule.name} ${rule.enabled ? "disabled" : "enabled"}`);
  };

  const handleEditSave = () => {
    if (!editRule) return;
    setRules(prev => prev.map(r => r.id === editRule.id ? { ...r, template: editTemplate } : r));
    toast.success("Template updated");
    setEditRule(null);
  };

  const activeCount = rules.filter(r => r.enabled).length;
  const totalSent = rules.reduce((s, r) => s + r.sent7d, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Automation Rules</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage automated notification triggers and templates</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Rules</p>
              <p className="text-xl font-bold text-foreground">{rules.length}</p>
            </div>
            <Zap className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-xl font-bold text-emerald-400">{activeCount}</p>
            </div>
            <Zap className="h-5 w-5 text-emerald-400" />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Sent (7d)</p>
              <p className="text-xl font-bold text-foreground">{totalSent.toLocaleString()}</p>
            </div>
            <Zap className="h-5 w-5 text-blue-400" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map(rule => (
          <Card key={rule.id} className={`bg-card border-border transition-opacity ${!rule.enabled ? "opacity-60" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <rule.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{rule.name}</p>
                    <p className="text-xs text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
                <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
              </div>
              <div className="rounded-lg bg-secondary p-3 mb-3">
                <p className="text-xs text-muted-foreground font-mono">{rule.template}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-border">{rule.trigger}</Badge>
                  {rule.sent7d > 0 && (
                    <span className="text-xs text-muted-foreground">{rule.sent7d} sent (7d)</span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setEditRule(rule); setEditTemplate(rule.template); }}>
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editRule} onOpenChange={() => setEditRule(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Edit Template: {editRule?.name}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Template Message</Label>
              <Textarea value={editTemplate} onChange={e => setEditTemplate(e.target.value)} rows={4} className="bg-secondary border-border font-mono text-sm" />
            </div>
            <p className="text-xs text-muted-foreground">Use {"{{variable}}"} for dynamic content like {"{{order_id}}"}, {"{{amount}}"}, {"{{product}}"}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRule(null)}>Cancel</Button>
            <Button onClick={handleEditSave}>Save Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
