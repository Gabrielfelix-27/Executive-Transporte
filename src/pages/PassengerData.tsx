import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/hooks/useCurrency';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Plane, Bus, Luggage, FileText, Download } from 'lucide-react';
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
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

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

  // Estados para controlar o fluxo de finalização
  const [currentStep, setCurrentStep] = useState<'form' | 'confirmation' | 'thanks'>('form');
  const [actionTaken, setActionTaken] = useState<'pdf' | 'whatsapp' | 'both' | null>(null);
  const [generatedPDF, setGeneratedPDF] = useState<jsPDF | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'warning' | 'error'>('idle');
  const [emailMessage, setEmailMessage] = useState<string>('');

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
  const generatePDF = (isPaid: boolean = false, paymentDetails?: any) => {
    const doc = new jsPDF();
    
    // Configurações de página
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Configurar fonte
    doc.setFont('helvetica');
    
    // Cabeçalho com fundo elegante (verde se pago, preto se cotação)
    if (isPaid) {
      doc.setFillColor(34, 197, 94); // Verde para pagamento aprovado
    } else {
      doc.setFillColor(0, 0, 0); // Preto para cotação
    }
    doc.rect(0, 0, pageWidth, 55, 'F');
    
    // Logo e texto do cabeçalho (em branco sobre fundo colorido)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('EXECUTIVE PREMIUM', margin, 25);
    doc.setFontSize(12);
    doc.text('Transporte Executivo de Alto Padrão', margin, 35);
    doc.text('Telefone: (11) 91585-3292', margin, 45);
    
    // Status do pagamento no cabeçalho
    if (isPaid) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const statusText = '✅ PAGAMENTO APROVADO';
      const statusWidth = doc.getTextWidth(statusText);
      doc.text(statusText, pageWidth - margin - statusWidth, 25);
    }
    
    // Data e hora da geração
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Posicionar data no canto direito do cabeçalho
    const dateText = `Gerado em: ${dateStr} às ${timeStr}`;
    const dateTextWidth = doc.getTextWidth(dateText);
    doc.text(dateText, pageWidth - margin - dateTextWidth, isPaid ? 40 : 35);
    
    // Voltar para texto preto
    doc.setTextColor(0, 0, 0);
    
    // Título do documento
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    let yPosition = 75;
    const documentTitle = isPaid ? 'COMPROVANTE DE PAGAMENTO' : 'CONFIRMAÇÃO DE RESERVA';
    doc.text(documentTitle, margin, yPosition);
    
    // Número da reserva
    yPosition += 15;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const reserveNumber = paymentDetails?.order_nsu || `EP${Date.now().toString().slice(-6)}`;
    const reserveLabel = isPaid ? 'NSU do Pagamento:' : 'Número da Reserva:';
    doc.text(`${reserveLabel} ${reserveNumber}`, margin, yPosition);
    
    // Função auxiliar para adicionar seção
    const addSection = (title: string, items: { label: string; value: string }[]) => {
      yPosition += 20;
      
      // Verificar se precisa de nova página
      if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = 30;
      }
      
      // Título da seção
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(title, margin, yPosition);
      
      // Items da seção
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      items.forEach(item => {
        if (!item.value || item.value === 'null' || item.value === 'undefined') return;
        
        yPosition += 8;
        
        // Verificar se precisa de nova página
        if (yPosition > pageHeight - 50) {
          doc.addPage();
          yPosition = 30;
        }
        
        // Quebrar texto longo se necessário
        const fullText = `${item.label}: ${item.value}`;
        const textWidth = doc.getTextWidth(fullText);
        
        if (textWidth > contentWidth) {
          // Quebrar texto em múltiplas linhas
          const lines = doc.splitTextToSize(fullText, contentWidth);
          lines.forEach((line: string, index: number) => {
            if (index > 0) yPosition += 6; // Espaçamento menor entre linhas quebradas
            doc.text(line, margin + 5, yPosition);
          });
        } else {
          doc.text(fullText, margin + 5, yPosition);
        }
      });
    };
    
    // Dados da Viagem
    addSection('DADOS DA VIAGEM', [
      { label: 'Data', value: formatDateDisplay(quoteData?.date || "") },
      { label: 'Horário', value: formatTimeDisplay(quoteData?.time || "") },
      { label: 'Origem', value: quoteData?.pickup || 'Não informado' },
      { label: 'Destino', value: quoteData?.destination || 'Não informado' },
      { label: 'Distância', value: `${location.state?.calculatedDistance ? Math.round(location.state.calculatedDistance) : 25} KM` }
    ]);
    
    // Veículo Selecionado
    const vehicleSection = [
      { label: 'Categoria', value: selectedVehicle?.name || 'Não informado' },
      { label: 'Tipo', value: selectedVehicle?.type || 'Não informado' },
      { label: 'Valor Total', value: formatPrice(selectedVehicle?.price || 0) }
    ];
    
    // Adicionar informações de pagamento se foi pago
    if (isPaid && paymentDetails) {
      vehicleSection.push(
        { label: 'Status do Pagamento', value: '✅ PAGO' },
        { label: 'Valor Pago', value: formatPrice(paymentDetails.paid_amount_cents / 100) },
        { label: 'Parcelas', value: `${paymentDetails.installments}x` },
        { label: 'Método', value: paymentDetails.capture_method || 'Cartão de Crédito' }
      );
    }
    
    addSection(isPaid ? 'VEÍCULO E PAGAMENTO' : 'VEÍCULO SELECIONADO', vehicleSection);
    
    // Dados do Passageiro
    addSection('DADOS DO PASSAGEIRO', [
      { label: 'Nome', value: passengerInfo.passengerName },
      { label: 'Telefone', value: passengerInfo.phoneNumber },
      { label: 'Email', value: passengerInfo.email },
      { label: 'Reserva', value: passengerInfo.reserveFor === 'para-mim' ? 'Para mim' : 'Para outra pessoa' }
    ]);
    
    // Detalhes do Voo (se aplicável)
    if (isAirportTransfer() && passengerInfo.flightNumber) {
      addSection('DETALHES DO VOO', [
        { label: 'Número do voo', value: passengerInfo.flightNumber }
      ]);
    }
    
    // Detalhes do Terminal (se aplicável)
    if (isBusStationTransfer() && passengerInfo.additionalInfo) {
      addSection('DETALHES DO TERMINAL', [
        { label: 'Informações', value: passengerInfo.additionalInfo }
      ]);
    }
    
    // Detalhes Adicionais
    const additionalDetails = [
      { label: 'Número de malas', value: passengerInfo.luggageCount.toString() }
    ];
    
    if (passengerInfo.plateNameShow) {
      additionalDetails.unshift({ label: 'Nome na placa', value: passengerInfo.plateNameShow });
    }
    
    addSection('DETALHES ADICIONAIS', additionalDetails);
    
    // Observações (se houver)
    if (passengerInfo.additionalInfo && !isBusStationTransfer()) {
      addSection('OBSERVAÇÕES', [
        { label: 'Comentários', value: passengerInfo.additionalInfo }
      ]);
    }
    
    // Rodapé
    yPosition += 30;
    
    // Verificar se há espaço para o rodapé
    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = pageHeight - 40;
    } else {
      yPosition = pageHeight - 40;
    }
    
    // Fundo cinza do rodapé
    doc.setFillColor(240, 240, 240);
    doc.rect(0, yPosition - 10, pageWidth, 40, 'F');
    
    // Texto do rodapé
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Executive Premium - Transporte Executivo de Alto Padrão', margin, yPosition);
    
    const footerMiddleText = isPaid ? 'Comprovante de pagamento gerado automaticamente' : 'Reserva gerada automaticamente pelo sistema';
    doc.text(footerMiddleText, margin, yPosition + 8);
    doc.text('Para dúvidas, entre em contato: (11) 91585-3292', margin, yPosition + 16);
    
    // Texto de direita do rodapé
    const footerRightText = 'www.executivepremium.com.br';
    const footerRightWidth = doc.getTextWidth(footerRightText);
    doc.text(footerRightText, pageWidth - margin - footerRightWidth, yPosition + 8);
    
    return doc;
  };

  const handleSubmit = async () => {
    try {
      console.log('📋 Dados do passageiro preenchidos, avançando para confirmação');
      
      // Rolar para o topo da página antes de avançar
      window.scrollTo(0, 0);
      
      // Avançar para tela de confirmação
      setCurrentStep('confirmation');
      
    } catch (error) {
      console.error('❌ Erro ao processar dados:', error);
    }
  };

  // Função para baixar PDF
  const handleDownloadPDF = () => {
    if (generatedPDF) {
      const fileName = `Executive_Premium_Reserva_${passengerInfo.passengerName.replace(/\s+/g, '_')}.pdf`;
      generatedPDF.save(fileName);
      setActionTaken(actionTaken === 'whatsapp' ? 'both' : 'pdf');
    }
  };
  
  // Função para baixar PDF de pagamento (será chamada da PaymentSuccess)
  const generatePaidPDF = (paymentDetails: any, customerData: any) => {
    const paidDoc = generatePDF(true, paymentDetails);
    const fileName = `Executive_Premium_PAGO_${customerData.name.replace(/\s+/g, '_')}.pdf`;
    paidDoc.save(fileName);
    return paidDoc;
  };

  // Função para redirecionar ao WhatsApp
  const handleWhatsAppRedirect = () => {
    const fileName = `Executive_Premium_Reserva_${passengerInfo.passengerName.replace(/\s+/g, '_')}.pdf`;
    
    // Criar mensagem para WhatsApp
    const message = `● *NOVA RESERVA - EXECUTIVE PREMIUM*

● *DADOS DA VIAGEM:*
• Data: ${formatDateDisplay(quoteData?.date || "")}
• Horário: ${formatTimeDisplay(quoteData?.time || "")}
• Origem: ${quoteData?.pickup}
• Destino: ${quoteData?.destination}
• Distância: ${location.state?.calculatedDistance ? Math.round(location.state.calculatedDistance) : 25} KM

● *VEÍCULO SELECIONADO:*
• Categoria: ${selectedVehicle?.name}
• Tipo: ${selectedVehicle?.type}
• Valor: ${formatPrice(selectedVehicle?.price || 0)}

● *DADOS DO PASSAGEIRO:*
• Nome: ${passengerInfo.passengerName}
• Telefone: ${passengerInfo.phoneNumber}
• Email: ${passengerInfo.email}
• Reserva: ${passengerInfo.reserveFor === 'para-mim' ? 'Para mim' : 'Para outra pessoa'}

${isAirportTransfer() ? `● *DETALHES DO VOO:*
• Número do voo: ${passengerInfo.flightNumber}` : ''}

${isBusStationTransfer() ? `● *DETALHES DO TERMINAL:*
• Informações adicionais: ${passengerInfo.additionalInfo}` : ''}

● *DETALHES ADICIONAIS:*
• Nome na placa: ${passengerInfo.plateNameShow}
• Número de malas: ${passengerInfo.luggageCount}

${passengerInfo.additionalInfo ? `● *OBSERVAÇÕES:*
${passengerInfo.additionalInfo}` : ''}

---
● *Para finalizar a reserva, anexe o arquivo PDF "${fileName}" nesta conversa.*

Reserva feita através do site Executive Premium`;

    // Número do WhatsApp da Executive Premium
    const whatsappNumber = "5511915853292";
    
    // Criar URL do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setActionTaken(actionTaken === 'pdf' ? 'both' : 'whatsapp');
  };

  // Função para redirecionar ao pagamento
  const handlePaymentRedirect = () => {
    navigate('/payment', {
      state: {
        vehicleName: selectedVehicle?.name,
        price: selectedVehicle?.price,
        pickup: quoteData?.pickup,
        destination: quoteData?.destination,
        date: quoteData?.date,
        time: quoteData?.time,
        passengers: quoteData?.passengers,
        customerData: {
          name: passengerInfo.passengerName,
          phone: passengerInfo.phoneNumber,
          email: passengerInfo.email
        }
      }
    });
  };

  // Função para concluir atendimento
  const handleCompleteService = () => {
    // Rolar para o topo da página
    window.scrollTo(0, 0);
    
    setCurrentStep('thanks');
    
    // Redirecionar para página inicial após 3 segundos
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate('/');
    }, 3000);
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
          <Button onClick={() => {
            window.scrollTo(0, 0);
            navigate('/');
          }} className="w-full">
            {t('passenger.backHome')}
          </Button>
        </div>
      </div>
    );
  }

  // Renderizar tela de confirmação
  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar showBreadcrumb={true} currentStep={2} />
        <div className="max-w-2xl mx-auto px-6 py-8 pt-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Dados preenchidos com sucesso!
              </h1>
              
              <p className="text-gray-600 mb-8">
                Agora você pode pagar diretamente ou fazer uma nova cotação.
              </p>
              
              <div className="space-y-4">
                {/* Botão de Pagamento */}
                <Button 
                  onClick={handlePaymentRedirect}
                  className="w-full py-4 text-lg font-medium bg-black hover:bg-gray-800 text-white"
                >
                  <div className="flex items-center justify-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    Pagar Agora
                  </div>
                </Button>

                {/* Botão Nova Cotação */}
                <Button 
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/');
                  }}
                  variant="outline"
                  className="w-full py-4 text-lg font-medium"
                >
                  <div className="flex items-center justify-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Realizar Nova Cotação
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }



  // Renderizar tela de agradecimento
  if (currentStep === 'thanks') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar showBreadcrumb={true} currentStep={2} />
        <div className="max-w-2xl mx-auto px-6 py-8 pt-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/Logos/Logo solo.webp" 
                  alt="Executive Transporte Premium" 
                  className="w-12 h-12 object-contain filter brightness-0 invert"
                />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t('passenger.thankYou')}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {t('passenger.quoteConcluded')}
              </p>
              
              <p className="text-gray-500 mb-8">
                {t('passenger.redirecting')}
              </p>
              
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Comum */}
      <Navbar showBreadcrumb={true} currentStep={2} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 pt-8">
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
                    <div className="text-sm text-gray-600 mt-1">{t('trip.distance')}: {location.state?.calculatedDistance ? Math.round(location.state.calculatedDistance) : 25} KM</div>
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
                <h4 className="font-bold text-gray-900">{t('passenger.additionalInfo')}</h4>
                <button className="text-gray-400">▲</button>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                {t('passenger.additionalInfoDesc')}
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
                        placeholder={t('placeholder.flightNumber')}
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
                        {t('passenger.terminalInfo')}
                      </Label>
                      <Input
                        placeholder={t('placeholder.terminalInfo')}
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
                      {t('passenger.luggageCount')}
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
                      placeholder={t('placeholder.fullName')}
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
                      placeholder={t('placeholder.email')}
                      className="bg-gray-100"
                      value={passengerInfo.email}
                      onChange={(e) => setPassengerInfo({...passengerInfo, email: e.target.value})}
                      required
                    />
                  </div>

                  {/* Additional Observations */}
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">
                      {t('passenger.additionalObservations')}
                    </Label>
                    <Textarea
                      placeholder={t('placeholder.observations')}
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
                    <h4 className="font-medium text-blue-900 mb-1">{t('passenger.howItWorks')}</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• {t('passenger.pdfGenerated')}</li>
                      <li>• {t('passenger.fileDownloaded')}</li>
                      <li>• {t('passenger.whatsappRedirect')}</li>
                      <li>• {t('form.attachPdf')}</li>
                    </ul>
                  </div>
                </div>
              </div>
              

              
              <Button 
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium group"
              >
                <div className="flex items-center justify-center">
                  <FileText className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  {t('passenger.finalizeReservation')}
                </div>
              </Button>
              
              {!isFormValid() && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  {t('passenger.fillRequiredFields')}
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