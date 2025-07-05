
import { Crown, Shield, Eye, Award, Wifi, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Crown,
      title: t('services.onDemand'),
      description: t('services.onDemandDesc')
    },
    {
      icon: Shield,
      title: t('services.airportTransfer'),
      description: t('services.airportTransferDesc')
    },
    {
      icon: Eye,
      title: t('services.pointToPoint'),
      description: t('services.pointToPointDesc')
    },
    {
      icon: Award,
      title: t('services.business'),
      description: t('services.businessDesc')
    },
    {
      icon: Shield,
      title: t('services.executiveProtection'),
      description: t('services.executiveProtectionDesc')
    },
    {
      icon: Eye,
      title: t('services.exec360'),
      description: t('services.exec360Desc')
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600">{t('services.subtitle')}</p>
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
