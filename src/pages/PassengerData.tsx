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
    doc.text(`Valor: ${formatPrice(selectedVehicle?.price || 0)}`, 25, yPosition);
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
      
      // Salvar PDF no estado para uso posterior
      setGeneratedPDF(doc);
      
      // Converter PDF para base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      
      // Preparar dados para envio via Vercel API
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
        price: formatPrice(selectedVehicle?.price || 0),
        flightNumber: isAirportTransfer() ? passengerInfo.flightNumber : null,
        plateName: passengerInfo.plateNameShow,
        luggageCount: passengerInfo.luggageCount,
        observations: passengerInfo.additionalInfo
      };

      // Enviar email automaticamente para a equipe via Vercel API
      try {
        const response = await fetch('/api/send-reservation-email', {
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
        console.log('● Verifique se a Vercel API está configurada corretamente');
        // Continua mesmo se o email falhar
      }
      
      // Avançar para tela de confirmação
      setCurrentStep('confirmation');
      
    } catch (error) {
      console.error('❌ Erro ao processar reserva:', error);
      alert('❌ Erro ao processar reserva. Por favor, tente novamente.');
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
    const whatsappNumber = "5511940429351";
    
    // Criar URL do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setActionTaken(actionTaken === 'pdf' ? 'both' : 'whatsapp');
  };

  // Função para concluir atendimento
  const handleCompleteService = () => {
    setCurrentStep('thanks');
    
    // Redirecionar para página inicial após 3 segundos
    setTimeout(() => {
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
          <Button onClick={() => navigate('/')} className="w-full">
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
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Reserva concluída com sucesso!
              </h1>
              
              <p className="text-gray-600 mb-8">
                Sua reserva foi processada com sucesso!
                Escolha uma das opções abaixo para continuar:
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleDownloadPDF}
                  disabled={actionTaken === 'pdf' || actionTaken === 'both'}
                  className={`w-full py-4 text-lg font-medium group transition-all ${
                    actionTaken === 'pdf' || actionTaken === 'both' 
                      ? 'bg-green-600 text-white cursor-default' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {actionTaken === 'pdf' || actionTaken === 'both' ? (
                      <>
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        PDF baixado com sucesso!
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                        Baixar orçamento em PDF
                      </>
                    )}
                  </div>
                </Button>
                
                <Button 
                  onClick={handleWhatsAppRedirect}
                  disabled={actionTaken === 'whatsapp' || actionTaken === 'both'}
                  className={`w-full py-4 text-lg font-medium group transition-all ${
                    actionTaken === 'whatsapp' || actionTaken === 'both' 
                      ? 'bg-green-600 text-white cursor-default' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {actionTaken === 'whatsapp' || actionTaken === 'both' ? (
                      <>
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        WhatsApp aberto com sucesso!
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.686"/>
                        </svg>
                        Falar com atendente para adiantar o atendimento
                      </>
                    )}
                  </div>
                </Button>

                {/* Botão Concluir Atendimento - aparece apenas após usar uma das opções */}
                {actionTaken && (
                  <Button 
                    onClick={handleCompleteService}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg font-medium mt-6"
                  >
                    Concluir atendimento
                  </Button>
                )}
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
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Obrigado!
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                Seu orçamento foi concluído com sucesso.
              </p>
              
              <p className="text-gray-500 mb-8">
                Redirecionando para a página inicial em alguns segundos...
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
                      <li>• O arquivo será baixado em seu dispositivo</li>
                      <li>• Você será redirecionado para o WhatsApp da Executive Premium</li>
                      <li>• Anexe o PDF baixado na conversa para confirmar a reserva</li>
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
                  Finalizar reserva
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