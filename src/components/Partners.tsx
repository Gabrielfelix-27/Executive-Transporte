import { useLanguage } from "@/contexts/LanguageContext";

export const Partners = () => {
  const { t } = useLanguage();

  const partners = [
    { name: "JITTERBIT", logo: "/Logo Empresas/Jitterbit.webp" },
    { name: "KIWIFY", logo: "/Logo Empresas/Kiwify.webp" },
    { name: "LG", logo: "/Logo Empresas/LG.webp" },
    { name: "MAPEI", logo: "/Logo Empresas/MAPEI.webp" },
    { name: "NICE", logo: "/Logo Empresas/Nice.webp" },
    { name: "SPELL", logo: "/Logo Empresas/Spell.webp" },
    { name: "ADAPCON", logo: "/Logo Empresas/adapcon.webp" },
    { name: "AMBIPAR", logo: "/Logo Empresas/ambipar.webp" },
    { name: "EVERNEX", logo: "/Logo Empresas/evernex.webp" }
  ];

  // Duplicar os parceiros para criar um loop infinito suave
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center text-gray-900">
          {t('partners.title')}
        </h2>
        
        <div className="relative">
          {/* Container da esteira rolante */}
          <div className="flex animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 mx-4 sm:mx-8 flex items-center justify-center min-w-[150px] sm:min-w-[200px] h-24 group"
              >
                <div className="w-28 h-24 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`Logo ${partner.name}`}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      console.error(`Erro ao carregar logo: ${partner.logo}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 text-xs sm:text-sm">
            Empresas que confiam na excelência do nosso serviço
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
          will-change: transform;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Garantir performance consistente em mobile */
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 12s linear infinite;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        }
      `}</style>
    </section>
  );
};
