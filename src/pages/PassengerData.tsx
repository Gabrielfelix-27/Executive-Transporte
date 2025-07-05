import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Plane, Bus, Luggage, FileText, Download, Mail } from 'lucide-react';
import jsPDF from 'jspdf';

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
  const { formatCurrency, t } = useLanguage();

  // Dados recebidos da navegação anterior
  const quoteData: QuoteData = location.state?.quoteData;
  const selectedVehicle: VehicleCategory = location.state?.selectedVehicle;

  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    reserveFor: "para-mim",
    flightNumber: "",
    plateNameShow: t('passenger.executiveTransport'),
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



  // Função para gerar PDF com papel timbrado
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Configurar fonte
    doc.setFont('helvetica');
    
    // Cabeçalho com fundo elegante
    doc.setFillColor(0, 0, 0); // Fundo preto
    doc.rect(0, 0, 210, 55, 'F'); // Retângulo preenchido
    
    // Logo e texto do cabeçalho (em branco sobre fundo preto)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('EXECUTIVE PREMIUM', 20, 25);
    doc.setFontSize(12);
    doc.text('Transporte Executivo de Alto Padrão', 20, 35);
    doc.text('Telefone: (11) 94042-9351', 20, 45);
    
    // Data e hora da geração
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR');
    doc.setFontSize(10);
    doc.text(`Documento gerado em: ${dateStr} às ${timeStr}`, 120, 45);
    
    // Voltar para texto preto
    doc.setTextColor(0, 0, 0);
    
    // Título do documento
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('CONFIRMAÇÃO DE RESERVA', 20, 75);
    
    // Número da reserva (simulado)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const reserveNumber = `EP${Date.now().toString().slice(-6)}`;
    doc.text(`Número da Reserva: ${reserveNumber}`, 20, 85);
    
    // Dados da viagem
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPosition = 105;
    
    // Seção - Dados da Viagem
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS DA VIAGEM:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += 10;
    doc.text(`Data: ${formatDateDisplay(quoteData?.date || "")}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Horário: ${formatTimeDisplay(quoteData?.time || "")}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Origem: ${quoteData?.pickup}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Destino: ${quoteData?.destination}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Distância: ${location.state?.calculatedDistance ? Math.round(location.state.calculatedDistance) : 25} KM`, 25, yPosition);
    
    // Seção - Veículo Selecionado
    yPosition += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('VEÍCULO SELECIONADO:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += 10;
    doc.text(`Categoria: ${selectedVehicle?.name}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Tipo: ${selectedVehicle?.type}`, 25, yPosition);
    yPosition += 8;
    doc.setFont('helvetica', 'bold');
    doc.text(`Valor: ${formatCurrency(selectedVehicle?.price || 0)}`, 25, yPosition);
    doc.setFont('helvetica', 'normal');
    
    // Seção - Dados do Passageiro
    yPosition += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS DO PASSAGEIRO:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += 10;
    doc.text(`Nome: ${passengerInfo.passengerName}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Telefone: ${passengerInfo.phoneNumber}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Email: ${passengerInfo.email}`, 25, yPosition);
    yPosition += 8;
    doc.text(`Reserva: ${passengerInfo.reserveFor === 'para-mim' ? 'Para mim' : 'Para outra pessoa'}`, 25, yPosition);
    
    // Seção - Detalhes do Voo (se aplicável)
    if (isAirportTransfer() && passengerInfo.flightNumber) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.text('DETALHES DO VOO:', 20, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 10;
      doc.text(`Número do voo: ${passengerInfo.flightNumber}`, 25, yPosition);
    }
    
    // Seção - Detalhes do Terminal (se aplicável)
    if (isBusStationTransfer() && passengerInfo.additionalInfo) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.text('DETALHES DO TERMINAL:', 20, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 10;
      doc.text(`Informações: ${passengerInfo.additionalInfo}`, 25, yPosition);
    }
    
    // Seção - Detalhes Adicionais
    yPosition += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('DETALHES ADICIONAIS:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += 10;
    if (passengerInfo.plateNameShow) {
      doc.text(`Nome na placa: ${passengerInfo.plateNameShow}`, 25, yPosition);
      yPosition += 8;
    }
    doc.text(`Número de malas: ${passengerInfo.luggageCount}`, 25, yPosition);
    
    // Seção - Observações (se houver)
    if (passengerInfo.additionalInfo) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.text('OBSERVAÇÕES:', 20, yPosition);
      doc.setFont('helvetica', 'normal');
      yPosition += 10;
      // Quebrar texto longo
      const splitText = doc.splitTextToSize(passengerInfo.additionalInfo, 150);
      doc.text(splitText, 25, yPosition);
    }
    
    // Rodapé com fundo cinza
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 270, 210, 27, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Executive Premium - Transporte Executivo de Alto Padrão', 20, 280);
    doc.text('Reserva gerada automaticamente pelo sistema', 20, 288);
    doc.text('Para dúvidas, entre em contato: (11) 94042-9351', 20, 296);
    
    return doc;
  };

  const handleSubmit = async () => {
    try {
      // Gerar PDF
      const doc = generatePDF();
      
      // Converter PDF para base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      
      // Fazer download do PDF primeiro
      const fileName = `Executive_Premium_Reserva_${passengerInfo.passengerName.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
      
      // Preparar dados para envio via Netlify Function
      const reservationData = {
        passengerName: passengerInfo.passengerName,
        phone: passengerInfo.phoneNumber,
        email: passengerInfo.email,
        reserveFor: passengerInfo.reserveFor === 'para-mim' ? 'Para mim' : 'Para outra pessoa',
        date: formatDateDisplay(quoteData?.date || ""),
        time: formatTimeDisplay(quoteData?.time || ""),
        pickup: quoteData?.pickup,
        destination: quoteData?.destination,
        distance: `${location.state?.calculatedDistance ? Math.round(location.state.calculatedDistance) : 25} KM`,
        vehicleCategory: selectedVehicle?.name,
        vehicleType: selectedVehicle?.type,
        price: formatCurrency(selectedVehicle?.price || 0),
        flightNumber: isAirportTransfer() ? passengerInfo.flightNumber : null,
        plateName: passengerInfo.plateNameShow,
        luggageCount: passengerInfo.luggageCount,
        observations: passengerInfo.additionalInfo
      };

      // Enviar email automaticamente para a equipe via Netlify Function
      try {
        const response = await fetch('/.netlify/functions/send-reservation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reservationData,
            pdfData: pdfBase64
          })
        });

        if (response.ok) {
          console.log('✅ Email enviado com sucesso para a equipe!');
        } else {
          console.error('❌ Erro ao enviar email:', await response.text());
        }
      } catch (emailError) {
        console.error('❌ Erro ao enviar email:', emailError);
        console.log('📧 Verifique se o Netlify Functions está configurado corretamente');
        // Continua mesmo se o email falhar
      }
      
      // Criar mensagem para WhatsApp
      const message = `🚗 *NOVA RESERVA - EXECUTIVE PREMIUM*

📋 *DADOS DA VIAGEM:*
• Data: ${formatDateDisplay(quoteData?.date || "")}
• Horário: ${formatTimeDisplay(quoteData?.time || "")}
• Origem: ${quoteData?.pickup}
• Destino: ${quoteData?.destination}
• Distância: ${location.state?.calculatedDistance ? Math.round(location.state.calculatedDistance) : 25} KM

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
📄 *IMPORTANTE:* Um arquivo PDF foi baixado automaticamente com todos os detalhes da reserva.
👆 *Por favor, anexe o arquivo PDF "${fileName}" nesta conversa.*
📧 *A equipe da Executive Premium já foi notificada automaticamente por email via Netlify Functions.*
📎 *O PDF foi enviado automaticamente para gabriel.gbllima10@gmail.com*

Reserva feita através do site Executive Premium`;

      // Número do WhatsApp da Executive Premium
      const whatsappNumber = "5511940429351";
      
      // Criar URL do WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      // Aguardar um pouco para garantir que o download iniciou, então abrir WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);
      
      // Mostrar alerta para o usuário
      alert('✅ PDF baixado com sucesso!\n📧 Equipe notificada por email automaticamente via Netlify Functions!\n📎 PDF enviado automaticamente para gabriel.gbllima10@gmail.com\n🚀 Agora você será redirecionado para o WhatsApp.\n\nNão se esqueça de anexar o arquivo PDF baixado na conversa.');
      
    } catch (error) {
      console.error('❌ Erro ao processar reserva:', error);
      alert('❌ Erro ao processar reserva. Por favor, tente novamente.');
    }
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
          <h1 className="text-2xl font-bold mb-4">{t('passenger.dataNotFound')}</h1>
          <p className="text-gray-600 mb-6">
            {t('passenger.newQuote')}
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            {t('passenger.backHome')}
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
                  {t('passenger.class')} <span className="text-blue-600">{selectedVehicle.name.toUpperCase()}</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">{t('passenger.pickup')}</div>
                    <div className="text-sm font-bold text-gray-900">
                      {formatDateDisplay(quoteData.date)}, {formatTimeDisplay(quoteData.time)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Distância: {location.state?.calculatedDistance ? Math.round(location.state.calculatedDistance) : 25} KM</div>
                  </div>
                </div>
              </div>

              {/* Right: Vehicle and Route Details */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  {t('passenger.vehicle')} <span className="text-blue-600">{selectedVehicle.type.toUpperCase()}</span>
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-medium text-gray-600">{t('passenger.from')}</div>
                    <div className="text-sm font-bold text-gray-900">{quoteData.pickup}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">{t('passenger.to')}</div>
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
            <h3 className="text-lg font-bold text-gray-900 mb-6">{t('passenger.tripFor')}</h3>
            
            {/* Reserve For */}
            <div className="mb-6">
              <RadioGroup 
                value={passengerInfo.reserveFor} 
                onValueChange={(value) => setPassengerInfo({...passengerInfo, reserveFor: value})}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="para-mim" id="para-mim" />
                  <Label htmlFor="para-mim">{t('passenger.forMe')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="para-outro" id="para-outro" />
                  <Label htmlFor="para-outro">{t('passenger.forOther')}</Label>
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
                        {t('passenger.flightNumber')} *
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
                      {t('passenger.fullName')} *
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
                      {t('passenger.plateName')}
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
                      {t('passenger.phone')} *
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
                      {t('passenger.email')} *
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
              {/* Explicação do processo */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Como funciona a finalização:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Um PDF será gerado automaticamente com todos os detalhes</li>
                      <li>• O arquivo será baixado no seu computador</li>
                      <li>• 📧 A equipe da Executive Premium será notificada automaticamente por email</li>
                      <li>• 📎 O PDF será enviado automaticamente para a equipe via Netlify Functions</li>
                      <li>• Você será redirecionado para o WhatsApp da Executive Premium</li>
                      <li>• Anexe o PDF baixado na conversa para confirmar a reserva</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Status do email */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">
                    <strong>Email automático:</strong> gabriel.gbllima10@gmail.com será notificado da reserva
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium group"
              >
                <div className="flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Gerar PDF e Finalizar via WhatsApp
                </div>
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