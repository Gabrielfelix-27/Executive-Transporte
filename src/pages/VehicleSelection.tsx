import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { VehicleCategories } from '@/components/VehicleCategories';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/hooks/useCurrency';
import { CheckCircle, User, MapPin, Target, Calendar, Clock, Users, Luggage, Gift, Car, Clock3, UserCheck, Navigation2, Timer } from "lucide-react";

interface QuoteData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  vehicles?: any;
  calculatedDistance?: number;
  estimatedTime?: string;
  estimatedTimeMinutes?: number;
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

export default function VehicleSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | null>(null);
  const [categories, setCategories] = useState<VehicleCategory[]>([]);
  const [driverTypes, setDriverTypes] = useState<{[key: string]: 'monolingual' | 'bilingual'}>({});

  // Recuperar dados da cotação do estado da navegação
  const quoteData: QuoteData = location.state || {
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1
  };

  // Função para formatar tempo estimado
  const formatEstimatedTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}min`;
  };

  // Processar dados da viagem
  useEffect(() => {
    console.log('🔍 VehicleSelection recebeu dados:', quoteData);
    console.log('🔍 Tipo de quoteData.vehicles:', typeof quoteData.vehicles);
    console.log('🔍 quoteData.vehicles:', quoteData.vehicles);
    
    if (quoteData.vehicles && typeof quoteData.vehicles === 'object') {
      // Converter objeto de veículos em array e criar ordem específica
      const vehicleEntries = Object.entries(quoteData.vehicles);
      console.log('🔍 vehicleEntries encontradas:', vehicleEntries);
      console.log('🔍 Número de veículos encontrados:', vehicleEntries.length);
      
      // Log dos nomes dos veículos encontrados
      vehicleEntries.forEach(([key, vehicle]: [string, any]) => {
        console.log(`🚗 Veículo encontrado: "${vehicle.name}" (key: ${key})`);
      });
      
      // Definir ordem desejada dos veículos
      const desiredOrder = [
        'Executivo Sedan',
        'Executivo Comum', 
        'Executivo Premium Blindado',
        'MiniVan Comum',
        'MiniVan Blindada',
        'Van 15 Lugares'
      ];
      
      // Mapear veículos mantendo ordem específica e evitando duplicatas
      const vehicleArray = desiredOrder
        .map(desiredName => {
          console.log(`🔍 Procurando por: "${desiredName}"`);
          
          // Encontrar veículo correspondente nos dados
          const vehicleEntry = vehicleEntries.find(([key, vehicle]: [string, any]) => {
            const matches = vehicle.name === desiredName || 
              vehicle.name.includes(desiredName) ||
              (desiredName === 'Executivo Sedan' && vehicle.name.includes('Sedan')) ||
              (desiredName === 'Executivo Comum' && vehicle.name.includes('Executivo') && !vehicle.name.includes('Sedan') && !vehicle.name.includes('Premium') && !vehicle.name.includes('Blindado')) ||
              (desiredName === 'MiniVan Comum' && vehicle.name.includes('MiniVan') && !vehicle.name.includes('Blindada')) ||
              (desiredName === 'Executivo Premium Blindado' && (vehicle.name.includes('Premium') || vehicle.name.includes('Blindado')) && vehicle.name.includes('Executivo')) ||
              (desiredName === 'MiniVan Blindada' && vehicle.name.includes('MiniVan') && vehicle.name.includes('Blindada')) ||
              (desiredName === 'Van 15 Lugares' && vehicle.name.includes('Van') && !vehicle.name.includes('MiniVan'));
            
            if (matches) {
              console.log(`✅ Match encontrado para "${desiredName}": "${vehicle.name}"`);
            }
            return matches;
          });
          
          if (!vehicleEntry) {
            console.log(`❌ Nenhum match encontrado para: "${desiredName}"`);
            return null;
          }
          
          const [key, vehicle] = vehicleEntry;
          
          return {
            id: key,
            type: desiredName.includes('Sedan') ? 'Sedan' : 
                  desiredName.includes('Van') && !desiredName.includes('MiniVan') ? 'Van' : 
                  desiredName.includes('MiniVan') ? 'SUV' : 'Sedan',
            name: desiredName,
            description: vehicle.description,
            image: desiredName === 'Executivo Sedan' ? '/vehicles/Executivo Sedan.webp' :
                   desiredName === 'Executivo Comum' ? '/vehicles/EXECUTIVO COMUM.webp' :
                   desiredName === 'Executivo Premium Blindado' ? '/vehicles/EXECUTIVO PREMIUM BLINDADO.webp' :
                   desiredName === 'MiniVan Blindada' ? '/vehicles/MINIVAN BLINDADA.webp' :
                   desiredName === 'MiniVan Comum' ? '/vehicles/MINIVAN COMUM.webp' :
                   desiredName === 'Van 15 Lugares' ? '/vehicles/VAN 15 LUGARES.webp' : '/vehicles/EXECUTIVO COMUM.webp',
            capacity: vehicle.passengers,
            price: vehicle.price,
            features: ['Ar condicionado', 'Wi-Fi', 'Água'],
            luggage: { small: 2, medium: 2, large: 1 }
          };
        })
        .filter(Boolean); // Remove entradas nulas
      
      console.log('🚗 Categorias processadas com ordem específica:', vehicleArray);
      setCategories(vehicleArray);
    } else {
      // Categorias padrão se não houver dados
      const defaultCategories = [
        {
          id: 'sedan',
          type: 'Sedan',
          name: 'Executivo Sedan',
          description: 'Sedan executivo confortável',
          image: '/vehicles/Executivo Sedan.webp',
          capacity: 3,
          price: 184,
          features: ['Ar condicionado', 'Wi-Fi', 'Água'],
          luggage: { small: 2, medium: 2, large: 1 }
        },
        {
          id: 'comum',
          type: 'Sedan',
          name: 'Executivo Comum',
          description: 'Veículo executivo padrão',
          image: '/vehicles/EXECUTIVO COMUM.webp',
          capacity: 3,
          price: 204,
          features: ['Ar condicionado', 'Wi-Fi', 'Água'],
          luggage: { small: 2, medium: 2, large: 1 }
        },
        {
          id: 'premium',
          type: 'Premium',
          name: 'Executivo Premium Blindado',
          description: 'Máxima segurança e conforto',
          image: '/vehicles/EXECUTIVO PREMIUM BLINDADO.webp',
          capacity: 3,
          price: 384,
          features: ['Ar condicionado', 'Wi-Fi', 'Água', 'Blindagem', 'Segurança'],
          luggage: { small: 2, medium: 2, large: 1 }
        },
        {
          id: 'minivan',
          type: 'MiniVan',
          name: 'MiniVan Comum',
          description: 'Espaço e conforto para grupos',
          image: '/vehicles/MINIVAN COMUM.webp',
          capacity: 6,
          price: 284,
          features: ['Ar condicionado', 'Wi-Fi', 'Água', 'Espaço amplo'],
          luggage: { small: 3, medium: 3, large: 2 }
        },
        {
          id: 'minivan-blindada',
          type: 'MiniVan',
          name: 'MiniVan Blindada',
          description: 'Segurança e espaço premium',
          image: '/vehicles/MINIVAN BLINDADA.webp',
          capacity: 6,
          price: 484,
          features: ['Ar condicionado', 'Wi-Fi', 'Água', 'Blindagem', 'Espaço amplo'],
          luggage: { small: 3, medium: 3, large: 2 }
        },
        {
          id: 'van',
          type: 'Van',
          name: 'Van 15 Lugares',
          description: 'Máximo espaço para grandes grupos',
          image: '/vehicles/VAN 15 LUGARES.webp',
          capacity: 14,
          price: 584,
          features: ['Ar condicionado', 'Wi-Fi', 'Água', 'TV', 'Som premium'],
          luggage: { small: 4, medium: 4, large: 3 }
        }
      ];
      setCategories(defaultCategories);
    }
  }, [quoteData]);

  // Função para traduzir dias da semana
  const translateDayOfWeek = (dayName: string): string => {
    const dayTranslations: { [key: string]: string } = {
      'Sunday': t('date.sunday'),
      'Monday': t('date.monday'),
      'Tuesday': t('date.tuesday'),
      'Wednesday': t('date.wednesday'),
      'Thursday': t('date.thursday'),
      'Friday': t('date.friday'),
      'Saturday': t('date.saturday')
    };
    return dayTranslations[dayName] || dayName;
  };

  // Função para traduzir meses
  const translateMonth = (monthName: string): string => {
    const monthTranslations: { [key: string]: string } = {
      'January': t('date.january'),
      'February': t('date.february'),
      'March': t('date.march'),
      'April': t('date.april'),
      'May': t('date.may'),
      'June': t('date.june'),
      'July': t('date.july'),
      'August': t('date.august'),
      'September': t('date.september'),
      'October': t('date.october'),
      'November': t('date.november'),
      'December': t('date.december')
    };
    return monthTranslations[monthName] || monthName;
  };

  // Função para formatar horário
  const formatTimeDisplay = (time: string): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  // Função para calcular horário de chegada estimado
  const calculateArrivalTime = (departureTime: string, estimatedMinutes?: number): string | null => {
    if (!departureTime || !estimatedMinutes) return null;
    
    const [hours, minutes] = departureTime.split(':').map(Number);
    const departureDate = new Date();
    departureDate.setHours(hours, minutes, 0, 0);
    
    const arrivalDate = new Date(departureDate.getTime() + estimatedMinutes * 60000);
    
    return `${arrivalDate.getHours().toString().padStart(2, '0')}:${arrivalDate.getMinutes().toString().padStart(2, '0')}`;
  };

  // Função para formatar data
  const formatDateDisplay = (dateString: string): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString + 'T00:00:00');
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    
    const translatedDayOfWeek = translateDayOfWeek(dayOfWeek);
    const translatedMonth = translateMonth(month);
    
    return `${translatedDayOfWeek}, ${day} ${t('date.of')} ${translatedMonth} ${t('date.of')} ${year}`;
  };

  // Função para continuar
  const handleContinue = () => {
    if (!selectedCategory) {
      toast.error(t('vehicle.selectCategory'));
      return;
    }

    const selectedDriverType = driverTypes[selectedCategory.id] || 'monolingual';
    const finalPrice = selectedDriverType === 'bilingual' ? selectedCategory.price * 1.3 : selectedCategory.price;

    // Rolar para o topo da página antes de navegar
    window.scrollTo(0, 0);

    // Redirecionar para página de dados do passageiro
    navigate('/passenger-data', {
      state: {
        vehicleName: selectedCategory.name,
        price: finalPrice,
        pickup: quoteData.pickup,
        destination: quoteData.destination,
        date: quoteData.date,
        time: quoteData.time,
        passengers: quoteData.passengers,
        selectedDriverType,
        quoteData,
        selectedVehicle: {
          ...selectedCategory,
          price: finalPrice
        }
      }
    });
  };

  // Benefícios incluídos
  const benefitsIncluded = [
    {
      icon: <UserCheck className="h-4 w-4" />,
      title: t('vehicle.benefit1')
    },
    {
      icon: <Gift className="h-4 w-4" />,
      title: t('vehicle.benefit2')
    },
    {
      icon: <Car className="h-4 w-4" />,
      title: t('vehicle.benefit3')
    },
    {
      icon: <Clock3 className="h-4 w-4" />,
      title: t('vehicle.benefit4')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Comum */}
      <Navbar showBreadcrumb={true} currentStep={1} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pt-8">
        {/* Trip Details Card */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
              {/* Pickup */}
              <div className="space-y-3">
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
                  {(quoteData.calculatedDistance || quoteData.distance) && (quoteData.calculatedDistance > 0 || quoteData.distance > 0) && (
                    <span>{calculateArrivalTime(quoteData.time, quoteData.estimatedTimeMinutes) ? ' • ' : ''}{t('trip.distance')}: {(quoteData.calculatedDistance || quoteData.distance)?.toFixed(1)} KM</span>
                  )}
                </div>
                {quoteData.estimatedTimeMinutes && (
                  <div className="text-sm text-gray-600 font-medium mt-1">
                    ⏱️ {t('vehicle.estimatedTime')}: {formatEstimatedTime(quoteData.estimatedTimeMinutes)}
                  </div>
                )}
              </div>

              {/* Route Information */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">{t('vehicle.from')}</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900 mb-2 p-3 border border-gray-200 rounded-lg bg-white shadow-sm break-words" title={`${t('trip.origin')}: ${quoteData.pickup}`}>
                    📍 {quoteData.pickup || t('trip.originNotInformed')}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">{t('vehicle.to')}</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900 p-3 border border-gray-200 rounded-lg bg-white shadow-sm break-words" title={`${t('trip.destination')}: ${quoteData.destination}`}>
                    🎯 {quoteData.destination || t('trip.destinationNotInformed')}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  💰 {t('vehicle.priceFrom')}:
                </div>
                <div className="text-2xl font-bold text-black mb-3">
                  {categories.length > 0 
                    ? formatPrice(Math.min(...categories.map(c => c.price || 184))) 
                    : formatPrice(184)
                  }
                </div>
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                {t('vehicle.priceNote')}
              </div>
              
              {/* Debug das categorias */}
              {categories.length === 0 && (
                <div className="text-xs text-orange-600 mt-4 p-3 bg-orange-50 rounded">
                  ⚠️ Nenhuma categoria de veículo carregada. Usando categorias padrão.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Categories */}
        <div className="mb-8">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {categories.map((category: any) => (
              <Card 
                key={category.id} 
                className={`cursor-pointer transition-all ${
                  selectedCategory?.id === category.id ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <CardContent className="p-6">
                  {/* Vehicle Image */}
                  <div className="bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-48 object-cover"
                      style={{
                        objectPosition: (category.name === 'Executivo Comum' || category.name === 'Executivo Sedan') 
                          ? 'center bottom' 
                          : 'center'
                      }}
                    />
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
                      {formatPrice((driverTypes[category.id] === 'bilingual') ? category.price * 1.3 : category.price)}
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      {t('vehicle.totalPrice')}
                    </div>
                  </div>

                  {/* Driver Type Selection - Only show when card is selected */}
                      {selectedCategory?.id === category.id && (
                        <div className="space-y-2">
                          <div className="text-xs text-gray-600 text-center mb-2">
                            {t('vehicle.driverType')}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDriverTypes(prev => ({ ...prev, [category.id]: 'monolingual' }));
                              }}
                              className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
                                (driverTypes[category.id] || 'monolingual') === 'monolingual'
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {t('vehicle.monolingual')}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDriverTypes(prev => ({ ...prev, [category.id]: 'bilingual' }));
                              }}
                              className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
                                driverTypes[category.id] === 'bilingual'
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {t('vehicle.bilingual')}
                            </button>
                          </div>
                        </div>
                      )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4 px-2" style={{width: `${categories.length * 340}px`}}>
                {categories.map((category: any) => (
                  <Card 
                    key={category.id} 
                    className={`flex-shrink-0 w-80 cursor-pointer transition-all ${
                      selectedCategory?.id === category.id ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardContent className="p-6">
                      {/* Vehicle Image */}
                      <div className="bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-48 object-cover"
                          style={{
                            objectPosition: 'center'
                          }}
                        />
                      </div>



                      {/* Category Name */}
                      <h3 className="font-bold text-center mb-4 text-gray-900 text-base">
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
                          {formatPrice((driverTypes[category.id] === 'bilingual') ? category.price * 1.3 : category.price)}
                        </div>
                        <div className="text-xs text-gray-500 mb-3">
                          {t('vehicle.totalPrice')}
                        </div>
                      </div>

                      {/* Driver Type Selection - Only show when card is selected */}
                      {selectedCategory?.id === category.id && (
                        <div className="space-y-2">
                          <div className="text-xs text-gray-600 text-center mb-2">
                            {t('vehicle.driverType')}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDriverTypes(prev => ({ ...prev, [category.id]: 'monolingual' }));
                              }}
                              className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
                                (driverTypes[category.id] || 'monolingual') === 'monolingual'
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {t('vehicle.monolingual')}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDriverTypes(prev => ({ ...prev, [category.id]: 'bilingual' }));
                              }}
                              className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
                                driverTypes[category.id] === 'bilingual'
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {t('vehicle.bilingual')}
                            </button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
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
              <h3 className="text-2xl font-light text-gray-800 tracking-wide">{t('trip.summary')}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <MapPin className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 mb-1">{t('trip.origin')}</div>
                    <div className="text-gray-900 font-medium">{quoteData.pickup}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Navigation2 className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 mb-1">{t('trip.destination')}</div>
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
                    <div className="text-sm font-medium text-gray-500 mb-1">{t('trip.dateAndTime')}</div>
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
                    <div className="text-sm font-medium text-gray-500 mb-1">{t('trip.distance')}</div>
                    <div className="text-gray-900 font-medium">
                      {(quoteData.calculatedDistance || quoteData.distance) ? `${(quoteData.calculatedDistance || quoteData.distance)?.toFixed(1)} KM` : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={!selectedCategory}
          className={`w-full text-white py-4 text-lg font-medium ${
            selectedCategory 
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