
import { Crown, Shield, Eye, Award, Wifi, Leaf } from "lucide-react";

const features = [
  {
    icon: Crown,
    title: "PRIMEIRA CLASSE",
    description: "Viva a experiência do mais alto padrão em transporte privativo. Sofisticação, glamour e exclusividade para quem exige um serviço impecável em cada detalhe."
  },
  {
    icon: Shield,
    title: "SEGURANÇA MÁXIMA",
    description: "Viaje com confiança sabendo que sua segurança é nossa prioridade número 1. Carros blindados e motoristas minuciosamente selecionados e treinados."
  },
  {
    icon: Eye,
    title: "VISÃO ALÉM",
    description: "Aproveite vistas deslumbrantes com nossos tetos panorâmicos. Design inovador e tecnologia que enriquecem e elevam sua experiência de viagem."
  },
  {
    icon: Award,
    title: "VIAGEM GARANTIDA",
    description: "Garantimos sua viagem sem cancelar cancelada. Nossos motoristas sempre vão conduzir todas as corridas, assegurando que nosso serviço seja sempre confiável."
  },
  {
    icon: Wifi,
    title: "WI-FI ULTRARÁPIDO",
    description: "Mantenha-se online com total zero preocupações. Nosso Wi-Fi de alta velocidade em todos os veículos garante uma experiência inalável."
  },
  {
    icon: Leaf,
    title: "VIAGEM SUSTENTÁVEL",
    description: "Frota híbrida do luxo sustentável, nossos carros híbridos unem sofisticação, conforto e exclusividade, preservando o meio ambiente em cada trajeto."
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">
                <feature.icon className="h-12 w-12 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
