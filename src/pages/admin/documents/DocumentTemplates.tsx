import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { templates as initialTemplates, type DocTemplate } from "@/lib/mock-data-documents";
import { Plus, FileText, Copy, Pencil, Trash2, Download } from "lucide-react";

const typeIcons: Record<string, string> = { pdf: "📄", docx: "📝", xlsx: "📊", pptx: "📑", image: "🖼️", csv: "📋", other: "📎" };
const categoryColors: Record<string, string> = { Contracts: "bg-blue-500/20 text-blue-400", Marketing: "bg-green-500/20 text-green-400", Reports: "bg-amber-500/20 text-amber-400", HR: "bg-purple-500/20 text-purple-400", Finance: "bg-red-500/20 text-red-400", Operations: "bg-cyan-500/20 text-cyan-400", Legal: "bg-zinc-500/20 text-zinc-400" };

export default function DocumentTemplates() {
  const [tmpls, setTmpls] = useState<DocTemplate[]>(initialTemplates);
  const [showAdd, setShowAdd] = useState(false);
  const [catFilter, setCatFilter] = useState("all");
  const [newTmpl, setNewTmpl] = useState({ name: "", type: "pdf" as DocTemplate["type"], category: "", description: "" });

  const filtered = catFilter === "all" ? tmpls : tmpls.filter(t => t.category === catFilter);
  const categories = [...new Set(tmpls.map(t => t.category))];

  const handleAdd = () => {
    if (!newTmpl.name || !newTmpl.category) { toast({ title: "Required fields missing", variant: "destructive" }); return; }
    setTmpls(prev => [...prev, { id: `tpl-${Date.now()}`, name: newTmpl.name, type: newTmpl.type, category: newTmpl.category, description: newTmpl.description, usageCount: 0, lastUsed: "Never", createdBy: "Admin" }]);
    setShowAdd(false);
    setNewTmpl({ name: "", type: "pdf", category: "", description: "" });
    toast({ title: "Template created" });
  };

  const useTemplate = (t: DocTemplate) => {
    setTmpls(prev => prev.map(tmpl => tmpl.id === t.id ? { ...tmpl, usageCount: tmpl.usageCount + 1, lastUsed: new Date().toISOString().split("T")[0] } : tmpl));
    toast({ title: `Using template: ${t.name}`, description: "New document created from template" });
  };

  const deleteTmpl = (id: string) => { setTmpls(prev => prev.filter(t => t.id !== id)); toast({ title: "Template deleted" }); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Document Templates</h1><p className="text-muted-foreground">Reusable templates for contracts, reports, SOPs, and more</p></div>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" />Create Template</Button>
      </div>

      <Card><CardContent className="p-4">
        <Select value={catFilter} onValueChange={setCatFilter}><SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
      </CardContent></Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(tmpl => (
          <Card key={tmpl.id} className="hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{typeIcons[tmpl.type]}</span>
                  <div><CardTitle className="text-sm">{tmpl.name}</CardTitle><Badge className={categoryColors[tmpl.category] || "bg-muted text-muted-foreground"} variant="secondary" className={`text-[10px] mt-1 ${categoryColors[tmpl.category] || "bg-muted text-muted-foreground"}`}>{tmpl.category}</Badge></div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">{tmpl.description}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Used {tmpl.usageCount} times</span>
                <span>Last: {tmpl.lastUsed}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => useTemplate(tmpl)}><Copy className="h-3 w-3 mr-1" />Use Template</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3 w-3" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => deleteTmpl(tmpl.id)}><Trash2 className="h-3 w-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent><DialogHeader><DialogTitle>Create Template</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Template Name *</Label><Input value={newTmpl.name} onChange={e => setNewTmpl(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Type</Label><Select value={newTmpl.type} onValueChange={v => setNewTmpl(p => ({ ...p, type: v as DocTemplate["type"] }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pdf">PDF</SelectItem><SelectItem value="docx">Word</SelectItem><SelectItem value="xlsx">Excel</SelectItem><SelectItem value="pptx">PowerPoint</SelectItem></SelectContent></Select></div>
              <div><Label>Category *</Label><Select value={newTmpl.category} onValueChange={v => setNewTmpl(p => ({ ...p, category: v }))}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{["Contracts", "Marketing", "Reports", "HR", "Finance", "Operations", "Legal"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div><Label>Description</Label><Textarea value={newTmpl.description} onChange={e => setNewTmpl(p => ({ ...p, description: e.target.value }))} rows={3} /></div>
          </div>
          <DialogFooter><Button onClick={handleAdd}>Create Template</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
