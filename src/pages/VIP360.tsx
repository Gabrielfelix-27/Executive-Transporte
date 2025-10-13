import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";

const VIP360 = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Background and Quote Form */}
      <div 
        className="relative min-h-[50vh] sm:min-h-[70vh] pt-0 sm:pt-20 bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/Fotos Site/IMG_3233.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
          
          {/* VIP360 Introduction Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/Fotos Site/IMG_2921.webp"
                  alt="Executive 360 Experience"
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  APRESENTAMOS EXECUTIVE 360
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Sua experiência elevada ao mais alto nível de personalização. Para aqueles que valorizam o detalhe, o conforto absoluto e a exclusividade em cada trajeto, apresentamos o Executive 360, um serviço criado para transformar cada viagem em algo único e feito sob medida.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  No Executive 360, tudo é pensado para refletir o seu estilo de vida. Nada é padronizado, cada detalhe é ajustado conforme suas preferências. Desde o clima interno do veículo, até a forma como o atendimento acontece, tudo é desenhado para que sua experiência seja exclusiva, memorável e alinhada ao que você realmente valoriza.
                </p>
              </div>
            </div>
          </div>

          {/* VIP360 Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Benefícios do Executive 360
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Tapetes personalizados
                </h4>
                <p className="text-gray-700">
                  Com seu nome ou logotipo, tornando cada viagem uma extensão da sua identidade.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Configurações sob medida
                </h4>
                <p className="text-gray-700">
                  desde a temperatura do veículo até suas preferências de trajeto e atendimento.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Acesso prioritário à frota
                </h4>
                <p className="text-gray-700">
                  Disponibilidade garantida, mesmo em horários de alta demanda.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Atendimento exclusivo
                </h4>
                <p className="text-gray-700">
                  Com consultores preparados para ajustar cada detalhe da sua viagem conforme sua necessidade.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Ambiente de trabalho premium
                </h4>
                <p className="text-gray-700">
                  Wi-Fi de alta velocidade, cortinas de privacidade e silêncio absoluto proporcionado por motores híbridos de última geração.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Veículos blindados
                </h4>
                <p className="text-gray-700">
                  Segurança, discrição e tranquilidade em todos os trajetos.
                </p>
              </div>
            </div>
          </div>

          {/* Exclusive Experience */}
          <div className="mb-16">
            <div className="bg-black text-white p-12 rounded-lg">
              <h3 className="text-3xl font-bold mb-6 text-center">
              O EXECUTIVE 360 NÃO É APENAS TRANSPORTE: É UM NOVO PATAMAR DE MOBILIDADE
            </h3>
            <p className="text-lg leading-relaxed text-center">
              Exclusivo, seguro, discreto e totalmente personalizado para quem exige mais do que deslocamento para quem vive com excelência.
            </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pronto para experimentar o Executive 360?
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Descubra uma nova dimensão em mobilidade premium.
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

export default VIP360;