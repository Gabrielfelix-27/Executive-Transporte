
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 tracking-wider">EXECUTIVE</h3>
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">ACESSAR CENTRAL DE AJUDA</p>
              <div className="text-sm">
                <p>Executive | Executive Transporte de Luxo LTDA</p>
                <p>R. Brasília, 196 - Sumaré, São Paulo - SP</p>
                <p>01259-000, Brasil</p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">EMPRESA</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">QUEM SOMOS</a></li>
              <li><a href="#" className="hover:text-white">TRABALHE CONOSCO</a></li>
              <li><a href="#" className="hover:text-white">ROTAS</a></li>
              <li><a href="#" className="hover:text-white">CIDADES</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">SERVIÇOS</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">SERVIÇO À DISPOSIÇÃO</a></li>
              <li><a href="#" className="hover:text-white">TRANSFER AEROPORTO</a></li>
              <li><a href="#" className="hover:text-white">POINT TO POINT</a></li>
              <li><a href="#" className="hover:text-white">BUSINESS</a></li>
              <li><a href="#" className="hover:text-white">PROTEÇÃO EXECUTIVA</a></li>
              <li><a href="#" className="hover:text-white">EXEC360</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4 md:mb-0">
              <span>PORTUGUÊS</span>
              <span>USD $</span>
              <span>SÃO PAULO</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>2024 © Executive Transporte de Luxo LTDA.</span>
              <a href="#" className="hover:text-white">PRIVACIDADE</a>
              <a href="#" className="hover:text-white">ACESSIBILIDADE</a>
              <a href="#" className="hover:text-white">TERMOS</a>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
              CONVERSE POR WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
