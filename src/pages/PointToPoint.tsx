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
        className="relative min-h-screen pt-20 bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/BG2.png')",
          backgroundSize: "120%",
          backgroundPosition: "right -5px"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 w-full py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-white order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-redhat tracking-wide">
                  POINT TO POINT
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed font-redhat text-justify">
                  {t('services.pointToPointDesc')}
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

      {/* Content Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Main Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              SERVIÇO DE LIMUSINE NA CIDADE
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  A Executive Premium revoluciona sua experiência de deslocamento urbano com o serviço exclusivo Point to Point. Esqueça as preocupações com trânsito, estacionamento ou segurança. Nossa frota de veículos de luxo blindados, conduzida por motoristas altamente qualificados, está pronta para levá-lo do ponto A ao ponto B com máximo conforto e discrição.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ideal para executivos, celebridades ou qualquer pessoa que valorize privacidade e eficiência, o serviço Point to Point da Executive Premium garante:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Pontualidade impecável</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Veículos premium blindados</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Motoristas profissionais e discretos</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Rotas otimizadas para evitar congestionamentos</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Privacidade e segurança incomparáveis</p>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Point to Point" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Premium Experiences Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Experiências Premium" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  EXPERIÊNCIAS PREMIUM
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  A Executive Premium oferece serviços de mobilidade de luxo para todas as suas necessidades, garantindo segurança, conforto e exclusividade em cada trajeto. Nossa frota de veículos blindados e motoristas altamente treinados estão prontos para elevar suas experiências.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900">• Casamentos Elegantes:</p>
                    <p className="text-gray-700">Chegue ao altar com estilo e pontualidade. Nossas BMW 745 Le blindadas proporcionam o cenário perfeito para fotos inesquecíveis e uma entrada triunfal.</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-900">• Formaturas Memoráveis:</p>
                    <p className="text-gray-700">Celebre o grande dia da sua classe. Nossos veículos espaçosos acomodam confortavelmente você e seus amigos, garantindo que a festa comece desde o trajeto.</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-900">• Celebrações de Aniversário Sofisticadas:</p>
                    <p className="text-gray-700">Torne sua data especial ainda mais extraordinária. Com a Executive Premium, cada momento da sua celebração será marcado por luxo e exclusividade.</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-900">• Eventos Corporativos de Alto Nível:</p>
                    <p className="text-gray-700">Impressione clientes e parceiros com nossa frota executiva. BMW X7 e X5 blindadas oferecem o ambiente ideal para reuniões em trânsito ou traslados VIP.</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-900">• Traslados VIP para Aeroportos:</p>
                    <p className="text-gray-700">Inicie ou conclua sua viagem com tranquilidade. Nossos motoristas bilíngues garantem uma experiência suave e sofisticada entre o aeroporto e seu destino final.</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                  Com a Executive Premium, cada trajeto se transforma em uma experiência única de luxo e conforto. Atualmente em São Paulo, em breve no Rio de Janeiro e Brasília.
                </p>
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