import { QuoteForm } from "./QuoteForm";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();

  return (
    <div className="relative min-h-screen">

      {/* Hero Content */}
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551895235-684766d4edd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-white order-2 lg:order-1">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                  {t('hero.title')}
                  <br />
                  <span className="text-yellow-400">{t('hero.subtitle')}</span>
                </h1>
                <p className="text-lg lg:text-xl mb-8 text-gray-200">
                  {t('hero.description')}
                </p>
              </div>

              {/* Right Content - Quote Form */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
