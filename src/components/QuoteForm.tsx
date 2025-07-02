import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Calendar, Clock } from "lucide-react";
import { GoogleMapsPlacePicker } from "@/components/GoogleMapsPlacePicker";
import { calculateTripPrice } from "@/utils/locationUtils";
import { isGoogleMapsConfigured } from "@/config/maps";

export const QuoteForm = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  // Verificar se Google Maps está configurado
  const useGoogleMaps = isGoogleMapsConfigured();

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
        pickup: pickup.trim(),
        destination: destination.trim(),
        date,
        time,
        passengers: 1,
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

  return (
    <div className="bg-white rounded-none shadow-lg p-8 w-full max-w-md mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
          SEU CHAUFFEUR DE LUXO
        </h2>
        <div className="flex justify-center mt-4 space-x-2">
          <button 
            type="button"
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-none"
          >
            POR DESTINO
          </button>
          <button 
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-none"
          >
            POR HORA
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Origem */}
        <div className="space-y-2">
          <div className="flex items-center text-sm font-medium text-gray-600 mb-2 pointer-events-none">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Origem</span>
          </div>
          {useGoogleMaps ? (
            <GoogleMapsPlacePicker
              id="pickup-field"
              placeholder="Endereço, aeroporto, hotel"
              value={pickup}
              onChange={(newValue, place) => {
                console.log('🏠 Pickup mudou:', newValue);
                setPickup(newValue);
                
                // Se é uma seleção do Google Maps, salvar coordenadas
                if (place && place.geometry && place.geometry.location) {
                  const { cacheSelectedAddressCoordinates } = require('@/utils/locationUtils');
                  const coords = {
                    lat: typeof place.geometry.location.lat === 'function' 
                      ? place.geometry.location.lat() 
                      : place.geometry.location.lat,
                    lng: typeof place.geometry.location.lng === 'function' 
                      ? place.geometry.location.lng() 
                      : place.geometry.location.lng
                  };
                  cacheSelectedAddressCoordinates(newValue, coords);
                }
              }}
              className="w-full"
            />
          ) : (
            <input
              type="text"
              id="pickup-field"
              placeholder="Endereço, aeroporto, hotel"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400"
            />
          )}
        </div>

        {/* Campo Destino */}
        <div className="space-y-2">
          <div className="flex items-center text-sm font-medium text-gray-600 mb-2 pointer-events-none">
            <Navigation className="w-4 h-4 mr-2" />
            <span>Destino</span>
          </div>
          {useGoogleMaps ? (
            <GoogleMapsPlacePicker
              id="destination-field"
              placeholder="Endereço, aeroporto, hotel"
              value={destination}
              onChange={(newValue, place) => {
                console.log('🎯 Destination mudou:', newValue);
                setDestination(newValue);
                
                // Se é uma seleção do Google Maps, salvar coordenadas
                if (place && place.geometry && place.geometry.location) {
                  const { cacheSelectedAddressCoordinates } = require('@/utils/locationUtils');
                  const coords = {
                    lat: typeof place.geometry.location.lat === 'function' 
                      ? place.geometry.location.lat() 
                      : place.geometry.location.lat,
                    lng: typeof place.geometry.location.lng === 'function' 
                      ? place.geometry.location.lng() 
                      : place.geometry.location.lng
                  };
                  cacheSelectedAddressCoordinates(newValue, coords);
                }
              }}
              className="w-full"
            />
          ) : (
            <input
              type="text"
              id="destination-field"
              placeholder="Endereço, aeroporto, hotel"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400"
            />
          )}
        </div>

        {/* Campo Data */}
        <div className="space-y-2">
          <label htmlFor="date-field" className="flex items-center text-sm font-medium text-gray-600 mb-2 cursor-pointer">
            <Calendar className="w-4 h-4 mr-2" />
            Data
          </label>
          <input
            type="date"
            id="date-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700"
          />
        </div>

        {/* Campo Horário */}
        <div className="space-y-2">
          <label htmlFor="time-field" className="flex items-center text-sm font-medium text-gray-600 mb-2 cursor-pointer">
            <Clock className="w-4 h-4 mr-2" />
            Horário
          </label>
          <input
            type="time"
            id="time-field"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700"
          />
        </div>

        {/* Botão de Envio */}
        <Button 
          type="submit" 
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-none mt-8 transition-all duration-200 text-lg"
          disabled={isCalculating || !pickup || !destination}
        >
          {isCalculating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Calculando...
            </div>
          ) : (
            'RESERVE'
          )}
        </Button>
      </form>
    </div>
  );
};
