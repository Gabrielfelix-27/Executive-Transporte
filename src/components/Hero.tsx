import { QuoteForm } from "./QuoteForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/hooks/useCurrency";

export const Hero = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency, exchangeRate, loading } = useCurrency();

  return (
    <div 
      className="relative min-h-screen pt-20 bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url('/BG2.png')",
        backgroundSize: "120%",
        backgroundPosition: "right -5px"
      }}
    >
      <div className="relative z-10 w-full py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content - Removido */}
            <div className="text-white order-2 lg:order-1">
              {/* Texto removido conforme solicitado */}
            </div>

            {/* Right Content - Quote Form */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
