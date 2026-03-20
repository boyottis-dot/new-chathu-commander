import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, MoreHorizontal, Eye, EyeOff, Star, Package, Globe, MapPin, Zap, Search, GripVertical } from "lucide-react";
import { collections } from "@/lib/mock-data-shop";
import { cn } from "@/lib/utils";

const targetColors: Record<string, string> = { LOCAL: "text-blue-400 border-blue-400/30", INTERNATIONAL: "text-purple-400 border-purple-400/30", BOTH: "text-primary border-primary/30" };
const targetIcons: Record<string, React.ElementType> = { LOCAL: MapPin, INTERNATIONAL: Globe, BOTH: Zap };

export default function CollectionManager() {
  const [cols, setCols] = useState(collections);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = cols.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const toggleVisibility = (id: string) => setCols((prev) => prev.map((c) => c.id === id ? { ...c, visible: !c.visible } : c));
  const toggleFeatured = (id: string) => setCols((prev) => prev.map((c) => c.id === id ? { ...c, featured: !c.featured } : c));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Collections</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage product collections</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" /> New Collection</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader><DialogTitle className="text-base">Create Collection</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="space-y-1"><Label className="text-xs">Name</Label><Input placeholder="e.g. New Arrivals" className="bg-secondary border-border h-9" /></div>
              <div className="space-y-1"><Label className="text-xs">Description</Label><Textarea placeholder="Describe this collection..." className="bg-secondary border-border text-xs min-h-[60px]" /></div>
              <div className="space-y-1">
                <Label className="text-xs">Target Mode</Label>
                <Select defaultValue="BOTH">
                  <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="LOCAL">Local</SelectItem><SelectItem value="INTERNATIONAL">International</SelectItem><SelectItem value="BOTH">Both</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Header Image</Label>
                <div className="border border-dashed border-border rounded-lg h-24 flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">Click to upload</div>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setDialogOpen(false)}>Create Collection</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search collections..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs text-muted-foreground w-10"></TableHead>
                  <TableHead className="text-xs text-muted-foreground">Collection</TableHead>
                  <TableHead className="text-xs text-muted-foreground hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-xs text-muted-foreground text-center">Products</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Target</TableHead>
                  <TableHead className="text-xs text-muted-foreground text-center">Visible</TableHead>
                  <TableHead className="text-xs text-muted-foreground text-center">Featured</TableHead>
                  <TableHead className="text-xs text-muted-foreground w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.sort((a, b) => a.order - b.order).map((col) => {
                  const TIcon = targetIcons[col.targetMode];
                  return (
                    <TableRow key={col.id} className={cn("border-border", !col.visible && "opacity-50")}>
                      <TableCell><GripVertical className="h-3.5 w-3.5 text-muted-foreground cursor-grab" /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <img src={col.headerImage} alt="" className="h-9 w-16 rounded object-cover bg-secondary shrink-0" />
                          <span className="text-xs font-medium">{col.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell"><span className="text-xs text-muted-foreground line-clamp-1">{col.description}</span></TableCell>
                      <TableCell className="text-center"><span className="text-xs tabular-nums">{col.productCount}</span></TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-[9px] gap-0.5", targetColors[col.targetMode])}>
                          <TIcon className="h-2.5 w-2.5" /> {col.targetMode}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center"><Switch checked={col.visible} onCheckedChange={() => toggleVisibility(col.id)} /></TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className={cn("h-7 w-7", col.featured && "text-primary")} onClick={() => toggleFeatured(col.id)}>
                          <Star className={cn("h-3.5 w-3.5", col.featured && "fill-primary")} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuItem className="text-xs gap-2"><Pencil className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs gap-2"><Package className="h-3.5 w-3.5" /> Manage Products</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
