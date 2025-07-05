import { useLanguage } from "@/contexts/LanguageContext";

export const Testimonial = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="text-6xl text-gray-300 mb-4">"</div>
          <blockquote className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed">
            "{t('testimonial.quote')}"
          </blockquote>
          <cite className="text-sm text-gray-600 mt-6 block">
            {t('testimonial.source')}
          </cite>
        </div>
      </div>
    </section>
  );
};
