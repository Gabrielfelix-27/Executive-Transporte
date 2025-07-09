import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";

const Business = () => {
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
                  BUSINESS
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed font-redhat text-justify">
                  {t('services.businessDesc')}
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
          
          {/* Executive Transfer Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Transfer Executivo" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  TRANSFER EXECUTIVO EXECUTIVE PREMIUM — CHEGUE COM CLASSE
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Se você acaba de desembarcar, cansado após um voo longo, não há forma mais tranquila e elegante de seguir viagem do que com um transfer Executive Premium direto do aeroporto ao seu destino.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Atuamos exclusivamente em São Paulo, oferecendo uma alternativa premium para quem deseja evitar o estresse do transporte público ou a imprevisibilidade dos táxis locais. Nossos motoristas acompanham seu voo em tempo real e se ajustam automaticamente a qualquer atraso, garantindo uma recepção pontual e personalizada.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Todos os condutores Executive Premium são cuidadosamente selecionados, altamente treinados e possuem conhecimento profundo da cidade. Estão sempre prontos para oferecer orientações e sugestões sob medida para a sua estadia.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Office Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              SEU ESCRITÓRIO EM MOVIMENTO
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Transforme cada trajeto em um momento produtivo com a Executive Premium. Nossos veículos foram cuidadosamente escolhidos para oferecer o ambiente ideal para que você possa trabalhar, se concentrar ou simplesmente relaxar com total privacidade e silêncio.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Graças aos motores híbridos, os carros da Executive Premium oferecem uma condução extremamente silenciosa — perfeita para chamadas de vídeo, leitura de relatórios ou revisão de apresentações durante o caminho. O Wi-Fi a bordo garantem que você esteja sempre conectado, sem depender de redes públicas instáveis.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Para garantir a máxima discrição, todos os nossos veículos contam com vidros de privacidade blindados, criando um ambiente reservado, elegante e livre de distrações externas.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Seja indo para uma reunião importante ou retornando de um compromisso, com a Executive Premium, cada trajeto é uma extensão do seu escritório — com conforto, sofisticação e foco.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Escritório em Movimento" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Easy Booking Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Reserva com Facilidade" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  RESERVE COM FACILIDADE
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Reservar seu transfer com a Executive Premium é simples e direto. Através do nosso site ou aplicativo, você escolhe o ponto de partida, destino e a categoria do veículo que melhor se adequa à sua ocasião.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Transparência é um dos nossos pilares: o valor exibido na reserva é exatamente o que você pagará — sem taxas ocultas ou surpresas. Uma forma clara e elegante de começar sua experiência em São Paulo.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pronto para elevar suas viagens de negócios?
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Experimente o transporte executivo da Executive Premium e transforme cada trajeto em uma oportunidade de produtividade.
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

export default Business; 