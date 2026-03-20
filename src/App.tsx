import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Overview from "@/pages/admin/Overview";
import Placeholder from "@/pages/admin/Placeholder";
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
            <Route path="/feed/posts" element={<Placeholder />} />
            <Route path="/feed/algorithm" element={<Placeholder />} />
            <Route path="/feed/stories" element={<Placeholder />} />
            <Route path="/feed/offers" element={<Placeholder />} />
            {/* Shop Manager */}
            <Route path="/shop/homepage" element={<Placeholder />} />
            <Route path="/shop/categories" element={<Placeholder />} />
            <Route path="/shop/collections" element={<Placeholder />} />
            {/* Vendor Manager */}
            <Route path="/vendors" element={<Placeholder />} />
            <Route path="/vendors/create" element={<Placeholder />} />
            <Route path="/vendors/performance" element={<Placeholder />} />
            <Route path="/vendors/payouts" element={<Placeholder />} />
            {/* Customer Manager */}
            <Route path="/customers" element={<Placeholder />} />
            <Route path="/customers/segments" element={<Placeholder />} />
            <Route path="/customers/promos" element={<Placeholder />} />
            {/* Product Manager */}
            <Route path="/products/approvals" element={<Placeholder />} />
            <Route path="/products" element={<Placeholder />} />
            <Route path="/products/featured" element={<Placeholder />} />
            {/* Order Manager */}
            <Route path="/orders" element={<Placeholder />} />
            <Route path="/orders/delivery" element={<Placeholder />} />
            {/* Financial Manager */}
            <Route path="/finance/revenue" element={<Placeholder />} />
            <Route path="/finance/escrow" element={<Placeholder />} />
            <Route path="/finance/payouts" element={<Placeholder />} />
            {/* Refund Manager */}
            <Route path="/refunds" element={<Placeholder />} />
            {/* Reviews & Reports */}
            <Route path="/reviews/products" element={<Placeholder />} />
            <Route path="/reviews/vendors" element={<Placeholder />} />
            <Route path="/reviews/reports" element={<Placeholder />} />
            {/* Notifications */}
            <Route path="/notifications/send" element={<Placeholder />} />
            <Route path="/notifications/history" element={<Placeholder />} />
            <Route path="/notifications/rules" element={<Placeholder />} />
            {/* Settings */}
            <Route path="/settings/platform" element={<Placeholder />} />
            <Route path="/settings/admins" element={<Placeholder />} />
            <Route path="/settings/integrations" element={<Placeholder />} />
            <Route path="/settings/audit" element={<Placeholder />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
