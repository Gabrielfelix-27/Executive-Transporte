
import { Crown, Shield, Eye, Award, Wifi, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Crown,
      title: t('features.firstClass'),
      description: t('features.firstClassDesc')
    },
    {
      icon: Shield,
      title: t('features.maxSecurity'),
      description: t('features.maxSecurityDesc')
    },
    {
      icon: Eye,
      title: t('features.visionBeyond'),
      description: t('features.visionBeyondDesc')
    },
    {
      icon: Award,
      title: t('features.guaranteedTrip'),
      description: t('features.guaranteedTripDesc')
    },
    {
      icon: Wifi,
      title: t('features.ultraWifi'),
      description: t('features.ultraWifiDesc')
    },
    {
      icon: Leaf,
      title: t('features.sustainableTrip'),
      description: t('features.sustainableTripDesc')
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">
                <feature.icon className="h-12 w-12 text-black" />
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
