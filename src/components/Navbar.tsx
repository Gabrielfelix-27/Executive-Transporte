// Componente de navegação comum para todas as páginas
// Inclui logo, idioma, moeda e menu de navegação

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Globe, Menu, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarProps {
  showBackButton?: boolean;
  backUrl?: string;
  showBreadcrumb?: boolean;
  currentStep?: number;
}

export const Navbar = ({ 
  showBackButton = false, 
  backUrl = "/",
  showBreadcrumb = false,
  currentStep = 0
}: NavbarProps) => {
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();

  const breadcrumbSteps = [
    { number: 1, title: "Classe do serviço", active: currentStep >= 1 },
    { number: 2, title: "Dados do Passageiro", active: currentStep >= 2 },
    { number: 3, title: "Checkout", active: currentStep >= 3 }
  ];

  return (
    <>
      {/* Header Principal */}
      <header className="bg-black border-b border-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/Logos/Logo Letras.png" 
                  alt="Executive Premium Logo" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            
            {/* Controles do lado direito */}
            <div className="flex items-center space-x-4 text-sm">
              {/* Seletor de Idioma */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-transparent">
                    <Globe className="h-4 w-4 mr-2" />
                    {language.toUpperCase()}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="end">
                  <div className="grid gap-1">
                    <button 
                      onClick={() => setLanguage('pt')}
                      className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                        language === 'pt' ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      🇧🇷 {t('header.portuguese')}
                    </button>
                    <button 
                      onClick={() => setLanguage('es')}
                      className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                        language === 'es' ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      🇪🇸 {t('header.spanish')}
                    </button>
                    <button 
                      onClick={() => setLanguage('en')}
                      className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                        language === 'en' ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      🇺🇸 {t('header.english')}
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Seletor de Moeda */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-transparent">
                    {currency === 'BRL' ? 'BRL R$' : 'USD $'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2" align="end">
                  <div className="grid gap-1">
                    <button 
                      onClick={() => setCurrency('BRL')}
                      className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                        currency === 'BRL' ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      🇧🇷 {t('currency.real')}
                    </button>
                    <button 
                      onClick={() => setCurrency('USD')}
                      className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                        currency === 'USD' ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      🇺🇸 {t('currency.dollar')}
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* Menu Principal */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-transparent">
                    <Menu className="h-4 w-4 mr-2" />
                    MENU
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="end">
                  <div className="grid gap-1">
                    <Link 
                      to="/"
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      🏠 Página Principal
                    </Link>
                    <Link 
                      to="/google-maps-demo"
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      🗺️ Google Maps Demo
                    </Link>
                    <div className="h-px bg-gray-200 my-1"></div>
                    <div className="px-3 py-2 text-xs text-gray-500">
                      Mais opções em breve...
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb (se necessário) */}
      {showBreadcrumb && (
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-8">
              {breadcrumbSteps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex items-center">
                    <div className={`rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 ${
                      step.active && currentStep >= step.number
                        ? 'bg-black text-white'
                        : 'border-2 border-gray-300 text-gray-500'
                    }`}>
                      {step.number}
                    </div>
                    <span className={step.active && currentStep >= step.number ? 'font-medium' : 'text-gray-500'}>
                      {step.title}
                    </span>
                  </div>
                  
                  {/* Linha conectora */}
                  {index < breadcrumbSteps.length - 1 && (
                    <div className="flex-1 border-t border-dashed border-gray-300 mx-8 min-w-16"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 