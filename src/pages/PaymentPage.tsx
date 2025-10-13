import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/hooks/useCurrency';
import { useIsMobile } from '@/hooks/use-mobile';
import { createPaymentLink, checkPaymentStatus, formatCpfForApi, formatPhoneForApi, isPaymentApproved } from '@/services/infinitePayService';
import { toast } from 'sonner';
import { CreditCard, Lock, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface PaymentData {
  vehicleName: string;
  price: number;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  customerData?: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const isMobile = useIsMobile();
  
  const paymentData: PaymentData = location.state || {};
  
  // Usar dados recebidos diretamente (já vem com valor correto do PaymentTest)
  const finalPaymentData = paymentData;
  
  const [customerData, setCustomerData] = useState({
    name: finalPaymentData.customerData?.name || '',
    cpf: '',
    phone: finalPaymentData.customerData?.phone || '',
    email: finalPaymentData.customerData?.email || '',
    installments: 1
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [orderNsu, setOrderNsu] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'pending' | 'approved' | 'failed'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Verificar se os dados de pagamento foram fornecidos
  useEffect(() => {
    if (!finalPaymentData.vehicleName || !finalPaymentData.price) {
      toast.error('Dados de pagamento não encontrados');
      navigate('/');
    }
  }, [finalPaymentData, navigate]);

  // Validar campos
  const validateFields = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!customerData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!customerData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (customerData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }
    
    if (!customerData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (customerData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido';
    }
    
    if (!customerData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Processar pagamento
  const handlePayment = async () => {
    if (!validateFields()) {
      toast.error('Por favor, corrija os campos destacados');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      const paymentRequest = {
        name: customerData.name,
        cpf: formatCpfForApi(customerData.cpf),
        phone: formatPhoneForApi(customerData.phone),
        email: customerData.email,
        amount_cents: Math.round(finalPaymentData.price * 100),
        installments: customerData.installments
      };

      console.log('🔄 Criando link de pagamento...', paymentRequest);
      
      const response = await createPaymentLink(paymentRequest);
      
      if (response.ok && response.url && response.order_nsu) {
        setPaymentUrl(response.url);
        setOrderNsu(response.order_nsu);
        setPaymentStatus('pending');
        
        toast.success('Link de pagamento criado com sucesso!');
        
        // Abrir link de pagamento - sempre em nova aba/janela
        if (isMobile) {
          // No mobile, forçar abertura em nova aba
          const newWindow = window.open(response.url, '_blank', 'noopener,noreferrer');
          
          // Verificar se conseguiu abrir
          if (newWindow) {
            toast.success('Redirecionando para o pagamento...');
          } else {
            // Se não conseguiu abrir nova aba, mostrar aviso
            toast.error('Pop-ups bloqueados. Clique no link abaixo para pagar.');
            // Criar um link clicável como fallback
            const linkElement = document.createElement('a');
            linkElement.href = response.url;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.textContent = 'Clique aqui para pagar';
            linkElement.style.cssText = 'color: blue; text-decoration: underline; font-weight: bold;';
            
            // Adicionar o link na tela
            const statusDiv = document.querySelector('.payment-status-container');
            if (statusDiv) {
              statusDiv.appendChild(linkElement);
            }
          }
        } else {
          // No desktop, abrir em nova aba
          window.open(response.url, '_blank');
        }
        
        // Iniciar verificação de status
        startPaymentStatusCheck(response.order_nsu);
      } else {
        throw new Error(response.message || 'Erro ao criar link de pagamento');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setPaymentStatus('failed');
      toast.error('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Verificar status do pagamento periodicamente
  const startPaymentStatusCheck = (nsu: string) => {
    const checkInterval = setInterval(async () => {
      try {
        const statusResponse = await checkPaymentStatus(nsu);
        
        if (isPaymentApproved(statusResponse)) {
          setPaymentStatus('approved');
          clearInterval(checkInterval);
          toast.success('Pagamento aprovado com sucesso!');
          
          // Redirecionar para página de sucesso após 2 segundos
          setTimeout(() => {
            navigate('/payment-success', { 
              state: { 
                ...finalPaymentData, 
                paymentDetails: statusResponse,
                customerData 
              } 
            });
          }, 2000);
        } else if (statusResponse.error === 'API_TEMPORARILY_UNAVAILABLE' || statusResponse.error === 'VERIFICATION_FAILED') {
          // API indisponível - continua tentando sem mostrar erro
          console.warn('⚠️ API de verificação temporariamente indisponível. Continuando verificação...');
        } else if (statusResponse.error && statusResponse.error !== 'PROVIDER_HTTP_404') {
          // Outros erros que indicam falha real do pagamento
          setPaymentStatus('failed');
          clearInterval(checkInterval);
          toast.error('Pagamento falhou. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
        // Não para a verificação por causa de erros de rede temporários
      }
    }, 5000); // Verificar a cada 5 segundos

    // Parar verificação após 10 minutos
    setTimeout(() => {
      clearInterval(checkInterval);
      if (paymentStatus === 'pending') {
        toast.warning('Tempo limite para verificação automática. Você pode verificar manualmente.');
      }
    }, 600000);
  };

  // Verificar status manualmente
  const handleManualStatusCheck = async () => {
    if (!orderNsu) return;

    try {
      const statusResponse = await checkPaymentStatus({ order_nsu: orderNsu });
      
      if (isPaymentApproved(statusResponse)) {
        setPaymentStatus('approved');
        toast.success('Pagamento aprovado com sucesso!');
        
        setTimeout(() => {
          navigate('/payment-success', { 
            state: { 
              ...paymentData, 
              paymentDetails: statusResponse,
              customerData 
            } 
          });
        }, 1000);
      } else {
        toast.info('Pagamento ainda pendente. Aguarde ou tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      toast.error('Erro ao verificar status do pagamento');
    }
  };

  // Funções de formatação para interface do usuário
  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return numbers.slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return numbers.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  // Formatação de campos
  const handleCPFChange = (value: string) => {
    setCustomerData(prev => ({ ...prev, cpf: formatCPF(value) }));
    if (errors.cpf) setErrors(prev => ({ ...prev, cpf: '' }));
  };

  const handlePhoneChange = (value: string) => {
    setCustomerData(prev => ({ ...prev, phone: formatPhone(value) }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  if (!finalPaymentData.vehicleName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Dados não encontrados</h1>
            <p className="text-gray-600 mb-6">
              Não foi possível encontrar os dados da reserva.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Voltar ao início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Logo da Executive no fundo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src="/Logos/Logo Letras.webp" 
          alt="Executive Background Logo" 
          className="w-96 h-auto"
        />
      </div>
      
      <Navbar showBreadcrumb={true} currentStep={3} />
      
      <div className="max-w-2xl mx-auto px-6 py-8 relative z-10">
        <Card className="shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Finalizar Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Total destacado */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total da viagem</p>
                <p className="text-3xl font-bold text-green-600">{formatPrice(finalPaymentData.price)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {finalPaymentData.vehicleName} • {finalPaymentData.passengers} passageiro(s)
                </p>
              </div>
            </div>

            {paymentStatus === 'idle' && (
              <>
                {/* Dados do cliente - Layout simplificado */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Dados para Pagamento</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) => {
                          setCustomerData(prev => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        placeholder="Seu nome completo"
                        className={`${errors.name ? 'border-red-400' : ''}`}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="cpf" className="text-gray-700">CPF *</Label>
                      <Input
                        id="cpf"
                        value={customerData.cpf}
                        onChange={(e) => handleCPFChange(e.target.value)}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className={`${errors.cpf ? 'border-red-400' : ''}`}
                      />
                      {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700">Telefone *</Label>
                      <Input
                        id="phone"
                        value={customerData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        className={`${errors.phone ? 'border-red-400' : ''}`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerData.email}
                        onChange={(e) => {
                          setCustomerData(prev => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        placeholder="seu@email.com"
                        className={`${errors.email ? 'border-red-400' : ''}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="max-w-xs">
                    <Label htmlFor="installments" className="text-gray-700">Parcelas</Label>
                    <select
                      id="installments"
                      value={customerData.installments}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, installments: parseInt(e.target.value) }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1}>À vista</option>
                      <option value={2}>2x</option>
                      <option value={3}>3x</option>
                      <option value={4}>4x</option>
                      <option value={5}>5x</option>
                      <option value={6}>6x</option>
                    </select>
                  </div>
                </div>

                {/* Botão de pagamento - Mais proeminente */}
                <div className="mt-6">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processando...
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        🔒 Pagar {formatPrice(finalPaymentData.price)} Agora
                      </span>
                    )}
                  </button>
                  
                  {/* Informação de segurança compacta */}
                  <p className="text-center text-sm text-gray-600 mt-2">
                    🔐 Pagamento 100% seguro via InfinitePay
                  </p>
                </div>
              </>
            )}

            {/* Status do pagamento */}
            {paymentStatus === 'processing' && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">Processando pagamento...</p>
              </div>
            )}

            {paymentStatus === 'pending' && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg payment-status-container">
                <p className="text-blue-800">Aguardando confirmação do pagamento...</p>
              </div>
            )}

            {paymentStatus === 'approved' && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Pagamento Aprovado!</h3>
                <p className="text-gray-600">
                  Seu pagamento foi processado com sucesso. Redirecionando...
                </p>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-lg font-semibold mb-2">Erro no Pagamento</h3>
                <p className="text-gray-600 mb-4">
                  Ocorreu um erro ao processar seu pagamento. Tente novamente.
                </p>
                <Button
                  onClick={() => setPaymentStatus('idle')}
                  className="w-full"
                >
                  Tentar Novamente
                </Button>
              </div>
            )}


          </CardContent>
        </Card>
      </div>
    </div>
  );
}