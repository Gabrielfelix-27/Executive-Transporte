// Componente de navegação comum para todas as páginas
// Inclui logo, moeda e menu de navegação

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/hooks/useCurrency";
import { useEffect, useState } from "react";

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
  const { t } = useLanguage();
  const { currency, setCurrency, exchangeRate, loading } = useCurrency();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const breadcrumbSteps = [
    { number: 1, title: t('nav.serviceClass'), active: currentStep >= 1 },
    { number: 2, title: t('nav.passengerData'), active: currentStep >= 2 },
    { number: 3, title: t('nav.checkout'), active: currentStep >= 3 }
  ];

  return (
    <>
      {/* Header Principal */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,${Math.min(0.95, 0.8 + scrollY * 0.001)}) 0%, rgba(0,0,0,${Math.min(0.85, 0.6 + scrollY * 0.001)}) 70%)`,
          backdropFilter: `blur(${Math.min(30, 15 + scrollY * 0.05)}px) saturate(180%)`,
          borderBottom: `1px solid rgba(255,255,255,${Math.min(0.3, 0.1 + scrollY * 0.0005)})`,
          boxShadow: `0 8px 32px rgba(0,0,0,${Math.min(0.4, 0.1 + scrollY * 0.001)})`
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo à esquerda - mobile */}
            <div className="flex sm:hidden items-center">
              <Link to="/" className="flex items-center justify-center">
                <img 
                  src="/Logos/Logo solo.png" 
                  alt="Executive Logo" 
                  className="h-8 w-8 mr-4"
                />
              </Link>
            </div>

            {/* Menu à esquerda - desktop */}
            <div className="hidden sm:flex items-center justify-start w-1/3">
              {/* Menu Principal */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-transparent font-redhat font-bold uppercase">
                    <Menu className="h-4 w-4 mr-2" />
                    {t('header.menu')}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="start">
                  <div className="grid gap-1">
                    <Link 
                      to="/"
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 font-bold uppercase"
                    >
                      {t('header.homepage')}
                    </Link>
                    <Link 
                      to="/about-us"
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 font-bold uppercase"
                    >
                      {t('header.aboutUs')}
                    </Link>
                    <div className="h-px bg-gray-200 my-1"></div>
                    <div className="px-3 py-2 text-xs text-gray-500 font-bold uppercase">
                      {t('header.moreOptions')}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Logo centralizado - desktop */}
            <div className="hidden sm:flex items-center justify-center w-1/3">
              <Link to="/" className="flex items-center">
                <img 
                  src="/Logos/Logo Letras.png" 
                  alt="Executive Premium Logo" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            
            {/* Menu à direita - mobile e controles desktop */}
            <div className="flex items-center justify-end w-1/3 space-x-4 text-sm sm:w-1/3">
              {/* Menu Principal - Mobile */}
               <div className="flex sm:hidden">
                 <Popover>
                   <PopoverTrigger asChild>
                     <Button variant="ghost" size="lg" className="text-white hover:text-yellow-400 hover:bg-transparent p-3">
                       <Menu className="h-8 w-8" />
                     </Button>
                   </PopoverTrigger>
                   <PopoverContent className="w-56 p-2" align="end">
                     <div className="grid gap-1">
                       <Link 
                         to="/"
                         className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 font-bold uppercase"
                       >
                         {t('header.homepage')}
                       </Link>
                       <Link 
                         to="/about-us"
                         className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 font-bold uppercase"
                       >
                         {t('header.aboutUs')}
                       </Link>
                       <div className="h-px bg-gray-200 my-1"></div>
                       
                       {/* Seletor de Moeda - apenas no mobile */}
                       <Popover>
                         <PopoverTrigger asChild>
                           <button className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 font-bold uppercase">
                             MOEDA
                             <ChevronDown className="h-4 w-4" />
                           </button>
                         </PopoverTrigger>
                         <PopoverContent className="w-48 p-2" align="start">
                           <div className="grid gap-1">
                             <button 
                               onClick={() => setCurrency('BRL')}
                               className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full ${
                                 currency === 'BRL' ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-700'
                               }`}
                             >
                               🇧🇷 {t('currency.real')}
                             </button>
                             <button 
                               onClick={() => setCurrency('USD')}
                               className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 w-full ${
                                 currency === 'USD' ? 'bg-yellow-50 text-yellow-600 font-medium' : 'text-gray-700'
                               }`}
                             >
                               🇺🇸 {t('currency.dollar')}
                             </button>
                             {currency === 'USD' && exchangeRate && (
                               <div className="px-3 py-2 text-xs text-gray-500 border-t">
                                 1 USD = R$ {exchangeRate.toFixed(2)}
                               </div>
                             )}
                           </div>
                         </PopoverContent>
                       </Popover>
                       <div className="h-px bg-gray-200 my-1"></div>
                       
                       <div className="px-3 py-2 text-xs text-gray-500 font-bold uppercase">
                         {t('header.moreOptions')}
                       </div>
                     </div>
                   </PopoverContent>
                 </Popover>
               </div>

              {/* Seletor de Moeda - Desktop only */}
              <div className="hidden sm:block">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-transparent">
                      {currency === 'BRL' ? 'BRL R$' : 'USD $'}
                      {loading && <span className="ml-1 text-xs">⏳</span>}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2" align="end">
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
                      {currency === 'USD' && exchangeRate && (
                        <div className="px-3 py-2 text-xs text-gray-500 border-t">
                          1 USD = R$ {exchangeRate.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb (se necessário) */}
      {showBreadcrumb && (
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            {/* Layout para Desktop */}
            <div className="hidden sm:flex items-center space-x-8">
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

            {/* Layout para Mobile */}
            <div className="flex sm:hidden items-center justify-between space-x-2">
              {breadcrumbSteps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex items-center w-full">
                    <div className={`rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 ${
                      step.active && currentStep >= step.number
                        ? 'bg-black text-white'
                        : 'border-2 border-gray-300 text-gray-500'
                    }`}>
                      {step.number}
                    </div>
                    <span className={`text-xs truncate ${step.active && currentStep >= step.number ? 'font-medium' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {/* Linha conectora mobile */}
                  {index < breadcrumbSteps.length - 1 && (
                    <div className="flex-1 border-t border-dashed border-gray-300 mx-2 min-w-4"></div>
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