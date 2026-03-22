import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Rss, Store, Users, Package,
  ShoppingCart, DollarSign, Bell, Settings, MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const primaryNav = [
  { icon: LayoutDashboard, label: "Overview", path: "/" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: DollarSign, label: "Finance", path: "/finance/revenue" },
];

const moreNav = [
  { icon: Rss, label: "Feed", path: "/feed/posts" },
  { icon: Store, label: "Shop", path: "/shop/homepage" },
  { icon: Users, label: "Vendors", path: "/vendors" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: RotateCcw, label: "Refunds", path: "/refunds" },
  { icon: Star, label: "Reviews", path: "/reviews/products" },
  { icon: Bell, label: "Notifications", path: "/notifications/send" },
  { icon: Settings, label: "Settings", path: "/settings/platform" },
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {primaryNav.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors",
              isActive(item.path) ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-muted-foreground">
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-[10px] font-medium">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-card border-border rounded-t-2xl">
            <div className="grid grid-cols-3 gap-4 py-4">
              {moreNav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.path); setOpen(false); }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl transition-colors",
                    isActive(item.path) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
