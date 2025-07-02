import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import VehicleSelection from "./pages/VehicleSelection";
import PassengerData from "./pages/PassengerData";
import GoogleMapsDemo from "./pages/GoogleMapsDemo";
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
            <Route path="/google-maps-demo" element={<GoogleMapsDemo />} />
            <Route path="/google-maps-test" element={<GoogleMapsTest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
