import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Overview from "@/pages/admin/Overview";
// Phase 11 & 12 imports below
import FeedPosts from "@/pages/admin/feed/FeedPosts";
import FeedAlgorithm from "@/pages/admin/feed/FeedAlgorithm";
import FeedStories from "@/pages/admin/feed/FeedStories";
import FeedOffers from "@/pages/admin/feed/FeedOffers";
import HomepageSections from "@/pages/admin/shop/HomepageSections";
import CategoryManager from "@/pages/admin/shop/CategoryManager";
import CollectionManager from "@/pages/admin/shop/CollectionManager";
import AllVendors from "@/pages/admin/vendors/AllVendors";
import CreateVendor from "@/pages/admin/vendors/CreateVendor";
import VendorPerformance from "@/pages/admin/vendors/VendorPerformance";
import VendorPayouts from "@/pages/admin/vendors/VendorPayouts";
import AllCustomers from "@/pages/admin/customers/AllCustomers";
import CustomerSegments from "@/pages/admin/customers/CustomerSegments";
import GiftCardsPromos from "@/pages/admin/customers/GiftCardsPromos";
import ProductApprovals from "@/pages/admin/products/ProductApprovals";
import AllProducts from "@/pages/admin/products/AllProducts";
import FeaturedProducts from "@/pages/admin/products/FeaturedProducts";
import AllOrders from "@/pages/admin/orders/AllOrders";
import DeliveryManager from "@/pages/admin/orders/DeliveryManager";
import RevenueDashboard from "@/pages/admin/finance/RevenueDashboard";
import EscrowManager from "@/pages/admin/finance/EscrowManager";
import PayoutManager from "@/pages/admin/finance/PayoutManager";
import RefundManager from "@/pages/admin/refunds/RefundManager";
import ProductReviews from "@/pages/admin/reviews/ProductReviews";
import VendorReviews from "@/pages/admin/reviews/VendorReviews";
import ReportedContent from "@/pages/admin/reviews/ReportedContent";
import SendNotification from "@/pages/admin/notifications/SendNotification";
import NotificationHistory from "@/pages/admin/notifications/NotificationHistory";
import AutomationRules from "@/pages/admin/notifications/AutomationRules";
import PlatformSettings from "@/pages/admin/settings/PlatformSettings";
import AdminAccounts from "@/pages/admin/settings/AdminAccounts";
import ApiIntegrations from "@/pages/admin/settings/ApiIntegrations";
import AuditLog from "@/pages/admin/settings/AuditLog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Overview />} />
            {/* Feed Manager */}
            <Route path="/feed/posts" element={<FeedPosts />} />
            <Route path="/feed/algorithm" element={<FeedAlgorithm />} />
            <Route path="/feed/stories" element={<FeedStories />} />
            <Route path="/feed/offers" element={<FeedOffers />} />
            {/* Shop Manager */}
            <Route path="/shop/homepage" element={<HomepageSections />} />
            <Route path="/shop/categories" element={<CategoryManager />} />
            <Route path="/shop/collections" element={<CollectionManager />} />
            {/* Vendor Manager */}
            <Route path="/vendors" element={<AllVendors />} />
            <Route path="/vendors/create" element={<CreateVendor />} />
            <Route path="/vendors/performance" element={<VendorPerformance />} />
            <Route path="/vendors/payouts" element={<VendorPayouts />} />
            {/* Customer Manager */}
            <Route path="/customers" element={<AllCustomers />} />
            <Route path="/customers/segments" element={<CustomerSegments />} />
            <Route path="/customers/promos" element={<GiftCardsPromos />} />
            {/* Product Manager */}
            <Route path="/products/approvals" element={<ProductApprovals />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/featured" element={<FeaturedProducts />} />
            {/* Order Manager */}
            <Route path="/orders" element={<AllOrders />} />
            <Route path="/orders/delivery" element={<DeliveryManager />} />
            {/* Financial Manager */}
            <Route path="/finance/revenue" element={<RevenueDashboard />} />
            <Route path="/finance/escrow" element={<EscrowManager />} />
            <Route path="/finance/payouts" element={<PayoutManager />} />
            {/* Refund Manager */}
            <Route path="/refunds" element={<RefundManager />} />
            {/* Reviews & Reports */}
            <Route path="/reviews/products" element={<ProductReviews />} />
            <Route path="/reviews/vendors" element={<VendorReviews />} />
            <Route path="/reviews/reports" element={<ReportedContent />} />
            {/* Notifications */}
            <Route path="/notifications/send" element={<SendNotification />} />
            <Route path="/notifications/history" element={<NotificationHistory />} />
            <Route path="/notifications/rules" element={<AutomationRules />} />
            {/* Settings */}
            <Route path="/settings/platform" element={<PlatformSettings />} />
            <Route path="/settings/admins" element={<AdminAccounts />} />
            <Route path="/settings/integrations" element={<ApiIntegrations />} />
            <Route path="/settings/audit" element={<AuditLog />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
