import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Zap, ShoppingCart, UserPlus, Star, RotateCcw, Truck, CreditCard, AlertTriangle, Edit, Plus, Copy, Trash2 } from "lucide-react";
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
  actionType: string;
  delay: string;
  conditions: { field: string; operator: string; value: string }[];
}

const triggerOptions = [
  "user_signup", "order_placed", "order_delivered", "delivery_status_change",
  "order_delivered_3d", "refund_approved", "vendor_payout", "product_low_stock",
  "vendor_suspended", "product_approved", "product_rejected", "new_follower",
  "custom",
];

const initialRules: AutoRule[] = [
  { id: "R1", name: "Welcome Email", trigger: "user_signup", icon: UserPlus, description: "Sent when a new user creates an account", template: "Welcome to Chathu! Start exploring vendors near you.", enabled: true, sent7d: 142, actionType: "email", delay: "immediate", conditions: [] },
  { id: "R2", name: "Order Confirmation", trigger: "order_placed", icon: ShoppingCart, description: "Sent when an order is successfully placed", template: "Your order #{{order_id}} has been confirmed!", enabled: true, sent7d: 567, actionType: "in-app", delay: "immediate", conditions: [] },
  { id: "R3", name: "Delivery Update", trigger: "delivery_status_change", icon: Truck, description: "Sent when delivery status changes", template: "Your order is now {{status}}.", enabled: true, sent7d: 834, actionType: "push", delay: "immediate", conditions: [] },
  { id: "R4", name: "Review Reminder", trigger: "order_delivered_3d", icon: Star, description: "Sent 3 days after order delivery", template: "How was your order? Leave a review!", enabled: false, sent7d: 0, actionType: "email", delay: "3d", conditions: [{ field: "order_amount", operator: ">", value: "5000" }] },
  { id: "R5", name: "Refund Processed", trigger: "refund_approved", icon: RotateCcw, description: "Sent when a refund is approved", template: "Your refund of MWK {{amount}} has been processed.", enabled: true, sent7d: 23, actionType: "email", delay: "immediate", conditions: [] },
  { id: "R6", name: "Payout Sent", trigger: "vendor_payout", icon: CreditCard, description: "Sent to vendor when payout is released", template: "Your payout of MWK {{amount}} has been sent.", enabled: true, sent7d: 45, actionType: "email", delay: "immediate", conditions: [] },
  { id: "R7", name: "Low Stock Alert", trigger: "product_low_stock", icon: AlertTriangle, description: "Sent to vendor when product stock is below threshold", template: "{{product}} is running low ({{stock}} left).", enabled: true, sent7d: 18, actionType: "in-app", delay: "immediate", conditions: [{ field: "stock", operator: "<", value: "10" }] },
  { id: "R8", name: "Account Suspended", trigger: "vendor_suspended", icon: AlertTriangle, description: "Sent when a vendor account is suspended", template: "Your vendor account has been suspended. Contact support.", enabled: true, sent7d: 2, actionType: "email", delay: "immediate", conditions: [] },
];

export default function AutomationRules() {
  const [rules, setRules] = useState(initialRules);
  const [editRule, setEditRule] = useState<AutoRule | null>(null);
  const [editTemplate, setEditTemplate] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "", trigger: "order_placed", description: "", template: "",
    actionType: "in-app", delay: "immediate", conditions: [] as { field: string; operator: string; value: string }[],
  });
  const [newCondition, setNewCondition] = useState({ field: "", operator: ">", value: "" });

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

  const duplicateRule = (rule: AutoRule) => {
    setRules(prev => [...prev, { ...rule, id: `R${Date.now()}`, name: `${rule.name} (Copy)`, enabled: false, sent7d: 0 }]);
    toast.success("Rule duplicated");
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
    toast.success("Rule deleted");
  };

  const createRule = () => {
    if (!newRule.name.trim()) return;
    setRules(prev => [...prev, {
      id: `R${Date.now()}`,
      name: newRule.name,
      trigger: newRule.trigger,
      icon: Zap,
      description: newRule.description,
      template: newRule.template,
      enabled: true,
      sent7d: 0,
      actionType: newRule.actionType,
      delay: newRule.delay,
      conditions: newRule.conditions,
    }]);
    setNewRule({ name: "", trigger: "order_placed", description: "", template: "", actionType: "in-app", delay: "immediate", conditions: [] });
    setShowCreate(false);
    toast.success("Automation rule created");
  };

  const addCondition = () => {
    if (!newCondition.field.trim()) return;
    setNewRule(prev => ({ ...prev, conditions: [...prev.conditions, { ...newCondition }] }));
    setNewCondition({ field: "", operator: ">", value: "" });
  };

  const activeCount = rules.filter(r => r.enabled).length;
  const totalSent = rules.reduce((s, r) => s + r.sent7d, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Automation Rules</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage automated notification triggers and templates</p>
        </div>
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowCreate(true)}>
          <Plus className="h-3.5 w-3.5" /> New Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border"><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Total Rules</p><p className="text-xl font-bold text-foreground">{rules.length}</p></div><Zap className="h-5 w-5 text-primary" /></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Active</p><p className="text-xl font-bold text-emerald-400">{activeCount}</p></div><Zap className="h-5 w-5 text-emerald-400" /></CardContent></Card>
        <Card className="bg-card border-border"><CardContent className="p-4 flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Sent (7d)</p><p className="text-xl font-bold text-foreground">{totalSent.toLocaleString()}</p></div><Zap className="h-5 w-5 text-blue-400" /></CardContent></Card>
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
              {rule.conditions.length > 0 && (
                <div className="mb-3 space-y-1">
                  {rule.conditions.map((c, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] border-border mr-1">
                      {c.field} {c.operator} {c.value}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs border-border">{rule.trigger}</Badge>
                  <Badge variant="outline" className="text-[10px] border-border">{rule.actionType}</Badge>
                  {rule.delay !== "immediate" && <Badge variant="outline" className="text-[10px] border-border">Delay: {rule.delay}</Badge>}
                  {rule.sent7d > 0 && <span className="text-xs text-muted-foreground">{rule.sent7d} sent (7d)</span>}
                </div>
                <div className="flex gap-0.5">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditRule(rule); setEditTemplate(rule.template); }}><Edit className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => duplicateRule(rule)}><Copy className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteRule(rule.id)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Template Dialog */}
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

      {/* Create Rule Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle>Create Automation Rule</DialogTitle></DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1"><Label className="text-xs">Rule Name</Label><Input value={newRule.name} onChange={e => setNewRule(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. Abandoned Cart Reminder" /></div>
            <div className="space-y-1"><Label className="text-xs">Description</Label><Input value={newRule.description} onChange={e => setNewRule(p => ({ ...p, description: e.target.value }))} className="bg-secondary border-border h-9" placeholder="What triggers this rule" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Trigger Event</Label>
                <Select value={newRule.trigger} onValueChange={v => setNewRule(p => ({ ...p, trigger: v }))}>
                  <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>{triggerOptions.map(t => <SelectItem key={t} value={t}>{t.replace(/_/g, " ")}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Action Type</Label>
                <Select value={newRule.actionType} onValueChange={v => setNewRule(p => ({ ...p, actionType: v }))}>
                  <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="in-app">In-App</SelectItem><SelectItem value="push">Push Notification</SelectItem><SelectItem value="email">Email</SelectItem><SelectItem value="webhook">Webhook</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Delay</Label>
              <Select value={newRule.delay} onValueChange={v => setNewRule(p => ({ ...p, delay: v }))}>
                <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                  <SelectItem value="3d">3 Days</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Template Message</Label>
              <Textarea value={newRule.template} onChange={e => setNewRule(p => ({ ...p, template: e.target.value }))} className="bg-secondary border-border font-mono text-sm min-h-[60px]" placeholder="Use {{variable}} for dynamic content" />
            </div>

            <Separator className="bg-border" />

            <div className="space-y-2">
              <Label className="text-xs">Conditions (optional)</Label>
              {newRule.conditions.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs bg-secondary rounded px-2 py-1.5">
                  <span>{c.field} {c.operator} {c.value}</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto text-destructive" onClick={() => setNewRule(p => ({ ...p, conditions: p.conditions.filter((_, idx) => idx !== i) }))}>
                    <Trash2 className="h-2.5 w-2.5" />
                  </Button>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-2">
                <Input value={newCondition.field} onChange={e => setNewCondition(p => ({ ...p, field: e.target.value }))} className="bg-secondary border-border h-8 text-xs" placeholder="Field" />
                <Select value={newCondition.operator} onValueChange={v => setNewCondition(p => ({ ...p, operator: v }))}>
                  <SelectTrigger className="bg-secondary border-border h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="=">= Equals</SelectItem><SelectItem value=">">{">"} Greater</SelectItem><SelectItem value="<">{"<"} Less</SelectItem><SelectItem value="contains">Contains</SelectItem></SelectContent>
                </Select>
                <Input value={newCondition.value} onChange={e => setNewCondition(p => ({ ...p, value: e.target.value }))} className="bg-secondary border-border h-8 text-xs" placeholder="Value" />
                <Button size="sm" variant="outline" className="h-8 text-xs border-border" onClick={addCondition}>+ Add</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={createRule}>Create Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
