import { 
  validateAndSanitizeCPF, 
  validateAndSanitizeEmail, 
  validateAndSanitizePhone, 
  validateAndSanitizeName,
  validateAmountCents,
  validateInstallments
} from '@/utils/validation';

// Serviço InfinitePay - Integração de Pagamentos
// API para criação de links de pagamento e validação de status

export interface PaymentRequest {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  amount_cents: number;
  installments: number;
}

export interface PaymentResponse {
  ok: boolean;
  message?: string;
  url?: string;
  order_nsu?: string;
  amount_cents?: number;
  installments?: number;
  redirect_url?: string;
  webhook_url?: string;
  payer?: {
    name: string;
    cpf: string;
    phone: string;
    email: string;
  };
  provider_raw?: {
    url: string;
  };
  error?: string;
}

export interface PaymentStatusRequest {
  order_nsu: string;
}

export interface PaymentStatusResponse {
  ok: boolean;
  order_nsu?: string;
  paid?: boolean;
  amount_cents?: number;
  paid_amount_cents?: number;
  installments?: number;
  capture_method?: string;
  receipt_url?: string;
  status_saved?: string;
  payer?: {
    name: string;
    cpf: string;
    phone: string;
    email: string;
  };
  provider_raw?: {
    success: boolean;
    paid: boolean;
    amount: number;
    paid_amount: number;
    installments?: number;
    capture_method?: string;
  };
  error?: string;
  raw?: string;
}

// URLs da API - detecção automática de ambiente
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

console.log('🌍 Ambiente detectado:', {
  hostname: window.location.hostname,
  isProduction,
  timestamp: new Date().toISOString()
});

// Usar sempre o proxy para evitar problemas com arquivos PHP em desenvolvimento
const INFINITEPAY_API_BASE = '/api/infinitepay-proxy';

const CREATE_PAYMENT_URL = `${INFINITEPAY_API_BASE}?endpoint=api`;
const CHECK_PAYMENT_URL = `${INFINITEPAY_API_BASE}?endpoint=check`;

console.log('🔗 URLs configuradas:', {
  INFINITEPAY_API_BASE,
  CREATE_PAYMENT_URL,
  CHECK_PAYMENT_URL
});

/**
 * Cria um link de pagamento via InfinitePay
 * @param paymentData Dados do pagamento (cliente, valor, parcelas)
 * @returns Promise com a resposta da API contendo o link de pagamento
 */
export const createPaymentLink = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    console.log('🔄 Criando link de pagamento InfinitePay');

    // Validação e sanitização rigorosa dos dados
    const sanitizedName = validateAndSanitizeName(paymentData.name);
    const sanitizedCPF = validateAndSanitizeCPF(paymentData.cpf);
    const sanitizedEmail = validateAndSanitizeEmail(paymentData.email);
    const sanitizedPhone = validateAndSanitizePhone(paymentData.phone);
    const validAmount = validateAmountCents(paymentData.amount_cents);
    const validInstallments = validateInstallments(paymentData.installments);

    // Verificar se todos os dados são válidos
    if (!sanitizedName) {
      throw new Error('Nome inválido. Deve ter entre 2 e 100 caracteres.');
    }
    if (!sanitizedCPF) {
      throw new Error('CPF inválido. Verifique o formato e os dígitos verificadores.');
    }
    if (!sanitizedEmail) {
      throw new Error('Email inválido. Verifique o formato do endereço de email.');
    }
    if (!sanitizedPhone) {
      throw new Error('Telefone inválido. Deve ter 10 ou 11 dígitos com DDD válido.');
    }
    if (!validAmount) {
      throw new Error('Valor inválido. Deve ser um valor positivo em centavos.');
    }
    if (!validInstallments) {
      throw new Error('Número de parcelas inválido. Deve ser entre 1 e 12.');
    }

    // Criar objeto com dados sanitizados
    const sanitizedPaymentData: PaymentRequest = {
      name: sanitizedName,
      cpf: sanitizedCPF,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      amount_cents: validAmount,
      installments: validInstallments
    };

    // Fazer requisição para criar o link de pagamento
    const response = await fetch(CREATE_PAYMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sanitizedPaymentData)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Resposta não disponível');
      console.error(`❌ Erro HTTP ${response.status}:`, errorText);
      throw new Error(`Erro na API de pagamento (${response.status}): ${response.statusText}`);
    }

    const result: PaymentResponse = await response.json();
    
    console.log('✅ Link de pagamento criado com sucesso');
    
    if (!result.ok) {
      throw new Error(result.message || 'Erro ao criar link de pagamento');
    }

    return result;

  } catch (error) {
    console.error('❌ Erro ao criar link de pagamento:', error);
    
    // Melhor tratamento de erros específicos
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Erro de conectividade: Não foi possível conectar com o servidor de pagamentos. Verifique sua conexão com a internet.');
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Erro desconhecido ao processar pagamento');
  }
};

/**
 * Verifica o status de um pagamento com retry e tratamento de erro 502
 * @param orderNsu Código NSU do pedido retornado na criação do link
 * @returns Promise com o status do pagamento
 */
export const checkPaymentStatus = async (orderNsu: string): Promise<PaymentStatusResponse> => {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔍 Verificando status do pagamento (tentativa ${attempt}/${maxRetries}):`, orderNsu);

      if (!orderNsu) {
        throw new Error('Order NSU não fornecido');
      }

      const statusRequest: PaymentStatusRequest = {
        order_nsu: orderNsu
      };

      // Fazer requisição para verificar status
      const response = await fetch(CHECK_PAYMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(statusRequest)
      });

      // Se receber erro 502, tenta novamente após um delay
      if (response.status === 502) {
        console.warn(`⚠️ Erro 502 na tentativa ${attempt}. Tentando novamente em 2 segundos...`);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        } else {
          // Na última tentativa, retorna um status pendente em vez de erro
          console.warn('⚠️ API de status indisponível (502). Assumindo pagamento pendente.');
          return {
            ok: false,
            error: 'API_TEMPORARILY_UNAVAILABLE',
            order_nsu: orderNsu,
            paid: false
          };
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PaymentStatusResponse = await response.json();
      
      console.log('📊 Status do pagamento:', result);
      
      return result;

    } catch (error) {
      console.error(`❌ Erro ao verificar status do pagamento (tentativa ${attempt}):`, error);
      lastError = error as Error;
      
      // Se não for o último retry, aguarda antes de tentar novamente
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  // Se todas as tentativas falharam, retorna status pendente em vez de erro
  console.warn('⚠️ Todas as tentativas de verificação falharam. Assumindo pagamento pendente.');
  return {
    ok: false,
    error: 'VERIFICATION_FAILED',
    order_nsu: orderNsu,
    paid: false
  };
};

/**
 * Converte valor em reais para centavos
 * @param valueInReais Valor em reais (ex: 10.50)
 * @returns Valor em centavos (ex: 1050)
 */
export const convertToCents = (valueInReais: number): number => {
  return Math.round(valueInReais * 100);
};

/**
 * Converte valor em centavos para reais
 * @param valueInCents Valor em centavos (ex: 1050)
 * @returns Valor em reais (ex: 10.50)
 */
export const convertToReais = (valueInCents: number): number => {
  return valueInCents / 100;
};

/**
 * Formata CPF removendo caracteres especiais
 * @param cpf CPF com ou sem formatação
 * @returns CPF apenas com números
 */
export const formatCpfForApi = (cpf: string): string => {
  return cpf.replace(/[^\d]/g, '');
};

/**
 * Formata telefone removendo caracteres especiais
 * @param phone Telefone com ou sem formatação
 * @returns Telefone apenas com números
 */
export const formatPhoneForApi = (phone: string): string => {
  return phone.replace(/[^\d]/g, '');
};

/**
 * Valida se um pagamento foi aprovado
 * @param statusResponse Resposta da verificação de status
 * @returns true se o pagamento foi aprovado
 */
export const isPaymentApproved = (statusResponse: PaymentStatusResponse): boolean => {
  return statusResponse.ok && statusResponse.paid === true;
};

/**
 * Valida se um pagamento está pendente
 * @param statusResponse Resposta da verificação de status
 * @returns true se o pagamento está pendente
 */
export const isPaymentPending = (statusResponse: PaymentStatusResponse): boolean => {
  return !statusResponse.ok || statusResponse.paid === false;
};