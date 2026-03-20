import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Clock, AlertTriangle, CheckCircle, Pause, Play, RotateCcw } from "lucide-react";
import { vendorPayouts, payoutHistory, vendors } from "@/lib/mock-data-vendors";
import { useToast } from "@/hooks/use-toast";

const statusStyle = (s: string) =>
  s === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
  s === "Released" || s === "Completed" ? "bg-emerald-500/20 text-emerald-400" :
  s === "On Hold" ? "bg-orange-500/20 text-orange-400" :
  "bg-red-500/20 text-red-400";

export default function VendorPayouts() {
  const { toast } = useToast();
  const [holdDialog, setHoldDialog] = useState<string | null>(null);
  const [holdReason, setHoldReason] = useState("");
  const [feeDialog, setFeeDialog] = useState<string | null>(null);
  const [newFee, setNewFee] = useState("");

  const totalEscrow = vendorPayouts.reduce((s, p) => s + p.amountInEscrow, 0);
  const pendingCount = vendorPayouts.filter(p => p.status === "Pending").length;
  const onHoldCount = vendorPayouts.filter(p => p.status === "On Hold").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vendor Payouts</h1>
        <p className="text-muted-foreground text-sm">Manage escrow balances and payout releases</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total in Escrow", value: `MWK ${totalEscrow.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
          { label: "Pending Release", value: pendingCount, icon: Clock, color: "text-yellow-400" },
          { label: "On Hold", value: onHoldCount, icon: AlertTriangle, color: "text-orange-400" },
          { label: "Released This Month", value: payoutHistory.length, icon: CheckCircle, color: "text-emerald-400" },
        ].map((s, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-secondary ${s.color}`}><s.icon className="w-5 h-5" /></div>
              <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-xl font-bold">{s.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="bg-secondary">
          <TabsTrigger value="pending">Pending Payouts</TabsTrigger>
          <TabsTrigger value="history">Payout History</TabsTrigger>
          <TabsTrigger value="fees">Fee Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card className="border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Escrow Amount</TableHead>
                    <TableHead>Confirmed</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendorPayouts.map(p => (
                    <TableRow key={p.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 bg-primary/20"><AvatarFallback className="bg-primary/20 text-primary text-xs">{p.vendorAvatar}</AvatarFallback></Avatar>
                          <span className="font-medium text-sm">{p.vendorName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">MWK {p.amountInEscrow.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.deliveryConfirmedDate}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.releaseDate}</TableCell>
                      <TableCell><Badge variant="outline" className={statusStyle(p.status)}>{p.status}</Badge>{p.holdReason && <p className="text-xs text-muted-foreground mt-1">{p.holdReason}</p>}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          {p.status === "Pending" && (
                            <>
                              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast({ title: `Released MWK ${p.amountInEscrow.toLocaleString()} to ${p.vendorName}` })}><Play className="w-3 h-3 mr-1" />Release</Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setHoldDialog(p.id); setHoldReason(""); }}><Pause className="w-3 h-3 mr-1" />Hold</Button>
                            </>
                          )}
                          {p.status === "On Hold" && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast({ title: `Released hold for ${p.vendorName}` })}><Play className="w-3 h-3 mr-1" />Release</Button>}
                          {p.status === "Failed" && <Button size="sm" variant="outline" className="h-7 text-xs text-red-400" onClick={() => toast({ title: `Retrying payout for ${p.vendorName}` })}><RotateCcw className="w-3 h-3 mr-1" />Retry</Button>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>ID</TableHead><TableHead>Vendor</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Date</TableHead><TableHead>Bank Ref</TableHead><TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payoutHistory.map(p => (
                    <TableRow key={p.id} className="border-border">
                      <TableCell className="text-sm font-mono">{p.id}</TableCell>
                      <TableCell className="text-sm">{p.vendorName}</TableCell>
                      <TableCell className="text-right font-medium">MWK {p.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                      <TableCell className="text-sm font-mono text-muted-foreground">{p.bankRef}</TableCell>
                      <TableCell><Badge variant="outline" className={statusStyle(p.status)}>{p.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card className="border-border">
            <CardHeader><CardTitle className="text-lg">Platform Fee Rates</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Vendor</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Fee Rate</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.filter(v => v.status !== "Pending Setup").map(v => (
                    <TableRow key={v.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 bg-primary/20"><AvatarFallback className="bg-primary/20 text-primary text-xs">{v.avatar}</AvatarFallback></Avatar>
                          <span className="font-medium text-sm">{v.name}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className={v.feeRate !== 12 ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}>{v.feeRate !== 12 ? "Custom" : "Default"}</Badge></TableCell>
                      <TableCell className="text-right font-medium">{v.feeRate}%</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setFeeDialog(v.id); setNewFee(String(v.feeRate)); }}>Edit Fee</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Hold dialog */}
      <Dialog open={!!holdDialog} onOpenChange={() => setHoldDialog(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Put Payout on Hold</DialogTitle></DialogHeader>
          <Textarea placeholder="Reason for hold..." value={holdReason} onChange={e => setHoldReason(e.target.value)} className="bg-secondary border-border" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setHoldDialog(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { toast({ title: "Payout placed on hold" }); setHoldDialog(null); }}>Confirm Hold</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fee dialog */}
      <Dialog open={!!feeDialog} onOpenChange={() => setFeeDialog(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Edit Fee Rate</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Set a custom platform fee rate for this vendor (default: 12%)</p>
            <div className="flex items-center gap-2"><Input type="number" min="0" max="50" value={newFee} onChange={e => setNewFee(e.target.value)} className="bg-secondary border-border w-24" /><span className="text-muted-foreground">%</span></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeeDialog(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { toast({ title: `Fee rate updated to ${newFee}%` }); setFeeDialog(null); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
