import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Pencil, Trash2, MoreHorizontal, Eye, EyeOff, Package, Globe, MapPin, Zap, ChevronUp, ChevronDown, Search } from "lucide-react";
import { categories } from "@/lib/mock-data-shop";
import { cn } from "@/lib/utils";

const targetColors: Record<string, string> = { LOCAL: "text-blue-400 border-blue-400/30", INTERNATIONAL: "text-purple-400 border-purple-400/30", BOTH: "text-primary border-primary/30" };
const targetIcons: Record<string, React.ElementType> = { LOCAL: MapPin, INTERNATIONAL: Globe, BOTH: Zap };

export default function CategoryManager() {
  const [cats, setCats] = useState(categories);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = cats.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const toggleVisibility = (id: string) => setCats((prev) => prev.map((c) => c.id === id ? { ...c, visible: !c.visible } : c));

  const moveItem = (index: number, dir: -1 | 1) => {
    const arr = [...filtered];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    const ids = [arr[index].id, arr[target].id];
    setCats((prev) => {
      const next = [...prev];
      const i1 = next.findIndex((c) => c.id === ids[0]);
      const i2 = next.findIndex((c) => c.id === ids[1]);
      const tmp = next[i1].order;
      next[i1] = { ...next[i1], order: next[i2].order };
      next[i2] = { ...next[i2], order: tmp };
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage product categories</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" /> New Category</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-sm">
            <DialogHeader><DialogTitle className="text-base">Create Category</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="space-y-1"><Label className="text-xs">Name</Label><Input placeholder="e.g. Fashion" className="bg-secondary border-border h-9" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><Label className="text-xs">Icon (emoji)</Label><Input placeholder="👗" className="bg-secondary border-border h-9" /></div>
                <div className="space-y-1">
                  <Label className="text-xs">Target Mode</Label>
                  <Select defaultValue="BOTH">
                    <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="LOCAL">Local</SelectItem><SelectItem value="INTERNATIONAL">International</SelectItem><SelectItem value="BOTH">Both</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Background Image</Label>
                <div className="border border-dashed border-border rounded-lg h-20 flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">Click to upload</div>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setDialogOpen(false)}>Create Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.sort((a, b) => a.order - b.order).map((cat, i) => {
          const TIcon = targetIcons[cat.targetMode];
          return (
            <Card key={cat.id} className={cn("bg-card border-border overflow-hidden", !cat.visible && "opacity-50")}>
              <div className="relative h-28">
                <img src={cat.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-semibold text-white">{cat.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 bg-black/40 hover:bg-black/60 text-white"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem className="text-xs gap-2"><Pencil className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs gap-2"><Package className="h-3.5 w-3.5" /> Assign Products</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs gap-2" onClick={() => toggleVisibility(cat.id)}>
                      {cat.visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {cat.visible ? "Hide" : "Show"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn("text-[9px] gap-0.5", targetColors[cat.targetMode])}>
                      <TIcon className="h-2.5 w-2.5" /> {cat.targetMode}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{cat.productCount} products</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveItem(i, -1)}><ChevronUp className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveItem(i, 1)}><ChevronDown className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
