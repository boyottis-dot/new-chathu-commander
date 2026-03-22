import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, DollarSign, Truck, RotateCcw, Clock, Save } from "lucide-react";
import { toast } from "sonner";

export default function PlatformSettings() {
  const [settings, setSettings] = useState({
    platformName: "Chathu",
    platformLogo: "",
    currency: "MWK",
    defaultLocationMode: "LOCAL",
    commissionRate: "15",
    deliveryFeeLocal: "2500",
    deliveryFeeInternational: "15000",
    deliveryPerKmRate: "150",
    deliveryFlatRateByCity: "2000",
    returnWindow: "7",
    escrowDelay: "48",
    minWithdrawalAmount: "5000",
    maintenanceMode: false,
    vendorAutoApproval: false,
    productAutoApproval: false,
    reviewModeration: true,
    maxProductImages: "8",
    minOrderAmount: "1000",
  });

  const update = (key: string, value: string | boolean) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = () => toast.success("Platform settings saved successfully");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Configure core platform parameters</p>
        </div>
        <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input value={settings.platformName} onChange={e => update("platformName", e.target.value)} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={settings.currency} onValueChange={v => update("currency", v)}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="MWK">MWK - Malawian Kwacha</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="ZAR">ZAR - South African Rand</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div><Label>Maintenance Mode</Label><p className="text-xs text-muted-foreground">Disable public access temporarily</p></div>
              <Switch checked={settings.maintenanceMode} onCheckedChange={v => update("maintenanceMode", v)} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />Fees & Commissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Platform Commission (%)</Label>
              <Input type="number" value={settings.commissionRate} onChange={e => update("commissionRate", e.target.value)} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Min Order Amount ({settings.currency})</Label>
              <Input type="number" value={settings.minOrderAmount} onChange={e => update("minOrderAmount", e.target.value)} className="bg-secondary border-border" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Local Delivery Fee ({settings.currency})</Label>
              <Input type="number" value={settings.deliveryFeeLocal} onChange={e => update("deliveryFeeLocal", e.target.value)} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>International Delivery Fee ({settings.currency})</Label>
              <Input type="number" value={settings.deliveryFeeInternational} onChange={e => update("deliveryFeeInternational", e.target.value)} className="bg-secondary border-border" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-primary" />Returns & Escrow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Return Window (days)</Label>
              <Input type="number" value={settings.returnWindow} onChange={e => update("returnWindow", e.target.value)} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Escrow Release Delay (days)</Label>
              <Input type="number" value={settings.escrowDelay} onChange={e => update("escrowDelay", e.target.value)} className="bg-secondary border-border" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />Approval & Moderation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center justify-between">
                <div><Label>Auto-approve Vendors</Label><p className="text-xs text-muted-foreground">Skip manual vendor review</p></div>
                <Switch checked={settings.vendorAutoApproval} onCheckedChange={v => update("vendorAutoApproval", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div><Label>Auto-approve Products</Label><p className="text-xs text-muted-foreground">Skip product review queue</p></div>
                <Switch checked={settings.productAutoApproval} onCheckedChange={v => update("productAutoApproval", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div><Label>Review Moderation</Label><p className="text-xs text-muted-foreground">Moderate before publishing</p></div>
                <Switch checked={settings.reviewModeration} onCheckedChange={v => update("reviewModeration", v)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Max Product Images</Label>
              <Input type="number" value={settings.maxProductImages} onChange={e => update("maxProductImages", e.target.value)} className="bg-secondary border-border w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
