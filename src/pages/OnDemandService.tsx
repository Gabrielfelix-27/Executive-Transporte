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
                {/* Título e subtítulo removidos */}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-redhat tracking-wide">
              EXPERIÊNCIA DE LUXO COM MOTORISTA POR HORA
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Diga adeus à falta de transportes e descubra a mobilidade de luxo personalizada da Executive Premium. Chegue esperando por táxis ou enfrentar transportes públicos lotados. Com a Executive Premium, conforto é segurança vêm sempre em primeiro lugar.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Personalize Seu Itinerário:</p>
                      <p className="text-gray-700">No mundo da Executive Premium, você decide onde e quando ir. Seu motorista estará sempre à disposição, tornando suas jornadas únicas e adaptadas aos seus planos.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Ganhe Tempo:</p>
                      <p className="text-gray-700">Desfrute da comodidade de embarcar e desembarcar a porta em cada destino, eliminando esperas desnecessárias e otimizando seu dia no máximo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <div>
                      <p className="font-semibold text-gray-900">Viagem com Tranquilidade:</p>
                      <p className="text-gray-700">Vivencio conforto e segurança em um veículo premium blindado, garantindo que suas partes estejam sempre protegidas.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Serviço à Disposição" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Exclusive Experience Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Experiência Exclusiva" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  A EXECUTIVE PREMIUM ELEVA CADA JORNADA A UMA EXPERIÊNCIA EXCLUSIVA!
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Nosso serviço de motorista por hora foi criado para atender suas necessidades com conforto, flexibilidade e muita sofisticação.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Para viagens com múltiplas paradas, garantimos eficiência e tranquilidade. Sem necessidade particular de permitir que você se desloque com</p>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Em compromissos de negócios, nossa prestação premium assegura pontualidade e elegância, eliminando a correria e otimizando seu tempo em reuniões e roadshows.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Nas atividades de lazer, descubra novas cidades com liberdade e estilo. Sempre com um motorista exclusivo à disposição.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <p className="text-gray-700">Para eventos especiais, como casamentos, estreias e concertos, a Executive Premium garante que você curta cada instante sem preocupações, enquanto seu carro espera pelo término seguro.</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                  Descubra a diferença Executive Premium - onde cada viagem se transforma em uma experiência memorável! Seja para lazer e exclusividade.
                </p>
              </div>
            </div>
          </div>

          {/* 24/7 Service Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              EM SÃO PAULO, A EXECUTIVE PREMIUM ESTÁ DISPONÍVEL 24 HORAS POR DIA!
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Garantindo mobilidade premium em cada canto da cidade. Com motoristas profissionais sempre à disposição, você pode agendar seu serviço a qualquer momento e em qualquer local, desfrutando da facilidade de transporte de última geração.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Basta chamar e ter a Executive Premium ao seu lado para viagens seguras e sofisticadas.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Serviço 24/7" 
                  className="w-full rounded-lg shadow-lg"
                />
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