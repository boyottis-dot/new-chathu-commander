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
import { Plus, MoreHorizontal, Pencil, Trash2, Clock, Tag, Globe, MapPin, Zap } from "lucide-react";
import { specialOffers } from "@/lib/mock-data-feed";
import { cn } from "@/lib/utils";

function getCountdown(end: string) {
  const diff = new Date(end).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  return `${days}d ${hours}h remaining`;
}

const targetIcons = { LOCAL: MapPin, INTERNATIONAL: Globe, BOTH: Zap };
const targetColors = { LOCAL: "text-blue-400", INTERNATIONAL: "text-purple-400", BOTH: "text-primary" };

export default function FeedOffers() {
  const [offers, setOffers] = useState(specialOffers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", discountDetails: "", ctaText: "", targetMode: "BOTH" as "LOCAL" | "INTERNATIONAL" | "BOTH", attachedProduct: "" });

  const toggleOffer = (id: string) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));
  };

  const deleteOffer = (id: string) => setOffers((prev) => prev.filter((o) => o.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Special Offers</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and manage special offer posts</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-3.5 w-3.5" /> New Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base">Create Special Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Title</Label>
                <Input placeholder="e.g. Flash Friday Sale" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-secondary border-border h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Discount Details</Label>
                <Input placeholder="e.g. 30% off all dresses" value={form.discountDetails} onChange={(e) => setForm({ ...form, discountDetails: e.target.value })} className="bg-secondary border-border h-9" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">CTA Button Text</Label>
                  <Input placeholder="Shop Now" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} className="bg-secondary border-border h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Target Mode</Label>
                  <Select value={form.targetMode} onValueChange={(v: "LOCAL" | "INTERNATIONAL" | "BOTH") => setForm({ ...form, targetMode: v })}>
                    <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOCAL">Local</SelectItem>
                      <SelectItem value="INTERNATIONAL">International</SelectItem>
                      <SelectItem value="BOTH">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Attached Product</Label>
                <Input placeholder="Product name or collection" value={form.attachedProduct} onChange={(e) => setForm({ ...form, attachedProduct: e.target.value })} className="bg-secondary border-border h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Countdown End</Label>
                <Input type="datetime-local" className="bg-secondary border-border h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Offer Image</Label>
                <div className="border border-dashed border-border rounded-lg h-24 flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                  Click to upload image
                </div>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setDialogOpen(false)}>
                Create Offer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => {
          const TargetIcon = targetIcons[offer.targetMode];
          const countdown = getCountdown(offer.countdownEnd);
          return (
            <Card key={offer.id} className={cn("bg-card border-border overflow-hidden", !offer.active && !offer.expired && "opacity-60")}>
              <div className="relative h-36">
                <img src={offer.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {offer.expired ? (
                    <Badge className="bg-destructive/80 text-white text-[9px] border-0">Expired</Badge>
                  ) : offer.active ? (
                    <Badge className="bg-success/80 text-white text-[9px] border-0">Active</Badge>
                  ) : (
                    <Badge className="bg-muted text-muted-foreground text-[9px] border-0">Inactive</Badge>
                  )}
                  <Badge variant="outline" className={cn("text-[9px] border-white/20 flex items-center gap-0.5", targetColors[offer.targetMode])}>
                    <TargetIcon className="h-2.5 w-2.5" /> {offer.targetMode}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 bg-black/40 hover:bg-black/60 text-white">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem className="text-xs gap-2"><Pencil className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs gap-2 text-destructive" onClick={() => deleteOffer(offer.id)}><Trash2 className="h-3.5 w-3.5" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardContent className="p-3 space-y-2">
                <div>
                  <h3 className="text-sm font-semibold">{offer.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Tag className="h-3 w-3" /> {offer.discountDetails}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn("text-[10px] flex items-center gap-1", offer.expired ? "text-destructive" : "text-muted-foreground")}>
                    <Clock className="h-3 w-3" /> {countdown}
                  </span>
                  {!offer.expired && (
                    <Switch checked={offer.active} onCheckedChange={() => toggleOffer(offer.id)} />
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">Product: {offer.attachedProduct}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
