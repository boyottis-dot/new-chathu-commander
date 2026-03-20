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
import { Save, Eye, Pin, Globe, MapPin } from "lucide-react";
import { feedAlgorithmWeights, feedPostTypes } from "@/lib/mock-data-feed";
import { cn } from "@/lib/utils";

export default function FeedAlgorithm() {
  const [weights, setWeights] = useState(feedAlgorithmWeights);
  const [postTypes, setPostTypes] = useState(feedPostTypes);
  const [locationPreview, setLocationPreview] = useState<"local" | "international">("local");
  const [pinnedPostId, setPinnedPostId] = useState("");

  const updateWeight = (key: keyof typeof weights, value: number[]) => {
    setWeights((prev) => ({ ...prev, [key]: value[0] }));
  };

  const togglePostType = (key: string) => {
    setPostTypes((prev) => prev.map((pt) => (pt.key === key ? { ...pt, enabled: !pt.enabled } : pt)));
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Feed Algorithm & Order</h1>
        <p className="text-sm text-muted-foreground mt-1">Control how the social feed ranks and displays content</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Weight Controls */}
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
                    className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                  />
                </div>
              );
            })}
            <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
              <Save className="h-3.5 w-3.5" /> Save Weights
            </Button>
          </CardContent>
        </Card>

        {/* Post Type Toggles */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Post Type Visibility</CardTitle>
            <CardDescription className="text-xs">Toggle which post types appear more frequently in the feed</CardDescription>
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

            {/* Location Preview */}
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

      {/* Pin Post */}
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
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-9 shrink-0">
              <Pin className="h-3.5 w-3.5" /> Pin Post
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">Currently pinned: <span className="text-primary font-mono">POST-1000</span></p>
        </CardContent>
      </Card>
    </div>
  );
}
