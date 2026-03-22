import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, MoreHorizontal, Eye, EyeOff, Package, Globe, MapPin, Zap, ChevronUp, ChevronDown, Search, Wand2 } from "lucide-react";
import { categories } from "@/lib/mock-data-shop";
import { allProducts } from "@/lib/mock-data-products";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const targetColors: Record<string, string> = { LOCAL: "text-blue-400 border-blue-400/30", INTERNATIONAL: "text-purple-400 border-purple-400/30", BOTH: "text-primary border-primary/30" };
const targetIcons: Record<string, React.ElementType> = { LOCAL: MapPin, INTERNATIONAL: Globe, BOTH: Zap };

interface AutoRule {
  id: string;
  field: string;
  operator: string;
  value: string;
  active: boolean;
}

export default function CategoryManager() {
  const [cats, setCats] = useState(categories);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Product assignment
  const [assignCat, setAssignCat] = useState<string | null>(null);
  const [assignSearch, setAssignSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Auto-categorization rules
  const [autoRules, setAutoRules] = useState<AutoRule[]>([
    { id: "AR-1", field: "category", operator: "equals", value: "Electronics", active: true },
    { id: "AR-2", field: "price", operator: "less_than", value: "50000", active: true },
    { id: "AR-3", field: "location", operator: "equals", value: "LOCAL", active: false },
  ]);
  const [newRule, setNewRule] = useState({ field: "category", operator: "equals", value: "" });

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

  const openAssign = (catId: string) => {
    setAssignCat(catId);
    setAssignSearch("");
    setSelectedProducts([]);
  };

  const saveAssignment = () => {
    toast.success(`${selectedProducts.length} products assigned to category`);
    setAssignCat(null);
  };

  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(assignSearch.toLowerCase()) || p.vendor.toLowerCase().includes(assignSearch.toLowerCase())
  );

  const addAutoRule = () => {
    if (!newRule.value.trim()) return;
    setAutoRules(prev => [...prev, { id: `AR-${Date.now()}`, ...newRule, active: true }]);
    setNewRule({ field: "category", operator: "equals", value: "" });
    toast.success("Auto-categorization rule added");
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="categories" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Categories</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage product categories and auto-assignment rules</p>
          </div>
          <TabsList className="bg-secondary border border-border h-9">
            <TabsTrigger value="categories" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Categories</TabsTrigger>
            <TabsTrigger value="autorules" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Auto-Rules</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
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
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { setDialogOpen(false); toast.success("Category created"); }}>Create Category</Button>
                </div>
              </DialogContent>
            </Dialog>
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
                        <DropdownMenuItem className="text-xs gap-2" onClick={() => openAssign(cat.id)}><Package className="h-3.5 w-3.5" /> Assign Products</DropdownMenuItem>
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
        </TabsContent>

        {/* AUTO-CATEGORIZATION RULES */}
        <TabsContent value="autorules" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2"><Wand2 className="h-4 w-4 text-primary" /> Auto-Categorization Rules</CardTitle>
              <CardDescription className="text-xs">Products matching these rules will be automatically assigned to this category when approved</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {autoRules.map(rule => (
                <div key={rule.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                  <Switch checked={rule.active} onCheckedChange={() => setAutoRules(prev => prev.map(r => r.id === rule.id ? { ...r, active: !r.active } : r))} />
                  <div className="flex-1">
                    <p className="text-xs font-medium">
                      If <Badge variant="outline" className="text-[10px] border-border mx-1">{rule.field}</Badge>
                      <span className="text-muted-foreground">{rule.operator.replace("_", " ")}</span>
                      <Badge variant="outline" className="text-[10px] border-primary/30 text-primary mx-1">{rule.value}</Badge>
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setAutoRules(prev => prev.filter(r => r.id !== rule.id))}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              <Separator className="bg-border" />

              <div className="space-y-3">
                <p className="text-xs font-medium">Add New Rule</p>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={newRule.field} onValueChange={(v) => setNewRule(prev => ({ ...prev, field: v }))}>
                    <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="price">Price (MWK)</SelectItem>
                      <SelectItem value="location">Location Mode</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="type">Product Type</SelectItem>
                      <SelectItem value="tags">Tags</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={newRule.operator} onValueChange={(v) => setNewRule(prev => ({ ...prev, operator: v }))}>
                    <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="not_equals">Not Equals</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="greater_than">Greater Than</SelectItem>
                      <SelectItem value="less_than">Less Than</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Value..." value={newRule.value} onChange={(e) => setNewRule(prev => ({ ...prev, value: e.target.value }))} className="bg-secondary border-border h-9" />
                </div>
                <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={addAutoRule}>
                  <Plus className="h-3.5 w-3.5" /> Add Rule
                </Button>
              </div>

              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground">
                  <strong>How it works:</strong> When a new product is approved, the system checks all active rules. If a product matches ANY rule for a category, it is automatically assigned. Rules are evaluated in order and multiple categories can match.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* PRODUCT ASSIGNMENT DIALOG */}
      <Dialog open={!!assignCat} onOpenChange={() => setAssignCat(null)}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Assign Products to {cats.find(c => c.id === assignCat)?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." value={assignSearch} onChange={(e) => setAssignSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] border-border">{selectedProducts.length} selected</Badge>
              <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setSelectedProducts(filteredProducts.map(p => p.id))}>Select All</Button>
              <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setSelectedProducts([])}>Clear</Button>
            </div>
            <div className="max-h-[40vh] overflow-y-auto space-y-1">
              {filteredProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 cursor-pointer" onClick={() => setSelectedProducts(prev => prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id])}>
                  <Checkbox checked={selectedProducts.includes(product.id)} />
                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-[10px] text-muted-foreground shrink-0">IMG</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground">{product.vendor} · MWK {product.price.toLocaleString()}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{product.category}</Badge>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAssignCat(null)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground gap-1.5" onClick={saveAssignment}>
              <Package className="h-3.5 w-3.5" /> Assign {selectedProducts.length} Products
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
