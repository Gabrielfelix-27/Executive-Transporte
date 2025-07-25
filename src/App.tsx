import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import VehicleSelection from "./pages/VehicleSelection";
import PassengerData from "./pages/PassengerData";
import AboutUs from "./pages/AboutUs";
import AirportTransfer from "./pages/AirportTransfer";
import OnDemandService from "./pages/OnDemandService";
import PointToPoint from "./pages/PointToPoint";
import Business from "./pages/Business";
import ExecutiveProtection from "./pages/ExecutiveProtection";
import VIP360 from "./pages/VIP360";
import { GoogleMapsTest } from "./pages/GoogleMapsTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
          
          {/* WhatsApp Button - Aparece em todas as páginas */}
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
