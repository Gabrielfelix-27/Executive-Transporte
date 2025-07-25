import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Calendar, Clock } from 'lucide-react';
import { GoogleMapsPlacePicker } from '@/components/GoogleMapsPlacePicker';
import { DatePicker } from '@/components/ui/date-picker';
import { TimePicker } from '@/components/ui/time-picker';
import { calculateTripPrice } from '@/utils/locationUtils';
import { isGoogleMapsConfigured } from '@/config/maps';
import { useLanguage } from '@/contexts/LanguageContext';

export const QuoteForm = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [useGoogleMaps] = useState(isGoogleMapsConfigured());
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Função para obter horário atual
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:MM
  };

  // Função para obter a data atual
  const getCurrentDate = () => {
    return new Date();
  };

  // Inicializar campos com valores padrão
  useEffect(() => {
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();
    
    setSelectedDate(currentDate);
    setSelectedTime(currentTime);
  }, []);

  // Validar se o horário é válido (não no passado)
  const validateBookingTime = (date: Date, time: string) => {
    const now = new Date();
    const selectedDateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    return selectedDateTime >= now;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!pickup || !destination) {
      setErrorMessage(t('quote.fillFields'));
      return;
    }

    if (!selectedDate || !selectedTime) {
      setErrorMessage(t('quote.selectDate'));
      return;
    }

    // Validar se o horário não é no passado
    if (!validateBookingTime(selectedDate, selectedTime)) {
      setErrorMessage(t('quote.invalidTime'));
      return;
    }

    setIsCalculating(true);

    try {
      // Calcular preços para diferentes categorias usando os tipos corretos
      const executivoSedanData = await calculateTripPrice(pickup, destination, 'executivo');
      const executivoComumData = await calculateTripPrice(pickup, destination, 'economico');
      const executivoPremiumBlindadoData = await calculateTripPrice(pickup, destination, 'luxo');
      const minivanComumData = await calculateTripPrice(pickup, destination, 'suv');
      const minivanBlindadaData = await calculateTripPrice(pickup, destination, 'minivanBlindada');
      const van15LugaresData = await calculateTripPrice(pickup, destination, 'van15Lugares');

      const tripData = {
        pickup,
        destination,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        passengers: 1,
        distance: executivoSedanData.distance,
        estimatedTime: executivoSedanData.estimatedTime,
        priceFactors: executivoSedanData.priceFactors,
        vehicles: {
          executivoSedan: {
            name: 'Executivo Sedan',
            price: executivoSedanData.finalPrice,
            basePrice: executivoSedanData.basePrice,
            passengers: 4,
            luggage: 3,
            description: 'Sedan executivo com conforto premium e elegância',
            priceFactors: executivoSedanData.priceFactors
          },
          executivoComum: {
            name: 'Executivo Comum',
            price: executivoComumData.finalPrice,
            basePrice: executivoComumData.basePrice,
            passengers: 4,
            luggage: 2,
            description: 'Veículo executivo padrão com bom conforto',
            priceFactors: executivoComumData.priceFactors
          },
          executivoPremiumBlindado: {
            name: 'Executivo Premium Blindado',
            price: executivoPremiumBlindadoData.finalPrice,
            basePrice: executivoPremiumBlindadoData.basePrice,
            passengers: 4,
            luggage: 3,
            description: 'Máxima segurança com blindagem e luxo premium',
            priceFactors: executivoPremiumBlindadoData.priceFactors
          },
          minivanComum: {
            name: 'MiniVan Comum',
            price: minivanComumData.finalPrice,
            basePrice: minivanComumData.basePrice,
            passengers: 7,
            luggage: 4,
            description: 'Espaço amplo para grupos de até 7 pessoas',
            priceFactors: minivanComumData.priceFactors
          },
          minivanBlindada: {
            name: 'MiniVan Blindada',
            price: minivanBlindadaData.finalPrice,
            basePrice: minivanBlindadaData.basePrice,
            passengers: 7,
            luggage: 4,
            description: 'Segurança máxima para grupos com blindagem completa',
            priceFactors: minivanBlindadaData.priceFactors
          },
          van15Lugares: {
            name: 'Van 15 Lugares',
            price: van15LugaresData.finalPrice,
            basePrice: van15LugaresData.basePrice,
            passengers: 15,
            luggage: 8,
            description: 'Transporte para grupos grandes com máximo conforto',
            priceFactors: van15LugaresData.priceFactors
          }
        }
      };

      // Debug: Log dos dados sendo enviados
      console.log('📤 QuoteForm enviando dados:', tripData);
      
      // Navegar para página de seleção de veículo
      navigate('/vehicle-selection', { state: tripData });
    } catch (error) {
      console.error('Erro ao calcular preços:', error);
      setErrorMessage(t('quote.priceError'));
    } finally {
      setIsCalculating(false);
    }
  };

  // Função para lidar com mudanças no campo de horário
  const handleTimeChange = (newTime: string) => {
    setSelectedTime(newTime);
    setErrorMessage(''); // Limpar erro ao alterar horário
  };

  // Função para lidar com mudanças no campo de data
  const handleDateChange = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    setErrorMessage(''); // Limpar erro ao alterar data
    
    // Se a data for hoje e o horário atual for no passado, sugerir horário atual
    // Mas fazer isso silenciosamente, sem mostrar erro
    if (newDate && selectedTime) {
      const today = new Date();
      
      if (newDate.toDateString() === today.toDateString()) {
        const currentMinTime = getCurrentTime();
        
        // Se o horário selecionado for antes do horário mínimo, atualizar silenciosamente
        if (selectedTime < currentMinTime) {
          setSelectedTime(currentMinTime);
        }
      }
    }
  };

  // Calcular horário mínimo baseado na data selecionada
  const getMinTime = () => {
    if (!selectedDate) return '';
    
    const today = new Date();
    
    // Se a data selecionada for hoje, o horário mínimo é o horário atual
    if (selectedDate.toDateString() === today.toDateString()) {
      return getCurrentTime();
    }
    
    // Se for uma data futura, pode ser qualquer horário
    return '00:00';
  };

  return (
    <div className="bg-white rounded-none shadow-lg p-4 w-full max-w-md mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-wide">
          {t('quote.formTitle')}
        </h2>
        <div className="flex justify-center mt-3">
          <button 
            type="button"
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-none"
          >
            {t('quote.byDestination')}
          </button>
        </div>
      </div>
      
      {/* Mensagem de erro */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Origem */}
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium text-gray-600 mb-1">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{t('quote.origin')}</span>
          </div>
          {useGoogleMaps ? (
            <GoogleMapsPlacePicker
              id="pickup-field"
              placeholder={t('quote.pickup')}
              value={pickup}
              onChange={(newValue, place) => {
                setPickup(newValue);
                setErrorMessage(''); // Limpar erro ao alterar origem
                
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
              placeholder={t('quote.pickup')}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setErrorMessage(''); // Limpar erro ao alterar origem
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400"
            />
          )}
        </div>

        {/* Campo Destino */}
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium text-gray-600 mb-1">
            <Navigation className="w-4 h-4 mr-2" />
            <span>{t('quote.destination')}</span>
          </div>
          {useGoogleMaps ? (
            <GoogleMapsPlacePicker
              id="destination-field"
              placeholder={t('quote.destination')}
              value={destination}
              onChange={(newValue, place) => {
                setDestination(newValue);
                setErrorMessage(''); // Limpar erro ao alterar destino
                
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
              placeholder={t('quote.destination')}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setErrorMessage(''); // Limpar erro ao alterar destino
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400"
            />
          )}
        </div>

        {/* Campo Data */}
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium text-gray-600 mb-1">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{t('quote.date')}</span>
          </div>
          <DatePicker
            date={selectedDate}
            onDateSelect={handleDateChange}
            placeholder={t('quote.date')}
            minDate={new Date()}
            className="text-gray-700"
          />
        </div>

        {/* Campo Horário */}
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium text-gray-600 mb-1">
            <Clock className="w-4 h-4 mr-2" />
            <span>{t('quote.time')}</span>
          </div>
          <TimePicker
            time={selectedTime}
            onTimeSelect={handleTimeChange}
            placeholder={t('quote.time')}
            minTime={getMinTime()}
            className="text-gray-700"
          />
        </div>

        {/* Botão de Envio */}
        <Button 
          type="submit" 
          disabled={isCalculating || !pickup || !destination}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
        >
          {isCalculating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Calculando...
            </div>
          ) : (
            t('quote.button')
          )}
        </Button>
      </form>
    </div>
  );
};
