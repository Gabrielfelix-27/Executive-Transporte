export interface CouponData {
  code: string;
  influencerName: string;
  discountPercentage: number;
}

// API endpoints para validação segura
const API_BASE_URL = '/api/coupons';

// Função para validar cupom via API
export async function validateCoupon(code: string): Promise<{
  valid: boolean;
  message: string;
  coupon?: CouponData;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ couponCode: code })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro ao validar cupom:', error);
    return {
      valid: false,
      message: 'Erro interno. Tente novamente.'
    };
  }
}

// Função para aplicar desconto
export function applyCouponDiscount(originalPrice: number, discountPercentage: number): number {
  const discount = (originalPrice * discountPercentage) / 100;
  return originalPrice - discount;
}

// Função para registrar uso do cupom via API
export async function registerCouponUsage(code: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/register-usage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ couponCode: code })
    });
    
    const result = await response.json();
    return result.success || false;
  } catch (error) {
    console.error('Erro ao registrar uso do cupom:', error);
    return false;
  }
}

// Função para obter estatísticas (placeholder - implementar conforme necessário)
export function getCouponStats(code: string): { usageCount: number } {
  // Esta função seria implementada com dados do backend
  return { usageCount: 0 };
}