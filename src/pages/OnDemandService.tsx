import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";

const OnDemandService = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Background and Quote Form */}
      <div 
        className="relative min-h-[50vh] sm:min-h-[70vh] pt-0 sm:pt-20 bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/Fotos Site/IMG_2921.webp')",
          backgroundSize: "cover",
          backgroundPosition: "left 19%",
          transform: "scaleX(-1)"
        }}
      >
        <div className="relative z-10 w-full py-0 sm:py-8" style={{ transform: "scaleX(-1)" }}>
          <div className="max-w-7xl mx-auto px-0 sm:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-white order-2 lg:order-1">
                {/* Título e subtítulo removidos */}
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
      {/* QuoteForm para mobile */}
      <div className="block lg:hidden">
        <QuoteForm />
      </div>
      {/* Content Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Main Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 gap-12 items-center">
              <div>
                <img 
                  src="/Fotos Site/IMG_4784.webp" 
                  alt="Serviço à Disposição" 
                  className="w-full rounded-lg shadow-lg mb-8"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-redhat tracking-wide">
                  MOTORISTA EXECUTIVO DISPONÍVEL 24 HORAS
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Esqueça a incerteza de depender de táxis. A Executive Premium oferece mobilidade de luxo sob medida para o seu dia a dia. Aqui, conforto e segurança andam juntos em cada detalhe da sua experiência.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Itinerário Sob Medida</p>
                      <p className="text-gray-700">Você escolhe o trajeto, os horários e as paradas. Nosso motorista exclusivo estará sempre pronto para acompanhá-lo, proporcionando viagens personalizadas e adaptadas ao seu estilo de vida.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Mais Produtividade, Menos Espera</p>
                      <p className="text-gray-700">Desembarque exatamente na porta de cada compromisso, eliminando atrasos e otimizando ao máximo seu tempo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Segurança e Conforto em Primeiro Lugar</p>
                      <p className="text-gray-700">Viaje em veículos executivos blindados, que unem luxo, privacidade e proteção em todos os percursos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exclusive Experience Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/Fotos Site/IMG_4886.webp" 
                  alt="Experiência Exclusiva" 
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  EXPERIÊNCIA EXECUTIVA PERSONALIZADA
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  O serviço de motorista por hora da Executive Premium foi desenvolvido para atender a diferentes momentos com flexibilidade, sofisticação e eficiência.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Em deslocamentos com múltiplas paradas, você tem tranquilidade total para seguir seus compromissos sem pressa ou preocupação.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Em agendas corporativas, nosso serviço premium garante pontualidade e discrição, oferecendo a praticidade que executivos precisam em reuniões, visitas e roadshows.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Para momentos de lazer, aproveite a liberdade de explorar a cidade com estilo, contando sempre com um motorista dedicado à sua disposição.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Em ocasiões especiais — como casamentos, eventos sociais ou culturais — você desfruta da celebração enquanto o veículo o aguarda com total segurança e discrição.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 24/7 Service Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 gap-12 items-center">
              <div>
                <img 
                  src="/Fotos Site/IMG_3080.webp" 
                  alt="Serviço 24/7" 
                  className="w-full rounded-lg shadow-lg mb-8"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  DISPONIBILIDADE 24 HORAS EM SÃO PAULO
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Com a Executive Premium, você tem mobilidade executiva em qualquer hora do dia ou da noite. Nossos motoristas profissionais estão sempre prontos para atender às suas necessidades, oferecendo praticidade, segurança e sofisticação em cada trajeto.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Basta agendar e contar com a Executive Premium para transformar cada viagem em uma experiência memorável e exclusiva.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pronto para ter um motorista à sua disposição?
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Experimente o serviço de motorista por hora e descubra uma nova forma de se deslocar pela cidade.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              SOLICITAR COTAÇÃO
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OnDemandService;