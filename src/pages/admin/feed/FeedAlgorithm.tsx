import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Save, Eye, Pin, Globe, MapPin, Plus, FlaskConical, Clock, BarChart3, Users, Shuffle, TrendingDown, Zap, Activity } from "lucide-react";
import { feedAlgorithmWeights, feedPostTypes, feedPosts } from "@/lib/mock-data-feed";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CategoryOverride {
  category: string;
  weight: number;
}

interface ABTest {
  id: string;
  name: string;
  variantASplit: number;
  status: "running" | "paused" | "completed";
  startDate: string;
  changes: string;
}

export default function FeedAlgorithm() {
  const [weights, setWeights] = useState(feedAlgorithmWeights);
  const [postTypes, setPostTypes] = useState(feedPostTypes);
  const [locationPreview, setLocationPreview] = useState<"local" | "international">("local");
  const [pinnedPostId, setPinnedPostId] = useState("");

  // Advanced controls
  const [decayCurve, setDecayCurve] = useState(50); // engagement decay rate
  const [freshnessHalfLife, setFreshnessHalfLife] = useState(24); // hours
  const [maxPostsPerVendor, setMaxPostsPerVendor] = useState(3);
  const [diversityBoost, setDiversityBoost] = useState(40);

  // Affinity weights
  const [affinityWeights, setAffinityWeights] = useState({
    purchaseHistory: 80,
    likes: 60,
    follows: 70,
    shares: 50,
    saves: 45,
    viewTime: 55,
  });

  // Time-of-day boosts
  const [timeBoosts, setTimeBoosts] = useState([
    { slot: "06:00–09:00", label: "Morning", boost: 30 },
    { slot: "09:00–12:00", label: "Late Morning", boost: 50 },
    { slot: "12:00–14:00", label: "Lunch", boost: 80 },
    { slot: "14:00–18:00", label: "Afternoon", boost: 60 },
    { slot: "18:00–21:00", label: "Evening", boost: 100 },
    { slot: "21:00–00:00", label: "Night", boost: 70 },
    { slot: "00:00–06:00", label: "Late Night", boost: 10 },
  ]);

  // Category overrides
  const [categoryOverrides, setCategoryOverrides] = useState<CategoryOverride[]>([
    { category: "Fashion", weight: 80 },
    { category: "Electronics", weight: 60 },
    { category: "Beauty", weight: 70 },
    { category: "Food & Drink", weight: 50 },
  ]);
  const [newCatName, setNewCatName] = useState("");

  // A/B Tests
  const [abTests, setAbTests] = useState<ABTest[]>([
    {
      id: "AB-001",
      name: "Social signals vs Purchase history",
      variantASplit: 50,
      status: "running",
      startDate: "2026-03-15",
      changes: "Variant A: follows weight 90%, Variant B: purchase weight 90%",
    },
  ]);
  const [showNewABDialog, setShowNewABDialog] = useState(false);
  const [newAB, setNewAB] = useState({ name: "", split: 50, changes: "" });

  const updateWeight = (key: keyof typeof weights, value: number[]) => {
    setWeights((prev) => ({ ...prev, [key]: value[0] }));
  };

  const togglePostType = (key: string) => {
    setPostTypes((prev) => prev.map((pt) => (pt.key === key ? { ...pt, enabled: !pt.enabled } : pt)));
  };

  const addCategoryOverride = () => {
    if (!newCatName.trim()) return;
    setCategoryOverrides(prev => [...prev, { category: newCatName.trim(), weight: 50 }]);
    setNewCatName("");
  };

  const createABTest = () => {
    if (!newAB.name.trim()) return;
    setAbTests(prev => [...prev, {
      id: `AB-${String(prev.length + 2).padStart(3, "0")}`,
      name: newAB.name,
      variantASplit: newAB.split,
      status: "running",
      startDate: new Date().toISOString().slice(0, 10),
      changes: newAB.changes,
    }]);
    setNewAB({ name: "", split: 50, changes: "" });
    setShowNewABDialog(false);
    toast.success("A/B test created");
  };

  // Mock feed simulation
  const simulatedFeed = feedPosts.slice(0, 8).map((post, i) => ({
    ...post,
    score: Math.round((Math.random() * 40 + 60) * (1 - decayCurve / 200)),
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Feed Algorithm & Order</h1>
        <p className="text-sm text-muted-foreground mt-1">Advanced controls for feed ranking, diversity, and testing</p>
      </div>

      <Tabs defaultValue="signals" className="space-y-4">
        <TabsList className="bg-secondary border border-border h-9 flex-wrap">
          <TabsTrigger value="signals" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Ranking Signals</TabsTrigger>
          <TabsTrigger value="affinity" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">User Affinity</TabsTrigger>
          <TabsTrigger value="timing" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Time & Decay</TabsTrigger>
          <TabsTrigger value="diversity" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Diversity</TabsTrigger>
          <TabsTrigger value="categories" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Categories</TabsTrigger>
          <TabsTrigger value="abtesting" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">A/B Testing</TabsTrigger>
          <TabsTrigger value="simulation" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Simulation</TabsTrigger>
        </TabsList>

        {/* RANKING SIGNALS */}
        <TabsContent value="signals" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Feed Weight Controls</CardTitle>
                <CardDescription className="text-xs">Adjust how much weight each signal carries in the feed ranking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(weights).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    followedVendors: "Followed Vendors",
                    trendingPosts: "Trending Posts",
                    newPosts: "New Posts",
                    sponsoredPosts: "Sponsored Posts",
                  };
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">{labels[key]}</Label>
                        <Badge variant="outline" className="text-[10px] tabular-nums border-border">{value}%</Badge>
                      </div>
                      <Slider
                        value={[value]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(v) => updateWeight(key as keyof typeof weights, v)}
                      />
                    </div>
                  );
                })}
                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="sm" onClick={() => toast.success("Weights saved")}>
                  <Save className="h-3.5 w-3.5" /> Save Weights
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Post Type Visibility</CardTitle>
                <CardDescription className="text-xs">Toggle which post types appear more frequently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {postTypes.map((pt) => (
                  <div key={pt.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{pt.label}</p>
                      <p className="text-[10px] text-muted-foreground">Show {pt.label.toLowerCase()} in feed</p>
                    </div>
                    <Switch checked={pt.enabled} onCheckedChange={() => togglePostType(pt.key)} />
                  </div>
                ))}

                <Separator className="bg-border" />

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Location Feed Preview</p>
                    <p className="text-[10px] text-muted-foreground">Preview what the feed looks like for each mode</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={locationPreview === "local" ? "default" : "outline"}
                      size="sm"
                      className={cn("flex-1 gap-1.5", locationPreview === "local" && "bg-primary text-primary-foreground")}
                      onClick={() => setLocationPreview("local")}
                    >
                      <MapPin className="h-3.5 w-3.5" /> Local
                    </Button>
                    <Button
                      variant={locationPreview === "international" ? "default" : "outline"}
                      size="sm"
                      className={cn("flex-1 gap-1.5", locationPreview === "international" && "bg-primary text-primary-foreground")}
                      onClick={() => setLocationPreview("international")}
                    >
                      <Globe className="h-3.5 w-3.5" /> International
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <Eye className="h-3.5 w-3.5" /> Preview {locationPreview === "local" ? "Local" : "International"} Feed
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pin Post to Top</CardTitle>
              <CardDescription className="text-xs">Pin a specific post to the top of the feed for all users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter post ID (e.g. POST-1005)"
                  value={pinnedPostId}
                  onChange={(e) => setPinnedPostId(e.target.value)}
                  className="bg-secondary border-border h-9"
                />
                <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-9 shrink-0" onClick={() => { toast.success(`Post ${pinnedPostId} pinned`); }}>
                  <Pin className="h-3.5 w-3.5" /> Pin Post
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Currently pinned: <span className="text-primary font-mono">POST-1000</span></p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* USER AFFINITY */}
        <TabsContent value="affinity" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> User Affinity Scoring</CardTitle>
              <CardDescription className="text-xs">Control how user behavior signals influence their personalized feed ranking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(affinityWeights).map(([key, value]) => {
                const labels: Record<string, { label: string; desc: string }> = {
                  purchaseHistory: { label: "Purchase History", desc: "Weight products similar to past purchases" },
                  likes: { label: "Likes", desc: "Boost content similar to liked posts" },
                  follows: { label: "Follows", desc: "Prioritize content from followed vendors" },
                  shares: { label: "Shares", desc: "Boost content types the user shares" },
                  saves: { label: "Saves", desc: "Surface similar saved content" },
                  viewTime: { label: "View Time", desc: "Prioritize content the user spends time on" },
                };
                const { label, desc } = labels[key] || { label: key, desc: "" };
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-xs">{label}</Label>
                        <p className="text-[10px] text-muted-foreground">{desc}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] tabular-nums border-border">{value}%</Badge>
                    </div>
                    <Slider
                      value={[value]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(v) => setAffinityWeights(prev => ({ ...prev, [key]: v[0] }))}
                    />
                  </div>
                );
              })}
              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="sm" onClick={() => toast.success("Affinity weights saved")}>
                <Save className="h-3.5 w-3.5" /> Save Affinity Weights
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TIME & DECAY */}
        <TabsContent value="timing" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2"><TrendingDown className="h-4 w-4 text-primary" /> Engagement Decay Curve</CardTitle>
                <CardDescription className="text-xs">How quickly older posts lose ranking weight over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Decay Rate</Label>
                    <Badge variant="outline" className="text-[10px] tabular-nums border-border">{decayCurve}%</Badge>
                  </div>
                  <Slider value={[decayCurve]} min={0} max={100} step={5} onValueChange={(v) => setDecayCurve(v[0])} />
                  <p className="text-[10px] text-muted-foreground">
                    {decayCurve < 30 ? "Slow decay — older posts stay relevant longer" : decayCurve < 70 ? "Moderate decay — balanced mix of old and new" : "Fast decay — strong preference for fresh content"}
                  </p>
                </div>

                <Separator className="bg-border" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Content Freshness Half-Life</Label>
                    <Badge variant="outline" className="text-[10px] tabular-nums border-border">{freshnessHalfLife}h</Badge>
                  </div>
                  <Slider value={[freshnessHalfLife]} min={1} max={72} step={1} onValueChange={(v) => setFreshnessHalfLife(v[0])} />
                  <p className="text-[10px] text-muted-foreground">Post relevance halves every {freshnessHalfLife} hours</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Time-of-Day Boost Schedule</CardTitle>
                <CardDescription className="text-xs">Boost content engagement during peak hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {timeBoosts.map((tb, i) => (
                  <div key={tb.slot} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">{tb.label} <span className="text-muted-foreground font-normal">({tb.slot})</span></Label>
                      <Badge variant="outline" className="text-[10px] tabular-nums border-border">{tb.boost}%</Badge>
                    </div>
                    <Slider
                      value={[tb.boost]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(v) => setTimeBoosts(prev => prev.map((t, idx) => idx === i ? { ...t, boost: v[0] } : t))}
                    />
                  </div>
                ))}
                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="sm" onClick={() => toast.success("Time boosts saved")}>
                  <Save className="h-3.5 w-3.5" /> Save Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DIVERSITY */}
        <TabsContent value="diversity" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2"><Shuffle className="h-4 w-4 text-primary" /> Feed Diversity Controls</CardTitle>
              <CardDescription className="text-xs">Prevent feed homogeneity and ensure content variety</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">Max Posts Per Vendor</Label>
                    <p className="text-[10px] text-muted-foreground">Maximum consecutive posts from the same vendor</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] tabular-nums border-border">{maxPostsPerVendor}</Badge>
                </div>
                <Slider value={[maxPostsPerVendor]} min={1} max={10} step={1} onValueChange={(v) => setMaxPostsPerVendor(v[0])} />
              </div>

              <Separator className="bg-border" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs">Diversity Boost</Label>
                    <p className="text-[10px] text-muted-foreground">How strongly to inject diverse content types into the feed</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] tabular-nums border-border">{diversityBoost}%</Badge>
                </div>
                <Slider value={[diversityBoost]} min={0} max={100} step={5} onValueChange={(v) => setDiversityBoost(v[0])} />
              </div>

              <Separator className="bg-border" />

              <div className="space-y-3">
                <Label className="text-xs">Content Mix Targets</Label>
                <p className="text-[10px] text-muted-foreground">Ideal distribution of content types in the feed (approximate %)</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Vendor Posts", pct: 40 },
                    { label: "Customer Reviews", pct: 20 },
                    { label: "Offer Posts", pct: 15 },
                    { label: "Collection Cards", pct: 10 },
                    { label: "Sponsored", pct: 10 },
                    { label: "Trending", pct: 5 },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between bg-secondary rounded-md px-3 py-2">
                      <span className="text-xs">{item.label}</span>
                      <span className="text-xs font-medium text-primary tabular-nums">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="sm" onClick={() => toast.success("Diversity settings saved")}>
                <Save className="h-3.5 w-3.5" /> Save Diversity Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CATEGORY OVERRIDES */}
        <TabsContent value="categories" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> Per-Category Weight Overrides</CardTitle>
              <CardDescription className="text-xs">Boost or suppress specific categories in the feed ranking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryOverrides.map((co, i) => (
                <div key={co.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">{co.category}</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] tabular-nums border-border">{co.weight}%</Badge>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-destructive text-[10px]" onClick={() => setCategoryOverrides(prev => prev.filter((_, idx) => idx !== i))}>Remove</Button>
                    </div>
                  </div>
                  <Slider
                    value={[co.weight]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(v) => setCategoryOverrides(prev => prev.map((c, idx) => idx === i ? { ...c, weight: v[0] } : c))}
                  />
                </div>
              ))}

              <Separator className="bg-border" />

              <div className="flex gap-2">
                <Input
                  placeholder="Category name..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="bg-secondary border-border h-9"
                />
                <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-9 shrink-0" onClick={addCategoryOverride}>
                  <Plus className="h-3.5 w-3.5" /> Add Category
                </Button>
              </div>

              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="sm" onClick={() => toast.success("Category overrides saved")}>
                <Save className="h-3.5 w-3.5" /> Save Overrides
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* A/B TESTING */}
        <TabsContent value="abtesting" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{abTests.length} test(s)</p>
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowNewABDialog(true)}>
              <FlaskConical className="h-3.5 w-3.5" /> New A/B Test
            </Button>
          </div>

          {abTests.map(test => (
            <Card key={test.id} className="bg-card border-border">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{test.name}</p>
                      <Badge variant="outline" className={cn("text-[10px]",
                        test.status === "running" ? "text-emerald-400 border-emerald-400/30" :
                        test.status === "paused" ? "text-yellow-400 border-yellow-400/30" :
                        "text-zinc-400 border-zinc-400/30"
                      )}>{test.status}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{test.changes}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{test.id}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Traffic Split</Label>
                    <span className="text-[10px] text-muted-foreground">A: {test.variantASplit}% | B: {100 - test.variantASplit}%</span>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden">
                    <div className="bg-primary" style={{ width: `${test.variantASplit}%` }} />
                    <div className="bg-blue-500" style={{ width: `${100 - test.variantASplit}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Started: {test.startDate}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-7 text-xs border-border" onClick={() => {
                      setAbTests(prev => prev.map(t => t.id === test.id ? { ...t, status: t.status === "running" ? "paused" : "running" } : t));
                      toast.success("Test status updated");
                    }}>
                      {test.status === "running" ? "Pause" : "Resume"}
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs border-border text-destructive" onClick={() => {
                      setAbTests(prev => prev.filter(t => t.id !== test.id));
                      toast.success("Test deleted");
                    }}>
                      End Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Dialog open={showNewABDialog} onOpenChange={setShowNewABDialog}>
            <DialogContent className="bg-card border-border">
              <DialogHeader><DialogTitle>Create A/B Test</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Test Name</Label>
                  <Input value={newAB.name} onChange={(e) => setNewAB(prev => ({ ...prev, name: e.target.value }))} className="bg-secondary border-border h-9" placeholder="e.g. Social vs Purchase ranking" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Variant A Traffic %</Label>
                  <Slider value={[newAB.split]} min={10} max={90} step={5} onValueChange={(v) => setNewAB(prev => ({ ...prev, split: v[0] }))} />
                  <p className="text-[10px] text-muted-foreground">A: {newAB.split}% | B: {100 - newAB.split}%</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Changes Description</Label>
                  <Input value={newAB.changes} onChange={(e) => setNewAB(prev => ({ ...prev, changes: e.target.value }))} className="bg-secondary border-border h-9" placeholder="Describe what differs between A and B" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setShowNewABDialog(false)}>Cancel</Button>
                <Button className="bg-primary text-primary-foreground" onClick={createABTest}>Create Test</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* SIMULATION */}
        <TabsContent value="simulation" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Feed Simulation Preview</CardTitle>
              <CardDescription className="text-xs">Preview how the current algorithm settings rank real posts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-[10px] border-border">Decay: {decayCurve}%</Badge>
                <Badge variant="outline" className="text-[10px] border-border">Half-life: {freshnessHalfLife}h</Badge>
                <Badge variant="outline" className="text-[10px] border-border">Max/vendor: {maxPostsPerVendor}</Badge>
                <Badge variant="outline" className="text-[10px] border-border">Diversity: {diversityBoost}%</Badge>
              </div>
              {simulatedFeed.map((post, i) => (
                <div key={post.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <span className="text-xs text-muted-foreground w-5 tabular-nums">#{i + 1}</span>
                  <img src={post.thumbnail} alt="" className="h-8 w-8 rounded bg-secondary object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{post.author}</p>
                    <p className="text-[10px] text-muted-foreground">{post.attachedProduct || "No product"} · {post.likes} likes</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-[10px] tabular-nums border-primary/30 text-primary">{post.score}pts</Badge>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{post.authorType}</p>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-muted-foreground text-center pt-2">Scores are approximate based on current settings</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
