import { useLanguage } from "@/contexts/LanguageContext";

export const Partners = () => {
  const { t } = useLanguage();

  const partners = [
    "ROSEWOOD",
    "mentore",
    "TIVOLI"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-12 text-gray-900">
          {t('partners.title')}
        </h2>
        
        <div className="flex justify-center items-center space-x-16">
          {partners.map((partner, index) => (
            <div key={index} className="text-2xl font-light text-gray-400">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
