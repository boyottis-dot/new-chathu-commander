import {
  LayoutDashboard, Rss, Store, Users, UserCheck, Package,
  ShoppingCart, DollarSign, RotateCcw, Star, Bell, Settings,
  ChevronDown, FileText, Sliders, BookOpen, Gift, Truck,
  PiggyBank, CreditCard, MessageSquare, Flag, Send, History,
  Zap, Shield, Plug, ClipboardList, ImageIcon, Layers, UserPlus,
  BarChart3, Wallet, TrendingUp, Tags, Award, Network, Link2, PieChart,
  Briefcase, Building2, Crown, LayoutGrid, Calendar,
  DollarSign as Budget, Receipt, LineChart, FolderOpen, FileText as FileTemplate,
  PackageSearch, Scale, Headphones, MessageCircle,
  Undo2, Megaphone, FileSpreadsheet,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavSection {
  title: string;
  icon: React.ElementType;
  items: { title: string; url: string; icon: React.ElementType }[];
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    title: "Feed Manager",
    icon: Rss,
    items: [
      { title: "Feed Posts", url: "/feed/posts", icon: FileText },
      { title: "Algorithm & Order", url: "/feed/algorithm", icon: Sliders },
      { title: "Stories", url: "/feed/stories", icon: BookOpen },
      { title: "Special Offers", url: "/feed/offers", icon: Gift },
    ],
  },
  {
    title: "Shop Manager",
    icon: Store,
    items: [
      { title: "Homepage Sections", url: "/shop/homepage", icon: ImageIcon },
      { title: "Categories", url: "/shop/categories", icon: Layers },
      { title: "Collections", url: "/shop/collections", icon: Tags },
    ],
  },
  {
    title: "Vendor Manager",
    icon: Users,
    items: [
      { title: "All Vendors", url: "/vendors", icon: Users },
      { title: "Create Vendor", url: "/vendors/create", icon: UserPlus },
      { title: "Performance", url: "/vendors/performance", icon: BarChart3 },
      { title: "Payouts", url: "/vendors/payouts", icon: Wallet },
    ],
  },
  {
    title: "Customer Manager",
    icon: UserCheck,
    items: [
      { title: "All Customers", url: "/customers", icon: UserCheck },
      { title: "Segments", url: "/customers/segments", icon: TrendingUp },
      { title: "Promos & Gift Cards", url: "/customers/promos", icon: Gift },
    ],
  },
  {
    title: "Product Manager",
    icon: Package,
    items: [
      { title: "Approval Queue", url: "/products/approvals", icon: ClipboardList },
      { title: "All Products", url: "/products", icon: Package },
      { title: "Featured", url: "/products/featured", icon: Award },
      { title: "Inventory", url: "/products/inventory", icon: PackageSearch },
    ],
  },
  {
    title: "Order Manager",
    icon: ShoppingCart,
    items: [
      { title: "All Orders", url: "/orders", icon: ShoppingCart },
      { title: "Delivery", url: "/orders/delivery", icon: Truck },
      { title: "Returns", url: "/orders/returns", icon: Undo2 },
      { title: "Courier Networks", url: "/orders/couriers", icon: Network },
    ],
  },
  {
    title: "Financial Manager",
    icon: DollarSign,
    items: [
      { title: "Revenue", url: "/finance/revenue", icon: DollarSign },
      { title: "Escrow", url: "/finance/escrow", icon: PiggyBank },
      { title: "Payouts", url: "/finance/payouts", icon: CreditCard },
    ],
  },
  {
    title: "Team & HR",
    icon: Briefcase,
    items: [
      { title: "Employees", url: "/team/employees", icon: Users },
      { title: "Departments & Roles", url: "/team/departments", icon: Building2 },
      { title: "Influencer Network", url: "/team/influencers", icon: Crown },
    ],
  },
  {
    title: "Task Manager",
    icon: ClipboardList,
    items: [
      { title: "Task Board", url: "/tasks/board", icon: LayoutGrid },
      { title: "Calendar", url: "/tasks/calendar", icon: Calendar },
    ],
  },
  {
    title: "Operations",
    icon: BarChart3,
    items: [
      { title: "Budget Planner", url: "/operations/budget", icon: DollarSign },
      { title: "Expenses", url: "/operations/expenses", icon: Receipt },
      { title: "Payroll", url: "/operations/payroll", icon: Wallet },
      { title: "Forecasting", url: "/operations/forecasting", icon: LineChart },
    ],
  },
  {
    title: "Documents",
    icon: FolderOpen,
    items: [
      { title: "File Manager", url: "/documents/files", icon: FolderOpen },
      { title: "Templates", url: "/documents/templates", icon: FileTemplate },
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    items: [{ title: "Campaigns", url: "/marketing/campaigns", icon: Megaphone }],
  },
  {
    title: "Bulk Operations",
    icon: FileSpreadsheet,
    items: [{ title: "Import / Export", url: "/bulk", icon: FileSpreadsheet }],
  },
  {
    title: "Refund Manager",
    icon: RotateCcw,
    items: [{ title: "Refund Requests", url: "/refunds", icon: RotateCcw }],
  },
  {
    title: "Disputes",
    icon: Scale,
    items: [{ title: "Resolution Center", url: "/disputes", icon: Scale }],
  },
  {
    title: "Support Center",
    icon: Headphones,
    items: [
      { title: "Tickets", url: "/support/tickets", icon: Headphones },
      { title: "Live Chat", url: "/support/live", icon: MessageCircle },
    ],
  },
  {
    title: "Referral Manager",
    icon: Gift,
    items: [
      { title: "Programs", url: "/referrals/programs", icon: Gift },
      { title: "Links", url: "/referrals/links", icon: Link2 },
      { title: "Analytics", url: "/referrals/analytics", icon: PieChart },
    ],
  },
  {
    title: "Reviews & Reports",
    icon: Star,
    items: [
      { title: "Product Reviews", url: "/reviews/products", icon: Star },
      { title: "Vendor Reviews", url: "/reviews/vendors", icon: MessageSquare },
      { title: "Reported Content", url: "/reviews/reports", icon: Flag },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { title: "Send Notification", url: "/notifications/send", icon: Send },
      { title: "History", url: "/notifications/history", icon: History },
      { title: "Automation Rules", url: "/notifications/rules", icon: Zap },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { title: "Platform", url: "/settings/platform", icon: Settings },
      { title: "Admin Accounts", url: "/settings/admins", icon: Shield },
      { title: "API & Integrations", url: "/settings/integrations", icon: Plug },
      { title: "Audit Log", url: "/settings/audit", icon: ClipboardList },
    ],
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActiveSection = (section: NavSection) =>
    section.items.some((item) => location.pathname === item.url);

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">Chathu</span>
              <span className="text-[10px] text-muted-foreground">Super Admin</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin px-2">
        {navSections.map((section) => {
          const isSingle = section.items.length === 1;
          const active = isActiveSection(section);

          if (isSingle) {
            const item = section.items[0];
            return (
              <SidebarGroup key={section.title} className="p-0 py-0.5">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end
                        className="hover:bg-sidebar-accent/60"
                        activeClassName="bg-sidebar-accent text-primary font-medium"
                      >
                        <section.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{section.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            );
          }

          return (
            <Collapsible key={section.title} defaultOpen={active}>
              <SidebarGroup className="p-0 py-0.5">
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground cursor-pointer">
                    <section.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{section.title}</span>
                        <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </>
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild tooltip={item.title}>
                            <NavLink
                              to={item.url}
                              end
                              className="hover:bg-sidebar-accent/60 pl-9"
                              activeClassName="bg-sidebar-accent text-primary font-medium"
                            >
                              <item.icon className="h-3.5 w-3.5 shrink-0" />
                              {!collapsed && <span>{item.title}</span>}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-primary text-xs font-semibold">SA</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground">Super Admin</span>
              <span className="text-[10px] text-muted-foreground">admin@chathu.mw</span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
