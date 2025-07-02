import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { CheckCircle, Plane, Bus, Luggage } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuoteData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
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
}

interface PassengerInfo {
  reserveFor: string;
  flightNumber: string;
  plateNameShow: string;
  luggageCount: number;
  additionalInfo: string;
  passengerName: string;
  phoneNumber: string;
  email: string;
}

const PassengerData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatCurrency } = useLanguage();

  // Dados recebidos da navegação anterior
  const quoteData: QuoteData = location.state?.quoteData;
  const selectedVehicle: VehicleCategory = location.state?.selectedVehicle;

  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    reserveFor: "para-mim",
    flightNumber: "",
    plateNameShow: "Executive Transporte Premium",
    luggageCount: 2,
    additionalInfo: "",
    passengerName: "",
    phoneNumber: "",
    email: ""
  });

  // Detectar se é aeroporto ou rodoviária
  const isAirportTransfer = () => {
    const pickup = quoteData?.pickup?.toLowerCase() || "";
    const destination = quoteData?.destination?.toLowerCase() || "";
    
    return pickup.includes('aeroporto') || pickup.includes('airport') || pickup.includes('gru') || pickup.includes('cgh') ||
           destination.includes('aeroporto') || destination.includes('airport') || destination.includes('gru') || destination.includes('cgh');
  };

  const isBusStationTransfer = () => {
    const pickup = quoteData?.pickup?.toLowerCase() || "";
    const destination = quoteData?.destination?.toLowerCase() || "";
    
    return pickup.includes('rodoviária') || pickup.includes('terminal') || pickup.includes('bus') ||
           destination.includes('rodoviária') || destination.includes('terminal') || destination.includes('bus');
  };

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

  const formatTimeDisplay = (timeString: string) => {
    if (!timeString) return "";
    return `${timeString} PM (GMT-3)`;
  };

  const handleSubmit = () => {
    // Criar mensagem para WhatsApp
    const message = `🚗 *NOVA RESERVA - EXECUTIVE PREMIUM*

📋 *DADOS DA VIAGEM:*
• Data: ${formatDateDisplay(quoteData?.date || "")}
• Horário: ${formatTimeDisplay(quoteData?.time || "")}
• Origem: ${quoteData?.pickup}
• Destino: ${quoteData?.destination}

🚙 *VEÍCULO SELECIONADO:*
• Categoria: ${selectedVehicle?.name}
• Tipo: ${selectedVehicle?.type}
• Valor: ${formatCurrency(selectedVehicle?.price || 0)}

👤 *DADOS DO PASSAGEIRO:*
• Nome: ${passengerInfo.passengerName}
• Telefone: ${passengerInfo.phoneNumber}
• Email: ${passengerInfo.email}
• Reserva: ${passengerInfo.reserveFor === 'para-mim' ? 'Para mim' : 'Para outra pessoa'}

${isAirportTransfer() ? `✈️ *DETALHES DO VOO:*
• Número do voo: ${passengerInfo.flightNumber}` : ''}

${isBusStationTransfer() ? `🚌 *DETALHES DO TERMINAL:*
• Informações adicionais: ${passengerInfo.additionalInfo}` : ''}

📋 *DETALHES ADICIONAIS:*
• Nome na placa: ${passengerInfo.plateNameShow}
• Número de malas: ${passengerInfo.luggageCount}

${passengerInfo.additionalInfo ? `💬 *OBSERVAÇÕES:*
${passengerInfo.additionalInfo}` : ''}

---
Reserva feita através do site Executive Premium`;

    // Número do WhatsApp da Executive (substitua pelo número real)
    const whatsappNumber = "5511999999999"; // Exemplo
    
    // Criar URL do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  // Verificar se todos os campos obrigatórios estão preenchidos
  const isFormValid = () => {
    if (!passengerInfo.passengerName || !passengerInfo.phoneNumber || !passengerInfo.email) {
      return false;
    }
    
    if (isAirportTransfer() && !passengerInfo.flightNumber) {
      return false;
    }
    
    return true;
  };

  if (!quoteData || !selectedVehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Dados não encontrados</h1>
          <p className="text-gray-600 mb-6">
            Por favor, faça uma nova cotação.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Comum */}
      <Navbar showBreadcrumb={true} currentStep={2} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Trip Summary Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Trip Details */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  CLASSE: <span className="text-blue-600">{selectedVehicle.name.toUpperCase()}</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">PICKUP</div>
                    <div className="text-sm font-bold text-gray-900">
                      {formatDateDisplay(quoteData.date)}, {formatTimeDisplay(quoteData.time)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">ARRIVAL</div>
                    <div className="text-sm text-gray-600">
                      ESTIMATED AT 07:43 PM (GMT-3) • {location.state?.calculatedDistance ? Math.round(location.state.calculatedDistance) : 25} KM
                    </div>
                    {location.state?.estimatedTime && (
                      <div className="text-sm text-blue-600 font-medium mt-1">
                        ⏱️ Tempo estimado: {location.state.estimatedTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Vehicle and Route Details */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  VEÍCULO: <span className="text-blue-600">{selectedVehicle.type.toUpperCase()}</span>
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-medium text-gray-600">DE</div>
                    <div className="text-sm font-bold text-gray-900">{quoteData.pickup}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">PARA</div>
                    <div className="text-sm font-bold text-gray-900">{quoteData.destination}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passenger Information Form */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">PARA QUEM É ESSA VIAGEM</h3>
            
            {/* Reserve For */}
            <div className="mb-6">
              <RadioGroup 
                value={passengerInfo.reserveFor} 
                onValueChange={(value) => setPassengerInfo({...passengerInfo, reserveFor: value})}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="para-mim" id="para-mim" />
                  <Label htmlFor="para-mim">Reservar para mim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="para-outro" id="para-outro" />
                  <Label htmlFor="para-outro">Reservar para outra pessoa</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Additional Information Section */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900">Forneça informações adicionais</h4>
                <button className="text-gray-400">▲</button>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Se desejar, você pode adicionar solicitações especiais, por exemplo, quantidade de malas, cadeiras de criança, etc.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Flight Number (only for airports) */}
                  {isAirportTransfer() && (
                    <div>
                      <Label className="text-sm text-gray-600 mb-2 block flex items-center">
                        <Plane className="h-4 w-4 mr-2" />
                        Número do Voo *
                      </Label>
                      <Input
                        placeholder="Ex: G31234"
                        className="bg-gray-100"
                        value={passengerInfo.flightNumber}
                        onChange={(e) => setPassengerInfo({...passengerInfo, flightNumber: e.target.value})}
                      />
                    </div>
                  )}

                  {/* Bus/Terminal Info (only for bus stations) */}
                  {isBusStationTransfer() && (
                    <div>
                      <Label className="text-sm text-gray-600 mb-2 block flex items-center">
                        <Bus className="h-4 w-4 mr-2" />
                        Informações do Terminal
                      </Label>
                      <Input
                        placeholder="Ex: Leito, executivo, etc."
                        className="bg-gray-100"
                        value={passengerInfo.additionalInfo}
                        onChange={(e) => setPassengerInfo({...passengerInfo, additionalInfo: e.target.value})}
                      />
                    </div>
                  )}

                  {/* Luggage Count */}
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block flex items-center">
                      <Luggage className="h-4 w-4 mr-2" />
                      Número de Malas
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      className="bg-gray-100"
                      value={passengerInfo.luggageCount}
                      onChange={(e) => setPassengerInfo({...passengerInfo, luggageCount: parseInt(e.target.value) || 0})}
                    />
                  </div>

                  {/* Passenger Name */}
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">
                      Nome do Passageiro *
                    </Label>
                    <Input
                      placeholder="Nome completo"
                      className="bg-gray-100"
                      value={passengerInfo.passengerName}
                      onChange={(e) => setPassengerInfo({...passengerInfo, passengerName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Name on Plate */}
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">
                      Nome na Placa
                    </Label>
                    <Input
                      className="bg-gray-100"
                      value={passengerInfo.plateNameShow}
                      onChange={(e) => setPassengerInfo({...passengerInfo, plateNameShow: e.target.value})}
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">
                      Telefone *
                    </Label>
                    <Input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="bg-gray-100"
                      value={passengerInfo.phoneNumber}
                      onChange={(e) => setPassengerInfo({...passengerInfo, phoneNumber: e.target.value})}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      className="bg-gray-100"
                      value={passengerInfo.email}
                      onChange={(e) => setPassengerInfo({...passengerInfo, email: e.target.value})}
                      required
                    />
                  </div>

                  {/* Additional Observations */}
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">
                      Observações Adicionais
                    </Label>
                    <Textarea
                      placeholder="Observações especiais, necessidades especiais, etc."
                      className="bg-gray-100 min-h-[80px]"
                      value={passengerInfo.additionalInfo}
                      onChange={(e) => setPassengerInfo({...passengerInfo, additionalInfo: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="mt-8">
              <Button 
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium"
              >
                FINALIZAR RESERVA VIA WHATSAPP
              </Button>
              
              {!isFormValid() && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  Por favor, preencha todos os campos obrigatórios (*)
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PassengerData; 