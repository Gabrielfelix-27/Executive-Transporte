import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Lazy loading das páginas para code splitting
const Index = React.lazy(() => import("./pages/Index"));
const VehicleSelection = React.lazy(() => import("./pages/VehicleSelection"));
const PassengerData = React.lazy(() => import("./pages/PassengerData"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const AirportTransfer = React.lazy(() => import("./pages/AirportTransfer"));
const OnDemandService = React.lazy(() => import("./pages/OnDemandService"));
const PointToPoint = React.lazy(() => import("./pages/PointToPoint"));
const Business = React.lazy(() => import("./pages/Business"));
const ExecutiveProtection = React.lazy(() => import("./pages/ExecutiveProtection"));
const VIP360 = React.lazy(() => import("./pages/VIP360"));
const GoogleMapsTest = React.lazy(() => import("./pages/GoogleMapsTest").then(module => ({ default: module.GoogleMapsTest })));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Componente de loading
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Carregando...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vehicle-selection" element={<VehicleSelection />} />
              <Route path="/passenger-data" element={<PassengerData />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/airport-transfer" element={<AirportTransfer />} />
              <Route path="/on-demand-service" element={<OnDemandService />} />
              <Route path="/point-to-point" element={<PointToPoint />} />
              <Route path="/business" element={<Business />} />
              <Route path="/executive-protection" element={<ExecutiveProtection />} />
              <Route path="/vip-360" element={<VIP360 />} />
              <Route path="/google-maps-test" element={<GoogleMapsTest />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          
          {/* WhatsApp Button - Aparece em todas as páginas */}
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
