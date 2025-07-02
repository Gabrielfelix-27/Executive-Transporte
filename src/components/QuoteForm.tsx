import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { calculateTripPrice } from "@/utils/locationUtils";

export const QuoteForm = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  // Preencher data e horário automaticamente
  useEffect(() => {
    const now = new Date();
    
    // Data atual (formato YYYY-MM-DD para input date)
    const currentDate = now.toISOString().split('T')[0];
    setDate(currentDate);
    
    // Horário atual + 2 horas (formato HH:MM para input time)
    const futureTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const timeString = futureTime.toTimeString().slice(0, 5);
    setTime(timeString);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickup || !destination) {
      alert('Por favor, preencha os endereços de origem e destino.');
      return;
    }

    setIsCalculating(true);

    try {
      // Calcular preços reais para todas as categorias usando a API
      const [economicoData, executivoData, luxoData, suvData] = await Promise.all([
        calculateTripPrice(pickup, destination, 'economico'),
        calculateTripPrice(pickup, destination, 'executivo'),
        calculateTripPrice(pickup, destination, 'luxo'),
        calculateTripPrice(pickup, destination, 'suv')
      ]);

      // Preparar dados para navegação
      const tripData = {
        pickup,
        destination,
        date,
        time,
        distance: executivoData.distance,
        estimatedTime: executivoData.estimatedTime,
        priceFactors: executivoData.priceFactors,
        categories: {
          economico: {
            name: 'Econômico',
            price: economicoData.finalPrice,
            basePrice: economicoData.basePrice,
            passengers: 4,
            luggage: 2,
            description: 'Ideal para viagens curtas'
          },
          executivo: {
            name: 'Executivo',
            price: executivoData.finalPrice,
            basePrice: executivoData.basePrice,
            passengers: 4,
            luggage: 3,
            description: 'Conforto e pontualidade'
          },
          luxo: {
            name: 'Luxo',
            price: luxoData.finalPrice,
            basePrice: luxoData.basePrice,
            passengers: 4,
            luggage: 4,
            description: 'Máximo conforto e elegância'
          },
          suv: {
            name: 'SUV Premium',
            price: suvData.finalPrice,
            basePrice: suvData.basePrice,
            passengers: 7,
            luggage: 5,
            description: 'Espaço e versatilidade'
          }
        }
      };

      // Navegar para página de seleção de veículo
      navigate('/vehicle-selection', { state: tripData });
    } catch (error) {
      console.error('Erro ao calcular preços:', error);
      alert('Erro ao calcular preços. Tente novamente.');
    } finally {
      setIsCalculating(false);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString + 'T00:00:00');
    const weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 
                   'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    
    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${weekday}, ${day} ${month}, ${year}`;
  };

  const formatTime = (timeString: string): string => {
    if (!timeString) return '';
    return `${timeString} GMT-3 Horário de Brasília`;
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-auto quote-form-container">
      <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">
        COTAÇÃO POR DESTINO
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo Origem */}
        <AddressAutocomplete
          placeholder="Digite o endereço de origem"
          value={pickup}
          onChange={setPickup}
          icon="pickup"
        />

        {/* Campo Destino */}
        <AddressAutocomplete
          placeholder="Digite o endereço de destino"
          value={destination}
          onChange={setDestination}
          icon="destination"
        />

        {/* Campo Data */}
        <div className="form-field">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">Data</label>
              <input
                type="date"
                className="form-input w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        {/* Campo Horário */}
        <div className="form-field">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">Horário</label>
              <input
                type="time"
                className="form-input w-full"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Botão de Envio */}
        <Button 
          type="submit" 
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg mt-6 transition-all duration-200 hover:scale-105"
          disabled={isCalculating || !pickup || !destination}
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Calculando preços...
            </>
          ) : (
            'RESERVAR'
          )}
        </Button>
      </form>
    </div>
  );
};
