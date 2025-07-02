import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, User, MapPin, Target, Calendar, Clock, Users, Luggage, Gift, Car, Clock3, UserCheck } from "lucide-react";

interface QuoteData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  calculatedDistance?: number;
  estimatedTime?: string;
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
  const { t, formatCurrency } = useLanguage();
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory | null>(null);

  // Pegar dados da cotação da navegação anterior
  const tripData = location.state || {};
  
  const quoteData: QuoteData = {
    pickup: tripData.pickup || "Endereço de origem",
    destination: tripData.destination || "Endereço de destino", 
    date: tripData.date || new Date().toISOString().split('T')[0],
    time: tripData.time || "14:30",
    passengers: 1,
    calculatedDistance: tripData.distance,
    estimatedTime: tripData.estimatedTime,
    priceFactors: tripData.priceFactors
  };

  // Converter objeto categories para array no formato esperado
  const getVehicleImage = (categoryKey: string) => {
    const images = {
      'economico': 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'executivo': 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'luxo': 'https://images.unsplash.com/photo-1580414819951-3b5bb3d7e1f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'suv': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };
    return images[categoryKey as keyof typeof images] || images.executivo;
  };

  const categories = tripData.categories ? Object.entries(tripData.categories).map(([key, value]: [string, any]) => ({
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

  // Função para formatar data
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + 'T00:00:00');
    const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    
    const diaSemana = diasSemana[date.getDay()];
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    const ano = date.getFullYear();
    
    return `${dia} DE ${mes}, ${ano}`;
  };

  // Função para formatar horário
  const formatTimeDisplay = (timeString: string) => {
    if (!timeString) return "";
    return `${timeString} PM (GMT-3)`;
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
      title: "Cancelamento gratuito até 2 horas antes da corrida"
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: "Encontro e recepção"
    },
    {
      icon: <Gift className="h-5 w-5" />,
      title: "Amenities exclusivos"
    },
    {
      icon: <Clock3 className="h-5 w-5" />,
      title: "15 minutos gratuitos de tempo de espera"
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
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">PICKUP</span>
                </div>
                <div className="text-sm font-bold text-gray-900 mb-1">
                  {formatDateDisplay(quoteData.date)}, {formatTimeDisplay(quoteData.time)}
                </div>
                <div className="text-sm text-gray-600 mb-2">ARRIVAL</div>
                <div className="text-sm text-gray-600">
                  ESTIMATED AT 06:00 PM (GMT-3) • {quoteData.calculatedDistance ? Math.round(quoteData.calculatedDistance) : 25} KM
                </div>
                {quoteData.estimatedTime && (
                  <div className="text-sm text-blue-600 font-medium mt-1">
                    ⏱️ Tempo estimado: {quoteData.estimatedTime}
                  </div>
                )}
                {quoteData.priceFactors && quoteData.priceFactors.length > 0 && (
                  <div className="text-xs text-gray-500 mt-2">
                    <div className="font-medium mb-1">📊 Fatores considerados no preço:</div>
                    <div className="grid gap-1">
                      {quoteData.priceFactors.map((factor, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                          {factor}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Destination */}
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">DE</div>
                <div className="text-sm font-bold text-gray-900 mb-2">{quoteData.pickup}</div>
                <div className="text-sm font-medium text-gray-600 mb-2">PARA</div>
                <div className="text-sm font-bold text-gray-900">{quoteData.destination}</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600 mb-3">
                💰 VALOR A PARTIR DE: <span className="text-2xl font-bold text-green-600">{formatCurrency(Math.min(...categories.map(c => c.price || 184)))}</span>
              </div>
              <div className="text-xs text-gray-500">
                *Preços podem variar conforme categoria selecionada e fatores da viagem
              </div>
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
                    até {category.capacity} passageiros
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Luggage className="h-4 w-4 mr-2" />
                    até 3 malas de tamanho médio
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Luggage className="h-4 w-4 mr-2" />
                    até 2 malas de tamanho grande
                  </div>
                </div>

                {/* Price */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {formatCurrency(category.price)}
                  </div>
                  <div className="text-xs text-gray-500">
                    O preço total inclui impostos, pedágio e outros encargos.
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Included */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Está incluso em todas as classes:</h3>
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
          <h4 className="font-bold text-gray-900 mb-2">Observações:</h4>
          <p className="text-sm text-gray-600">
            As capacidades de hóspedes/bagagens devem ser respeitadas por razões de segurança. 
            Se não tiver certeza, selecione uma classe maior, pois os motoristas podem recusar 
            o serviço quando elas forem excedidas.
          </p>
          <button className="text-sm text-blue-600 hover:underline mt-2">
            Ver termos e condições
          </button>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={!selectedVehicle}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium"
        >
          CONTINUAR
        </Button>
      </div>
    </div>
  );
};

export default VehicleSelection; 