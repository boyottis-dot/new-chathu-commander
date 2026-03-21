import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { escrowEntries, totalEscrow, EscrowEntry } from "@/lib/mock-data-finance";
import { Lock, Unlock, AlertTriangle, DollarSign } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  Ready: "bg-emerald-500/20 text-emerald-400",
  Held: "bg-yellow-500/20 text-yellow-400",
  "On Hold": "bg-red-500/20 text-red-400",
};

const EscrowManager = () => {
  const [entries, setEntries] = useState<EscrowEntry[]>(escrowEntries);
  const [holdDialog, setHoldDialog] = useState<EscrowEntry | null>(null);
  const [holdReason, setHoldReason] = useState("");

  const total = entries.reduce((s, e) => s + e.amount, 0);
  const ready = entries.filter(e => e.status === "Ready");
  const onHold = entries.filter(e => e.status === "On Hold");

  const releaseVendor = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    toast.success("Funds released to vendor");
  };

  const putOnHold = () => {
    if (!holdDialog) return;
    setEntries(prev => prev.map(e => e.id === holdDialog.id ? { ...e, status: "On Hold" as const, holdReason } : e));
    setHoldDialog(null);
    setHoldReason("");
    toast.success("Vendor funds put on hold");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Escrow Manager</h1>
        <p className="text-muted-foreground">Manage funds held in escrow across all vendors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm flex items-center gap-1"><DollarSign className="h-3 w-3" /> Total in Escrow</p><p className="text-2xl font-bold text-primary">MWK {total.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm flex items-center gap-1"><Unlock className="h-3 w-3" /> Ready to Release</p><p className="text-2xl font-bold text-foreground">{ready.length} vendors</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-destructive" /> On Hold</p><p className="text-2xl font-bold text-destructive">{onHold.length} vendors</p></CardContent></Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader><CardTitle className="text-foreground">Escrow Breakdown by Vendor</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Vendor</TableHead>
                <TableHead>Amount Held</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Oldest Order</TableHead>
                <TableHead>Expected Release</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(e => (
                <TableRow key={e.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{e.vendor}</TableCell>
                  <TableCell className="text-foreground">MWK {e.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{e.orders}</TableCell>
                  <TableCell className="text-muted-foreground">{e.oldestOrder}</TableCell>
                  <TableCell className="text-muted-foreground">{e.expectedRelease}</TableCell>
                  <TableCell>
                    <div>
                      <Badge className={statusColors[e.status]}>{e.status}</Badge>
                      {e.holdReason && <p className="text-xs text-destructive mt-1">{e.holdReason}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary" onClick={() => releaseVendor(e.id)}>
                        <Unlock className="h-4 w-4 mr-1" /> Release
                      </Button>
                      {e.status !== "On Hold" && (
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setHoldDialog(e)}>
                          <Lock className="h-4 w-4 mr-1" /> Hold
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!holdDialog} onOpenChange={() => setHoldDialog(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Put Funds on Hold</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Vendor: <span className="text-foreground">{holdDialog?.vendor}</span> — MWK {holdDialog?.amount.toLocaleString()}</p>
          <Textarea placeholder="Reason for hold (e.g., pending dispute)..." value={holdReason} onChange={e => setHoldReason(e.target.value)} className="bg-secondary border-border" />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setHoldDialog(null)}>Cancel</Button>
            <Button variant="destructive" onClick={putOnHold}>Put on Hold</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EscrowManager;
