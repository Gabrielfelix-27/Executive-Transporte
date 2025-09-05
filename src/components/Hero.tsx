import { QuoteForm } from "./QuoteForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/hooks/useCurrency";

export const Hero = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency, exchangeRate, loading } = useCurrency();

  return (
    <>
      {/* Seção do Background */}
      <div 
        className="relative min-h-[50vh] sm:min-h-[70vh] pt-0 sm:pt-20 bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/Fotos Site/IMG_3233.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transform: "scaleX(-1)"
        }}
      >
        <div className="relative z-10 w-full py-0 sm:py-8" style={{ transform: "scaleX(-1)" }}>
          <div className="max-w-7xl mx-auto px-0 sm:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center">
              
              {/* Left Content - Removido */}
              <div className="text-white order-2 lg:order-1">
                {/* Texto removido conforme solicitado */}
              </div>

              {/* Right Content - Quote Form (desktop) / Espaço vazio (mobile) */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                {/* Formulário visível apenas no desktop */}
                <div className="hidden lg:block">
                  <QuoteForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
