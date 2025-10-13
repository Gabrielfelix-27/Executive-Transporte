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
        className="relative min-h-[50vh] sm:min-h-[70vh] pt-0 sm:pt-20 bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: "url('/Fotos Site/IMG_2846.webp')",
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
          
          {/* Professional Security Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/Fotos Site/IMG_8982.webp"
                  alt="Segurança Profissional"
                  className="w-full rounded-lg shadow-lg"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  SEGURANÇA PROFISSIONAL COM A EXCELÊNCIA DE QUEM DOMINA O ASSUNTO
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Em um cenário onde cada detalhe faz diferença, a proteção deve estar no mesmo nível da experiência. Por isso, oferecemos acesso facilitado aos mais elevados padrões de segurança, conectando você a empresas privadas de referência no setor, cuidadosamente selecionadas para atender um estilo de vida exigente, discreto e exclusivo.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Nossos parceiros unem discrição, eficiência e tecnologia de ponta para entregar um serviço de vigilância contínuo e totalmente personalizado, seja em deslocamentos estratégicos, eventos reservados ou na proteção de residências de alto padrão.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Nós seguimos rigorosamente as normas estabelecidas pelos órgãos reguladores, contam com profissionais altamente capacitados e certificados e utilizam equipamentos de última geração. O resultado é um serviço que une confiança, sofisticação e tranquilidade.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Você terá acesso a uma experiência de segurança que vai muito além da simples proteção. Trata-se de um conceito inteligente, elegante e totalmente alinhado às suas expectativas. Porque, em nosso universo, luxo também significa sentir-se seguro com discrição, estilo e total serenidade.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Bem-vindo a uma nova era de segurança sob medida.
                </p>
              </div>
            </div>
          </div>

          {/* Services Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Nossas Soluções de Proteção Executiva
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Proteção Pessoal
                </h4>
                <p className="text-gray-700">
                  Acompanhamento discreto e especializado para executivos, personalidades e celebridades que necessitam de proteção dedicada.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Segurança Residencial
                </h4>
                <p className="text-gray-700">
                  Monitoramento e proteção ininterrupta com tecnologia de ponta e equipes altamente preparadas.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Eventos Exclusivos
                </h4>
                <p className="text-gray-700">
                  Estrutura completa de segurança para encontros sociais, corporativos e familiares com total discrição.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Transporte Blindado
                </h4>
                <p className="text-gray-700">
                  Frota de veículos blindados de alto padrão, conduzidos por motoristas treinados em direção defensiva e segurança.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Análise de Riscos
                </h4>
                <p className="text-gray-700">
                  Estudo detalhado de cenários e elaboração de estratégias de proteção personalizadas.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Consultoria em Segurança
                </h4>
                <p className="text-gray-700">
                  Orientação especializada para empresas e indivíduos, com soluções projetadas sob medida.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              A sua segurança é a nossa prioridade.
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Entre em contato e receba uma avaliação personalizada para garantir a proteção que você merece.
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