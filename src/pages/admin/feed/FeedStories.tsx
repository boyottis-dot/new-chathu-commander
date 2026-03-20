import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Star, Eye, Users } from "lucide-react";
import { stories } from "@/lib/mock-data-feed";
import { cn } from "@/lib/utils";

export default function FeedStories() {
  const [storyList, setStoryList] = useState(stories);

  const removeStory = (id: string) => setStoryList((prev) => prev.filter((s) => s.id !== id));

  const featureStory = (id: string) => {
    setStoryList((prev) =>
      prev.map((s) => ({ ...s, featured: s.id === id }))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Stories Manager</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage active vendor stories in the stories row</p>
        </div>
        <Badge variant="outline" className="border-border text-xs">
          {storyList.filter((s) => s.active).length} active
        </Badge>
      </div>

      {/* Stories Row Preview */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Stories Row Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {storyList.filter((s) => s.active).sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0)).map((story) => (
              <div key={story.id} className="flex flex-col items-center gap-1.5 shrink-0">
                <div className={cn("h-16 w-16 rounded-full p-0.5", story.featured ? "bg-gradient-to-br from-primary to-primary/50" : "bg-border")}>
                  <div className="h-full w-full rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{story.avatar}</span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground w-16 text-center truncate">{story.vendor.split(" ")[0]}</span>
                {story.featured && <Badge className="bg-primary/15 text-primary text-[8px] px-1 py-0 border-0">Featured</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {storyList.map((story) => (
          <Card key={story.id} className={cn("bg-card border-border overflow-hidden", !story.active && "opacity-50")}>
            <div className="relative h-40">
              <img src={story.thumbnail} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs font-medium text-white">{story.vendor}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-white/70 flex items-center gap-1"><Eye className="h-3 w-3" />{story.views}</span>
                  <span className="text-[10px] text-white/70">{new Date(story.postedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
              {story.featured && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] px-1.5 py-0 border-0">
                  <Star className="h-2.5 w-2.5 mr-0.5 fill-current" /> Featured
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 bg-black/40 hover:bg-black/60 text-white">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem className="text-xs gap-2" onClick={() => featureStory(story.id)}>
                    <Star className="h-3.5 w-3.5" /> {story.featured ? "Remove Feature" : "Feature First"}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs gap-2 text-destructive" onClick={() => removeStory(story.id)}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove Story
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
