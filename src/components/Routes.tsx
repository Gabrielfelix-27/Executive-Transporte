import { useLanguage } from "@/contexts/LanguageContext";

export const Routes = () => {
  const { t } = useLanguage();

  const routes = [
    {
      from: t('routes.guarulhos'),
      to: t('routes.rosewood'),
      duration: "55min"
    },
    {
      from: t('routes.congonhas'),
      to: t('routes.marriott'),
      duration: "60min"
    },
    {
      from: t('routes.congonhas'),
      to: t('routes.rosewood'),
      duration: "35min"
    },
    {
      from: t('routes.guarulhos'),
      to: t('routes.unique'),
      duration: "80min"
    },
    {
      from: t('routes.guarulhos'),
      to: t('routes.fasano'),
      duration: "60min"
    },
    {
      from: t('routes.guarulhos'),
      to: t('routes.tivoliMofarrej'),
      duration: "35min"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-sm text-gray-400 mb-2">{t('routes.topTitle')}</p>
            <h2 className="text-3xl font-bold">{t('routes.title')}</h2>
          </div>
          <button className="text-sm text-white hover:text-yellow-400">
            {t('routes.allRoutes')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <div key={index} className="bg-white text-black rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium">{route.from}</div>
                <div className="text-2xl">→</div>
                <div className="text-sm font-medium">{route.to}</div>
              </div>
              <div className="text-center text-lg font-bold text-yellow-600">
                {route.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
