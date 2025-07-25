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
          
          <div className="flex justify-start items-left mt-6">
            <div className="flex items-left space-x-4">
              <a href="https://www.instagram.com/executivepremium/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>{t('footer.instagram')}</span>
              </a>
            </div>
          </div>
          
          {/* Desenvolvido por */}
          <div className="text-center mt-8">
            <a 
              href="https://dreamsetfilms.com.br" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Desenvolvido por <span className="font-bold">Dreamsetfilms</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
