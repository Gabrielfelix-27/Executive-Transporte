
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
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Shield,
      title: t('services.airportTransfer'),
      description: t('services.airportTransferDesc'),
      link: '/airport-transfer',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Eye,
      title: t('services.pointToPoint'),
      description: t('services.pointToPointDesc'),
      link: '/point-to-point',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Award,
      title: t('services.business'),
      description: t('services.businessDesc'),
      link: '/business',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
    },
    {
      icon: Shield,
      title: t('services.executiveProtection'),
      description: t('services.executiveProtectionDesc'),
      link: '/executive-protection',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      icon: Eye,
      title: t('services.exec360'),
      description: t('services.exec360Desc'),
      link: '/vip-360',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  return (
    <section className="py-20 bg-white">
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
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                    <service.icon className="h-12 w-12 mb-4 opacity-90" />
                    <h3 className="text-2xl font-bold mb-4 text-center font-redhat tracking-wide">{service.title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed font-redhat text-justify px-2">{service.description}</p>
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
