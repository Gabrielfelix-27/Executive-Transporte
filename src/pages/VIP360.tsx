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
                  VIP 360
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed font-redhat text-justify">
                  {t('services.vip360Desc')}
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
          
          {/* VIP360 Introduction Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="VIP 360 Experience" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  APRESENTAMOS VIP360
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Sua experiência elevada ao mais alto nível de personalização. Para aqueles que valorizam o detalhe, o conforto absoluto e a exclusividade em cada trajeto, apresentamos o VIP360, o novo serviço de membership da Executive Premium.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ao se tornar membro, você passa a ter acesso completo a tudo o que a Executive Premium oferece — e mais.
                </p>
              </div>
            </div>
          </div>

          {/* VIP360 Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Benefícios Exclusivos VIP360
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Tapetes personalizados
                </h4>
                <p className="text-gray-700">
                  com seu nome ou logotipo, tornando cada viagem uma extensão do seu estilo.
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
                  mesmo em horários de alta demanda.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Atendimento exclusivo
                </h4>
                <p className="text-gray-700">
                  com consultores dedicados para reservas e personalizações.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Ambiente de trabalho premium
                </h4>
                <p className="text-gray-700">
                  Wi-Fi de alta velocidade, cortinas de privacidade laufirma e silêncio absoluto proporcionado por motores híbridos de última geração.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  • Tudo isso dentro dos nossos veículos blindados da linha BMW
                </h4>
                <p className="text-gray-700">
                  símbolo de elegância, segurança e inovação.
                </p>
              </div>
            </div>
          </div>

          {/* Exclusive Experience */}
          <div className="mb-16">
            <div className="bg-black text-white p-12 rounded-lg">
              <h3 className="text-3xl font-bold mb-6 text-center">
                EXECUTIVE PREMIUM VIP360 NÃO É APENAS UM SERVIÇO, É UM NOVO PATAMAR DE MOBILIDADE.
              </h3>
              <p className="text-lg leading-relaxed text-center">
                Exclusivo, discreto, feito para quem exige mais do que transporte. Feito para quem vive com excelência.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pronto para experimentar o VIP360?
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Torne-se membro e descubra uma nova dimensão em mobilidade premium.
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