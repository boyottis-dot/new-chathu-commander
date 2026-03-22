import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { referralPrograms, ReferralProgram } from "@/lib/mock-data-referrals";
import { Plus, Gift, Percent, Truck as TruckIcon, DollarSign, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const rewardIcons: Record<string, React.ElementType> = {
  percentage: Percent, fixed: DollarSign, free_shipping: TruckIcon, cashback: DollarSign,
};

const rewardColors: Record<string, string> = {
  percentage: "text-blue-400 border-blue-400/30",
  fixed: "text-emerald-400 border-emerald-400/30",
  free_shipping: "text-purple-400 border-purple-400/30",
  cashback: "text-primary border-primary/30",
};

export default function ReferralPrograms() {
  const [programs, setPrograms] = useState<ReferralProgram[]>(referralPrograms);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: "", rewardType: "percentage" as ReferralProgram["rewardType"],
    referrerReward: "", refereeReward: "", minOrderValue: "",
    maxUses: "", expiry: "", targetSegment: "All Customers",
  });

  const activePrograms = programs.filter(p => p.active);
  const totalConversions = programs.reduce((s, p) => s + p.conversions, 0);
  const totalRevenue = programs.reduce((s, p) => s + p.revenueGenerated, 0);

  const createProgram = () => {
    if (!form.name.trim()) return;
    setPrograms(prev => [...prev, {
      id: `RP-${String(prev.length + 1).padStart(3, "0")}`,
      name: form.name,
      rewardType: form.rewardType,
      referrerReward: form.referrerReward,
      refereeReward: form.refereeReward,
      minOrderValue: Number(form.minOrderValue) || 0,
      maxUses: Number(form.maxUses) || 100,
      usedCount: 0,
      expiry: form.expiry,
      targetSegment: form.targetSegment,
      active: true,
      totalReferrals: 0, conversions: 0, revenueGenerated: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    }]);
    setForm({ name: "", rewardType: "percentage", referrerReward: "", refereeReward: "", minOrderValue: "", maxUses: "", expiry: "", targetSegment: "All Customers" });
    setShowCreate(false);
    toast.success("Referral program created");
  };

  const toggleProgram = (id: string) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    toast.success("Program status updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Referral Programs</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage custom referral reward programs</p>
        </div>
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowCreate(true)}>
          <Plus className="h-3.5 w-3.5" /> New Program
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Total Programs</p><p className="text-2xl font-bold text-foreground">{programs.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Active</p><p className="text-2xl font-bold text-emerald-400">{activePrograms.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Total Conversions</p><p className="text-2xl font-bold text-foreground">{totalConversions.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Revenue Generated</p><p className="text-2xl font-bold text-primary">MWK {(totalRevenue / 1000).toFixed(0)}K</p></CardContent></Card>
      </div>

      <div className="space-y-4">
        {programs.map(program => {
          const RIcon = rewardIcons[program.rewardType];
          return (
            <Card key={program.id} className={cn("bg-card border-border", !program.active && "opacity-60")}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{program.name}</p>
                        <Badge variant="outline" className={cn("text-[10px]", rewardColors[program.rewardType])}>
                          <RIcon className="h-2.5 w-2.5 mr-0.5" /> {program.rewardType.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Expires: {program.expiry} · Target: {program.targetSegment}</p>
                    </div>
                  </div>
                  <Switch checked={program.active} onCheckedChange={() => toggleProgram(program.id)} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="bg-secondary rounded-lg p-2.5">
                    <p className="text-[10px] text-muted-foreground">Referrer Gets</p>
                    <p className="text-xs font-medium text-foreground">{program.referrerReward}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-2.5">
                    <p className="text-[10px] text-muted-foreground">Referee Gets</p>
                    <p className="text-xs font-medium text-foreground">{program.refereeReward}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-2.5">
                    <p className="text-[10px] text-muted-foreground">Min Order</p>
                    <p className="text-xs font-medium text-foreground">MWK {program.minOrderValue.toLocaleString()}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-2.5">
                    <p className="text-[10px] text-muted-foreground">Usage</p>
                    <p className="text-xs font-medium text-foreground">{program.usedCount}/{program.maxUses}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {program.totalReferrals} referrals</span>
                  <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {program.conversions} conversions</span>
                  <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> MWK {program.revenueGenerated.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader><DialogTitle>Create Referral Program</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1"><Label className="text-xs">Program Name</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. Friend Invite Bonus" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Reward Type</Label>
                <Select value={form.rewardType} onValueChange={(v: any) => setForm(p => ({ ...p, rewardType: v }))}>
                  <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Discount</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="free_shipping">Free Shipping</SelectItem>
                    <SelectItem value="cashback">Cashback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Target Segment</Label>
                <Select value={form.targetSegment} onValueChange={(v) => setForm(p => ({ ...p, targetSegment: v }))}>
                  <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Customers">All Customers</SelectItem>
                    <SelectItem value="High Spenders">High Spenders</SelectItem>
                    <SelectItem value="Local Customers">Local Customers</SelectItem>
                    <SelectItem value="International Customers">International</SelectItem>
                    <SelectItem value="New Customers">New Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Referrer Reward</Label><Input value={form.referrerReward} onChange={e => setForm(p => ({ ...p, referrerReward: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. 10% off" /></div>
              <div className="space-y-1"><Label className="text-xs">Referee Reward</Label><Input value={form.refereeReward} onChange={e => setForm(p => ({ ...p, refereeReward: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. 15% off" /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1"><Label className="text-xs">Min Order (MWK)</Label><Input type="number" value={form.minOrderValue} onChange={e => setForm(p => ({ ...p, minOrderValue: e.target.value }))} className="bg-secondary border-border h-9" /></div>
              <div className="space-y-1"><Label className="text-xs">Max Uses</Label><Input type="number" value={form.maxUses} onChange={e => setForm(p => ({ ...p, maxUses: e.target.value }))} className="bg-secondary border-border h-9" /></div>
              <div className="space-y-1"><Label className="text-xs">Expiry Date</Label><Input type="date" value={form.expiry} onChange={e => setForm(p => ({ ...p, expiry: e.target.value }))} className="bg-secondary border-border h-9" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={createProgram}>Create Program</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
