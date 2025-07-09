// Serviço para buscar cotação atual do dólar
export interface ExchangeRateResponse {
  conversion_rates: {
    BRL: number;
    USD: number;
  };
}

class CurrencyService {
  private cache: { rate: number; timestamp: number } | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  async getUsdToBrlRate(): Promise<number> {
    // Verificar se há cache válido
    if (this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
      return this.cache.rate;
    }

    try {
      // Usar API gratuita para cotação atual
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }

      const data = await response.json();
      const rate = data.rates.BRL;

      // Cache da cotação
      this.cache = {
        rate,
        timestamp: Date.now()
      };

      return rate;
    } catch (error) {
      console.error('Erro ao buscar cotação:', error);
      
      // Fallback para cotação aproximada se API falhar
      const fallbackRate = 5.50; // Valor aproximado como fallback
      
      this.cache = {
        rate: fallbackRate,
        timestamp: Date.now()
      };
      
      return fallbackRate;
    }
  }

  async getBrlToUsdRate(): Promise<number> {
    const usdToBrlRate = await this.getUsdToBrlRate();
    return 1 / usdToBrlRate;
  }

  // Converter de BRL para USD
  async convertBrlToUsd(amount: number): Promise<number> {
    const rate = await this.getBrlToUsdRate();
    return amount * rate;
  }

  // Converter de USD para BRL
  async convertUsdToBrl(amount: number): Promise<number> {
    const rate = await this.getUsdToBrlRate();
    return amount * rate;
  }

  // Limpar cache (útil para testes)
  clearCache(): void {
    this.cache = null;
    console.log('💱 Cache de cotação limpo');
  }

  // Obter informações do cache
  getCacheInfo(): { rate: number; timestamp: number; age: number } | null {
    if (!this.cache) return null;
    
    return {
      rate: this.cache.rate,
      timestamp: this.cache.timestamp,
      age: Date.now() - this.cache.timestamp
    };
  }
}

export const currencyService = new CurrencyService();

// Expor globalmente para testes (apenas em desenvolvimento)
if (typeof window !== 'undefined') {
  (window as any).currencyService = currencyService;
} 