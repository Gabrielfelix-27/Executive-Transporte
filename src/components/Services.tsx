
import { Crown, Shield, Eye, Award, Wifi, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Crown,
      title: t('services.onDemand'),
      description: t('services.onDemandDesc'),
      link: '/on-demand-service',
      image: '/Fotos%20Site/IMG_4522.webp'
    },
    {
      icon: Shield,
      title: t('services.airportTransfer'),
      description: t('services.airportTransferDesc'),
      link: '/airport-transfer',
      image: '/Fotos%20Site/IMG_4739.webp'
    },
    {
      icon: Eye,
      title: t('services.pointToPoint'),
      description: t('services.pointToPointDesc'),
      link: '/point-to-point',
      image: '/Fotos%20Site/IMG_4471.webp'
    },
    {
      icon: Award,
      title: t('services.business'),
      description: t('services.businessDesc'),
      link: '/business',
      image: '/Fotos%20Site/IMG_4897.webp'
    },
    {
      icon: Shield,
      title: t('services.executiveProtection'),
      description: t('services.executiveProtectionDesc'),
      link: '/executive-protection',
      image: '/Fotos%20Site/IMG_4674.webp'
    },
    {
      icon: Eye,
      title: t('services.exec360'),
      description: t('services.exec360Desc'),
      link: '/vip-360',
      image: '/Fotos%20Site/IMG_4598.webp'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 font-redhat tracking-wide">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 font-redhat leading-relaxed">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <a href={(service as any).link} className="block">
                <div 
                  className="relative overflow-hidden rounded-lg bg-gray-900 h-80 mb-4 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  style={{
                    backgroundImage: `url(${(service as any).image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2 text-right font-redhat tracking-wide whitespace-nowrap">{service.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed font-redhat text-right opacity-80">{service.description}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
