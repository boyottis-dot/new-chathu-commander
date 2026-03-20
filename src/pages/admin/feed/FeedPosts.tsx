import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Trash2, Star, AlertTriangle, Heart, Bookmark, MousePointerClick, Filter, X } from "lucide-react";
import { feedPosts } from "@/lib/mock-data-feed";
import { cn } from "@/lib/utils";

export default function FeedPosts() {
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reportedFilter, setReportedFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return feedPosts.filter((p) => {
      if (search && !p.author.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (authorFilter !== "all" && p.authorType !== authorFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (reportedFilter === "reported" && !p.reported) return false;
      return true;
    });
  }, [search, authorFilter, statusFilter, reportedFilter]);

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((p) => p.id)));
  };

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const hasActiveFilters = authorFilter !== "all" || statusFilter !== "all" || reportedFilter !== "all";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feed Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all social feed posts</p>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by author or post ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border h-9" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className={cn("h-9 gap-1.5", hasActiveFilters && "border-primary text-primary")} onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-3.5 w-3.5" />
                Filters
                {hasActiveFilters && <span className="ml-1 bg-primary text-primary-foreground rounded-full h-4 w-4 text-[10px] flex items-center justify-center">{[authorFilter, statusFilter, reportedFilter].filter(f => f !== "all").length}</span>}
              </Button>
              {selected.size > 0 && (
                <Button variant="destructive" size="sm" className="h-9 gap-1.5">
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove {selected.size}
                </Button>
              )}
            </div>
          </div>
          {showFilters && (
            <div className="flex flex-wrap gap-2 pt-2">
              <Select value={authorFilter} onValueChange={setAuthorFilter}>
                <SelectTrigger className="w-[140px] h-8 text-xs bg-secondary border-border"><SelectValue placeholder="Author type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Authors</SelectItem>
                  <SelectItem value="vendor">Vendors</SelectItem>
                  <SelectItem value="customer">Customers</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] h-8 text-xs bg-secondary border-border"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="removed">Removed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={reportedFilter} onValueChange={setReportedFilter}>
                <SelectTrigger className="w-[130px] h-8 text-xs bg-secondary border-border"><SelectValue placeholder="Reports" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="reported">Reported Only</SelectItem>
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-muted-foreground" onClick={() => { setAuthorFilter("all"); setStatusFilter("all"); setReportedFilter("all"); }}>
                  <X className="h-3 w-3" /> Clear
                </Button>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-10"><Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></TableHead>
                  <TableHead className="text-xs text-muted-foreground">Post</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Author</TableHead>
                  <TableHead className="text-xs text-muted-foreground hidden lg:table-cell">Product</TableHead>
                  <TableHead className="text-xs text-muted-foreground text-center hidden md:table-cell"><Heart className="h-3 w-3 mx-auto" /></TableHead>
                  <TableHead className="text-xs text-muted-foreground text-center hidden md:table-cell"><Bookmark className="h-3 w-3 mx-auto" /></TableHead>
                  <TableHead className="text-xs text-muted-foreground text-center hidden lg:table-cell"><MousePointerClick className="h-3 w-3 mx-auto" /></TableHead>
                  <TableHead className="text-xs text-muted-foreground">Status</TableHead>
                  <TableHead className="text-xs text-muted-foreground w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.slice(0, 20).map((post) => (
                  <TableRow key={post.id} className="border-border">
                    <TableCell><Checkbox checked={selected.has(post.id)} onCheckedChange={() => toggle(post.id)} /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <img src={post.thumbnail} alt="" className="h-9 w-9 rounded-md object-cover bg-secondary" />
                        <div>
                          <span className="text-xs font-mono text-primary">{post.id}</span>
                          <p className="text-[10px] text-muted-foreground">{new Date(post.datePosted).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs font-medium">{post.author}</p>
                      <Badge variant="outline" className={cn("text-[9px] mt-0.5", post.authorType === "vendor" ? "border-primary/30 text-primary" : "border-border text-muted-foreground")}>
                        {post.authorType}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{post.attachedProduct || "—"}</span>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell"><span className="text-xs tabular-nums">{post.likes}</span></TableCell>
                    <TableCell className="text-center hidden md:table-cell"><span className="text-xs tabular-nums">{post.saves}</span></TableCell>
                    <TableCell className="text-center hidden lg:table-cell"><span className="text-xs tabular-nums">{post.purchaseClicks}</span></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className={cn("text-[10px]", post.status === "active" ? "border-success/30 text-success" : "border-destructive/30 text-destructive")}>
                          {post.status}
                        </Badge>
                        {post.reported && <AlertTriangle className="h-3 w-3 text-warning" />}
                        {post.featured && <Star className="h-3 w-3 text-primary fill-primary" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem className="text-xs gap-2"><Eye className="h-3.5 w-3.5" /> View Post</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs gap-2"><Star className="h-3.5 w-3.5" /> {post.featured ? "Unfeature" : "Feature"}</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs gap-2 text-warning"><AlertTriangle className="h-3.5 w-3.5" /> Warn Author</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Remove Post</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-3 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Showing {Math.min(20, filtered.length)} of {filtered.length} posts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
