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

  // Função para calcular horário com 2 horas à frente
  const getTwoHoursAhead = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    return now.toTimeString().slice(0, 5); // HH:MM
  };

  // Função para obter a data atual
  const getCurrentDate = () => {
    return new Date();
  };

  // Inicializar campos com valores padrão
  useEffect(() => {
    const currentDate = getCurrentDate();
    const twoHoursAhead = getTwoHoursAhead();
    
    setSelectedDate(currentDate);
    setSelectedTime(twoHoursAhead);
  }, []);

  // Validar se o horário é pelo menos 2 horas à frente
  const validateBookingTime = (date: Date, time: string) => {
    const now = new Date();
    const selectedDateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    const twoHoursFromNow = new Date();
    twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2);
    
    return selectedDateTime >= twoHoursFromNow;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickup || !destination) {
      alert(t('quote.fillFields'));
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert(t('quote.selectDate'));
      return;
    }

    // Validar se o horário é pelo menos 2 horas à frente
    if (!validateBookingTime(selectedDate, selectedTime)) {
      alert(t('quote.minAdvance'));
      return;
    }

    setIsCalculating(true);

    try {
      // Calcular preços para diferentes categorias
      const economyData = await calculateTripPrice(pickup, destination, 'economico');
      const executivoData = await calculateTripPrice(pickup, destination, 'executivo');
      const luxoData = await calculateTripPrice(pickup, destination, 'luxo');
      const suvData = await calculateTripPrice(pickup, destination, 'suv');

      const tripData = {
        pickup,
        destination,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        distance: economyData.distance,
        vehicles: {
          economy: {
            name: t('vehicle.economic'),
            price: economyData.finalPrice,
            basePrice: economyData.basePrice,
            passengers: 4,
            luggage: 2,
            description: t('vehicle.economicDesc')
          },
          executivo: {
            name: t('vehicle.executive'),
            price: executivoData.finalPrice,
            basePrice: executivoData.basePrice,
            passengers: 4,
            luggage: 3,
            description: t('vehicle.executiveDesc')
          },
          luxo: {
            name: t('vehicle.luxury'),
            price: luxoData.finalPrice,
            basePrice: luxoData.basePrice,
            passengers: 4,
            luggage: 4,
            description: t('vehicle.luxuryDesc')
          },
          suv: {
            name: t('vehicle.suv'),
            price: suvData.finalPrice,
            basePrice: suvData.basePrice,
            passengers: 7,
            luggage: 5,
            description: t('vehicle.suvDesc')
          }
        }
      };

      // Navegar para página de seleção de veículo
      navigate('/vehicle-selection', { state: tripData });
    } catch (error) {
      console.error('Erro ao calcular preços:', error);
      alert(t('quote.priceError'));
    } finally {
      setIsCalculating(false);
    }
  };

  // Função para lidar com mudanças no campo de horário
  const handleTimeChange = (newTime: string) => {
    setSelectedTime(newTime);
  };

  // Função para lidar com mudanças no campo de data
  const handleDateChange = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    
    // Se a data foi alterada, validar o horário novamente
    if (newDate && selectedTime && !validateBookingTime(newDate, selectedTime)) {
      // Atualizar o horário para 2 horas à frente se a data for hoje
      const today = new Date();
      
      if (newDate.toDateString() === today.toDateString()) {
        setSelectedTime(getTwoHoursAhead());
      }
    }
  };

  // Calcular horário mínimo baseado na data selecionada
  const getMinTime = () => {
    if (!selectedDate) return '';
    
    const today = new Date();
    
    // Se a data selecionada for hoje, o horário mínimo é 2 horas à frente
    if (selectedDate.toDateString() === today.toDateString()) {
      return getTwoHoursAhead();
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
        <div className="flex justify-center mt-3 space-x-2">
          <button 
            type="button"
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-none"
          >
            {t('quote.byDestination')}
          </button>
          <button 
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-none"
          >
            {t('quote.byHour')}
          </button>
        </div>
      </div>
      
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
              onChange={(e) => setPickup(e.target.value)}
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
              onChange={(e) => setDestination(e.target.value)}
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
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-none mt-4 transition-all duration-200 text-base"
          disabled={isCalculating || !pickup || !destination}
        >
          {isCalculating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              {t('quote.calculating')}
            </div>
          ) : (
            t('quote.button')
          )}
        </Button>
      </form>
    </div>
  );
};
