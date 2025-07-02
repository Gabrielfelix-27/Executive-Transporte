
import { Crown, Shield, Eye, Award, Wifi, Leaf } from "lucide-react";

const services = [
  {
    icon: Crown,
    title: "SERVIÇO À DISPOSIÇÃO",
    description: "Motoristas inteiramente exclusivos para atender as suas demandas."
  },
  {
    icon: Shield,
    title: "TRANSFER AEROPORTO",
    description: "Seu tempo é precioso e sua comodidade é fundamental."
  },
  {
    icon: Eye,
    title: "POINT TO POINT",
    description: "Sua solução de conforto e luxo para viagens de longas distâncias."
  },
  {
    icon: Award,
    title: "BUSINESS",
    description: "Produtividade no trânsito? Trabalhe no luxo e conforto enquanto viaja."
  },
  {
    icon: Shield,
    title: "PROTEÇÃO EXECUTIVA",
    description: "Segurança para sua proteção com discrição e sofisticação."
  },
  {
    icon: Eye,
    title: "EXEC360",
    description: "De mobilidade ao lazer. Seja Executive e exclusivo em tudo."
  }
];

export const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            CARROS BLINDADOS DE LUXO COM CHAUFFEURS
          </h2>
          <p className="text-lg text-gray-600">OS SERVIÇOS MAIS ESCOLHIDOS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-lg bg-gray-900 h-64 mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <service.icon className="h-8 w-8 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
