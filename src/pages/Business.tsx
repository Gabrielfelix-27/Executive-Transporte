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
        className="relative min-h-[50vh] sm:min-h-[70vh] pt-0 sm:pt-20 bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/Fotos Site/IMG_2646.webp')",
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
          
          {/* Executive Transfer Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/Fotos Site/IMG_2646.webp" 
                  alt="Transfer Executivo" 
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  TRANSFER EXECUTIVO | SUA CHEGADA COM ELEGÂNCIA
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Após um voo cansativo, nada é mais confortável e sofisticado do que ter à disposição um serviço de transfer executivo que o leve do aeroporto ao destino com tranquilidade e estilo.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Atuando exclusivamente em São Paulo, oferecemos uma alternativa de alto padrão para quem deseja evitar o desgaste do transporte público ou a imprevisibilidade de táxis e aplicativos. Nossos motoristas monitoram seu voo em tempo real, ajustando automaticamente o horário de chegada em caso de atrasos, para garantir uma recepção pontual e personalizada.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Cada condutor é selecionado com rigor, passa por treinamentos constantes e possui amplo conhecimento da cidade, estando sempre preparado para indicar rotas, pontos de interesse e recomendações exclusivas que tornam sua estadia ainda mais agradável.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Office Section */}
          <div className="mb-16">
            <div className="mb-8">
              <img 
                src="/Fotos Site/IMG_2846.webp" 
                alt="Escritório em Movimento" 
                className="w-full rounded-lg shadow-lg"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              SEU ESCRITÓRIO SOBRE RODAS
            </h3>
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Transforme cada deslocamento em um momento produtivo. Nossos veículos foram projetados para proporcionar o ambiente ideal para reuniões virtuais, leituras importantes ou simplesmente para relaxar em silêncio total.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Com uma frota nova e preparada asseguram uma condução suave e silenciosa, o ambiente interno se torna perfeito para chamadas de vídeo, revisão de documentos ou até mesmo momentos de descanso. O Wi-Fi de alta velocidade mantém você conectado durante todo o trajeto, sem depender de redes externas pouco confiáveis.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Para maior privacidade, nossos veículos contam com blindagem e vidros escurecidos, garantindo discrição absoluta e criando uma atmosfera de conforto e sofisticação em cada viagem.
              </p>
            </div>
          </div>

          {/* Easy Booking Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/Fotos Site/IMG_4494.webp" 
                  alt="Reserva com Facilidade" 
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  RESERVA RÁPIDA E TRANSPARENTE
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Agendar seu transfer executivo é simples e intuitivo. Pelo site ou aplicativo, basta escolher origem, destino e categoria de veículo que mais se adapta à ocasião.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Prezamos pela transparência em todas as etapas: o valor exibido na tela de reserva é o valor final sem taxas adicionais ou cobranças inesperadas. Uma experiência clara, segura e elegante desde o primeiro contato.
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
              Executive Premium: mais do que transporte, um padrão de mobilidade criado para elevar suas viagens de negócios.
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