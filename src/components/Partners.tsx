import { useLanguage } from "@/contexts/LanguageContext";

export const Partners = () => {
  const { t } = useLanguage();

  const partners = [
    { name: "ROSEWOOD", logo: "🏨" },
    { name: "MENTORE", logo: "🏢" },
    { name: "TIVOLI", logo: "🏨" },
    { name: "JW MARRIOTT", logo: "🏨" },
    { name: "HOTEL UNIQUE", logo: "🏨" },
    { name: "FASANO", logo: "🏨" },
    { name: "COPACABANA PALACE", logo: "🏨" },
    { name: "EMBRAER", logo: "✈️" },
    { name: "VALE", logo: "🏭" },
    { name: "ITAÚ", logo: "🏦" },
    { name: "BRADESCO", logo: "🏦" },
    { name: "PETROBRAS", logo: "⛽" },
    { name: "AMBEV", logo: "🍺" },
    { name: "MAGAZINE LUIZA", logo: "🛍️" },
    { name: "NATURA", logo: "🌿" },
    { name: "B3", logo: "📈" }
  ];

  // Duplicar os parceiros para criar um loop infinito suave
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          {t('partners.title')}
        </h2>
        
        <div className="relative">
          {/* Container da esteira rolante */}
          <div className="flex animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 mx-8 flex flex-col items-center justify-center min-w-[200px] h-24 group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <div className="text-lg font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300 text-center">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradientes nas bordas para efeito de fade */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Parceiros que confiam na excelência do nosso serviço
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
