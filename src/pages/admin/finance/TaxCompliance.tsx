import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, FileText, AlertCircle, CheckCircle, Clock, Download } from "lucide-react";
import { taxRules, complianceDocuments, taxReportHistory } from "@/lib/mock-data-tax";

const statusBadge = {
  active: "default" as const,
  draft: "secondary" as const,
  valid: "default" as const,
  expiring: "destructive" as const,
  pending: "secondary" as const,
  filed: "default" as const,
};

const TaxCompliance = () => {
  const { toast } = useToast();
  const [rules, setRules] = useState(taxRules);
  const [newRule, setNewRule] = useState({ region: "", state: "", type: "Sales Tax", rate: "" });

  const handleAddRule = () => {
    if (!newRule.region || !newRule.state || !newRule.rate) return;
    const rule = {
      id: `TAX-${String(rules.length + 1).padStart(3, "0")}`,
      region: newRule.region,
      state: newRule.state,
      type: newRule.type,
      rate: parseFloat(newRule.rate),
      status: "draft" as const,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setRules([rule, ...rules]);
    setNewRule({ region: "", state: "", type: "Sales Tax", rate: "" });
    toast({ title: "Tax rule created", description: `${rule.type} rule for ${rule.state} at ${rule.rate}%` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tax & Compliance</h1>
          <p className="text-muted-foreground">Manage tax rules, VAT settings, and compliance documentation</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Tax Rule</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Tax Rule</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Region</Label><Input value={newRule.region} onChange={e => setNewRule({...newRule, region: e.target.value})} placeholder="e.g. United States" /></div>
                <div><Label>State/Country</Label><Input value={newRule.state} onChange={e => setNewRule({...newRule, state: e.target.value})} placeholder="e.g. California" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tax Type</Label>
                  <Select value={newRule.type} onValueChange={v => setNewRule({...newRule, type: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales Tax">Sales Tax</SelectItem>
                      <SelectItem value="VAT">VAT</SelectItem>
                      <SelectItem value="GST">GST</SelectItem>
                      <SelectItem value="HST">HST</SelectItem>
                      <SelectItem value="Consumption Tax">Consumption Tax</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Rate (%)</Label><Input type="number" step="0.01" value={newRule.rate} onChange={e => setNewRule({...newRule, rate: e.target.value})} placeholder="0.00" /></div>
              </div>
              <Button onClick={handleAddRule} className="w-full">Create Rule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{rules.filter(r => r.status === "active").length}</p>
                <p className="text-xs text-muted-foreground">Active Tax Rules</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10"><AlertCircle className="h-5 w-5 text-destructive" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{complianceDocuments.filter(d => d.status === "expiring").length}</p>
                <p className="text-xs text-muted-foreground">Expiring Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10"><CheckCircle className="h-5 w-5 text-green-500" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{taxReportHistory.filter(r => r.status === "filed").length}</p>
                <p className="text-xs text-muted-foreground">Reports Filed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules">
        <TabsList>
          <TabsTrigger value="rules">Tax Rules</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Docs</TabsTrigger>
          <TabsTrigger value="reports">Tax Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map(rule => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-mono text-xs">{rule.id}</TableCell>
                      <TableCell>{rule.region}</TableCell>
                      <TableCell className="font-medium">{rule.state}</TableCell>
                      <TableCell>{rule.type}</TableCell>
                      <TableCell>{rule.rate}%</TableCell>
                      <TableCell><Badge variant={statusBadge[rule.status]}>{rule.status}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{rule.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Uploaded</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceDocuments.map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.region}</TableCell>
                      <TableCell><Badge variant={statusBadge[doc.status]}>{doc.status}</Badge></TableCell>
                      <TableCell className={doc.status === "expiring" ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {doc.expiresAt ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{doc.uploadedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Total Tax</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Filed</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxReportHistory.map(rpt => (
                    <TableRow key={rpt.id}>
                      <TableCell className="font-medium">{rpt.period}</TableCell>
                      <TableCell>{rpt.region}</TableCell>
                      <TableCell>${rpt.totalTax.toLocaleString()}</TableCell>
                      <TableCell><Badge variant={statusBadge[rpt.status]}>{rpt.status}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{rpt.filedAt ?? "—"}</TableCell>
                      <TableCell>
                        {rpt.status === "filed" && (
                          <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxCompliance;
