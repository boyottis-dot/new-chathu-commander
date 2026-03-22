import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus, Pencil, Trash2, GripVertical, Globe, MapPin, Zap, Save,
  ChevronUp, ChevronDown, Rss, ShoppingBag, Sparkles,
} from "lucide-react";
import {
  heroSlides, categoryPills, featuredBanner as fbData, partnerBrands,
  valuePropositions, faqItems, footerLinks,
} from "@/lib/mock-data-shop";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const targetBadge = (mode: string) => {
  const map: Record<string, { icon: React.ElementType; color: string }> = {
    LOCAL: { icon: MapPin, color: "text-blue-400 border-blue-400/30" },
    INTERNATIONAL: { icon: Globe, color: "text-purple-400 border-purple-400/30" },
    BOTH: { icon: Zap, color: "text-primary border-primary/30" },
  };
  const { icon: Icon, color } = map[mode] || map.BOTH;
  return (
    <Badge variant="outline" className={cn("text-[9px] gap-0.5", color)}>
      <Icon className="h-2.5 w-2.5" /> {mode}
    </Badge>
  );
};

// Duplicate initial data for two page contexts
const initPageConfig = () => ({
  slides: heroSlides.map(s => ({ ...s })),
  pills: categoryPills.map(p => ({ ...p })),
  fb: { ...fbData },
  brands: partnerBrands.map(b => ({ ...b })),
  vps: valuePropositions.map(v => ({ ...v })),
  faqs: faqItems.map(f => ({ ...f })),
  footer: { ...footerLinks, navigation: [...footerLinks.navigation], social: { ...footerLinks.social }, contact: { ...footerLinks.contact } },
  recoWeights: { follows: 70, purchases: 30, trending: 50, newArrivals: 60, categoryAffinity: 40 },
});

export default function HomepageSections() {
  const [pageContext, setPageContext] = useState<"feed" | "shop">("feed");
  const [feedConfig, setFeedConfig] = useState(initPageConfig());
  const [shopConfig, setShopConfig] = useState(() => {
    const cfg = initPageConfig();
    // Shop page has different reco weights
    cfg.recoWeights = { follows: 20, purchases: 80, trending: 60, newArrivals: 70, categoryAffinity: 90 };
    return cfg;
  });

  const config = pageContext === "feed" ? feedConfig : shopConfig;
  const setConfig = pageContext === "feed" ? setFeedConfig : setShopConfig;

  const { slides, pills, fb, brands, vps, faqs, footer, recoWeights } = config;
  const setSlides = (fn: (prev: typeof slides) => typeof slides) => setConfig(prev => ({ ...prev, slides: fn(prev.slides) }));
  const setPills = (fn: (prev: typeof pills) => typeof pills) => setConfig(prev => ({ ...prev, pills: fn(prev.pills) }));
  const setBrands = (fn: (prev: typeof brands) => typeof brands) => setConfig(prev => ({ ...prev, brands: fn(prev.brands) }));
  const setVps = (fn: (prev: typeof vps) => typeof vps) => setConfig(prev => ({ ...prev, vps: fn(prev.vps) }));
  const setFaqs = (fn: (prev: typeof faqs) => typeof faqs) => setConfig(prev => ({ ...prev, faqs: fn(prev.faqs) }));
  const setRecoWeights = (key: string, value: number) => setConfig(prev => ({ ...prev, recoWeights: { ...prev.recoWeights, [key]: value } }));

  const moveItem = <T extends { order: number }>(list: T[], index: number, dir: -1 | 1): T[] => {
    const arr = [...list];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return arr;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    return arr.map((item, i) => ({ ...item, order: i + 1 }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Homepage Sections</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage content blocks for each storefront page</p>
        </div>
      </div>

      {/* PAGE CONTEXT SELECTOR */}
      <Card className="bg-card border-border">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground mr-2">Editing:</p>
            <Button
              variant={pageContext === "feed" ? "default" : "outline"}
              size="sm"
              className={cn("gap-1.5", pageContext === "feed" && "bg-primary text-primary-foreground")}
              onClick={() => setPageContext("feed")}
            >
              <Rss className="h-3.5 w-3.5" /> Feed Page
            </Button>
            <Button
              variant={pageContext === "shop" ? "default" : "outline"}
              size="sm"
              className={cn("gap-1.5", pageContext === "shop" && "bg-primary text-primary-foreground")}
              onClick={() => setPageContext("shop")}
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Shop Page
            </Button>
            <Badge variant="outline" className="text-[10px] border-border ml-auto">
              {pageContext === "feed" ? "Social browsing experience" : "Traditional e-commerce layout"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="bg-secondary border border-border h-9 flex-wrap">
          <TabsTrigger value="hero" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Hero</TabsTrigger>
          <TabsTrigger value="pills" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Category Pills</TabsTrigger>
          <TabsTrigger value="banner" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Featured Banner</TabsTrigger>
          <TabsTrigger value="brands" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Partners</TabsTrigger>
          <TabsTrigger value="values" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Value Props</TabsTrigger>
          <TabsTrigger value="faq" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">FAQ</TabsTrigger>
          <TabsTrigger value="footer" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Footer</TabsTrigger>
          <TabsTrigger value="reco" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Recommendations</TabsTrigger>
        </TabsList>

        {/* HERO SLIDESHOW */}
        <TabsContent value="hero" className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{slides.length} slides on {pageContext === "feed" ? "Feed" : "Shop"} page</p>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" /> Add Slide</Button>
          </div>
          {[...slides].sort((a, b) => a.order - b.order).map((slide, i) => (
            <Card key={slide.id} className="bg-card border-border">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSlides(prev => moveItem(prev, i, -1))}><ChevronUp className="h-3 w-3" /></Button>
                    <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSlides(prev => moveItem(prev, i, 1))}><ChevronDown className="h-3 w-3" /></Button>
                  </div>
                  <img src={slide.image} alt="" className="h-20 w-36 rounded-md object-cover bg-secondary shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{slide.headline}</p>
                      {targetBadge(slide.targetMode)}
                    </div>
                    <p className="text-[10px] text-muted-foreground">CTA: {slide.ctaText} → {slide.ctaLink}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <Switch checked={slide.active} onCheckedChange={() => setSlides(prev => prev.map(s => s.id === slide.id ? { ...s, active: !s.active } : s))} />
                      <span className="text-[10px] text-muted-foreground">{slide.active ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setSlides(prev => prev.filter(s => s.id !== slide.id))}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* CATEGORY PILLS */}
        <TabsContent value="pills" className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{pills.length} pills configured</p>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" /> Add Pill</Button>
          </div>
          <Card className="bg-card border-border">
            <CardContent className="p-3 space-y-2">
              {[...pills].sort((a, b) => a.order - b.order).map((pill, i) => (
                <div key={pill.id} className="flex items-center gap-3 py-1.5">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setPills(prev => moveItem(prev, i, -1))}><ChevronUp className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setPills(prev => moveItem(prev, i, 1))}><ChevronDown className="h-3 w-3" /></Button>
                  </div>
                  <span className="text-lg">{pill.icon}</span>
                  <span className="text-sm font-medium flex-1">{pill.label}</span>
                  {targetBadge(pill.targetMode)}
                  <span className="text-[10px] text-muted-foreground">{pill.linkedCollection}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setPills(prev => prev.filter(p => p.id !== pill.id))}><Trash2 className="h-3 w-3" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FEATURED BANNER */}
        <TabsContent value="banner" className="space-y-3">
          <Card className="bg-card border-border overflow-hidden">
            <div className="relative h-48">
              <img src={fb.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
                <p className="text-white text-lg font-bold">{fb.title}</p>
                <p className="text-white/70 text-sm mt-1">{fb.subtitle}</p>
                <Button size="sm" className="mt-3 bg-primary text-primary-foreground w-fit">{fb.cta}</Button>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><Label className="text-xs">Title</Label><Input defaultValue={fb.title} className="bg-secondary border-border h-9" /></div>
                <div className="space-y-1"><Label className="text-xs">Subtitle</Label><Input defaultValue={fb.subtitle} className="bg-secondary border-border h-9" /></div>
                <div className="space-y-1"><Label className="text-xs">CTA Text</Label><Input defaultValue={fb.cta} className="bg-secondary border-border h-9" /></div>
                <div className="space-y-1"><Label className="text-xs">Linked Collection</Label><Input defaultValue={fb.linkedCollection} className="bg-secondary border-border h-9" /></div>
              </div>
              <div className="flex justify-between items-center">
                {targetBadge(fb.targetMode)}
                <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => toast.success("Banner saved")}><Save className="h-3.5 w-3.5" /> Save</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PARTNER BRANDS */}
        <TabsContent value="brands" className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{brands.length} partner brands</p>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" /> Add Brand</Button>
          </div>
          <Card className="bg-card border-border">
            <CardContent className="p-3">
              <div className="flex flex-wrap gap-3">
                {[...brands].sort((a, b) => a.order - b.order).map((brand) => (
                  <div key={brand.id} className="relative group bg-secondary rounded-lg p-3 flex flex-col items-center gap-2 w-28">
                    <img src={brand.logo} alt={brand.name} className="h-10 w-20 object-contain rounded" />
                    <span className="text-[10px] text-muted-foreground">{brand.name}</span>
                    <Button variant="ghost" size="icon" className="absolute -top-1 -right-1 h-5 w-5 bg-destructive/80 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full" onClick={() => setBrands(prev => prev.filter(b => b.id !== brand.id))}>
                      <Trash2 className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VALUE PROPOSITIONS */}
        <TabsContent value="values" className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{vps.length} value propositions</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" /> Add Value Prop</Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader><DialogTitle>Add Value Proposition</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div className="space-y-1"><Label className="text-xs">Icon (emoji)</Label><Input id="vp-icon" className="bg-secondary border-border h-9" placeholder="e.g. 🚀" /></div>
                  <div className="space-y-1"><Label className="text-xs">Title</Label><Input id="vp-title" className="bg-secondary border-border h-9" placeholder="Feature title" /></div>
                  <div className="space-y-1"><Label className="text-xs">Description</Label><Input id="vp-desc" className="bg-secondary border-border h-9" placeholder="Short description" /></div>
                  <div className="space-y-1">
                    <Label className="text-xs">Target Mode</Label>
                    <Select defaultValue="BOTH">
                      <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOCAL">Local</SelectItem>
                        <SelectItem value="INTERNATIONAL">International</SelectItem>
                        <SelectItem value="BOTH">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button className="bg-primary text-primary-foreground" onClick={() => {
                    const icon = (document.getElementById("vp-icon") as HTMLInputElement)?.value || "✨";
                    const title = (document.getElementById("vp-title") as HTMLInputElement)?.value;
                    const desc = (document.getElementById("vp-desc") as HTMLInputElement)?.value;
                    if (!title) return;
                    setVps(prev => [...prev, { id: `VP-${Date.now()}`, icon, title, description: desc || "", targetMode: "BOTH" as const }]);
                    toast.success("Value prop added");
                  }}>Add</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {vps.map((vp) => (
              <Card key={vp.id} className="bg-card border-border">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{vp.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{vp.title}</p>
                        <p className="text-[10px] text-muted-foreground">{vp.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setVps(prev => prev.filter(v => v.id !== vp.id))}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  {targetBadge(vp.targetMode)}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{faqs.length} FAQ items</p>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" /> Add FAQ</Button>
          </div>
          {[...faqs].sort((a, b) => a.order - b.order).map((faq, i) => (
            <Card key={faq.id} className="bg-card border-border">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFaqs(prev => moveItem(prev, i, -1))}><ChevronUp className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFaqs(prev => moveItem(prev, i, 1))}><ChevronDown className="h-3 w-3" /></Button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{faq.question}</p>
                      {targetBadge(faq.targetMode)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setFaqs(prev => prev.filter(f => f.id !== faq.id))}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* FOOTER */}
        <TabsContent value="footer" className="space-y-3">
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Navigation Links</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {footer.navigation.map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input defaultValue={link.label} className="bg-secondary border-border h-8 text-xs flex-1" />
                    <Input defaultValue={link.url} className="bg-secondary border-border h-8 text-xs flex-1" />
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive shrink-0"><Trash2 className="h-3 w-3" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs"><Plus className="h-3 w-3" /> Add Link</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Social Media</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(footer.social).map(([platform, url]) => (
                  <div key={platform} className="space-y-0.5">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">{platform}</Label>
                    <Input defaultValue={url} className="bg-secondary border-border h-8 text-xs" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Contact Details</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-0.5"><Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</Label><Input defaultValue={footer.contact.email} className="bg-secondary border-border h-8 text-xs" /></div>
                <div className="space-y-0.5"><Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone</Label><Input defaultValue={footer.contact.phone} className="bg-secondary border-border h-8 text-xs" /></div>
                <div className="space-y-0.5"><Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Address</Label><Input defaultValue={footer.contact.address} className="bg-secondary border-border h-8 text-xs" /></div>
              </CardContent>
            </Card>
          </div>
          <Button className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => toast.success("Footer saved")}><Save className="h-3.5 w-3.5" /> Save Footer</Button>
        </TabsContent>

        {/* RECOMMENDATION ENGINE */}
        <TabsContent value="reco" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Recommendation Engine — {pageContext === "feed" ? "Feed Page" : "Shop Page"}
              </CardTitle>
              <CardDescription className="text-xs">
                {pageContext === "feed"
                  ? "Feed page recommendations are driven by social signals — follows, likes, and shares"
                  : "Shop page recommendations are driven by purchase history, trending products, and category browsing"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {Object.entries(recoWeights).map(([key, value]) => {
                const labels: Record<string, { label: string; feedDesc: string; shopDesc: string }> = {
                  follows: { label: "Social Following", feedDesc: "Recommend from vendors the user follows", shopDesc: "Minor influence from followed vendors" },
                  purchases: { label: "Purchase History", feedDesc: "Light influence from past purchases", shopDesc: "Strongly recommend similar to past buys" },
                  trending: { label: "Trending Items", feedDesc: "Surface trending posts in feed", shopDesc: "Show trending products in carousels" },
                  newArrivals: { label: "New Arrivals", feedDesc: "Boost new vendor posts", shopDesc: "Feature recently added products" },
                  categoryAffinity: { label: "Category Affinity", feedDesc: "Match content to browsed categories", shopDesc: "Strongly personalize by category browsing" },
                };
                const info = labels[key] || { label: key, feedDesc: "", shopDesc: "" };
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-xs">{info.label}</Label>
                        <p className="text-[10px] text-muted-foreground">{pageContext === "feed" ? info.feedDesc : info.shopDesc}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] tabular-nums border-border">{value}%</Badge>
                    </div>
                    <Slider value={[value]} min={0} max={100} step={5} onValueChange={(v) => setRecoWeights(key, v[0])} />
                  </div>
                );
              })}
              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="sm" onClick={() => toast.success("Recommendation weights saved")}>
                <Save className="h-3.5 w-3.5" /> Save Recommendation Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
