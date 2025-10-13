import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";

const PointToPoint = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Background and Quote Form */}
      <div 
        className="relative min-h-[50vh] sm:min-h-[70vh] pt-0 sm:pt-20 bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/Fotos Site/IMG_4494.webp')",
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

            
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              SERVIÇO EXECUTIVO NA CIDADE
            </h2>
            
            <div className="grid grid-cols-1 gap-12">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  A Executive Premium redefine a forma de se deslocar em São Paulo com o serviço exclusivo Point to Point. Esqueça os transtornos com trânsito, estacionamento ou preocupações com segurança. Nossa frota de veículos blindados de alto padrão, conduzida por motoristas experientes e discretos, está preparada para levá-lo do ponto A ao ponto B com máxima eficiência, conforto e total privacidade.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ideal para executivos, personalidades públicas ou qualquer pessoa que valorize discrição e comodidade, o Point to Point da Executive Premium garante:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Pontualidade absoluta</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Veículos blindados de categoria premium</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Motoristas profissionais e treinados</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Rotas otimizadas para evitar congestionamentos</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Segurança e privacidade em cada detalhe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Experiences Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
              src="/Fotos Site/IMG_2790.webp" 
              alt="Experiências Premium" 
              className="w-full rounded-lg shadow-lg"
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
            />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  EXPERIÊNCIAS PREMIUM
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
              A Executive Premium oferece soluções de mobilidade de luxo pensadas para cada ocasião, unindo segurança, sofisticação e exclusividade em cada trajeto. Nossa frota blindada, aliada a motoristas altamente capacitados, proporciona uma experiência diferenciada em momentos que merecem ser marcados.
            </p>
                
                <div className="space-y-4">
                  <div>
                <p className="font-semibold text-gray-900">• Casamentos Elegantes</p>
                <p className="text-gray-700">Chegue ao seu grande dia com estilo e pontualidade. Nossos veículos premium blindados oferecem o cenário ideal para uma entrada inesquecível.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">• Formaturas Memoráveis</p>
                <p className="text-gray-700">Celebre sua conquista em grande estilo. Nossos carros espaçosos garantem conforto para você e seus amigos, fazendo com que a comemoração comece já no caminho.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">• Aniversários Sofisticados</p>
                <p className="text-gray-700">Transforme sua data especial em um momento ainda mais exclusivo. Cada detalhe do trajeto é pensado para que você viva uma experiência única.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">• Eventos Corporativos de Alto Nível</p>
                <p className="text-gray-700">Impressione clientes e parceiros com deslocamentos executivos que refletem seriedade e excelência.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">• Traslados VIP para Aeroportos</p>
                <p className="text-gray-700">Comece ou finalize sua viagem com tranquilidade. Motoristas bilíngues e frota premium garantem uma recepção sofisticada e sem imprevistos.</p>
              </div>
                  
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed mt-6 mb-6">
                  Com a Executive Premium, cada percurso deixa de ser apenas um deslocamento e se transforma em uma experiência exclusiva de luxo, conforto e segurança. Hoje em São Paulo, em breve também no Rio de Janeiro e em Brasília.
                </p>
                
                <div className="mt-8">
                  <p className="text-xl font-semibold text-gray-900 mb-2">Pronto para viver a experiência Point to Point?</p>
                  <p className="text-lg text-gray-700">Solicite sua cotação e descubra o que significa viajar com excelência.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pronto para uma experiência Point to Point exclusiva?
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Desfrute do luxo de ir direto ao destino com total conforto e segurança.
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

export default PointToPoint;