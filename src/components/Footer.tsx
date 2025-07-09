import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 tracking-wider font-redhat">{t('footer.company')}</h3>
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2 font-redhat">{t('footer.helpCenter')}</p>
              <div className="text-sm font-redhat">
                <p>{t('footer.companyFull')}</p>
                <p>{t('footer.address')}</p>
                <p>{t('footer.phone')}</p>
                <p>{t('footer.email')}</p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">EMPRESA</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about-us" className="hover:text-white">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.workWithUs')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.routes')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.cities')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/on-demand-service" className="hover:text-white">{t('services.onDemand')}</a></li>
              <li><a href="/airport-transfer" className="hover:text-white">{t('services.airportTransfer')}</a></li>
              <li><a href="/point-to-point" className="hover:text-white">{t('services.pointToPoint')}</a></li>
              <li><a href="/business" className="hover:text-white">{t('services.business')}</a></li>
              <li><a href="/executive-protection" className="hover:text-white">{t('services.executiveProtection')}</a></li>
              <li><a href="/vip-360" className="hover:text-white">{t('services.exec360')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4 md:mb-0">
              <span>{t('header.portuguese')}</span>
              <span>USD $</span>
              <span>{t('footer.location')}</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>{t('footer.copyright')}</span>
              <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-white">{t('footer.accessibility')}</a>
              <a href="#" className="hover:text-white">{t('footer.terms')}</a>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center space-x-4">
              <a href="https://www.instagram.com/executivepremium/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                📷 {t('footer.instagram')}
              </a>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
              {t('footer.whatsapp')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
