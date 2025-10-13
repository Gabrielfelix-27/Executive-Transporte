import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Calendar, Clock } from 'lucide-react';
import { GoogleMapsPlacePicker } from '@/components/GoogleMapsPlacePicker';
import { DatePicker } from '@/components/ui/date-picker';
import { TimePicker } from '@/components/ui/time-picker';
import { calculateTripPrice, cacheSelectedAddressCoordinates } from '@/utils/locationUtils';
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

  // Função para obter horário atual de Brasília com 24 horas de antecedência
  const getCurrentTime = () => {
    // Criar data atual no horário de Brasília (UTC-3)
    const now = new Date();
    const brasiliaTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
    
    // Adicionar 24 horas de antecedência mínima
    brasiliaTime.setHours(brasiliaTime.getHours() + 24);
    return brasiliaTime.toTimeString().slice(0, 5); // HH:MM
  };

  // Função para obter a data atual de Brasília
  const getCurrentDate = () => {
    // Criar data atual no horário de Brasília (UTC-3)
    const now = new Date();
    const brasiliaTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
    
    // REGRA: Após 17h, automaticamente ajustar para o próximo dia
    if (brasiliaTime.getHours() >= 17) {
      brasiliaTime.setDate(brasiliaTime.getDate() + 1);
      brasiliaTime.setHours(8, 0, 0, 0); // Definir para 8h do próximo dia
    }
    
    return brasiliaTime;
  };

  // Função para obter data/hora mínima de Brasília com 24 horas de antecedência
  const getMinDateTime = () => {
    const now = new Date();
    const brasiliaTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
    
    // REGRA: Após 17h, automaticamente ajustar para o próximo dia
    if (brasiliaTime.getHours() >= 17) {
      brasiliaTime.setDate(brasiliaTime.getDate() + 1);
      brasiliaTime.setHours(8, 0, 0, 0); // Definir para 8h do próximo dia
      return brasiliaTime;
    }
    
    // Antes das 17h, aplicar regra normal de 24h de antecedência
    brasiliaTime.setHours(brasiliaTime.getHours() + 24);
    return brasiliaTime;
  };

  // Inicializar campos com valores padrão
  useEffect(() => {
    const minDateTime = getMinDateTime();
    const currentTime = minDateTime.toTimeString().slice(0, 5);
    
    setSelectedDate(minDateTime);
    setSelectedTime(currentTime);
  }, []);

  // Função removida: validateBookingTime - O TimePicker já aplica automaticamente 2 horas de antecedência

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

    setIsCalculating(true);

    try {
      // Calcular preços para diferentes categorias usando os tipos corretos
      const executivoSedanData = await calculateTripPrice(pickup, destination, 'executivo');
      const executivoComumData = await calculateTripPrice(pickup, destination, 'economico');
      const executivoPremiumBlindadoData = await calculateTripPrice(pickup, destination, 'luxo');
      const minivanComumData = await calculateTripPrice(pickup, destination, 'suv');
      const minivanBlindadaData = await calculateTripPrice(pickup, destination, 'minivanBlindada');
      const van15LugaresData = await calculateTripPrice(pickup, destination, 'van15Lugares');

      // Verificar se é uma rota negociável (preço -1)
      if (executivoSedanData.finalPrice === -1) {
        // Rota negociável - redirecionar para página especial ou mostrar mensagem
        setErrorMessage('Esta rota requer negociação. Entre em contato com nosso consultor para obter um orçamento personalizado.');
        return;
      }

      const tripData = {
        pickup,
        destination,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        passengers: 1,
        distance: executivoSedanData.distance,
        estimatedTime: executivoSedanData.estimatedTime,
        vehicles: {
          executivoSedan: {
            name: 'Executivo Sedan',
            price: executivoSedanData.finalPrice,
            basePrice: executivoSedanData.basePrice,
            passengers: 4,
            luggage: 3,
            description: 'Sedan executivo com conforto premium e elegância'
          },
          executivoComum: {
            name: 'Executivo Comum',
            price: executivoComumData.finalPrice,
            basePrice: executivoComumData.basePrice,
            passengers: 4,
            luggage: 2,
            description: 'Veículo executivo padrão com bom conforto'
          },
          executivoPremiumBlindado: {
            name: 'Executivo Premium Blindado',
            price: executivoPremiumBlindadoData.finalPrice,
            basePrice: executivoPremiumBlindadoData.basePrice,
            passengers: 4,
            luggage: 3,
            description: 'Máxima segurança com blindagem e luxo premium'
          },
          minivanComum: {
            name: 'MiniVan Comum',
            price: minivanComumData.finalPrice,
            basePrice: minivanComumData.basePrice,
            passengers: 7,
            luggage: 4,
            description: 'Espaço amplo para grupos de até 7 pessoas'
          },
          minivanBlindada: {
            name: 'MiniVan Blindada',
            price: minivanBlindadaData.finalPrice,
            basePrice: minivanBlindadaData.basePrice,
            passengers: 7,
            luggage: 4,
            description: 'Segurança máxima para grupos com blindagem completa'
          },
          van15Lugares: {
            name: 'Van 15 Lugares',
            price: van15LugaresData.finalPrice,
            basePrice: van15LugaresData.basePrice,
            passengers: 15,
            luggage: 8,
            description: 'Transporte para grupos grandes com máximo conforto'
          }
        }
      };

      // Debug: Log dos dados sendo enviados
      console.log('📤 QuoteForm enviando dados:', tripData);
      
      // Rolar para o topo da página antes de navegar
      window.scrollTo(0, 0);
      
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
    
    // Se a data/hora selecionada for antes do mínimo (24h de antecedência), ajustar
    if (newDate && selectedTime) {
      const minDateTime = getMinDateTime();
      const selectedDateTime = new Date(newDate);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      selectedDateTime.setHours(hours, minutes, 0, 0);
      
      if (selectedDateTime < minDateTime) {
        // Se a data selecionada for antes do mínimo, usar a data mínima
        if (newDate < minDateTime) {
          setSelectedDate(minDateTime);
          setSelectedTime(minDateTime.toTimeString().slice(0, 5));
        } else {
          // Se a data é válida mas o horário não, ajustar apenas o horário
          const currentMinTime = getCurrentTime();
          setSelectedTime(currentMinTime);
        }
      }
    }
  };

  // Calcular horário mínimo baseado na data selecionada
  const getMinTime = () => {
    if (!selectedDate) return '';
    
    const minDateTime = getMinDateTime();
    const selectedDateOnly = new Date(selectedDate);
    selectedDateOnly.setHours(0, 0, 0, 0);
    
    const minDateOnly = new Date(minDateTime);
    minDateOnly.setHours(0, 0, 0, 0);
    
    // Se a data selecionada for a mesma que a data mínima, usar o horário mínimo
    if (selectedDateOnly.getTime() === minDateOnly.getTime()) {
      return minDateTime.toTimeString().slice(0, 5);
    }
    
    // Para datas futuras (mais de 24h), pode ser qualquer horário
    return '00:00';
  };

  return (
    <div className="bg-white rounded-none shadow-lg p-3 sm:p-5 w-full max-w-sm mx-auto lg:mx-0">
      {/* Cabeçalho */}
      <div className="text-center mb-3 sm:mb-">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide">
          {t('quote.formTitle')}
        </h2>
        <div className="flex justify-center mt-2 sm:mt-3">
          <button 
            type="button"
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-none"
          >
            {t('quote.byDestination')}
          </button>
        </div>
      </div>
      
      {/* Mensagem de erro */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
          {errorMessage.includes('Esta rota requer negociação') && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => window.open('https://wa.me/5511915853292', '_blank')}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                </svg>
                Falar com Consultor
              </button>
            </div>
          )}
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
            minDate={getMinDateTime()}
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
