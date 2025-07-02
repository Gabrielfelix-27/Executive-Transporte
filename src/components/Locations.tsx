
const locations = [
  {
    name: "ROSEWOOD HOTEL - SÃO PAULO",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "TIVOLI MOFARREJ SÃO PAULO HOTEL",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "AEROPORTO DE SÃO PAULO/CONGONHAS",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "AEROPORTO DE SÃO PAULO/GUARULHOS",
    image: "https://images.unsplash.com/photo-1544016768-982d17ba2236?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const Locations = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-sm text-gray-600 mb-2">TOP LOCALIDADES</p>
            <h2 className="text-3xl font-bold text-gray-900">
              LOCALIDADES MAIS SOLICITADAS
            </h2>
          </div>
          <button className="text-sm text-gray-900 hover:text-yellow-600">
            TODOS OS LOCAIS →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <h3 className="text-sm font-medium text-gray-900">
                {location.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
