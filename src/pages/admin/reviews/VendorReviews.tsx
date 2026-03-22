import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vendorReviews as initialReviews, VendorReview, ReviewStatus } from "@/lib/mock-data-reviews";
import { Search, Star, CheckCircle, XCircle, Flag, Award, Trash2 } from "lucide-react";

const statusColors: Record<ReviewStatus, string> = {
  published: "bg-green-500/20 text-green-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  rejected: "bg-destructive/20 text-destructive",
  featured: "bg-primary/20 text-primary",
};

export default function VendorReviews() {
  const [reviews, setReviews] = useState<VendorReview[]>(initialReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [flaggedOnly, setFlaggedOnly] = useState(false);

  const filtered = reviews.filter((r) => {
    const matchesSearch = r.vendorName.toLowerCase().includes(search.toLowerCase()) || r.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesFlagged = !flaggedOnly || r.flagged;
    return matchesSearch && matchesStatus && matchesFlagged;
  });

  const updateStatus = (id: string, status: ReviewStatus) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const removeReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vendor Reviews</h1>
        <p className="text-muted-foreground">Moderate and manage vendor reviews</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by vendor or customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
        <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="featured">Featured</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent></Select>
        <Button variant={flaggedOnly ? "default" : "outline"} onClick={() => setFlaggedOnly(!flaggedOnly)} className="gap-2"><Flag className="h-4 w-4" />Flagged Only</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Vendor</TableHead><TableHead>Customer</TableHead><TableHead>Rating</TableHead><TableHead className="hidden md:table-cell">Comment</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className={r.flagged ? "bg-destructive/5" : ""}>
                  <TableCell className="font-medium text-foreground">{r.vendorName}</TableCell>
                  <TableCell className="text-muted-foreground">{r.customerName}</TableCell>
                  <TableCell><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-primary text-primary" : "text-muted"}`} />))}</div></TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate text-muted-foreground">{r.comment}</TableCell>
                  <TableCell><div className="flex items-center gap-1">{r.flagged && <Flag className="h-3 w-3 text-destructive" />}<Badge className={statusColors[r.status]}>{r.status}</Badge></div></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {r.status === "pending" && <Button size="icon" variant="ghost" className="h-7 w-7 text-green-400" onClick={() => updateStatus(r.id, "published")}><CheckCircle className="h-3 w-3" /></Button>}
                      {r.status !== "featured" && <Button size="icon" variant="ghost" className="h-7 w-7 text-primary" onClick={() => updateStatus(r.id, "featured")}><Award className="h-3 w-3" /></Button>}
                      {r.status !== "rejected" && <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => updateStatus(r.id, "rejected")}><XCircle className="h-3 w-3" /></Button>}
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground" onClick={() => removeReview(r.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
