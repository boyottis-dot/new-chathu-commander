import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Ticket, Gift, Percent, Hash } from "lucide-react";
import { promoCodes, giftCards } from "@/lib/mock-data-customers";
import { useToast } from "@/hooks/use-toast";

const promoStatusColor = (s: string) =>
  s === "Active" ? "bg-emerald-500/20 text-emerald-400" :
  s === "Expired" ? "bg-red-500/20 text-red-400" :
  "bg-yellow-500/20 text-yellow-400";

const gcStatusColor = (s: string) =>
  s === "Active" ? "bg-emerald-500/20 text-emerald-400" :
  s === "Redeemed" ? "bg-blue-500/20 text-blue-400" :
  "bg-red-500/20 text-red-400";

export default function GiftCardsPromos() {
  const { toast } = useToast();
  const [promoDialog, setPromoDialog] = useState(false);
  const [gcDialog, setGcDialog] = useState(false);

  // Promo form
  const [promoForm, setPromoForm] = useState({ code: "", discountType: "percentage", discountValue: "", minOrder: "", expiryDate: "", usageLimit: "", targetSegment: "All Customers" });
  // Gift card form
  const [gcForm, setGcForm] = useState({ value: "", recipientEmail: "", expiryDate: "" });

  const totalActivePromos = promoCodes.filter(p => p.status === "Active").length;
  const totalActiveGCs = giftCards.filter(g => g.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gift Cards & Promo Codes</h1>
          <p className="text-muted-foreground text-sm">{totalActivePromos} active promos · {totalActiveGCs} active gift cards</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Promos", value: totalActivePromos, icon: Ticket, color: "text-primary" },
          { label: "Total Redemptions", value: promoCodes.reduce((s, p) => s + p.usageCount, 0), icon: Hash, color: "text-blue-400" },
          { label: "Active Gift Cards", value: totalActiveGCs, icon: Gift, color: "text-emerald-400" },
          { label: "GC Value Outstanding", value: `MWK ${giftCards.filter(g => g.status === "Active").reduce((s, g) => s + g.value, 0).toLocaleString()}`, icon: Percent, color: "text-orange-400" },
        ].map((s, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-secondary ${s.color}`}><s.icon className="w-5 h-5" /></div>
              <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-xl font-bold">{s.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="promos">
        <TabsList className="bg-secondary">
          <TabsTrigger value="promos">Promo Codes</TabsTrigger>
          <TabsTrigger value="giftcards">Gift Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="promos">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Promo Codes</CardTitle>
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => setPromoDialog(true)}><Plus className="w-4 h-4 mr-1" />New Promo</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Code</TableHead><TableHead>Discount</TableHead><TableHead>Min Order</TableHead><TableHead>Expiry</TableHead><TableHead>Usage</TableHead><TableHead>Target</TableHead><TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promoCodes.map(p => (
                    <TableRow key={p.id} className="border-border">
                      <TableCell className="font-mono font-medium">{p.code}</TableCell>
                      <TableCell className="text-sm">{p.discountType === "percentage" ? `${p.discountValue}%` : `MWK ${p.discountValue.toLocaleString()}`}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">MWK {p.minOrder.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.expiryDate}</TableCell>
                      <TableCell className="text-sm">{p.usageCount}/{p.usageLimit}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.targetSegment}</TableCell>
                      <TableCell><Badge variant="outline" className={promoStatusColor(p.status)}>{p.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="giftcards">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Gift Cards</CardTitle>
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => setGcDialog(true)}><Plus className="w-4 h-4 mr-1" />New Gift Card</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>ID</TableHead><TableHead>Value</TableHead><TableHead>Recipient</TableHead><TableHead>Purchaser</TableHead><TableHead>Expiry</TableHead><TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {giftCards.map(g => (
                    <TableRow key={g.id} className="border-border">
                      <TableCell className="font-mono text-sm">{g.id}</TableCell>
                      <TableCell className="font-medium">MWK {g.value.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{g.recipientEmail}</TableCell>
                      <TableCell className="text-sm">{g.purchaserName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{g.expiryDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={gcStatusColor(g.status)}>{g.status}</Badge>
                        {g.redeemedDate && <p className="text-xs text-muted-foreground mt-0.5">on {g.redeemedDate}</p>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Promo Dialog */}
      <Dialog open={promoDialog} onOpenChange={setPromoDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Create Promo Code</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Code</Label><Input placeholder="e.g. SUMMER25" value={promoForm.code} onChange={e => setPromoForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} className="bg-secondary border-border font-mono" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select value={promoForm.discountType} onValueChange={v => setPromoForm(p => ({ ...p, discountType: v }))}>
                  <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="percentage">Percentage</SelectItem><SelectItem value="fixed">Fixed Amount</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Value</Label><Input type="number" placeholder={promoForm.discountType === "percentage" ? "e.g. 20" : "e.g. 5000"} value={promoForm.discountValue} onChange={e => setPromoForm(p => ({ ...p, discountValue: e.target.value }))} className="bg-secondary border-border" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Min Order (MWK)</Label><Input type="number" placeholder="e.g. 10000" value={promoForm.minOrder} onChange={e => setPromoForm(p => ({ ...p, minOrder: e.target.value }))} className="bg-secondary border-border" /></div>
              <div className="space-y-2"><Label>Usage Limit</Label><Input type="number" placeholder="e.g. 100" value={promoForm.usageLimit} onChange={e => setPromoForm(p => ({ ...p, usageLimit: e.target.value }))} className="bg-secondary border-border" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Expiry Date</Label><Input type="date" value={promoForm.expiryDate} onChange={e => setPromoForm(p => ({ ...p, expiryDate: e.target.value }))} className="bg-secondary border-border" /></div>
              <div className="space-y-2">
                <Label>Target Segment</Label>
                <Select value={promoForm.targetSegment} onValueChange={v => setPromoForm(p => ({ ...p, targetSegment: v }))}>
                  <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>{["All Customers", "New Customers", "Repeat Buyers", "High Spenders", "International Customers", "Local Customers"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPromoDialog(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { toast({ title: `Promo code ${promoForm.code || "NEW"} created` }); setPromoDialog(false); }}>Create Promo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Gift Card Dialog */}
      <Dialog open={gcDialog} onOpenChange={setGcDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Create Gift Card</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Value (MWK)</Label><Input type="number" placeholder="e.g. 25000" value={gcForm.value} onChange={e => setGcForm(p => ({ ...p, value: e.target.value }))} className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Recipient Email</Label><Input type="email" placeholder="recipient@email.mw" value={gcForm.recipientEmail} onChange={e => setGcForm(p => ({ ...p, recipientEmail: e.target.value }))} className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Expiry Date</Label><Input type="date" value={gcForm.expiryDate} onChange={e => setGcForm(p => ({ ...p, expiryDate: e.target.value }))} className="bg-secondary border-border" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGcDialog(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { toast({ title: "Gift card created" }); setGcDialog(false); }}>Create Gift Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
