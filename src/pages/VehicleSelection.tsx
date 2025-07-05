import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, User, MapPin, Target, Calendar, Clock, Users, Luggage, Gift, Car, Clock3, UserCheck, Navigation2, Timer } from "lucide-react";

interface QuoteData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  calculatedDistance?: number;
  estimatedTime?: string;
  estimatedTimeMinutes?: number;
  priceFactors?: string[];
}

interface VehicleCategory {
  id: string;
  type: string;
  name: string;
  description: string;
  image: string;
  capacity: number;
  price: number;
  features: string[];
  luggage: {
    small: number;
    medium: number;
    large: number;
  };
}

const VehicleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, formatCurrency, language } = useLanguage();
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory | null>(null);

  // Pegar dados da cotação da navegação anterior
  const tripData = location.state || {};
  
  // Função para formatar tempo estimado
  const formatEstimatedTime = (minutes: number): string => {
    console.log('🕐 formatEstimatedTime recebeu:', minutes, typeof minutes);
    
    if (minutes === undefined || minutes === null || isNaN(minutes)) {
      console.log('⚠️ Tempo inválido:', minutes);
      return "";
    }
    
    if (minutes === 0) {
      return "0 min";
    }
    
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (remainingMinutes === 0) {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      } else {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'} ${remainingMinutes} min`;
      }
    }
  };

  // Debug: Log dos dados recebidos
  console.log('🚗 Dados recebidos no VehicleSelection:', tripData);

  const quoteData: QuoteData = {
    pickup: tripData.pickup || "Endereço de origem não informado",
    destination: tripData.destination || "Endereço de destino não informado", 
    date: tripData.date || new Date().toISOString().split('T')[0],
    time: tripData.time || "14:30",
    passengers: tripData.passengers || 1,
    calculatedDistance: tripData.distance, // Corrigido: vem como 'distance' do QuoteForm
    estimatedTimeMinutes: tripData.estimatedTime, // Corrigido: vem como 'estimatedTime' em minutos
    estimatedTime: (tripData.estimatedTime !== undefined && tripData.estimatedTime !== null) 
      ? formatEstimatedTime(tripData.estimatedTime) 
      : undefined,
    priceFactors: tripData.priceFactors
  };

  // Debug melhorado: verificar se os dados estão chegando corretamente
  console.log('🔍 [DEBUG] QuoteData processado:', {
    pickup: quoteData.pickup,
    destination: quoteData.destination,
    distance: quoteData.calculatedDistance,
    estimatedTime: quoteData.estimatedTime,
    estimatedTimeMinutes: quoteData.estimatedTimeMinutes,
    estimatedTimeRaw: tripData.estimatedTime,
    vehicles: tripData.vehicles
  });

  // Converter objeto vehicles para array no formato esperado
  const getVehicleImage = (categoryKey: string) => {
    const images = {
      'economy': 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'executivo': 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'luxo': 'https://images.unsplash.com/photo-1580414819951-3b5bb3d7e1f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'suv': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };
    return images[categoryKey as keyof typeof images] || images.executivo;
  };

  // CORRIGIDO: usar tripData.vehicles em vez de tripData.categories
  const categories = tripData.vehicles ? Object.entries(tripData.vehicles).map(([key, value]: [string, any]) => ({
    id: key,
    type: value.name,
    name: value.name,
    description: value.description,
    image: getVehicleImage(key),
    capacity: value.passengers,
    price: value.price,
    features: [value.description],
    luggage: {
      small: 2,
      medium: value.luggage,
      large: 1
    }
  })) : [];

  // Função para formatar data multilíngue
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + 'T00:00:00');
    
    const weekdaysTranslations = {
      pt: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
      es: ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
      en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    };
    
    const monthsTranslations = {
      pt: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      es: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
      en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    };
    
    const weekdays = weekdaysTranslations[language as keyof typeof weekdaysTranslations];
    const months = monthsTranslations[language as keyof typeof monthsTranslations];
    
    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${t('date.of')} ${month}, ${year}`;
  };

  // Função para formatar horário
  const formatTimeDisplay = (timeString: string) => {
    if (!timeString) return "";
    return `${timeString} (horário de Brasília)`;
  };

  // Função para calcular horário de chegada estimado
  const calculateArrivalTime = (departureTime: string, estimatedDurationMinutes?: number) => {
    if (!departureTime || !estimatedDurationMinutes || estimatedDurationMinutes === 0) {
      console.log('🕐 Dados insuficientes para calcular chegada:', { departureTime, estimatedDurationMinutes });
      return "";
    }
    
    try {
      // Parse do horário de saída (formato HH:MM)
      const [hours, minutes] = departureTime.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) {
        console.warn('⚠️ Horário de partida inválido:', departureTime);
        return "";
      }
      
      const departureDate = new Date();
      departureDate.setHours(hours, minutes, 0, 0);
      
      // Calcular horário de chegada usando os minutos diretamente
      const arrivalDate = new Date(departureDate.getTime() + estimatedDurationMinutes * 60 * 1000);
      
      // Formatar como HH:MM
      const arrivalHours = arrivalDate.getHours().toString().padStart(2, '0');
      const arrivalMinutes = arrivalDate.getMinutes().toString().padStart(2, '0');
      
      const result = `${arrivalHours}:${arrivalMinutes}`;
      console.log('🕐 Horário de chegada calculado:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao calcular horário de chegada:', error);
      return "";
    }
  };

  const handleContinue = () => {
    if (!selectedVehicle) return;
    
    // Navegar para próxima etapa (dados do passageiro)
    navigate('/passenger-data', {
      state: {
        quoteData,
        selectedVehicle
      }
    });
  };

  const benefitsIncluded = [
    {
      icon: <Gift className="h-5 w-5" />,
      title: t('vehicle.benefit1')
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: t('vehicle.benefit2')
    },
    {
      icon: <Gift className="h-5 w-5" />,
      title: t('vehicle.benefit3')
    },
    {
      icon: <Clock3 className="h-5 w-5" />,
      title: t('vehicle.benefit4')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Comum */}
      <Navbar showBreadcrumb={true} currentStep={1} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Trip Details Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup */}
              <div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-black mr-2" />
                  <span className="text-sm font-medium text-gray-600">{t('vehicle.pickup')}</span>
                </div>
                <div className="text-sm font-bold text-gray-900 mb-1">
                  {formatDateDisplay(quoteData.date)}, {formatTimeDisplay(quoteData.time)}
                </div>
                <div className="text-sm text-gray-600 mb-2">{t('vehicle.arrival')}</div>
                <div className="text-sm text-gray-600">
                  {calculateArrivalTime(quoteData.time, quoteData.estimatedTimeMinutes) && (
                    <span>{formatTimeDisplay(calculateArrivalTime(quoteData.time, quoteData.estimatedTimeMinutes))}</span>
                  )}
                  {quoteData.calculatedDistance && quoteData.calculatedDistance > 0 && (
                    <span>{calculateArrivalTime(quoteData.time, quoteData.estimatedTimeMinutes) ? ' • ' : ''}Distância: {quoteData.calculatedDistance.toFixed(1)} KM</span>
                  )}
                </div>
                {quoteData.estimatedTime && (
                  <div className="text-sm text-gray-600 font-medium mt-1">
                    ⏱️ {t('vehicle.estimatedTime')}: {quoteData.estimatedTime}
                  </div>
                )}
                {quoteData.priceFactors && quoteData.priceFactors.length > 0 && (
                  <div className="text-xs text-gray-500 mt-2">
                    <div className="font-medium mb-1">📊 {t('vehicle.priceFactors')}:</div>
                    <div className="grid gap-1">
                      {quoteData.priceFactors.map((factor, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          {factor}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Route Information */}
              <div>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">{t('vehicle.from')}</div>
                  <div className="text-sm font-bold text-gray-900 mb-2 p-3 border border-gray-200 rounded-lg bg-white shadow-sm" title={`Origem: ${quoteData.pickup}`}>
                    📍 {quoteData.pickup || 'Origem não informada'}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">{t('vehicle.to')}</div>
                  <div className="text-sm font-bold text-gray-900 p-3 border border-gray-200 rounded-lg bg-white shadow-sm" title={`Destino: ${quoteData.destination}`}>
                    🎯 {quoteData.destination || 'Destino não informado'}
                  </div>
                </div>
                

              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600 mb-3">
                💰 {t('vehicle.priceFrom')}: 
                <span className="text-2xl font-bold text-black">
                  {categories.length > 0 
                    ? formatCurrency(Math.min(...categories.map(c => c.price || 184))) 
                    : formatCurrency(184)
                  }
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {t('vehicle.priceNote')}
              </div>
              
              {/* Debug das categorias */}
              {categories.length === 0 && (
                <div className="text-xs text-orange-600 mt-2 p-2 bg-orange-50 rounded">
                  ⚠️ Nenhuma categoria de veículo carregada. Verifique os dados recebidos.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map((category: any) => (
            <Card 
              key={category.id} 
              className={`cursor-pointer transition-all ${
                selectedVehicle?.id === category.id ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedVehicle(category)}
            >
              <CardContent className="p-6">
                {/* Vehicle Image */}
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-32 object-contain"
                  />
                </div>

                {/* Vehicle Type */}
                <div className="text-xs text-gray-500 text-center mb-2">
                  {category.type.toUpperCase()}
                </div>

                {/* Category Name */}
                <h3 className="font-bold text-center mb-4 text-gray-900">
                  {category.name.toUpperCase()}
                </h3>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {t('vehicle.up_to')} {category.capacity} {t('vehicle.passengers')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Luggage className="h-4 w-4 mr-2" />
                    {t('vehicle.up_to')} 3 {t('vehicle.mediumBags')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Luggage className="h-4 w-4 mr-2" />
                    {t('vehicle.up_to')} 2 {t('vehicle.largeBags')}
                  </div>
                </div>

                {/* Price */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {formatCurrency(category.price)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('vehicle.totalPrice')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Included */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">{t('vehicle.benefitsTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefitsIncluded.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <div className="text-gray-400 mr-3">
                    {benefit.icon}
                  </div>
                  {benefit.title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Observations */}
        <div className="mb-8">
          <h4 className="font-bold text-gray-900 mb-2">{t('vehicle.observationsTitle')}</h4>
          <p className="text-sm text-gray-600">
            {t('vehicle.observationsText')}
          </p>
          <button className="text-sm text-black hover:underline mt-2">
            {t('vehicle.terms')}
          </button>
        </div>

        {/* Resumo da viagem */}
        <Card className="mb-6 border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                <Navigation2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-light text-gray-800 tracking-wide">Resumo da Viagem</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <MapPin className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 mb-1">Origem</div>
                    <div className="text-gray-900 font-medium">{quoteData.pickup}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Navigation2 className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 mb-1">Destino</div>
                    <div className="text-gray-900 font-medium">{quoteData.destination}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Calendar className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 mb-1">Data e Horário</div>
                    <div className="text-gray-900 font-medium">
                      {formatDateDisplay(quoteData.date)}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {formatTimeDisplay(quoteData.time)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Timer className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 mb-1">Distância</div>
                    <div className="text-gray-900 font-medium">
                      {quoteData.calculatedDistance ? `${quoteData.calculatedDistance.toFixed(1)} KM` : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {quoteData.priceFactors && quoteData.priceFactors.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-3">Fatores de Preço</div>
                <div className="flex flex-wrap gap-2">
                  {quoteData.priceFactors.map((factor, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={!selectedVehicle}
          className={`w-full text-white py-4 text-lg font-medium ${
            selectedVehicle 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-black hover:bg-gray-800'
          }`}
        >
          {t('vehicle.continue')}
        </Button>
      </div>
    </div>
  );
};

export default VehicleSelection; 