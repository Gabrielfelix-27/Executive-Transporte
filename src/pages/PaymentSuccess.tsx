import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/hooks/useCurrency';
import { CheckCircle, Download, MessageCircle, Calendar, MapPin, User, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

interface PaymentSuccessData {
  vehicleName: string;
  price: number;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  paymentDetails: any;
  customerData: {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    installments: number;
  };
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  
  const successData: PaymentSuccessData = location.state || {};

  // Executar ações pós-pagamento
  useEffect(() => {
    if (successData && successData.paymentDetails) {
      // Enviar email de confirmação automaticamente
      sendPaymentConfirmationEmail();
    }
  }, [successData]);

  useEffect(() => {
    if (!successData.vehicleName || !successData.paymentDetails) {
      navigate('/');
    }
  }, [successData, navigate]);

  // Gerar PDF da reserva paga
  const handleDownloadReceipt = () => {
    // Gerar PDF personalizado com informações de pagamento
    const doc = new jsPDF();
    
    // Configurações de página
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    
    // Configurar fonte
    doc.setFont('helvetica');
    
    // Cabeçalho com fundo verde (pagamento aprovado)
    doc.setFillColor(34, 197, 94);
    doc.rect(0, 0, pageWidth, 55, 'F');
    
    // Logo e texto do cabeçalho
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('EXECUTIVE PREMIUM', margin, 25);
    doc.setFontSize(12);
    doc.text('Transporte Executivo de Alto Padrão', margin, 35);
    doc.text('Telefone: (11) 91585-3292', margin, 45);
    
    // Status do pagamento no cabeçalho
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const statusText = '✅ PAGAMENTO APROVADO';
    const statusWidth = doc.getTextWidth(statusText);
    doc.text(statusText, pageWidth - margin - statusWidth, 25);
    
    // Data e hora da geração
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const dateText = `Gerado em: ${dateStr} às ${timeStr}`;
    const dateTextWidth = doc.getTextWidth(dateText);
    doc.text(dateText, pageWidth - margin - dateTextWidth, 40);
    
    // Voltar para texto preto
    doc.setTextColor(0, 0, 0);
    
    // Título do documento
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    let yPosition = 75;
    doc.text('COMPROVANTE DE PAGAMENTO', margin, yPosition);
    
    // NSU do pagamento
    yPosition += 15;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`NSU do Pagamento: ${successData.paymentDetails?.order_nsu}`, margin, yPosition);
    
    // Função auxiliar para adicionar seção
    const addSection = (title: string, items: { label: string; value: string }[]) => {
      yPosition += 20;
      
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
        doc.text(`${item.label}: ${item.value}`, margin + 5, yPosition);
      });
    };
    
    // Dados da Viagem
    addSection('DADOS DA VIAGEM', [
      { label: 'Data', value: successData.date },
      { label: 'Horário', value: successData.time },
      { label: 'Origem', value: successData.pickup },
      { label: 'Destino', value: successData.destination },
      { label: 'Passageiros', value: successData.passengers.toString() }
    ]);
    
    // Veículo e Pagamento
    addSection('VEÍCULO E PAGAMENTO', [
      { label: 'Veículo', value: successData.vehicleName },
      { label: 'Status do Pagamento', value: '✅ PAGO' },
      { label: 'Valor Pago', value: formatPrice(successData.paymentDetails?.paid_amount_cents / 100 || successData.price) },
      { label: 'Parcelas', value: `${successData.paymentDetails?.installments || 1}x` },
      { label: 'Método', value: successData.paymentDetails?.capture_method || 'Cartão de Crédito' }
    ]);
    
    // Dados do Cliente
    addSection('DADOS DO CLIENTE', [
      { label: 'Nome', value: successData.customerData?.name },
      { label: 'CPF', value: successData.customerData?.cpf },
      { label: 'Telefone', value: successData.customerData?.phone },
      { label: 'E-mail', value: successData.customerData?.email }
    ]);
    
    // Rodapé
    yPosition = pageHeight - 40;
    
    // Fundo cinza do rodapé
    doc.setFillColor(240, 240, 240);
    doc.rect(0, yPosition - 10, pageWidth, 40, 'F');
    
    // Texto do rodapé
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Executive Premium - Transporte Executivo de Alto Padrão', margin, yPosition);
    doc.text('Comprovante de pagamento gerado automaticamente', margin, yPosition + 8);
    doc.text('Para dúvidas, entre em contato: (11) 91585-3292', margin, yPosition + 16);
    
    // Texto de direita do rodapé
    const footerRightText = 'www.executivepremium.com.br';
    const footerRightWidth = doc.getTextWidth(footerRightText);
    doc.text(footerRightText, pageWidth - margin - footerRightWidth, yPosition + 8);
    
    // Salvar PDF
    const fileName = `Executive_Premium_PAGO_${successData.customerData?.name.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
    
    toast.success('Comprovante de pagamento baixado com sucesso!');
  };

  // Enviar email de confirmação de pagamento
  const sendPaymentConfirmationEmail = async () => {
    try {
      console.log('📧 Enviando email de confirmação de pagamento...');
      
      // Gerar PDF de comprovante
      const doc = new jsPDF();
      
      // Configurações de página
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      
      // Configurar fonte
      doc.setFont('helvetica');
      
      // Cabeçalho com fundo verde (pagamento aprovado)
      doc.setFillColor(34, 197, 94);
      doc.rect(0, 0, pageWidth, 55, 'F');
      
      // Logo e texto do cabeçalho
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text('EXECUTIVE PREMIUM', margin, 25);
      doc.setFontSize(12);
      doc.text('Transporte Executivo de Alto Padrão', margin, 35);
      doc.text('Telefone: (11) 91585-3292', margin, 45);
      
      // Status do pagamento no cabeçalho
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const statusText = '✅ PAGAMENTO APROVADO';
      const statusWidth = doc.getTextWidth(statusText);
      doc.text(statusText, pageWidth - margin - statusWidth, 25);
      
      // Data e hora da geração
      const now = new Date();
      const dateStr = now.toLocaleDateString('pt-BR');
      const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      const dateText = `Gerado em: ${dateStr} às ${timeStr}`;
      const dateTextWidth = doc.getTextWidth(dateText);
      doc.text(dateText, pageWidth - margin - dateTextWidth, 40);
      
      // Voltar para texto preto
      doc.setTextColor(0, 0, 0);
      
      // Título do documento
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      let yPosition = 75;
      doc.text('COMPROVANTE DE PAGAMENTO', margin, yPosition);
      
      // NSU do pagamento
      yPosition += 15;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`NSU do Pagamento: ${successData.paymentDetails?.order_nsu}`, margin, yPosition);
      
      // Função auxiliar para adicionar seção
      const addSection = (title: string, items: { label: string; value: string }[]) => {
        yPosition += 20;
        
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
          doc.text(`${item.label}: ${item.value}`, margin + 5, yPosition);
        });
      };
      
      // Dados da Viagem
      addSection('DADOS DA VIAGEM', [
        { label: 'Data', value: successData.date },
        { label: 'Horário', value: successData.time },
        { label: 'Origem', value: successData.pickup },
        { label: 'Destino', value: successData.destination },
        { label: 'Passageiros', value: successData.passengers.toString() }
      ]);
      
      // Veículo e Pagamento
      addSection('VEÍCULO E PAGAMENTO', [
        { label: 'Veículo', value: successData.vehicleName },
        { label: 'Status do Pagamento', value: '✅ PAGO' },
        { label: 'Valor Pago', value: formatPrice(successData.paymentDetails?.paid_amount_cents / 100 || successData.price) },
        { label: 'Parcelas', value: `${successData.paymentDetails?.installments || 1}x` },
        { label: 'Método', value: successData.paymentDetails?.capture_method || 'Cartão de Crédito' }
      ]);
      
      // Dados do Cliente
      addSection('DADOS DO CLIENTE', [
        { label: 'Nome', value: successData.customerData?.name },
        { label: 'CPF', value: successData.customerData?.cpf },
        { label: 'Telefone', value: successData.customerData?.phone },
        { label: 'E-mail', value: successData.customerData?.email }
      ]);
      
      // Rodapé
      yPosition = pageHeight - 40;
      
      // Fundo cinza do rodapé
      doc.setFillColor(240, 240, 240);
      doc.rect(0, yPosition - 10, pageWidth, 40, 'F');
      
      // Texto do rodapé
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text('Executive Premium - Transporte Executivo de Alto Padrão', margin, yPosition);
      doc.text('Comprovante de pagamento gerado automaticamente', margin, yPosition + 8);
      doc.text('Para dúvidas, entre em contato: (11) 91585-3292', margin, yPosition + 16);
      
      // Texto de direita do rodapé
      const footerRightText = 'www.executivepremium.com.br';
      const footerRightWidth = doc.getTextWidth(footerRightText);
      doc.text(footerRightText, pageWidth - margin - footerRightWidth, yPosition + 8);
      
      // Converter PDF para base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      
      // Dados da reserva para o email
      const reservationData = {
        date: successData.date,
        time: successData.time,
        pickup: successData.pickup,
        destination: successData.destination,
        passengers: successData.passengers,
        vehicleName: successData.vehicleName,
        price: successData.price,
        customerData: successData.customerData,
        paymentDetails: successData.paymentDetails,
        isPaid: true
      };
      
      // Enviar email
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
        console.log('✅ Email de confirmação enviado com sucesso!');
        toast.success('Email de confirmação enviado!');
      } else {
        console.warn('⚠️ Falha no envio do email, mas pagamento foi processado');
        toast.info('Pagamento processado com sucesso! Email será enviado em breve.');
      }
      
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      toast.info('Pagamento processado com sucesso! Email será enviado em breve.');
    }
  };

  // Abrir WhatsApp para contato
  const handleContactWhatsApp = () => {
    const message = `🎉 *PAGAMENTO APROVADO - EXECUTIVE PREMIUM*

📋 *DADOS DA RESERVA:*
• Veículo: ${successData.vehicleName}
• Valor pago: ${formatPrice(successData.paymentDetails?.paid_amount_cents / 100 || successData.price)}
• Parcelas: ${successData.paymentDetails?.installments || 1}x
• Método: ${successData.paymentDetails?.capture_method || 'N/A'}

🚗 *DETALHES DA VIAGEM:*
• Origem: ${successData.pickup}
• Destino: ${successData.destination}
• Data: ${successData.date} às ${successData.time}
• Passageiros: ${successData.passengers}

👤 *DADOS DO CLIENTE:*
• Nome: ${successData.customerData?.name}
• CPF: ${successData.customerData?.cpf}
• Telefone: ${successData.customerData?.phone}
• E-mail: ${successData.customerData?.email}

💳 *PAGAMENTO:*
• NSU: ${successData.paymentDetails?.order_nsu}
• Status: APROVADO ✅

---
*Pagamento processado com sucesso! Aguardo confirmação da reserva.*`;

    const whatsappNumber = "5511915853292";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Voltar ao início
  const handleBackHome = () => {
    navigate('/');
  };

  if (!successData.vehicleName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
            <Button onClick={handleBackHome} className="w-full">
              Voltar ao início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showBreadcrumb={true} currentStep={3} />
      
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Pagamento Aprovado!
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Sua reserva foi paga com sucesso e está sendo processada.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Detalhes do pagamento */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Detalhes do Pagamento
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Valor Pago:</p>
                  <p className="font-semibold text-green-700">
                    {formatPrice(successData.paymentDetails?.paid_amount_cents / 100 || successData.price)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Parcelas:</p>
                  <p className="font-semibold">
                    {successData.paymentDetails?.installments || 1}x
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Método:</p>
                  <p className="font-semibold capitalize">
                    {successData.paymentDetails?.capture_method?.replace('_', ' ') || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">NSU:</p>
                  <p className="font-semibold text-xs">
                    {successData.paymentDetails?.order_nsu?.substring(0, 8)}...
                  </p>
                </div>
              </div>
            </div>

            {/* Resumo da reserva */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Resumo da Reserva
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 mt-0.5 text-gray-500" />
                  <div>
                    <p className="font-medium">{successData.vehicleName}</p>
                    <p className="text-gray-600">{successData.passengers} passageiro(s)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                  <div>
                    <p><strong>De:</strong> {successData.pickup}</p>
                    <p><strong>Para:</strong> {successData.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p>{successData.date} às {successData.time}</p>
                </div>
              </div>
            </div>

            {/* Dados do cliente */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-blue-800">Dados do Cliente</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <p><strong>Nome:</strong> {successData.customerData?.name}</p>
                <p><strong>CPF:</strong> {successData.customerData?.cpf}</p>
                <p><strong>Telefone:</strong> {successData.customerData?.phone}</p>
                <p><strong>E-mail:</strong> {successData.customerData?.email}</p>
              </div>
            </div>

            {/* Próximos passos */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Próximos Passos</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Sua reserva será confirmada pela equipe Executive Premium</li>
                <li>• Você receberá detalhes do motorista por WhatsApp</li>
                <li>• Guarde o comprovante de pagamento para referência</li>
                <li>• Em caso de dúvidas, entre em contato conosco</li>
              </ul>
            </div>

            {/* Ações */}
            <div className="space-y-3">
              <Button
                onClick={handleDownloadReceipt}
                variant="outline"
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar Comprovante
              </Button>
              
              <Button
                onClick={handleContactWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Confirmar Reserva via WhatsApp
              </Button>
              
              <Button
                onClick={handleBackHome}
                variant="outline"
                className="w-full"
              >
                Fazer Nova Reserva
              </Button>
            </div>

            {/* Informações de contato */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>Executive Premium - Transporte Executivo</p>
              <p>WhatsApp: (11) 91585-3292</p>
              <p>Em caso de dúvidas, entre em contato conosco</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}