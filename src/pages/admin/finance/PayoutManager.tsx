import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { payouts, Payout } from "@/lib/mock-data-finance";
import { DollarSign, Send, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Completed: "bg-emerald-500/20 text-emerald-400",
  Failed: "bg-red-500/20 text-red-400",
};

const PayoutManager = () => {
  const [allPayouts, setAllPayouts] = useState<Payout[]>(payouts);

  const pending = allPayouts.filter(p => p.status === "Pending");
  const completed = allPayouts.filter(p => p.status === "Completed");
  const failed = allPayouts.filter(p => p.status === "Failed");

  const releasePayout = (id: string) => {
    setAllPayouts(prev => prev.map(p => p.id === id ? { ...p, status: "Completed" as const, completedDate: new Date().toISOString().split("T")[0], bankRef: `NBM-${Date.now().toString().slice(-10)}` } : p));
    toast.success("Payout released");
  };

  const releaseAll = () => {
    setAllPayouts(prev => prev.map(p => p.status === "Pending" ? { ...p, status: "Completed" as const, completedDate: new Date().toISOString().split("T")[0], bankRef: `NBM-${Date.now().toString().slice(-10)}` } : p));
    toast.success(`${pending.length} payouts released`);
  };

  const retryPayout = (id: string) => {
    setAllPayouts(prev => prev.map(p => p.id === id ? { ...p, status: "Pending" as const, failReason: undefined } : p));
    toast.success("Payout queued for retry");
  };

  const totalPending = pending.reduce((s, p) => s + p.netAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payout Manager</h1>
          <p className="text-muted-foreground">Release vendor earnings</p>
        </div>
        {pending.length > 0 && (
          <Button className="bg-primary text-primary-foreground" onClick={releaseAll}>
            <Send className="h-4 w-4 mr-2" /> Release All Pending ({pending.length})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Pending Amount</p><p className="text-xl font-bold text-primary">MWK {totalPending.toLocaleString()}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Pending Count</p><p className="text-xl font-bold text-foreground">{pending.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm">Completed</p><p className="text-xl font-bold text-foreground">{completed.length}</p></CardContent></Card>
        <Card className="border-border bg-card"><CardContent className="p-4"><p className="text-muted-foreground text-sm flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-destructive" /> Failed</p><p className="text-xl font-bold text-destructive">{failed.length}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="bg-secondary">
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          <TabsTrigger value="failed" className="text-destructive">Failed ({failed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>ID</TableHead><TableHead>Vendor</TableHead><TableHead>Gross</TableHead><TableHead>Fee</TableHead><TableHead>Net</TableHead><TableHead>Requested</TableHead><TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending.map(p => (
                    <TableRow key={p.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{p.id}</TableCell>
                      <TableCell className="text-foreground">{p.vendor}</TableCell>
                      <TableCell className="text-muted-foreground">MWK {p.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">MWK {p.fee.toLocaleString()}</TableCell>
                      <TableCell className="text-foreground font-medium">MWK {p.netAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{p.requestDate}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => releasePayout(p.id)}>
                          <Send className="h-4 w-4 mr-1" /> Release
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pending.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-6 text-muted-foreground">No pending payouts</TableCell></TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>ID</TableHead><TableHead>Vendor</TableHead><TableHead>Net Amount</TableHead><TableHead>Completed</TableHead><TableHead>Bank Ref</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completed.map(p => (
                    <TableRow key={p.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{p.id}</TableCell>
                      <TableCell className="text-foreground">{p.vendor}</TableCell>
                      <TableCell className="text-foreground">MWK {p.netAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{p.completedDate}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{p.bankRef}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>ID</TableHead><TableHead>Vendor</TableHead><TableHead>Amount</TableHead><TableHead>Reason</TableHead><TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failed.map(p => (
                    <TableRow key={p.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{p.id}</TableCell>
                      <TableCell className="text-foreground">{p.vendor}</TableCell>
                      <TableCell className="text-foreground">MWK {p.netAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-destructive text-sm">{p.failReason}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="border-border" onClick={() => retryPayout(p.id)}>
                          <RefreshCw className="h-4 w-4 mr-1" /> Retry
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {failed.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No failed payouts</TableCell></TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayoutManager;
