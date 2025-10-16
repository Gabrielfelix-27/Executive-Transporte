import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy loading das páginas para code splitting
const Index = React.lazy(() => {
  console.log('Carregando Index...');
  return import("./pages/Index");
});
const VehicleSelection = React.lazy(() => import("./pages/VehicleSelection"));
const PassengerData = React.lazy(() => import("./pages/PassengerData"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const PaymentTest = React.lazy(() => import("./pages/PaymentTest"));
const PaymentSuccess = React.lazy(() => import("./pages/PaymentSuccess"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const AirportTransfer = React.lazy(() => import("./pages/AirportTransfer"));
const OnDemandService = React.lazy(() => import("./pages/OnDemandService"));
const PointToPoint = React.lazy(() => import("./pages/PointToPoint"));
const Business = React.lazy(() => import("./pages/Business"));
const ExecutiveProtection = React.lazy(() => import("./pages/ExecutiveProtection"));
const VIP360 = React.lazy(() => import("./pages/VIP360"));
const GoogleMapsTest = React.lazy(() => import("./pages/GoogleMapsTest"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Componente de loading
const PageLoader = () => {
  console.log('PageLoader renderizado');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
};

// Componente de erro
const ErrorFallback = ({ error }: { error: Error }) => {
  console.error('ErrorFallback renderizado:', error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Ops! Algo deu errado</h1>
        <p className="text-gray-600 mb-6">Ocorreu um erro inesperado. Por favor, recarregue a página.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Recarregar Página
        </button>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">Detalhes do erro</summary>
            <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('AppErrorBoundary capturou erro:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AppErrorBoundary componentDidCatch:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} />;
    }

    return this.props.children;
  }
}

const queryClient = new QueryClient();

const App = () => {
  console.log('App componente renderizando...');
  
  return (
    <AppErrorBoundary>
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
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/payment-test" element={<PaymentTest />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/airport-transfer" element={<AirportTransfer />} />
                  <Route path="/on-demand-service" element={<OnDemandService />} />
                  <Route path="/point-to-point" element={<PointToPoint />} />
                  <Route path="/business" element={<Business />} />
                  <Route path="/executive-protection" element={<ExecutiveProtection />} />
                  <Route path="/vip-360" element={<VIP360 />} />
                  <Route path="/google-maps-test" element={<GoogleMapsTest />} />
                  {/* Catch all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              {/* Components outside routes */}
            </BrowserRouter>
            <WhatsAppButton />
            <Analytics />
            <SpeedInsights />
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
};

console.log('App.tsx definido, exportando...');
export default App;
