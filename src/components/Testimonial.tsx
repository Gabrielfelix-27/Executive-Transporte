import { useLanguage } from "@/contexts/LanguageContext";

export const Testimonial = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12" style={{ backgroundColor: '#141b28' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <img 
            src="/Logos/Logo solo.png" 
            alt="Executive Logo" 
            className="w-12 h-12 mx-auto mb-4 opacity-80"
          />
          <blockquote className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed whitespace-pre-line" style={{ color: '#ffc68b', fontFamily: 'Poppins, sans-serif' }}>
            "{t('testimonial.quote')}"
          </blockquote>
        </div>
      </div>
    </section>
  );
};
