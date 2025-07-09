import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";

const ExecutiveProtection = () => {
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
                  PROTEÇÃO EXECUTIVA
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed font-redhat text-justify">
                  {t('services.executiveProtectionDesc')}
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
          
          {/* Professional Security Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Segurança Profissional" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  SEGURANÇA PROFISSIONAL COM A GARANTIA DE QUEM ENTENDE DO ASSUNTO
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Em um universo onde cada detalhe importa, a segurança precisa estar à altura da experiência. Por isso, facilitamos o acesso aos mais altos padrões de proteção, conectando você às melhores empresas de segurança privada do mercado — selecionadas criteriosamente para atender a um estilo de vida exigente e exclusivo.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Trabalhamos com parceiros que obtiveram discrição, eficiência e tecnologia de ponta, garantindo vigilância constante e serviços personalizados, seja para eventos privados, deslocamentos estratégicos ou proteção residencial de alto padrão.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Todas as empresas parceiras são regulamentadas pelos órgãos reguladores competentes, operam com profissionais altamente treinados e certificados, e utilizam equipamentos de última geração, proporcionando tranquilidade com sofisticação e confiabilidade.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Você terá à sua disposição um serviço que vai além da proteção, uma experiência de segurança inteligente, elegante e à altura das suas expectativas. Porque em nosso mundo, luxo também é sentir-se seguro — com estilo, discrição e total serenidade.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Bem-vindo à nova era da segurança personalizada.
                </p>
              </div>
            </div>
          </div>

          {/* Services Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Nossos Serviços de Proteção Executiva
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Proteção Pessoal
                </h4>
                <p className="text-gray-700">
                  Escolta pessoal discreta e profissional para executivos, celebridades e personalidades que necessitam de proteção especializada.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Segurança Residencial
                </h4>
                <p className="text-gray-700">
                  Monitoramento e proteção residencial 24/7 com tecnologia avançada e profissionais especializados.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Eventos Privados
                </h4>
                <p className="text-gray-700">
                  Segurança especializada para eventos corporativos, sociais e familiares com total discrição.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Transporte Blindado
                </h4>
                <p className="text-gray-700">
                  Veículos blindados de alta qualidade com motoristas treinados em direção defensiva e segurança.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Análise de Risco
                </h4>
                <p className="text-gray-700">
                  Avaliação completa de riscos e desenvolvimento de estratégias de proteção personalizadas.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Consultoria em Segurança
                </h4>
                <p className="text-gray-700">
                  Consultoria especializada em segurança corporativa e pessoal com soluções sob medida.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Sua segurança é nossa prioridade
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Entre em contato conosco para uma avaliação personalizada de suas necessidades de proteção.
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

export default ExecutiveProtection; 