
const routes = [
  {
    from: "AEROPORTO INTERNACIONAL DE GUARULHOS (GRU)",
    to: "ROSEWOOD HOTEL SÃO PAULO",
    duration: "55min"
  },
  {
    from: "AEROPORTO DE CONGONHAS (CGH)",
    to: "JW MARRIOTT SÃO PAULO",
    duration: "60min"
  },
  {
    from: "AEROPORTO DE CONGONHAS (CGH)",
    to: "ROSEWOOD HOTEL SÃO PAULO",
    duration: "35min"
  },
  {
    from: "AEROPORTO INTERNACIONAL DE GUARULHOS (GRU)",
    to: "HOTEL UNIQUE SÃO PAULO",
    duration: "80min"
  },
  {
    from: "AEROPORTO INTERNACIONAL DE GUARULHOS (GRU)",
    to: "HOTEL FASANO JARDINS SÃO PAULO",
    duration: "60min"
  },
  {
    from: "AEROPORTO INTERNACIONAL DE GUARULHOS (GRU)",
    to: "TIVOLI MOFARREJ SÃO PAULO",
    duration: "35min"
  }
];

export const Routes = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-sm text-gray-400 mb-2">TOP ROUTES</p>
            <h2 className="text-3xl font-bold">CONFIRA AS ROTAS</h2>
          </div>
          <button className="text-sm text-white hover:text-yellow-400">
            TODAS AS ROTAS →
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
