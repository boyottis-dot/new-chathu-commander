import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { allProducts, Product } from "@/lib/mock-data-products";
import { Star, Calendar, Eye } from "lucide-react";
import { toast } from "sonner";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const featured = products.filter(p => p.featured);
  const available = products.filter(p => !p.featured && p.status === "Approved");

  const toggleFeatured = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured, featureStart: !p.featured ? new Date().toISOString().split("T")[0] : undefined, featureEnd: !p.featured ? new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0] : undefined } : p));
    toast.success("Updated");
  };

  const updateDate = (id: string, field: "featureStart" | "featureEnd", value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Featured Products</h1>
        <p className="text-muted-foreground">Manage which products appear in carousels, hero slides, and featured sections</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2"><Star className="h-5 w-5 text-primary" /> Currently Featured ({featured.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {featured.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">No featured products. Select products below to feature them.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Product</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Feature Start</TableHead>
                  <TableHead>Feature End</TableHead>
                  <TableHead>Placement Preview</TableHead>
                  <TableHead className="text-right">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featured.map(p => (
                  <TableRow key={p.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-xs text-muted-foreground">IMG</div>
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.vendor}</TableCell>
                    <TableCell className="text-foreground">MWK {p.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Input type="date" value={p.featureStart || ""} onChange={e => updateDate(p.id, "featureStart", e.target.value)} className="w-36 bg-secondary border-border text-foreground text-xs" />
                    </TableCell>
                    <TableCell>
                      <Input type="date" value={p.featureEnd || ""} onChange={e => updateDate(p.id, "featureEnd", e.target.value)} className="w-36 bg-secondary border-border text-foreground text-xs" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant="secondary" className="text-xs">Carousel</Badge>
                        <Badge variant="secondary" className="text-xs">Hero</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => toggleFeatured(p.id)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Available Products ({available.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Product</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Units Sold</TableHead>
                <TableHead className="text-right">Feature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {available.map(p => (
                <TableRow key={p.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-xs text-muted-foreground">IMG</div>
                      <p className="font-medium text-foreground">{p.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.vendor}</TableCell>
                  <TableCell><Badge variant="secondary">{p.category}</Badge></TableCell>
                  <TableCell className="text-foreground">{p.rating} ★</TableCell>
                  <TableCell className="text-foreground">{p.unitsSold}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => toggleFeatured(p.id)}>
                      <Star className="h-4 w-4 mr-1" /> Feature
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedProducts;
