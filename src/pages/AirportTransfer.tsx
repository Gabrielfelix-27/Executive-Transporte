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
        className="relative min-h-[50vh] sm:min-h-[70vh] pt-0 sm:pt-20 bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/Fotos Site/IMG_4522.webp')",
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

            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-redhat tracking-wide">
              TRANSFER DE LUXO PARA AEROPORTOS EM SÃO PAULO
            </h2>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  O transfer executivo de luxo da Executive Premium atende aos principais aeroportos de São Paulo, Congonhas, Guarulhos, Viracopos, Catarina e Jundiaí, oferecendo muito mais do que um simples deslocamento. Nossa frota de veículos blindados de alto padrão redefine o conceito de transfer, unindo sofisticação, segurança e praticidade.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Monitoramos seu voo em tempo real para garantir pontualidade absoluta, ajustando o horário de recepção automaticamente em casos de atrasos ou remarcações. Cada detalhe é planejado para impressionar e oferecer uma experiência tranquila, seja em viagens de negócios ou lazer. Com a Executive Premium, sua chegada ou partida se transforma em um momento memorável.
                </p>
              </div>
            </div>
          </div>

          {/* Airport Arrival Section */}
          <div className="mb-16">
            <div className="mb-8">
              <img 
                src="/Fotos Site/IMG_3062.webp" 
                alt="Chegada no Aeroporto" 
                className="w-full rounded-lg shadow-lg"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-redhat tracking-wide md:text-left text-right overflow-hidden pr-2">
              CHEGAR OU SAIR DO AERO<wbr />PORTO COM PADRÃO EXECUTIVO
            </h3>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Inicie ou finalize sua viagem com discrição, conforto e exclusividade. O serviço de transfer premium da Executive Premium proporciona a experiência ideal tanto para transporte individual quanto para grupos, com veículos espaçosos, blindados e equipados para acomodar passageiros e bagagens com total comodidade.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                  Após um voo longo ou antes de compromissos importantes, conte com nossos motoristas profissionais, bilíngues e treinados em direção defensiva, para oferecer uma viagem eficiente, segura e totalmente personalizada. Mais que transporte, é um serviço que reflete seu estilo de vida e transmite confiança em cada trajeto.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="mb-16">
            <div className="mb-8">
              <img 
                src="/Fotos Site/IMG_3201.webp" 
                alt="Reserva com Praticidade" 
                className="w-full rounded-lg shadow-lg"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-redhat tracking-wide md:text-left text-right overflow-hidden pr-2">
                RESERVA SIMPLES E TRANSPARENTE
              </h3>
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                    Agendar seu transfer de luxo para aeroportos é rápido e prático. Pelo nosso site ou aplicativo, você escolhe o ponto de partida, destino e a categoria de veículo blindado que melhor atende à sua necessidade.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                    Valorizamos a transparência: o valor exibido na reserva é exatamente o que será pago, sem taxas ocultas ou cobranças adicionais. Nosso suporte dedicado também está sempre disponível para auxiliar em qualquer detalhe da sua solicitação.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 font-redhat text-justify">
                    Executive Premium: sua experiência em mobilidade executiva elevada ao mais alto nível de conforto, segurança e exclusividade.
                  </p>
                </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="md:text-center text-right pr-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-redhat tracking-wide overflow-hidden">
                Pronto para viver o próximo nível em transfer executivo?
              </h3>
              <p className="text-lg text-gray-700 mb-8 font-redhat leading-relaxed overflow-hidden">
                Reserve agora seu transfer para aero<wbr />portos e descubra o que significa viajar com luxo e tranquilidade.
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