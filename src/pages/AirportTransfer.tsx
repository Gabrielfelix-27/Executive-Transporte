import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";

const AirportTransfer = () => {
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
                  {t('services.airportTransfer')}
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed font-redhat text-justify">
                  {t('services.airportTransferDesc')}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-redhat tracking-wide">
              TRANSFER DE LUXO PARA AEROPORTOS EM SÃO PAULO
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  "Transfer de luxo" para os principais aeroportos de São Paulo – Congonhas, Guarulhos, Viracopos, Catarina e Jundiaí –, onde nossa frota premium da BMW redefine o conceito de transfer. Monitoramos seu voo em tempo real, garantindo pontualidade e adaptação a imprevistos, seguindo automaticamente suas remarcações. Cada detalhe é pensado para acelerar e impressionar, seja em viagens de negócios ou lazer. Opte pela Executive Premium e transforme suas chegadas em uma experiência memorável.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Transfer Aeroporto" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Airport Arrival Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1583562835057-8d60a5c3f6e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Chegada no Aeroporto" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-redhat tracking-wide">
                  CHEGAR OU SAIR DO AEROPORTO COM ALTO PADRÃO
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Chegue ou parta do aeroporto com sofisticação no mais alto nível. No conforto da nossa frota de BMW, o serviço de transfer premium da Executive Premium oferece discrição, segurança e adaptação de suas necessidades. Seja para um transporte individual ou em grupo. Priorize mais espaço para suas bagagens e ainda seja acompanhado por um serviço e atendimento absoluto para todos os passageiros. Depois de um voo longo ou antes daquele compromisso importante, confie em nossos motoristas profissionais para transformar seus trajetos em uma experiência tranquila e eficiente. Executive Premium: mais que um transporte, uma extensão do seu estilo de vida.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-redhat tracking-wide">
              RESERVA DE TRANSPORTE PARA AEROPORTO COM PRATICIDADE
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Reservar seu transfer de luxo com a Executive Premium é simples e intuitivo. Acesse nosso site ou aplicativo móvel, escolha a classe de veículo ideal – como a sofisticada BMW X7 – e forneça detalhes do trajeto. Em poucos cliques, sua viagem estará planejada, com tarifas claras e sem surpresas. Nosso transparência garante que você saiba exatamente o que está pagando, enquanto nosso suporte dedicado está pronto para ajudar em qualquer momento. Opte pela confiança e privacidade que vem com o pensados nos mínimos detalhes para o seu conforto.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Reserva com Praticidade" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-redhat tracking-wide">
              Pronto para uma experiência premium?
            </h3>
            <p className="text-lg text-gray-700 mb-8 font-redhat leading-relaxed">
              Reserve seu transfer de aeroporto agora e viaje com elegância e conforto.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors font-redhat tracking-wide"
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

export default AirportTransfer; 