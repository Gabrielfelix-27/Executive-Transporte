import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/hooks/useCurrency';
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
        
        // Abrir link de pagamento em nova aba
        window.open(response.url, '_blank');
        
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
    <div className="min-h-screen bg-gray-50">
      <Navbar showBreadcrumb={true} currentStep={3} />
      
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Finalizar Pagamento
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Resumo da reserva */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Resumo da Reserva</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Veículo:</strong> {finalPaymentData.vehicleName}</p>
                <p><strong>Origem:</strong> {finalPaymentData.pickup}</p>
                <p><strong>Destino:</strong> {finalPaymentData.destination}</p>
                <p><strong>Data:</strong> {finalPaymentData.date} às {finalPaymentData.time}</p>
                <p><strong>Passageiros:</strong> {finalPaymentData.passengers}</p>
                <p className="text-lg font-bold text-green-600">
                  <strong>Total: {formatPrice(finalPaymentData.price)}</strong>
                </p>
              </div>
            </div>

            {paymentStatus === 'idle' && (
              <>
                {/* Dados do cliente */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Dados para Pagamento</h3>
                  
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={customerData.name}
                      onChange={(e) => {
                        setCustomerData(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="Seu nome completo"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      value={customerData.cpf}
                      onChange={(e) => handleCPFChange(e.target.value)}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className={errors.cpf ? 'border-red-500' : ''}
                    />
                    {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={customerData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => {
                        setCustomerData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="seu@email.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="installments">Parcelas</Label>
                    <select
                      id="installments"
                      value={customerData.installments}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, installments: parseInt(e.target.value) }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
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

                {/* Botão de pagamento */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Pagar {formatPrice(finalPaymentData.price)}
                    </>
                  )}
                </Button>
              </>
            )}

            {/* Status do pagamento */}
            {paymentStatus === 'processing' && (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Processando Pagamento</h3>
                <p className="text-gray-600">Criando link de pagamento seguro...</p>
              </div>
            )}

            {paymentStatus === 'pending' && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-lg font-semibold mb-2">Aguardando Pagamento</h3>
                <p className="text-gray-600 mb-4">
                  O link de pagamento foi aberto em uma nova aba. Complete o pagamento e aguarde a confirmação.
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={handleManualStatusCheck}
                    variant="outline"
                    className="w-full"
                  >
                    Verificar Status do Pagamento
                  </Button>
                  {paymentUrl && (
                    <Button
                      onClick={() => window.open(paymentUrl, '_blank')}
                      variant="outline"
                      className="w-full"
                    >
                      Abrir Link de Pagamento Novamente
                    </Button>
                  )}
                </div>
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

            {/* Informações de segurança */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Pagamento Seguro</h4>
                  <p className="text-sm text-blue-700">
                    Seus dados são protegidos e o pagamento é processado através da plataforma segura InfinitePay.
                    Você pode pagar com PIX, cartão de débito, crédito, Apple Pay e outras opções.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}