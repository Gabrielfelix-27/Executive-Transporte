import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PartnersProps {
  scrollSpeed?: number; // px/s
  stopAtRounds?: boolean;
  maxRounds?: number;
  onRoundsComplete?: (rounds: number) => void;
}

export const Partners: React.FC<PartnersProps> = ({
  scrollSpeed = 60, // 60px/s
  stopAtRounds = false,
  maxRounds = 5,
  onRoundsComplete
}) => {
  const { t } = useLanguage();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentRounds, setCurrentRounds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const pausedTimeRef = useRef<number>(0);

  const partners = [
    { name: "JITTERBIT", logo: "/Logo Empresas/Jitterbit.webp", isHighlight: true },
    { name: "KIWIFY", logo: "/Logo Empresas/Kiwify.webp", isHighlight: false },
    { name: "LG", logo: "/Logo Empresas/LG.webp", isHighlight: false },
    { name: "MAPEI", logo: "/Logo Empresas/MAPEI.webp", isHighlight: false },
    { name: "NICE", logo: "/Logo Empresas/Nice.webp", isHighlight: false },
    { name: "SPELL", logo: "/Logo Empresas/Spell.webp", isHighlight: false },
    { name: "ADAPCON", logo: "/Logo Empresas/adapcon.webp", isHighlight: false },
    { name: "AMBIPAR", logo: "/Logo Empresas/ambipar.webp", isHighlight: false },
    { name: "EVERNEX", logo: "/Logo Empresas/evernex.webp", isHighlight: false },
    { name: "IMPORTEK", logo: "/Logo Empresas/Importek.webp", isHighlight: false }
  ];

  // Calcular larguras dos itens
  const getItemWidth = (isHighlight: boolean, isMobile: boolean) => {
    const baseWidth = isMobile ? 92 : 150; // Aumentado 15% adicional (80 * 1.15 = 92)
    const margin = isMobile ? 16 : 48; // mx-2 = 8px each side, md:mx-6 = 24px each side
    const scale = isHighlight ? 1.25 : 1;
    return (baseWidth * scale) + margin;
  };

  // Calcular largura total de um batch
  const getBatchWidth = (isMobile: boolean) => {
    return partners.reduce((total, partner) => {
      return total + getItemWidth(partner.isHighlight, isMobile);
    }, 0);
  };

  // Pré-carregar imagens
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = partners.map((partner) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = partner.logo;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.warn('Algumas imagens falharam ao carregar:', error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  // Função de animação
  const animate = useCallback((timestamp: number) => {
    if (!containerRef.current || isPaused) return;

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp - pausedTimeRef.current;
    }

    const elapsed = timestamp - startTimeRef.current;
    const isMobile = window.innerWidth <= 768;
    const batchWidth = getBatchWidth(isMobile);
    
    // Calcular posição baseada na velocidade
    const distance = (elapsed / 1000) * scrollSpeed;
    const position = -(distance % batchWidth);
    
    // Aplicar transformação
    containerRef.current.style.transform = `translate3d(${position}px, 0, 0)`;
    
    // Verificar se completou um ciclo
    const completedRounds = Math.floor(distance / batchWidth);
    if (completedRounds > currentRounds) {
      setCurrentRounds(completedRounds);
      
      if (onRoundsComplete) {
        onRoundsComplete(completedRounds);
      }
      
      if (stopAtRounds && completedRounds >= maxRounds) {
        setIsPaused(true);
        return;
      }
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [scrollSpeed, currentRounds, isPaused, stopAtRounds, maxRounds, onRoundsComplete]);

  // Iniciar animação quando imagens carregarem
  useEffect(() => {
    if (imagesLoaded && !isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imagesLoaded, animate, isPaused]);

  // Pausar/retomar animação
  const togglePause = () => {
    if (isPaused) {
      pausedTimeRef.current = 0;
      startTimeRef.current = undefined;
      setIsPaused(false);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsPaused(true);
    }
  };

  // Duplicar partners para loop infinito
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center text-gray-900">
          {t('partners.title')}
        </h2>
        
        <div className="relative">
          {/* Container da esteira com overflow hidden */}
          <div className="overflow-hidden">
            <div 
              ref={containerRef}
              className={`flex items-center ${
                imagesLoaded ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-300`}
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              {duplicatedPartners.map((partner, index) => {
                const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
                const isHighlight = partner.isHighlight;
                const scale = isHighlight ? 1.25 : 1;
                
                return (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-none mx-2 md:mx-6 flex items-center justify-center"
                    style={{
                       width: `${(isMobile ? 92 : 150) * scale}px`,
                       height: `${(isMobile ? 62 : 72) * scale}px`, // Aumentado 15% adicional (54 * 1.15 = 62)
                       transform: 'translateZ(0)'
                     }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={`w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 ${
                        isHighlight ? 'drop-shadow-lg' : ''
                      }`}
                      style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                      loading="eager"
                      decoding="sync"
                      onError={(e) => {
                        console.error(`Erro ao carregar logo: ${partner.logo}`);
                        e.currentTarget.style.visibility = 'hidden';
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        

        
        <div className="text-center mt-8">
          <p className="text-gray-600 text-xs sm:text-sm">
            Empresas que confiam na excelência do nosso serviço
          </p>
        </div>
      </div>
    </section>
  );
};

// Export com props padrão
export default Partners;
